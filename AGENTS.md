# AGENTS.md — Guidance for AI Coding Agents

This repository is the **PrimeHomes Realty — Real Estate Lead Bot**.

## Primary Source of Truth

Before making significant changes, read (in this order):

1. `README.md`
2. `docs/PRD.md`
3. `IMPLEMENTATION.md`
4. `docs/SYSTEM_ARCHITECTURE.md`
5. `docs/DATA_MODEL.md`
6. `docs/API.md`
7. Relevant specialized specs (AI, n8n, UI/UX, Qualification, etc.)

## Core Architectural Rules

- **React** = UI only. No business rules, no direct DB access, no direct AI calls in production paths.
- **FastAPI** = API + validation + business logic + lead scoring + state transitions + DB access.
- **n8n** = Workflow orchestration, integrations, notifications, scheduled jobs, AI workflow execution.
- **AI** = Natural language understanding, extraction, intent, response generation. Never the source of truth.
- **PostgreSQL** = System of record.
- **Google Sheets** = Secondary / operational / reporting only.

## Key Principles

1. Keep responsibilities strictly separated.
2. Deterministic logic (scoring, validation, state machines) lives in FastAPI, not in prompts or n8n.
3. AI output must be validated against schemas before use.
4. Never invent customer data, prices, availability, or commitments.
5. Prefer simple, incremental development over big-bang features.
6. Every important feature should be testable.

## Recommended Development Order

1. Project scaffolding (this step)
2. Database models + migrations
3. FastAPI health + basic CRUD
4. Conversation / Message APIs
5. React customer chat (basic)
6. n8n process-message workflow
7. AI extraction + validation
8. Lead qualification & scoring
9. Notifications
10. Sales dashboard
11. Follow-ups
12. Hardening, tests, deployment

## What Not To Do

- Do not put business logic in React.
- Do not let AI write directly to the database.
- Do not make Google Sheets the source of truth.
- Do not over-engineer (no microservices unless truly needed).
- Do not invent data the customer did not provide.

When in doubt, follow `IMPLEMENTATION.md` and `docs/SYSTEM_ARCHITECTURE.md`.
