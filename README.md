# PrimeHomes Realty — Real Estate Lead Bot

Intelligent lead intake, qualification, and routing system for PrimeHomes Realty.

The system turns unstructured customer enquiries (chat, future WhatsApp/email, etc.) into structured, scored, and actionable sales leads while keeping humans in control of important decisions.

## Tech Stack

| Layer              | Technology              |
|--------------------|-------------------------|
| Frontend           | React + TypeScript      |
| Backend            | FastAPI (Python)        |
| Automation         | n8n                     |
| AI                 | LLM (structured output) |
| Primary Database   | PostgreSQL              |
| Secondary / Ops    | Google Sheets           |

## High-Level Architecture

```text
Customer → React Chat → FastAPI → n8n → AI
                              ↓
                         PostgreSQL
                              ↓
                    Sales Notification + Dashboard
```

## Repository Structure

```text
├── docs/                 # All product & technical specifications
├── frontend/             # React application (customer chat + sales dashboard)
├── backend/              # FastAPI application
├── n8n/                  # Workflow definitions
├── database/             # Migrations & seeds
├── tests/                # End-to-end tests
├── IMPLEMENTATION.md     # Implementation guide (source of truth for how to build)
├── AGENTS.md             # Guidance for AI coding agents
└── ...
```

## Quick Start (Development)

```bash
# 1. Clone
git clone https://github.com/Donteg2/real-estate-lead-project.git
cd real-estate-lead-project

# 2. Environment
cp .env.example .env
# Edit .env with your values

# 3. Backend
cd backend
python -m venv .venv
source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

# 4. Frontend
cd ../frontend
npm install
npm run dev

# 5. Database & n8n
# Use docker-compose (recommended) or run PostgreSQL + n8n separately
```

## Documentation

Start here:

- [Product Requirements (PRD)](docs/PRD.md)
- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [Implementation Guide](IMPLEMENTATION.md)
- [Development Setup](docs/DEVELOPMENT_SETUP.md)
- [Data Model](docs/DATA_MODEL.md)
- [API Specification](docs/API.md)

## Status

**Phase:** Project scaffolding & documentation organization  
**Next:** Database models + FastAPI foundation

---

Built for **PrimeHomes Realty**
