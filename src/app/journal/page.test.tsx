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
    expect(articles).toHaveLength(19);

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

    const deepSeekArticle = within(articles[0]).getByRole("heading", {
      name: "Tried DeepSeek V4 Flash in opencode for a focused implementation task",
    }).parentElement;
    expect(deepSeekArticle).not.toBeNull();
    expect(deepSeekArticle).toHaveTextContent("August 19, 2026");
    expect(deepSeekArticle).toHaveTextContent("opencode");
    expect(deepSeekArticle).toHaveTextContent("free DeepSeek V4 Flash access");
    expect(deepSeekArticle).toHaveTextContent("implementation-only work from issue #104");
    expect(deepSeekArticle).toHaveTextContent("pull request #105");
    expect(deepSeekArticle).toHaveTextContent("OpenAI GPT 5.6 Sol");
    expect(deepSeekArticle).toHaveTextContent("created a todo list");
    expect(deepSeekArticle).toHaveTextContent("around five minutes");
    expect(deepSeekArticle).toHaveTextContent("results looked pretty good");
    expect(deepSeekArticle).toHaveTextContent("a little stilted");
    expect(deepSeekArticle).toHaveTextContent("run-on sentences");
    expect(deepSeekArticle).toHaveTextContent("it worked out OK");
    expect(
      within(deepSeekArticle!).getByRole("link", {
        name: "View pull request #105 for the Public Work page",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-consulting-site/pull/105",
    );

    const googleAiArticle = within(articles[1]).getByRole("heading", {
      name: "Tried Google AI and the Antigravity CLI to wrap up a delivery milestone",
    }).parentElement;
    expect(googleAiArticle).not.toBeNull();
    expect(googleAiArticle).toHaveTextContent("August 17, 2026");
    expect(googleAiArticle).toHaveTextContent("Gemini 3.7 Flash");
    expect(googleAiArticle).toHaveTextContent("Antigravity CLI");
    expect(googleAiArticle).toHaveTextContent("A familiar feel with a different model");
    expect(googleAiArticle).toHaveTextContent("permission prompts");
    expect(googleAiArticle).toHaveTextContent("Speed and documentation");
    expect(googleAiArticle).toHaveTextContent("personal observation from one session, not a benchmark");
    expect(googleAiArticle).toHaveTextContent("What I built with it");
    expect(googleAiArticle).toHaveTextContent("Milestone 2 of the delivery orchestrator");
    expect(
      within(googleAiArticle!).getByRole("link", {
        name: "View the pull request created with Google AI assistance",
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/ai-delivery-orchestrator/pull/158",
    );

    const consumptionLessonsArticle = within(articles[2]).getByRole("heading", {
      name: "Learning consumption lessons while pushing further into agentic AI",
    }).parentElement;
    expect(consumptionLessonsArticle).not.toBeNull();
    expect(consumptionLessonsArticle).toHaveTextContent("August 15, 2026");
    expect(consumptionLessonsArticle).toHaveTextContent("ai-delivery-orchestrator");
    expect(consumptionLessonsArticle).toHaveTextContent("Staying engaged with the work");
    expect(consumptionLessonsArticle).toHaveTextContent(
      "one week of personal usage, not a general claim about the product",
    );
    expect(consumptionLessonsArticle).toHaveTextContent(
      "stay close enough to AI-generated changes to review them",
    );
    expect(consumptionLessonsArticle).toHaveTextContent(
      "Making experimentation cost-aware",
    );
    expect(consumptionLessonsArticle).toHaveTextContent(
      "create the AWS resources for the delivery-orchestrator experiment and to remove them afterward",
    );
    expect(consumptionLessonsArticle).toHaveTextContent(
      "A practical next step",
    );

    const automationLessonsArticle = within(articles[3]).getByRole("heading", {
      name: "Learning from the side quests in AI automation",
    }).parentElement;
    expect(automationLessonsArticle).not.toBeNull();
    expect(automationLessonsArticle).toHaveTextContent("August 9, 2026");
    expect(automationLessonsArticle).toHaveTextContent(
      "the new issues were created by the automation itself",
    );
    expect(automationLessonsArticle).toHaveTextContent(
      "consulting client portal as an incubator",
    );
    expect(automationLessonsArticle).toHaveTextContent(
      "human-directed AI delivery factory",
    );
    expect(automationLessonsArticle).toHaveTextContent(
      "I expect more side quests along the way",
    );

    const planningLibraryArticle = within(articles[4]).getByRole("heading", {
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

    const newEntryArticle = within(articles[5]).getByRole("heading", {
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

    const revisedPlanArticle = within(articles[6]).getByRole("heading", {
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
    expect(articles[7]).toHaveTextContent(
      "Built an onboarding automation proof of concept",
    );
    expect(articles[7]).toHaveTextContent("July 17, 2026");
    expect(articles[7]).toHaveTextContent(
      "LangGraph orchestration and a local language model",
    );
    expect(
      within(articles[7]).getByRole("link", {
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
