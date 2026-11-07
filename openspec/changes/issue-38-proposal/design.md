# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. The current private switch reads `check.status` once. Accumulation already returns exactly the accepted four counters and does not mutate inputs.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Make observation access the responsibility of the summarization loop; classify only its captured value and guard the existing read-once behavior with tests.

**Non-Goals:** New exports, coercion, normalization, invalid-input handling, changed exception behavior, product changes or workflow changes. Implementation does not authorize apply or merge.

## Decisions

- Read `check.status` into a local constant in the loop and pass it to `classify(status)`. Prefer an explicit local over an inline argument to make the read boundary easy to inspect. Keeping observation access inside the helper would not meet the issue.
- Retain the strict switch cases and fixed bucket names. Lookup tables and string conversion add unnecessary inherited-key or coercion risks.
- Append tests without modifying existing assertions. Exercise passed, failed and unavailable values through both getters and Proxies, including a missing Proxy property. Per-observation counters reject repeated reads; a trace verifies traversal order. Freeze inventories and targets, then verify observation and nested references without rereading status in assertions.
- Test symbols named after successful statuses and bigint values individually as unavailable, with primitive passed/failed controls in a frozen mixed inventory.
- Keep specs unchanged using `skip_specs: true`; cite the unchanged product contract in planning documents.

## Risks / Trade-offs

- Tests accidentally reread a stateful status → verify separate counters and descriptors or target data, not the observed status accessor.
- Equal totals hide repeat reads or reordering → assert individual read counts and ordered access traces.
- Symbol coercion or nonprimitive matching → retain strict switch semantics and existing boxed-string tests.
- Scope creep into workflow acceptance → leave later integration and automatic continuation checks to their authorized stages.

## Migration Plan

No data migration or installation changes. Deliver the plan, source and additive tests in the same PR. Reverting the two source edits restores the prior private interface without changing public behavior. Independent host checks precede publication; exact-head integration approval and subsequent CI/review are separate.
