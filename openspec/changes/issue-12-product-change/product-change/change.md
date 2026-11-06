---
id: CHG-ISSUE-12-SUMMARY
type: product-change
title: Formalize the existing observation summary contract
status: applied
base-revision: '8a2c240'
operations:
  add:
    - BR-SUMMARY-001
    - FR-SUMMARY-001
  modify: []
  remove: []
---

## Problem

The accepted product definition is an empty scaffold and does not express the already delivered observation summary contract. There is no existing accepted artifact to evolve.

## Intended Product Outcome

The product definition expresses a summary containing exactly total, passed, failed and unavailable, counting every supplied observation once using exact passed/failed status matching and an unavailable fallback. Empty input yields four zeros. Input contents, observation identities and order are preserved.

## Rationale

Issue #12 authorizes recording this bounded existing behavior before a separate behavior-preserving refactor. Its owner-authored request states: "The current summarize(checks) function returns exactly total, passed, failed and unavailable. total equals the supplied observation count; status passed and failed increment their corresponding counts; unknown or missing statuses increment unavailable. Empty input yields four zeros. The function preserves input contents, identities and order."

The authenticated parent scope additionally selects strict status matching. The classification rule and derived summary obligation capture that outcome without inventing personas, boundaries or input policies. Request authorization is not approval of this exact proposal.

## Affected Product Areas

- BR-SUMMARY-001: exhaustive observation status classification.
- FR-SUMMARY-001: summary counts, exact output shape, empty input and input preservation.

## Open Questions

None. No product-semantic decisions are parked. Explicit approval of this exact candidate remains a separate gate.

## Product Acceptance

- Only exact string passed is counted as passed and only exact string failed as failed; all other or missing statuses are unavailable.
- The result has exactly total, passed, failed and unavailable; total equals the supplied observation count and the three classification counts sum to total.
- One passed, one failed, one unknown and one missing status produce total 4, passed 1, failed 1 and unavailable 2.
- Empty input yields total 0, passed 0, failed 0 and unavailable 0.
- Input contents, observation identities and order remain unchanged, including when supplied inputs are frozen.
- These obligations describe existing behavior, not a new behavior or validation policy.

## Out of Scope

No new exports, input validation policy, HTTP or UI behavior, dependencies, check changes, architecture adoption or technical implementation. Actors, journeys, use cases, domain terms, bounded contexts, separate structured behaviours, quality requirements and constraints were checked and excluded because the bounded contract requires no additional outcome in those categories. There are no accepted neighbours to alter or remove.

No direct accepted-model edits, product approval, provider apply, branch publication, merge, release or delivery continuation are performed here. Existing planning and the original issue, single delivery PR and continuation identities remain host-owned and unchanged.
