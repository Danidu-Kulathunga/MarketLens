# Identity schema ER diagram (M5-02)

```mermaid
erDiagram
    users ||--o| user_profiles : "has"
    users ||--o| user_preferences : "has"
    users ||--|{ user_roles : "assigned"
    roles ||--o{ user_roles : "grants"

    users {
        uuid id PK
        varchar email "unique, case-insensitive (lower(email))"
        varchar password_hash "BCrypt only"
        varchar account_status "ACTIVE | DEACTIVATED"
        timestamptz last_login_at
        timestamptz created_at
        timestamptz updated_at
    }
    user_profiles {
        uuid user_id PK, FK
        varchar first_name
        varchar last_name
        varchar display_name
        varchar phone
        varchar avatar_url
    }
    roles {
        bigint id PK
        varchar name "ROLE_ANALYST | ROLE_DATA_MANAGER | ROLE_ADMIN"
        varchar description
    }
    user_roles {
        uuid user_id PK, FK
        bigint role_id PK, FK
        timestamptz assigned_at
    }
    user_preferences {
        uuid user_id PK, FK
        varchar theme
        varchar language
        varchar timezone
        varchar default_currency
        boolean notifications_enabled
    }
```

## Designed now, created in Sprint 2
`api_keys`, `api_usage_records`, `audit_logs`, `system_settings`
(all FK to `users.id`; `api_keys` stores only a hash of the key).

## For M2 / M3 / M4

Reference `users(id)` (UUID) as the FK target, e.g. `user_id UUID NOT NULL REFERENCES users(id)`.
Migration V1 is the contract; don't alter it without telling M5.

`users` is created by the auth service's Flyway migrations, which run **after** `init-db.sql`.
So don't put `REFERENCES users(id)` inside `init-db.sql`: add the foreign key afterwards
(for example `ALTER TABLE ... ADD CONSTRAINT ...` in a later migration, as V3 does).
Existing tables `portfolios` and `watchlists` get their FK to `users(id)` from migration V3.
