import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { contactHref } from "../../home-content";
import AwsBedrockOnDemandPilotPage from "./page";

describe("AwsBedrockOnDemandPilotPage", () => {
  it("explains the client-owned pilot and its boundaries", () => {
    render(<AwsBedrockOnDemandPilotPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "AWS Bedrock on-demand pilot for local OpenCode sessions",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/AWS IAM Identity Center/i)).toHaveLength(2);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "A template is not a hosted service or deployment result.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/not a hosted chat service/i)).toBeInTheDocument();
    expect(screen.getByText(/does not represent a client deployment/i)).toBeInTheDocument();
    expect(screen.getByText(/does not make a savings claim/i)).toBeInTheDocument();
  });

  it("links to the source, public work, and consultation next step", () => {
    render(<AwsBedrockOnDemandPilotPage />);

    expect(screen.getByRole("link", { name: "View source repository" })).toHaveAttribute(
      "href",
      "https://github.com/todd-brunia/aws-bedrock-on-demand-template",
    );
    expect(screen.getByRole("link", { name: "Back to Public Work" })).toHaveAttribute(
      "href",
      "/public-work",
    );
    expect(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Discuss Your Workflow",
      }),
    ).toHaveAttribute("href", contactHref);
  });
});
