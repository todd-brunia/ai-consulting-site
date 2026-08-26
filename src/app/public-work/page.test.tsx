import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PublicWorkItem } from "./public-work-content";
import PublicWorkPage from "./page";
import { PublicWorkList } from "./public-work-list";
import { contactHref } from "../home-content";

describe("PublicWorkPage", () => {
  it("introduces the selected public work and provides next steps", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Public work" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not client case studies/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to consulting site" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toHaveAttribute("href", contactHref);
  });

  it("links the initial repository and its technical changelog", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "AI Consulting Site" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/human-gated, AI-assisted/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore this example" })[0],
    ).toHaveAttribute("href", "/public-work/ai-consulting-site");
    expect(
      screen.getByRole("link", {
        name: "View AI Consulting Site repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site",
    );
    expect(
      screen.getByRole("link", {
        name: "AI Consulting Site: Technical changelog",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/releases",
    );
  });

  it("lists the onboarding automation proof of concept", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AI Onboarding Automation Proof of Concept",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/LangGraph and a local language model/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore this example" })[1],
    ).toHaveAttribute("href", "/public-work/ai-onboarding-automation-poc");
    expect(
      screen.getByRole("link", {
        name: "View AI Onboarding Automation Proof of Concept repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-onboarding-automation-poc",
    );
  });

  it("lists the AI consulting planning record", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AI Consulting Planning Record",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/public planning library/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore this example" })[2],
    ).toHaveAttribute("href", "/public-work/ai-consulting-meta");
    expect(
      screen.getByRole("link", {
        name: "View AI Consulting Planning Record repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta",
    );
    expect(
      screen.getByRole("link", {
        name: "AI Consulting Planning Record: Explore planning showcase",
      }),
    ).toHaveAttribute(
      "href",
      "https://todd-brunia.github.io/ai-consulting-meta/",
    );
  });

  it("lists the AI delivery orchestrator with sharing, client-use, and work-in-progress context", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AI Delivery Orchestrator",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/governed AI delivery orchestrator/i)).toBeInTheDocument();
    expect(screen.getByText(/preserving human approval boundaries/i)).toBeInTheDocument();
    expect(screen.getByText(/licensed under Apache 2.0 for clients to fork/i)).toBeInTheDocument();
    expect(screen.getByText(/still a work in progress/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore this example" })[3],
    ).toHaveAttribute("href", "/public-work/ai-delivery-orchestrator");
    expect(
      screen.getByRole("link", {
        name: "View AI Delivery Orchestrator repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-delivery-orchestrator",
    );
    expect(
      screen.getByRole("link", {
        name: "AI Delivery Orchestrator: Review planning documentation",
      }),
    ).toHaveAttribute(
      "href",
      "https://todd-brunia.github.io/ai-consulting-meta/plans/governed-codex-automation/",
    );
  });

  it("lists the AWS Bedrock on-demand pilot", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AWS Bedrock On-Demand Pilot",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/client-owned local OpenCode sessions/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Explore this example" })[4],
    ).toHaveAttribute("href", "/public-work/aws-bedrock-on-demand-pilot");
    expect(
      screen.getByRole("link", {
        name: "View AWS Bedrock On-Demand Pilot repository",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/aws-bedrock-on-demand-template",
    );
  });
});

describe("PublicWorkList", () => {
  it("renders an entry without optional supporting links", () => {
    const item: PublicWorkItem = {
      id: "example",
      name: "Example Repository",
      description: "A selected public repository.",
      detailPath: "/public-work/example",
      repositoryUrl: "https://github.com/example/repository",
    };

    render(<PublicWorkList items={[item]} />);

    expect(
      screen.getByRole("link", { name: "View Example Repository repository" }),
    ).toHaveAttribute("href", "https://github.com/example/repository");
    expect(
      screen.getByRole("link", { name: "Explore this example" }),
    ).toHaveAttribute("href", "/public-work/example");
    expect(screen.queryByText("Technical changelog")).not.toBeInTheDocument();
  });
});
