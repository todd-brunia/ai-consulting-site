import Link from "next/link";
import type { Metadata } from "next";

import { Footer } from "../../home-sections";
import { SubpageHeader } from "../../subpage-header";
import { ConsultingCta } from "../ai-consulting-site/ai-consulting-site-sections";

export const metadata: Metadata = {
  title: "AWS Bedrock On-Demand Pilot | Todd Brunia",
  description:
    "A public Terraform foundation for local OpenCode sessions using AWS IAM Identity Center and Amazon Bedrock on-demand inference.",
};

const linkClass =
  "font-semibold text-[#294653] underline decoration-[#9eb0a0] underline-offset-4 transition hover:text-[#172124] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]";

const sections = [
  {
    id: "foundation",
    eyebrow: "What it is",
    heading: "A client-owned foundation for a local pilot.",
    paragraphs: [
      "This public Terraform template provides a starting point for a local OpenCode session that can use Amazon Bedrock on-demand inference. It is intended to be provisioned in an AWS account the client controls.",
      "The template uses AWS IAM Identity Center to help connect a local session with scoped AWS access. Its documented direction is least-privilege access that a client can inspect and adapt for its own environment.",
    ],
  },
  {
    id: "boundaries",
    eyebrow: "What it does not show",
    heading: "A template is not a hosted service or deployment result.",
    paragraphs: [
      "The repository is a foundation for experimentation, not a hosted chat service operated for clients. It does not represent a client deployment, an operating environment, or a guaranteed outcome.",
      "It also does not make a savings claim. Whether a pilot is appropriate depends on the workflow, account controls, model choices, and review a team applies in its own environment.",
    ],
  },
] as const;

export default function AwsBedrockOnDemandPilotPage() {
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
              AWS Bedrock on-demand pilot for local OpenCode sessions
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                This public Terraform template is a client-owned foundation for
                trying Amazon Bedrock on-demand inference from a local OpenCode
                session using AWS IAM Identity Center.
              </p>
              <p>
                It is deliberately a starting point: not a hosted service, a
                client deployment, or evidence of a guaranteed outcome.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a
                href="https://github.com/todd-brunia/aws-bedrock-on-demand-template"
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

        <ConsultingCta />
      </main>

      <Footer />
    </div>
  );
}
