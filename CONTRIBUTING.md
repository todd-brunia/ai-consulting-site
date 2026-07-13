# Contributing to the AI Consulting Site

This guide is primarily for Todd. It describes how to run the human-approved,
AI-assisted change process from an idea through production.

This repository is public for demonstration purposes and is not currently
seeking outside contributions. Please do not open unsolicited pull requests.
The MIT License permits reuse, but it does not imply that proposed changes will
be reviewed or accepted. Questions about the consulting practice may use the
contact path on the live site. Suspected vulnerabilities must be reported
privately according to [`SECURITY.md`](SECURITY.md), never in a public issue.

## One-Time Repository Setup

1. Install GitHub CLI on every machine where Codex will operate and run
   `gh auth login`. Authorize an account that can read issues, post comments,
   manage labels, push feature branches, and open pull requests for this
   repository. Never commit the resulting credential.
2. Create the workflow labels listed in
   [`docs/github-change-workflow.md`](docs/github-change-workflow.md).
3. Confirm that GitHub Actions are enabled for the repository.
4. Open and merge the pipeline setup pull request so the `validate` check runs
   at least once.
5. Protect `main`: require pull requests, require the `validate` check, require
   branches to be current, block direct and force pushes, and disallow automated
   bypasses.
6. In Vercel, confirm that this repository is connected, `main` is the
   production branch, and pull requests receive preview deployments.

Account settings can change over time. Use GitHub and Vercel's current UI labels
when they differ slightly from the language above.

### Public Repository Controls

The repository must not operate publicly without protection on `main`. Follow
the [`public repository checklist`](docs/public-repository-checklist.md) for the
pre-publication audit, visibility-change sequence, repository metadata,
private vulnerability reporting, and signed-out verification. Recheck these
controls after any repository ownership, plan, Actions, or Vercel change.

## 1. Create the Issue

Every change to a tracked repository file begins with an issue. Documentation,
dependencies, tests, CI, deployment, maintenance, and workflow changes do not
bypass intake because they appear small or are not visitor-facing.

In GitHub, select **New issue** and choose the form that matches the outcome:

| Form | Use it for |
| --- | --- |
| **Website change** | Visitor-facing content, design, navigation, accessibility, SEO, performance experience, or site behavior. |
| **Engineering change** | Application internals, architecture, refactoring, tests, dependencies, security, performance engineering, or technical debt. |
| **DevOps or workflow change** | GitHub Actions, Vercel, CI/CD, repository policy, issue and PR workflow, Codex guidance, or automation. |

For a bug, choose Website when the failure is experienced by a visitor and
Engineering when it is primarily an internal code, build, or test failure. Use
DevOps or workflow when the failure is in delivery or repository operations.

Describe the problem or opportunity and desired outcome. Add useful acceptance
criteria without prescribing implementation details unnecessarily. If more than
one form seems applicable, choose the form that matches the primary outcome and
note secondary concerns in supporting context.

Every form applies `needs-planning` and a category label. Add optional
classification labels such as `design`, `content`, `bug`, `accessibility`, or
`maintenance` when useful.

## 2. Ask Codex for a Plan

Give Codex the issue number and use the planning prompt in the
[workflow reference](docs/github-change-workflow.md#planning-prompt). Codex may
inspect the repository but must not edit it during planning. Codex reads the
issue with GitHub CLI and posts the finished proposal as a new issue comment by
running `scripts/post-issue-plan <issue-number>`.

The issue comment—not the Codex prompt or conversation—is the plan of record.
If Codex cannot post the comment, resolve its GitHub access before continuing.
Do not manually treat chat output as an approved plan.

Review the proposal for visitor outcome, scope, acceptance criteria, tests,
accessibility, risks, and factual accuracy. When it is ready, replace
`needs-planning` with `plan-ready`.

- If revisions are needed, apply `changes-requested` and comment with specific
  feedback. Codex posts a complete revised plan as a new comment; do not edit or
  delete the earlier plan. Return to `plan-ready` after the revision is posted.
- If the proposal is approved, remove other planning-state labels and apply
  `approved-for-build`. Applying this label is the explicit human authorization
  of the latest plan comment. Add a short approval comment if there could be any
  ambiguity about which revision was approved.

## 3. Ask Codex to Implement

Use the implementation prompt in the workflow reference. Codex should create a
branch, apply only the approved plan, run every validation command, and open a
linked pull request. Change the issue state to `in-progress` while it works.

Before editing, Codex must read the latest plan comment and confirm that the
issue currently has `approved-for-build`. Conversation history is not a
substitute for either check.

Do not accept unrelated cleanup in the same PR. Material scope changes return to
the issue for a revised plan and human approval.

## 4. Review the Pull Request and Preview

Wait for GitHub Actions and the Vercel preview. The PR should contain the issue
link, validation results, accessibility notes, screenshots for visual changes,
preview URL, and limitations.

Ask Codex to use the review prompt, but treat that review as additional input,
not approval. Personally inspect:

- The changed code and copy
- Desktop and narrow mobile layouts
- Keyboard navigation, visible focus, semantics, and contrast
- All factual and marketing claims
- The calls to action and relevant links
- The complete human visual checklist in the workflow reference

Apply `preview-ready` only when CI passes and the preview is ready for human
review. Request corrections through PR comments; Codex can update the same
branch and rerun validation.

## 5. Merge and Verify Production

When the approved scope, checks, and visual review are satisfactory, merge the
PR yourself. Do not delegate approval or merge authority to AI.

After Vercel deploys `main`, open the production site and verify the changed
behavior. Close the issue if the PR did not close it automatically, remove stale
workflow labels, and create a follow-up issue for deferred work.

## Blocked and Exceptional Work

Apply `blocked` when progress requires a missing decision, permission, account
setting, or external service. Add a comment naming the owner and exact unblock
condition.

Urgent maintenance still uses a branch, PR, and required checks. If a repository
administrator must use an emergency bypass, document the reason and follow-up
work in an issue; never give an automated agent bypass authority.

## First Trial

Create a “Improve the site header” website-change issue after this pipeline is
merged. Let the planning proposal define the visitor outcome, navigation, CTA,
responsive behavior, accessibility requirements, and acceptance criteria. Do
not begin header code changes until you apply `approved-for-build`.

Record confusing or repetitive manual steps in the issue, then use them to
refine [`docs/automation-roadmap.md`](docs/automation-roadmap.md).
