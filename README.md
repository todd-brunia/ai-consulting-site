# AI Consulting Site

This repository contains [Todd Brunia's AI workflow consulting
site](https://ai-consulting-site-pied.vercel.app). The practice helps small and
mid-sized organizations evaluate practical AI-enabled workflows through
bounded experiments, human oversight, and clear risk decisions.

The repository is public as a demonstration of a human-gated Codex maintenance
process. It shows how AI can help plan, implement, and review changes without
giving the AI authority to approve plans, accept visual results, or merge its
own work. It is an evolving working example, not a claim that software delivery
can or should be fully autonomous.

## How changes move through the repository

Every tracked-file change follows the same auditable path:

1. A structured GitHub issue records the problem and desired outcome.
2. Codex posts a complete implementation proposal to that issue.
3. A human reviews the proposal and explicitly approves it.
4. Codex implements only the approved scope on a feature branch.
5. GitHub Actions runs linting, type checking, tests, and a production build.
6. Vercel provides a Preview for human visual and accessibility review when
   the rendered site changes.
7. A human decides whether to merge and verifies the Production deployment.

The detailed controls and workflow states are documented in
[`CONTRIBUTING.md`](CONTRIBUTING.md) and the
[`GitHub change workflow reference`](docs/github-change-workflow.md).

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Vitest and React Testing Library
- GitHub Actions
- Vercel

## Run locally

Use the Node.js version declared in [`.nvmrc`](.nvmrc), then install the locked
dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage route is in
[`src/app/page.tsx`](src/app/page.tsx), with content and sections split into
nearby modules.

## Validate a change

Run the same checks required by pull-request CI:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Project guidance

- [`docs/product-brief.md`](docs/product-brief.md) defines the audience,
  services, desired visitor action, and claim boundaries.
- [`docs/design-principles.md`](docs/design-principles.md) defines the visual
  and accessibility direction.
- [`docs/content-style-guide.md`](docs/content-style-guide.md) defines the
  grounded, low-hype writing style.
- [`docs/automation-roadmap.md`](docs/automation-roadmap.md) records future
  automation opportunities and permanent human controls.
- [`docs/public-repository-checklist.md`](docs/public-repository-checklist.md)
  records the safety and settings checks for public operation.

## Contributions and security

This repository is public for demonstration purposes. It is not currently
seeking outside contributions; see [`CONTRIBUTING.md`](CONTRIBUTING.md) for the
maintenance policy.

Please report suspected vulnerabilities privately by following
[`SECURITY.md`](SECURITY.md). Do not include sensitive details in a public
issue.

## License

The source code and documentation are available under the [MIT License](LICENSE).
