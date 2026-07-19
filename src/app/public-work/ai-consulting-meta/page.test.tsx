import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactHref } from "../../home-content";
import AiConsultingMetaPage from "./page";

describe("AiConsultingMetaPage", () => {
  it("explains the planning record and its boundaries", () => {
    render(<AiConsultingMetaPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A planning record that makes AI challenge and human judgment visible",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not client work, an implemented portal/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Todd retained final decision authority/i)).toBeInTheDocument();
    expect(screen.getByText(/superseded plans as decision history/i)).toBeInTheDocument();
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toHaveAttribute("href", contactHref);
  });

  it("links the public repository and its planning material", () => {
    render(<AiConsultingMetaPage />);

    expect(screen.getByRole("link", { name: "View planning repository" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta",
    );
    expect(screen.getByRole("link", { name: "Read revised plan" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta/blob/main/plans/client-portal/revised-plan.md",
    );
    expect(screen.getByRole("link", { name: "Read AI counterproposal" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta/blob/main/plans/client-portal/counterproposal.md",
    );
    expect(screen.getByRole("link", { name: "Back to Public Work" })).toHaveAttribute(
      "href",
      "/public-work",
    );
  });

  it("shows the proposal, challenge, and human-led revision process", () => {
    render(<AiConsultingMetaPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A useful challenge still needs accountable decisions.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Initial proposal" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI counterproposal" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Human evaluation and revision" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Vercel and Supabase, Stripe for payments/i)).toBeInTheDocument();
  });
});
