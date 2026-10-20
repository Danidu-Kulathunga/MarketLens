# MarketLens — Financial Market Data Management & Analytics Platform

MarketLens is a modern, enterprise-grade Financial Market Data Management and Analytics Platform built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Recharts**. The platform provides institutional-grade market telemetry, owned-portfolio management, AI-grounded financial research, automated data ingestion pipelines, statistical data quality triage, and administrative controls.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### Installation & Development Server
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build & Preview
```bash
# Compile TypeScript and build optimized assets
npm run build

# Preview the production build locally
npm run preview
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

## 🎨 Design Reference & Asset Inventory

All screens were recreated from the approved PNG visual references with high fidelity:

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

## 🛠️ Technology Stack & Architecture

- **Framework**: React 18 with TypeScript 5
- **Build Tool**: Vite 6 (fast HMR and optimized production bundling)
- **Styling**: Tailwind CSS 3 (bespoke design tokens matching the approved UI)
- **Charts & Visualizations**: Recharts (responsive financial charts, area gradients, bar charts, multi-series indicators)
- **Icons**: Lucide React
- **Routing**: React Router DOM v6 (role-based guards, protected routes, deep linking)
- **Branding**: Official MarketLens SVGs (`marketlens-logo.svg`, `marketlens-icon.svg`)
- **State Architecture**:
  - `AuthContext`: Role simulation, persistent demo identities, seamless role switching.
  - `MarketDataContext`: Real-time reactive mock financial data engine with persistent `localStorage` synchronization for holdings, watchlists, alerts, import batches, data quality issues, and audit logs.

---

## 📂 Project Directory Structure

```text
Marketlens/
├── frontend design/          # Approved visual references (.png) & official SVGs
├── public/                   # Public static assets & branding SVGs
├── src/
│   ├── assets/
│   │   └── branding/         # marketlens-logo.svg, marketlens-icon.svg
│   ├── components/
│   │   ├── layout/           # AppLayout, Sidebar, TopHeader
│   │   └── ui/               # Badge, Button, Input, Modal
│   ├── context/              # AuthContext, MarketDataContext
│   ├── data/
│   │   └── mock/             # Realistic financial datasets, stocks, batches, logs
│   ├── features/
│   │   ├── admin/            # UserManagement, SystemSettings, AuditLogs
│   │   ├── ai/               # AIAnalystPage
│   │   ├── api-access/       # APIAccessPage, APIKeyTab, APIEndpointsTab, APIUsageTab
│   │   ├── auth/             # LoginPage, ForgotPassword, ResetPassword, SessionExpired
│   │   ├── dashboard/        # DashboardPage
│   │   ├── data-import/      # DataImportPage (3-step wizard)
│   │   ├── data-management/  # DataManagementPage
│   │   ├── data-quality/     # DataQualityPage (resolution drawer)
│   │   ├── market/           # MarketsPage, SingleStockPage
│   │   ├── news/             # NewsPage
│   │   ├── portfolio/        # PortfolioPage (Holdings & P&L tracking)
│   │   └── watchlist/        # WatchlistPage
│   ├── routes/               # AppRoutes, ProtectedRoute, RoleGuard
│   ├── types/                # Strict TypeScript interfaces
│   ├── App.tsx               # App root provider wrapper
│   ├── index.css             # Tailwind base styles & custom scrollbars
│   ├── main.tsx              # React DOM entry point
│   └── vite-env.d.ts         # Vite client type declarations
├── index.html                # HTML entry template with typography links
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Design tokens & color palette
├── tsconfig.json             # TypeScript project configuration
└── vite.config.ts            # Vite configuration with path aliases
```

---

## 🧪 Verification & Quality Assurance

- **Zero TypeScript Errors**: Verified with `npx tsc --noEmit`.
- **Production Compilation**: Verified with `npm run build` (all chunks optimized, gzip-ready).
- **Backend-Agnostic**: Operates 100% locally without external server dependencies.
