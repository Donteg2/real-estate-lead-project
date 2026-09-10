# TASK.md

# PrimeHomes Realty — Real Estate Lead Bot
## Project Task Tracker

> **Purpose:** Track all development tasks required to build, test, and deploy the Real Estate Lead Bot.

---

## 1. Project Status

**Overall Status:** 🟡 Core Implementation In Progress  
**Current Phase:** Backend + Frontend MVP + n8n Integration  
**MVP Status:** Chat flow implemented (FastAPI + React), ready for n8n connection

### Status Legend

- ⬜ Not Started
- 🟡 In Progress
- 🟢 Completed
- 🔴 Blocked
- ⏸️ On Hold

---

# 2. Development Roadmap

```text
DOCUMENTATION          ✅
     ↓
PROJECT SETUP          ✅
     ↓
DATABASE (MVP)         ✅ (SQLite for local, Postgres-ready)
     ↓
BACKEND API            🟡 (Core done)
     ↓
FRONTEND (Chat)        🟡 (Customer chat done)
     ↓
N8N AUTOMATION         ⬜ (Ready to connect)
     ↓
AI PROCESSING          ⬜
     ↓
LEAD QUALIFICATION     ⬜
     ↓
SALES DASHBOARD        ⬜
     ↓
TESTING                ⬜
     ↓
VPS DEPLOYMENT         ⬜
     ↓
MVP COMPLETE
```

---

# 3. Documentation

## Requirements

- [x] Define business problem
- [x] Define product goal
- [x] Define target users
- [x] Define MVP scope
- [x] Define success criteria
- [x] Define core customer information
- [x] Define property information
- [x] Define customer intent
- [x] Define lead qualification requirements

## System Documentation

- [x] PRD
- [x] Database design
- [x] API specification
- [x] n8n workflow specification
- [x] AI specification
- [x] UI/UX specification
- [x] README
- [x] Development setup
- [x] Lead qualification specification
- [x] Testing specification
- [x] Deployment specification
- [x] Environment configuration (`.env.example`)
- [ ] Operations runbook

---

# 4. Project Foundation

## Repository

- [x] Create project repository
- [x] Create `.gitignore`
- [x] Create `.env.example`
- [x] Create README
- [x] Create documentation folders (`docs/`)
- [x] Create frontend directory
- [x] Create backend directory
- [x] Create n8n directory
- [x] Create database directory
- [x] Create tests directory
- [x] Clean root (all specs moved to `docs/`)

## Development Environment

- [x] Backend structure ready
- [x] Frontend structure ready
- [x] Docker Compose for Postgres + n8n
- [ ] Configure n8n workflow on your machine
- [ ] Verify all services locally

---

# 5. Database

## Current MVP Approach

- [x] SQLite for local development (easy start)
- [x] SQLAlchemy models created (`Lead`, `Conversation`, `Message`)
- [x] Tables auto-created on startup
- [ ] Switch to PostgreSQL when ready
- [ ] Alembic migrations

## Core Tables (MVP)

- [x] `leads`
- [x] `conversations`
- [x] `messages`
- [ ] `lead_scores`
- [ ] `lead_assignments`
- [ ] `follow_ups`
- [ ] `activities`
- [ ] `users` / `roles`

---

# 6. FastAPI Backend

## Project Setup

- [x] Create FastAPI application
- [x] Configure application settings (`core/config.py`)
- [x] Configure database connection
- [x] Configure CORS
- [x] Add health endpoint (`GET /api/v1/health`)
- [x] Root endpoint

## Lead & Chat APIs (MVP)

- [x] `POST /api/v1/chat` — main customer chat endpoint
- [x] `GET /api/v1/leads`
- [x] `GET /api/v1/leads/{id}`
- [x] `PATCH /api/v1/leads/{id}`
- [x] Create lead + conversation automatically on first message
- [x] Store customer + bot messages
- [x] Trigger n8n webhook on new message
- [x] Safe fallback bot reply if n8n is offline

## Still Needed

- [ ] Authentication (JWT)
- [ ] Lead status transition rules
- [ ] Lead assignment
- [ ] Qualification endpoint
- [ ] Follow-up APIs
- [ ] Activity log

---

# 7. React Frontend

## Customer Interface (Done)

- [x] Create React + Vite + TypeScript application
- [x] Modern orange & yellow color palette
- [x] Clean chat interface
- [x] Message bubbles (user + bot)
- [x] Message input + Send
- [x] Loading / typing indicator
- [x] Error handling
- [x] Conversation + Lead ID persistence in session
- [x] Responsive design

## Still Needed

- [ ] Sales dashboard
- [ ] Lead list / detail views
- [ ] Status update UI
- [ ] Notes & follow-ups

---

# 8. n8n Automation

## Ready for Connection

- [x] Backend calls `N8N_WEBHOOK_URL` on every new customer message
- [ ] Create `PRH-LEAD-PROCESS-MESSAGE` workflow in n8n
- [ ] AI extraction node
- [ ] Validate AI output
- [ ] Update lead via FastAPI
- [ ] Generate smart reply
- [ ] Notify sales on HOT leads

---

# 9. Current Priority (What to do next on your machine)

1. [x] Backend core + chat endpoint
2. [x] Frontend customer chat (orange/yellow theme)
3. [ ] Start backend + frontend locally
4. [ ] Start n8n and create the process-message webhook
5. [ ] Point `N8N_WEBHOOK_URL` to your n8n webhook
6. [ ] Test end-to-end message → n8n → reply
7. [ ] Add AI extraction inside n8n
8. [ ] Add lead scoring rules

---

# 10. How to Run Locally (Quick Reference)

```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173

---

# 11. Agentic Development Rule

When using an AI coding agent:

1. Read the relevant documentation first.
2. Check this task file before starting work.
3. Pick one task or a small related group.
4. Implement only that scope.
5. Run the relevant tests.
6. Mark the completed task here.
7. Do not silently change architecture.
8. Do not introduce unnecessary technologies.
