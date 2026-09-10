import type { ChatRequest, ChatResponse, Lead } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'

class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })

    clearTimeout(timeout)

    if (!res.ok) {
      let detail = `Request failed (${res.status})`
      try {
        const body = await res.json()
        detail = body.detail || body.message || detail
      } catch {
        // ignore parse errors
      }

      if (res.status === 400) throw new ApiError('Invalid request. Please check your message.', 400)
      if (res.status === 404) throw new ApiError('Resource not found.', 404)
      if (res.status === 429) throw new ApiError('Too many requests. Please wait a moment.', 429)
      if (res.status >= 500) throw new ApiError("We're having trouble on our side. Please try again.", res.status)

      throw new ApiError(detail, res.status)
    }

    return res.json() as Promise<T>
  } catch (err) {
    clearTimeout(timeout)

    if (err instanceof ApiError) throw err

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 0)
    }

    throw new ApiError(
      "Sorry, we're having trouble connecting right now. Please try again.",
      0
    )
  }
}

export const api = {
  async sendChat(payload: ChatRequest): Promise<ChatResponse> {
    return request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async listLeads(skip = 0, limit = 50): Promise<Lead[]> {
    return request<Lead[]>(`/leads?skip=${skip}&limit=${limit}`)
  },

  async getLead(leadId: string): Promise<Lead> {
    return request<Lead>(`/leads/${leadId}`)
  },

  async health(): Promise<{ status: string }> {
    return request<{ status: string }>('/health')
  },
}

export { ApiError }
