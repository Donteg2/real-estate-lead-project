import json
import httpx
from sqlalchemy.orm import Session
from typing import Optional

from app.models.lead import Lead, Conversation, Message
from app.schemas.lead import ChatRequest, LeadUpdate
from app.core.config import get_settings

settings = get_settings()


def create_lead(db: Session, name: str | None = None, email: str | None = None, phone: str | None = None, source: str = "WEBSITE") -> Lead:
    lead = Lead(name=name, email=email, phone=phone, source=source)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def get_lead(db: Session, lead_id: str) -> Optional[Lead]:
    return db.query(Lead).filter(Lead.id == lead_id).first()


def list_leads(db: Session, skip: int = 0, limit: int = 50):
    return db.query(Lead).order_by(Lead.created_at.desc()).offset(skip).limit(limit).all()


def update_lead(db: Session, lead: Lead, data: LeadUpdate) -> Lead:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(lead, field, value)
    db.commit()
    db.refresh(lead)
    return lead


def create_conversation(db: Session, lead_id: str, channel: str = "WEB") -> Conversation:
    conv = Conversation(lead_id=lead_id, channel=channel)
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv


def get_conversation(db: Session, conversation_id: str) -> Optional[Conversation]:
    return db.query(Conversation).filter(Conversation.id == conversation_id).first()


def add_message(db: Session, conversation_id: str, sender_type: str, content: str, metadata: dict | None = None) -> Message:
    msg = Message(
        conversation_id=conversation_id,
        sender_type=sender_type,
        content=content,
        metadata_json=json.dumps(metadata) if metadata else None,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


async def trigger_n8n_processing(lead_id: str, conversation_id: str, message_id: str, content: str) -> dict | None:
    """Fire-and-forget call to n8n webhook. Returns response if available."""
    if not settings.n8n_webhook_url:
        return None

    payload = {
        "event": "MESSAGE_RECEIVED",
        "lead_id": lead_id,
        "conversation_id": conversation_id,
        "message_id": message_id,
        "content": content,
        "timestamp": None,
    }

    headers = {}
    if settings.n8n_webhook_secret:
        headers["X-Webhook-Secret"] = settings.n8n_webhook_secret

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(settings.n8n_webhook_url, json=payload, headers=headers)
            if resp.status_code < 400:
                try:
                    return resp.json()
                except Exception:
                    return {"status": "ok", "raw": resp.text}
            return {"error": f"n8n returned {resp.status_code}", "body": resp.text}
    except Exception as e:
        # Do not fail the customer request if n8n is down
        return {"error": str(e)}


async def process_chat_message(db: Session, request: ChatRequest) -> dict:
    """
    Core chat flow:
    1. Get or create Lead
    2. Get or create Conversation
    3. Store customer message
    4. Trigger n8n (AI + qualification)
    5. Return acknowledgement (bot reply may come later from n8n or be generated here)
    """
    # 1. Lead
    lead = None
    if request.lead_id:
        lead = get_lead(db, request.lead_id)

    if not lead:
        lead = create_lead(
            db,
            name=request.name,
            email=request.email,
            phone=request.phone,
            source="WEBSITE",
        )

    # 2. Conversation
    conversation = None
    if request.conversation_id:
        conversation = get_conversation(db, request.conversation_id)

    if not conversation:
        conversation = create_conversation(db, lead_id=lead.id, channel="WEB")

    # 3. Store customer message
    customer_msg = add_message(
        db,
        conversation_id=conversation.id,
        sender_type="CUSTOMER",
        content=request.message,
    )

    # 4. Trigger n8n (async processing)
    n8n_result = await trigger_n8n_processing(
        lead_id=lead.id,
        conversation_id=conversation.id,
        message_id=customer_msg.id,
        content=request.message,
    )

    # Simple fallback bot reply if n8n is not available or doesn't return a reply
    bot_reply = None
    if n8n_result and isinstance(n8n_result, dict):
        bot_reply = n8n_result.get("response") or n8n_result.get("bot_reply")

    if not bot_reply:
        bot_reply = (
            "Thank you for your message! I've noted your interest. "
            "Our team will review the details and get back to you shortly. "
            "Could you also share your preferred location and budget if you haven't already?"
        )

        # Store the fallback bot reply
        add_message(
            db,
            conversation_id=conversation.id,
            sender_type="BOT",
            content=bot_reply,
        )

    return {
        "lead_id": lead.id,
        "conversation_id": conversation.id,
        "message_id": customer_msg.id,
        "bot_reply": bot_reply,
        "status": "received",
        "lead": lead,
        "n8n": n8n_result,
    }
