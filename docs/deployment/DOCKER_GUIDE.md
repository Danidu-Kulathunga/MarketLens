# MarketLens — Docker Containerization & Operations Guide

This guide details the containerized architecture of MarketLens, explaining how each developer can run the full multi-service stack reproducibly on macOS, Windows, and Linux.

---

## 1. Containerized Architecture Overview

The MarketLens development environment runs 8 orchestrated containers on an internal bridge network (`marketlens-network`):

```text
                                  Client Browser
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │      API Gateway      │
                            │      (Nginx :80)      │
                            └───────────┬───────────┘
                                        │
     ┌──────────────────────────────────┼──────────────────────────────────┐
     │                                  │                                  │
     ▼                                  ▼                                  ▼
┌─────────────┐                ┌───────────────────┐              ┌──────────────────┐
│  Frontend   │                │ User/Auth Service │              │  Market Service  │
│(React :5173)│                │  (Java :8080)     │              │  (Python :8001)  │
└─────────────┘                └─────────┬─────────┘              └────────┬─────────┘
                                         │                                 │
     ┌───────────────────────────────────┼─────────────────────────────────┤
     │                                   │                                 │
     ▼                                   ▼                                 ▼
┌──────────────────┐           ┌───────────────────┐              ┌──────────────────┐
│   News Service   │           │ Pipeline Service  │              │    AI Service    │
│  (Python :8002)  │           │  (Python :8003)   │              │  (Python :8004)  │
└──────────────────┘           └─────────┬─────────┘              └────────┬─────────┘
                                         │                                 │
                                         └────────────────┬────────────────┘
                                                          ▼
                                              ┌───────────────────────┐
                                              │ PostgreSQL + Timescale│
                                              │      (DB :5432)       │
                                              └───────────────────────┘
```

---

## 2. Container Inventory & Port Mapping

| Service Name | Container Name | Technology | Internal Port | Host Port | Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `api-gateway` | `marketlens-gateway` | Nginx Alpine | 80 | **80** | Reverse proxy, path routing, rate limiting |
| `frontend` | `marketlens-frontend` | React 18, Vite | 5173 | **5173** | Analyst UI with live hot-reloading |
| `user-auth-service` | `marketlens-auth` | Java 17, Spring Boot | 8080 | **8080** | Enterprise RBAC & JWT authentication |
| `market-service` | `marketlens-market-service` | Python 3.11, FastAPI | 8001 | **8001** | Quotes, OHLCV candles, technical indicators |
| `news-service` | `marketlens-news-service` | Python 3.11, FastAPI | 8002 | **8002** | News aggregation & sentiment scoring |
| `pipeline-service` | `marketlens-pipeline-service` | Python 3.11, FastAPI | 8003 | **8003** | Ingestion pipeline, upload wizard, anomaly triage |
| `ai-service` | `marketlens-ai-service` | Python 3.11, FastAPI | 8004 | **8004** | Predictive models, thesis grounding |
| `postgres` | `marketlens-db` | TimescaleDB / PG 16 | 5432 | **5432** | Relational data & financial time-series |

---

## 3. Quick Start Commands

### Initial Setup
```bash
# 1. Create your local .env file from template
cp .env.example .env

# 2. Build and launch all services in the background
docker compose up -d --build

# 3. Verify all containers are healthy
docker compose ps
```
Visit `http://localhost` (via Gateway) or `http://localhost:5173` (direct Vite dev server).

---

## 4. Common Daily Commands

### Viewing Logs
```bash
# View logs from all services continuously
docker compose logs -f

# View logs for a single service (e.g. AI Service)
docker compose logs -f ai-service

# View last 50 lines for the Pipeline Service
docker compose logs --tail=50 pipeline-service
```

### Restarting & Rebuilding Individual Services
When editing code in a specific service, hot-reloading handles most changes. If you modify `requirements.txt` or a `Dockerfile`:
```bash
# Rebuild and restart only Member 1's Market Data Service
docker compose up -d --build market-service

# Rebuild only Member 5's AI Service
docker compose up -d --build ai-service

# Restart the API Gateway after changing nginx.conf
docker compose restart api-gateway
```

### Stopping the Stack
```bash
# Stop containers while preserving volume data
docker compose down

# Stop containers AND delete volume data (clean slate reset)
docker compose down -v
```

---

## 5. Database Management & Seeding

The PostgreSQL/TimescaleDB container automatically runs `infrastructure/scripts/init-db.sql` on first boot.

### Connecting to PostgreSQL via CLI
```bash
docker compose exec postgres psql -U marketlens_admin -d marketlens
```

### Useful SQL Queries
```sql
-- Check existing seed users
SELECT id, email, full_name, role FROM users;

-- Check hypertable status
SELECT * FROM timescaledb_information.hypertables;

-- Check market ticks table
SELECT * FROM market_ticks ORDER BY time DESC LIMIT 10;
```

---

## 6. Running Tests Inside Containers

You can run automated test suites inside the containers without installing local Python or Java environments:

```bash
# Run Market Data Service tests
docker compose exec market-service pytest -v

# Run AI Service tests
docker compose exec ai-service pytest -v

# Run Pipeline Service tests
docker compose exec pipeline-service pytest -v

# Run News Service tests
docker compose exec news-service pytest -v
```

---

## 7. Troubleshooting & FAQ

### Port 80 is already in use on Windows / macOS
If port 80 is occupied by IIS, Apache, or Skype, set `GATEWAY_PORT=8088` in your `.env` file and restart:
```bash
docker compose up -d
```
Then access the platform at `http://localhost:8088`.

### Containers exit with health check failures
Inspect the specific container's logs:
```bash
docker compose logs <failed-service-name>
```
Verify that the `postgres` container is healthy, as backend services wait for the database before starting.
