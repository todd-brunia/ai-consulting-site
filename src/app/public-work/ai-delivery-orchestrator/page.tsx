import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";
import { ConsultingCta } from "../ai-consulting-site/ai-consulting-site-sections";

export const metadata: Metadata = {
  title: "AI Delivery Orchestrator | Todd Brunia",
  description:
    "A governed AI delivery orchestrator, licensed under Apache 2.0 for client sharing and still a work in progress.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const orchestratorSections = [
  {
    id: "what-it-does",
    eyebrow: "What it does",
    heading: "Sequence work and keep humans in control.",
    paragraphs: [
      "The orchestrator coordinates the steps between a structured request and a reviewed pull request: it sequences issues, coordinates AI builds, reviews the results, and records where a person must approve, reject, or take over.",
      "Approval boundaries are part of the design. Model execution does not receive publishing credentials, and automatic merge is treated as a separately gated future capability rather than a default.",
    ],
  },
  {
    id: "how-it-is-shared",
    eyebrow: "How it is meant to be shared",
    heading: "A client-owned foundation, not a hosted service.",
    paragraphs: [
      "The repository is licensed under Apache 2.0 and intended for sharing. The documented direction is a versioned release a client can fork into its own GitHub organization and provision in an AWS account it controls.",
      "A client fork keeps ownership of infrastructure, Terraform state, credentials, policies, repositories, generated code, logs, backups, budgets, and final publication decisions. A hosted control plane or consultancy-operated GitHub App is a separate future product.",
    ],
  },
  {
    id: "current-status",
    eyebrow: "Current status",
    heading: "A work in progress, evaluated honestly.",
    paragraphs: [
      "The repository is in its foundation phase. It currently provides a validated TypeScript worker, versioned domain and state-machine contracts, PostgreSQL persistence, a stub-only runtime with durable checkpoints, container build, local runtime, tests, CI, and a reviewed Terraform foundation.",
      "It does not yet connect to GitHub, OpenAI, or a deployed AWS environment and cannot mutate another repository. It is published early to make progress inspectable, not to present a finished product or guarantee a particular result.",
    ],
  },
] as const;

export default function AiDeliveryOrchestratorPage() {
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
              An AI delivery orchestrator built for governed, shareable workflows
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                The ai-delivery-orchestrator is a governed workflow service that
                uses LangGraph, GitHub automation, and AWS to sequence issues,
                coordinate AI builds, and review pull requests while preserving
                human approval boundaries.
              </p>
              <p>
                It is licensed under Apache 2.0 so it can be shared, and the
                intended use is a client-owned fork: a versioned release a client
                can run in its own GitHub organization and AWS account. It is still
                a work in progress, not a finished product or a claim of a
                particular result.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href="https://github.com/todd-brunia/ai-delivery-orchestrator"
                className={linkClass}
              >
                View source repository
              </a>
              <a
                href="https://todd-brunia.github.io/ai-consulting-meta/plans/governed-codex-automation/"
                className={linkClass}
              >
                Review planning documentation
              </a>
              <a
                href="https://github.com/todd-brunia/ai-delivery-orchestrator/blob/main/docs/client-aws-account-foundation.md"
                className={linkClass}
              >
                Read client AWS account foundation guide
              </a>
              <Link href="/public-work" className={linkClass}>
                Back to Public Work
              </Link>
            </div>
          </div>
        </section>

        {orchestratorSections.map((section) => (
          <section
            key={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="border-b border-[#d8d3c7] py-16 lg:py-20"
          >
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                {section.eyebrow}
              </p>
              <h2
                id={`${section.id}-heading`}
                className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
              >
                {section.heading}
              </h2>
              <div className="mt-6 space-y-4 leading-8 text-[#435156]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <ConsultingCta />
      </main>

      <Footer />
    </div>
  );
}