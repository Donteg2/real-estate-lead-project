from datetime import datetime
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List


class MessageCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=4000)


class MessageOut(BaseModel):
    id: str
    conversation_id: str
    sender_type: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class ConversationOut(BaseModel):
    id: str
    lead_id: str
    channel: str
    status: str
    created_at: datetime
    messages: List[MessageOut] = []

    class Config:
        from_attributes = True


class LeadCreate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    source: Optional[str] = "WEBSITE"


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    intent: Optional[str] = None
    property_type: Optional[str] = None
    transaction_type: Optional[str] = None
    bedrooms: Optional[int] = None
    location: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    currency: Optional[str] = None
    timeline: Optional[str] = None
    status: Optional[str] = None
    classification: Optional[str] = None
    score: Optional[int] = None
    notes: Optional[str] = None


class LeadOut(BaseModel):
    id: str
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    intent: Optional[str] = None
    property_type: Optional[str] = None
    transaction_type: Optional[str] = None
    bedrooms: Optional[int] = None
    location: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    currency: Optional[str] = None
    timeline: Optional[str] = None
    status: str
    classification: Optional[str] = None
    score: Optional[int] = None
    source: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    conversation_id: Optional[str] = None
    lead_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None


class ChatResponse(BaseModel):
    lead_id: str
    conversation_id: str
    message_id: str
    bot_reply: Optional[str] = None
    status: str = "received"
    lead: Optional[LeadOut] = None
