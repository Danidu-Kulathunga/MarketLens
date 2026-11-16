# MarketLens — Financial Market Intelligence & Analytics Platform

MarketLens is an enterprise-grade Financial Market Intelligence and Analytics Platform built with **React 18**, **TypeScript**, **Python (FastAPI)**, **Java (Spring Boot)**, **PostgreSQL + TimescaleDB**, and **Docker**.

The platform provides institutional-grade market telemetry, owned-portfolio management, AI-grounded financial research, automated data ingestion pipelines, statistical data quality triage, and administrative controls.

---

## 🏛️ System Architecture

MarketLens implements a containerized polyglot microservice architecture orchestrated via Docker Compose and an Nginx API Gateway:

```text
                                  Client Browser
                                        │
                                        ▼
                            ┌───────────────────────┐
                            │  Nginx API Gateway    │
                            │      (Port :80)       │
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
                                              │      (Port :5432)     │
                                              └───────────────────────┘
```

---

## 🛠️ Canonical Technology Stack

| Component / Layer | Technology / Platform | Description & Scope |
| :--- | :--- | :--- |
| **Frontend** | React | React 18, TypeScript, Vite, Tailwind CSS, Recharts for responsive analyst dashboards and operations UI |
| **API / Access Layer** | API Gateway / Load Balancer | Reverse proxy, routing, SSL termination, rate limiting, request validation, service load balancing |
| **User & Auth Service** | Java + Spring Boot | Enterprise authentication, RBAC (Analyst, Data Manager, Admin), session management, audit logging |
| **Data Ingestion Service** | Python | Batch ingestion pipelines (CSV/JSON upload wizard), API schedulers, schema mapping, data cleaning |
| **Market Data Service** | Python | Real-time quote streaming, historical OHLCV candles, technical indicators (SMA, EMA, RSI, MACD) |
| **AI & Prediction Service** | Python | Predictive ML models (trends, volatility, price direction), analyst thesis grounding, explanation telemetry |
| **News & Intelligence Service** | Python | Financial news aggregation, NLP sentiment analysis, sector impact scoring, ticker correlation |
| **Relational Database** | PostgreSQL | Relational transactional data: user profiles, portfolios, transactions, watchlists, alerts, import metadata |
| **Time-Series Database** | TimescaleDB | High-frequency financial ticks, historical OHLCV data, volume telemetry, hypertable aggregations |
| **File Storage** | Uploaded CSV/JSON files, logs | Persistent storage for raw uploaded datasets, processed ingestion archives, exported reports, logs |
| **Containerization** | Docker | Containerized microservices ensuring environment consistency across dev, staging, and production |
| **Orchestration** | Kubernetes | Container orchestration, autoscaling, service discovery, health monitoring, zero-downtime rolling deploys |
| **Cloud Infrastructure** | Cloud platform (e.g., AWS / GCP) | Target cloud platform infrastructure (prototype deployment currently on Cloudflare Workers) |
| **Monitoring** | Prometheus + Grafana | Service metrics scraping, system telemetry, health dashboards, alerting rules |
| **Security** | SSL, Firewall, Access Control | End-to-end SSL/TLS encryption, WAF/Firewalls, network security policies, RBAC, secret management |
| **Market Data Sources** | Market Data APIs (Twelve Data, CSE) | External real-time and historical financial market data feeds and exchange interfaces |
| **News Sources** | News APIs (e.g., NewsAPI) | External financial news and media feeds for market intelligence and sentiment analysis |

---

## 👥 Five-Member Team Ownership Matrix

Each developer vertically owns their assigned functional module across frontend, backend microservice, API contracts, and database integration:

| Member | Module Domain | Frontend Scope | Backend Microservice Scope | Primary Technologies |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1** | **Market Exploration & Stock Analysis** | `/markets`, `/markets/:symbol`, interactive charts, SMA 50/200, RSI, MACD | `backend/market-data-service`: Quotes, OHLCV candles, technical indicators | React, Python, FastAPI, Recharts |
| **Member 2** | **Portfolio, Watchlist & Alerts** | `/portfolio`, `/watchlist`, holding modals, real-time P&L, price trigger alerts | PostgreSQL relational models: portfolios, holdings, watchlists | React, PostgreSQL, Java/Python |
| **Member 3** | **Financial News & Intelligence** | `/news`, sentiment breakdown, trending tickers, category filters | `backend/news-service`: NewsAPI ingestion, NLP sentiment, ticker correlation | React, Python, FastAPI, NLP |
| **Member 4** | **Data Management & Pipeline** | `/data-management`, `/data-import`, `/data-quality`, 3-step upload wizard | `data-pipeline`: Dual ingestion (Twelve Data, CSE, CSV/JSON uploads), anomaly triage | React, Python, FastAPI, Pandas, TimescaleDB |
| **Member 5** | **AI Prediction & Analytics** | `/ai-analyst`, thesis evidence matrix, prediction confidence gauges | `ai`: LSTM trend classifier, XGBoost volatility, grounding engine | React, Python, FastAPI, Scikit-learn, PyTorch |

*Detailed boundaries and integration workflows reside in [docs/development/TEAM_OWNERSHIP.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/development/TEAM_OWNERSHIP.md).*

---

## 🚀 Quick Start with Docker (Recommended)

The entire MarketLens development environment can be booted with Docker Compose:

### 1. Configure Environment
```bash
# Copy example environment configuration
cp .env.example .env
```

### 2. Launch the Development Stack
```bash
# Start all 8 containers with live hot-reloading
docker compose up -d --build
```

### 3. Verify Container Health
```bash
docker compose ps
```

- **Frontend Application**: `http://localhost:5173` (or `http://localhost` via Gateway)
- **API Gateway**: `http://localhost`
- **Market Data Service**: `http://localhost:8001/health`
- **News Service**: `http://localhost:8002/health`
- **Data Pipeline Service**: `http://localhost:8003/health`
- **AI Prediction Service**: `http://localhost:8004/health`
- **User & Auth Service**: `http://localhost:8080/health`
- **PostgreSQL Database**: `localhost:5432`

---

## 💻 Local Development (Frontend Standalone)

If developing solely on the React UI without running containerized backends:

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Compile TypeScript & build production bundle
npm run build
```

---

## 🧪 Running Automated Tests

```bash
# Frontend TypeScript check and production build
npm run build

# Python microservices unit tests (via Docker)
docker compose exec market-service pytest -v
docker compose exec news-service pytest -v
docker compose exec pipeline-service pytest -v
docker compose exec ai-service pytest -v
```

---

## 👥 Demo User Accounts & Roles

MarketLens includes complete mock authentication and state management with persistent storage in `localStorage`. You can log in with any of the pre-configured role identities or use the interactive **Role Switcher** popup in the bottom-left corner of the sidebar:

| Role | Name | Email | Default Landing Page | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Market Analyst** (`ROLE_ANALYST`) | Alex Silva | `alex.silva@marketlens.io` | `/dashboard` | Market indices, Single stock diagnostics (AAPL), Owned Portfolio tracking, Watchlist & Alerts, Financial News sentiment, AI Analyst grounding, Developer API Access. |
| **Data Manager** (`ROLE_DATA_MANAGER`) | Nimal Perera | `nimal.perera@marketlens.io` | `/data-management` | Data source health (Twelve Data, CSE), Ingestion pipelines, 3-step CSV/JSON import wizard with schema mapping, Data Quality anomaly triage & resolution drawer. |
| **System Administrator** (`ROLE_ADMIN`) | Sarah Fernando | `sarah.fernando@marketlens.io` | `/admin/users` | User management & RBAC assignments, Provider API configurations & ping diagnostics, Security policies & MFA enforcement, Audit logging with CSV export. |

> **Password for all demo accounts**: `password123` (or any valid password)

---

## 🎨 Approved Design & Route Catalog

All screens have been implemented with high fidelity against approved visual references:

| Screen Name | Approved PNG Reference | Implemented React Route | Key Components & Features |
| :--- | :--- | :--- | :--- |
| **Sign In** | `authentication/login.png` | `/login` | Branded split view, credentials validation, role hint, session persistence |
| **Forgot Password** | `authentication/forgot password.png` | `/forgot-password` | Email dispatch simulation, success confirmation state |
| **Reset Password** | `authentication/create new password.png` | `/reset-password` | Password strength validation, token verification |
| **Session Expired** | `authentication/session expired.png` | `/session-expired` | Automatic logout screen with single-click return |
| **Analyst Dashboard** | `Users/Analyst/dashboard.png` | `/dashboard` | 4 index cards, intraday Recharts timeline, watchlist sparklines, top movers, sector sentiment bar, active alerts, AI brief |
| **Single Stock Analysis** | `Users/Analyst/Single Stock.png` | `/markets/:symbol` | AAPL overview, price & SMA 50/200 area chart, volume bars, momentum diagnostics, AI note, peer valuation benchmarks |
| **Markets Screener** | `Users/Analyst/Markets.png` | `/markets` | Real-time equity catalog, sector filters, gainers/losers sorting, direct links to stock analysis |
| **Owned Portfolio** | `Users/Analyst/portfolio.png` | `/portfolio` | Real-time holdings management, cost basis, unrealized P&L, sector allocation, performance trajectory chart, Add/Edit/Delete holding modals |
| **Watchlist & Alerts** | `Users/Analyst/watchlist.png` | `/watchlist` | Mini sparkline charts, price threshold triggers, alert conditions, Add Alert modal |
| **News Intelligence** | `Users/Analyst/news.png` | `/news` | Sentiment scoring, sector breakdown bars, trending ticker mentions, news category filters |
| **AI Financial Analyst** | `Users/Analyst/ai analyst.png` | `/ai-analyst` | Natural language query prompt, pre-computed queries, grounded multi-factor thesis, evidence telemetry matrix, interactive report generation |
| **API Overview** | `Users/Analyst/api access.png` | `/api-access` | Developer gateway, live metrics, code quickstart (Python, Node.js, cURL) |
| **API Key Management** | `Users/Analyst/api key.png` | `/api-access/key` | Masked key display, copy to clipboard, key regeneration modal, auth headers guide, recent requests log |
| **API Endpoints** | `Users/Analyst/api endpoints.png` | `/api-access/endpoints` | Interactive endpoint selector, parameter schemas, cURL examples, interactive sandbox test runner |
| **API Usage & Limits** | `Users/Analyst/api usage.png` | `/api-access/usage` | Monthly quota consumption bar, 7-day volume chart, endpoint distribution, request logs |
| **Data Operations** | `Users/Data Manager/data management.png` | `/data-management` | Source cards (Twelve Data, CSE), rate limit alert & retry, pipeline progress bar, recent batch activity, DQ widget |
| **Data Import Wizard** | `Users/Data Manager/data import.png` | `/data-import` | 3-step file uploader (Upload -> Map Schema -> Ingest), auto-column detection, batch tracking |
| **Data Quality Triage** | `Users/Data Manager/Data Quality.png` | `/data-quality` | Issue queue (Z-Score anomalies, missing fields, format errors), raw record inspector, inline resolution drawer (correct value / quarantine / delete) |
| **User Administration** | `Users/Administrator/user management.png` | `/admin/users` | Users table, role badges, active status toggles, Create User modal |
| **System Settings** | `Users/Administrator/system settings.png` | `/admin/settings` | External provider parameters, ingestion thresholds, security & maintenance toggles, ping tests |
| **System Audit Logs** | `Users/Administrator/system settings.png` | `/admin/audit` | Filterable chronological audit log, telemetry modal, CSV export |

---

## 📂 Project Directory Structure

```text
Marketlens/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Structured GitHub Issue templates
│   ├── workflows/            # GitHub Actions CI/CD workflows
│   └── pull_request_template.md # Professional PR template
├── ai/                       # Member 5: AI & Prediction Service (Python)
├── backend/
│   ├── market-data-service/  # Member 1: Quotes, Candles & Indicators (Python)
│   ├── news-service/         # Member 3: News Aggregation & Sentiment (Python)
│   └── user-auth-service/    # Enterprise User & Auth (Java / Spring Boot)
├── data-pipeline/            # Member 4: Ingestion Pipeline & Upload Wizard (Python)
├── docs/
│   ├── api/                  # API contracts & inter-service specifications
│   ├── architecture/         # System architecture & data flow diagrams
│   ├── deployment/           # Docker & operations guides
│   └── development/          # Team ownership matrix & Git workflow
├── frontend/                 # React 18 TypeScript Frontend Application
│   ├── src/                  # Feature modules, state contexts & UI kit
│   ├── public/               # Static assets & brand icons
│   ├── Dockerfile            # Multi-stage production Nginx container
│   ├── Dockerfile.dev        # Vite dev server with hot-reloading
│   └── package.json          # Frontend dependencies & scripts
├── infrastructure/
├── docker-compose.prod.yml   # Production container environment
├── .env.example              # Environment variables template
├── CONTRIBUTING.md           # Branching strategy & PR submission rules
└── README.md                 # Project introduction and documentation
```

---

## 📖 Complete Documentation Index

- **Contributing & Git Workflow**: [CONTRIBUTING.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/CONTRIBUTING.md)
- **Team Ownership Matrix**: [docs/development/TEAM_OWNERSHIP.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/development/TEAM_OWNERSHIP.md)
- **Git Command Guide**: [docs/development/GIT_WORKFLOW.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/development/GIT_WORKFLOW.md)
- **Docker Container Guide**: [docs/deployment/DOCKER_GUIDE.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/deployment/DOCKER_GUIDE.md)
- **API Design & Integration**: [docs/development/API_INTEGRATION.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/development/API_INTEGRATION.md)
- **Member 4 ➔ Member 5 Contract**: [docs/api/CONTRACT_MEMBER4_MEMBER5.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/api/CONTRACT_MEMBER4_MEMBER5.md)
- **Development & Governance**: [docs/development/DEVELOPMENT_GUIDELINES.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/docs/development/DEVELOPMENT_GUIDELINES.md)
- **AI Agent Architectural Context**: [AGENTS.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/AGENTS.md)
- **Exhaustive System Context**: [MARKETLENS_PROJECT_CONTEXT.md](file:///c:/Users/danid/OneDrive/Documents/Marketlens/MARKETLENS_PROJECT_CONTEXT.md)
