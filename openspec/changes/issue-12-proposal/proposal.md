# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #12 asks for a small separation of status classification from summary accumulation. The existing contract is now recorded by applied Product Change CHG-ISSUE-12-SUMMARY; this refactor preserves it without adding behavior.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Extract the existing exact status comparisons into one private helper.
- Keep summary accumulation, the sole public export, and all nine existing tests unchanged in behavior.
- Retain this issue's technical plan alongside the already applied Product Change. Do not modify accepted product files, dependencies, checks, hooks or unrelated plans.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a behavior-preserving refactor; `.openspec.yaml` sets `skip_specs: true`. No delta specification is appropriate. `openspec list --specs` found no accepted OpenSpec capabilities; issue #5's unarchived plan is not an accepted capability and remains untouched.

## Product Dependencies

The complete accepted model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are dependencies, not changes: exact classification, four output counts, empty input and input preservation remain intact. Impact inspection found only their mutual dependency edge and no additional neighbours to include or exclude. No product-definition drift is requested. The host-supplied continuation identifies the approved/applied prerequisite on PR #16; application does not authorize merge or prove implementation checks.

## Impact

Production changes are confined to `src/summary.mjs`. Existing public-behavior coverage in `src/summary.test.mjs` is sufficient and will be retained verbatim. No new exports, validation policy, I/O, HTTP/UI behavior, dependencies or architecture adoption. Planning files live only in `openspec/changes/issue-12-proposal/`.
