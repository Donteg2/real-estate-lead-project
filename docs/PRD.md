# Product Requirements Document (PRD)

## Real Estate Lead Bot — PrimeHomes Realty

**Document Version:** 0.1  
**Status:** Draft  
**Product:** Real Estate Lead Bot  
**Client:** PrimeHomes Realty  
**Primary Users:** Potential Customers, Sales Representatives, Sales Managers  
**Technical Direction:** React + FastAPI + n8n + Google Sheets / SQL Database

---

# 1. Product Overview

## 1.1 Product Name

**PrimeHomes Realty — Real Estate Lead Bot**

## 1.2 Product Summary

The Real Estate Lead Bot is a system designed to automatically receive, understand, qualify, store, and route potential real estate customers to the appropriate sales team.

The system acts as a **digital receptionist and lead qualification assistant**.

Instead of requiring a salesperson to manually read every incoming customer message and extract relevant information, the system uses AI and automation to convert unstructured customer conversations into structured lead information.

### Example

A customer sends:

> "Hi, I'm looking for a 3-bedroom apartment around Lekki. My budget is around ₦80 million and I'd like to move in within two months."

The system should be able to understand this message and extract:

```json
{
  "intent": "buying",
  "property_type": "apartment",
  "bedrooms": 3,
  "location": "Lekki",
  "budget": 80000000,
  "currency": "NGN",
  "timeline": "within_2_months"
}
```

The system can then:

1. Create/update the lead.
2. Determine whether important information is missing.
3. Qualify the lead.
4. Calculate a lead score.
5. Store the lead.
6. Respond to the customer.
7. Notify the appropriate sales representative.
8. Allow the sales team to follow up.
9. Track the lead through its lifecycle.

---

# 2. Business Problem

PrimeHomes Realty receives potential customer enquiries through digital channels.

Customers do not provide information in a consistent format.

For example:

```text
"Hi, I need a 3 bedroom in Lekki."

"Do you have houses around Ikeja?"

"I want to buy land in Ibadan below 20m."

"Hello, I want to buy a house."

"I'm looking for an apartment around Lekki. Budget is 80m."
```

Each message may contain different amounts of useful information.

Currently, a salesperson may need to manually:

- Read the message.
- Identify the customer's intent.
- Extract the customer's requirements.
- Determine whether the customer is serious.
- Record the information.
- Respond to the customer.
- Notify another salesperson.
- Remember to follow up later.
- Track the status of the opportunity.

At higher volumes, this manual process can result in:

- Slow response times.
- Missed leads.
- Incomplete lead information.
- Inconsistent qualification.
- Poor follow-up.
- Leads being forgotten.
- Sales opportunities being lost.
- Difficulty measuring sales performance.

---

# 3. Problem Statement

PrimeHomes Realty needs a system that can reliably transform incoming customer conversations into actionable, structured sales leads while keeping humans in control of important sales decisions.

The system should reduce repetitive manual work without attempting to replace the sales team.

---

# 4. Product Vision

> **Turn every real estate enquiry into an organized, qualified, actionable sales opportunity.**

The long-term vision is to provide PrimeHomes Realty with an intelligent lead management layer that sits between customers and the sales team.

The system should make sure that:

**No important lead is ignored simply because the sales team received too many messages.**

---

# 5. Goals

## 5.1 Primary Goals

The system must:

1. Receive potential customer messages.
2. Understand customer intent.
3. Extract structured customer and property requirements.
4. Create and maintain lead records.
5. Identify missing information.
6. Qualify leads based on defined business rules.
7. Assign a lead score.
8. Respond to customers appropriately.
9. Notify the sales team about relevant leads.
10. Enable sales representatives to follow up.
11. Track lead status and progression.
12. Maintain conversation and lead history.

---

# 6. Non-Goals

The first version should **not** attempt to become a complete real estate CRM or property marketplace.

The MVP will not initially focus on:

- Property listing management.
- Property purchasing transactions.
- Payment processing.
- Contract management.
- Legal documentation.
- Property valuation.
- Automated negotiation.
- Fully autonomous sales.
- Replacing human sales representatives.
- Making legally binding commitments to customers.
- Guaranteeing property availability.
- Guaranteeing property prices.

The bot should assist the sales team rather than make decisions that require human judgment.

---

# 7. Target Users

## 7.1 Potential Customer

A person interested in:

- Buying property.
- Renting property.
- Buying land.
- Selling property.
- Asking about a property.

### Needs

The customer wants:

- Fast responses.
- Relevant questions.
- Easy communication.
- Accurate understanding of their requirements.
- Assistance finding an appropriate property.

---

## 7.2 Sales Representative

A member of PrimeHomes Realty responsible for following up with leads.

### Needs

The sales representative needs to:

- See new leads.
- Understand what the customer wants.
- Know how valuable/urgent the lead is.
- See conversation history.
- See contact information.
- Know what information is missing.
- Follow up with the customer.
- Update lead status.

---

## 7.3 Sales Manager

A manager responsible for monitoring the sales pipeline.

### Needs

The sales manager needs to:

- Monitor incoming leads.
- See high-value leads.
- Monitor sales representatives.
- Track lead status.
- Identify neglected leads.
- Measure conversion.
- Understand lead volume and quality.

---

# 8. Core User Journey

The primary journey is:

```text
Customer
   ↓
Sends Message
   ↓
System Receives Message
   ↓
Validate Input
   ↓
AI Understands Message
   ↓
Extract Lead Information
   ↓
Check Required Information
   ↓
Ask Customer Follow-up Questions
   ↓
Qualify Lead
   ↓
Calculate Lead Score
   ↓
Store/Update Lead
   ↓
Notify Sales Team
   ↓
Sales Representative Follows Up
   ↓
Lead Status Updated
   ↓
Lead Converted / Lost / Nurtured
```

---

# 9. Core Product Capabilities

## 9.1 Customer Message Intake

The system must be capable of receiving customer messages.

The initial implementation may expose a chat interface through the React frontend.

Future integrations may include:

- Website chat.
- WhatsApp.
- Email.
- Social media.
- Other messaging channels.

The architecture should avoid making the core lead-processing logic dependent on a single communication channel.

---

# 10. Customer Information

The system should attempt to collect:

| Field | Required | Description |
|---|---|---|
| Name | Preferred | Customer's name |
| Email | Preferred | Customer email |
| Phone | Preferred | Customer phone |
| Contact channel | Yes | Where the lead originated |
| Customer ID | System | Unique customer identifier |

The system must distinguish between:

**Known information**

and

**Unknown information.**

It must not invent information that the customer did not provide.

---

# 11. Property Requirements

The system should attempt to extract:

| Field | Description |
|---|---|
| Property type | Apartment, house, land, duplex, etc. |
| Transaction type | Buy, rent, sell |
| Location | Desired area/city |
| Budget | Maximum/approximate budget |
| Currency | NGN or other currency |
| Bedrooms | Desired number |
| Bathrooms | Desired number where applicable |
| Property features | Parking, security, furnished, etc. |
| Property condition | New, existing, off-plan, etc. |
| Intended use | Residential, commercial, investment, etc. |

Not every field will apply to every lead.

For example:

A land enquiry may not require bedrooms.

---

# 12. Customer Intent

The system should classify customer intent.

Initial intent categories:

```text
BUY_PROPERTY
RENT_PROPERTY
SELL_PROPERTY
BUY_LAND
PROPERTY_ENQUIRY
GENERAL_ENQUIRY
UNKNOWN
```

The intent classification should be extensible.

---

# 13. Timeline

The system should attempt to determine how soon the customer intends to act.

Initial categories:

```text
IMMEDIATE
WITHIN_1_MONTH
WITHIN_3_MONTHS
WITHIN_6_MONTHS
LONG_TERM
RESEARCHING
UNKNOWN
```

The system may extract a natural-language timeframe and normalize it into one of these categories.

Example:

> "I need somewhere to move into in six weeks."

Could become:

```json
{
  "timeline": "WITHIN_3_MONTHS"
}
```

The original customer statement should remain available in the conversation history.

---

# 14. Lead Qualification

The system should determine how valuable or urgent a lead is.

Initial categories:

```text
HOT
WARM
COLD
UNQUALIFIED
```

Qualification should be based on explicit business rules rather than allowing the AI model to independently decide everything.

For example:

### Possible signals

- Budget provided.
- Desired property identified.
- Location identified.
- Buying/renting intent identified.
- Timeline is immediate.
- Contact information provided.
- Customer has requested a viewing.
- Customer has demonstrated purchase readiness.

These signals can contribute to a lead score.

---

# 15. Lead Scoring

The system should calculate a numerical lead score.

Example conceptual model:

```text
Lead Score =
    Intent Score
  + Budget Score
  + Timeline Score
  + Requirement Completeness
  + Engagement Score
  + Contactability Score
```

Example:

```text
Intent: Buying              +25
Budget provided             +15
Location provided           +15
Property type provided      +10
Immediate timeline          +25
Phone provided              +10
--------------------------------
Total                       100
```

The exact scoring algorithm must be defined and approved separately.

The PRD establishes the requirement that scoring must be:

- Explainable.
- Consistent.
- Configurable.
- Deterministic where possible.

AI may assist with extraction and classification, but the final scoring logic should preferably be controlled by explicit business rules.

---

# 16. Lead Status Lifecycle

Each lead should have a defined lifecycle.

Initial lifecycle:

```text
NEW
 ↓
CONTACTED
 ↓
QUALIFIED
 ↓
FOLLOW_UP
 ↓
VIEWING_SCHEDULED
 ↓
NEGOTIATION
 ↓
CONVERTED
```

Alternative terminal states:

```text
LOST
NOT_INTERESTED
INVALID
UNQUALIFIED
```

The exact state machine will be defined in the system design.

Important:

The system should prevent invalid or nonsensical state transitions where appropriate.

---

# 17. AI Responsibilities

AI should primarily perform tasks that require understanding natural language.

### AI responsibilities

1. Understand customer messages.
2. Detect customer intent.
3. Extract structured requirements.
4. Identify missing information.
5. Summarize conversations.
6. Generate appropriate responses.
7. Classify ambiguous customer statements.
8. Identify useful context from conversation history.

### AI should NOT independently:

- Invent property availability.
- Invent prices.
- Guarantee a property exists.
- Make legal commitments.
- Promise a viewing without confirmation.
- Change important business data without validation.
- Override deterministic business rules.

---

# 18. Conversational Behaviour

The bot should behave like a professional real estate receptionist.

### Example

Customer:

> "Hi, I'm looking for a house."

Bot:

> "Absolutely. I'd be happy to help. Are you looking to buy or rent, and which area are you interested in?"

Customer:

> "Buy. Somewhere around Lekki."

Bot:

> "Great. What type of property are you looking for, and approximately what is your budget?"

The system should progressively collect missing information rather than asking the customer for every field at once.

---

# 19. Required Information Strategy

The bot should distinguish between:

### Required for initial lead creation

Minimum viable information may include:

- Customer message.
- Conversation ID.
- Timestamp.
- Source/channel.

### Required for qualification

Depending on the intent:

- Transaction type.
- Property type.
- Location.
- Budget.
- Timeline.

Not every lead will provide all information.

The system should therefore support:

```text
COMPLETE
PARTIALLY_COMPLETE
INCOMPLETE
```

rather than rejecting incomplete leads.

An incomplete lead is still a lead.

---

# 20. Lead Storage

Every meaningful customer interaction should result in persistent information where appropriate.

A lead record should conceptually contain:

```text
Lead
├── ID
├── Customer
├── Contact information
├── Intent
├── Property requirements
├── Budget
├── Location
├── Timeline
├── Lead score
├── Qualification
├── Status
├── Source
├── Assigned salesperson
├── Created timestamp
├── Updated timestamp
└── Conversation reference
```

The final database schema will be defined in the Data Model document.

---

# 21. Conversation History

The system should maintain conversation history associated with a lead.

Example:

```text
Customer:
"I'm looking for a 3 bedroom apartment."

Bot:
"Which location are you interested in?"

Customer:
"Lekki."

Bot:
"What is your approximate budget?"

Customer:
"80 million."
```

The sales representative should be able to understand the conversation without requiring the customer to repeat information.

---

# 22. Sales Team Notification

When a lead meets defined criteria, the system should notify the sales team.

Examples:

```text
🔥 HOT LEAD

Name: John Doe
Intent: Buy
Property: 3-bedroom apartment
Location: Lekki
Budget: ₦80,000,000
Timeline: Within 2 months
Score: 90/100

Contact:
+234...
```

Notification channels may initially include:

- Email.
- n8n-supported messaging integrations.
- Internal dashboard notifications.

The exact notification provider is an implementation decision.

---

# 23. Lead Assignment

The system should support assigning leads to sales representatives.

Initial assignment strategies may include:

- Manual assignment.
- Round robin.
- Location-based assignment.
- Property-type assignment.
- Sales representative availability.
- Manager assignment.

The MVP may begin with manual or simple rule-based assignment.

---

# 24. Sales Follow-Up

Sales representatives should be able to:

- View lead information.
- View conversation history.
- View lead score.
- View qualification.
- View missing information.
- Contact the customer.
- Update lead status.
- Add notes.
- Record follow-up activity.

---

# 25. Lead Tracking

The system should track meaningful events.

Example:

```text
09:10 — Lead created
09:11 — AI extracted requirements
09:11 — Lead scored 82
09:12 — Sales representative notified
09:25 — Lead assigned to Sales Rep A
10:30 — Customer contacted
11:00 — Viewing scheduled
```

This provides an **audit trail** and helps management understand what happened to each lead.

---

# 26. React Frontend Requirements

The frontend should be built using React.

Initial UI components:

### Customer Interface

- Chat window.
- Message input.
- Bot responses.
- Loading state.
- Error state.
- Conversation state.

### Sales Interface

A basic lead dashboard should eventually provide:

- Lead list.
- Lead details.
- Lead score.
- Qualification.
- Status.
- Customer information.
- Property requirements.
- Conversation history.
- Sales notes.
- Follow-up actions.

The exact UI/UX design will be specified separately.

---

# 27. FastAPI Backend Requirements

The backend should provide an API layer between the frontend and automation/system services.

Potential responsibilities:

- Request validation.
- Authentication/authorization where required.
- API endpoints.
- Business logic that should not live inside n8n.
- Data validation.
- Integration with external services where appropriate.
- Security controls.
- Error handling.
- Observability.

Potential endpoints:

```text
POST /leads
GET /leads
GET /leads/{lead_id}
PATCH /leads/{lead_id}

POST /chat
GET /leads/{lead_id}/conversation

PATCH /leads/{lead_id}/status
POST /leads/{lead_id}/notes
```

These are provisional and should not be treated as the final API contract.

---

# 28. n8n Requirements

n8n will act primarily as the **workflow orchestration and integration layer**.

Potential responsibilities:

```text
Receive event
     ↓
Validate/prepare data
     ↓
Call AI
     ↓
Extract structured data
     ↓
Apply workflow logic
     ↓
Store/update lead
     ↓
Calculate/trigger qualification
     ↓
Notify sales team
     ↓
Trigger follow-up workflows
```

n8n should not become a dumping ground for all application logic.

Complex domain logic that requires strong testing, versioning, or reusable application behaviour may belong in FastAPI/code instead.

---

# 29. Database Strategy

Two storage approaches are being considered:

### Option A — Google Sheets

Google Sheets may be used during early development or MVP stages for:

- Simple lead storage.
- Rapid prototyping.
- Easy human visibility.
- Easy integration with n8n.

### Option B — SQL Database

A SQL database should be considered for production-grade storage because the system will eventually require:

- Relationships.
- Constraints.
- Querying.
- Indexing.
- Transactions.
- Data integrity.
- Scalability.
- Concurrent access.
- Reliable historical records.

The final choice between Google Sheets and SQL should be made during the System Architecture and Data Model phases.

A likely approach is:

```text
Prototype
    ↓
Google Sheets

Production
    ↓
SQL Database
```

The application should avoid becoming tightly coupled to Google Sheets if migration to SQL is expected.

---

# 30. Functional Requirements

## FR-001 — Receive Customer Message

The system shall receive a customer message through the supported frontend/channel.

## FR-002 — Create Conversation

The system shall associate the message with a conversation.

## FR-003 — Extract Information

The system shall extract structured information from the message using AI.

## FR-004 — Qualify Lead

The system shall qualify the lead based on business rules.

## FR-005 — Score Lead

The system shall calculate a lead score.

## FR-006 — Store Lead

The system shall persist the lead in the database.

## FR-007 — Respond to Customer

The system shall generate and send an appropriate response.

## FR-008 — Notify Sales Team

The system shall notify the sales team for actionable leads.

## FR-009 — Track Status

The system shall track lead status changes.

## FR-010 — Maintain History

The system shall maintain conversation and activity history.

---

# 31. Non-Functional Requirements

- The system should respond to customer messages within a few seconds for simple cases.
- AI processing may take longer and should be handled asynchronously where necessary.
- The system must not lose customer messages.
- Data must be protected.
- The system should be maintainable by a small team.

---

# 32. Success Metrics

Possible metrics:

- Lead response time
- Percentage of leads with complete information
- Percentage of hot leads contacted within SLA
- Conversion rate
- Number of leads processed without human intervention for basic qualification

---

# 33. Open Questions

- Exact scoring algorithm
- Preferred notification channel
- Exact state machine transitions
- Google Sheets vs SQL for MVP

---

# 34. Document Status

This document is the foundational product requirements document for the Real Estate Lead Bot.

Subsequent technical documents (Architecture, Data Model, API, AI, n8n, UI/UX) refine and implement the requirements described here.
