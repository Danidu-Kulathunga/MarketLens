# MarketLens — Member 4 Sprint API Contracts

## 1. Purpose

This document defines the integration contracts for Member 4's
Sprint 1 responsibilities.

Covered modules:

- Notification service
- Dashboard aggregation
- AI chatbot
- AI error handling

These contracts must be reviewed and agreed upon before
implementing the dependent backend and frontend tasks.

## 2. Dependencies

- M1-01: Market data contract
- M2-01: Alert event contract
- M5 Auth: Authentication and user identity integration

## 3. API Conventions

- Public APIs use the `/api/v1/` prefix.
- Successful responses follow the standard MarketLens envelope.
- Error responses use the shared error format.
- User-specific endpoints require authentication.
- Timestamps use ISO 8601 UTC.

## 4. Notification Event Contract

### Producer
Member 2 — Alert Engine

### Consumer
Member 4 — Notification Service

### Event Type
PRICE_ALERT

### Example Payload

```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "PRICE_ALERT",
  "title": "AAPL Price Alert",
  "message": "AAPL crossed the target price of $230.",
  "link": "/markets/AAPL",
  "timestamp": "2026-11-18T10:30:00Z"
}


When typing this into Markdown, ensure the JSON example is enclosed by one opening and one closing triple-backtick code fence.

Then add the field definitions:

| Field | Type | Required |
|---|---|---|
| user_id | UUID | Yes |
| type | String | Yes |
| title | String | Yes |
| message | String | Yes |
| link | String or null | No |
| timestamp | ISO 8601 datetime | Yes |

### Understand the interconnectivity

```text
Member 2 Alert Engine
        |
        | Notification Event
        |
        v
Member 4 Notification Service
        |
        | INSERT notification
        |
        v
PostgreSQL Database
        |
        | GET notifications
        |
        v
React Notifications UI

## 5. Dashboard Aggregation Contract

### Proposed Endpoint

GET /api/v1/dashboard

### Response Structure

Each widget contains:

- status
- data
- error

### Supported Widget Statuses

- success
- error
- unavailable

{
  "status": "success",
  "data": {
    "market_overview": {
      "status": "success",
      "data": {
        "symbol": "AAPL",
        "price": 225.50
      },
      "error": null
    },
    "notifications_summary": {
      "status": "error",
      "data": null,
      "error": {
        "code": "SERVICE_TIMEOUT",
        "message": "Notification service unavailable"
      }
    },
    "ai_insights": {
      "status": "unavailable",
      "data": null,
      "error": null
    }
  },
  "meta": {
    "timestamp": "2026-11-18T10:30:00Z",
    "version": "v1"
  }
}

## 6. AI Chat Contract

### Proposed Endpoint

POST /api/v1/ai/chat

### Request Fields

- conversation_id: UUID or null
- message: string


{
  "conversation_id": null,
  "message": "Analyze the recent performance of AAPL."
}

{
  "status": "success",
  "data": {
    "conversation_id": "550e8400-e29b-41d4-a716-446655440001",
    "message_id": "550e8400-e29b-41d4-a716-446655440002",
    "actual_data": {
      "symbol": "AAPL",
      "current_price": 225,
      "previous_close": 220
    },
    "calculated_values": {
      "percentage_change": 2.27
    },
    "ai_interpretation": {
      "message": "AAPL has shown positive price movement. Additional indicators would be needed to evaluate whether the trend is sustainable.",
      "disclaimer": "This is decision-support information, not a guarantee of future performance."
    },
    "context_sources": [
      {
        "service": "market-service",
        "type": "stock_quote",
        "symbol": "AAPL",
        "retrieved_at": "2026-11-18T10:30:00Z"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-11-18T10:30:01Z",
    "version": "v1"
  }
}


## 7. Integration Agreements

| Member | Contract to Review | Status |
|--------|--------------------|--------|
| Member 1 | Market data and context retrieval | Pending |
| Member 2 | Notification events | Pending |
| Member 3 | Deferred news integration | Pending |
| Member 5 | Authentication and AI service boundaries | Pending |

## 8. Open Architectural Decisions

1. Confirm notification event delivery mechanism.
2. Confirm API versioning.
3. Confirm chatbot ownership within the existing AI service.
4. Confirm authenticated user identity contract.
5. Confirm market quote and history response fields.