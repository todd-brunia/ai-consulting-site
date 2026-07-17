import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { journalEntries } from "./journal-content";
import JournalPage from "./page";
import { contactHref } from "../home-content";

describe("JournalPage", () => {
  it("positions the journal as a curated narrative with clear navigation", () => {
    render(<JournalPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Journal" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not an entry for every pull request/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "technical changelog" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/releases",
    );
    expect(
      screen.getByRole("link", { name: "Back to consulting site" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toHaveAttribute("href", contactHref);
    expect(
      screen.getByRole("navigation", { name: "Footer links" }),
    ).toBeInTheDocument();
  });

  it("renders every milestone with semantic dates and entry details", () => {
    render(<JournalPage />);

    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(11);

    articles.forEach((article, index) => {
      const entry = journalEntries[index];
      expect(
        within(article).getByRole("heading", { name: entry.title }),
      ).toBeInTheDocument();
      expect(article.querySelector("time")).toHaveAttribute(
        "datetime",
        entry.date,
      );
      expect(within(article).getByText("Problem or opportunity")).toBeInTheDocument();
      expect(within(article).getByText("What changed")).toBeInTheDocument();
    });

    expect(articles[0]).toHaveTextContent(
      "Built an onboarding automation proof of concept",
    );
    expect(articles[0]).toHaveTextContent("July 17, 2026");
    expect(articles[0]).toHaveTextContent(
      "LangGraph orchestration and a local language model",
    );
    expect(
      within(articles[0]).getByRole("link", {
        name: "View the AI onboarding automation proof of concept",
      }),
    ).toHaveAttribute(
      "href",
      "https://ai-consulting-site-pied.vercel.app/public-work/ai-onboarding-automation-poc",
    );
    expect(within(articles[1]).queryByRole("link")).not.toBeInTheDocument();
    expect(articles.at(-1)).toHaveTextContent("Defined the initial direction");
  });
});

describe("journalEntries", () => {
  it("has complete, unique entries in reverse chronological order", () => {
    const ids = new Set<string>();
    const isoDate = /^\d{4}-\d{2}-\d{2}$/;

    journalEntries.forEach((entry, index) => {
      expect(ids.has(entry.id)).toBe(false);
      ids.add(entry.id);
      expect(entry.date).toMatch(isoDate);
      expect(Number.isNaN(Date.parse(`${entry.date}T00:00:00Z`))).toBe(false);
      expect(entry.title).not.toHaveLength(0);
      expect(entry.problemOrOpportunity).not.toHaveLength(0);
      expect(entry.accomplished).not.toHaveLength(0);
      if (entry.relatedLink) {
        expect(entry.relatedLink.href).not.toHaveLength(0);
        expect(entry.relatedLink.label).not.toHaveLength(0);
      }

      if (index > 0) {
        expect(journalEntries[index - 1].date >= entry.date).toBe(true);
      }
    });
  });
});
