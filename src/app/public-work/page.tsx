import type { Metadata } from "next";
import Link from "next/link";

import { contactHref } from "../home-content";
import { Footer } from "../home-sections";
import { publicWorkItems } from "./public-work-content";
import { PublicWorkList } from "./public-work-list";

export const metadata: Metadata = {
  title: "Public Work | Todd Brunia",
  description:
    "Selected public repositories from Todd Brunia's AI workflow consulting practice.",
};

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export default function PublicWorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5ef] text-[#1f2a2e]">
      <header className="border-b border-[#d8d3c7] bg-[#f7f5ef]/95 px-6 py-4 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <Link
            href="/"
            aria-label="Todd Brunia AI Workflow Consulting home"
            className={`flex min-h-12 flex-col justify-center text-[#294653] ${focusClass}`}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.14em]">
              Todd Brunia
            </span>
            <span className="mt-1 text-xs font-medium tracking-[0.04em] text-[#667276]">
              AI Workflow Consulting
            </span>
          </Link>
          <Link
            href="/"
            className={`text-sm font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] ${focusClass}`}
          >
            Back to consulting site
          </Link>
        </div>
      </header>

      <main className="flex-1" id="main-content">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Selected repositories
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl">
              Public work
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#435156]">
              These repositories share selected work and experiments from my
              consulting practice. They offer a practical look at how I approach
              software delivery and AI-enabled workflows; they are not client
              case studies or promises of a particular result.
            </p>
          </div>
        </section>

        <section aria-labelledby="repository-list-heading" className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <h2 id="repository-list-heading" className="sr-only">
              Public repositories
            </h2>
            <PublicWorkList items={publicWorkItems} />
          </div>
        </section>

        <section className="border-t border-[#d8d3c7] bg-white/45 py-14">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#172124]">
                Have a workflow worth exploring?
              </h2>
              <p className="mt-2 max-w-2xl leading-7 text-[#516166]">
                Bring one real process, and we can discuss whether AI is a
                reasonable fit and what a sensible first step could be.
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
      </main>

      <Footer />
    </div>
  );
}
