# Tests

- Backend unit / integration tests live under `backend/tests/`
- End-to-end tests can live here under `tests/e2e/`

Prefer testing the most critical paths:

1. Message intake → lead creation
2. AI extraction validation
3. Lead scoring / qualification
4. Status transitions
5. Notifications (mocked)
