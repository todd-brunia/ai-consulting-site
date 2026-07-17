import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";
import {
  ConsultingCta,
  DecisionsSection,
  RoadmapSection,
  WorkflowSection,
} from "./ai-consulting-site-sections";

export const metadata: Metadata = {
  title: "AI Consulting Site Example | Todd Brunia",
  description:
    "How Todd Brunia's consulting site demonstrates a human-gated, AI-assisted change workflow.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export default function AiConsultingSitePage() {
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
              A consulting site maintained as a practical AI workflow example
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                This site is a working example of a small, AI-assisted delivery
                process with clear human control. It demonstrates how a team can
                test a bounded workflow before treating automation as routine.
              </p>
              <p>
                It is not a client case study or a claim that software delivery
                should be fully autonomous. The useful question is where AI can
                assist while people retain responsibility for the outcome.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href="https://github.com/todd-brunia/ai-consulting-site"
                className={linkClass}
              >
                View source repository
              </a>
              <a
                href="https://github.com/todd-brunia/ai-consulting-site/releases"
                className={linkClass}
              >
                Read technical changelog
              </a>
              <Link href="/public-work" className={linkClass}>
                Back to Public Work
              </Link>
            </div>
          </div>
        </section>

        <DecisionsSection />
        <WorkflowSection />
        <RoadmapSection />
        <ConsultingCta />
      </main>

      <Footer />
    </div>
  );
}
