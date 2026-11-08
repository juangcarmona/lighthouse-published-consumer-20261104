---
pdac-scope: cited
---

# Tasks

## 1. Characterization and preservation

- [x] 1.1 Append one frozen four-status test with literal 4/1/1/2 counters, zero string-conversion calls, and preserved observation/status identities, descriptors, order and frozen state; verify the targeted test and complete 32-test suite pass.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

- [x] 1.2 Verify the original 31-test byte prefix and production source remain unchanged, exactly one test was appended, and the diff contains only allowed paths; retain the preservation report with this issue's plan.

## 2. Candidate verification

- [x] 2.1 Run all six supplied checks sequentially and retain terminal exit-zero receipts: `npm ci --ignore-scripts`, `npm run verify`, `npx --no-install lighthouse verify`, `node scripts/lighthouse-guard.mjs verify`, `npx --no-install prodshape citations verify --provider openspec --format json`, and `npx --yes --package=@fission-ai/openspec@1.15.0 openspec validate issue-59-proposal --strict --no-interactive`.
- [x] 2.2 Deliver the evidence report, concise retrospective and implementation envelope; verify receipt claims and distinguish current candidate checks from future host gates.

## Workflow follow-up

- The trusted host independently checks the clean candidate and validates the eventual conventional named published branch before publication.
- Forge CI, exact-head review and subsequent integration remain separate requirements; this implementation grants no merge authorization.
