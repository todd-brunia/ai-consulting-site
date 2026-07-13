import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../home-sections";
import { journalEntries } from "./journal-content";
import { JournalList } from "./journal-list";

export const metadata: Metadata = {
  title: "Journal | Todd Brunia",
  description:
    "A journal of meaningful decisions, experiments, and improvements from Todd Brunia's AI workflow consulting practice.",
};

const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

export default function JournalPage() {
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

      <main className="flex-1">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Building in public
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl">
              Journal
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                This is a record of meaningful decisions, experiments, and
                improvements as I develop the consulting practice and its
                AI-assisted website workflow.
              </p>
              <p>
                The journal explains the problem or opportunity behind selected
                milestones. It is a curated narrative, not an entry for every
                pull request. The repository&apos;s{" "}
                <a
                  href="https://github.com/todd-brunia/ai-consulting-site/releases"
                  className={`font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] ${focusClass}`}
                >
                  technical changelog
                </a>{" "}
                contains the detailed release history.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Journal entries" className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <JournalList entries={journalEntries} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
