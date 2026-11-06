# Design

<!-- pdac-scope: cited -->
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Context

See proposal.md for motivation. The current pure `summarize(checks)` function returns total and passed counts using an exact status comparison. The inventory contains observation objects; missing status properties are supported. Null inventory entries and malformed non-array inputs are outside this issue's contract.

## Goals / Non-Goals

**Goals:** Return the four fields in a fresh object, classify each observation once, and preserve object identities, values and inventory order.

**Non-Goals:** Normalize statuses, validate arbitrary inputs, introduce dependencies or I/O, or change provider scaffolds and repository checks.

## Decisions

- Use a single loop with exact `===` comparisons for `passed` and `failed`, followed by an unavailable fallback. This directly expresses the three mutually exclusive categories without repeated filtering or temporary arrays. Repeated filters would work but inspect observations multiple times.
- Keep total equal to the inventory length and initialize all category counts to zero. Empty input therefore needs no special branch.
- Retain both existing exact-result assertions with the new fields. Add all-passed, all-failed, mixed, missing-status and strict-classification cases. Compare a nested input snapshot after summarizing and assert original object order and identities; also exercise frozen objects and inventory to catch mutation attempts.

## Risks / Trade-offs

- [Exact result assertions downstream need two additional fields] → Explicitly document the result shape and update both existing tests without weakening their original expectations.
- [Unexpected statuses accidentally count as passed or failed] → Test case variants, empty strings, null, undefined and non-string statuses as unavailable.
- [Mutation hidden by equal-looking replacement objects] → Test values, identity and order as well as frozen input.

## Migration Plan

Deliver the plan, source and tests in one implementation PR. Run all declared checks and strict validation before handoff; the host independently checks the candidate before publication. Integration and post-integration acceptance require their separate authorization and evidence. Rollback, if separately authorized, restores the previous two-field implementation and matching expectations together.
