---
pdac-scope: cited
---

# Proposal

## Why

Issue #54 requests one complete frozen mixed-inventory characterization of numeric, boolean, nullish and empty-string statuses. Existing coverage does not exercise that exact matrix and its preservation guarantees together.

## What Changes

- Append one test in `src/summary.test.mjs` covering `true`, `false`, `0`, `-0`, `NaN`, `Infinity`, `-Infinity`, `null`, `undefined` and `""`, plus primitive `"passed"` and `"failed"` controls.
- Assert exactly `{ total: 12, passed: 1, failed: 1, unavailable: 10 }` and preserve inventory order, observation and nested identities, original scalar values, nested contents and frozen state.
- Deliver only this issue's plan alongside the appended test; preserve every existing test and production function body.

## Capabilities

### New Capabilities

None. This is characterization of existing behavior, not a new behavior contract.

### Modified Capabilities

None. The source-bound inventory in `context.proposal.discovery` contains no specifications. No specification delta is needed; `.openspec.yaml` supplies only `skip_specs: true`, which the host combines with provider-owned metadata.

## Impact

Application changes are limited to appending coverage in `src/summary.test.mjs`; plan changes are limited to `openspec/changes/issue-54-proposal/`. No API, production code, dependency, persistence, architecture, tooling, hook or check configuration changes are proposed. Prior plans and canonical models remain untouched.

### Product dependencies and impact discovery

The complete host-reported product inventory contains two artifacts, both read before drafting. BR-SUMMARY-001 grounds exact primitive classification without normalization or coercion; it is an unchanged dependency.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

FR-SUMMARY-001 grounds exactly four counters and preservation of contents, identities, order and frozen inputs; it is also an unchanged dependency.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

The prepared impact reports identify each artifact as the other's only direct neighbour and report no transitive neighbours. Both are included; no reported neighbour is excluded. Their recorded draft status grants no product approval. No product-definition drift or altered behavior is proposed, so no Product Change, ProductShape apply or product approval is requested. Architecture remains under its installed authority without edits or inferred decisions.

## Delivery Boundary

Implementation must execute all six checks listed in `tasks.md`, retain candidate-bound receipts and perform the separate scope and fixture observations. This proposal has not executed those checks. The trusted host validates and publishes through the admitted workflow; subsequent independent verification and exact-head forge CI remain separate evidence, not merge or release permission.
