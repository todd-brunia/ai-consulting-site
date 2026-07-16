export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  problemOrOpportunity: string;
  accomplished: string;
};

export const journalEntries = [
  {
    id: "clarified-human-guidance-in-ai-workflows",
    date: "2026-07-16",
    title: "Clarified how people guide AI-enabled workflows",
    problemOrOpportunity:
      "The site needed to make clearer that AI can assist people without taking away their direction, judgment, or responsibility for the outcome.",
    accomplished:
      "I clarified the homepage guidance so visitors can see how human review, approval, escalation, and correction can fit a workflow according to its risk and consequences.",
  },
  {
    id: "automated-human-gated-ai-workflow",
    date: "2026-07-14",
    title: "Automated a human-gated AI workflow",
    problemOrOpportunity:
      "The site had a careful AI-assisted change process, but planning, implementation, recovery, and cost control still required repetitive manual coordination.",
    accomplished:
      "I built and tested a label-triggered workflow that can plan changes and prepare draft pull requests after explicit AI authorization, while keeping plan approval and merge authority with a person. It also includes failure recovery and uses lower-cost models for routine planning and implementation.",
  },
  {
    id: "started-the-journal",
    date: "2026-07-13",
    title: "Started the journal",
    problemOrOpportunity:
      "The repository recorded technical changes, but it did not explain the purpose behind meaningful steps in plain language.",
    accomplished:
      "I added this journal and a review checkpoint that considers journal impact without requiring an entry for every pull request or release.",
  },
  {
    id: "created-public-work-portfolio",
    date: "2026-07-13",
    title: "Created a public-work portfolio",
    problemOrOpportunity:
      "Public repositories could demonstrate the work, but visitors needed context before opening source code.",
    accomplished:
      "I added a curated Public work page that explains selected consultancy repositories and links to their source and supporting history.",
  },
  {
    id: "added-technical-changelog",
    date: "2026-07-13",
    title: "Added a technical changelog",
    problemOrOpportunity:
      "Commit history was available, but it did not provide a concise, durable view of meaningful technical milestones.",
    accomplished:
      "I added a human-triggered GitHub Release workflow and published an initial release that collects the site's technical history.",
  },
  {
    id: "prepared-public-repository",
    date: "2026-07-12",
    title: "Prepared the repository for public review",
    problemOrOpportunity:
      "Sharing the source required clear contribution, security, licensing, and repository-control expectations.",
    accomplished:
      "I added the documentation and safeguards needed to make the repository public while preserving human approval and merge authority.",
  },
  {
    id: "improved-site-navigation",
    date: "2026-07-12",
    title: "Improved site context and navigation",
    problemOrOpportunity:
      "The first header did not provide enough consulting context or a clear path through the page, especially on mobile.",
    accomplished:
      "I clarified the site identity, added service and process navigation, introduced a mobile menu, and made the primary action easier to find.",
  },
  {
    id: "added-human-gated-process",
    date: "2026-07-12",
    title: "Added a human-gated AI change process",
    problemOrOpportunity:
      "AI-assisted changes needed a repeatable process that kept planning approval, visual review, and merge decisions with a person.",
    accomplished:
      "I introduced structured issues, plans of record, explicit approval labels, automated validation, preview deployments, and human merge control.",
  },
  {
    id: "built-first-consulting-site",
    date: "2026-07-09",
    title: "Built the first consulting site",
    problemOrOpportunity:
      "The consulting direction needed a working website that explained practical AI workflow help and offered a low-pressure next step.",
    accomplished:
      "I created the Next.js site and shaped the homepage around concrete workflows, fixed-scope services, practical engineering judgment, and a clearer contact path.",
  },
  {
    id: "defined-initial-direction",
    date: "2026-07-08",
    title: "Defined the initial direction",
    problemOrOpportunity:
      "Before building, I needed boundaries for the audience, offer, voice, and role of AI in maintaining the site.",
    accomplished:
      "I documented the initial vision and repository guidance so later design, content, and engineering decisions had a grounded reference point.",
  },
] satisfies readonly JournalEntry[];

export function formatJournalDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
