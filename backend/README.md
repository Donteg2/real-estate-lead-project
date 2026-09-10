# Backend — FastAPI Application

Primary application API, business logic, validation, lead management, and database access.

## Structure

```text
backend/
├── app/
│   ├── main.py
│   ├── api/
│   │   └── v1/
│   │       ├── health.py
│   │       ├── auth.py
│   │       ├── leads.py
│   │       ├── conversations.py
│   │       ├── messages.py
│   │       └── followups.py
│   ├── models/          # SQLAlchemy models
│   ├── schemas/         # Pydantic schemas
│   ├── services/        # Business logic
│   ├── repositories/    # Data access
│   ├── core/            # Config, security, etc.
│   └── db/              # Database session / engine
├── tests/
├── requirements.txt
└── README.md
```

## Development

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `GET http://localhost:8000/api/v1/health`
