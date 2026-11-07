# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #34 requests an explicit switch for summary classification, making the default unavailable bucket clear without changing the accepted contract. Regression tests will protect exact matching against prototype-key strings and boxed strings.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Replace the private classifier's conditional chain with an explicit switch and default unavailable bucket.
- Append tests for `__proto__`, `constructor`, `toString` and boxed strings, including frozen inventories and observations, input contents and identities.
- Preserve every existing test assertion, the four exact counters and the public export.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. No spec-level behavior changes; `.openspec.yaml` sets `skip_specs: true` instead of inventing a delta. `openspec list --specs` found no accepted capabilities. Existing unarchived plans remain untouched.

## Product Dependencies

The whole product model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are unchanged dependencies: exact status classification, four counters and input preservation. Impact inspection found only their mutual dependency relationship, with no other direct or transitive neighbours to include or exclude. No product-definition drift or ProductShape apply is requested or authorized.

## Impact

Only `src/summary.mjs`, `src/summary.test.mjs` and this issue's plan change. No dependencies, accepted models, prior plans, architecture, tools, hooks or workflow/check policy change. Definition of Done: additive edge-case tests and all declared workspace checks pass; the host independently verifies and publishes the same candidate. Integration, final review and original post-merge CI remain later workflow responsibilities.
