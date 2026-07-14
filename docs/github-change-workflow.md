# GitHub Change Workflow Reference

This is the compact reference for the repository's AI-assisted change process.
See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for the step-by-step operating guide.

## Workflow Labels

Create these labels in GitHub before running the first trial:

| Label | Meaning |
| --- | --- |
| `needs-planning` | The request needs an AI implementation proposal. |
| `plan-ready` | The proposal is ready for human review. |
| `changes-requested` | Human feedback must be incorporated before approval. |
| `approved-for-build` | A human has authorized the documented plan. |
| `in-progress` | Implementation is underway. |
| `preview-ready` | CI and the preview are ready for human review. |
| `blocked` | Progress requires a decision, permission, or external change. |

Issue-category labels are `website`, `engineering`, `devops`, and `workflow`.
Additional classification labels are `content`, `design`, `feature`, `bug`,
`accessibility`, `seo`, and `maintenance`.

Every tracked-file change requires an originating issue. Use Website change for
visitor outcomes, Engineering change for application internals, and DevOps or
workflow change for delivery, repository policy, and AI process. Documentation,
dependencies, maintenance, and urgent work follow the same planning and approval
gates; they are not exceptions.

Normal lifecycle:

```text
needs-planning → plan-ready → approved-for-build → in-progress → preview-ready → done
```

Remove superseded state labels as work advances. A closed issue is “done”; a
separate `done` label is not required.

## Planning Prompt

```text
Analyze this issue but do not modify the repository yet.

Create a concise implementation proposal containing:
1. Your understanding of the problem
2. The intended visitor or business outcome
3. Recommended design and content changes
4. Components and files likely to change
5. Acceptance criteria
6. Testing and validation plan
7. Accessibility considerations
8. Risks, assumptions, or decisions that require human input
9. Journal impact: entry in this change, follow-up after evidence/merge, or no
   entry, with one sentence explaining why

Use scripts/post-issue-plan with this issue number to post the complete proposal
as a GitHub issue comment. Replace needs-planning or changes-requested with
plan-ready after the comment is posted. If GitHub access or posting fails, stop
and report the blocker. Do not leave the plan only in the Codex conversation.
Wait for explicit approval before changing code.
```

The newest comment containing the `codex-implementation-plan` marker starts the
plan of record. Later owner feedback and focused Codex amendments remain part of
that record; revisions do not need to repeat the entire plan. A human may ask
for a consolidated replacement when that would make approval clearer. Applying
`approved-for-build` freezes the marked plan and subsequent planning discussion
as the approved scope. Codex must verify the label and reread that frozen record
before implementation.

## Label-triggered automation

When repository automation is enabled, trusted human label changes start three
stages:

| Label | Automated result |
| --- | --- |
| `needs-planning` | Codex posts one concise marked plan and applies `plan-ready`. |
| `changes-requested` | Codex answers only the new feedback and returns the issue to `plan-ready`. |
| `approved-for-build` | Codex prepares a validated patch; a separate job opens one draft PR and applies `in-progress`. |

The OpenAI job has no GitHub write credential. The publishing job has no OpenAI
key and uses a short-lived, repository-scoped GitHub App token so its draft PR
triggers normal checks. Only allowlisted humans with current write-level
repository permission can trigger work, and issue text is always treated as
untrusted input. Replayed events use planning fingerprints to no-op safely.
Failures apply `blocked` and link the workflow run; resolve the cause, remove
`blocked`, and reapply the stage label.

Automation does not apply `approved-for-build` or `preview-ready`, merge, push
to `main`, publish a release, or deploy. Those remain human decisions.

Journal content is visitor-facing scope. Include it in the originating pull
request only when the approved plan explicitly authorizes the entry. Otherwise,
open a separate website-content issue and use the same planning and approval
gates. A journal assessment does not require an entry for every change.

## Implementation Prompt

```text
The implementation plan for this issue is approved and the issue has the
approved-for-build label. Implement only the approved scope.

Create a branch, follow all repository instructions, reuse existing components,
run every required validation command, and open a pull request linked to the
issue. Include screenshots or clear visual verification instructions,
accessibility considerations, and known limitations. Do not merge the pull
request.
```

## Review Prompt

```text
Review this pull request against the originating issue, approved plan,
repository instructions, product brief, and design principles.

Focus on correctness, scope compliance, mobile layout, accessibility, visual
regressions, content accuracy, unsupported claims, tone, excessive complexity,
unnecessary dependencies, missing tests, and missing screenshots. Do not
approve or merge your own implementation. Report findings with severity and
recommended corrections.
```

## Human Visual Review

- Does the site look more credible?
- Is the target audience clear?
- Is the page easier to scan?
- Does the copy sound like Todd?
- Are all claims accurate and supportable?
- Is the primary call to action obvious?
- Does it work on a narrow mobile screen?
- Does it avoid generic AI imagery and jargon?
- Are spacing, typography, and alignment consistent?
- Does the change solve the originating issue?

## Protected Branch Settings

In GitHub, protect `main` with these settings:

- Require a pull request before merging.
- Require the `validate` status check and require branches to be current.
- Block direct pushes and force pushes.
- Do not allow bypasses for automated agents.
- Keep merge approval and branch deletion under human control.

These settings are mandatory for public operation. If protection becomes
unavailable or is removed, pause implementation and restore it before accepting
another change. The one-time release sequence and ongoing verification are in
the [`public repository checklist`](public-repository-checklist.md).

## Vercel Settings to Verify

- The GitHub repository is connected to the intended Vercel project.
- `main` is the production branch.
- Pull requests receive preview deployments and report their status to GitHub.
- The preview URL is copied into the pull request.
- Production deploys only after a human merges to `main`.

These are manual account settings and cannot be established by committed files.
