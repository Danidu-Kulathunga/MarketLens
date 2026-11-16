# MarketLens — Development Guidelines & Codebase Governance

This document establishes the coding conventions, quality standards, and governance procedures for the MarketLens project.

---

## 1. Codebase Organization & Shared Resources

MarketLens is structured to provide clear module boundaries while maintaining a cohesive user experience:

```text
Marketlens/
├── .github/                 # Workflows, Issue templates, PR template
├── ai/                      # Member 5: AI & Prediction Service
├── backend/                 # Backend microservices
│   ├── market-data-service/ # Member 1: Market Exploration & Stock Analysis
│   ├── news-service/        # Member 3: Financial News & Market Intelligence
│   └── user-auth-service/   # Enterprise User & Auth Service (Java/Spring Boot)
├── data-pipeline/           # Member 4: Data Management & Ingestion Pipeline
├── docs/                    # Architecture, API contracts, deployment guides
├── frontend/                # React 18 TypeScript Frontend Application
│   ├── src/                 # Features mapped by member, components, state
│   │   ├── features/        # Feature directories owned by specific members
│   │   ├── components/      # Shared layout and atomic UI components
│   │   └── context/         # Shared state & auth contexts
│   ├── public/              # Static assets & brand icons
│   ├── Dockerfile           # Multi-stage production Nginx container
│   └── package.json         # Frontend dependencies
├── infrastructure/          # Docker, Nginx API Gateway, DB init scripts
├── docker-compose.yml       # Multi-service development environment
└── CONTRIBUTING.md          # Team contribution guidelines
```

---

## 2. Shared Code Ownership & Governance

Certain files are foundational and shared across all members. To prevent accidental regressions, modifications to these files require approval from the **Repository Maintainer**:

| Shared Resource | Path | Change Protocol |
| :--- | :--- | :--- |
| **API Gateway Routing** | `infrastructure/nginx/nginx.conf` | Notify all members; PR must include maintainer review |
| **Docker Compose** | `docker-compose.yml`, `docker-compose.prod.yml` | Requires verification that all 8 containers boot without error |
| **Shared Layouts** | `frontend/src/components/layout/` (`Sidebar.tsx`, `TopHeader.tsx`) | Must preserve existing navigation links and role badges |
| **Global Contexts** | `frontend/src/context/` (`AuthContext.tsx`, `MarketDataContext.tsx`)| Must preserve backward-compatible mock fallbacks |
| **Database Schema** | `infrastructure/scripts/init-db.sql` | Schema migrations must be additive and backward-compatible |
| **CI/CD Workflows** | `.github/workflows/` | Verify syntax with action linter before merging |

---

## 3. Frontend Standards (React 18 + TypeScript)

1. **Strict Type Safety**: Avoid `any`. Define explicit TypeScript interfaces for all component props, state objects, and API responses in `frontend/src/types/` or adjacent feature directories.
2. **Design Token Consistency**: Use Tailwind utility classes matching the approved palette (`navy-900`, `navy-800`, `emerald-500`, `rose-500`, `slate-400`).
3. **Recharts Formatting**: Ensure financial chart tooltips are formatted to 2 decimal places with currency symbols (`$`, `LKR`).
4. **Resilient Data States**: Always provide visual states for:
   - Loading skeletons.
   - Empty data / zero records.
   - Error states with actionable retry buttons.

---

## 4. Backend Standards (Python & Java)

1. **Python Microservices (FastAPI)**:
   - Use Pydantic v2 schemas for all request payloads and response models.
   - Type annotate all function arguments and returns.
   - Keep business logic decoupled from HTTP routing.
   - Handle external API exceptions gracefully with standard error JSON envelopes.
2. **Java User & Auth Service (Spring Boot)**:
   - Adhere to standard Spring layered architecture (Controller -> Service -> Repository).
   - Use Spring Security for endpoint authorization.
   - Expose health check and Actuator metrics for monitoring.

---

## 5. Testing Requirements

- **Frontend**: `npm run build` must succeed with zero TypeScript or bundling errors.
- **Python Services**: Every microservice must include a `tests/` directory with `pytest` covering health endpoints and core business logic.
- **Docker**: The full multi-container stack must pass `docker compose config` and boot successfully using `docker compose up -d`.
