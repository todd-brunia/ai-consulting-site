# Repository Instructions

## Purpose

This site presents Todd Brunia's AI consulting practice to small and
mid-sized organizations that want practical help adopting assisted and
agentic AI workflows. Build trust, explain the offer plainly, and guide a
qualified visitor toward discussing a real workflow.

## Technical Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest and React Testing Library
- GitHub Actions
- Vercel

## Before Changing Code

1. Read `docs/product-brief.md`.
2. Read `docs/design-principles.md`.
3. Read `docs/content-style-guide.md` for visitor-facing copy.
4. Inspect existing components before creating new ones.
5. Confirm that every tracked-file change has an originating issue. This
   includes documentation, dependencies, tests, CI, deployment configuration,
   repository policy, and workflow changes; there is no small-change bypass.
6. Confirm that the originating issue has an approved plan and the
   `approved-for-build` label.
7. Prefer the smallest change that satisfies the approved acceptance criteria.

Manual implementation begins after `approved-for-build`: use a non-reserved
branch, open a pull request linked to the issue, and advance the issue to
`in-progress`. AI implementation requires a second, explicit
`approved-for-ai-build` label after general approval. Reserve
`codex/issue-<number>` branches for automation.

## Planning Issues

When asked to plan a GitHub issue, do not modify repository files. Read the
issue with GitHub CLI, prepare a concise proposal focused on issue-specific
scope, decisions, acceptance criteria, validation, and material risks, and post
it directly to the issue with:

```text
scripts/post-issue-plan <issue-number>
```

Pass the Markdown proposal on standard input. Then replace `needs-planning` with
`plan-ready`. A plan that exists only in a Codex conversation is not approved
work. If GitHub authentication or posting fails, stop and report the blocker
instead of beginning implementation.

When `changes-requested` is present, respond only to the new feedback in an
issue comment. Do not repeat the complete plan unless the human explicitly asks
for a consolidated replacement. The marked base plan and subsequent planning
discussion form the review record; applying `approved-for-build` freezes that
conversation as the approved scope. After addressing feedback, replace
`changes-requested` with `plan-ready`.

## Engineering Principles

- Keep the architecture simple.
- Explain significant design decisions.
- Favor readability over cleverness.
- Use TypeScript.
- Prefer server components.
- Keep components under 200 lines.
- Never introduce dependencies without explaining why.
- Write code that another senior engineer would enjoy maintaining.
- Reuse existing components and styles when practical.
- Do not expand the approved scope without returning to the issue for approval.

## Product Direction

This site is for a small AI workflow consulting practice that helps SMBs move
from assistive AI usage to practical AI-enabled workflows through low-risk
experimentation.

The site should build trust with business leaders and technology managers who
are interested in AI but unsure where to start. It should feel practical,
credible, and grounded.

## Messaging Constraints

- Do not use inflated AI hype.
- Do not imply certainty where the field is still evolving.
- Do not position the consultant as an all-knowing AI expert.
- Emphasize practical engineering experience, sound judgment, and low-risk
  experimentation.
- Prefer fixed-scope, outcome-based engagement language over hourly consulting
  language.
- Prefer concrete workflow examples over abstract transformation claims.
- Explain business value before implementation details.
- Do not mention the consultant's current employer.
- Do not mention any client, prospect, or business area that could create a
  conflict of interest.

## Content Priorities

- Explain agentic AI in plain business language.
- Show simple proofs of concept and practical demos.
- Help SMBs understand their next safe step.
- Generate qualified leads without overpromising.
- Use LinkedIn as a credibility signal when appropriate:
  https://linkedin.com/in/tbrunia

## Required Validation

Run:

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

For visual changes, review both desktop and narrow mobile layouts and provide
before-and-after screenshots or clear visual verification instructions.

## Pull Request Requirements

Include:

- A summary of the visitor-facing change
- A link to the originating issue
- Screenshots for visual changes
- Tests performed
- Accessibility considerations
- The Vercel preview URL
- Known limitations

Never push directly to or merge into `main`. AI may plan, implement, and review,
but only a human may approve the plan, approve the visual result, and merge.
