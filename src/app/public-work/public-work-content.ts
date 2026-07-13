export type SupportingLink = {
  label: string;
  href: string;
};

export type PublicWorkItem = {
  id: string;
  name: string;
  description: string;
  repositoryUrl: string;
  supportingLinks?: readonly SupportingLink[];
};

export const publicWorkItems = [
  {
    id: "ai-consulting-site",
    name: "AI Consulting Site",
    description:
      "This consulting website and its human-gated, AI-assisted maintenance workflow. The repository shows how changes move from a structured request through planning, implementation, automated checks, and human review.",
    repositoryUrl: "https://github.com/todd-brunia/ai-consulting-site",
    supportingLinks: [
      {
        label: "Technical changelog",
        href: "https://github.com/todd-brunia/ai-consulting-site/releases",
      },
    ],
  },
] satisfies readonly PublicWorkItem[];
