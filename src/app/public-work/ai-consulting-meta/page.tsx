import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";
import { ConsultingCta } from "../ai-consulting-site/ai-consulting-site-sections";

export const metadata: Metadata = {
  title: "AI Consulting Planning Record | Todd Brunia",
  description:
    "A public planning record showing how an AI counterproposal informed human-led technical decisions.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const planningSteps = [
  {
    title: "Initial proposal",
    description:
      "The record begins with a plan for a hypothetical client portal. It makes assumptions and tradeoffs visible before anyone treats them as a build commitment.",
  },
  {
    title: "AI counterproposal",
    description:
      "An AI-generated counterproposal deliberately challenges the initial direction. Its value is in surfacing questions and alternatives, not in deciding what should happen.",
  },
  {
    title: "Human evaluation and revision",
    description:
      "Todd's follow-up questions and decisions lead to a revised direction: Vercel and Supabase, Stripe for payments, an external signature service, and a JSON:API integration boundary.",
  },
] as const;

export default function AiConsultingMetaPage() {
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
              A planning record that makes AI challenge and human judgment visible
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                This public repository preserves a sanitized planning conversation
                about a hypothetical client portal: an initial proposal, a
                deliberate AI counterproposal, follow-up questions, and a revised
                plan.
              </p>
              <p>
                It is a decision-making artifact, not client work, an implemented
                portal, or a claim of a business result. AI helped challenge the
                proposal; Todd retained final decision authority.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href="https://github.com/todd-brunia/ai-consulting-meta"
                className={linkClass}
              >
                View planning repository
              </a>
              <a
                href="https://github.com/todd-brunia/ai-consulting-meta/blob/main/plans/client-portal/revised-plan.md"
                className={linkClass}
              >
                Read revised plan
              </a>
              <a
                href="https://github.com/todd-brunia/ai-consulting-meta/blob/main/plans/client-portal/counterproposal.md"
                className={linkClass}
              >
                Read AI counterproposal
              </a>
              <Link href="/public-work" className={linkClass}>
                Back to Public Work
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="planning-heading" className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
                What the record demonstrates
              </p>
              <h2
                id="planning-heading"
                className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl"
              >
                A useful challenge still needs accountable decisions.
              </h2>
            </div>
            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {planningSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="border border-[#d8d3c7] bg-white/70 p-6 shadow-sm"
                >
                  <span className="text-sm font-semibold text-[#52715f]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-[#172124]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#435156]">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-[#d8d3c7] bg-white/45 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Decision history, not a finished product
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#172124] sm:text-4xl">
              Keep the reasoning available when the direction changes.
            </h2>
            <div className="mt-6 space-y-4 leading-8 text-[#435156]">
              <p>
                The repository preserves superseded plans as decision history.
                That lets a reviewer see what changed, why alternatives were
                considered, and where a person made the call.
              </p>
              <p>
                It includes public information only. The record does not describe
                a completed client engagement, a finalized cost estimate, or a
                product ready for implementation.
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
