# MarketLens — Five-Member Team Ownership Matrix & Module Boundaries

This document defines the definitive module ownership, architectural boundaries, cross-module dependencies, and vertical integration responsibilities for the five-member engineering team.

---

## 1. Ownership Philosophy: Full-Stack Vertical Ownership

MarketLens does not divide work into "frontend developers" vs. "backend developers." Instead, **each team member vertically owns their functional domain**, encompassing:
1. Frontend React views, charts, and interactions.
2. Backend microservices, controllers, and domain logic.
3. API design, schemas, and contract documentation.
4. Database schemas, queries, and data validation.
5. Unit tests, integration tests, and Docker container verification.

---

## 2. Five-Member Responsibility Matrix

| Member | Functional Domain | Frontend Scope | Backend & Microservice Scope | Primary Technologies | Cross-Module Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Member 1** | **Market Exploration & Stock Analysis** | `/markets`, `/markets/:symbol`, interactive Recharts timelines, technical indicator charts (SMA 50/200, RSI, MACD), peer valuation benchmarks | `backend/market-data-service`: Real-time quote streaming, historical OHLCV data aggregations, technical indicators, valuation multiples | React 18, TypeScript, Tailwind CSS, Recharts, Python 3.11, FastAPI, NumPy | Consumes canonical market data from **Member 4** |
| **Member 2** | **Portfolio, Watchlist & Alert Management** | `/portfolio`, `/watchlist`, holding modal dialogs, real-time unrealized P&L calculations, price threshold alerts, sparkline charts | PostgreSQL transactional queries: portfolios, holdings, cost basis calculations, threshold notification triggers | React 18, TypeScript, PostgreSQL 16, Java/Python service endpoints | Consumes live quotes from **Member 1**; relies on Auth from **User & Auth Service** |
| **Member 3** | **Financial News & Market Intelligence** | `/news`, sector sentiment distribution bars, trending ticker mentions, news category filters, sentiment badge indicators | `backend/news-service`: External financial news ingestion (NewsAPI), NLP-based sentiment analysis, ticker correlation, entity tagging | React 18, TypeScript, Python 3.11, FastAPI, NLTK / Transformers | Provides sentiment metrics to **Member 5** (AI feature store) |
| **Member 4** | **Data Management & Ingestion Pipeline** | `/data-management`, `/data-import`, `/data-quality`, 3-step upload wizard, anomaly triage resolution drawer, provider health cards | `data-pipeline`: Batch CSV/JSON ingestion pipeline, schema mapping, Twelve Data & CSE API integrations, anomaly detection (Z-score), canonical model writing | React 18, TypeScript, Python 3.11, FastAPI, Pandas, TimescaleDB | Feeds canonical market data to **Member 1** and **Member 5** |
| **Member 5** | **AI Prediction & Advanced Analytics** | `/ai-analyst`, natural language query input, thesis evidence matrix, prediction confidence gauges, historical vs predicted overlays | `ai`: Directional LSTM / XGBoost models, inference APIs, feature store interface, financial grounding thesis generator, prediction evaluation | React 18, TypeScript, Python 3.11, FastAPI, Scikit-learn, PyTorch/NumPy | Heavily depends on **Member 4** for historical data; consumes sentiment from **Member 3** |

---

## 3. Detailed Member Profiles & Module Boundaries

### Member 1 — Market Exploration & Stock Analysis
- **Codebase Locations**:
  - Frontend: `frontend/src/features/market/`, `frontend/src/features/dashboard/`
  - Backend: `backend/market-data-service/`
- **Key Responsibilities**:
  - Single stock diagnostics view (`AAPL` and broader catalog).
  - High-performance technical indicators: Moving Averages (SMA 50, SMA 200, EMA 20), Relative Strength Index (RSI 14), MACD (12, 26, 9).
  - Intraday and historical OHLCV candlestick aggregation.
- **Contract Boundary**: Exposes `/api/v1/market/quote/{symbol}` and `/api/v1/market/indicators/{symbol}`.

### Member 2 — Portfolio, Watchlist & Alert Management
- **Codebase Locations**:
  - Frontend: `frontend/src/features/portfolio/`, `frontend/src/features/watchlist/`
  - Database: `portfolios`, `portfolio_holdings`, `watchlists` tables in `infrastructure/scripts/init-db.sql`
- **Key Responsibilities**:
  - Portfolio tracking: shares, purchase price, current value, total cost basis, unrealized gain/loss ($ and %).
  - Watchlist sparklines and user price alerts (high/low price triggers).
  - Exporting portfolio performance reports.
- **Contract Boundary**: Exposes `/api/v1/portfolio/...` and `/api/v1/watchlist/...`.

### Member 3 — Financial News & Market Intelligence
- **Codebase Locations**:
  - Frontend: `frontend/src/features/news/`
  - Backend: `backend/news-service/`
- **Key Responsibilities**:
  - External financial news aggregation (NewsAPI, RSS feeds).
  - NLP sentiment scoring (-1.0 Bearish to +1.0 Bullish).
  - Correlating news articles with specific equity tickers (`AAPL`, `NVDA`, `MSFT`, `SPY`).
  - Sector sentiment breakdown telemetry.
- **Contract Boundary**: Exposes `/api/v1/news/articles` and `/api/v1/news/sentiment/{symbol}`.

### Member 4 — Data Management & Data Pipeline
- **Codebase Locations**:
  - Frontend: `frontend/src/features/data-management/`, `frontend/src/features/data-import/`, `frontend/src/features/data-quality/`
  - Backend: `data-pipeline/`
- **Key Responsibilities**:
  - Dual Ingestion Engine: External APIs (Twelve Data, CSE) + User-uploaded files (CSV, JSON).
  - 3-step import wizard: File upload -> Column schema mapping -> Ingestion confirmation.
  - Data Quality & Anomaly Triage: Z-Score statistical anomaly detection, missing field quarantine, resolution drawer (Correct / Quarantine / Discard).
  - Canonical Data Persistence: Normalizing all inputs into TimescaleDB `market_ticks` and PostgreSQL tables.
- **Contract Boundary**: Exposes `/api/v1/pipeline/sources`, `/api/v1/pipeline/batches`, and canonical access endpoint `/api/v1/pipeline/canonical/market-data/{symbol}`.

### Member 5 — AI Prediction & Advanced Analytics
- **Codebase Locations**:
  - Frontend: `frontend/src/features/ai/`
  - Backend: `ai/`
- **Key Responsibilities**:
  - Machine learning models: Trend classification, volatility estimation, price target forecasting.
  - Explanation telemetry: Factor weighting matrix (Technical Momentum, News Sentiment, Macro Interest Rates).
  - Grounded financial thesis generator: Context-aware narrative output with evidence citations.
  - Model lifecycle: Performance tracking, training schedules, drift evaluation.
- **Contract Boundary**: Exposes `/api/v1/ai/predict/{symbol}` and `/api/v1/ai/models/status`.

---

## 4. Shared Infrastructure & Maintainer Governance

To prevent conflicting edits to shared files, a **Repository Maintainer** (rotating or designated lead) oversees shared resources:
- **Shared Code Areas**:
  - `frontend/src/components/layout/` (`AppLayout.tsx`, `Sidebar.tsx`, `TopHeader.tsx`)
  - `frontend/src/components/ui/` (`Button.tsx`, `Input.tsx`, `Modal.tsx`, `Badge.tsx`)
  - `frontend/src/context/AuthContext.tsx`
  - `docker-compose.yml`, `docker-compose.prod.yml`
  - `infrastructure/nginx/nginx.conf`
  - `.github/workflows/`
- **Governance Rule**: No member may modify shared infrastructure or components without consulting the affected members and tagging the Maintainer on the PR.
