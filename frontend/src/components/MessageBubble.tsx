import type { Message } from '../types'

interface Props {
  message: Message
  onRetry?: (message: Message) => void
}

export function MessageBubble({ message, onRetry }: Props) {
  return (
    <div
      className={`message ${message.role} ${message.status === 'failed' ? 'failed' : ''}`}
    >
      <div className="bubble">
        <p>{message.content}</p>
        <div className="meta">
          <span className="time">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {message.role === 'user' && message.status === 'sending' && (
            <span className="status">Sending…</span>
          )}
          {message.role === 'user' && message.status === 'failed' && onRetry && (
            <button
              type="button"
              className="retry-btn"
              onClick={() => onRetry(message)}
              aria-label="Retry sending message"
            >
              Failed · Retry
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
