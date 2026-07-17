import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createInquiryMailto } from "./contact-form";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("provides a short, accessible workflow inquiry form", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("link", { name: "Back to consulting site" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.queryByRole("link", { name: "Discuss Your Workflow" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /what workflow would you like to discuss/i,
      }),
    ).toBeRequired();
    expect(
      screen.getByRole("textbox", {
        name: /what is difficult about it today/i,
      }),
    ).toBeRequired();
    expect(
      screen.getByRole("button", { name: "Prepare email inquiry" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/aim to respond within one business day/i),
    ).toBeInTheDocument();
  });
});

describe("createInquiryMailto", () => {
  it("sends a structured, URL-encoded inquiry to the consulting inbox", () => {
    const href = createInquiryMailto({
      workflow: "Document or information processing",
      people: "Operations team",
      friction: "Manual routing",
      outcome: "Faster review",
      systems: "Gmail",
      timeline: "Within the next month",
    });
    const url = new URL(href);

    expect(`${url.protocol}${url.pathname}`).toBe(
      "mailto:tbrunia+ai-consulting@gmail.com",
    );
    expect(url.searchParams.get("subject")).toBe(
      "AI workflow discovery inquiry",
    );
    expect(url.searchParams.get("body")).toContain(
      "Workflow under consideration: Document or information processing",
    );
    expect(url.searchParams.get("body")).toContain(
      "Current friction: Manual routing",
    );
    expect(url.searchParams.get("body")).toContain(
      "Relevant timeline: Within the next month",
    );
  });
});
