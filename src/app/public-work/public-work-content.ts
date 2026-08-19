export type SupportingLink = {
  label: string;
  href: string;
};

export type PublicWorkItem = {
  id: string;
  name: string;
  description: string;
  detailPath: string;
  repositoryUrl: string;
  supportingLinks?: readonly SupportingLink[];
};

export const publicWorkItems = [
  {
    id: "ai-consulting-site",
    name: "AI Consulting Site",
    description:
      "This consulting website and its human-gated, AI-assisted maintenance workflow. The repository shows how changes move from a structured request through planning, implementation, automated checks, and human review.",
    detailPath: "/public-work/ai-consulting-site",
    repositoryUrl: "https://github.com/todd-brunia/ai-consulting-site",
    supportingLinks: [
      {
        label: "Technical changelog",
        href: "https://github.com/todd-brunia/ai-consulting-site/releases",
      },
    ],
  },
  {
    id: "ai-onboarding-automation-poc",
    name: "AI Onboarding Automation Proof of Concept",
    description:
      "A personal experiment that uses LangGraph and a local language model to explore a bounded onboarding workflow with human review.",
    detailPath: "/public-work/ai-onboarding-automation-poc",
    repositoryUrl:
      "https://github.com/todd-brunia/ai-onboarding-automation-poc",
  },
  {
    id: "ai-consulting-meta",
    name: "AI Consulting Planning Record",
    description:
      "A public planning library that makes sanitized proposals, counterproposals, roadmaps, and implementation decisions easier to inspect without presenting them as client work.",
    detailPath: "/public-work/ai-consulting-meta",
    repositoryUrl: "https://github.com/todd-brunia/ai-consulting-meta",
    supportingLinks: [
      {
        label: "Explore planning showcase",
        href: "https://todd-brunia.github.io/ai-consulting-meta/",
      },
    ],
  },
  {
    id: "ai-delivery-orchestrator",
    name: "AI Delivery Orchestrator",
    description:
      "A governed AI delivery orchestrator that sequences issues, coordinates AI builds, and reviews pull requests while preserving human approval boundaries. It is licensed under Apache 2.0 for clients to fork into accounts they control, and it is still a work in progress rather than a finished product.",
    detailPath: "/public-work/ai-delivery-orchestrator",
    repositoryUrl: "https://github.com/todd-brunia/ai-delivery-orchestrator",
    supportingLinks: [
      {
        label: "Review planning documentation",
        href: "https://todd-brunia.github.io/ai-consulting-meta/plans/governed-codex-automation/",
      },
    ],
  },
] satisfies readonly PublicWorkItem[];
