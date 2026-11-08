---
pdac-scope: cited
---

# Proposal

## Why

Issue #68 requests a single characterization combining callable and bigint statuses with primitive controls. It protects the existing no-coercion contract without changing production behavior.

## What Changes

- Append one frozen four-observation test using exact primitive `passed` and `failed`, a bigint, and a frozen callable with a throwing `Symbol.toPrimitive` hook.
- Assert literal counters `{ total: 4, passed: 1, failed: 1, unavailable: 2 }`, no invocation or conversion, and unchanged inventory and status identities.
- Preserve the complete 32-test prefix and all production code byte-for-byte; include only this issue's plan alongside the test.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` found no specs. This characterizes existing requirements, so no delta specification is appropriate. Append `skip_specs: true` while preserving host-supplied metadata.

## Impact

Only `src/summary.test.mjs` and `openspec/changes/issue-68-proposal/` change. No API, dependency, product model, prior plan, provider scaffold, hook, tooling or workflow change is needed.

### Product dependencies

The complete product model contains two artifacts. BR-SUMMARY-001 requires exact primitive matching without coercion.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

FR-SUMMARY-001 requires four counters, unchanged contents, observation identities and order, and frozen-input support.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

Impact discovery found each artifact is the other's only direct neighbour, with no transitive neighbours. Both are included; no neighbours were excluded. No changed product intent or ProductShape apply is proposed. Model status is not delivery or approval evidence.

## Delivery boundary

Run all six supplied candidate checks through the managed command slot and retain completed receipts. Independent clean-candidate checks, the eventual published branch guard, forge CI and later review/integration remain host gates after this stage; none is claimed complete or grants merge permission. The issue's transport-control qualification grants no additional implementation scope.
