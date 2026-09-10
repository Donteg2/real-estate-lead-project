# Database

PostgreSQL is the system of record.

## Structure

```text
database/
├── migrations/     # Alembic migrations (or equivalent)
├── seeds/          # Optional seed data
└── README.md
```

## Local Development

Recommended connection string (see `.env.example`):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/real_estate_leads
```

Use Alembic from the `backend/` directory for migrations.

## Core Entities (high level)

- User / SalesUser
- Customer
- Lead
- Conversation
- Message
- LeadScore
- LeadAssignment
- FollowUp / Activity
- SalesNote

See `docs/DATA_MODEL.md` for the full specification.
