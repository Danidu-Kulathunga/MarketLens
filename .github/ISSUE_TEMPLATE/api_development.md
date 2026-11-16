---
name: API Development
about: Design, implement, or update a backend API endpoint or service contract
title: '[API] <HTTP Method> /api/v1/<endpoint>'
labels: ['backend', 'enhancement']
assignees: ''
---

### Module & Primary Owner
- **Assigned Service**: <!-- user-auth-service, market-data-service, news-service, data-pipeline, ai-service -->
- **Primary Owner**: <!-- Member 1, Member 2, Member 3, Member 4, Member 5, Maintainer -->
- **Consumer Service(s) / Frontend View**: <!-- e.g., AI Service consuming Data Pipeline, or Frontend Markets Page -->

### Endpoint Specification
- **Method**: `GET` | `POST` | `PUT` | `DELETE`
- **Path**: `/api/v1/...`
- **Authentication**: `Bearer JWT` | `API Key` | `Public`
- **Rate Limit**: <!-- e.g., 60 req/min -->

### Request Payload (JSON Schema / Example)
```json
{
  "symbol": "AAPL",
  "interval": "1d",
  "limit": 100
}
```

### Response Payload (Standard Canonical Envelope)
```json
{
  "status": "success",
  "data": {},
  "meta": {
    "timestamp": "2026-11-16T20:00:00Z",
    "version": "v1"
  }
}
```

### Error Responses
- `400 Bad Request`: Validation failure details
- `401 / 403`: Unauthorized / Forbidden
- `404 Not Found`: Entity not found
- `500 Internal Error`: Standard failure envelope

### Cross-Module Dependencies & Breaking Change Check
- [ ] Is this a non-breaking additive change?
- [ ] Have downstream module owners been notified (e.g. Member 5 for Member 4 changes)?
- [ ] OpenAPI / Swagger schema updated?
