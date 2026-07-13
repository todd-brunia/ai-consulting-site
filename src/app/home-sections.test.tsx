import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer, Header, Hero } from "./home-sections";

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

    const contactLinks = screen.getAllByRole("link", {
      name: "Discuss Your Workflow",
    });
    expect(contactLinks).toHaveLength(2);
    contactLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
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
        name: "Turn repetitive business processes into practical AI workflows.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("AI workflow consulting for Midwestern organizations"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Discuss Your Workflow" }),
    ).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
    expect(
      screen.getByRole("link", { name: "See Engagement Options" }),
    ).toHaveAttribute("href", "#services");
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
