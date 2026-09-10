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

The system shall associate messages with a conversation.

## FR-003 — Identify Customer

The system shall identify the customer when sufficient information exists.

## FR-004 — Extract Requirements

The system shall extract relevant customer and property requirements from natural-language messages.

## FR-005 — Preserve Original Message

The system shall preserve the original customer message.

## FR-006 — Detect Missing Information

The system shall determine which important information is missing.

## FR-007 — Ask Follow-Up Questions

The bot shall ask appropriate questions to collect missing information.

## FR-008 — Classify Intent

The system shall classify customer intent.

## FR-009 — Calculate Lead Score

The system shall calculate a lead score based on defined qualification rules.

## FR-010 — Store Lead

The system shall create or update a persistent lead record.

## FR-011 — Respond to Customer

The system shall generate an appropriate response.

## FR-012 — Notify Sales Team

The system shall notify the appropriate sales team member when notification criteria are met.

## FR-013 — Assign Lead

The system shall support assignment of leads to sales representatives.

## FR-014 — Update Lead Status

Authorized users shall be able to update lead status.

## FR-015 — Track Lead History

The system shall maintain a history of significant lead events.

## FR-016 — View Lead

Authorized sales users shall be able to view lead details.

## FR-017 — Add Sales Notes

Authorized sales users shall be able to add notes to leads.

## FR-018 — Track Follow-Up

The system shall support recording follow-up activities.

---

# 31. Non-Functional Requirements

## Performance

The system should provide customer responses quickly enough to maintain a natural conversational experience.

Target latency should be established during technical design.

## Reliability

Temporary failures in AI, n8n, database, or external integrations should not silently lose leads.

## Security

The system must protect:

- Customer contact information.
- Conversation history.
- Business data.
- Authentication credentials.
- API credentials.
- AI provider credentials.

Secrets must never be stored directly in source code.

## Privacy

Customer information should only be collected and stored when necessary for the product's purpose.

## Observability

The system should provide sufficient logging and monitoring to diagnose:

- Failed workflows.
- Failed AI requests.
- API failures.
- Database failures.
- Notification failures.

## Maintainability

The system should maintain clear separation between:

```text
Frontend
Backend
Workflow automation
AI
Database
External integrations
```

---

# 32. Error Handling

The system must handle failures gracefully.

Examples:

### AI failure

```text
Customer
   ↓
Bot
   ↓
AI unavailable
   ↓
Fallback response / retry
```

The lead should not disappear because an AI request failed.

### Database failure

The system should detect the failure and avoid falsely telling the user that information was successfully stored.

### n8n failure

Important events should have appropriate retry/error-handling mechanisms.

### Notification failure

Failure to notify a salesperson should be recorded and recoverable.

---

# 33. AI Safety & Accuracy Requirements

AI-generated information must be treated as **inferred data**, not unquestionable truth.

The system should distinguish between:

```text
Customer-provided
        ↓
Extracted
        ↓
Normalized
        ↓
Validated
        ↓
Business decision
```

For example:

Customer says:

> "Around 80m."

AI extracts:

```text
budget = 80,000,000
```

The system should not interpret this as:

```text
exact maximum budget = 80,000,000
```

unless the business rules explicitly define that interpretation.

The system should also avoid hallucinating:

- Property availability.
- Prices.
- Locations.
- Amenities.
- Legal information.
- Sales commitments.

---

# 34. Example End-to-End Scenario

## Scenario: High-Intent Buyer

Customer:

> "Hi, I'm looking for a 3-bedroom apartment around Lekki. My budget is ₦80 million. I'd like to move within the next two months."

### Step 1 — Receive

Frontend sends message to backend.

### Step 2 — Process

FastAPI/n8n workflow processes the message.

### Step 3 — AI Extraction

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

### Step 4 — Qualification

The system evaluates the lead.

```text
Lead Score: 88
Qualification: HOT
```

### Step 5 — Storage

Lead is persisted.

### Step 6 — Customer Response

The bot responds:

> "Thanks! I can help with that. Are you looking for a specific part of Lekki, and would you prefer a new development or an already completed apartment?"

### Step 7 — Sales Notification

Sales team receives an alert.

### Step 8 — Follow-Up

Sales representative contacts the customer.

### Step 9 — Status

```text
NEW
 ↓
QUALIFIED
 ↓
CONTACTED
 ↓
FOLLOW_UP
```

---

# 35. Example: Incomplete Lead

Customer:

> "Hello, I want to buy a house."

The system should **not** mark this as a complete qualified lead.

Instead:

```text
Intent:
BUY_PROPERTY

Property type:
UNKNOWN

Location:
UNKNOWN

Budget:
UNKNOWN

Timeline:
UNKNOWN
```

The bot should ask a useful next question:

> "Absolutely. Which area are you interested in, and approximately what is your budget?"

The system should still create a lead record.

---

# 36. Example: Land Lead

Customer:

> "I need land around Ibadan, preferably below ₦20 million."

System extracts:

```json
{
  "intent": "BUY_LAND",
  "property_type": "LAND",
  "location": "Ibadan",
  "budget": 20000000,
  "currency": "NGN"
}
```

Fields such as bedrooms should not be required.

---

# 37. MVP Scope

The first usable version should focus on the core pipeline:

```text
Customer Message
       ↓
React Chat UI
       ↓
FastAPI
       ↓
n8n
       ↓
AI Extraction
       ↓
Lead Qualification
       ↓
Lead Storage
       ↓
Sales Notification
       ↓
Sales Dashboard
```

### MVP should include

- React chat interface.
- FastAPI backend.
- n8n workflow.
- AI message processing.
- Structured lead extraction.
- Lead scoring.
- Lead storage.
- Sales notification.
- Basic lead dashboard.
- Lead status.
- Conversation history.
- Basic follow-up tracking.
- Error handling.
- Logging.

---

# 38. Future Scope

Potential future capabilities:

- WhatsApp integration.
- Email integration.
- Instagram/social integrations.
- Automatic property matching.
- Property database integration.
- Advanced CRM functionality.
- Automated lead assignment.
- Follow-up reminders.
- Lead nurturing.
- Analytics dashboard.
- Conversion analytics.
- Sales performance analytics.
- AI sales assistant.
- Voice interaction.
- Multi-language support.
- Automated appointment scheduling.

These should not unnecessarily increase MVP complexity.

---

# 39. Success Metrics

The product should eventually measure:

### Lead processing

- Number of leads received.
- Percentage successfully processed.
- Percentage successfully extracted.

### Response

- Average response time.
- Percentage of leads receiving an immediate response.

### Qualification

- Percentage of leads qualified.
- Average lead score.
- Hot/warm/cold distribution.

### Sales

- Contact rate.
- Follow-up rate.
- Viewing rate.
- Conversion rate.
- Lost lead rate.

### Operational efficiency

- Manual processing time saved.
- Number of leads handled per salesperson.
- Number of leads missed.
- Follow-up completion rate.

---

# 40. Product Principles

## Principle 1 — Don't lose leads

Every meaningful customer enquiry should be captured and traceable.

## Principle 2 — AI assists; business rules decide

AI should interpret information.

Deterministic application logic should handle important business rules.

## Principle 3 — Never invent customer information

Unknown information should remain unknown.

## Principle 4 — Human salespeople remain in control

The system assists salespeople rather than replacing human judgment.

## Principle 5 — Automate repetitive work

n8n should handle repeatable workflows and integrations.

## Principle 6 — Use code where it adds engineering value

FastAPI/code should handle functionality requiring stronger control, validation, testing, security, or reusable business logic.

## Principle 7 — Keep responsibilities separated

```text
React
→ User experience

FastAPI
→ Application/API layer

n8n
→ Workflow orchestration

AI
→ Natural-language understanding

Database
→ Persistent system of record
```

## Principle 8 — Design for evolution

The MVP should be simple, but the architecture should not make future migration to more robust infrastructure unnecessarily difficult.

---

# 41. Acceptance Criteria for MVP

The MVP can be considered functionally complete when:

### Customer interaction

- [ ] Customer can send a message.
- [ ] Customer receives a response.
- [ ] Conversation is maintained.

### AI

- [ ] Intent can be identified.
- [ ] Property requirements can be extracted.
- [ ] Missing information can be identified.
- [ ] AI does not invent unavailable information.

### Lead management

- [ ] Lead is created.
- [ ] Lead can be updated.
- [ ] Lead score is generated.
- [ ] Lead qualification is stored.
- [ ] Lead status can be changed.
- [ ] Conversation history is accessible.

### Sales

- [ ] Sales team receives relevant notifications.
- [ ] Sales representative can view lead information.
- [ ] Sales representative can add notes.
- [ ] Sales representative can record follow-up.

### Reliability

- [ ] AI failures are handled.
- [ ] Database failures are handled.
- [ ] n8n workflow failures are visible.
- [ ] Important operations are logged.
- [ ] Secrets are not exposed in source code.

---

# 42. Open Questions

The following decisions should be resolved before or during system design:

1. What exact customer channels will the MVP support?
2. Will Google Sheets be temporary storage or part of the production architecture?
3. Which SQL database will be used?
4. Which AI model/provider will be used?
5. What exact lead-scoring formula will PrimeHomes use?
6. What makes a lead HOT, WARM, or COLD?
7. Which fields are mandatory for each intent?
8. How should leads be assigned to sales representatives?
9. Which notification channel should be used?
10. Who is allowed to view or modify leads?
11. What authentication mechanism will the sales dashboard use?
12. How long should customer conversations and lead data be retained?
13. What happens when AI confidence is low?
14. What happens when a customer provides contradictory information?
15. How should duplicate customers/leads be detected?
16. Should one customer be allowed to have multiple active property enquiries?
17. What constitutes a converted lead?
18. What constitutes a lost lead?

These decisions should be captured in the appropriate architecture, domain, API, security, and ADR documents rather than forcing all of them into this PRD.

---

# 43. Document Authority

This PRD defines the **product requirements and intended behaviour** of the Real Estate Lead Bot.

It does not define every implementation detail.

When implementation questions arise:

```text
Product requirements
        ↓
This PRD

System structure
        ↓
System Architecture Document

Business meaning/rules
        ↓
Domain & Business Rules Document

API behaviour
        ↓
API Contract

Data structure
        ↓
Data Model

Technical decisions
        ↓
ADRs

Implementation conventions
        ↓
Engineering Standards

AI-agent behaviour
        ↓
AGENTS.md / AI Development Guide
```

Changes to product requirements should be reflected in this document before implementation changes are treated as authoritative.

---

# 44. Initial Product Definition

In one sentence:

> **PrimeHomes Realty's Real Estate Lead Bot is an AI-assisted lead intake and qualification system that converts customer conversations into structured, scored, actionable sales opportunities and automates the operational workflow around them.**

The core product loop is:

```text
CAPTURE
   ↓
UNDERSTAND
   ↓
EXTRACT
   ↓
QUALIFY
   ↓
STORE
   ↓
RESPOND
   ↓
NOTIFY
   ↓
FOLLOW UP
   ↓
TRACK
   ↓
CONVERT
```

This loop represents the central product capability around which the rest of the system should be designed.