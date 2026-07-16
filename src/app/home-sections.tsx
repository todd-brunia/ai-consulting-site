import Link from "next/link";

import {
  contactHref,
  credentials,
  navItems,
  processSteps,
  services,
  workflowExamples,
} from "./home-content";

const eyebrowClass =
  "text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]";
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export function Header() {
  return (
    <header className="border-b border-[#d8d3c7] bg-[#f7f5ef]/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-col items-stretch gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:px-8"
      >
        <a
          href="#top"
          aria-label="Todd Brunia AI Workflow Consulting"
          className={`flex min-h-12 flex-col justify-center text-[#294653] ${focusClass}`}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.14em]">
            Todd Brunia
          </span>
          <span className="mt-1 text-xs font-medium tracking-[0.04em] text-[#667276]">
            AI Workflow Consulting
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium text-[#516166] md:flex">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-11 content-center transition hover:text-[#1f2a2e] ${focusClass}`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={contactHref}
            className={`inline-flex min-h-11 items-center justify-center rounded-md bg-[#254c5f] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#1d3d4c] ${focusClass}`}
          >
            Discuss Your Workflow
          </a>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={contactHref}
            className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-[#254c5f] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#1d3d4c] ${focusClass}`}
          >
            Discuss Your Workflow
          </a>
          <details className="group relative shrink-0">
            <summary
              className={`flex min-h-11 cursor-pointer list-none items-center justify-center rounded-md border border-[#b8b2a5] px-4 text-sm font-semibold text-[#294653] transition hover:border-[#294653] hover:bg-white/60 [&::-webkit-details-marker]:hidden ${focusClass}`}
            >
              Menu
              <span
                aria-hidden="true"
                className="ml-2 text-lg leading-none transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="absolute right-0 z-20 mt-3 w-64 border border-[#c9c3b7] bg-[#fdfcf8] p-3 shadow-lg">
              <div className="flex flex-col text-sm font-medium text-[#435156]">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-12 items-center px-3 transition hover:bg-[#f1eee6] hover:text-[#1f2a2e] ${focusClass}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="border-b border-[#d8d3c7]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className={`mb-5 ${eyebrowClass}`}>
            AI workflow consulting for Midwestern organizations
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl lg:text-6xl">
            Turn repetitive business processes into practical AI workflows.
          </h1>
          <div className="mt-7 space-y-5 text-lg leading-8 text-[#435156]">
            <p>
              I help software and operations teams identify worthwhile AI
              opportunities, validate them with a focused prototype, and build
              solutions their people can safely use and maintain.
            </p>
            <p>
              Start with one document-heavy, coordination-heavy, or
              knowledge-intensive workflow. We&apos;ll clarify the opportunity,
              risks, expected value, and best next step.
            </p>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={contactHref}
              className={`inline-flex min-h-12 items-center justify-center rounded-md bg-[#254c5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d4c] ${focusClass}`}
            >
              Discuss Your Workflow
            </a>
            <a
              href="#services"
              className={`inline-flex min-h-12 items-center justify-center rounded-md border border-[#b8b2a5] px-6 py-3 text-sm font-semibold text-[#294653] transition hover:border-[#294653] hover:bg-white/60 ${focusClass}`}
            >
              See Engagement Options
            </a>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#667276]">
            No sales presentation. We&apos;ll discuss one workflow, whether AI is
            a reasonable fit, and what a sensible first step would be.
          </p>
        </div>
        <aside
          aria-label="Engagement principle"
          className="self-start border-l-4 border-[#52715f] bg-white/70 p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#172124]">
            People remain responsible for the outcome.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#516166]">
            AI can assist with the work, but the people who own it retain
            direction, judgment, and accountability.
          </p>
          <p className="mt-5 border-t border-[#ddd8cc] pt-5 text-sm leading-7 text-[#516166]">
            Based on the workflow&apos;s risk, people can review uncertain output,
            approve consequential actions, and correct exceptions. The right
            answer may be AI, conventional automation, or no new technology at
            all.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function Credibility() {
  return (
    <section aria-label="Experience" className="bg-[#254c5f] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c7d5cf]">
          Enterprise engineering experience applied to practical AI adoption
        </p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm leading-6 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((credential) => (
            <li key={credential} className="border-l border-[#78909a] pl-4">
              {credential}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WorkflowExamples() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className={eyebrowClass}>Good Places to Start</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
            Look for work that consumes time and attention.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#516166]">
            The best first opportunities are usually bounded, repeatable, and
            easy for the people doing the work to evaluate.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {workflowExamples.map((example) => (
            <li
              key={example}
              className="border border-[#d8d3c7] bg-[#fbfaf7] p-5 text-sm leading-7 text-[#435156]"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="border-y border-[#d8d3c7] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>Focused Engagements</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
            A defined next step—not an open-ended AI project.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col border border-[#c9c3b7] bg-[#fdfcf8] p-6"
            >
              <h3 className="text-xl font-semibold text-[#172124]">
                {service.title}
              </h3>
              <dl className="mt-6 space-y-5 text-sm leading-7">
                <div>
                  <dt className="font-semibold text-[#294653]">For</dt>
                  <dd className="mt-1 text-[#516166]">{service.audience}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#294653]">Includes</dt>
                  <dd className="mt-1 text-[#516166]">{service.deliverables}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#294653]">Outcome</dt>
                  <dd className="mt-1 text-[#516166]">{service.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className={eyebrowClass}>How We Work</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
            Reduce uncertainty one decision at a time.
          </h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-[#52715f] pt-5">
              <span className="text-sm font-semibold text-[#52715f]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold text-[#172124]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#516166]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-3xl border-l-4 border-[#52715f] bg-[#f7f5ef] p-5 text-sm leading-7 text-[#435156]">
          Engagements can stop after any stage. If AI is not the right answer,
          I&apos;ll say so and recommend a simpler direction.
        </p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-[#d8d3c7] py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className={eyebrowClass}>About Todd</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
            Enterprise engineering judgment for a fast-moving technology.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-[#435156]">
          <p>
            I&apos;m Todd Brunia, a Staff Software Engineer with more than 20 years
            of experience building enterprise applications, APIs, cloud
            services, and software delivery practices.
          </p>
          <p>
            I approach AI as an engineer, not an evangelist. That means starting
            with the business process, testing assumptions early, accounting for
            security and maintainability, and keeping people involved wherever
            judgment matters.
          </p>
          <p>
            The objective is a useful business result, not an AI project for its
            own sake. You can review more of my background on{" "}
            <a
              href="https://linkedin.com/in/tbrunia"
              className={`font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] ${focusClass}`}
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-[#1f2a2e] py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b8c7b5]">
          Have a Workflow Worth Exploring?
        </p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Bring one process that consumes too much time or attention.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#d7ded9]">
          In an initial conversation, we&apos;ll discuss how it works today, where
          the friction lies, and whether AI is worth exploring.
        </p>
        <a
          href={contactHref}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#1f2a2e] transition hover:bg-[#edf1ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Discuss Your Workflow
        </a>
        <p className="mt-4 text-sm text-[#bfc9c4]">
          No sales presentation and no obligation to begin a project.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#172124] px-6 py-8 text-sm text-[#c9d2ce] lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Todd Brunia · Des Moines, Iowa</p>
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
        >
          <Link
            href="/public-work"
            className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Public work
          </Link>
          <a
            href="https://linkedin.com/in/tbrunia"
            className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
