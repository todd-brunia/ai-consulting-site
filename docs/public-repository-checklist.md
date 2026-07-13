# Public Repository Checklist

This checklist covers the one-time public release and the controls that must
remain in place afterward. Public visibility is durable: clones, caches, and
indexes can preserve content even if visibility is later restricted.

## Pre-publication audit

Verified on July 12, 2026, before the repository visibility change:

- The current tree and all reachable Git history were scanned with gitleaks
  8.30.1 using full redaction. No secrets were reported.
- Available GitHub Actions logs were scanned with the same tool. No secrets
  were reported.
- GitHub reported no stored Actions artifacts.
- No historical Git blobs larger than 1 MB were present.
- Tracked files, branches, commit subjects, commit author identity, issue and
  pull request content, workflow-run metadata, and deployment metadata were
  reviewed for unintended disclosure.
- The owner approved public exposure of the existing author identity and
  repository history.
- `.gitignore` excludes environment files, private keys, Vercel state,
  dependencies, build output, coverage, and common debug logs.
- The owner selected the MIT License, a demonstration-only contribution
  posture, and GitHub private vulnerability reporting.

If a later review finds a credential or confidential content, stop publication
or public development. Revoke or rotate affected credentials before any
cleanup. Removing a file from the current tree does not remove it from Git
history; history remediation requires a separately approved plan because it
disrupts clones and may require force updates.

## Publication sequence

1. Merge the approved preparation pull request while the repository remains
   private, after `validate` and the Vercel deployment succeed.
2. Pause concurrent repository changes.
3. Have the human owner change repository visibility to public and accept
   GitHub's visibility warning.
4. Immediately create a branch ruleset or branch protection for `main` that:
   - requires pull requests;
   - requires the `validate` status check;
   - requires branches to be current before merge;
   - blocks force pushes and branch deletion; and
   - grants no bypass to Codex or another automated actor.
5. Enable GitHub private vulnerability reporting.
6. Set and verify repository metadata:
   - description: `AI consulting website and a practical, human-gated Codex maintenance workflow.`
   - homepage: `https://ai-consulting-site-pied.vercel.app`
   - topics: `ai-consulting`, `codex`, `nextjs`, `typescript`,
     `human-in-the-loop`, and `ai-assisted-development`
7. Confirm Actions remains enabled. The validation workflow must retain only
   `contents: read`; do not expose deployment or write credentials to pull
   requests from forks.
8. Confirm Vercel still treats `main` as Production and review how it handles
   untrusted fork previews before authorizing one.

## Signed-out verification

After publication, use a signed-out browser session and GitHub's API/settings
to confirm:

- the repository is public and `main` is the default branch;
- the README, MIT License, security policy, and documentation links render;
- private vulnerability reporting opens a private advisory rather than a
  public issue;
- the intended issue forms and pull request template are available;
- the required branch rule is active and has no automated bypass;
- Actions is enabled and no unexpected artifacts are downloadable;
- the production site is reachable; and
- the next approved pull request runs `validate` and receives the intended
  Vercel Preview without exposing secrets.

Record post-publication settings evidence in issue #6. Do not create or merge a
synthetic code change solely to test these controls.
