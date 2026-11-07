# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #49 protects the existing per-occurrence observation behavior when inventory entries share an identity. Distinct-object tests do not detect accidental identity-based caching of status reads.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Append accessor and Proxy characterization cases with three references to the same frozen observation in a frozen inventory.
- Return `passed`, `failed` and `undefined` on successive status reads; assert exactly three reads in occurrence order and all four counters.
- Check identities, descriptors, nested contents and inventory order without reading status during preservation assertions.
- Preserve all 26 existing tests and all production function bodies and exports.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` found no accepted capabilities. This is coverage of existing behavior, not a requirement change. The supplied provider-owned `.openspec.yaml` already sets `skip_specs: true` and remains unchanged; no specification delta is appropriate.

## Product Dependencies

The complete product model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are unchanged dependencies for per-observation classification, exact counters and input preservation. Inspection and impact traversal found only their shared dependency edge, with no additional direct or transitive neighbours to include or exclude. No product-definition drift or ProductShape apply is involved.

## Impact

Only appended tests in `src/summary.test.mjs` and this issue's plan change. APIs, runtime behavior, dependencies, accepted models, prior plans, tooling, workflow/check policies and customizations remain unchanged. Completion requires the six supplied checks and append-only/scope verification. Host rechecks, PR CI and exact-head integration approval remain separate.
