---
pdac-scope: cited
---

# Proposal

## Why

Issue #59 requests a single characterization combining symbol and throwing-object statuses with primitive controls. This protects the existing no-coercion contract without changing production behavior.

## What Changes

- Append one frozen four-observation test with exact primitive `passed` and `failed` statuses, a Symbol status and a frozen object whose string conversion throws.
- Assert literal counters `{ total: 4, passed: 1, failed: 1, unavailable: 2 }`, no conversion calls, and preservation of inventory contents, order and status identities.
- Include this issue's plan; preserve the complete 31-test prefix and production source byte-for-byte.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` reported no specifications. This characterizes existing behavior rather than changing requirements; append `skip_specs: true` while retaining host-supplied metadata. No delta specifications are needed.

## Impact

Only `src/summary.test.mjs` and `openspec/changes/issue-59-proposal/` change. No API, dependency, accepted model, prior plan, tooling, hook or workflow changes are needed.

### Product dependencies

Read the complete two-artifact product model before drafting. BR-SUMMARY-001 requires exact primitive matching without coercion.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

FR-SUMMARY-001 requires four counters and preservation of input contents, identities, order and frozen observations.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

Impact discovery found these artifacts are each other's only direct neighbour, with no transitive neighbours. Both are included; none is excluded. No product drift or changed intent is proposed; model status is not implementation or approval evidence. No ProductShape apply is authorized.

## Delivery boundary

Execute all six supplied candidate checks and retain completed receipts. The host separately reruns checks on a clean candidate and validates the eventual named published branch; forge CI and later integration remain future requirements, not completed evidence or merge permission.
