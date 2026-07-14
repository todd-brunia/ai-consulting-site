import { createHash } from "node:crypto";

export const PLAN_MARKER = "<!-- codex-implementation-plan -->";
export const AUTOMATION_MARKER_PREFIX = "<!-- codex-automation:";
export const STATE_LABELS = [
  "needs-planning",
  "plan-ready",
  "changes-requested",
  "approved-for-build",
  "in-progress",
  "preview-ready",
  "blocked",
];

export const STAGES = {
  "needs-planning": "plan",
  "changes-requested": "revise",
  "approved-for-build": "implement",
};

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function fingerprint(value) {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

export function marker(stage, issueNumber, digest) {
  return `${AUTOMATION_MARKER_PREFIX}${stage}:issue-${issueNumber}:${digest} -->`;
}

export function latestPlanIndex(comments) {
  for (let index = comments.length - 1; index >= 0; index -= 1) {
    if (comments[index].body?.includes(PLAN_MARKER)) return index;
  }
  return -1;
}

export function planningSnapshot(issue, comments, cutoff = null) {
  const cutoffTime = cutoff ? new Date(cutoff).getTime() : Number.POSITIVE_INFINITY;
  const eligibleComments = comments.filter((comment) => {
    const createdAt = comment.created_at ?? comment.createdAt;
    return !createdAt || new Date(createdAt).getTime() <= cutoffTime;
  });
  const planIndex = latestPlanIndex(eligibleComments);
  if (planIndex < 0) return null;

  const trustedAssociations = new Set(["OWNER", "MEMBER", "COLLABORATOR"]);
  return {
    issue: { number: issue.number, title: issue.title, body: issue.body ?? "" },
    comments: eligibleComments
      .slice(planIndex)
      .filter((comment, index) => {
        if (index === 0) return true;
        const association = comment.author_association ?? comment.authorAssociation ?? "NONE";
        const body = comment.body ?? "";
        return (
          trustedAssociations.has(association) ||
          body.includes(`${AUTOMATION_MARKER_PREFIX}revise:`) ||
          body.includes("<!-- codex-plan-amendment -->")
        );
      })
      .map((comment) => ({
        id: comment.id,
        author: comment.user?.login ?? comment.author?.login ?? "unknown",
        association: comment.author_association ?? comment.authorAssociation ?? "NONE",
        body: comment.body ?? "",
        createdAt: comment.created_at ?? comment.createdAt ?? "",
      })),
  };
}

export function buildContext({ issue, comments, stage, cutoff }) {
  const snapshot = planningSnapshot(issue, comments, cutoff);
  const source =
    stage === "plan"
      ? { issue: { number: issue.number, title: issue.title, body: issue.body ?? "" } }
      : snapshot;

  if (!source) throw new Error("A marked implementation plan is required.");
  const digest = fingerprint({ stage, source });
  return { digest, source, marker: marker(stage, issue.number, digest) };
}

export function evaluateTrigger({
  enabled,
  actor,
  actorType,
  allowedActors,
  permission,
  issue,
  comments,
  requestedStage,
  cutoff,
}) {
  if (!enabled) return { action: "skip", reason: "Automation is disabled." };
  if (issue.state !== "open") return { action: "skip", reason: "Issue is not open." };
  if (actorType === "Bot" || actor.endsWith("[bot]")) {
    return { action: "skip", reason: "Bot triggers are not allowed." };
  }
  if (!allowedActors.includes(actor)) {
    return { action: "skip", reason: "Actor is not in CODEX_ALLOWED_ACTORS." };
  }
  if (!new Set(["write", "maintain", "admin"]).has(permission)) {
    return { action: "skip", reason: "Actor lacks write-level repository permission." };
  }

  const labels = issue.labels.map((label) =>
    typeof label === "string" ? label : label.name,
  );
  const expectedLabel = Object.entries(STAGES).find(([, stage]) => stage === requestedStage)?.[0];
  if (!expectedLabel || !labels.includes(expectedLabel)) {
    return { action: "skip", reason: "The requested stage label is no longer present." };
  }

  if (requestedStage === "implement" && labels.includes("changes-requested")) {
    return { action: "block", reason: "Planning changes are still requested." };
  }

  let context;
  try {
    context = buildContext({ issue, comments, stage: requestedStage, cutoff });
  } catch (error) {
    return { action: "block", reason: error.message };
  }

  if (comments.some((comment) => comment.body?.includes(context.marker))) {
    return { action: "skip", reason: "This planning snapshot was already processed." };
  }

  return { action: "run", ...context };
}

export function validatePatch(patch, { maxBytes = 500_000 } = {}) {
  if (!patch.trim()) throw new Error("Codex produced an empty patch.");
  if (Buffer.byteLength(patch) > maxBytes) throw new Error("Patch exceeds the size limit.");
  if (/AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}|BEGIN (?:RSA |EC )?PRIVATE KEY/.test(patch)) {
    throw new Error("Patch contains a credential-like value.");
  }

  const paths = [];
  for (const line of patch.split("\n")) {
    const match = line.match(/^diff --git a\/(.+) b\/(.+)$/);
    if (!match) continue;
    for (const path of match.slice(1)) {
      if (path.startsWith("/") || path.split("/").includes("..") || path.startsWith(".git/")) {
        throw new Error(`Unsafe patch path: ${path}`);
      }
    }
    paths.push(match[2]);
  }
  if (paths.length === 0) throw new Error("Patch contains no file changes.");
  return paths;
}

export function validatePublicText(text, { maxBytes = 20_000 } = {}) {
  if (!text.trim()) throw new Error("Codex produced an empty response.");
  if (Buffer.byteLength(text) > maxBytes) throw new Error("Response exceeds the size limit.");
  if (/AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}|BEGIN (?:RSA |EC )?PRIVATE KEY/.test(text)) {
    throw new Error("Response contains a credential-like value.");
  }
  return text;
}

export function transitionFor(stage) {
  if (stage === "plan" || stage === "revise") {
    return { remove: ["needs-planning", "changes-requested", "blocked"], add: ["plan-ready"] };
  }
  return { remove: ["approved-for-build", "plan-ready", "blocked"], add: ["in-progress"] };
}
