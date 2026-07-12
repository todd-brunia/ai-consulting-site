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

Optional classification labels are `content`, `design`, `feature`, `bug`,
`accessibility`, `seo`, and `maintenance`.

Normal lifecycle:

```text
needs-planning → plan-ready → approved-for-build → in-progress → preview-ready → done
```

Remove superseded state labels as work advances. A closed issue is “done”; a
separate `done` label is not required.

## Planning Prompt

```text
Analyze this issue but do not modify the repository yet.

Create an implementation proposal containing:
1. Your understanding of the problem
2. The intended visitor or business outcome
3. Recommended design and content changes
4. Components and files likely to change
5. Acceptance criteria
6. Testing and validation plan
7. Accessibility considerations
8. Risks, assumptions, or decisions that require human input

Post the proposal to the issue and wait for explicit approval before changing
code.
```

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

In GitHub, protect `main` with these settings after the first workflow run:

- Require a pull request before merging.
- Require the `validate` status check and require branches to be current.
- Block direct pushes and force pushes.
- Do not allow bypasses for automated agents.
- Keep merge approval and branch deletion under human control.

## Vercel Settings to Verify

- The GitHub repository is connected to the intended Vercel project.
- `main` is the production branch.
- Pull requests receive preview deployments and report their status to GitHub.
- The preview URL is copied into the pull request.
- Production deploys only after a human merges to `main`.

These are manual account settings and cannot be established by committed files.
