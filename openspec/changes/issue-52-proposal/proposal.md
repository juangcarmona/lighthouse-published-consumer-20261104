# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #52 protects the current stateless summary behavior against accidental reuse of returned objects or counters. Existing tests do not explicitly check independence across calls after a caller mutates a result.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Append a mixed-inventory test checking exact four-field results and distinct identities across repeated calls, including after mutating the first result.
- Append an empty-inventory control checking independent zero-count results without retained state.
- Verify frozen input, observation order and identities, and nested contents and identities remain unchanged.
- Preserve all 28 existing cases, production bodies and exports.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` found no accepted capabilities. This change characterizes existing behavior without changing requirements; `.openspec.yaml` declares `skip_specs: true`. No specification delta is warranted.

## Product Dependencies

The complete model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are unchanged dependencies for classification, exact counts and input preservation. Inspection and impact traversal found only their shared dependency edge and no other direct or transitive neighbours to include or exclude. Result isolation characterizes the existing implementation within that contract; it does not broaden accepted product intent. No ProductShape apply or product-definition drift is involved.

## Impact

Only `src/summary.test.mjs` and this issue's OpenSpec plan change. Dependencies, accepted models, previous plans, tooling, hooks, workflow/check policy and customizations remain untouched. Completion requires the six supplied checks and append-only/scope verification. Host independent checks, PR CI and owner approval of the exact integration head remain separate.
