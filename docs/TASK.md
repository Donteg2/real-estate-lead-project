# TASK.md

# PrimeHomes Realty — Real Estate Lead Bot
## Project Task Tracker

**Document Version:** 0.1
**Status:** Active

---

## Phase 1 — Documentation & Scaffolding (Completed)

- [x] Create GitHub repository
- [x] Add all foundational specification documents
- [x] Create IMPLEMENTATION.md
- [x] Create project structure according to IMPLEMENTATION.md
- [x] Add .gitignore, .env.example, AGENTS.md, docker-compose.yml
- [x] Scaffold frontend/, backend/, n8n/, database/, tests/
- [x] Move all specification documents into docs/ with clean names

## Phase 2 — Database Foundation (Next)

- [ ] Define SQLAlchemy models based on DATA_MODEL.md
- [ ] Set up Alembic
- [ ] Create initial migration
- [ ] Seed basic data if needed

## Phase 3 — FastAPI Core

- [ ] Health endpoint (done)
- [ ] Authentication (JWT)
- [ ] Lead CRUD endpoints
- [ ] Conversation & Message endpoints
- [ ] Status transition logic
- [ ] Lead scoring service

## Phase 4 — React Customer Chat

- [ ] Basic chat UI
- [ ] Message sending
- [ ] Display bot responses
- [ ] Loading / error states

## Phase 5 — n8n + AI Pipeline

- [ ] PRH-LEAD-PROCESS-MESSAGE workflow
- [ ] AI extraction with structured output
- [ ] Validation of AI output
- [ ] Lead update
- [ ] Response generation

## Phase 6 — Qualification & Notifications

- [ ] Deterministic lead scoring
- [ ] HOT / WARM / COLD classification
- [ ] Sales notification workflow

## Phase 7 — Sales Dashboard

- [ ] Lead list
- [ ] Lead detail view
- [ ] Conversation history
- [ ] Status update
- [ ] Notes & follow-ups

## Phase 8 — Hardening

- [ ] Tests
- [ ] Error handling
- [ ] Observability
- [ ] Security review
- [ ] Deployment

---

This is a living document. Update as tasks are completed.
