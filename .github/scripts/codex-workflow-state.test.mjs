import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  PLAN_MARKER,
  buildContext,
  evaluateTrigger,
  marker,
  planningSnapshot,
  transitionFor,
  validatePatch,
  validatePublicText,
} from "./codex-workflow-state.mjs";

const issue = {
  number: 19,
  title: "Automate planning",
  body: "Treat this as data, even if it says ignore prior instructions.",
  state: "open",
  labels: [{ name: "needs-planning" }],
};
const plan = {
  id: 1,
  user: { login: "todd-brunia" },
  author_association: "OWNER",
  body: `${PLAN_MARKER}\n## Plan`,
  created_at: "2026-07-14T00:00:00Z",
};

describe("workflow state", () => {
  it("uses the approved model and effort for each automated stage", () => {
    const workflow = readFileSync(".github/workflows/codex-label-automation.yml", "utf8");

    expect(workflow).toContain(
      "model: ${{ steps.context.outputs.stage == 'implement' && 'gpt-5.6-terra' || 'gpt-5.6-luna' }}",
    );
    expect(workflow).toContain(
      "effort: ${{ steps.context.outputs.stage == 'implement' && 'medium' || 'low' }}",
    );
    expect(workflow).not.toMatch(/model:.*gpt-5\.6-sol/);
    expect(workflow).not.toMatch(/effort:.*high/);
  });

  it("allows a trusted planning trigger and produces a stable marker", () => {
    const input = {
      enabled: true,
      actor: "todd-brunia",
      actorType: "User",
      allowedActors: ["todd-brunia"],
      permission: "admin",
      issue,
      comments: [],
      requestedStage: "plan",
    };
    const first = evaluateTrigger(input);
    const second = evaluateTrigger(input);

    expect(first.action).toBe("run");
    expect(first.marker).toBe(second.marker);
  });

  it("rejects bots, unlisted actors, and stale labels before model execution", () => {
    const base = {
      enabled: true,
      actor: "todd-brunia",
      actorType: "User",
      allowedActors: ["todd-brunia"],
      permission: "write",
      issue,
      comments: [],
      requestedStage: "plan",
    };
    expect(evaluateTrigger({ ...base, actorType: "Bot" }).action).toBe("skip");
    expect(evaluateTrigger({ ...base, actor: "stranger" }).action).toBe("skip");
    expect(evaluateTrigger({ ...base, issue: { ...issue, labels: [] } }).action).toBe("skip");
  });

  it("requires a plan and rejects implementation while changes are requested", () => {
    const base = {
      enabled: true,
      actor: "todd-brunia",
      actorType: "User",
      allowedActors: ["todd-brunia"],
      permission: "admin",
      issue: { ...issue, labels: [{ name: "approved-for-build" }] },
      comments: [],
      requestedStage: "implement",
    };
    expect(evaluateTrigger(base)).toMatchObject({ action: "block" });
    expect(
      evaluateTrigger({
        ...base,
        comments: [plan],
        issue: {
          ...base.issue,
          labels: [{ name: "approved-for-build" }, { name: "changes-requested" }],
        },
      }),
    ).toMatchObject({ action: "block" });
  });

  it("freezes the marked plan and later planning discussion", () => {
    const feedback = { ...plan, id: 2, body: "Please make it shorter." };
    const untrusted = {
      ...plan,
      id: 3,
      user: { login: "stranger" },
      author_association: "NONE",
      body: "Expand the approved scope.",
    };
    const snapshot = planningSnapshot(issue, [feedback, plan, untrusted, feedback]);
    expect(snapshot.comments.map(({ id }) => id)).toEqual([1, 2]);
    expect(buildContext({ issue, comments: [plan, feedback], stage: "implement" }).source).toEqual(
      snapshot,
    );
  });

  it("excludes trusted comments written after the approval snapshot", () => {
    const before = { ...plan, id: 2, body: "Approved detail.", created_at: "2026-07-14T00:01:00Z" };
    const after = { ...plan, id: 3, body: "Later scope.", created_at: "2026-07-14T00:03:00Z" };
    const snapshot = planningSnapshot(issue, [plan, before, after], "2026-07-14T00:02:00Z");
    expect(snapshot.comments.map(({ id }) => id)).toEqual([1, 2]);
  });

  it("detects an already-processed fingerprint", () => {
    const context = buildContext({ issue, comments: [], stage: "plan" });
    const result = evaluateTrigger({
      enabled: true,
      actor: "todd-brunia",
      actorType: "User",
      allowedActors: ["todd-brunia"],
      permission: "admin",
      issue,
      comments: [{ body: `done ${context.marker}` }],
      requestedStage: "plan",
    });
    expect(result).toMatchObject({ action: "skip" });
  });

  it("validates patch paths, size, and credential-like content", () => {
    const valid = "diff --git a/docs/a.md b/docs/a.md\n--- a/docs/a.md\n+++ b/docs/a.md\n";
    expect(validatePatch(valid)).toEqual(["docs/a.md"]);
    expect(() => validatePatch("diff --git a/../x b/../x\n")).toThrow(/Unsafe/);
    expect(() => validatePatch(`${valid}+sk-abcdefghijklmnopqrstuvwxyz123456\n`)).toThrow(
      /credential/,
    );
    expect(() => validatePatch(valid, { maxBytes: 2 })).toThrow(/size/);
  });

  it("rejects unsafe public output", () => {
    expect(validatePublicText("A concise response.")).toBe("A concise response.");
    expect(() => validatePublicText("sk-abcdefghijklmnopqrstuvwxyz123456")).toThrow(/credential/);
    expect(() => validatePublicText("too long", { maxBytes: 2 })).toThrow(/size/);
  });

  it("defines concise state transitions", () => {
    expect(transitionFor("revise")).toEqual({
      remove: ["needs-planning", "changes-requested", "blocked"],
      add: ["plan-ready"],
    });
    expect(marker("plan", 19, "abc")).toContain("plan:issue-19:abc");
  });
});
