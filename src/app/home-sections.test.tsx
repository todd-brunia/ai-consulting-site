import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  About,
  CostAndValue,
  Contact,
  Footer,
  Header,
  Hero,
  Process,
  TeamLearning,
} from "./home-sections";

describe("Header", () => {
  it("provides consulting context in the accessible site identity", () => {
    render(<Header />);

    expect(
      screen.getByRole("link", {
        name: "Todd Brunia AI Workflow Consulting",
      }),
    ).toHaveAttribute("href", "#top");
  });

  it("provides desktop and mobile navigation with a primary action", () => {
    render(<Header />);

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });

    const serviceLinks = screen.getAllByRole("link", { name: "Services" });
    expect(serviceLinks).toHaveLength(2);
    serviceLinks.forEach((link) => {
      expect(navigation).toContainElement(link);
      expect(link).toHaveAttribute("href", "#services");
    });

    const journalLinks = screen.getAllByRole("link", { name: "Journal" });
    expect(journalLinks).toHaveLength(2);
    journalLinks.forEach((link) => {
      expect(navigation).toContainElement(link);
      expect(link).toHaveAttribute("href", "/journal");
    });

    const publicWorkLinks = screen.getAllByRole("link", {
      name: "Public work",
    });
    expect(publicWorkLinks).toHaveLength(2);
    publicWorkLinks.forEach((link) => {
      expect(navigation).toContainElement(link);
      expect(link).toHaveAttribute("href", "/public-work");
    });

    const contactLinks = screen.getAllByRole("link", {
      name: "Discuss Your Workflow",
    });
    expect(contactLinks).toHaveLength(2);
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/contact");
    });

    expect(screen.getByText("Menu").closest("summary")).toBeInTheDocument();
  });
});

describe("Hero", () => {
  it("states the offer and provides clear next actions", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Practical AI consulting for small and mid-sized businesses.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("AI workflow consulting for Midwestern organizations"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "People remain responsible for the outcome.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /people can review uncertain output, approve consequential actions, and correct exceptions/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /together, we'll define clear goals for one document-heavy/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /your team helps test the work, evaluate the output, and learn what it takes to use it well/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Discuss Your Workflow" }),
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByRole("link", { name: "See Engagement Options" }),
    ).toHaveAttribute("href", "#services");
  });
});

describe("Contact", () => {
  it("directs the workflow discussion action to the intake page", () => {
    render(<Contact />);

    expect(
      screen.getByRole("link", { name: "Discuss Your Workflow" }),
    ).toHaveAttribute("href", "/contact");
  });
});

describe("Process", () => {
  it("treats team readiness after the engagement as an assessed outcome", () => {
    render(<Process />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Team enablement" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /document the system, work with your team as they use it, and assess what they can operate or extend after the engagement/i,
      ),
    ).toBeInTheDocument();
  });
});

describe("CostAndValue", () => {
  it("explains how costs and value are assessed before further investment", () => {
    render(<CostAndValue />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Cost, value, and a sensible starting point.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/estimate the adoption and operating costs/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/baseline measures and success criteria/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /stop or scale down if expected value does not justify further investment/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Discuss Your Workflow" }),
    ).toHaveAttribute("href", "/contact");
  });
});

describe("TeamLearning", () => {
  it("qualifies the workforce-upskilling metric and links to its primary source", () => {
    render(<TeamLearning />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A useful AI workflow needs more than a new tool.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /77% of employers said they plan to upskill their workforce to better work alongside AI/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /survey of more than 1,000 global employers representing more than 14 million workers/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Read the World Economic Forum's Future of Jobs Report 2025/i,
      }),
    ).toHaveAttribute(
      "href",
      "https://www3.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf",
    );
  });
});

describe("About", () => {
  it("shows Todd's profile image and retains his background details", () => {
    render(<About />);

    const profileImage = screen.getByRole("img", { name: "Todd Brunia" });
    const imageUrl = new URL(profileImage.getAttribute("src")!, "http://localhost");

    expect(imageUrl.searchParams.get("url")).toBe(
      "/images/profile-photos/todd-brunia.jpg",
    );
    expect(
      screen.getByText(/I also hold an MBA from Iowa State University/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/tbrunia",
    );
  });
});

describe("Footer", () => {
  it("links to public work while retaining location and LinkedIn", () => {
    render(<Footer />);

    expect(screen.getByText("Todd Brunia · Des Moines, Iowa")).toBeInTheDocument();

    const navigation = screen.getByRole("navigation", {
      name: "Footer links",
    });
    expect(navigation).toContainElement(
      screen.getByRole("link", { name: "Public work" }),
    );
    expect(screen.getByRole("link", { name: "Public work" })).toHaveAttribute(
      "href",
      "/public-work",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/tbrunia",
    );
  });
});
