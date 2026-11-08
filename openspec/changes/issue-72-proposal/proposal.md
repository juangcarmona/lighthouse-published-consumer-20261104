---
pdac-scope: cited
---

# Proposal

## Why

Issue #72 asks for evidence that opaque proxy and null-prototype object statuses remain unavailable without inspection or coercion. A single characterization test protects the accepted behavior without changing production code.

## What Changes

- Append one frozen four-item inventory test with primitive `passed` and `failed`, a frozen opaque object proxy, and a frozen null-prototype object.
- Assert literal counters `{ total: 4, passed: 1, failed: 1, unavailable: 2 }`, zero proxy property accesses, and unchanged inventory, observation and status identities.
- Preserve all 33 prior tests as an exact byte prefix and preserve production code exactly.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This characterizes existing behavior rather than changing requirements. `openspec list --specs` found no specifications; no delta spec is warranted. Append `skip_specs: true` to the host-supplied metadata without altering its existing fields.

## Impact

Only `src/summary.test.mjs` and this issue's plan change. No APIs, dependencies, accepted models, previous plans, provider scaffolds, guidance, tooling, hooks or workflow policies change.

### Product dependencies

The complete product model contains two artifacts. BR-SUMMARY-001 requires exact primitive status matching without coercion.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

FR-SUMMARY-001 requires the four counters, frozen-input support and preservation of contents, observation identities and order.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

Impact inspection found each artifact is the other's only direct neighbour, with no transitive neighbours. Both are included; no neighbours were excluded. There is no product-definition drift and no ProductShape apply is needed or authorized. Model status is not delivery evidence.

## Delivery boundary

Run all six supplied candidate commands through the managed command slot and retain completed receipts. Host clean-candidate checks, published-branch validation, forge CI, integration and final review remain subsequent gates. The later Lighthouse #567 transport-pause qualification is operator work after integration and grants no implementation permission.
