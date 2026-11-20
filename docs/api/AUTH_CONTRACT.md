# MarketLens Auth Contract v1

| | |
|---|---|
| **Card** | M5-01 |
| **Owner** | Member 5 (User Accounts, Administration, API Access and Predictive Analytics) |
| **Status** | Draft v1.1, 2026-11-17 (under review in PR #1) |
| **Applies to** | All services: Auth (Java :8080), Market (:8001), News (:8002), Pipeline (:8003), AI (:8004), Frontend |
| **Real auth available** | Token validation filter (M5-04) targeted by **Tue 2026-11-24** |

This document is the single source of truth for identity, roles, tokens and auth errors. Changes require a PR and acknowledgement from Members 1-4 (see CONTRIBUTING.md, "No Breaking Changes to Shared Interfaces").

---

## 1. Roles

| Role | Who | Default landing page |
|---|---|---|
| `ROLE_ANALYST` | Market Analyst | `/dashboard` |
| `ROLE_DATA_MANAGER` | Data Manager | `/data-management` |
| `ROLE_ADMIN` | System Administrator | `/admin/users` |

- Every user has **exactly one** role.
- Public self-registration always creates `ROLE_ANALYST`. Only an admin can assign `ROLE_DATA_MANAGER` or `ROLE_ADMIN`.
- The role is checked **on the backend** for every protected endpoint. Hiding a frontend route is never sufficient.

### 1.1 Endpoint groups and role access

Path prefixes are the proposed convention for the Nginx gateway. Owners confirm their prefix when acknowledging this contract.

| Endpoint group | Prefix | Owner | ANALYST | DATA_MANAGER | ADMIN |
|---|---|---|:-:|:-:|:-:|
| Auth (register, login, refresh, logout) | `/api/auth/**` | M5 | public | public | public |
| Current user (`/me`) | `/api/auth/me` | M5 | yes | yes | yes |
| Own notifications, personal dashboard | `/api/notifications/**`, `/api/dashboard/**` | M4 | yes | yes | yes |
| Market data (read) | `/api/market/**` | M1 | yes | yes | yes |
| Portfolio, watchlists, alerts (own data only) | `/api/portfolios/**`, `/api/watchlists/**`, `/api/alerts/**` | M2 | yes | no | no |
| News (read) | `/api/news/**` | M3 | yes | yes | yes |
| News sources / categories (write) | `/api/news/sources/**`, `/api/news/categories/**` | M3 | no | yes | yes |
| Data management, import, quality | `/api/pipeline/**` | M1 | no | yes | yes |
| AI chat and analysis (own history) | `/api/ai/**` except predictions | M4 | yes | no | no |
| Predictions (generation, history, model evaluation) (Sprint 2) | `/api/ai/predictions/**` | M5 | yes | no | no |
| API Access / keys (Sprint 2) | `/api/api-keys/**` | M5 | yes | no | yes |
| User and role management, system settings, audit (Sprint 2) | `/api/admin/**` | M5 | no | no | yes |

Rules:
1. "Own data only" means the resource's `user_id` must equal the token's user id (see section 5.3).
2. Anything not listed above defaults to **authenticated, any role** until its owner adds a row via PR.
3. Roles are not hierarchical. Admin does not automatically get Analyst-only features such as portfolios.

---

## 2. Auth service endpoints

Base: `http://localhost/api/auth` (gateway) or `http://localhost:8080/api/auth` (direct).

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/register` | public | Create an Analyst account |
| POST | `/login` | public | Exchange credentials for tokens |
| POST | `/refresh` | refresh token | Get a new access token |
| POST | `/logout` | access token | Revoke the refresh token |
| GET | `/me` | access token | Return the current user |

### Login

Request:
```json
{ "email": "alex.silva@marketlens.io", "password": "********" }
```

Response `200`:
```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<opaque-string>",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "b3f1c2e4-...",
    "email": "alex.silva@marketlens.io",
    "fullName": "Alex Silva",
    "role": "ROLE_ANALYST"
  }
}
```

Registration, `/me` and `/refresh` response bodies follow the same `user` and token shapes. Exact request fields for registration are in the OpenAPI spec produced in M5-02.

---

## 3. JWT specification

### 3.1 Header format

Every protected request sends:
```
Authorization: Bearer <accessToken>
```

### 3.2 Access token

| Item | Value |
|---|---|
| Algorithm | `HS256` (Sprint 1). Upgrade to `RS256` is possible later without changing claims. |
| Signing secret | Environment variable `JWT_SECRET` (min 32 chars). Never committed to Git. |
| Lifetime | **15 minutes** |
| Issuer (`iss`) | `marketlens-auth` |

Claims (all required):

| Claim | Type | Example | Meaning |
|---|---|---|---|
| `sub` | string (UUID) | `b3f1c2e4-...` | **User id**. This is the value other modules store as `user_id`. |
| `email` | string | `alex.silva@marketlens.io` | User email |
| `role` | string | `ROLE_ANALYST` | One of the three roles |
| `iat` | number | `1794902400` | Issued at (Unix seconds) |
| `exp` | number | `1794903300` | Expiry (Unix seconds) |
| `iss` | string | `marketlens-auth` | Issuer |

Do not put passwords or other sensitive data in the token.

### 3.3 Refresh token and expiry behaviour

| Item | Value |
|---|---|
| Format | Opaque random string, stored **hashed** in the auth DB |
| Lifetime | **7 days** |
| Rotation | Each `/refresh` call returns a new refresh token and invalidates the old one |
| Logout | Revokes the refresh token. The access token stays valid until `exp` (max 15 min). |

Client behaviour:
1. On `401 TOKEN_EXPIRED`, the frontend calls `POST /api/auth/refresh` once, then retries the original request.
2. If refresh also fails (`UNAUTHENTICATED`), clear the session and redirect to `/session-expired`.
3. Services other than the auth service **never** call refresh. They only validate access tokens.

### 3.4 Validation rules (all services)

A service must reject the token if any of these fail:
1. Signature invalid or token malformed -> `UNAUTHENTICATED`
2. `exp` missing -> `UNAUTHENTICATED`
3. `exp` in the past -> `TOKEN_EXPIRED`
4. `iss` is not `marketlens-auth` -> `UNAUTHENTICATED`
5. `sub` or `role` missing, or `role` is not one of the three known roles -> `UNAUTHENTICATED`

Services validate locally using `JWT_SECRET`, with no call to the auth service per request.

---

## 4. Auth error codes (added to the shared error list)

All auth errors use the standard MarketLens error body:

```json
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access token has expired.",
    "status": 401,
    "path": "/api/portfolios",
    "timestamp": "2026-11-17T09:30:00Z"
  }
}
```

| Code | HTTP | When | Client action |
|---|---|---|---|
| `UNAUTHENTICATED` | 401 | Missing header, malformed or badly signed token, wrong issuer | Redirect to `/login` |
| `TOKEN_EXPIRED` | 401 | Valid token but `exp` has passed | Call `/refresh`, retry once |
| `INVALID_CREDENTIALS` | 401 | Wrong email or password at `/login` | Show "Invalid email or password". Do not reveal which one was wrong. |
| `FORBIDDEN` | 403 | Valid token, but the role or ownership check failed | Show "no access" message. Do not retry. |

---

## 5. How other modules get the current user

### 5.1 Python services (FastAPI): M1, M3, M4, M5 (predictions)

Copy this into your service (suggested path: `<service>/app/auth.py`). It exposes the same function names for the stub and the real version, so switching is a one-line change.

```python
import os
from dataclasses import dataclass

import jwt  # PyJWT
from fastapi import Header, HTTPException, Depends

ROLES = {"ROLE_ANALYST", "ROLE_DATA_MANAGER", "ROLE_ADMIN"}


@dataclass
class AuthUser:
    id: str
    email: str
    role: str


def _err(code: str, status: int, msg: str):
    return HTTPException(status_code=status, detail={"code": code, "message": msg})


def get_current_user(authorization: str | None = Header(default=None)) -> AuthUser:
    if not authorization or not authorization.startswith("Bearer "):
        raise _err("UNAUTHENTICATED", 401, "Missing bearer token.")
    token = authorization.removeprefix("Bearer ")
    try:
        claims = jwt.decode(
            token,
            os.environ["JWT_SECRET"],
            algorithms=["HS256"],
            issuer="marketlens-auth",
            options={"require": ["exp", "iss", "sub", "role"]},
        )
    except jwt.ExpiredSignatureError:
        raise _err("TOKEN_EXPIRED", 401, "Access token has expired.")
    except jwt.InvalidTokenError:
        raise _err("UNAUTHENTICATED", 401, "Invalid token.")
    if claims["role"] not in ROLES:
        raise _err("UNAUTHENTICATED", 401, "Unknown role.")
    return AuthUser(id=claims["sub"], email=claims.get("email", ""), role=claims["role"])


def require_roles(*allowed: str):
    def checker(user: AuthUser = Depends(get_current_user)) -> AuthUser:
        if user.role not in allowed:
            raise _err("FORBIDDEN", 403, "You do not have access to this resource.")
        return user
    return checker
```

Usage:
```python
@router.get("/portfolios")
def list_portfolios(user: AuthUser = Depends(require_roles("ROLE_ANALYST"))):
    return repo.find_by_user(user.id)
```

Register this exception handler once in `main.py` so errors use the body from section 4. If the project's shared error envelope (see `docs/development/API_INTEGRATION.md`) differs, follow the shared one and keep the `code` values unchanged.

```python
from datetime import datetime, timezone
from fastapi import Request
from fastapi.responses import JSONResponse


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    detail = exc.detail if isinstance(exc.detail, dict) else {"code": "ERROR", "message": str(exc.detail)}
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {
            **detail,
            "status": exc.status_code,
            "path": request.url.path,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }},
    )
```

### 5.2 Java services (Spring Boot)

Controllers receive the current user with the `@AuthenticatedUser` parameter annotation:

```java
@GetMapping("/portfolios")
public List<PortfolioDto> list(@AuthenticatedUser AuthUser user) {
    return service.findByUser(user.id());
}
```

`AuthUser` is a record `(String id, String email, String role)`. Method security uses `@PreAuthorize("hasRole('ANALYST')")` (Spring strips the `ROLE_` prefix).

### 5.3 Ownership checks

For any resource that belongs to a user (portfolio, watchlist, alert, AI conversation, notification):
1. Always filter or verify by `user.id` from the **token**, never by a `userId` sent in the request body or query string.
2. If the resource exists but belongs to someone else, return `403 FORBIDDEN`.

### 5.4 Temporary stub (until M5-04 lands, target Tue 2026-11-24)

Use this **instead of** `get_current_user` above while real validation is not yet merged. Same function name and return type.

```python
def get_current_user(
    x_debug_user_id: str | None = Header(default=None),
    x_debug_role: str = Header(default="ROLE_ANALYST"),
) -> AuthUser:
    if os.getenv("AUTH_STUB_ENABLED") != "true":
        raise _err("UNAUTHENTICATED", 401, "Auth stub disabled.")
    if x_debug_role not in ROLES:
        raise _err("UNAUTHENTICATED", 401, "Unknown role.")
    return AuthUser(
        id=x_debug_user_id or "00000000-0000-0000-0000-000000000001",
        email="stub@marketlens.io",
        role=x_debug_role,
    )
```

Call it with:
```
X-Debug-User-Id: 00000000-0000-0000-0000-000000000001
X-Debug-Role: ROLE_ANALYST
```

Rules for the stub:
- Enabled only with `AUTH_STUB_ENABLED=true` in your local `.env` (dev only). Never set it in `docker-compose.prod.yml`.
- Keep `user_id` columns as a **UUID/string**, so real ids drop in with no migration.
- Remove the stub when M5-04 is merged (swap to the real `get_current_user`). M5 will post in the team channel when it is ready.

### 5.5 Service-to-service calls

When a service calls another MarketLens service on behalf of a user (dashboard aggregation, AI context retrieval from market, news and portfolio), it forwards the user's original `Authorization: Bearer <token>` header unchanged. The called service validates it like any other request. No separate service token is used in Sprint 1.

---

## 6. Environment variables

| Variable | Used by | Notes |
|---|---|---|
| `JWT_SECRET` | all services | Min 32 chars, same value everywhere, never committed. Add a placeholder to `.env.example`. |
| `JWT_ACCESS_TTL_SECONDS` | auth service | Default `900` |
| `JWT_REFRESH_TTL_SECONDS` | auth service | Default `604800` |
| `AUTH_STUB_ENABLED` | Python services | `true` in local dev only until M5-04 |

---

## 7. Acknowledgement (required before merge)

Reply on the PR with "Acknowledged" once you have checked your section.

| Member | Module | Confirms | Acknowledged |
|---|---|---|---|
| Member 1 | Market / Data Management | Prefixes `/api/market/**`, `/api/pipeline/**`, role access | [ ] |
| Member 2 | Portfolio / Watchlist / Alerts | Prefixes, own-data-only rule, will use stub | [ ] |
| Member 3 | News | Prefix `/api/news/**`, write endpoints for Data Manager/Admin | [ ] |
| Member 4 | AI assistant / Dashboard / Notifications | Prefixes `/api/ai/**` (except predictions), `/api/dashboard/**`, `/api/notifications/**`, own-data-only for notifications | [ ] |

Member 5 owns `/api/ai/predictions/**` and the auth, API-key and admin prefixes, so no separate acknowledgement is needed for them.

## 8. Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-11-17 | Initial contract (M5-01) |
| 1.1 | 2026-11-17 | Ownership aligned to the latest work distribution (dashboard and notifications to M4, data management/import/quality to M1, predictions to M5); `exp`/`iss`/`sub`/`role` made required; stub role check; service-to-service rule (5.5); FastAPI error handler |
