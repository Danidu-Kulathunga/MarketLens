---
name: Infrastructure Task
about: Docker, CI/CD, database migration, or deployment pipeline task
title: '[INFRA] <Description of infrastructure task>'
labels: ['infrastructure']
assignees: ''
---

### Scope of Infrastructure Change
- **Target Component**: <!-- Docker, Docker Compose, Nginx, PostgreSQL, TimescaleDB, GitHub Actions, Prometheus/Grafana, Kubernetes -->
- **Assigned Owner**: <!-- Maintainer / DevOps Lead, or designated member -->
- **Environment Impact**: <!-- Development, Testing/CI, Staging, Production -->

### Objectives
Describe what this infrastructure update establishes or improves.

### Tasks & Checklist
- [ ] Task 1
- [ ] Task 2
- [ ] Verify local execution (`docker compose up --build`)
- [ ] Verify CI workflow execution
- [ ] Update documentation in `docs/deployment/` or `README.md`

### Security & Secret Impact
- [ ] No plaintext passwords or API keys committed.
- [ ] Environment variables updated in `.env.example`.
- [ ] Container security verified (non-root user, minimal ports).
