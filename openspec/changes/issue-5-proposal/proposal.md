# Proposal

## Why

The consumer reports only total and passed observations, hiding the distinction between failed and unavailable evidence. Issue #5 requires callers to see both without treating unknown observations as successes.

## What Changes

- Extend the summary result to exactly `{ total, passed, failed, unavailable }`.
- Count only exact `passed` and `failed` statuses in their respective categories; count every other or missing status as unavailable.
- Preserve empty-input behavior with four zeros and leave input objects and order unchanged.
- Extend the existing regression assertions and cover homogeneous, mixed, missing-status and input-preservation cases.

## Capabilities

### New Capabilities

- `observation-summary`: Exact classification counts for supplied observations without modifying the inventory.

### Modified Capabilities

None. This repository has no existing OpenSpec capability inventory.

## Impact

The result object gains two enumerable fields, so exact-result consumers must update their expectations. Production and test changes are limited to `src/summary.mjs` and `src/summary.test.mjs`; planning stays in this issue's proposal root. No dependencies, I/O, provider integration, workflow, hooks, tools or guidance change.
