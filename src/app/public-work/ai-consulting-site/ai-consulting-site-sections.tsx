import { contactHref } from "../../home-content";

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";
const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const decisions = [
  {
    title: "Keep each change bounded",
    description:
      "Every repository change starts with a specific problem and a small, reviewable plan. That keeps the work tied to a useful visitor or business outcome.",
  },
  {
    title: "Keep people at the decision points",
    description:
      "A person approves the plan, reviews the rendered result, and decides whether to merge. AI can help with the work, but it does not own those decisions.",
  },
  {
    title: "Build for ordinary use",
    description:
      "The site reuses simple components, responsive layouts, semantic HTML, visible focus states, and readable contrast so it works well on a phone as well as a desktop.",
  },
  {
    title: "Check changes before review",
    description:
      "Linting, type checking, tests, and a production build run before the human visual review. The checks catch routine mistakes; they do not replace judgment.",
  },
] as const;

const workflowSteps = [
  "A structured issue records the problem and desired outcome.",
  "A proposed implementation plan is saved with the issue for human review.",
  "A person approves the documented plan before implementation can begin.",
  "AI-assisted implementation stays within that approved scope on a feature branch.",
  "Automated checks run, and a preview supports visual and accessibility review.",
  "A person reviews the result, decides whether to merge, and verifies the production change.",
] as const;

export function DecisionsSection() {
  return (
    <section aria-labelledby="decisions-heading" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
            What it demonstrates
          </p>
          <h2
            id="decisions-heading"
            className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
          >
            Deliberate choices keep the workflow useful and reviewable.
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {decisions.map((decision) => (
            <li
              key={decision.title}
              className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#172124]">
                {decision.title}
              </h3>
              <p className="mt-3 leading-7 text-[#435156]">
                {decision.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section
      aria-labelledby="workflow-heading"
      className="border-y border-[#d8d3c7] bg-white/45 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
          Management flow
        </p>
        <h2
          id="workflow-heading"
          className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
        >
          Human approval frames every AI-assisted change.
        </h2>
        <ol className="mt-10 space-y-5">
          {workflowSteps.map((step, index) => (
            <li
              key={step}
              className="grid gap-3 border-l-2 border-[#52715f] pl-5 sm:grid-cols-[2rem_1fr]"
            >
              <span className="font-semibold text-[#52715f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-[#435156]">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-7 text-[#516166]">
          The{" "}
          <a
            href="https://github.com/todd-brunia/ai-consulting-site/blob/main/docs/github-change-workflow.md"
            className={linkClass}
          >
            GitHub change workflow reference
          </a>{" "}
          documents the controls and states in more detail.
        </p>
      </div>
    </section>
  );
}

export function RoadmapSection() {
  return (
    <section aria-labelledby="roadmap-heading" className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
            Future direction
          </p>
          <h2
            id="roadmap-heading"
            className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
          >
            The foundation is in place; further checks remain planned work.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#172124]">In use today</h3>
            <p className="mt-3 leading-7 text-[#435156]">
              Structured intake, documented plans, explicit human approval,
              automated repository checks, preview review, and human merge
              authority form the current foundation.
            </p>
          </article>
          <article className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-[#172124]">
              Planned, not promised
            </h3>
            <p className="mt-3 leading-7 text-[#435156]">
              Possible next steps include browser smoke tests, accessibility
              checks, broken-link validation, performance budgets, and
              reproducible screenshots. Each needs its own review before it
              becomes part of the process.
            </p>
          </article>
        </div>
        <p className="mt-8 text-sm leading-7 text-[#516166]">
          Read the{" "}
          <a
            href="https://github.com/todd-brunia/ai-consulting-site/blob/main/docs/automation-roadmap.md"
            className={linkClass}
          >
            automation roadmap
          </a>{" "}
          for current status, constraints, and the next proposed phase.
        </p>
      </div>
    </section>
  );
}

export function ConsultingCta() {
  return (
    <section className="border-t border-[#d8d3c7] bg-white/45 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-[#172124]">
            Have a workflow worth exploring?
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-[#516166]">
            Bring one real process, and we can discuss whether AI is a reasonable
            fit and what a sensible first step could be.
          </p>
        </div>
        <a
          href={contactHref}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-[#254c5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d4c] ${focusClass}`}
        >
          Discuss Your Workflow
        </a>
      </div>
    </section>
  );
}
