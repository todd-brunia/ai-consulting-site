"use client";

import type { FormEvent } from "react";

const inquiryAddress = "tbrunia+ai-consulting@gmail.com";
const inquirySubject = "AI workflow discovery inquiry";

export type ContactInquiry = {
  workflow: string;
  people: string;
  friction: string;
  outcome: string;
  systems: string;
  timeline: string;
};

export function createInquiryMailto(inquiry: ContactInquiry) {
  const body = [
    `Workflow under consideration: ${inquiry.workflow}`,
    `Who performs it: ${inquiry.people || "Not specified"}`,
    `Current friction: ${inquiry.friction}`,
    `Desired outcome: ${inquiry.outcome || "Not specified"}`,
    `Systems or constraints: ${inquiry.systems || "Not specified"}`,
    `Relevant timeline: ${inquiry.timeline || "Not specified"}`,
  ].join("\n\n");

  return `mailto:${inquiryAddress}?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(body)}`;
}

const fieldClass =
  "mt-2 block w-full rounded-md border border-[#b8b2a5] bg-white px-3 py-2.5 text-[#1f2a2e] shadow-sm transition placeholder:text-[#667276] focus:border-[#2f6f8f] focus:outline-2 focus:outline-offset-2 focus:outline-[#2f6f8f]";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const inquiry: ContactInquiry = {
      workflow: String(values.get("workflow") ?? ""),
      people: String(values.get("people") ?? ""),
      friction: String(values.get("friction") ?? ""),
      outcome: String(values.get("outcome") ?? ""),
      systems: String(values.get("systems") ?? ""),
      timeline: String(values.get("timeline") ?? ""),
    };

    window.location.assign(createInquiryMailto(inquiry));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="workflow" className="font-semibold text-[#294653]">
          What workflow would you like to discuss?{" "}
          <span aria-hidden="true">*</span>
        </label>
        <select
          id="workflow"
          name="workflow"
          required
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a workflow type
          </option>
          <option>Document or information processing</option>
          <option>Knowledge search or internal support</option>
          <option>Software delivery or technical work</option>
          <option>Multi-step coordination</option>
          <option>Another workflow</option>
        </select>
      </div>

      <div>
        <label htmlFor="friction" className="font-semibold text-[#294653]">
          What is difficult about it today? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="friction"
          name="friction"
          required
          rows={4}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="people" className="font-semibold text-[#294653]">
          Who currently performs this work?{" "}
          <span className="font-normal">(optional)</span>
        </label>
        <input id="people" name="people" type="text" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="outcome" className="font-semibold text-[#294653]">
          What outcome would be useful?{" "}
          <span className="font-normal">(optional)</span>
        </label>
        <textarea id="outcome" name="outcome" rows={3} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="systems" className="font-semibold text-[#294653]">
          Are there important systems or constraints?{" "}
          <span className="font-normal">(optional)</span>
        </label>
        <textarea id="systems" name="systems" rows={3} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="timeline" className="font-semibold text-[#294653]">
          Is there a relevant timeline?{" "}
          <span className="font-normal">(optional)</span>
        </label>
        <select id="timeline" name="timeline" className={fieldClass} defaultValue="">
          <option value="">No specific timeline</option>
          <option>Within the next month</option>
          <option>Within the next quarter</option>
          <option>Later this year</option>
          <option>Still exploring</option>
        </select>
      </div>

      <p className="text-sm leading-6 text-[#516166]">* Required fields</p>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#254c5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d4c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f6f8f]"
      >
        Prepare email inquiry
      </button>
    </form>
  );
}
