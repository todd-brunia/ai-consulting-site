import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PublicWorkItem } from "./public-work-content";
import PublicWorkPage from "./page";
import { PublicWorkList } from "./public-work-list";

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
      screen.getByRole("link", { name: "Discuss Your Workflow" }),
    ).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("links the initial repository and its technical changelog", () => {
    render(<PublicWorkPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "AI Consulting Site" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/human-gated, AI-assisted/i)).toBeInTheDocument();
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
});

describe("PublicWorkList", () => {
  it("renders an entry without optional supporting links", () => {
    const item: PublicWorkItem = {
      id: "example",
      name: "Example Repository",
      description: "A selected public repository.",
      repositoryUrl: "https://github.com/example/repository",
    };

    render(<PublicWorkList items={[item]} />);

    expect(
      screen.getByRole("link", { name: "View Example Repository repository" }),
    ).toHaveAttribute("href", "https://github.com/example/repository");
    expect(screen.queryByText("Technical changelog")).not.toBeInTheDocument();
  });
});
