from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.schemas.lead import LeadOut, LeadUpdate, ChatRequest, ChatResponse
from app.services import lead_service

router = APIRouter()


@router.get("/leads", response_model=List[LeadOut])
def list_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return lead_service.list_leads(db, skip=skip, limit=limit)


@router.get("/leads/{lead_id}", response_model=LeadOut)
def get_lead(lead_id: str, db: Session = Depends(get_db)):
    lead = lead_service.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.patch("/leads/{lead_id}", response_model=LeadOut)
def update_lead(lead_id: str, data: LeadUpdate, db: Session = Depends(get_db)):
    lead = lead_service.get_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead_service.update_lead(db, lead, data)


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Main customer chat endpoint.

    - Creates lead + conversation if needed
    - Stores the customer message
    - Triggers n8n for AI processing
    - Returns a bot reply (from n8n or a safe fallback)
    """
    result = await lead_service.process_chat_message(db, request)
    return ChatResponse(
        lead_id=result["lead_id"],
        conversation_id=result["conversation_id"],
        message_id=result["message_id"],
        bot_reply=result.get("bot_reply"),
        status=result.get("status", "received"),
        lead=result.get("lead"),
    )
