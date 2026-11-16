# MarketLens — Team Contributing & Collaboration Guide

Welcome to the **MarketLens** contributor guidelines. MarketLens is developed by a five-member engineering team where each developer vertically owns dedicated frontend and backend functional modules.

To ensure stability, avoid merge conflicts, and maintain high engineering standards, all team members must follow this guide.

---

## 1. Core Engineering Principles

1. **Vertical Feature Ownership**: Each member owns their module's frontend components, backend services, API endpoints, data models, tests, and documentation.
2. **Never Commit Directly to `main` or `develop`**: All code must enter via Pull Requests from designated feature branches.
3. **No Breaking Changes to Shared Interfaces**: Changes to shared frontend components (`src/components/`, `src/context/`), database schemas, or cross-service API contracts must be communicated and approved in advance.
4. **Reproducible Local Testing**: Every PR must be verified locally using Docker (`docker compose up`) and `npm run build` prior to submission.
5. **Zero Secrets in Git**: Never commit `.env` files, API keys (Twelve Data, CSE, NewsAPI), or credentials.

---

## 2. Git Branching Strategy

Our team uses a structured Git Flow adapted for five concurrent developers:

```text
main (Protected — Production Releases Only)
  │
  └── develop (Protected — Team Integration Branch)
        │
        ├── feature/member1-stock-analysis
        ├── feature/member2-portfolio
        ├── feature/member3-news
        ├── feature/member4-data-pipeline
        └── feature/member5-ai-prediction
```

### Branch Naming Conventions
- **Feature Branches**: `feature/member<X>-<short-description>`
  - Example: `feature/member1-sma-indicator-chart`
  - Example: `feature/member4-csv-upload-parser`
  - Example: `feature/member5-trend-prediction-model`
- **Bug Fix Branches**: `fix/member<X>-<issue-description>`
  - Example: `fix/member2-portfolio-cost-basis`
- **Hotfix Branches**: `hotfix/<critical-issue-description>` (cut directly from `main`)
- **Release Branches**: `release/v<semver>` (cut from `develop` for release tagging)

---

## 3. Commit Message Conventions

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<module/scope>): <concise description in imperative mood>

[optional body explaining motivation and architectural impact]

[optional footer referencing issue, e.g. Fixes #24]
```

### Allowed Types
| Type | Description | Example |
| :--- | :--- | :--- |
| `feat` | A new feature or capability | `feat(ai): integrate directional LSTM model inference` |
| `fix` | A bug fix | `fix(portfolio): correct unrealized P&L formula on cash balance` |
| `docs` | Documentation changes only | `docs(api): document canonical market-data endpoint schema` |
| `style` | Formatting, missing semi-colons, whitespace | `style(market): align candlestick tooltip design tokens` |
| `refactor`| Code change that neither fixes a bug nor adds a feature | `refactor(pipeline): optimize CSV chunk streaming in upload wizard` |
| `test` | Adding missing tests or correcting existing tests | `test(news): add unit tests for sentiment classification threshold` |
| `chore` | Maintenance, dependencies, docker, CI configuration | `chore(docker): update python base image and pinned dependencies` |

---

## 4. Step-by-Step Development & PR Workflow

### Step 1: Claim or Create a GitHub Issue
1. Check the GitHub Project Kanban board.
2. Pick a card in **Ready** or create an Issue using the appropriate Issue Template:
   - Feature Request (`feature_request.md`)
   - Bug Report (`bug_report.md`)
   - API Development (`api_development.md`)
   - Infrastructure Task (`infrastructure_task.md`)
   - Integration Task (`integration_task.md`)
3. Assign the issue to yourself and move it to **In Progress**.

### Step 2: Create a Feature Branch
```bash
# 1. Ensure your local develop branch is clean and up to date
git checkout develop
git pull origin develop

# 2. Branch off develop using your assigned member tag
git checkout -b feature/memberX-my-feature-name
```

### Step 3: Implement & Test Locally
Develop your code adhering to your module's boundaries. Test your work in Docker:
```bash
# Start your service and dependencies
docker compose up -d

# Verify frontend build
npm run build

# Run unit tests for your service
pytest backend/market-data-service/tests
```

### Step 4: Keep Your Branch Synchronized
Before opening your PR, rebase or merge the latest `develop` to catch conflicts early:
```bash
git fetch origin
git merge origin/develop
```

### Step 5: Open a Pull Request
1. Push your branch to GitHub:
   ```bash
   git push -u origin feature/memberX-my-feature-name
   ```
2. Navigate to the GitHub repository and open a Pull Request targeting the **`develop`** branch (never `main`).
3. Fill out all sections of `.github/pull_request_template.md`.
4. Link the corresponding GitHub Issue (e.g., `Fixes #12`).

### Step 6: Code Review & CI Automation
- Automated GitHub Actions (`ci-frontend`, `ci-backend`, `ci-docker`) will run.
- At least **one peer review approval** is required before merging.
- If changes to shared components or contracts are included, the repository maintainer must review.
- Once approved and green, merge using **Squash and Merge** or **Rebase and Merge** to maintain a clean git history.
