export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  problemOrOpportunity: string;
  accomplished: string;
  narrativeSections?: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
  relatedLink?: {
    href: string;
    label: string;
  };
};

export const journalEntries = [
  {
    id: "learning-from-the-side-quests-in-ai-automation",
    date: "2026-08-09",
    title: "Learning from the side quests in AI automation",
    problemOrOpportunity:
      "Building a label-driven AI delivery workflow has not been a straight path. Each improvement can expose a new interaction between automation, repository state, and the human checkpoints I want to preserve.",
    accomplished:
      "I worked through another round of automation failures and came away with a clearer view of how sequencing, ownership, and recovery need to work in a human-directed AI delivery system.",
    narrativeSections: [
      {
        heading: "When one improvement creates another problem",
        paragraphs: [
          "I added a way for the automation to split work that had grown too large into smaller issues. The split worked, but the new issues were created by the automation itself. That origin did not satisfy the trust rules for the next planning step, so the workflow either blocked the children or failed instead of moving them forward.",
          "That was frustrating because the detour sat beside the feature work I wanted to finish. It was also useful evidence: in a label-driven system, every transition has consequences. Creating the right issue is not enough if its labels, history, and permissions leave the next stage unable to act.",
        ],
      },
      {
        heading: "The workshop is doing its job",
        paragraphs: [
          "I am still using the consulting client portal as an incubator for these ideas. It gives me real implementation work against which to test planning, splitting, approval, coding, and recovery without pretending the automation is finished or production-ready.",
          "The imperfect journey is part of the work. Each bump makes the boundaries between human judgment and automated action more explicit, and each recovery teaches me what the workflow must make visible before I can trust it with a larger role.",
        ],
      },
      {
        heading: "Keep the goal in view",
        paragraphs: [
          "The longer-term goal remains a human-directed AI delivery factory: I want to spend more of my time defining the problem, reviewing the plan, and making consequential decisions, then give well-prepared work to an AI-assisted implementation process.",
          "I expect more side quests along the way. For anyone following a similar path, the practical lesson is to stay positive and focused on the outcome while treating failures as information. Progress is not a perfect sequence of successful runs; it is the accumulated judgment to make the next run safer and more useful.",
        ],
      },
    ],
  },
  {
    id: "published-a-browsable-planning-library",
    date: "2026-08-01",
    title: "Published a browsable planning library",
    problemOrOpportunity:
      "The public planning repository preserved useful reasoning and decision history, but a source tree was not the clearest way for visitors to explore or share that work.",
    accomplished:
      "I published the sanitized planning material as a navigable website and connected it to this site's Public Work collection so visitors can inspect plans, revisions, roadmaps, and selected visual artifacts more directly.",
    narrativeSections: [
      {
        heading: "Making public work easier to inspect",
        paragraphs: [
          "Making a repository public is different from making its contents approachable. The new planning showcase renders the existing Markdown records for the browser, organizes them by initiative, and provides direct paths to presentation-oriented material such as the client portal storyboard and wireframe gallery.",
          "Markdown remains the source of truth. Publishing it through GitHub Pages avoids maintaining a separate copy while giving me stable links I can use in conversations and in this public-work portfolio.",
        ],
      },
      {
        heading: "Why expose the planning",
        paragraphs: [
          "Plans are useful evidence when they show assumptions, alternatives, revisions, boundaries, and the points where a person made a decision. Sharing that record gives others something more concrete to evaluate than a polished result with the reasoning removed.",
        ],
      },
      {
        heading: "The boundary remains visible",
        paragraphs: [
          "The showcase contains sanitized, fictional, or generalized material. It is not a record of a completed client engagement, proof of a business outcome, or a claim that every planned capability is implemented or production-ready.",
        ],
      },
    ],
    relatedLink: {
      href: "https://todd-brunia.github.io/ai-consulting-meta/",
      label: "Explore the public planning showcase",
    },
  },
  {
    id: "built-a-local-client-portal-onboarding-flow",
    date: "2026-07-29",
    title: "Built a local client portal onboarding flow",
    problemOrOpportunity:
      "The revised client portal plan needed to become a small, useful implementation slice before I could judge where the remaining risk and work belonged.",
    accomplished:
      "I moved from planning to a working local onboarding flow with fictional fixtures, giving me a concrete way to test the access and invitation decisions behind the portal.",
    narrativeSections: [
      {
        heading: "A bounded local slice",
        paragraphs: [
          "The local implementation now has foundations for authentication and tenant isolation, along with bounded human access and read-only machine access. It includes invitation-only onboarding, client invitation acceptance, and an accessible staff interface for managing the invitation lifecycle.",
          "The useful lesson was that authentication alone does not grant someone access to an organization. The workflow also needs an explicit relationship between a person, an invitation, and the organization they are permitted to enter.",
        ],
      },
      {
        heading: "What the work made clearer",
        paragraphs: [
          "Implementation also strengthened the surrounding safeguards: CI and integration testing, clearer approval evidence, credential scanning, recovery guidance, and human-gated agent workflows. Those are practical controls for changing a system carefully, not a substitute for human judgment.",
          "This is a working local vertical slice using fictional fixtures. It is not an MVP launch, hosted staging environment, production onboarding system, or client deployment. Completing a useful local flow makes the next questions more concrete; it does not establish production readiness.",
        ],
      },
      {
        heading: "The next bounded milestone",
        paragraphs: [
          "The next implementation milestone is disposable end-to-end Playwright browser coverage for the onboarding flow. That work is not yet approved or complete, but it would help test the visitor-facing path without treating the local slice as ready for client use.",
        ],
      },
    ],
    relatedLink: {
      href: "https://github.com/todd-brunia/ai-consulting-meta/blob/b818d07/plans/client-portal/implementation-checkpoint-2026-07-28.md",
      label: "Read the client portal implementation checkpoint",
    },
  },
  {
    id: "revised-client-portal-plan-through-dialogue-with-ai",
    date: "2026-07-19",
    title: "Revised a client portal plan through dialogue with AI",
    problemOrOpportunity:
      "I needed a practical plan for a client portal that would support the business while also giving me relevant experience with AI-enabled workflows.",
    accomplished:
      "I used an extended planning conversation with AI to challenge and substantially narrow the initial direction before deciding to proceed with a revised plan.",
    narrativeSections: [
      {
        heading: "The initial plan",
        paragraphs: [
          "The first proposal was technically coherent: an AWS-centered client portal with custom infrastructure and transaction workflows. But it asked one project to serve clients, deepen my AWS experience, handle signing and invoicing, and create AI-learning opportunities before I had validated the business process.",
        ],
      },
      {
        heading: "The counterproposal",
        paragraphs: [
          "I asked AI to challenge that direction rather than refine it. Its counterproposal made the tradeoff clear: building authentication, infrastructure, electronic signatures, and invoicing myself would add risk and ownership cost without much strategic value for the AI learning I wanted from this work.",
        ],
      },
      {
        heading: "My evaluation and revised direction",
        paragraphs: [
          "I reviewed that critique, asked follow-up questions about vendor exposure, portability, recovery, and cost estimates, and made the decisions. The revised direction uses Stripe for invoicing, an external provider for electronic signatures, Vercel for the Next.js application, Supabase for PostgreSQL, authentication, and storage, and JSON:API for a reusable standards-based frontend and backend contract.",
          "Those choices delegate commodity transactions where owning them would create an unfavorable risk or maintenance burden. They leave more room to learn from the workflow and make deliberate decisions about the parts that matter to the business.",
        ],
      },
      {
        heading: "The next step",
        paragraphs: [
          "The revised plan is complete as a planning artifact, and I intend to begin implementation within the next few days. The portal has not been implemented, validated with clients, or put into use.",
          "The useful part of this AI-assisted process was not accepting a first answer. It was asking for a counterproposal, testing the reasoning with questions, and retaining responsibility for the goals, tradeoffs, vendor choices, approval, and decision to proceed.",
        ],
      },
    ],
    relatedLink: {
      href: "https://github.com/todd-brunia/ai-consulting-meta/blob/36bf7375fceb19b7a6eb9be648d4aa3dc87a5bed/plans/client-portal/revised-plan.md",
      label: "Read the revised client portal plan",
    },
  },
  {
    id: "built-onboarding-automation-proof-of-concept",
    date: "2026-07-17",
    title: "Built an onboarding automation proof of concept",
    problemOrOpportunity:
      "I wanted to test whether a small, practical AI workflow could coordinate onboarding work while keeping people responsible for review and decisions.",
    accomplished:
      "I built a public personal proof of concept in an evening with Codex and ChatGPT 5.6 Sol. It uses LangGraph orchestration and a local language model to explore a bounded workflow, including the tradeoffs around cost, control, and production readiness.",
    relatedLink: {
      href: "https://ai-consulting-site-pied.vercel.app/public-work/ai-onboarding-automation-poc",
      label: "View the AI onboarding automation proof of concept",
    },
  },
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
  {
    id: "recognized-ai-workflow-consulting-opportunity",
    date: "2026-07-03",
    title: "Recognized an opportunity to help with AI-enabled workflows",
    problemOrOpportunity:
      "As current AI developments made more capable workflows feel increasingly practical, I saw that small and mid-sized organizations could use grounded help deciding where to experiment and where caution was warranted.",
    accomplished:
      "After spending June and July learning from the AI Daily Brief, I began exploring a small consulting practice focused on practical AI-enabled workflows. My aim is to bring engineering judgment, low-risk experiments, and honest discussion of uncertainty to teams considering their next step.",
    relatedLink: {
      href: "https://aidailybrief.ai/",
      label: "Visit the AI Daily Brief",
    },
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
