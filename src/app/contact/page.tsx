import type { Metadata } from "next";

import { Footer } from "../home-sections";
import { SubpageHeader } from "../subpage-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Discuss Your Workflow | Todd Brunia",
  description:
    "Share a little about a workflow you are considering, and Todd will prepare for a practical discovery conversation.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5ef] text-[#1f2a2e]">
      <SubpageHeader showContactAction={false} />

      <main className="flex-1" id="main-content">
        <section className="border-b border-[#d8d3c7]">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#52715f]">
              Start with one workflow
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#172124] sm:text-5xl">
              Discuss your workflow
            </h1>
            <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-[#435156]">
              <p>
                Share a little context about one process that consumes too much
                time or attention. The two required questions are enough to
                begin; the rest can help make a first conversation more useful.
              </p>
              <p>
                When you submit, your email app will open with your answers
                prepared for Todd&apos;s Gmail inbox. I&apos;ll review the inquiry
                personally and aim to respond within one business day. Please
                do not include confidential information.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Workflow inquiry form" className="py-16 lg:py-20">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
