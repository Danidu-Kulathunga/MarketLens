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
```

### Field Definitions

| Field | Type | Required | Notes |
|---|---|---|---|
| `user_id` | UUID | Yes | Target recipient user ID |
| `type` | String | Yes | Allowed values: `PRICE_ALERT`, `SYSTEM_ALERT` |
| `title` | String | Yes | Short notification title |
| `message` | String | Yes | Human-readable notification detail |
| `link` | String or null | No | Relative frontend route (e.g. `/markets/AAPL`) |
| `timestamp` | ISO 8601 datetime | Yes | UTC event trigger time |

### Event Flow

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
        | GET /api/v1/notifications
        |
        v
React Notifications UI
```

## 5. Dashboard Aggregation Contract

### Proposed Endpoint

`GET /api/v1/dashboard`

### Response Structure

The endpoint always returns HTTP `200 OK` even if one or more downstream widgets fail or time out, so partial failures are isolated per widget. Each widget contains:

- `status`: `"success"` | `"error"` | `"unavailable"`
- `data`: widget payload when `status` is `"success"`, otherwise `null`
- `error`: `{ "code", "message" }` when `status` is `"error"`, otherwise `null`

### Sprint 1 Widget Availability

- **Live widgets**: `market_overview` (from Member 1), `notifications_summary` (from Member 4)
- **Unavailable placeholders (Sprint 2)**: `portfolio_summary`, `watchlist_summary`, `news_sentiment`, `ai_insights`

### Example Response

```json
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
    "portfolio_summary": {
      "status": "unavailable",
      "data": null,
      "error": null
    },
    "watchlist_summary": {
      "status": "unavailable",
      "data": null,
      "error": null
    },
    "news_sentiment": {
      "status": "unavailable",
      "data": null,
      "error": null
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
```

## 6. AI Chat Contract

### Proposed Endpoint

`POST /api/v1/ai/chat`

### Request Fields & Validation

- `conversation_id`: UUID or `null` (when `null`, a new conversation is created for the authenticated user)
- `message`: string (required, non-empty, max length 1000 characters)

### Example Request

```json
{
  "conversation_id": null,
  "message": "Analyze the recent performance of AAPL."
}
```

### Example Response

The response explicitly separates **actual MarketLens data**, **calculated values**, **AI interpretation** (with decision-support disclaimer), and **context sources**:

```json
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
```

### Error Handling

AI error codes (`AI_TIMEOUT`, `AI_MISSING_CONTEXT`, `AI_PROVIDER_ERROR`, `AI_RATE_LIMITED`) follow the shared error envelope defined in [API_INTEGRATION.md](../development/API_INTEGRATION.md#ai-chat-error-codes-m4-01).


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