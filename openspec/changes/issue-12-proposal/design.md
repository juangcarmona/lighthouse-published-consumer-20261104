# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation and the applied product prerequisite. The module currently compares `check.status` inside the accumulation loop. Nine tests already exercise exact output shape, strict classification, empty input, mutation protection and frozen inputs.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Isolate classification in one module-private function while retaining the current traversal, initial count object and public interface.

**Non-Goals:** No new validation, normalization, exports, data structures, product changes or configuration changes. No new spec-level behavior.

## Decisions

- Pass the observation into a private `classify` function and move the existing ordered comparisons there. Return only `passed`, `failed` or `unavailable`; accumulate using that returned key. This keeps strict matching and the original property-read order, including the second status read after a non-passed result. Passing a pre-read status would subtly alter accessor behavior; table lookup could coerce keys. Neither is needed.
- Preserve the existing count initialization and single forward loop. Reducing into a new structure adds churn without improving this extraction.
- Test through the public function, leaving the existing nine assertions and cases unchanged. The helper remains an implementation detail; do not export it for testing.

## Risks / Trade-offs

- [Classification accidentally normalizes statuses or changes fallback] → Move comparisons verbatim; run the existing strict matching and missing-status tests.
- [Input mutation or result shape changes] → Retain initialization and iteration, and run exact-result, identity/order and frozen-input tests.
- [Unrelated product or delivery artifacts change] → Inspect the final diff against the three allowed paths; leave the applied product files and all other plans intact.

## Migration Plan

No data or consumer migration. Run all policy checks and citation verification before delivery. Rollback, if needed, is a review-authorized reversal of this private extraction, with no model changes. Independent host checks, CI and merge approval remain subsequent work.
