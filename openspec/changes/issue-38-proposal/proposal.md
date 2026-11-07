# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #38 separates observation access from value classification so the private classifier has a single responsibility. This preserves the delivered summary behavior while making its read-once boundary explicit.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Pass the already-read status value from `summarize` to the private switch classifier.
- Add accessor and Proxy regressions that detect repeated status reads, and symbol/bigint unavailable cases.
- Preserve all existing assertions, exact four-counter results, frozen input support, references and order.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a behavior-preserving refactor. `openspec list --specs` found no accepted capabilities; `.openspec.yaml` sets `skip_specs: true` instead of adding a requirement or delta.

## Product Dependencies

The complete product model contains only BR-SUMMARY-001 and FR-SUMMARY-001. Both remain unchanged dependencies. Inspection and impact traversal found their mutual dependency and no other direct or transitive neighbours to include or exclude. No product-definition drift or ProductShape apply is needed or authorized.

## Impact

Only `src/summary.mjs`, `src/summary.test.mjs` and this issue's OpenSpec plan change. No public API, dependency, model, previous plan, tool, hook, workflow/check policy or customization changes. Completion requires additive tests and all six declared workspace checks; publication and independent verification belong to the host. Integration, original post-merge CI, final review and closure remain later workflow responsibilities, not implementation evidence.
