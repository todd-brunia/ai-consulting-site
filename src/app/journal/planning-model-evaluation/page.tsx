import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";

export const metadata: Metadata = {
  title: "Planning-Model Evaluation | Todd Brunia",
  description:
    "A small qualitative planning-model evaluation and a personal working approach for AI-assisted workflow planning.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const sections = [
  {
    id: "method",
    eyebrow: "Method",
    heading: "A small qualitative planning experiment.",
    paragraphs: [
      "I used OpenCode as the harness and assessed the quality of eight submitted plans. I also attempted local Ollama runs with Qwen Coder and DeepSeek Coder models above 10B parameters on a 2.4 GHz quad-core Intel Core i5 laptop with 8 GB LPDDR3 memory.",
      "The comparison also included OpenAI API tests using GPT-5.6 Luna and GPT-5.6 Terra, free OpenCode model access, and Amazon Bedrock. This is a record of a practical experiment, not a provider-wide or statistically valid benchmark.",
    ],
  },
  {
    id: "finding",
    eyebrow: "Finding",
    heading: "Luna ranked first and Terra second for the submitted plans.",
    paragraphs: [
      "In this eight-plan assessment, GPT-5.6 Luna ranked first and GPT-5.6 Terra ranked second for plan quality. That result is a personal observation from this limited evaluation, not a claim that either model will rank the same way for another workflow or team.",
      "I did not record cost, token-usage, or elapsed-time artifacts. The evaluation therefore cannot support a cost, value-for-money, or speed conclusion.",
    ],
  },
  {
    id: "working-approach",
    eyebrow: "Working approach",
    heading: "Use available capacity thoughtfully and keep alternatives practical.",
    paragraphs: [
      "My current working assessment is to make the most of existing Codex credits, prefer GPT-5.6 Terra and Luna for planning, and keep Amazon Bedrock plus Anthropic Sonnet or DeepSeek as practical alternatives when they fit the work. This is a personal operating approach, not advice about provider limits, pricing, or availability.",
      "Codex can feel more capable in practice because it combines a coding-optimized model with an agent harness, workspace context, tools, permissions, and workflow integration. That combined experience is different from model capability alone; it does not show that an underlying Codex model is categorically superior to API or Bedrock models.",
    ],
  },
] as const;

export default function PlanningModelEvaluationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5ef] text-[#1f2a2e]">
      <SubpageHeader />

      <main className="flex-1" id="main-content">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Journal · August 25, 2026
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl">
              Planning-model evaluation: a practical working assessment
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                This is a concise record of a small planning experiment and the
                operating approach it informed. It is not a general benchmark.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href="https://developers.openai.com/codex/" className={linkClass}>
                Read OpenAI Codex documentation
              </a>
              <Link href="/journal" className={linkClass}>
                Back to Journal
              </Link>
            </div>
          </div>
        </section>

        {sections.map((section) => (
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
      </main>

      <Footer />
    </div>
  );
}
