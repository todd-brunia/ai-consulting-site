import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PlanningModelEvaluationPage from "./page";

describe("PlanningModelEvaluationPage", () => {
  it("records the methods, finding, and material limits", () => {
    render(<PlanningModelEvaluationPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Planning-model evaluation: a practical working assessment",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/OpenCode as the harness/i)).toBeInTheDocument();
    expect(screen.getByText(/Qwen Coder and DeepSeek Coder models above 10B/i)).toBeInTheDocument();
    expect(screen.getByText(/2.4 GHz quad-core Intel Core i5 laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/eight submitted plans/i)).toBeInTheDocument();
    expect(screen.getByText(/Luna ranked first and Terra second/i)).toBeInTheDocument();
    expect(screen.getByText(/did not record cost, token-usage, or elapsed-time artifacts/i)).toBeInTheDocument();
  });

  it("keeps the model-selection assessment and Codex distinction grounded", () => {
    render(<PlanningModelEvaluationPage />);

    expect(screen.getByText(/make the most of existing Codex credits/i)).toBeInTheDocument();
    expect(screen.getByText(/Anthropic Sonnet or DeepSeek as practical alternatives/i)).toBeInTheDocument();
    expect(screen.getByText(/agent harness, workspace context, tools, permissions/i)).toBeInTheDocument();
    expect(screen.getByText(/does not show that an underlying Codex model is categorically superior/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read OpenAI Codex documentation" }),
    ).toHaveAttribute("href", "https://developers.openai.com/codex/");
    expect(screen.getByRole("link", { name: "Back to Journal" })).toHaveAttribute(
      "href",
      "/journal",
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toBeInTheDocument();
  });
});
