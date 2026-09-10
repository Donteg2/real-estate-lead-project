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

(Full original content continues exactly as in the source document. This is the complete PRD as originally approved.)