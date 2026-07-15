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

Every plan should assess journal impact as one of: `entry in this change`,
`follow-up after evidence or merge`, or `no entry`, with a one-sentence reason.
An entry is worth considering when a change materially affects the consulting
offer, demonstrates an AI-assisted workflow or human-control pattern, records a
useful decision or lesson, or establishes a meaningful public milestone. Routine
maintenance and changes already explained adequately by technical release notes
normally do not need an entry.

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
accessibility, risks, and factual accuracy. Plans should prioritize important
issue-specific decisions and omit generic detail. When the plan is ready,
replace `needs-planning` with `plan-ready`.

- If revisions are needed, apply `changes-requested` and comment with specific
  feedback. Codex responds only to that feedback so the issue can serve as a
  planning conversation. Do not edit or delete earlier comments. Ask for a
  consolidated replacement only when useful, then return to `plan-ready`.
- If the proposal is approved, remove other planning-state labels and apply
  `approved-for-build`. Applying this label is the explicit human authorization
  of the latest plan comment. Add a short approval comment if there could be any
  ambiguity about which revision was approved.

## 3. Ask Codex to Implement

Use the implementation prompt in the workflow reference. Codex should create a
branch, apply only the approved plan, run every validation command, and open a
linked pull request. Change the issue state to `in-progress` while it works.

Before editing, Codex must confirm `approved-for-build` and read the marked base
plan plus all subsequent planning discussion that existed when it was applied.
Later comments do not silently expand the approved scope.

### Enable label-triggered automation

The committed workflow is inert until a repository owner completes this setup:

1. Create a dedicated OpenAI API project and key with appropriate spend limits
   and alerts. Add the key as the Actions secret `OPENAI_API_KEY`.
2. Create a dedicated GitHub App installed only on this repository. Grant it
   repository Contents, Issues, and Pull requests read/write access, but no
   administration or Actions-management permission. Store its ID as
   `CODEX_AUTOMATION_APP_ID` and private key as the Actions secret
   `CODEX_AUTOMATION_APP_PRIVATE_KEY`. Its short-lived token pushes the branch
   and opens the PR so normal PR checks and Vercel integration can run.
3. Set `CODEX_ALLOWED_ACTORS` to a comma-separated list of trusted GitHub users
   (initially `todd-brunia`) and set `CODEX_AUTOMATION_ENABLED` to `true` only
   when rollout is authorized.
4. Keep the repository's default Actions token permissions restricted. The
   Codex generation job receives read access only, while the publisher receives
   the short-lived App token but never the OpenAI key.
5. Confirm `main` protection and Vercel settings still prohibit automated merge
   or production deployment.

### Codex model policy

The automated stages use explicit, cost-conscious defaults: planning and plan
revision use `gpt-5.6-luna` with low reasoning effort, while implementation
uses `gpt-5.6-terra` with medium effort. The workflow does not offer a Sol/high
option.

If planning quality is inadequate, first retry with Terra at low or medium
effort. Use Sol/high only for an exceptional retry after reviewing the weaker
result, and require a separately reviewed workflow change rather than adding a
dispatch option. Revert that temporary change after the retry.

After rollout, record the stage, selected model, result quality, retry count,
and OpenAI project usage for three to five representative issues in issue #30.
Use project usage rather than Actions duration to assess cost. Before changing
the defaults again, compare quality and retries as well as usage, and recheck
current model availability and pricing in the official OpenAI documentation.
The repository owner must also verify in the OpenAI dashboard whether each
project budget control is an alert or a hard spending stop.

Rotate or revoke the OpenAI key or GitHub App key if exposure is suspected. Set
`CODEX_AUTOMATION_ENABLED` to `false` for the fastest non-destructive kill
switch. Workflow artifacts are retained for three days and must not contain
credentials, model traces, or real private data.

Roll out planning first. On disposable issues, verify initial planning, focused
revision, duplicate replay, unauthorized-actor rejection, implementation draft
creation, and forced-failure recovery. Record the run and PR links on the Phase
2 issue before declaring the roadmap phase complete.

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
workflow labels, and create a follow-up issue for deferred work. Revisit any
promised journal follow-up after production evidence is available. Journal copy
may ship with the originating change only when its approved plan includes that
visitor-facing scope; otherwise open a separate website-content issue.

## Publish a Technical Changelog Release

[GitHub Releases](https://github.com/todd-brunia/ai-consulting-site/releases)
record meaningful production milestones. They are the technical changelog, not
a release for every commit or pull request and not a substitute for the curated
visitor-facing journal.

While the site is evolving, use `v0.x.y` milestone tags:

- Start with `v0.1.0` at the current production `main` commit.
- Increment the patch version for a normal production milestone.
- Increment the minor version for a notable new site capability.
- Reserve `v1.0.0` or another major increment for an intentionally declared
  major release. These versions communicate site milestones, not compatibility
  guarantees for a public API.

After a change is merged and its `main` deployment is verified:

1. Open **Actions**, select **Publish release**, and choose **Run workflow**.
2. Confirm the selected branch is `main`.
3. Enter the next `vMAJOR.MINOR.PATCH` tag and a short, descriptive title.
4. Run the workflow. It rejects malformed or existing tags and creates a
   standard GitHub Release with notes generated from merged pull requests.
5. Open the new release, verify that it targets the production commit, and
   review its links and categories. Use GitHub's **Edit release** action to
   clarify generated wording when a pull-request title lacks context; preserve
   the generated links and do not invent historical versions or dates.
6. Review the changes since the previous release for journal impact and record
   the decision in the release-related issue, pull request, or release notes.
   A release can produce no journal entry, one entry, or occasionally several;
   one entry may also summarize related changes across releases. Create a
   separate approved website-content issue when the entry was not already in an
   approved plan.

Release publication is an explicit human action. Automated agents may prepare
the workflow and release notes, but must not initiate the production release.

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
