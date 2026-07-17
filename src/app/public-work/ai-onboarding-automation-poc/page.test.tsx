import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactHref } from "../../home-content";
import AiOnboardingAutomationPocPage from "./page";

describe("AiOnboardingAutomationPocPage", () => {
  it("explains the personal proof of concept and provides clear navigation", () => {
    render(<AiOnboardingAutomationPocPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "An onboarding automation proof of concept for a practical AI workflow",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a client case study, production system/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View source repository" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-onboarding-automation-poc",
    );
    expect(screen.getByRole("link", { name: "Back to Public Work" })).toHaveAttribute(
      "href",
      "/public-work",
    );
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toHaveAttribute("href", contactHref);
  });

  it("describes the experiment, limitations, and human review needs", () => {
    render(<AiOnboardingAutomationPocPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Test the workflow before treating it as a solution.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "LangGraph orchestration" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Local language-model experiment" })).toBeInTheDocument();
    expect(screen.getByText(/built this proof of concept in an evening/i)).toBeInTheDocument();
    expect(screen.getByText(/person reviews or approves consequential output/i)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
