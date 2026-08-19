import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactHref } from "../../home-content";
import AiDeliveryOrchestratorPage from "./page";

describe("AiDeliveryOrchestratorPage", () => {
  it("explains the orchestrator and provides clear navigation", () => {
    render(<AiDeliveryOrchestratorPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "An AI delivery orchestrator built for governed, shareable workflows",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/preserving human approval boundaries/i)).toBeInTheDocument();
    expect(screen.getByText(/licensed under Apache 2.0 so it can be shared/i)).toBeInTheDocument();
    expect(screen.getByText(/still a work in progress/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View source repository" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-delivery-orchestrator",
    );
    expect(
      screen.getByRole("link", { name: "Review planning documentation" }),
    ).toHaveAttribute(
      "href",
      "https://todd-brunia.github.io/ai-consulting-meta/plans/governed-codex-automation/",
    );
    expect(
      screen.getByRole("link", { name: "Read client AWS account foundation guide" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-delivery-orchestrator/blob/main/docs/client-aws-account-foundation.md",
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

  it("describes the purpose, sharing model, and current status", () => {
    render(<AiDeliveryOrchestratorPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Sequence work and keep humans in control.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/automatic merge is treated as a separately gated/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A client-owned foundation, not a hosted service.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/client fork keeps ownership of infrastructure/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A work in progress, evaluated honestly.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/does not yet connect to GitHub, OpenAI/i)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});