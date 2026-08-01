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
    expect(articles).toHaveLength(15);

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

    const planningLibraryArticle = within(articles[0]).getByRole("heading", {
      name: "Published a browsable planning library",
    }).parentElement;
    expect(planningLibraryArticle).not.toBeNull();
    expect(planningLibraryArticle).toHaveTextContent("August 1, 2026");
    expect(planningLibraryArticle).toHaveTextContent(
      "Making public work easier to inspect",
    );
    expect(planningLibraryArticle).toHaveTextContent(
      "Markdown remains the source of truth",
    );
    expect(planningLibraryArticle).toHaveTextContent(
      "not a record of a completed client engagement",
    );
    expect(
      within(planningLibraryArticle!).getByRole("link", {
        name: "Explore the public planning showcase",
      }),
    ).toHaveAttribute(
      "href",
      "https://todd-brunia.github.io/ai-consulting-meta/",
    );

    const newEntryArticle = within(articles[1]).getByRole("heading", {
      name: "Built a local client portal onboarding flow",
    }).parentElement;
    expect(newEntryArticle).not.toBeNull();
    expect(newEntryArticle).toHaveTextContent("July 29, 2026");
    expect(newEntryArticle).toHaveTextContent(
      "working local onboarding flow with fictional fixtures",
    );
    expect(newEntryArticle).toHaveTextContent(
      "authentication alone does not grant someone access to an organization",
    );
    expect(newEntryArticle).toHaveTextContent(
      "not an MVP launch, hosted staging environment, production onboarding system, or client deployment",
    );
    expect(newEntryArticle).toHaveTextContent(
      "disposable end-to-end Playwright browser coverage",
    );
    expect(
      within(newEntryArticle!).getByRole("link", {
        name: "Read the client portal implementation checkpoint",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta/blob/b818d07/plans/client-portal/implementation-checkpoint-2026-07-28.md",
    );

    const revisedPlanArticle = within(articles[2]).getByRole("heading", {
      name: "Revised a client portal plan through dialogue with AI",
    }).parentElement;
    expect(revisedPlanArticle).not.toBeNull();
    expect(revisedPlanArticle).toHaveTextContent("July 19, 2026");
    expect(revisedPlanArticle).toHaveTextContent("The initial plan");
    expect(revisedPlanArticle).toHaveTextContent("The counterproposal");
    expect(revisedPlanArticle).toHaveTextContent(
      "My evaluation and revised direction",
    );
    expect(revisedPlanArticle).toHaveTextContent("Stripe for invoicing");
    expect(revisedPlanArticle).toHaveTextContent(
      "an external provider for electronic signatures",
    );
    expect(revisedPlanArticle).toHaveTextContent(
      "Vercel for the Next.js application",
    );
    expect(revisedPlanArticle).toHaveTextContent(
      "Supabase for PostgreSQL, authentication, and storage",
    );
    expect(revisedPlanArticle).toHaveTextContent("JSON:API");
    expect(revisedPlanArticle).toHaveTextContent(
      "unfavorable risk or maintenance burden",
    );
    expect(revisedPlanArticle).toHaveTextContent("The next step");
    expect(revisedPlanArticle).toHaveTextContent(
      "The portal has not been implemented, validated with clients, or put into use.",
    );
    expect(
      within(revisedPlanArticle!).getByRole("link", {
        name: "Read the revised client portal plan",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-meta/blob/36bf7375fceb19b7a6eb9be648d4aa3dc87a5bed/plans/client-portal/revised-plan.md",
    );
    expect(articles[3]).toHaveTextContent(
      "Built an onboarding automation proof of concept",
    );
    expect(articles[3]).toHaveTextContent("July 17, 2026");
    expect(articles[3]).toHaveTextContent(
      "LangGraph orchestration and a local language model",
    );
    expect(
      within(articles[3]).getByRole("link", {
        name: "View the AI onboarding automation proof of concept",
      }),
    ).toHaveAttribute(
      "href",
      "https://ai-consulting-site-pied.vercel.app/public-work/ai-onboarding-automation-poc",
    );
    expect(articles.at(-1)).toHaveTextContent(
      "Recognized an opportunity to help with AI-enabled workflows",
    );
    expect(articles.at(-1)).toHaveTextContent("July 3, 2026");
    expect(articles.at(-1)).toHaveTextContent(
      "engineering judgment, low-risk experiments, and honest discussion of uncertainty",
    );
    expect(
      within(articles.at(-1)!).getByRole("link", {
        name: "Visit the AI Daily Brief",
      }),
    ).toHaveAttribute("href", "https://aidailybrief.ai/");
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
