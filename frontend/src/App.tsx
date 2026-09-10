import React, { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'

type MessageStatus = 'sending' | 'sent' | 'failed'

interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
  status?: MessageStatus
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      content:
        "Hello! 👋 Welcome to PrimeHomes Realty. I'm here to help you find your perfect property. What are you looking for today?",
      timestamp: new Date(),
      status: 'sent',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

  const sendMessage = useCallback(
    async (text: string, isRetry = false, retryId?: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      let userMsgId = retryId || Date.now().toString()

      if (!isRetry) {
        const userMsg: Message = {
          id: userMsgId,
          role: 'user',
          content: trimmed,
          timestamp: new Date(),
          status: 'sending',
        }
        setMessages((prev) => [...prev, userMsg])
        setInput('')
      } else {
        // Mark the failed message as sending again
        setMessages((prev) =>
          prev.map((m) =>
            m.id === retryId ? { ...m, status: 'sending' as MessageStatus } : m
          )
        )
      }

      setLoading(true)

      try {
        const res = await fetch(`${API_BASE}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            conversation_id: conversationId,
            lead_id: leadId,
          }),
        })

        if (!res.ok) throw new Error('Failed to send message')

        const data = await res.json()

        if (data.conversation_id) setConversationId(data.conversation_id)
        if (data.lead_id) setLeadId(data.lead_id)

        // Mark user message as sent
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId ? { ...m, status: 'sent' as MessageStatus } : m
          )
        )

        const botMsg: Message = {
          id: data.message_id || `${Date.now()}-bot`,
          role: 'bot',
          content:
            data.bot_reply ||
            "Thanks! I've received your message. Our team will follow up shortly.",
          timestamp: new Date(),
          status: 'sent',
        }
        setMessages((prev) => [...prev, botMsg])
      } catch {
        // Mark as failed so the user can retry
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId ? { ...m, status: 'failed' as MessageStatus } : m
          )
        )
      } finally {
        setLoading(false)
        textareaRef.current?.focus()
      }
    },
    [loading, conversationId, leadId]
  )

  const handleSend = () => {
    if (input.trim()) sendMessage(input)
  }

  const handleRetry = (msg: Message) => {
    if (msg.status === 'failed') {
      sendMessage(msg.content, true, msg.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container" role="main">
      <header className="chat-header">
        <div className="logo-area">
          <div className="logo-icon" aria-hidden="true">
            🏠
          </div>
          <div>
            <h1>PrimeHomes Realty</h1>
            <p className="subtitle">Your smart property assistant</p>
          </div>
        </div>
        <div className="status-badge" aria-live="polite">
          <span className="dot" aria-hidden="true" />
          Online
        </div>
      </header>

      <div
        className="messages-area"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role} ${msg.status === 'failed' ? 'failed' : ''}`}
          >
            <div className="bubble">
              <p>{msg.content}</p>
              <div className="meta">
                <span className="time">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {msg.role === 'user' && msg.status === 'sending' && (
                  <span className="status">Sending…</span>
                )}
                {msg.role === 'user' && msg.status === 'failed' && (
                  <button
                    className="retry-btn"
                    onClick={() => handleRetry(msg)}
                    aria-label="Retry sending message"
                  >
                    Failed · Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message bot" aria-label="Assistant is typing">
            <div className="bubble typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <textarea
          id="chat-input"
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us what you're looking for..."
          rows={1}
          disabled={loading}
          aria-label="Message input"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="send-btn"
          aria-label="Send message"
        >
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
