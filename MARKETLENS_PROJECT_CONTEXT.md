# MarketLens --- Full Project Context for AI Agents

## 1. Purpose of This File

This document is the canonical project-understanding context for any AI
coding, architecture, documentation, UI/UX, testing, or implementation
agent working on **MarketLens**.

An agent should read this file before making changes to the project. It
explains the project's purpose, users, functional modules, architecture,
data flows, frontend ownership, backend expectations, AI functionality,
data-source strategy, UI/UX direction, and implementation constraints.

> Important: This document describes the intended system architecture
> and the current project direction. Where a concrete implementation
> detail is not yet finalized, the agent must preserve the stated
> architecture and avoid inventing unsupported behavior.

------------------------------------------------------------------------

# 2. Project Identity

**Project Name:** MarketLens

**System Type:** Financial market intelligence, stock analysis,
portfolio/watchlist management, financial news intelligence, and
AI-assisted market analysis platform.

**Primary User:** Financial analyst / market analyst.

**Secondary Users:** Data manager and system administrators/maintainers,
depending on deployment and implementation scope.

**Primary Goal:** Build a unified platform that allows analysts to
collect, explore, analyze, monitor, and interpret financial market
information from multiple sources while providing AI-assisted insights
and predictions.

MarketLens is not intended to be just a stock-price dashboard. It
combines:

-   Market data
-   Financial data
-   Stock analysis
-   Portfolio management
-   Watchlists
-   Alerts
-   Financial news
-   Market intelligence
-   AI-assisted analysis
-   AI prediction models
-   Data ingestion from APIs
-   Data ingestion from uploaded market datasets
-   Visual analytics
-   Analyst-oriented dashboards

------------------------------------------------------------------------

# 3. Core Problem

Financial analysts commonly need to work across multiple disconnected
sources for:

-   Current and historical market prices
-   Stock fundamentals
-   Technical indicators
-   Company information
-   Financial news
-   Portfolio tracking
-   Watchlists
-   Alerts
-   Market trends
-   Predictive analysis

This fragmentation creates several problems:

1.  Data is distributed across different systems.
2.  Analysts must manually compare information from multiple sources.
3.  Market data and news are not always available in a unified
    analytical context.
4.  Historical datasets may need to be uploaded and analyzed separately.
5.  It is difficult to move from raw market data to meaningful insights.
6.  Prediction and AI-assisted interpretation are often separated from
    normal market analysis workflows.

MarketLens addresses these problems through a unified financial
intelligence platform.

------------------------------------------------------------------------

# 4. Project Aim

The overall aim is to design and implement a centralized market
intelligence platform that integrates financial market data, analytical
tools, portfolio/watchlist functionality, financial news, and
AI-assisted insights into one analyst-oriented system.

------------------------------------------------------------------------

# 5. Main Objectives

The system should:

-   Collect market data from external market-data APIs.
-   Support uploaded market datasets as a second data-ingestion stream.
-   Normalize and validate incoming market data.
-   Store and manage market information in a structured way.
-   Provide stock exploration and detailed financial analysis.
-   Provide historical price and analytical visualizations.
-   Support portfolio management.
-   Support watchlists.
-   Support configurable alerts.
-   Aggregate and present relevant financial news.
-   Provide market intelligence and contextual information.
-   Provide AI-assisted market analysis.
-   Provide AI prediction models.
-   Present analytical information through a clear, professional
    financial dashboard.
-   Maintain a modular architecture so individual components can be
    developed and maintained independently.

------------------------------------------------------------------------

# 6. Target Users

## 6.1 Analyst

The analyst is the primary consumer of MarketLens.

Typical analyst activities:

-   Search for stocks.
-   Inspect current market information.
-   Review historical performance.
-   Analyze technical and financial indicators.
-   Compare securities.
-   Read financial news.
-   Monitor watchlisted securities.
-   Track portfolio holdings.
-   Configure alerts.
-   Review AI-generated insights.
-   Review AI prediction outputs.
-   Use dashboards to identify market opportunities and risks.

## 6.2 Data Manager

The data manager is responsible for data-oriented operations such as:

-   Uploading market datasets.
-   Monitoring ingestion.
-   Checking data quality.
-   Managing data imports.
-   Reviewing ingestion errors.
-   Supporting data availability for downstream analysis.

## 6.3 Administrator / Maintainer

Depending on the final implementation scope, administrative
responsibilities can include:

-   System configuration.
-   API configuration.
-   Monitoring.
-   User/access management.
-   Operational maintenance.
-   Model/configuration management.

------------------------------------------------------------------------

# 7. Major Functional Modules

MarketLens is organized around the following major modules.

## Module 1 --- Market Exploration, Financial Data & Stock Analysis

**Primary user:** Analyst

Responsibilities:

-   Search and discover stocks.
-   View stock profiles.
-   View current/near-current market data.
-   View historical prices.
-   View price charts.
-   View financial metrics.
-   View fundamental information.
-   View technical indicators.
-   Analyze stock performance.
-   Compare market information.
-   Provide analytical context for individual securities.

Typical UI areas:

-   Dashboard
-   Market overview
-   Stock search
-   Stock details
-   Historical chart
-   Financial metrics
-   Technical analysis
-   Comparison views

------------------------------------------------------------------------

## Module 2 --- Portfolio, Watchlist & Alert Management

**Primary user:** Analyst

Responsibilities:

-   Create and manage portfolios.
-   Add/remove holdings.
-   Track portfolio performance.
-   View portfolio allocation.
-   Manage watchlists.
-   Add/remove securities from watchlists.
-   Configure price/market alerts.
-   View active and triggered alerts.
-   Support analyst monitoring workflows.

Typical UI areas:

-   Portfolio dashboard
-   Portfolio details
-   Watchlist
-   Alerts
-   Holding details
-   Performance summaries

------------------------------------------------------------------------

## Module 3 --- Financial News & Market Intelligence

**Primary users:** Analyst / Data Manager

Responsibilities:

-   Collect financial news.
-   Display relevant market news.
-   Associate news with companies/securities where possible.
-   Support market intelligence views.
-   Allow analysts to understand events behind market movements.
-   Provide contextual information alongside market data.

Typical UI areas:

-   News feed
-   News detail
-   Market intelligence
-   Company news
-   Market events
-   Search/filter controls

------------------------------------------------------------------------

## Module 4 --- AI-Assisted Market Analysis & Prediction

**Primary user:** Analyst

Responsibilities:

-   Generate AI-assisted market insights.
-   Summarize complex market information.
-   Identify patterns and trends.
-   Support analyst interpretation.
-   Produce prediction outputs from historical/analytical data.
-   Present model outputs with appropriate context.
-   Avoid presenting predictions as guaranteed financial outcomes.

The AI layer should consume structured and validated data from the
data/analytics layers rather than directly depending on arbitrary raw
external responses.

Typical outputs:

-   Trend summaries
-   Market insights
-   Risk indicators
-   Forecast values
-   Prediction direction/classification
-   Confidence/probability where supported
-   Explanatory factors/features
-   AI-generated summaries

------------------------------------------------------------------------

# 8. High-Level System Architecture

The intended architecture is layered and modular.

``` text
                    ┌─────────────────────────────┐
                    │        MarketLens UI        │
                    │     React Web Frontend      │
                    └──────────────┬──────────────┘
                                   │
                         REST / HTTP APIs
                                   │
                    ┌──────────────▼──────────────┐
                    │       API / Backend Layer    │
                    │ Authentication / Validation │
                    │ Business Logic / Routing    │
                    └──────────────┬──────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
            ▼                      ▼                      ▼
   ┌────────────────┐    ┌─────────────────┐    ┌────────────────┐
   │ Market Data     │    │ Financial News  │    │ AI / ML Layer  │
   │ Integration     │    │ Integration     │    │ Analysis &     │
   │ APIs            │    │                 │    │ Prediction     │
   └───────┬────────┘    └────────┬────────┘    └───────┬────────┘
           │                       │                     │
           └──────────────┬────────┴─────────────────────┘
                          ▼
                 ┌─────────────────────┐
                 │ Data Processing &   │
                 │ Normalization       │
                 └──────────┬──────────┘
                            │
                    ┌───────▼────────┐
                    │ Data Storage    │
                    │ / Database      │
                    └───────┬────────┘
                            │
            ┌───────────────┴────────────────┐
            │                                │
            ▼                                ▼
   External API ingestion            File Upload ingestion
            │                                │
            └───────────────┬────────────────┘
                            ▼
                     Unified Data Model
```

> **Note on Service Technologies:** See **Section 30 (Technology Direction & Architecture Tech Stack)** for the detailed microservice stack mapping (API Gateway, Java + Spring Boot User & Auth Service, Python Data Ingestion / Market Data / AI & Prediction / News Services, PostgreSQL + TimescaleDB storage, Docker, Kubernetes, and Cloud infrastructure).

The two major market-data ingestion paths are:

1.  **External market-data APIs**
2.  **Uploaded market datasets**

Both must ultimately feed a common validation, normalization, and
storage pipeline.

------------------------------------------------------------------------

# 9. Dual Market-Data Ingestion Strategy

A key architectural requirement is that MarketLens supports two
different data streams.

## 9.1 Stream A --- Market Data APIs

External APIs can provide:

-   Current prices
-   Historical prices
-   Volume
-   Market information
-   Fundamental metrics
-   Other supported financial indicators

Typical flow:

``` text
External Market Data API
        ↓
API Integration Service
        ↓
Response Validation
        ↓
Data Normalization
        ↓
Duplicate / Quality Checks
        ↓
Database
        ↓
Analytics / AI / UI
```

## 9.2 Stream B --- Uploaded Market Data

A data manager may upload:

-   CSV
-   Spreadsheet-based datasets
-   Other supported structured market-data files

Typical flow:

``` text
Uploaded Dataset
      ↓
Upload API
      ↓
File Validation
      ↓
Schema Validation
      ↓
Parsing
      ↓
Normalization
      ↓
Quality Checks
      ↓
Database
      ↓
Analytics / AI / UI
```

## 9.3 How the Two Streams Are Unified

The system must not maintain two unrelated versions of market data.

Both streams should converge into a shared canonical data model.

``` text
             API DATA
                │
                ▼
        ┌───────────────┐
        │ Validation     │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │ Normalization  │
        └───────┬───────┘
                │
                │
                ├──────────────┐
                │              │
                ▼              ▼
          Canonical       Quality / Duplicate
          Market Data     Processing
                │              │
                └──────┬───────┘
                       ▼
                    Storage
                       ▲
                ┌──────┴───────┐
                │               │
        Upload Data       Same Validation
```

The important design principle is:

> **Different ingestion mechanisms, one canonical downstream data
> model.**

This prevents the analytics and AI layers from needing separate logic
for API data and uploaded data.

------------------------------------------------------------------------

# 10. Data Pipeline

The general data pipeline is:

``` text
SOURCE
  │
  ├── External API
  │
  └── Uploaded Dataset
          │
          ▼
INGESTION
          │
          ▼
VALIDATION
          │
          ▼
NORMALIZATION
          │
          ▼
QUALITY CONTROL
          │
          ▼
STORAGE
          │
          ├── Market Analytics
          ├── Portfolio
          ├── Watchlist / Alerts
          ├── News Intelligence
          └── AI / ML
                    │
                    ▼
               API Layer
                    │
                    ▼
                React UI
```

------------------------------------------------------------------------

# 11. Canonical Market Data Concept

Regardless of source, the internal model should represent market
observations consistently.

A typical market record concept contains:

-   Security identifier / ticker
-   Company/security name
-   Exchange
-   Timestamp/date
-   Open
-   High
-   Low
-   Close
-   Adjusted close where available
-   Volume
-   Source
-   Data quality/status metadata

Additional fundamental or analytical records can contain:

-   Market capitalization
-   P/E
-   EPS
-   Dividend information
-   Revenue
-   Profit
-   Growth metrics
-   Debt metrics
-   Other supported financial ratios

The exact database schema can evolve, but downstream consumers should
depend on stable domain models rather than provider-specific JSON
formats.

------------------------------------------------------------------------

# 12. Backend/API Responsibilities

The backend/API layer should:

-   Expose stable endpoints to the frontend.
-   Validate request parameters.
-   Validate uploaded files.
-   Authenticate/authorize requests where applicable.
-   Invoke business logic.
-   Integrate external market-data providers.
-   Integrate news providers.
-   Manage portfolios.
-   Manage watchlists.
-   Manage alerts.
-   Trigger analytics.
-   Trigger AI/ML inference.
-   Return normalized response objects.
-   Handle errors consistently.
-   Protect API keys and provider credentials.
-   Avoid exposing external provider credentials to the frontend.

------------------------------------------------------------------------

# 13. API Endpoint Groups

The API should be organized by domain rather than by individual UI
screens.

Likely endpoint groups include:

## Market

``` text
GET /api/market/overview
GET /api/market/search
GET /api/market/stocks
GET /api/market/stocks/:symbol
GET /api/market/stocks/:symbol/quote
GET /api/market/stocks/:symbol/history
GET /api/market/stocks/:symbol/financials
GET /api/market/stocks/:symbol/indicators
GET /api/market/compare
```

## Portfolio

``` text
GET    /api/portfolios
POST   /api/portfolios
GET    /api/portfolios/:id
PUT    /api/portfolios/:id
DELETE /api/portfolios/:id

GET    /api/portfolios/:id/holdings
POST   /api/portfolios/:id/holdings
PUT    /api/portfolios/:id/holdings/:holdingId
DELETE /api/portfolios/:id/holdings/:holdingId

GET /api/portfolios/:id/performance
```

## Watchlist

``` text
GET    /api/watchlists
POST   /api/watchlists
GET    /api/watchlists/:id
PUT    /api/watchlists/:id
DELETE /api/watchlists/:id

POST   /api/watchlists/:id/items
DELETE /api/watchlists/:id/items/:symbol
```

## Alerts

``` text
GET    /api/alerts
POST   /api/alerts
GET    /api/alerts/:id
PUT    /api/alerts/:id
DELETE /api/alerts/:id
GET    /api/alerts/triggered
```

## News

``` text
GET /api/news
GET /api/news/:id
GET /api/news/company/:symbol
GET /api/news/market
```

## Market Intelligence

``` text
GET /api/intelligence/overview
GET /api/intelligence/trends
GET /api/intelligence/events
GET /api/intelligence/sectors
```

## AI

``` text
POST /api/ai/analyze
POST /api/ai/insights
POST /api/ai/predict
GET  /api/ai/models
GET  /api/ai/predictions/:symbol
```

## Data ingestion

``` text
POST /api/data/upload
GET  /api/data/uploads
GET  /api/data/uploads/:id
GET  /api/data/uploads/:id/status
POST /api/data/sync
GET  /api/data/sources
```

These represent the intended API organization. Exact endpoint names
should follow the actual implementation once backend contracts are
finalized.

------------------------------------------------------------------------

# 14. Frontend Architecture

The frontend is a React-based web application.

The prototype is currently deployed at:

`https://marketlens.daniduhansaka.workers.dev/dashboard`

The UI should be treated as an analyst-oriented financial web
application.

Frontend responsibilities include:

-   Navigation
-   Dashboard composition
-   Data visualization
-   Stock search
-   Stock detail presentation
-   Portfolio interfaces
-   Watchlist interfaces
-   Alert interfaces
-   News interfaces
-   AI insight interfaces
-   Prediction interfaces
-   Loading states
-   Empty states
-   Error states
-   Responsive behavior
-   API state handling

The frontend must not contain provider-specific business logic that
belongs in the backend.

------------------------------------------------------------------------

# 15. Frontend Design Direction

The interface should communicate:

-   Financial professionalism
-   Information density without clutter
-   Clear hierarchy
-   Fast scanning
-   Data-driven decision support
-   Consistent visual language
-   Responsive layouts
-   Strong chart/data visualization
-   Clear status indicators

The design should prioritize analyst workflows rather than decorative
UI.

------------------------------------------------------------------------

# 16. UI Design Principles

The project uses/should use the following principles:

## Consistency

Common controls, cards, tables, badges, charts, spacing, and typography
should behave consistently throughout the application.

## Visual hierarchy

Important values and market states must be visually prominent.

## Information density

Financial applications require more information than ordinary consumer
dashboards. Density is acceptable when the information is organized.

## Progressive disclosure

Do not display every available data point simultaneously. Show
high-value information first and allow deeper inspection.

## Scannability

Analysts should be able to identify:

-   Price
-   Percentage change
-   Risk
-   Trend
-   Volume
-   Important news
-   Portfolio performance
-   Alerts

quickly.

## Feedback

The interface should clearly communicate:

-   Loading
-   Success
-   Failure
-   Empty results
-   Data freshness
-   Prediction status

## Accessibility

Use readable typography, sufficient contrast, keyboard-friendly
controls, meaningful labels, and non-color-only status indicators.

------------------------------------------------------------------------

# 17. Main UI Areas

A typical MarketLens application should contain:

## Dashboard

Provides a high-level market snapshot.

Potential content:

-   Market indices
-   Market movers
-   Watchlist summary
-   Portfolio summary
-   Recent news
-   AI insights
-   Alerts
-   Market trends

## Market Exploration

Allows analysts to:

-   Search stocks
-   Browse market data
-   Filter securities
-   Inspect movers
-   Compare securities

## Stock Detail

Provides:

-   Price
-   Change
-   Historical chart
-   Volume
-   Fundamental metrics
-   Technical indicators
-   Company information
-   Related news
-   AI analysis
-   Predictions

## Portfolio

Provides:

-   Holdings
-   Allocation
-   Performance
-   Profit/loss
-   Position details
-   Portfolio analytics

## Watchlist

Provides:

-   Watched securities
-   Current price
-   Price change
-   Trend
-   Alerts
-   Quick navigation to stock details

## Alerts

Provides:

-   Active alerts
-   Triggered alerts
-   Alert configuration
-   Alert history

## News

Provides:

-   News feed
-   Search/filter
-   Company-specific news
-   Market news
-   Relevant event context

## AI / Predictions

Provides:

-   AI market summaries
-   Stock insights
-   Forecasts
-   Prediction confidence
-   Model information
-   Key factors/features

------------------------------------------------------------------------

# 18. Data Visualization

Charts are a major part of the MarketLens experience.

Potential visualizations include:

-   Line charts
-   Area charts
-   Candlestick charts
-   Volume charts
-   Bar charts
-   Comparison charts
-   Portfolio allocation charts
-   Performance charts
-   Trend indicators
-   KPI cards
-   Tables

Charts should support:

-   Time-range selection
-   Tooltips
-   Clear axes
-   Meaningful labels
-   Consistent units
-   Responsive behavior

Avoid visualizations that look impressive but do not improve analytical
understanding.

------------------------------------------------------------------------

# 19. AI / ML Architecture

The AI layer is a separate analytical capability.

A conceptual flow:

``` text
Canonical Market Data
        │
        ├── Historical Prices
        ├── Technical Indicators
        ├── Fundamentals
        ├── News / Sentiment
        └── Market Context
                │
                ▼
          Feature Engineering
                │
                ▼
          AI / ML Model
                │
        ┌───────┴────────┐
        ▼                ▼
 Prediction         Explanation /
 Output             Key Factors
        │                │
        └───────┬────────┘
                ▼
          AI API Response
                │
                ▼
             React UI
```

Possible prediction targets include:

-   Direction classification
-   Future price estimation
-   Trend classification
-   Risk classification
-   Probability/confidence

The exact model should be selected based on available training data,
evaluation requirements, and project scope.

------------------------------------------------------------------------

# 20. AI Safety / Interpretation

AI predictions are analytical outputs, not guarantees.

The UI should communicate:

-   Prediction horizon
-   Model/version where applicable
-   Confidence/probability where available
-   Relevant input factors
-   Data timestamp
-   Limitations

Do not describe a prediction as certain.

The system should distinguish between:

-   Historical fact
-   Current market data
-   Computed analytical metric
-   AI-generated interpretation
-   Model prediction

------------------------------------------------------------------------

# 21. Financial News Intelligence

News is not merely a separate feed.

Where technically feasible, news should be linked to:

-   Companies
-   Securities
-   Market sectors
-   Market events
-   Price movements

This enables workflows such as:

``` text
Stock price movement
       ↓
Relevant news
       ↓
Event/context
       ↓
AI interpretation
```

This is a key differentiator from a simple stock dashboard.

------------------------------------------------------------------------

# 22. Portfolio Architecture

Portfolio functionality should support:

-   Portfolio creation.
-   Holdings.
-   Quantity.
-   Entry price.
-   Current price.
-   Position value.
-   Profit/loss.
-   Allocation.
-   Performance over time.

Derived values should preferably be calculated consistently in
backend/domain logic rather than independently by every frontend
component.

------------------------------------------------------------------------

# 23. Watchlist Architecture

A watchlist should provide quick monitoring without requiring a full
portfolio position.

Typical item information:

-   Symbol
-   Company
-   Current price
-   Daily change
-   Percentage change
-   Trend
-   Optional alert state

Watchlist operations should be simple and fast.

------------------------------------------------------------------------

# 24. Alert Architecture

Alerts should be rule-driven.

Possible rules:

-   Price above threshold
-   Price below threshold
-   Percentage movement
-   Volume condition
-   Technical indicator condition
-   Other supported market conditions

Conceptually:

``` text
Market Data Update
       ↓
Alert Rule Evaluation
       ↓
Condition Met?
    /       \
  No         Yes
  │           │
  │           ▼
  │      Create Trigger
  │           │
  │           ▼
  └──────→ Alert State
```

Alert processing should be decoupled from the UI.

------------------------------------------------------------------------

# 25. Data Quality

Financial applications require explicit data-quality handling.

The system should consider:

-   Missing values
-   Invalid timestamps
-   Invalid symbols
-   Duplicate records
-   Unexpected provider fields
-   Inconsistent units
-   Invalid OHLC relationships
-   Incorrect numeric types
-   Stale data
-   Provider outages

Bad data should not silently propagate into analytics or AI models.

------------------------------------------------------------------------

# 26. Error Handling

Use consistent API error structures.

Example conceptual response:

``` json
{
  "success": false,
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "The requested security could not be found."
  }
}
```

Frontend behavior should distinguish:

-   Network errors
-   Validation errors
-   Not found
-   Provider failures
-   Authentication failures
-   Empty results
-   Internal server errors

------------------------------------------------------------------------

# 27. API Provider Abstraction

External market-data and news providers should be abstracted behind
internal services.

Prefer:

``` text
Frontend
   ↓
MarketLens API
   ↓
Market Data Service
   ↓
Provider Adapter
   ↓
External Provider
```

rather than:

``` text
Frontend
   ↓
External Provider
```

This makes it easier to:

-   Change providers
-   Add providers
-   Normalize provider responses
-   Protect API credentials
-   Implement caching
-   Handle provider-specific failures

------------------------------------------------------------------------

# 28. Caching

Frequently requested market information can benefit from caching.

Candidates include:

-   Market overview
-   Quotes
-   Historical data
-   News
-   Search results
-   Technical indicators

Caching must respect data freshness requirements.

Do not cache time-sensitive market data for unnecessarily long periods.

------------------------------------------------------------------------

# 29. Security Principles

Never expose:

-   API keys
-   Database credentials
-   Model service credentials
-   Private configuration
-   Internal secrets

in the React frontend.

Use environment/configuration management on the server side.

Validate all uploaded files and API inputs.

Do not trust client-supplied financial calculations when the backend can
independently verify them.

------------------------------------------------------------------------

# 30. Technology Direction & Architecture Tech Stack

The platform adopts a polyglot microservice and containerized cloud architecture designed for high scalability, real-time market data throughput, analytical rigor, and AI model execution.

## 30.1 Defined Technology Stack

| Layer / Component | Technology / Platform | Description & Architectural Scope |
| :--- | :--- | :--- |
| **Frontend** | React | Modern responsive web frontend (React 18, TypeScript, Vite, Tailwind CSS, Recharts) providing analyst dashboards, charting, and operations UI. |
| **API / Access Layer** | API Gateway / Load Balancer | Central entry point, routing, reverse proxy, SSL termination, rate limiting, request validation, and load balancing across microservices. |
| **User & Auth Service** | Java + Spring Boot | Enterprise authentication, RBAC (Market Analyst, Data Manager, Admin), session management, user profile security, and audit logging. |
| **Data Ingestion Service** | Python | Ingestion pipelines for batch datasets (CSV/JSON upload wizard) and external API schedulers, schema mapping, validation, and anomaly cleaning. |
| **Market Data Service** | Python | Live quote streaming, historical price data processing, OHLCV candlestick aggregations, and technical indicator computations (SMA, EMA, RSI, MACD). |
| **AI & Prediction Service** | Python | Predictive ML models (price trends, direction, volatility forecasting), LLM/agent financial grounding, thesis generation, and explanation telemetry. |
| **News & Intelligence Service** | Python | Financial news aggregation, NLP-based sentiment analysis, sector impact scoring, and entity ticker correlation. |
| **Relational Database** | PostgreSQL | Relational transactional data: user profiles, portfolios, transactions, watchlists, alerts, import metadata, and system configuration. |
| **Time-Series Database** | TimescaleDB | High-frequency financial time-series ticks, historical OHLCV data, volume metrics, and high-performance time-window aggregation queries. |
| **File Storage** | Uploaded CSV/JSON files, processed data, reports, logs | Persistent storage for raw uploaded datasets, processed ingestion archives, exported reports, and service audit logs. |
| **Containerization** | Docker | Dockerized containers for all individual services ensuring environment parity across development, staging, and production. |
| **Orchestration** | Kubernetes | Cluster orchestration, service discovery, automated scaling, health checks, self-healing, and rolling zero-downtime deployments. |
| **Cloud Infrastructure** | Cloud platform — architecture currently says e.g. AWS / GCP | Cloud hosting provider for compute, managed databases, networking, and storage (prototype deployment currently hosted on Cloudflare Workers). |
| **Monitoring** | Prometheus + Grafana | Cluster and service metrics scraping, alerting rules, SLA/SLO tracking, latency tracing, and live operational Grafana dashboards. |
| **Security** | SSL, Firewall, Access Control | End-to-end SSL/TLS encryption, WAF/Firewalls, network security policies, role-based access control (RBAC), and secret/credential management. |
| **Market Data Sources** | Market Data APIs — architecture gives e.g. Twelve Data, CSE | External real-time and historical financial market data feeds and exchange interfaces (e.g. Twelve Data, Colombo Stock Exchange / CSE). |
| **News Sources** | News APIs — architecture gives e.g. NewsAPI | External financial news and media feeds for real-time market intelligence and sentiment analysis (e.g. NewsAPI). |

## 30.2 Polyglot Architecture & Technology Rationale

- **Java + Spring Boot for Core Enterprise Security**: Chosen for the User & Authentication Service due to its robust type safety, enterprise security ecosystem (Spring Security, OAuth2/JWT), mature transaction management, and rock-solid RBAC integrity.
- **Python for Data, Analytics, and AI Services**: Chosen for Data Ingestion, Market Data, News & Intelligence, and AI & Prediction Services to capitalize on Python's unmatched ecosystem for data processing (`pandas`, `numpy`), financial analysis, NLP (`nltk`, `spacy`, transformers), and machine learning (`scikit-learn`, `PyTorch`, `TensorFlow`).
- **PostgreSQL + TimescaleDB Hybrid Data Architecture**: PostgreSQL handles relational business domain entities (users, portfolios, alerts) with ACID guarantees, while TimescaleDB provides hypertable partitioning and compression optimized specifically for rapid financial time-series queries.
- **Docker + Kubernetes on Cloud Infrastructure**: Microservices are independently packageable, scalable, and deployable across Kubernetes clusters running on target cloud platforms (AWS / GCP).

------------------------------------------------------------------------

# 31. UML / System Design Context

The project includes UML/system-design work covering the major
application behavior and structure.

Relevant diagram concepts include:

-   Use-case relationships
-   System actors
-   Module responsibilities
-   Data flows
-   Backend services
-   Frontend interactions
-   Data ingestion
-   AI/ML processing
-   Portfolio/watchlist operations
-   News/market intelligence

Any future UML updates should remain consistent with the module
ownership described in this document.

------------------------------------------------------------------------

# 32. Team Work Distribution

The project is developed by a multi-member team.

The work distribution has been designed so that:

-   Each member has a clear primary responsibility.
-   Frontend contributions are distributed across all members where
    appropriate.
-   Backend/domain modules have identifiable ownership.
-   Member 4 and Member 5 have a significant analytical/backend
    relationship.
-   AI prediction models are assigned to Member 5.
-   Some responsibilities were moved from Member 5 to Member 4 to
    balance workload.
-   UI design/frontend implementation is also part of each member's
    contribution.

When implementing a feature, agents should preserve module ownership
rather than moving unrelated responsibilities between team members
without agreement.

------------------------------------------------------------------------

# 33. Frontend Ownership Principle

Frontend ownership is distributed by functional module.

Each team member may implement UI components corresponding to their
assigned backend/domain responsibility.

However:

-   Shared design components should remain centralized.
-   Shared layout/navigation should not be duplicated.
-   API client logic should be reusable.
-   Styling conventions should remain consistent.
-   Module ownership should not result in visually inconsistent screens.

------------------------------------------------------------------------

# 34. Figma / UI Prototype Context

The project has an existing React frontend prototype and a corresponding
UI design/prototyping effort.

The intended Figma work is to represent the completed React frontend as
a close one-to-one design/prototype.

The UI implementation should not invent a completely unrelated visual
language.

When modifying frontend screens:

1.  Inspect existing components first.
2.  Preserve established layout patterns.
3.  Preserve existing navigation.
4.  Preserve existing visual hierarchy.
5.  Improve only where explicitly requested or where a clear usability
    problem exists.

------------------------------------------------------------------------

# 35. Design System Expectations

A reusable design system should include:

-   Typography scale
-   Spacing scale
-   Buttons
-   Inputs
-   Selects
-   Tabs
-   Cards
-   Tables
-   Badges
-   Alerts
-   Modals
-   Dropdowns
-   Tooltips
-   Chart containers
-   Navigation
-   Sidebar
-   Header
-   Status indicators

Do not create one-off versions of the same component for every page.

------------------------------------------------------------------------

# 36. Repository / Codebase Agent Rules

When an AI agent is asked to modify the codebase, it should follow this
sequence.

## Step 1 --- Understand

Inspect:

-   Repository structure
-   package configuration
-   application entry points
-   routes
-   API clients
-   components
-   pages
-   services
-   models/types
-   styles
-   environment configuration

## Step 2 --- Identify ownership

Determine which MarketLens module the requested change belongs to.

## Step 3 --- Reuse

Look for existing:

-   Components
-   Hooks
-   API services
-   Utility functions
-   Types
-   Design tokens
-   Chart components

before creating new ones.

## Step 4 --- Implement

Make the smallest coherent change that satisfies the requirement.

## Step 5 --- Validate

Check:

-   Build
-   Type errors
-   Linting
-   Runtime behavior
-   API integration
-   Responsive behavior
-   Existing screens affected by the change

## Step 6 --- Report

Explain:

-   What changed
-   Which files changed
-   Why the change was made
-   Any assumptions
-   Any remaining limitations

------------------------------------------------------------------------

# 37. Do Not Make These Mistakes

An agent working on MarketLens must not:

-   Replace the entire UI without instruction.
-   Create duplicate components when an existing component can be
    reused.
-   Put secret API keys in frontend code.
-   Directly call external financial providers from arbitrary UI
    components.
-   Create separate incompatible schemas for API and uploaded data.
-   Treat uploaded data as a completely separate application.
-   Invent unsupported financial metrics.
-   Present AI predictions as guaranteed.
-   Remove existing functionality simply to implement a new feature.
-   Change module ownership without agreement.
-   Break established navigation.
-   Add unrelated dependencies unnecessarily.
-   Introduce inconsistent styling.
-   Hard-code data where a real API/data layer is expected.
-   Assume that a prototype screen represents the complete backend
    implementation.
-   Confuse UI mock data with production data.

------------------------------------------------------------------------

# 38. Development Priorities

Recommended implementation order:

## Priority 1 --- Foundation

-   Project structure
-   Shared UI system
-   API client
-   Core routing
-   Authentication/access model if required
-   Data models
-   Database structure

## Priority 2 --- Data ingestion

-   External market-data integration
-   Upload processing
-   Validation
-   Normalization
-   Storage

## Priority 3 --- Market analysis

-   Market overview
-   Search
-   Stock details
-   Historical charts
-   Financial metrics
-   Technical indicators

## Priority 4 --- Portfolio/watchlist

-   Portfolio CRUD
-   Holdings
-   Watchlists
-   Alerts
-   Performance calculations

## Priority 5 --- News/intelligence

-   News ingestion
-   News display
-   Company/market association
-   Intelligence views

## Priority 6 --- AI

-   Feature engineering
-   Model integration
-   Prediction API
-   AI insights
-   Prediction UI

## Priority 7 --- Hardening

-   Error handling
-   Data-quality monitoring
-   Performance
-   Security
-   Testing
-   Responsive behavior
-   Documentation

------------------------------------------------------------------------

# 39. Testing Strategy

Testing should cover:

## Unit tests

-   Data normalization
-   Validation
-   Financial calculations
-   Alert conditions
-   Utility functions
-   AI preprocessing

## Integration tests

-   API + database
-   API + external provider adapters
-   Upload + ingestion pipeline
-   Portfolio workflows
-   Watchlist workflows
-   Alert workflows

## Frontend tests

-   Component rendering
-   User interaction
-   Routing
-   API states
-   Error states
-   Empty states

## End-to-end tests

Important analyst workflows:

1.  Search a stock.
2.  Open stock details.
3.  Review historical performance.
4.  Add stock to watchlist.
5.  Configure alert.
6.  Add stock to portfolio.
7.  Review portfolio performance.
8.  Read related news.
9.  Request AI analysis.
10. Review prediction output.

------------------------------------------------------------------------

# 40. Performance Considerations

Avoid unnecessary:

-   API requests
-   Re-rendering
-   Large client-side calculations
-   Repeated historical-data downloads
-   Duplicate provider calls

Use:

-   Request caching where appropriate
-   Pagination
-   Lazy loading
-   Debounced search
-   Efficient chart data handling
-   Backend aggregation for expensive computations

------------------------------------------------------------------------

# 41. Observability

The system should eventually support visibility into:

-   API failures
-   Provider failures
-   Upload failures
-   Data-quality issues
-   Prediction failures
-   Slow endpoints
-   Alert-processing failures

Useful metadata includes:

-   Timestamp
-   Source
-   Request/operation identifier
-   Error code
-   Processing status

------------------------------------------------------------------------

# 42. Data Freshness

Financial data is time-sensitive.

The UI should make it possible to understand when data was last updated.

Examples:

-   Last updated timestamp
-   Data source
-   Market open/closed status where supported
-   Historical vs current data distinction

Never imply real-time behavior unless the underlying provider actually
supplies real-time or sufficiently current data.

------------------------------------------------------------------------

# 43. AI Agent Decision Rules

When an agent receives a request, it should classify it into one or more
of:

-   Frontend/UI
-   Backend/API
-   Data ingestion
-   Database
-   Analytics
-   Portfolio
-   Watchlist
-   Alerts
-   News
-   AI/ML
-   Infrastructure
-   Documentation
-   Testing

Then inspect the relevant module before making changes.

For cross-cutting requests, identify dependencies first.

Example:

> "Add an AI prediction chart to the stock page."

This is not only a frontend task.

It potentially requires:

``` text
Prediction model
      ↓
Prediction service
      ↓
Prediction API
      ↓
Frontend API client
      ↓
Prediction chart component
      ↓
Stock detail page
```

The agent should therefore inspect all relevant layers.

------------------------------------------------------------------------

# 44. API Contract Principle

Frontend and backend should communicate through explicit contracts.

A response should be stable and predictable.

Example:

``` json
{
  "success": true,
  "data": {
    "symbol": "AAPL",
    "price": 0,
    "change": 0,
    "changePercent": 0,
    "timestamp": "..."
  }
}
```

The actual values and fields depend on the implemented provider and
schema.

Agents should inspect existing types/interfaces before creating new
response structures.

------------------------------------------------------------------------

# 45. Mock Data Principle

Mock data is acceptable for:

-   UI development
-   Storybook/prototyping
-   Temporary frontend development
-   Automated tests

But mock data must be clearly separated from production API behavior.

Do not silently leave mock data in a production path.

------------------------------------------------------------------------

# 46. Documentation Expectations

Important system changes should update relevant documentation.

Documentation should cover:

-   Architecture
-   API contracts
-   Setup
-   Environment variables
-   Database
-   Data ingestion
-   AI models
-   Deployment
-   Testing
-   Module ownership

------------------------------------------------------------------------

# 47. Expected Agent Behavior

An AI agent working on MarketLens should behave as a senior software
engineer familiar with financial-data systems.

It should:

-   Understand the architecture before coding.
-   Prefer existing project patterns.
-   Ask for clarification only when a missing decision blocks
    implementation.
-   Avoid unnecessary rewrites.
-   Preserve compatibility.
-   Validate assumptions against the actual repository.
-   Keep modules separated.
-   Treat financial data as sensitive to correctness.
-   Treat predictions as probabilistic.
-   Write maintainable code.
-   Keep frontend and backend responsibilities clear.
-   Consider the impact of changes across the whole system.

------------------------------------------------------------------------

# 48. Canonical Mental Model

The simplest way to understand MarketLens is:

``` text
                    MARKETLENS
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       MARKET         PORTFOLIO       NEWS
       DATA           WATCHLIST      INTELLIGENCE
          │              │              │
          └──────────────┼──────────────┘
                         │
                     ANALYTICS
                         │
                         ▼
                    AI / ML LAYER
                         │
                         ▼
                INSIGHTS + PREDICTIONS
                         │
                         ▼
                   ANALYST DASHBOARD
```

And the data foundation is:

``` text
External APIs ─────┐
                   ├──► Validation ─► Normalization ─► Storage
Uploaded Files ────┘                                      │
                                                          ▼
                                               Analytics / AI / APIs
                                                          │
                                                          ▼
                                                     React UI
```

------------------------------------------------------------------------

# 49. Project North Star

The final MarketLens system should allow an analyst to move through the
following workflow without switching systems:

``` text
Discover a security
       ↓
Inspect market data
       ↓
Analyze historical/fundamental/technical information
       ↓
Review related financial news
       ↓
Add to watchlist or portfolio
       ↓
Configure monitoring/alerts
       ↓
Review AI-generated insight
       ↓
Review prediction/model output
       ↓
Make an informed analytical decision
```

That workflow is the core product concept.

------------------------------------------------------------------------

# 50. Final Instruction to Future Agents

Before changing MarketLens, always ask:

1.  **Which module does this belong to?**
2.  **Which layer owns the responsibility?**
3.  **Does an existing component/service already solve part of this?**
4.  **Does this affect the API contract or canonical data model?**
5.  **Does this need to work for both API-ingested and uploaded data?**
6.  **Does this affect AI/ML or financial calculations?**
7.  **Will this break another module or existing UI workflow?**
8.  **Is the implementation consistent with the existing React prototype
    and design system?**
9.  **Can the change be tested?**
10. **Is the resulting behavior explicit and understandable to the next
    developer?**

The agent should optimize for **correctness, maintainability,
consistency, and incremental progress**, not for rewriting the project
from scratch.

------------------------------------------------------------------------

# 51. Status / Known Context

Current project context includes:

-   A working React frontend prototype.
-   A deployed prototype/dashboard.
-   Existing UI design work.
-   Existing UML/system-design work.
-   Defined functional modules.
-   Defined team/module ownership.
-   Planned API endpoint structure.
-   Dual market-data ingestion strategy.
-   AI prediction functionality as part of the system.
-   Portfolio, watchlist, alerts, news, and market intelligence
    functionality.

Some implementation details may still evolve. The actual repository is
always the final authority for concrete file names, existing APIs,
installed packages, database schemas, and implemented behavior.

**Rule:** When this document conflicts with actual source code, inspect
the code and preserve the project requirements while avoiding
unsupported assumptions. Update this document when an architectural
decision becomes final.
