# REAL ESTATE LEAD BOT — IMPLEMENTATION.md

**Project:** PrimeHomes Realty — Real Estate Lead Bot  
**Status:** Draft / Implementation Guide  
**Version:** 1.0  
**Architecture:** React + FastAPI + n8n + AI + SQL Database  
**Prototype Database:** Google Sheets  
**Primary Goal:** Automatically receive, understand, qualify, store, route, and track real estate leads.

---

## 1. Purpose

The Real Estate Lead Bot is a small business system that acts as a digital receptionist for PrimeHomes Realty.

The system receives customer enquiries, understands their requirements using AI, extracts structured information, qualifies the lead, stores the lead, responds to the customer, alerts the sales team, and tracks the lead through the sales process.

The system should transform:

```text
Unstructured Customer Message
            ↓
Structured Customer Requirements
            ↓
Qualified Lead
            ↓
Sales Action
            ↓
Trackable Business Outcome
```

This document describes how the system should be implemented.

---

## 2. Product Objective

The system must support the following core flow:

```text
Customer
   ↓
React Chat Interface
   ↓
FastAPI
   ↓
n8n
   ↓
AI Processing
   ↓
Structured Lead Data
   ↓
Validation
   ↓
Lead Qualification
   ↓
Lead Scoring
   ↓
Database
   ↓
Sales Notification
   ↓
Sales Dashboard
   ↓
Follow-up
   ↓
Lead Status Tracking
```

---

## 3. Technology Stack

### Frontend

```text
React
TypeScript or JavaScript
HTML
CSS
```

Responsibilities:

- Customer chat interface.
- Lead form where required.
- Bot messages.
- Customer input.
- Sales dashboard.
- Lead list.
- Lead details.
- Conversation history.
- Lead status.
- Sales notes.
- Follow-up information.

### Backend

```text
Python
FastAPI
```

Responsibilities:

- REST API.
- Request validation.
- Response validation.
- Authentication.
- Authorization.
- Business logic.
- Data validation.
- Database access where appropriate.
- Error handling.
- Security.
- Application services.

### Automation

```text
n8n
```

Responsibilities:

- Workflow orchestration.
- AI workflow execution.
- External integrations.
- Notifications.
- Lead routing.
- Scheduled follow-ups.
- Data synchronization.
- Automation.

### AI

Responsibilities:

- Natural-language understanding.
- Intent classification.
- Requirement extraction.
- Missing-information detection.
- Conversation summarization.
- Response generation.

AI should not own deterministic business rules.

For example:

```text
AI
→ Extract budget = ₦80m

Business Logic
→ Calculate lead score
```

### Database

Two database approaches will be used depending on the development stage.

#### Prototype

```text
Google Sheets
```

Useful for:

- Rapid prototyping.
- Easy inspection.
- Simple n8n integration.
- Demonstrating the workflow.

#### Production

```text
SQL Database
```

The SQL database should eventually become the primary system of record.

It provides:

- Relationships.
- Constraints.
- Transactions.
- Data integrity.
- Better querying.
- Scalability.
- Reliable concurrent access.

Google Sheets can later remain as a reporting/export/integration destination.

---

## 4. Engineering Principles

### 4.1 Separation of Responsibilities

Each component should have a clear responsibility.

```text
React
→ Presentation and interaction

FastAPI
→ API and application logic

n8n
→ Workflow orchestration and integrations

AI
→ Natural-language understanding and generation

SQL Database
→ Persistent business data
```

### 4.2 Do Not Duplicate Business Logic

Avoid implementing the same business rule in:

```text
React
FastAPI
n8n
AI prompt
```

For example, lead scoring should have one authoritative implementation.

AI can extract the information needed for scoring, but should not decide the score unless explicitly designed to do so.

### 4.3 Use the Simplest Appropriate Tool

Do not use code simply because code is available.

Do not use n8n simply because n8n is available.

Use:

```text
React
→ UI problems

FastAPI
→ API/application/business problems

n8n
→ Workflow/integration problems

AI
→ Language/intelligence problems

Database
→ Persistence/data problems
```

---

## 5. Repository Structure

The project should follow a structure similar to:

```text
real-estate-lead-project/
│
├── README.md
├── LICENSE
├── IMPLEMENTATION.md
├── AGENTS.md
├── .gitignore
├── .env.example
│
├── docs/
│   ├── PRD.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DOMAIN.md
│   ├── API.md
│   ├── DATA_MODEL.md
│   ├── TESTING_STRATEGY.md
│   ├── SECURITY.md
│   └── adr/
│       ├── ADR-001.md
│       └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   └── README.md
│
├── n8n/
│   ├── workflows/
│   └── README.md
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── README.md
│
└── tests/
    └── e2e/
```

The structure may evolve as implementation progresses.

---

## 6. Development Phases

The system should be built incrementally.

```text
Phase 1  → Documentation
Phase 2  → Architecture
Phase 3  → Data Model
Phase 4  → FastAPI Backend
Phase 5  → React Frontend
Phase 6  → Basic Lead Pipeline
Phase 7  → n8n Automation
Phase 8  → AI Integration
Phase 9  → Lead Qualification
Phase 10 → Sales Dashboard
Phase 11 → Follow-up
Phase 12 → Testing
Phase 13 → Security
Phase 14 → Deployment
Phase 15 → Optimization
```

Do not attempt to build everything at once.

---

## 7. Phase 1 — Repository and Documentation

### Objective

Create the engineering foundation before significant development begins.

Tasks:

```text
[ ] GitHub repository created
[ ] Local repository configured
[ ] Mentor documentation added
[ ] README created
[ ] PRD created
[ ] IMPLEMENTATION.md created
[ ] SYSTEM_ARCHITECTURE.md created
[ ] DOMAIN.md created
[ ] API.md created
[ ] DATA_MODEL.md created
[ ] TESTING_STRATEGY.md created
[ ] SECURITY.md created
[ ] AGENTS.md created
[ ] .gitignore created
[ ] .env.example created
```

The documentation should allow a developer or AI coding assistant to understand the project without needing the original conversation.

---

## 8. Phase 2 — System Architecture

The architecture must define:

- Components.
- Responsibilities.
- Data flow.
- API boundaries.
- n8n boundaries.
- AI boundaries.
- Database boundaries.
- Authentication.
- Authorization.
- Error handling.
- Security.
- Deployment.
- External integrations.

Detailed architecture belongs in:

```text
docs/SYSTEM_ARCHITECTURE.md
```

---

## 9. Phase 3 — Data Model

The conceptual model is:

```text
Customer
   │
   └── Lead
         │
         ├── Conversation
         │      └── Messages
         │
         ├── Lead Score
         │
         ├── Status History
         │
         ├── Assignment
         │
         ├── Sales Notes
         │
         └── Follow-up Activities
```

Potential entities:

```text
Customer
Lead
Conversation
Message
LeadScore
LeadStatusHistory
SalesUser
LeadAssignment
SalesNote
FollowUpActivity
```

The final database schema belongs in:

```text
docs/DATA_MODEL.md
```

---

## 10. Phase 4 — Backend Implementation

Create the FastAPI application.

Recommended structure:

```text
backend/
│
├── app/
│   ├── main.py
│   │
│   ├── api/
│   │   └── routes/
│   │
│   ├── schemas/
│   │
│   ├── models/
│   │
│   ├── services/
│   │
│   ├── repositories/
│   │
│   ├── core/
│   │
│   └── utils/
│
├── tests/
│
├── requirements.txt
└── README.md
```

The backend should generally follow:

```text
HTTP Request
     ↓
Router
     ↓
Application Service
     ↓
Business Logic
     ↓
Repository
     ↓
Database
```

Controllers/routes should remain thin.

---

## 11. Backend API

Initial API candidates:

```text
POST   /api/v1/chat

POST   /api/v1/leads

GET    /api/v1/leads

GET    /api/v1/leads/{lead_id}

PATCH  /api/v1/leads/{lead_id}

GET    /api/v1/leads/{lead_id}/conversation

POST   /api/v1/leads/{lead_id}/notes

PATCH  /api/v1/leads/{lead_id}/status
```

These are initial candidates rather than final contracts.

The final API contract should be documented in:

```text
docs/API.md
```

---

## 12. Health Check

The backend should expose:

```http
GET /health
```

Initial response:

```json
{
  "status": "ok"
}
```

Later this can be extended to check:

```text
Application
Database
n8n
AI Provider
External Integrations
```

---

## 13. Phase 5 — React Frontend

The React application should contain two primary experiences:

```text
Customer Interface
+
Sales Interface
```

Recommended structure:

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── App.*
│
├── public/
│
└── package.json
```

---

## 14. Customer Chat

The customer should be able to:

1. Open the chat.
2. Send a message.
3. Receive a bot response.
4. Continue the conversation.
5. Provide additional requirements.
6. Answer follow-up questions.

React manages:

```text
UI state
Loading state
Error state
Messages
User interaction
```

React should not contain the core lead qualification logic.

---

## 15. Chat Flow

```text
Customer
    ↓
React
    ↓
POST /api/v1/chat
    ↓
FastAPI
    ↓
n8n
    ↓
AI
    ↓
Lead Processing
    ↓
Response
    ↓
FastAPI
    ↓
React
    ↓
Customer
```

---

## 16. Phase 6 — Basic Lead Pipeline

Before implementing advanced AI behaviour, establish the basic pipeline.

```text
Receive Message
      ↓
Create Conversation
      ↓
Store Message
      ↓
Create/Update Lead
      ↓
Return Response
```

The purpose of this phase is to prove that the fundamental system works end-to-end.

---

## 17. Lead Object

A lead should conceptually contain:

```json
{
  "id": "lead-id",
  "customer_id": "customer-id",
  "intent": "BUY_PROPERTY",
  "property_type": "APARTMENT",
  "location": "Lekki",
  "bedrooms": 3,
  "budget": 80000000,
  "currency": "NGN",
  "timeline": "WITHIN_3_MONTHS",
  "score": 88,
  "qualification": "HOT",
  "status": "NEW"
}
```

Unknown values should remain unknown.

Example:

```json
{
  "budget": null
}
```

The system must never invent customer information.

---

## 18. Phase 7 — n8n Workflow

The initial n8n workflow should be:

```text
Webhook / Trigger
       ↓
Validate Input
       ↓
Prepare Data
       ↓
AI Processing
       ↓
Validate AI Output
       ↓
Create / Update Lead
       ↓
Qualification
       ↓
Lead Scoring
       ↓
Database
       ↓
Notification
       ↓
Response Generation
       ↓
Return Result
```

---

## 19. n8n Responsibilities

n8n should handle:

```text
Workflow orchestration
External integrations
Notifications
Scheduling
Routing
AI workflow execution
Data synchronization
Follow-up automation
```

Avoid putting large amounts of complex domain logic inside n8n.

Complex reusable business logic belongs in the backend/application layer where it can be properly tested.

---

## 20. n8n Workflow Design Rules

Each workflow should have:

```text
Clear trigger
Clear input
Clear output
Validation
Error handling
Retry strategy where required
Logging
Minimal duplication
```

Large workflows should be split into reusable sub-workflows when appropriate.

---

## 21. Phase 8 — AI Integration

AI should be used for problems involving natural language.

Primary capabilities:

```text
Intent Classification
Requirement Extraction
Missing Information Detection
Conversation Summarization
Response Generation
```

---

## 22. AI Requirement Extraction

Example input:

```text
"Hi, I'm looking for a 3-bedroom apartment around Lekki.
My budget is around ₦80 million and I'd like to move
within the next two months."
```

Expected structured output:

```json
{
  "intent": "BUY_PROPERTY",
  "property_type": "APARTMENT",
  "bedrooms": 3,
  "location": "Lekki",
  "budget": 80000000,
  "currency": "NGN",
  "timeline": "WITHIN_3_MONTHS"
}
```

---

## 23. AI Structured Output

Prefer structured output over free-form AI responses.

Example:

```json
{
  "intent": "BUY_PROPERTY",
  "confidence": 0.94,
  "requirements": {
    "property_type": "APARTMENT",
    "location": "Lekki",
    "bedrooms": 3,
    "budget": 80000000,
    "currency": "NGN",
    "timeline": "WITHIN_3_MONTHS"
  },
  "missing_fields": [],
  "suggested_question": null
}
```

The backend must validate the AI output before using it.

---

## 24. AI Confidence

The AI should explicitly handle uncertainty.

Customer:

```text
"I need something affordable around Lagos."
```

Valid:

```json
{
  "location": "Lagos",
  "budget": null
}
```

Invalid:

```json
{
  "location": "Lagos",
  "budget": 5000000
}
```

The bot should ask:

```text
"What budget range are you considering?"
```

---

## 25. AI Guardrails

AI must not:

- Invent property listings.
- Invent availability.
- Invent prices.
- Invent locations.
- Invent property features.
- Guarantee availability.
- Make legal commitments.
- Make financial commitments.
- Override business rules.
- Create fake customer data.
- Modify sensitive information without validation.

---

## 26. Phase 9 — Lead Qualification

Lead qualification should primarily be deterministic.

```text
AI Extraction
      ↓
Validated Data
      ↓
Qualification Rules
      ↓
Lead Score
      ↓
HOT / WARM / COLD / UNQUALIFIED
```

Potential scoring signals:

```text
Buying intent
Budget
Timeline
Location
Property type
Bedrooms
Contact information
Engagement
Viewing request
Requirement completeness
```

---

## 27. Lead Scoring

Example scoring model:

```text
Buying intent                  +25
Budget provided                +15
Location provided              +15
Property type provided         +10
Immediate timeline             +20
Phone provided                 +10
Viewing requested              +5
----------------------------------
Maximum                       100
```

This is an example.

The actual scoring model should be approved as a business rule.

---

## 28. Qualification Categories

Initial categories:

```text
HOT
WARM
COLD
UNQUALIFIED
```

Example thresholds:

```text
80–100 → HOT

50–79  → WARM

20–49  → COLD

0–19   → UNQUALIFIED
```

Thresholds should be configurable.

---

## 29. Phase 10 — Sales Notifications

Hot or otherwise actionable leads should trigger a sales notification.

Example:

```text
🔥 HOT LEAD

Lead: LEAD-000001

Intent: Buying

Property:
3-bedroom apartment

Location:
Lekki

Budget:
₦80,000,000

Timeline:
Within 2 months

Score:
88/100

Action:
Contact customer
```

Possible notification channels:

```text
Email
Slack
WhatsApp
Microsoft Teams
Internal Dashboard
```

The first production notification channel should be selected during integration design.

---

## 30. Lead Assignment

The system should support assigning leads to sales representatives.

Potential strategies:

```text
Manual assignment
Round robin
Location-based assignment
Property-type assignment
Sales representative availability
Manager assignment
```

For the MVP, manual assignment or simple round-robin assignment is recommended.

---

## 31. Sales Dashboard

The sales dashboard should allow authorized users to:

```text
View leads
Search leads
Filter leads
View lead score
View qualification
View customer information
View property requirements
View conversation history
Update lead status
Add notes
Record follow-ups
View assignments
```

---

## 32. Lead Status

Initial statuses:

```text
NEW
CONTACTED
QUALIFIED
FOLLOW_UP
VIEWING_SCHEDULED
NEGOTIATION
CONVERTED
LOST
NOT_INTERESTED
UNQUALIFIED
INVALID
```

---

## 33. Lead Status Flow

Example:

```text
NEW
 ↓
QUALIFIED
 ↓
CONTACTED
 ↓
FOLLOW_UP
 ↓
VIEWING_SCHEDULED
 ↓
NEGOTIATION
 ↓
CONVERTED
```

Possible terminal states:

```text
CONVERTED
LOST
NOT_INTERESTED
INVALID
```

Invalid transitions should be rejected.

---

## 34. Conversation History

Every lead should have conversation history.

Example:

```text
09:10 Customer:
"I want a 3 bedroom apartment."

09:11 Bot:
"Which location are you interested in?"

09:11 Customer:
"Lekki."

09:12 Bot:
"What is your approximate budget?"

09:12 Customer:
"80 million."
```

Sales representatives should be able to review the conversation without asking the customer to repeat information.

---

## 35. Sales Notes

Sales representatives should be able to create internal notes.

Example:

```text
"Customer prefers Lekki Phase 1.
Requested viewing for Saturday."
```

Internal notes must never automatically become customer-visible messages.

---

## 36. Follow-up

The system should track:

```text
Follow-up date
Follow-up type
Sales representative
Outcome
Notes
Next action
```

Example:

```text
Date:
2026-09-15

Type:
Phone Call

Outcome:
Interested

Next Action:
Schedule viewing
```

Future versions can automate reminders.

---

## 37. Duplicate Lead Detection

The system should attempt to prevent unnecessary duplicates.

Possible matching information:

```text
Phone number
Email
Customer ID
Conversation ID
Existing active lead
```

Possible strategy:

```text
Incoming Lead
      ↓
Check Existing Customer
      ↓
Check Existing Active Lead
      ↓
Existing?
 ┌────┴────┐
Yes        No
 ↓          ↓
Update     Create
```

The exact duplicate strategy belongs in the data model and architecture documents.

---

## 38. Database Strategy

### Prototype

Use:

```text
n8n
 ↓
Google Sheets
```

Advantages:

```text
Fast to implement
Easy to inspect
Easy to demonstrate
Simple n8n integration
```

Limitations:

```text
Weak relational modelling
Limited concurrency
Limited transactions
Difficult complex queries
Not ideal as long-term system of record
```

### Production

Move toward:

```text
FastAPI / n8n
       ↓
SQL Database
```

The SQL database should become the authoritative source of truth.

---

## 39. Data Ownership

Define a clear owner for each type of data.

Example:

```text
Customer Data
→ Database

Lead Data
→ Database

Lead Status
→ Backend + Database

Lead Score
→ Business Logic + Database

Conversation
→ Database

AI Extraction
→ AI Processing Layer

Notifications
→ n8n

UI State
→ React
```

No component should silently become the source of truth for another component's data.

---

## 40. API Communication

Frontend-to-backend:

```text
React
   ↓
HTTPS
   ↓
FastAPI
```

FastAPI-to-n8n:

```text
FastAPI
   ↓
Authenticated API/Webhook
   ↓
n8n
```

The final communication model should be documented in `SYSTEM_ARCHITECTURE.md`.

---

## 41. API Validation

All external input must be validated.

Validate:

```text
Required fields
Data types
String length
IDs
Email
Phone
Numeric ranges
Enum values
Request structure
```

Invalid requests should return appropriate HTTP errors.

---

## 42. Authentication

Sales functionality must require authentication.

Conceptually:

```text
Customer
   ↓
Public Chat

Sales Representative
   ↓
Authenticated Dashboard

Sales Manager
   ↓
Authenticated Dashboard
   ↓
Manager Permissions
```

The final authentication strategy should be selected during architecture design.

---

## 43. Authorization

Authentication asks:

> Who are you?

Authorization asks:

> What are you allowed to do?

Example:

```text
Customer
→ Send messages

Sales Representative
→ View assigned leads
→ Update assigned leads
→ Add notes
→ Record follow-ups

Sales Manager
→ View all leads
→ Assign leads
→ View team performance
```

---

## 44. Error Handling

Every major component must have an error strategy.

```text
React Error
    ↓
API Error
    ↓
n8n Error
    ↓
AI Error
    ↓
Database Error
    ↓
Notification Error
```

Errors must be:

```text
Detected
Logged
Handled
Recoverable where possible
Communicated appropriately
```

---

## 45. AI Failure Handling

If the AI fails:

```text
AI Request
    ↓
Failure
    ↓
Retry
    ↓
Retry Failed
    ↓
Fallback
    ↓
Log Failure
```

A failed AI request must never cause the lead to disappear.

---

## 46. Database Failure Handling

If persistence fails, the system must not tell the customer:

```text
"Your information has been saved."
```

unless the save operation actually succeeded.

---

## 47. Notification Failure

If notification fails:

```text
Lead Created
      ↓
Notification Failed
      ↓
Record Failure
      ↓
Retry / Recovery
```

The lead itself must remain stored.

---

## 48. Idempotency

Important operations should prevent duplicate processing.

Example:

```text
Same Event
    ↓
Received Twice
    ↓
Should NOT create
two identical leads
```

Possible mechanisms:

```text
Request ID
Event ID
Idempotency Key
Unique Database Constraint
```

---

## 49. Logging

Important events should be logged.

Examples:

```text
Request received
Conversation created
Message received
AI processing started
AI processing completed
Lead created
Lead updated
Lead qualified
Lead assigned
Notification sent
Notification failed
Database error
AI error
Authentication failure
```

Never log:

```text
API keys
Passwords
Authentication tokens
Secrets
Unnecessary sensitive customer information
```

---

## 50. Observability

The production system should eventually monitor:

```text
API health
API latency
Workflow health
AI failures
Database failures
Notification failures
Lead processing failures
Response time
Error rates
```

Possible observability features:

```text
Structured logs
Metrics
Error tracking
Health checks
Alerts
```

---

## 51. Environment Configuration

Environment-specific values must not be hardcoded.

Example `.env.example`:

```text
DATABASE_URL=

AI_API_KEY=

N8N_WEBHOOK_URL=

N8N_API_KEY=

SECRET_KEY=

FRONTEND_URL=
```

Local development may use:

```text
.env
```

Never commit the real `.env`.

Commit:

```text
.env.example
```

---

## 52. Git Workflow

Development workflow:

```text
Create Branch
      ↓
Implement Feature
      ↓
Run Tests
      ↓
Review Changes
      ↓
Commit
      ↓
Push
      ↓
Pull Request
      ↓
Review
      ↓
Merge
```

---

## 53. Branch Naming

Examples:

```text
feature/react-chat
feature/lead-api
feature/ai-extraction
feature/lead-scoring
feature/sales-dashboard

fix/duplicate-leads
fix/ai-timeout

docs/update-architecture
docs/add-domain-model
```

---

## 54. Commit Convention

Use meaningful commits.

Good:

```text
docs: add implementation guide

feat: create FastAPI application

feat: add lead creation endpoint

feat: add React chat interface

feat: add n8n lead workflow

feat: add AI requirement extraction

feat: add lead scoring

feat: add sales notification

test: add lead scoring tests

fix: handle missing budget
```

Avoid:

```text
stuff
changes
update
final
final2
new changes
```

---

## 55. Testing Strategy

Testing should exist at multiple levels:

```text
End-to-End
     ↑
Integration
     ↑
Unit
```

Additional tests:

```text
API Tests
Frontend Tests
AI Evaluation
n8n Workflow Tests
Security Tests
```

---

## 56. Backend Testing

Test:

```text
API endpoints
Request validation
Response validation
Business rules
Lead scoring
Lead status transitions
Authentication
Authorization
Database operations
Error handling
```

---

## 57. Frontend Testing

Test:

```text
Chat rendering
Message submission
API communication
Loading states
Error states
Lead list
Lead details
Status updates
Sales notes
```

---

## 58. AI Testing

Create representative customer messages.

Examples:

```text
"I want a 3 bedroom apartment in Lekki."

"I need land around Ibadan below 20m."

"Do you have 2 bedroom apartments in Ikeja?"

"Hello, I want to buy a house."

"I'm looking for something around Lagos."

"I want to rent a house but I'm not sure where yet."
```

Also test:

```text
Missing information
Ambiguous information
Contradictory information
Typos
Informal language
Short messages
Long messages
Unexpected input
```

---

## 59. n8n Testing

Test:

```text
Successful execution
Invalid input
AI failure
Database failure
Notification failure
Retry behaviour
Duplicate events
Unexpected AI output
```

---

## 60. End-to-End Testing

The full system should be tested as:

```text
Customer
    ↓
React
    ↓
FastAPI
    ↓
n8n
    ↓
AI
    ↓
Database
    ↓
Notification
    ↓
Sales Dashboard
```

---

## 61. Definition of Done

A feature is complete when:

```text
[ ] Requirement understood
[ ] Architecture reviewed
[ ] Implementation completed
[ ] Validation added
[ ] Error handling added
[ ] Tests added
[ ] Tests pass
[ ] Security considered
[ ] Documentation updated
[ ] API updated if required
[ ] Database updated if required
[ ] n8n workflow updated if required
[ ] AI schema/prompt updated if required
[ ] Code reviewed
```

---

## 62. AI Coding Assistant Workflow

AI coding assistants should follow:

```text
Read README
      ↓
Read PRD
      ↓
Read IMPLEMENTATION.md
      ↓
Read Relevant Architecture Docs
      ↓
Read Domain Rules
      ↓
Inspect Existing Code
      ↓
Identify Affected Components
      ↓
Create Implementation Plan
      ↓
Implement Smallest Safe Change
      ↓
Run Tests
      ↓
Review Changes
      ↓
Update Documentation
```

AI agents should understand the project before writing code.

---

## 63. AI Coding Assistant Rules

AI agents should:

```text
Reuse existing patterns
Follow architecture
Follow naming conventions
Avoid unnecessary dependencies
Avoid unrelated refactoring
Write tests
Validate assumptions
Document important changes
Preserve existing behaviour
```

AI agents must not:

```text
Invent requirements
Invent APIs
Invent database fields
Invent business rules
Hardcode credentials
Disable tests
Delete working functionality unnecessarily
Change architecture without justification
Modify unrelated files
```

---

## 64. Change Management

A significant product change should be traced through the system.

```text
Product Change
      ↓
PRD
      ↓
Domain
      ↓
Architecture
      ↓
API
      ↓
Data Model
      ↓
Implementation
      ↓
Tests
```

Example:

Adding a new lead status may affect:

```text
DOMAIN.md
DATA_MODEL.md
API.md
FastAPI
React
n8n
Tests
```

---

## 65. Documentation Synchronization

When implementation changes, check whether these documents need updates:

```text
README.md
PRD.md
IMPLEMENTATION.md
SYSTEM_ARCHITECTURE.md
DOMAIN.md
API.md
DATA_MODEL.md
TESTING_STRATEGY.md
SECURITY.md
AGENTS.md
ADR documents
```

Do not update every document unnecessarily.

Only update documents whose defined behaviour has changed.

---

## 66. MVP Development Order

Recommended order:

```text
1. Documentation
        ↓
2. Architecture
        ↓
3. Data Model
        ↓
4. FastAPI Skeleton
        ↓
5. React Skeleton
        ↓
6. Basic API
        ↓
7. Basic Chat
        ↓
8. Lead Persistence
        ↓
9. n8n Workflow
        ↓
10. AI Extraction
        ↓
11. Qualification
        ↓
12. Lead Scoring
        ↓
13. Notifications
        ↓
14. Sales Dashboard
        ↓
15. Follow-up
        ↓
16. Testing
        ↓
17. Security
        ↓
18. Deployment
```

---

## 67. Milestone 1 — Foundation

```text
[ ] Repository created
[ ] Documentation added
[ ] Mentor documentation integrated
[ ] README created
[ ] PRD created
[ ] Implementation document created
[ ] Architecture document created
[ ] Domain document created
[ ] API document created
[ ] Data model document created
[ ] Testing document created
[ ] Security document created
[ ] AGENTS.md created
[ ] .gitignore created
[ ] .env.example created
```

---

## 68. Milestone 2 — Backend

```text
[ ] FastAPI project created
[ ] Application starts
[ ] Health endpoint created
[ ] API versioning established
[ ] Request validation implemented
[ ] Error handling implemented
[ ] Lead endpoint created
[ ] Tests created
```

---

## 69. Milestone 3 — Frontend

```text
[ ] React project created
[ ] Application starts
[ ] Chat interface created
[ ] Message input created
[ ] API integration created
[ ] Loading state created
[ ] Error state created
[ ] Conversation UI created
```

---

## 70. Milestone 4 — Lead Pipeline

```text
[ ] Customer message received
[ ] Conversation created
[ ] Message stored
[ ] Lead created
[ ] Lead retrieved
[ ] Lead updated
```

---

## 71. Milestone 5 — AI

```text
[ ] AI provider selected
[ ] AI integration implemented
[ ] Intent extraction implemented
[ ] Requirement extraction implemented
[ ] Missing fields implemented
[ ] Structured output implemented
[ ] AI output validation implemented
[ ] AI failure handling implemented
```

---

## 72. Milestone 6 — Qualification

```text
[ ] Qualification rules defined
[ ] Lead scoring implemented
[ ] HOT classification implemented
[ ] WARM classification implemented
[ ] COLD classification implemented
[ ] UNQUALIFIED classification implemented
[ ] Score stored
```

---

## 73. Milestone 7 — Sales

```text
[ ] Sales dashboard created
[ ] Lead list created
[ ] Lead details created
[ ] Conversation history created
[ ] Lead status implemented
[ ] Sales notes implemented
[ ] Lead assignment implemented
[ ] Follow-up tracking implemented
[ ] Notifications implemented
```

---

## 74. Milestone 8 — Reliability

```text
[ ] API error handling
[ ] AI retry strategy
[ ] n8n error handling
[ ] Database error handling
[ ] Notification retry strategy
[ ] Logging
[ ] Health checks
[ ] Monitoring
```

---

## 75. Milestone 9 — Testing

```text
[ ] Backend unit tests
[ ] Backend integration tests
[ ] API tests
[ ] Frontend tests
[ ] AI evaluation tests
[ ] n8n workflow tests
[ ] End-to-end tests
[ ] Error-path tests
```

---

## 76. Milestone 10 — Deployment

Before production:

```text
[ ] Production environment configured
[ ] Secrets configured securely
[ ] Database configured
[ ] n8n configured
[ ] AI provider configured
[ ] Frontend deployed
[ ] Backend deployed
[ ] HTTPS enabled
[ ] Authentication enabled
[ ] Logging enabled
[ ] Monitoring enabled
[ ] Backups configured
[ ] Production smoke tests completed
```

---

## 77. Example End-to-End Implementation

Customer sends:

```text
"Hi, I'm looking for a 3-bedroom apartment around Lekki.
My budget is around ₦80 million."
```

React sends:

```http
POST /api/v1/chat
```

FastAPI validates the request.

FastAPI sends the workflow request to n8n.

n8n sends the customer message to the AI system.

AI returns:

```json
{
  "intent": "BUY_PROPERTY",
  "property_type": "APARTMENT",
  "bedrooms": 3,
  "location": "Lekki",
  "budget": 80000000,
  "currency": "NGN"
}
```

The system validates the output.

Qualification logic runs.

Example:

```text
Score: 75
Qualification: WARM
```

The lead is persisted.

The bot responds:

```text
"Thanks! I can help with that. Are you looking for a
specific part of Lekki, and when are you hoping to move?"
```

The customer sees the response in React.

The sales team can see the lead in the dashboard.

---

## 78. Example Incomplete Lead

Customer:

```text
"Hello, I want to buy a house."
```

AI returns:

```json
{
  "intent": "BUY_PROPERTY",
  "property_type": "HOUSE",
  "location": null,
  "budget": null,
  "bedrooms": null,
  "timeline": null
}
```

The lead should still be created.

The system should not reject it simply because information is missing.

The bot can ask:

```text
"Absolutely. Which area are you interested in,
and approximately what is your budget?"
```

---

## 79. Example Land Lead

Customer:

```text
"I need land around Ibadan, preferably below ₦20 million."
```

AI returns:

```json
{
  "intent": "BUY_LAND",
  "property_type": "LAND",
  "location": "Ibadan",
  "budget": 20000000,
  "currency": "NGN",
  "bedrooms": null
}
```

Bedrooms should not be required because they are irrelevant to land.

---

## 80. Performance

Measure:

```text
Frontend → Backend latency
Backend → n8n latency
n8n → AI latency
AI processing time
Database latency
Notification latency
Total response time
```

Do not optimize prematurely.

Measure first, then optimize based on actual bottlenecks.

---

## 81. Scalability

The MVP should remain simple.

However, the architecture should allow future growth.

Potential future requirements:

```text
More customers
More leads
More sales representatives
More AI requests
More conversations
More integrations
Multiple communication channels
```

Future architecture may introduce:

```text
Queues
Background workers
Caching
Horizontal scaling
Event-driven processing
Dedicated services
```

Only introduce these when they solve a real problem.

---

## 82. Maintainability

Avoid:

```text
Huge functions
Huge n8n workflows
Duplicated business logic
Hardcoded configuration
Tightly coupled components
Unclear data ownership
Unvalidated AI output
```

Prefer:

```text
Small modules
Clear interfaces
Typed schemas
Reusable services
Explicit business rules
Automated tests
Clear documentation
```

---

## 83. Production Readiness Checklist

The system should not be considered production-ready until:

```text
[ ] Requirements documented
[ ] Architecture documented
[ ] Database design documented
[ ] API documented
[ ] Authentication implemented
[ ] Authorization implemented
[ ] Secrets protected
[ ] AI output validated
[ ] Business rules deterministic
[ ] Errors handled
[ ] Leads cannot silently disappear
[ ] Duplicate processing controlled
[ ] Logging implemented
[ ] Tests implemented
[ ] Critical workflows tested
[ ] Backups configured
[ ] Monitoring configured
[ ] Deployment documented
```

---

## 84. Implementation Decision Framework

### React

Use React when the problem involves:

```text
User interface
User interaction
Presentation
Client-side UI state
```

### FastAPI

Use FastAPI when the problem involves:

```text
API behaviour
Authentication
Authorization
Validation
Complex business logic
Reusable application services
```

### n8n

Use n8n when the problem involves:

```text
Workflow
Automation
Integration
Notification
Scheduling
External service orchestration
```

### AI

Use AI when the problem involves:

```text
Natural-language understanding
Classification
Extraction
Summarization
Natural-language generation
```

### Database

Use the database for:

```text
Persistent business information
Relationships
Historical records
Transactional state
```

---

## 85. Final Responsibility Model

```text
┌──────────────────────────────────────┐
│                React                 │
│           User Interface             │
└───────────────────┬──────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│               FastAPI                │
│        API + Application Logic       │
└───────────────────┬──────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│                 n8n                  │
│     Workflow + Integration Layer     │
└───────────────┬──────────────┬───────┘
                │              │
                ▼              ▼
        ┌──────────────┐ ┌──────────────┐
        │      AI      │ │   Database   │
        │ Intelligence │ │   Storage    │
        └──────────────┘ └──────────────┘
                │              │
                └──────┬───────┘
                       ▼
              ┌─────────────────┐
              │   Sales Team    │
              │ Dashboard +     │
              │ Notifications   │
              └─────────────────┘
```

---

## 86. Complete System Flow

```text
                         CUSTOMER
                            │
                            ▼
                    ┌───────────────┐
                    │  React Chat   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    FastAPI    │
                    │ API + Logic   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │      n8n      │
                    │ Orchestration │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │      AI       │
                    │ Understanding │
                    └───────┬───────┘
                            │
                            ▼
                  Structured Lead Data
                            │
                            ▼
                       Validation
                            │
                            ▼
                     Qualification
                            │
                            ▼
                      Lead Scoring
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
           ┌───────────┐        ┌────────────┐
           │ Database  │        │ Notification│
           └─────┬─────┘        └──────┬─────┘
                 │                     │
                 └──────────┬──────────┘
                            ▼
                    Sales Dashboard
                            │
                            ▼
                       Follow-up
                            │
                            ▼
                     Lead Tracking
                            │
                            ▼
                ┌────────────────────┐
                │ CONVERTED / LOST   │
                └────────────────────┘
```

---

## 87. Implementation Philosophy

The project should follow this principle:

> **Build the simplest reliable system that satisfies the product requirements.**

The goal is not to build the largest possible architecture.

The goal is to build a system that is:

```text
Simple
  ↓
Clear
  ↓
Testable
  ↓
Reliable
  ↓
Maintainable
  ↓
Scalable when necessary
```

The system should reliably transform:

```text
Customer Message
       ↓
Structured Lead
       ↓
Qualified Opportunity
       ↓
Sales Action
       ↓
Trackable Outcome
```

---

## 88. Current Implementation Status

```text
Repository              🟢 Started
Documentation           🟢 In Progress
PRD                     🟢 Created
Implementation          🟢 Created
System Architecture     🟡 Pending
Domain Model            🟡 Pending
API Design              🟡 Pending
Database Design         🟡 Pending
Backend                 ⬜ Not Started
Frontend                ⬜ Not Started
n8n Workflows           ⬜ Not Started
AI Integration          ⬜ Not Started
Lead Qualification      ⬜ Not Started
Sales Dashboard         ⬜ Not Started
Testing                 ⬜ Not Started
Deployment              ⬜ Not Started
```

---

## 89. Next Implementation Step

After this document, the next major engineering document should be:

```text
docs/SYSTEM_ARCHITECTURE.md
```

It should define the technical architecture in greater detail, including:

```text
Component architecture
React architecture
FastAPI architecture
n8n architecture
AI architecture
Database architecture
Google Sheets vs SQL
API communication
Data flow
Authentication
Authorization
Error handling
Security boundaries
Deployment architecture
External integrations
Synchronous vs asynchronous processing
System-of-record decisions
Architecture constraints
```

This implementation document describes **how we intend to build the system**.

The architecture document should describe **exactly how the components will communicate and where each responsibility lives**.
