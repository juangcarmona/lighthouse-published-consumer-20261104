# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #46 protects existing strict status classification against accidental coercion. Throwing object conversion hooks make that regression observable without changing product behavior.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Append characterization tests for object statuses with throwing `Symbol.toPrimitive` and throwing `toString`/`valueOf` hooks.
- Include primitive passed/failed controls, exact four-counter assertions, zero hook-call assertions and frozen input preservation checks.
- Preserve all 24 original tests and every production function body and export.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` found no accepted capabilities. This is coverage of existing behavior, not a requirement change. The supplied provider-owned `.openspec.yaml` already sets `skip_specs: true` and remains unchanged; no specification delta is appropriate.

## Product Dependencies

The complete product model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are unchanged dependencies: strict no-coercion classification, exact counters and input preservation. Inspection and impact traversal found only their shared dependency edge and no additional direct or transitive neighbours to include or exclude. There is no product-definition drift and no ProductShape apply is authorized.

## Impact

Only appended tests in `src/summary.test.mjs` and this issue's plan change. No API, runtime behavior, dependencies, accepted models, prior plans, tooling, workflow policies or customizations change. Completion requires all six supplied checks and append-only/scope verification. Independent host checks, PR CI and exact-head integration approval remain separate.
