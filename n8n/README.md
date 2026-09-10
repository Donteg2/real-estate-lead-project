# n8n Workflows

n8n is the workflow orchestration and integration layer.

## Recommended Workflows

| Workflow Name                    | Purpose                              |
|----------------------------------|--------------------------------------|
| `PRH-LEAD-PROCESS-MESSAGE`       | Main message → AI → lead pipeline    |
| `PRH-LEAD-QUALIFY`               | Deterministic qualification / scoring|
| `PRH-LEAD-NOTIFY-SALES`          | Notify sales team on hot leads       |
| `PRH-FOLLOWUP-REMINDER`          | Scheduled follow-up reminders        |
| `PRH-ERROR-HANDLER`              | Centralized error handling           |

## Structure

```text
n8n/
├── workflows/          # Exported workflow JSON files
└── README.md
```

Export workflows from the n8n UI and place the JSON files here so they are version-controlled.

## Principles

- n8n orchestrates; it should not own complex domain logic.
- Complex, testable business rules belong in FastAPI.
- AI calls and external notifications are good fits for n8n.
