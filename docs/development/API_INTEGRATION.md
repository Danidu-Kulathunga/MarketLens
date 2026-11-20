# MarketLens — API Design & Cross-Module Integration Standards

This document establishes the communication protocols, payload formats, error handling standards, and versioning rules across all five microservices and the React frontend.

---

## 1. Architectural Integration Principles

1. **Gateway As Single Client Entry Point**: The React frontend talks exclusively through the API Gateway (`/api/v1/...`). The browser never directly calls raw backend service ports.
2. **Canonical Envelope Format**: Every API response must return the standard JSON envelope containing `status`, `data`, and `meta`.
3. **Internal Microservice Communication**: Internal services communicate over the internal Docker network (`marketlens-network`) via HTTP REST using predictable DNS names (e.g. `http://pipeline-service:8003`).

---

## 2. Standard API Response Formats

### Successful Response Envelope (`200 OK`, `201 Created`)
```json
{
  "status": "success",
  "data": {
    "symbol": "AAPL",
    "price": 224.23,
    "change": 1.85,
    "change_percent": 0.83
  },
  "meta": {
    "timestamp": "2026-11-16T20:00:00Z",
    "version": "v1",
    "requestId": "req-98fa-1234"
  }
}
```

### Error Response Envelope (`400`, `401`, `403`, `404`, `500`)
```json
{
  "status": "error",
  "error": {
    "code": "SYMBOL_NOT_FOUND",
    "message": "The requested ticker symbol 'INVALID' was not found in market catalog.",
    "details": [
      {
        "field": "symbol",
        "issue": "Unknown ticker or unmapped exchange listing"
      }
    ]
  },
  "meta": {
    "timestamp": "2026-11-16T20:00:00Z",
    "version": "v1"
  }
}
```

---

## 3. Microservice Routing & Base Paths

| Service | Routing Prefix | Lead Member | Example Route |
| :--- | :--- | :--- | :--- |
| **Auth & Users** | `/api/v1/auth` | User & Auth Service | `/api/v1/auth/roles` |
| **Market Data** | `/api/v1/market` | Member 1 | `/api/v1/market/quote/{symbol}` |
| **News & Sentiment** | `/api/v1/news` | Member 3 | `/api/v1/news/articles` |
| **Data Pipeline** | `/api/v1/pipeline` | Member 4 | `/api/v1/pipeline/canonical/market-data/{symbol}` |
| **AI Prediction** | `/api/v1/ai` | Member 5 | `/api/v1/ai/predict/{symbol}` |
| **Portfolio & Alerts** | `/api/v1/portfolio` | Member 2 | `/api/v1/portfolio/holdings` |

---

## 4. Cross-Module Communication: Member 4 to Member 5

Member 5 (AI Prediction) does not ingest external APIs or parse CSV files. Instead, it queries Member 4's Data Pipeline service:

```text
[External APIs / Uploaded CSV]
             │
             ▼
┌───────────────────────────────┐
│ Member 4: Data Pipeline       │
│ (Cleans, validates, stores)   │
└──────────────┬────────────────┘
               │  GET /api/v1/pipeline/canonical/market-data/{symbol}
               ▼
┌───────────────────────────────┐
│ Member 5: AI Prediction       │
│ (Feeds feature store, model)  │
└──────────────┬────────────────┘
               │  GET /api/v1/ai/predict/{symbol}
               ▼
┌───────────────────────────────┐
│ Member 5 / Frontend: UI       │
│ (AI Analyst Dashboard)        │
└───────────────────────────────┘
```

See [CONTRACT_MEMBER4_MEMBER5.md](../api/CONTRACT_MEMBER4_MEMBER5.md) for the exact payload contract and code examples.

## 5. Auth Error Codes

These `error.code` values are returned by the Auth service and by any service validating a JWT. Defined in `docs/api/AUTH_CONTRACT.md`.

| Code | HTTP | When |
|---|---|---|
| `UNAUTHENTICATED` | 401 | Missing header, malformed or badly signed token, wrong issuer |
| `TOKEN_EXPIRED` | 401 | Valid token but expired; call `/api/v1/auth/refresh` and retry once |
| `INVALID_CREDENTIALS` | 401 | Wrong email or password at login |
| `FORBIDDEN` | 403 | Valid token, but the role or ownership check failed |
