import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";
import { ConsultingCta } from "../ai-consulting-site/ai-consulting-site-sections";

export const metadata: Metadata = {
  title: "AI Onboarding Automation Proof of Concept | Todd Brunia",
  description:
    "A personal proof of concept exploring an onboarding workflow with LangGraph, a local language model, and human review.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const experimentDetails = [
  {
    title: "A bounded workflow question",
    description:
      "The proof of concept explores how an AI-enabled workflow might organize onboarding information and prepare useful next steps without treating the output as a final decision.",
  },
  {
    title: "LangGraph orchestration",
    description:
      "LangGraph coordinates the workflow steps so the experiment can make the sequence, handoffs, and review points explicit rather than hiding them in one prompt.",
  },
  {
    title: "Local language-model experiment",
    description:
      "The workflow runs a local language model. That makes it a useful way to examine cost and control tradeoffs, not a promise of lower cost or the right deployment choice for every team.",
  },
] as const;

export default function AiOnboardingAutomationPocPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5ef] text-[#1f2a2e]">
      <SubpageHeader />

      <main className="flex-1" id="main-content">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Public work example
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl">
              An onboarding automation proof of concept for a practical AI workflow
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                Onboarding often involves gathering information, coordinating people,
                and preparing repeatable next steps. This personal proof of concept
                explores whether a small AI-enabled workflow can assist with that
                work while keeping people responsible for review and decisions.
              </p>
              <p>
                It is a public experiment, not a client case study, production
                system, or claim of a particular business result.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href="https://github.com/todd-brunia/ai-onboarding-automation-poc"
                className={linkClass}
              >
                View source repository
              </a>
              <Link href="/public-work" className={linkClass}>
                Back to Public Work
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="experiment-heading" className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                What it explores
              </p>
              <h2
                id="experiment-heading"
                className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
              >
                Test the workflow before treating it as a solution.
              </h2>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {experimentDetails.map((detail) => (
                <li
                  key={detail.title}
                  className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-[#172124]">
                    {detail.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#435156]">
                    {detail.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="limits-heading"
          className="border-y border-[#d8d3c7] bg-white/45 py-16 lg:py-20"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Build context and limits
            </p>
            <h2
              id="limits-heading"
              className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
            >
              Rapid exploration still needs careful follow-through.
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#435156]">
              <p>
                I built this proof of concept in an evening using Codex and ChatGPT
                5.6 Sol. The rapid build was useful for testing the workflow idea;
                it does not replace the design, evaluation, and operational work a
                production system would require.
              </p>
              <p>
                A real implementation would need to define the data it may handle,
                integrations, security controls, quality measures, exception paths,
                and the points where a person reviews or approves consequential
                output. Some workflows will be better served by conventional
                automation or no new technology.
              </p>
            </div>
          </div>
        </section>

        <ConsultingCta />
      </main>

      <Footer />
    </div>
  );
}
