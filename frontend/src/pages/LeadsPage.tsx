import { useEffect, useState } from 'react'
import { api, ApiError } from '../services/api'
import type { Lead } from '../types'

interface Props {
  onSelectLead: (leadId: string) => void
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

function classificationClass(c: string | null): string {
  if (!c) return 'class-none'
  return `class-${c.toLowerCase()}`
}

export function LeadsPage({ onSelectLead }: Props) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.listLeads()
        if (!cancelled) setLeads(data)
      } catch (err) {
        if (!cancelled) {
          const msg =
            err instanceof ApiError
              ? err.message
              : 'Could not load leads. Please try again.'
          setError(msg)
          console.error('[Leads] load failed:', err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="page-panel">
        <h2>Leads</h2>
        <p className="muted">Loading leads…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-panel">
        <h2>Leads</h2>
        <div className="error-banner" role="alert">
          {error}
        </div>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="page-panel">
        <h2>Leads</h2>
        <div className="empty-state">
          <p className="empty-title">No leads yet</p>
          <p className="muted">
            Customer conversations that become leads will appear here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-panel">
      <div className="page-header">
        <h2>Leads</h2>
        <span className="count-badge">{leads.length}</span>
      </div>

      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name / Contact</th>
              <th>Property</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Score</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="lead-row"
                onClick={() => onSelectLead(lead.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelectLead(lead.id)
                  }
                }}
              >
                <td>
                  <div className="lead-name">{lead.name || '—'}</div>
                  <div className="lead-contact">
                    {lead.phone || lead.email || 'No contact'}
                  </div>
                </td>
                <td>
                  {lead.bedrooms ? `${lead.bedrooms}-bed ` : ''}
                  {lead.property_type || '—'}
                  {lead.transaction_type ? ` · ${lead.transaction_type}` : ''}
                </td>
                <td>{lead.location || '—'}</td>
                <td>{formatBudget(lead)}</td>
                <td>
                  {lead.score != null ? (
                    <span className="score">{lead.score}</span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <span className={`class-badge ${classificationClass(lead.classification)}`}>
                    {lead.classification || lead.status}
                  </span>
                </td>
                <td className="date-cell">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
