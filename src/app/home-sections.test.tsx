import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header, Hero } from "./home-sections";

describe("Header", () => {
  it("provides an accessible site identity and primary navigation", () => {
    render(<Header />);

    expect(
      screen.getByRole("link", { name: "Todd Brunia" }),
    ).toHaveAttribute("href", "#top");

    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });

    expect(navigation).toContainElement(
      screen.getByRole("link", { name: "Services" }),
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
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
