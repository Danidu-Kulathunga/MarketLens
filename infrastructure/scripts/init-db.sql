-- MarketLens Database Initialization Script
-- Configures Relational Schema (PostgreSQL) and Time-Series (TimescaleDB)

-- 1. Create Core Database & Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable TimescaleDB extension (if running on timescale/timescaledb container)
DO $$
BEGIN
    CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'TimescaleDB extension not available, falling back to standard PostgreSQL tables.';
END $$;

-- 2. User & Authentication Schema
-- MOVED: users, roles, profiles and preferences are now created by the
-- user-auth-service Flyway migrations (V1, V2). The foreign keys from the tables
-- below to users(id) are added by migration V3 of that service.

-- 3. Portfolios, Holdings & Watchlists (Member 2)
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,   -- FK to users(id) added by auth-service migration V3
    name VARCHAR(100) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol VARCHAR(20) NOT NULL,
    shares NUMERIC(15, 4) NOT NULL,
    cost_basis NUMERIC(15, 4) NOT NULL,
    acquired_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,   -- FK to users(id) added by auth-service migration V3
    symbol VARCHAR(20) NOT NULL,
    notes TEXT,
    alert_high NUMERIC(15, 4),
    alert_low NUMERIC(15, 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Canonical Market Data Hypertable (Member 4 & Member 1)
CREATE TABLE IF NOT EXISTS market_ticks (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    price NUMERIC(15, 4) NOT NULL,
    volume BIGINT NOT NULL,
    source VARCHAR(50) NOT NULL
);

-- Convert to hypertable if TimescaleDB is loaded
DO $$
BEGIN
    PERFORM create_hypertable('market_ticks', 'time', if_not_exists => TRUE);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Hypertable conversion skipped.';
END $$;

-- 5. Ingestion Metadata & Data Quality Queue (Member 4)
CREATE TABLE IF NOT EXISTS ingestion_batches (
    id VARCHAR(50) PRIMARY KEY,
    filename VARCHAR(255),
    source_type VARCHAR(50) NOT NULL,
    records_count INT DEFAULT 0,
    status VARCHAR(50) NOT NULL,
    errors_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_quality_anomalies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id VARCHAR(50) REFERENCES ingestion_batches(id),
    symbol VARCHAR(20),
    anomaly_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    raw_payload JSONB,
    status VARCHAR(30) DEFAULT 'PENDING_TRIAGE',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Seed accounts: REMOVED. Dev users are created by the auth service (DevUserSeeder)
-- from environment variables, with real BCrypt hashes.
