# MarketLens — AI Agent Guidelines & Architecture Rules

This file (`AGENTS.md`) serves as the primary system and engineering instruction document for all AI agents working within the **MarketLens** codebase.

For exhaustive, multi-module project context, refer to [MARKETLENS_PROJECT_CONTEXT.md](./MARKETLENS_PROJECT_CONTEXT.md).

---

## 1. Project Technology Stack

The platform implements a polyglot microservice and containerized cloud architecture:

| Component / Layer               | Technology / Platform                                  | Description & Scope                                                                                               |
| :------------------------------ | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Frontend**                    | React                                                  | React 18, TypeScript, Vite, Tailwind CSS, Recharts for responsive analyst dashboards and operations UI            |
| **API / Access Layer**          | API Gateway / Load Balancer                            | Reverse proxy, routing, SSL termination, rate limiting, request validation, and service load balancing            |
| **User & Auth Service**         | Java + Spring Boot                                     | Enterprise authentication, RBAC (Analyst, Data Manager, Admin), session management, and audit logging             |
| **Data Ingestion Service**      | Python                                                 | Batch ingestion pipelines (CSV/JSON upload wizard), API schedulers, schema mapping, and data cleaning             |
| **Market Data Service**         | Python                                                 | Real-time quote streaming, historical OHLCV candles, and technical indicator computations (SMA, EMA, RSI, MACD)   |
| **AI & Prediction Service**     | Python                                                 | Predictive ML models (trends, volatility, price direction), analyst thesis grounding, and explanation telemetry   |
| **News & Intelligence Service** | Python                                                 | Financial news aggregation, NLP-based sentiment analysis, sector impact scoring, and entity ticker correlation    |
| **Relational Database**         | PostgreSQL                                             | Relational transactional data: user profiles, portfolios, transactions, watchlists, alerts, import metadata       |
| **Time-Series Database**        | TimescaleDB                                            | High-frequency financial ticks, historical OHLCV data, volume telemetry, and hypertable time-window aggregations  |
| **File Storage**                | Uploaded CSV/JSON files, processed data, reports, logs | Persistent storage for raw uploaded datasets, processed ingestion archives, exported reports, and system logs     |
| **Containerization**            | Docker                                                 | Containerized microservices ensuring environment consistency across dev, staging, and production                  |
| **Orchestration**               | Kubernetes                                             | Container orchestration, autoscaling, service discovery, health monitoring, and rolling zero-downtime deployments |
| **Cloud Infrastructure**        | Cloud platform (e.g., AWS / GCP)                       | Target cloud platform infrastructure (prototype deployment currently on Cloudflare Workers)                       |
| **Monitoring**                  | Prometheus + Grafana                                   | Service metrics scraping, system telemetry, health dashboards, alerting rules                                     |
| **Security**                    | SSL, Firewall, Access Control                          | End-to-end SSL/TLS encryption, WAF/Firewalls, network security policies, RBAC, and secret management              |
| **Market Data Sources**         | Market Data APIs (e.g., Twelve Data, CSE)              | External real-time and historical financial market data feeds and exchange interfaces                             |
| **News Sources**                | News APIs (e.g., NewsAPI)                              | External financial news and media feeds for market intelligence and sentiment analysis                            |

---

## 2. Core Architectural Principles

1. **Dual Ingestion, Single Canonical Model**:
   - MarketLens ingests data via **External APIs** (e.g., Twelve Data, CSE) and **Uploaded Files** (CSV/JSON).
   - Both streams must converge through validation, normalization, and quality control into a single canonical market data model stored in PostgreSQL / TimescaleDB.

2. **Polyglot Service Division**:
   - **Java + Spring Boot**: Manages enterprise security, user entities, authentication, and role-based access control (RBAC).
   - **Python Microservices**: Handle data pipelines, time-series calculations, NLP sentiment extraction, and machine learning prediction models.

3. **Frontend Protection**:
   - The React frontend is built on Tailwind CSS, Lucide icons, and Recharts. Maintain consistency with existing design tokens, components, and user flows.
   - Do not break existing UI components or mock contexts during backend integration.

4. **Security & Secrets**:
   - Never expose third-party API keys (Twelve Data, NewsAPI, CSE) or database credentials to the client/frontend.
   - All external provider communication must flow through internal backend services.

---

## 3. Agent Rules & Constraints

- **Preserve Architecture**: Do not replace the chosen technology stack without explicit user instructions.
- **Reference Document**: Detailed module specifications, UML context, and team responsibilities reside in [MARKETLENS_PROJECT_CONTEXT.md](./MARKETLENS_PROJECT_CONTEXT.md).
- **Test Before Completing**: Verify all builds (`npm run build`) and linting before concluding any implementation task.

---

## 4. Five-Member Team Ownership & Module Boundaries

Each developer vertically owns their assigned module across UI, API, microservice, and database schemas:

1. **Member 1 (Market Exploration & Stock Analysis)**:
   - Frontend: `frontend/src/features/market/`, `frontend/src/features/dashboard/`
   - Microservice: `backend/market-data-service/` (FastAPI :8001)
   - Scope: Real-time quotes, OHLCV candles, technical indicators (SMA, EMA, RSI, MACD).

2. **Member 2 (Portfolio, Watchlist & Alert Management)**:
   - Frontend: `frontend/src/features/portfolio/`, `frontend/src/features/watchlist/`
   - Database: `portfolios`, `portfolio_holdings`, `watchlists` tables in PostgreSQL.
   - Scope: Real-time cost basis, unrealized P&L, price trigger alerts, sparklines.

3. **Member 3 (Financial News & Market Intelligence)**:
   - Frontend: `frontend/src/features/news/`
   - Microservice: `backend/news-service/` (FastAPI :8002)
   - Scope: NewsAPI ingestion, NLP-based sentiment analysis, ticker correlation.

4. **Member 4 (Data Management & Ingestion Pipeline)**:
   - Frontend: `frontend/src/features/data-management/`, `frontend/src/features/data-import/`, `frontend/src/features/data-quality/`
   - Microservice: `data-pipeline/` (FastAPI :8003)
   - Scope: Dual ingestion (APIs + CSV uploads), anomaly triage drawer, canonical model storage.

5. **Member 5 (AI Prediction & Advanced Analytics)**:
   - Frontend: `frontend/src/features/ai/`
   - Microservice: `ai/` (FastAPI :8004)
   - Scope: LSTM trend classifier, XGBoost volatility model, analyst thesis grounding.

---

## 5. Git Flow & CI/CD Governance

- **Protected Branches**: `main` (production) and `develop` (team integration). Direct pushes are strictly prohibited.
- **Feature Branches**: Must branch from `develop` using `feature/member<X>-<task-name>`.
- **Pull Requests**: Must target `develop`, link a GitHub Issue, use `.github/pull_request_template.md`, and pass automated GitHub Actions CI.
- **Docker Verification**: Every PR affecting backend, frontend, or infrastructure must be verified with `docker compose up -d --build`.
- **Full Guide**: Consult [CONTRIBUTING.md](./CONTRIBUTING.md) and [docs/development/GIT_WORKFLOW.md](./docs/development/GIT_WORKFLOW.md).

