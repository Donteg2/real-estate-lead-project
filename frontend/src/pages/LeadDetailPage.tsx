import { useEffect, useState } from 'react'
import { api, ApiError } from '../services/api'
import type { Lead } from '../types'

interface Props {
  leadId: string
  onBack: () => void
}

function formatBudget(lead: Lead): string {
  if (lead.budget_max == null) return '—'
  const currency = lead.currency || 'NGN'
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency === 'NGN' ? 'NGN' : currency,
      maximumFractionDigits: 0,
    }).format(lead.budget_max)
  } catch {
    return `${currency} ${lead.budget_max.toLocaleString()}`
  }
}

export function LeadDetailPage({ leadId, onBack }: Props) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.getLead(leadId)
        if (!cancelled) setLead(data)
      } catch (err) {
        if (!cancelled) {
          const msg =
            err instanceof ApiError ? err.message : 'Could not load lead details.'
          setError(msg)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [leadId])

  if (loading) {
    return (
      <div className="page-panel">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Leads
        </button>
        <p className="muted">Loading lead…</p>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="page-panel">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back to Leads
        </button>
        <div className="error-banner" role="alert">
          {error || 'Lead not found.'}
        </div>
      </div>
    )
  }

  return (
    <div className="page-panel">
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back to Leads
      </button>

      <div className="lead-detail-header">
        <div>
          <h2>{lead.name || 'Unnamed Lead'}</h2>
          <p className="muted">{lead.email || lead.phone || 'No contact info'}</p>
        </div>
        <div className="lead-badges">
          {lead.classification && (
            <span className={`class-badge class-${lead.classification.toLowerCase()}`}>
              {lead.classification}
            </span>
          )}
          <span className="status-pill">{lead.status}</span>
        </div>
      </div>

      <div className="detail-grid">
        <section className="detail-card">
          <h3>Requirements</h3>
          <dl>
            <div>
              <dt>Property</dt>
              <dd>
                {lead.bedrooms ? `${lead.bedrooms}-bedroom ` : ''}
                {lead.property_type || '—'}
              </dd>
            </div>
            <div>
              <dt>Transaction</dt>
              <dd>{lead.transaction_type || lead.intent || '—'}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{lead.location || '—'}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{formatBudget(lead)}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{lead.timeline || '—'}</dd>
            </div>
          </dl>
        </section>

        <section className="detail-card">
          <h3>Lead Info</h3>
          <dl>
            <div>
              <dt>Score</dt>
              <dd>{lead.score != null ? `${lead.score}/100` : '—'}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{lead.source || '—'}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{new Date(lead.created_at).toLocaleString()}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{new Date(lead.updated_at).toLocaleString()}</dd>
            </div>
          </dl>
        </section>

        {lead.notes && (
          <section className="detail-card full">
            <h3>Notes</h3>
            <p>{lead.notes}</p>
          </section>
        )}
      </div>

      <p className="muted detail-note">
        Conversation history and follow-ups will appear here once those backend
        endpoints are available.
      </p>
    </div>
  )
}
