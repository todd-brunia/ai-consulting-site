# Contributing to the AI Consulting Site

This guide is primarily for Todd. It describes how to run the human-approved,
AI-assisted change process from an idea through production.

## One-Time Repository Setup

1. In GitHub, create the workflow labels listed in
   [`docs/github-change-workflow.md`](docs/github-change-workflow.md).
2. Confirm that GitHub Actions are enabled for the repository.
3. Open and merge the pipeline setup pull request so the `validate` check runs
   at least once.
4. Protect `main`: require pull requests, require the `validate` check, require
   branches to be current, block direct and force pushes, and disallow automated
   bypasses.
5. In Vercel, confirm that this repository is connected, `main` is the
   production branch, and pull requests receive preview deployments.

Account settings can change over time. Use GitHub and Vercel's current UI labels
when they differ slightly from the language above.

## 1. Create the Issue

In GitHub, select **New issue → Website change**. Describe the problem or
opportunity and the desired visitor or business outcome. Add useful acceptance
criteria without prescribing implementation details unnecessarily.

The form applies `needs-planning`. Add an optional classification label such as
`design`, `content`, or `bug`.

## 2. Ask Codex for a Plan

Give Codex the issue and use the planning prompt in the
[workflow reference](docs/github-change-workflow.md#planning-prompt). Codex may
inspect the repository but must not edit it during planning.

Review the proposal for visitor outcome, scope, acceptance criteria, tests,
accessibility, risks, and factual accuracy. When it is ready, replace
`needs-planning` with `plan-ready`.

- If revisions are needed, apply `changes-requested` and comment with specific
  feedback. Return to `plan-ready` after Codex updates the proposal.
- If the proposal is approved, remove other planning-state labels and apply
  `approved-for-build`. Applying this label is the explicit human authorization
  to change code.

## 3. Ask Codex to Implement

Use the implementation prompt in the workflow reference. Codex should create a
branch, apply only the approved plan, run every validation command, and open a
linked pull request. Change the issue state to `in-progress` while it works.

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
