# MarketLens — Complete Git Command Guide for All Five Members

This guide provides concrete, step-by-step Git commands for developers working across feature branches on the MarketLens shared repository.

---

## 1. Initial Setup & Cloning

```bash
# Clone the repository
git clone https://github.com/your-org/marketlens.git
cd marketlens

# Configure your Git identity
git config user.name "Your Name"
git config user.email "your.email@marketlens.io"

# Verify remotes
git remote -v

# Ensure you have develop branch locally
git checkout develop
git pull origin develop
```

---

## 2. Daily Development Workflow

### Step 1: Synchronize `develop` Before Starting Work
Always start with fresh code from the integration branch:
```bash
git checkout develop
git pull origin develop
```

### Step 2: Create Your Assigned Feature Branch
Use your specific member prefix and descriptive task name:

```bash
# For Member 1 (Market Exploration)
git checkout -b feature/member1-sma-indicator-chart

# For Member 2 (Portfolio Management)
git checkout -b feature/member2-holdings-csv-export

# For Member 3 (Financial News)
git checkout -b feature/member3-sentiment-filter

# For Member 4 (Data Pipeline)
git checkout -b feature/member4-twelve-data-rate-limiter

# For Member 5 (AI Prediction)
git checkout -b feature/member5-volatility-gauge-component
```

### Step 3: Stage and Commit Changes
Follow Conventional Commit formatting:
```bash
# Check modified files
git status

# Stage specific files (avoid 'git add .' if unstaged sensitive files exist)
git add frontend/src/features/market/SingleStockPage.tsx backend/market-data-service/app/main.py

# Commit with structured message
git commit -m "feat(market): add 50-day and 200-day SMA calculations to stock view"
```

### Step 4: Keep Your Feature Branch in Sync
While you work, other team members may merge features into `develop`. Pull their updates into your branch:
```bash
git fetch origin
git merge origin/develop
```
*Alternatively, if your team prefers rebase:*
```bash
git fetch origin
git rebase origin/develop
```

### Step 5: Push Your Branch to GitHub
```bash
git push -u origin feature/member1-sma-indicator-chart
```

---

## 3. Resolving Merge Conflicts

When two members edit overlapping files (e.g., shared route definitions or `docker-compose.yml`), Git will report a conflict during merge/rebase.

### How to Resolve Conflicts Step-by-Step:
1. **Identify conflicted files**:
   ```bash
   git status
   # Look for files marked as "both modified"
   ```
2. **Open the conflicted file in VS Code or your editor**:
   Search for Git conflict markers:
   ```text
   <<<<<<< HEAD (Your changes)
   const API_BASE_URL = 'http://localhost:8001';
   =======
   const API_BASE_URL = 'http://localhost:8002';
   >>>>>>> develop (Incoming changes)
   ```
3. **Resolve the conflict**:
   Coordinate with the other member, select the correct code, and delete the markers (`<<<<<<<`, `=======`, `>>>>>>>`).
4. **Stage the resolved file**:
   ```bash
   git add <resolved-file-path>
   ```
5. **Complete the merge/rebase**:
   ```bash
   # If you were merging:
   git commit -m "chore: resolve merge conflicts with develop"

   # If you were rebasing:
   git rebase --continue
   ```
6. **Push updated branch**:
   ```bash
   git push origin <your-feature-branch>
   ```

---

## 4. Submitting and Updating Pull Requests

1. Open your browser and visit the repository on GitHub.
2. Click **Compare & pull request**.
3. **Base branch**: Select `develop` (DO NOT target `main`).
4. **Compare branch**: Select your feature branch.
5. Fill out the **Pull Request Template**:
   - Link related issue (`Fixes #14`).
   - Fill in testing performed.
   - Tag the appropriate peer reviewer.
6. If reviewers request changes:
   ```bash
   # Make changes locally
   git add <modified-files>
   git commit -m "fix(market): address review feedback on indicator tooltip"
   git push origin feature/member1-sma-indicator-chart
   ```
   The PR will automatically update!

---

## 5. Release Workflow (Repository Maintainer / Lead)

When a milestone is reached and all 5 modules are integrated and tested on `develop`:
```bash
# 1. Ensure develop is up to date
git checkout develop
git pull origin develop

# 2. Create release branch
git checkout -b release/v1.1.0

# 3. Perform release tests, version bump, and documentation updates
npm version minor --no-git-tag-version
git commit -am "chore(release): bump version to v1.1.0"
git push -u origin release/v1.1.0

# 4. Open PR from release/v1.1.0 -> main
# 5. Once merged into main, tag the release:
git checkout main
git pull origin main
git tag -a v1.1.0 -m "Release v1.1.0: Full 5-Module Integrated Platform"
git push origin v1.1.0

# 6. Back-merge release changes back into develop
git checkout develop
git merge main
git push origin develop
```
