export type MessageStatus = 'sending' | 'sent' | 'failed'

export interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
  status?: MessageStatus
}

export interface Lead {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  intent: string | null
  property_type: string | null
  transaction_type: string | null
  bedrooms: number | null
  location: string | null
  budget_min: number | null
  budget_max: number | null
  currency: string | null
  timeline: string | null
  status: string
  classification: string | null
  score: number | null
  source: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ChatRequest {
  message: string
  conversation_id?: string | null
  lead_id?: string | null
  name?: string | null
  email?: string | null
  phone?: string | null
}

export interface ChatResponse {
  lead_id: string
  conversation_id: string
  message_id: string
  bot_reply?: string | null
  status: string
  lead?: Lead | null
}

export type Page = 'chat' | 'leads' | 'lead-detail'
