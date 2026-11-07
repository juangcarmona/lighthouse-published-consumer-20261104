# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. `summarize` currently allocates a four-counter object per invocation. The existing Node test suite contains 28 cases and already uses frozen fixtures and identity assertions. Classification and input preservation remain governed by the unchanged product model.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Detect shared result objects, retained counters and input mutation using deterministic synchronous tests.

**Non-Goals:** No production changes, new input-validation policy, new product requirement, dependency change or ProductShape apply.

## Decisions

- Append two standalone cases rather than refactoring existing tests. This preserves author-owned assertions and makes the new coverage easy to review.
- Use a deeply frozen mixed inventory with passed, failed, unknown and missing statuses. Capture a content snapshot and observation/nested references before calling. Exact deep equality checks all four fields and rejects extra fields; strict identity assertions detect result reuse even if counters are reset between calls.
- Obtain two results, mutate every counter of the first, then verify the second and a third call still match the expected counts. Compare all result identities and confirm the first retains the caller's mutation after the third call. This catches reuse/reset behavior that value-only assertions would miss.
- Repeat the sequence with a frozen empty array. Seed that test with a nonempty call to expose retained state even without relying on test execution order. Check the empty input's contents, descriptors and frozen state.
- Do not add spec deltas: tests characterize existing behavior and no requirement changes. Preserve host metadata and append only the opt-out field.

## Risks / Trade-offs

- [Frozen input could mask silent writes] → Also compare contents, descriptors, observation order and nested references after all calls.
- [Exact-value checks alone miss object reuse] → Assert pairwise distinct identities and preservation of the caller-mutated result.
- [Coverage does not prove every possible input] → Keep bounded mixed and empty controls; existing classification and access tests remain intact.

## Migration Plan

No runtime migration or deployment change. Reverting only the appended tests and this plan removes the change. Publication and integration remain host/owner actions after independent verification.
