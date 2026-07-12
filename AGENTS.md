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
5. Confirm that the originating issue has an approved plan and the
   `approved-for-build` label.
6. Prefer the smallest change that satisfies the approved acceptance criteria.

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
