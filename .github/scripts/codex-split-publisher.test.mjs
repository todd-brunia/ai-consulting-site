import { describe, expect, it, vi } from "vitest";

import {
  childBody,
  childLabels,
  publishSplit,
  splitChildMarker,
} from "./codex-split-publisher.mjs";

const digest = "a".repeat(64);
const parent = {
  number: 60,
  state: "open",
  labels: [
    { name: "devops" },
    { name: "workflow" },
    { name: "approved-for-split" },
    { name: "blocked" },
  ],
};
const children = ["schema", "publisher"].map((id) => ({
  id,
  title: `Implement ${id} controls`,
  outcome: `Deliver the bounded ${id} outcome without unrelated changes.`,
  acceptanceCriteria: [`The ${id} behavior has focused tests.`],
  dependencies: ["None"],
  includedScope: [`The ${id} implementation.`],
  excludedScope: ["Unrelated workflow changes."],
  suggestedLabels: ["workflow", "approved-for-build"],
}));
const result = {
  classification: "split-required",
  markdown: "This issue needs decomposition into independently valuable outcomes.",
  blockingDecision: null,
  splitReason: "The outcomes use unrelated change surfaces and validation paths.",
  children,
};

function mockGithub({ existing = [], comments = [], failOnCreate = null } = {}) {
  let nextNumber = 100;
  const created = [];
  const issues = {
    listForRepo: vi.fn(),
    listComments: vi.fn(),
    create: vi.fn(async (input) => {
      if (input.title === failOnCreate) throw new Error("simulated child creation failure");
      const data = {
        number: nextNumber++,
        title: input.title,
        body: input.body,
        labels: input.labels,
      };
      created.push(data);
      return { data };
    }),
    createComment: vi.fn(async () => ({ data: { id: 1 } })),
    updateComment: vi.fn(async () => ({})),
    removeLabel: vi.fn(async () => ({})),
    addLabels: vi.fn(async () => ({})),
    update: vi.fn(async () => ({})),
  };
  const paginate = vi.fn(async (method) => method === issues.listComments ? comments : existing);
  paginate.iterator = vi.fn(async function* () {
    yield { data: existing };
  });
  return { github: { rest: { issues }, paginate }, issues, created };
}

describe("split publisher", () => {
  it("builds bounded child text and starts new children in needs-planning", () => {
    expect(childLabels(parent.labels, children[0].suggestedLabels)).toEqual([
      "needs-planning",
      "workflow",
    ]);
    expect(childBody({ parentNumber: 60, child: children[0], digest })).toContain(
      splitChildMarker(60, "schema", digest),
    );
    expect(childBody({ parentNumber: 60, child: children[0], digest })).toContain(
      "begins in `needs-planning` for read-only planning",
    );
    expect(childBody({ parentNumber: 60, child: children[0], digest })).not.toContain(
      "apply `needs-planning`",
    );
    expect(childBody({ parentNumber: 60, child: children[0], digest })).toContain(
      "has not been approved for implementation",
    );
  });

  it("deduplicates topic labels and filters every other workflow state", () => {
    const labels = [
      ...parent.labels,
      { name: "workflow" },
      { name: "plan-ready" },
      { name: "approved-for-build" },
      { name: "approved-for-ai-build" },
      { name: "in-progress" },
      { name: "split-parent" },
    ];
    const suggested = [
      "workflow",
      "workflow",
      "needs-planning",
      "plan-ready",
      "approved-for-build",
      "approved-for-ai-build",
      "in-progress",
      "blocked",
      "split-parent",
    ];

    expect(childLabels(labels, suggested)).toEqual(["needs-planning", "workflow"]);
  });

  it("creates all missing children, reconciles a checklist, then closes the parent", async () => {
    const { github, issues, created } = mockGithub();
    const confirmed = await publishSplit({ github, owner: "todd-brunia", repo: "site", parent, result, digest });

    expect(created).toHaveLength(2);
    expect(created.map(({ labels }) => labels)).toEqual([
      ["needs-planning", "workflow"],
      ["needs-planning", "workflow"],
    ]);
    expect(confirmed.map(({ number }) => number)).toEqual([100, 101]);
    expect(issues.createComment).toHaveBeenCalledOnce();
    expect(issues.removeLabel).toHaveBeenCalledTimes(3);
    expect(issues.addLabels).toHaveBeenCalledWith(expect.objectContaining({
      issue_number: 60,
      labels: ["split-parent"],
    }));
    expect(issues.update).toHaveBeenCalledWith(expect.objectContaining({
      issue_number: 60,
      state: "closed",
      state_reason: "not_planned",
    }));
  });

  it("reuses a marked child on retry instead of creating a duplicate", async () => {
    const existing = [{
      number: 88,
      title: children[0].title,
      body: childBody({ parentNumber: 60, child: children[0], digest }),
    }];
    const { github, issues, created } = mockGithub({ existing });
    const confirmed = await publishSplit({ github, owner: "todd-brunia", repo: "site", parent, result, digest });

    expect(created).toHaveLength(1);
    expect(confirmed.map(({ number }) => number)).toEqual([88, 100]);
    expect(issues.removeLabel.mock.calls.some(([input]) => input.issue_number === 88)).toBe(false);
    expect(issues.addLabels.mock.calls.some(([input]) => input.issue_number === 88)).toBe(false);
    expect(issues.update).toHaveBeenCalledOnce();
  });

  it("updates an existing deterministic checklist instead of adding another", async () => {
    const comments = [{ id: 9, body: `<!-- codex-split-checklist:${digest} -->\nOld checklist` }];
    const { github, issues } = mockGithub({ comments });

    await publishSplit({ github, owner: "todd-brunia", repo: "site", parent, result, digest });

    expect(issues.updateComment).toHaveBeenCalledWith(expect.objectContaining({ comment_id: 9 }));
    expect(issues.createComment).not.toHaveBeenCalled();
  });

  it("rejects invalid or stale split requests before external mutations", async () => {
    const focused = {
      classification: "focused",
      markdown: "A valid focused legacy plan that must not be published as a split.",
      blockingDecision: null,
      splitReason: null,
      children: null,
    };
    const focusedMocks = mockGithub();
    await expect(publishSplit({
      github: focusedMocks.github,
      owner: "todd-brunia",
      repo: "site",
      parent,
      result: focused,
      digest,
    })).rejects.toThrow(/requires a split proposal/);
    expect(focusedMocks.issues.create).not.toHaveBeenCalled();

    const staleMocks = mockGithub();
    await expect(publishSplit({
      github: staleMocks.github,
      owner: "todd-brunia",
      repo: "site",
      parent: { ...parent, state: "closed" },
      result,
      digest,
    })).rejects.toThrow(/no longer open/);
    expect(staleMocks.issues.create).not.toHaveBeenCalled();
    expect(staleMocks.issues.update).not.toHaveBeenCalled();
  });

  it("leaves the parent open when child creation partially fails", async () => {
    const { github, issues, created } = mockGithub({ failOnCreate: children[1].title });
    await expect(publishSplit({ github, owner: "todd-brunia", repo: "site", parent, result, digest }))
      .rejects.toThrow(/simulated/);

    expect(created).toHaveLength(1);
    expect(issues.update).not.toHaveBeenCalled();
    expect(issues.removeLabel).not.toHaveBeenCalled();
  });

  it("blocks conflicting duplicate markers", async () => {
    const body = childBody({ parentNumber: 60, child: children[0], digest });
    const { github, issues } = mockGithub({
      existing: [
        { number: 88, title: children[0].title, body },
        { number: 89, title: children[0].title, body },
      ],
    });
    await expect(publishSplit({ github, owner: "todd-brunia", repo: "site", parent, result, digest }))
      .rejects.toThrow(/Multiple issues/);
    expect(issues.create).not.toHaveBeenCalled();
    expect(issues.update).not.toHaveBeenCalled();
  });
});
