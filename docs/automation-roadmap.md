# AI Change Pipeline Automation Roadmap

## Purpose

This roadmap records the intended future state and the next useful automation
steps for humans and future AI sessions. Human planning approval, visual review,
and merge authority are permanent controls in every phase.

## Current State

Phase 1 is implemented in repository guidance, issue and pull request templates,
and pull-request CI. Todd manually invokes Codex and controls approval labels.
Codex uses authenticated GitHub CLI access to save plans directly as versioned
issue comments, then Todd reviews the Vercel preview and merges approved work.
The repository is prepared for public demonstration under the MIT License; the
human owner retains responsibility for the visibility change, branch
protection, private vulnerability reporting, and post-publication verification
documented in the
[`public repository checklist`](public-repository-checklist.md).

## Phase 1 — Human-Operated Foundation

**Goal:** Make small AI-assisted changes repeatable and auditable without an
orchestration service.

**Capabilities:** Structured intake, plans of record stored on issues, explicit
planning and build gates, repository guidance, deterministic PR checks, Vercel
previews, and a human operating guide.

**Completion evidence:** Process the “Improve the site header” trial from issue
through production. Record confusing or repetitive manual steps in that issue.

**Recommended next issue:** “Evaluate label-triggered Codex integration for the
website change workflow.” Link the header trial and list the manual friction it
revealed.

## Phase 2 — Label-Triggered AI Workflow

**Goal:** Automate coordination while preserving both human gates.

**Proposed capabilities:** React to `needs-planning` and `approved-for-build`,
post a plan, create an implementation branch and draft PR, advance state labels,
and report `blocked` with a useful reason.

**Before building:** Evaluate supported GitHub/Codex integration options and
document authentication, cost, and maintenance. Design least-privilege tokens,
secret rotation, allowed actors, idempotency keys, duplicate-run prevention,
concurrency, timeouts, retries, audit comments, and fork behavior. Never expose
deployment credentials to implementation jobs.

**Completion criteria:** Replaying an event does not duplicate comments or PRs;
unapproved issues cannot start implementation; failures produce an actionable
GitHub-visible state; and only a human can apply build approval or merge.

## Phase 3 — Automated Quality and Improvement Intake

**Goal:** Increase review confidence and let AI propose evidence-based work.

**Proposed capabilities:** Add browser smoke tests, accessibility checks, broken
link validation, performance budgets, and reproducible screenshots. Ingest only
approved analytics, Search Console, Lighthouse, link, or freshness signals and
turn findings into proposed issues.

**Before building:** Define data access, retention, cost limits, false-positive
handling, alert ownership, baseline updates, rollback expectations, and which
signals may create issues. Keep issue creation separate from plan approval.

**Completion criteria:** Quality checks are stable enough to be required status
checks; generated issues cite their evidence; noisy checks can be disabled
safely; and AI still cannot approve, merge, or deploy its own changes.

## Breadcrumbs for Future Sessions

Start by reading `AGENTS.md`, `CONTRIBUTING.md`, this roadmap, and the latest
completed trial issue. Inspect `.github/workflows/pull-request-checks.yml` before
adding automation. Prefer GitHub-native events and state over a new database.
Do not add custom orchestration until multiple repositories, customers, agents,
or external systems create a demonstrated coordination need.

When advancing a phase, update this document with the selected integration,
links to implementation issues, decisions made, capabilities completed, and the
single recommended next issue.
