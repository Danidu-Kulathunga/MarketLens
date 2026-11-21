-- M5-02: identity schema (users, user_profiles, roles, user_roles, user_preferences)
-- users.id is UUID to match the existing portfolios/watchlists FKs.
-- Published early so M2/M3/M4 can reference users(id) as a foreign key.

CREATE TABLE users (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email          VARCHAR(255) NOT NULL,
    password_hash  VARCHAR(100) NOT NULL,          -- BCrypt hash only, never plaintext
    account_status VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
    last_login_at  TIMESTAMPTZ,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_users_account_status CHECK (account_status IN ('ACTIVE', 'DEACTIVATED')),
    CONSTRAINT chk_users_email_format   CHECK (position('@' IN email) > 1),
    CONSTRAINT chk_users_password_hash  CHECK (length(password_hash) >= 20)  -- rejects short plaintext
);

-- Case-insensitive uniqueness: Alice@x.com and alice@x.com collide
CREATE UNIQUE INDEX uq_users_email_lower ON users (lower(email));

CREATE TABLE user_profiles (
    user_id      UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name   VARCHAR(100),
    last_name    VARCHAR(100),
    display_name VARCHAR(100),
    phone        VARCHAR(30),
    avatar_url   VARCHAR(500),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE roles (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(255),
    CONSTRAINT chk_roles_name CHECK (name IN ('ROLE_ANALYST', 'ROLE_DATA_MANAGER', 'ROLE_ADMIN'))
);

CREATE TABLE user_roles (
    user_id     UUID   NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id     BIGINT NOT NULL REFERENCES roles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, role_id)
);
CREATE INDEX idx_user_roles_role ON user_roles (role_id);

CREATE TABLE user_preferences (
    user_id               UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme                 VARCHAR(10)  NOT NULL DEFAULT 'LIGHT',
    language              VARCHAR(10)  NOT NULL DEFAULT 'en',
    timezone              VARCHAR(50)  NOT NULL DEFAULT 'UTC',
    default_currency      VARCHAR(3)   NOT NULL DEFAULT 'USD',
    notifications_enabled BOOLEAN      NOT NULL DEFAULT TRUE,
    updated_at            TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CONSTRAINT chk_pref_theme CHECK (theme IN ('LIGHT', 'DARK'))
);
