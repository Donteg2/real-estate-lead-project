import { useState } from 'react'
import { ChatPage } from './pages/ChatPage'
import { LeadsPage } from './pages/LeadsPage'
import { LeadDetailPage } from './pages/LeadDetailPage'
import type { Page } from './types'
import './App.css'

function App() {
  const [page, setPage] = useState<Page>('chat')
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

  const goToLead = (leadId: string) => {
    setSelectedLeadId(leadId)
    setPage('lead-detail')
  }

  const goToLeads = () => {
    setSelectedLeadId(null)
    setPage('leads')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-avatar" aria-hidden="true">
            PH
          </div>
          <div>
            <h1>PrimeHomes Lead Bot</h1>
            <p className="brand-sub">Real Estate Assistant</p>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main">
          <button
            type="button"
            className={page === 'chat' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setPage('chat')}
          >
            Chat
          </button>
          <button
            type="button"
            className={
              page === 'leads' || page === 'lead-detail' ? 'nav-btn active' : 'nav-btn'
            }
            onClick={goToLeads}
          >
            Leads
          </button>
        </nav>
      </header>

      <main className="app-main">
        {page === 'chat' && <ChatPage />}
        {page === 'leads' && <LeadsPage onSelectLead={goToLead} />}
        {page === 'lead-detail' && selectedLeadId && (
          <LeadDetailPage leadId={selectedLeadId} onBack={goToLeads} />
        )}
      </main>

      <footer className="app-footer">
        Powered by AI · Your data is secure
      </footer>
    </div>
  )
}

export default App
