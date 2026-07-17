import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactHref } from "../../home-content";
import AiConsultingSitePage from "./page";

describe("AiConsultingSitePage", () => {
  it("explains the example and provides clear navigation", () => {
    render(<AiConsultingSitePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "A consulting site maintained as a practical AI workflow example",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a client case study/i)).toBeInTheDocument();
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

  it("describes concrete decisions and the human-gated workflow", () => {
    render(<AiConsultingSitePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: /deliberate choices/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep each change bounded" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Keep people at the decision points" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Check changes before review" })).toBeInTheDocument();

    const workflowHeading = screen.getByRole("heading", {
      level: 2,
      name: /human approval frames/i,
    });
    const workflow = within(workflowHeading.closest("section")!).getByRole("list");
    expect(within(workflow).getAllByRole("listitem")).toHaveLength(6);
    expect(workflow).toHaveTextContent(/person approves the documented plan/i);
    expect(workflow).toHaveTextContent(/person reviews the result/i);
  });

  it("distinguishes current capabilities from planned work and links supporting material", () => {
    render(<AiConsultingSitePage />);

    expect(screen.getByRole("heading", { name: "In use today" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Planned, not promised" })).toBeInTheDocument();
    expect(screen.getByText(/browser smoke tests, accessibility checks/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View source repository" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site",
    );
    expect(screen.getByRole("link", { name: "Read technical changelog" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/releases",
    );
    expect(screen.getByRole("link", { name: "GitHub change workflow reference" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/blob/main/docs/github-change-workflow.md",
    );
    expect(screen.getByRole("link", { name: "automation roadmap" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/blob/main/docs/automation-roadmap.md",
    );
  });
});
