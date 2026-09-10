import React, { useState, useRef, useEffect } from 'react'
import './App.css'

interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content: "Hello! 👋 Welcome to PrimeHomes Realty. I'm here to help you find your perfect property. What are you looking for today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
          lead_id: leadId,
        }),
      })

      if (!res.ok) throw new Error('Failed to send message')

      const data = await res.json()

      if (data.conversation_id) setConversationId(data.conversation_id)
      if (data.lead_id) setLeadId(data.lead_id)

      const botMsg: Message = {
        id: data.message_id || Date.now().toString() + '-bot',
        role: 'bot',
        content: data.bot_reply || "Thanks! I've received your message. Our team will follow up shortly.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errorMsg: Message = {
        id: Date.now().toString() + '-err',
        role: 'bot',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="logo-area">
          <div className="logo-icon">🏠</div>
          <div>
            <h1>PrimeHomes Realty</h1>
            <p className="subtitle">Your smart property assistant</p>
          </div>
        </div>
        <div className="status-badge">
          <span className="dot"></span>
          Online
        </div>
      </header>

      <div className="messages-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="bubble">
              <p>{msg.content}</p>
              <span className="time">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us what you're looking for..."
          rows={1}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="send-btn">
          {loading ? '...' : 'Send'}
        </button>
      </div>

      <footer className="chat-footer">
        Powered by AI · Your data is secure
      </footer>
    </div>
  )
}

export default App
