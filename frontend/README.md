# Frontend — React Application

Customer-facing chat interface and internal sales dashboard for the Real Estate Lead Bot.

## Structure (planned)

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Shared UI primitives
│   │   ├── chat/         # Chat window, messages, input
│   │   ├── leads/        # Lead cards, lists, details
│   │   ├── dashboard/    # Sales dashboard components
│   │   └── followups/
│   ├── pages/
│   │   ├── customer/     # Public chat experience
│   │   ├── auth/
│   │   └── dashboard/    # Protected sales area
│   ├── services/         # API clients
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── app/
├── public/
├── package.json
└── README.md
```

## Tech

- React + TypeScript
- Vite (recommended)
- Tailwind CSS (or similar) for styling

## Development

```bash
npm install
npm run dev
```

The frontend communicates **only** with the FastAPI backend. It must not contain business rules or talk directly to the database / AI providers.
