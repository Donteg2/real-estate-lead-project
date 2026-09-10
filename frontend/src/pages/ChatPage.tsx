import { useState, useRef, useEffect, useCallback } from 'react'
import { api, ApiError } from '../services/api'
import type { Message } from '../types'
import { MessageBubble } from '../components/MessageBubble'
import { TypingIndicator } from '../components/TypingIndicator'
import { ChatSuggestions } from '../components/ChatSuggestions'

const WELCOME: Message = {
  id: 'welcome',
  role: 'bot',
  content:
    "Hello! 👋 Welcome to PrimeHomes Realty. I'm here to help you find your perfect property. Tell me what you're looking for — location, budget, and preferred property type are a great start.",
  timestamp: new Date(),
  status: 'sent',
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [errorBanner, setErrorBanner] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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

      setErrorBanner(null)
      const userMsgId = retryId || `user-${Date.now()}`

      if (!isRetry) {
        setMessages((prev) => [
          ...prev,
          {
            id: userMsgId,
            role: 'user',
            content: trimmed,
            timestamp: new Date(),
            status: 'sending',
          },
        ])
        setInput('')
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === retryId ? { ...m, status: 'sending' as const } : m
          )
        )
      }

      setLoading(true)

      try {
        const data = await api.sendChat({
          message: trimmed,
          conversation_id: conversationId,
          lead_id: leadId,
        })

        if (data.conversation_id) setConversationId(data.conversation_id)
        if (data.lead_id) setLeadId(data.lead_id)

        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId ? { ...m, status: 'sent' as const } : m
          )
        )

        setMessages((prev) => [
          ...prev,
          {
            id: data.message_id || `bot-${Date.now()}`,
            role: 'bot',
            content:
              data.bot_reply ||
              "Thanks! I've received your message. Our team will follow up shortly.",
            timestamp: new Date(),
            status: 'sent',
          },
        ])
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsgId ? { ...m, status: 'failed' as const } : m
          )
        )

        const msg =
          err instanceof ApiError
            ? err.message
            : "Sorry, we're having trouble connecting right now. Please try again."
        setErrorBanner(msg)
        console.error('[Chat] send failed:', err)
      } finally {
        setLoading(false)
        textareaRef.current?.focus()
      }
    },
    [loading, conversationId, leadId]
  )

  const handleNewChat = () => {
    setMessages([{ ...WELCOME, timestamp: new Date() }])
    setConversationId(null)
    setLeadId(null)
    setInput('')
    setErrorBanner(null)
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) sendMessage(input)
    }
  }

  const showSuggestions =
    messages.length <= 1 && !loading && messages[0]?.id === 'welcome'

  return (
    <div className="chat-page">
      <div className="assistant-header">
        <div>
          <h2>PrimeHomes Property Assistant</h2>
          <p className="assistant-desc">
            Tell us your property requirements, budget, and preferred location.
          </p>
        </div>
        <div className="assistant-actions">
          <span className="online-badge">
            <span className="dot" aria-hidden="true" />
            Online
          </span>
          <button type="button" className="new-chat-btn" onClick={handleNewChat}>
            New Chat
          </button>
        </div>
      </div>

      {errorBanner && (
        <div className="error-banner" role="alert">
          {errorBanner}
          <button type="button" onClick={() => setErrorBanner(null)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <div className="messages-area" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onRetry={(m) => sendMessage(m.content, true, m.id)}
          />
        ))}

        {loading && <TypingIndicator />}

        {showSuggestions && (
          <ChatSuggestions
            onSelect={(text) => setInput(text)}
            disabled={loading}
          />
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
          type="button"
          onClick={() => input.trim() && sendMessage(input)}
          disabled={loading || !input.trim()}
          className="send-btn"
          aria-label="Send message"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
