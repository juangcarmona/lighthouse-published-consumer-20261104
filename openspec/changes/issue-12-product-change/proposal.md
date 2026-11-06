<!-- pdac-scope: none reason="Initial formalization expressly authorized by issue #12: the accepted model contains no product text to consume; this proposal records the requested contract, not a dependency on an uncited accepted artifact." -->

# Formalize the existing observation summary contract

## Why

Issue #12 requests a behavior-preserving summary refactor but first authorizes a bounded ProductShape formalization of the already delivered summary contract. The accepted definition is only scaffold placeholders and does not express that contract. This changes the product definition, not application behavior; the later private-helper extraction is not this Product Change.

## Requested Product Intent

A summary has exactly total, passed, failed and unavailable. Total is the number of supplied observations. Each observation counts once: exact string passed contributes to passed, exact string failed contributes to failed, and every other or missing status contributes to unavailable. Empty input produces four zeros. Summarization preserves input contents, observation identities and order.

## Impacted Product Areas

No existing accepted artifacts are affected: the whole accepted model contains only .gitkeep files. The host-provided @prodshape/core 0.25.0 index reports artifacts: [] for baseline 704a79f6e2c3107ee2744a59dbd765cff53089273419a966653216a2783297b6. There are consequently no artifact inspection, impact or citation payloads to consume or wrap; none are invented.

Proposed additions are BR-SUMMARY-001 (status classification) and FR-SUMMARY-001 (summary result and input preservation), with the requirement derived from the rule. Neither is accepted product truth yet.

## Neighbours Checked and Left Out

There are no accepted graph nodes or neighbours. All actors, journeys, use cases, business rules, behaviours, domain terms, bounded contexts and functional, quality and constraint requirement directories were checked and contain only placeholders. Existing OpenSpec planning is not accepted truth and remains untouched.

## Clarification Report

The whole-model integrity pass was performed before intent and repeated before this first delta. The empty accepted graph cannot supply mechanical impact edges; the following are explicitly proposed relationships, not provider-discovered accepted relationships.

| Priority | Proposed node | Neighbour candidate | Relationship | Impact polarity | Classification | Mechanical reason |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | BR-SUMMARY-001 | FR-SUMMARY-001 | FR derived-from BR | Supporting | Affected | Each output category count depends on the exact status partition; normalization or coercion would change the counts. |
| 2 | FR-SUMMARY-001 | BR-SUMMARY-001 | derived-from | Constraining | Affected | Exact result shape, supplied count, empty result and preservation must coexist with the rule's exhaustive partition. |
| 3 | Both additions | Actor, journey, use-case and bounded-context categories | No accepted edges | None | Checked and unaffected | The request defines no persona, user journey, system boundary or additional interaction; introducing these would invent scope. |
| 4 | Both additions | Domain terms, structured behaviours, quality and constraint categories | No accepted edges | None | Checked and unaffected | Plain contract language and requirement verification scenarios express the entire bounded outcome; no independent glossary, example artifact or wider policy is needed. |

There are no uncertain accepted neighbours. No category is populated merely to fill the scaffold. Inline verification scenarios provide sufficient observable examples without another graph node.

## Refinement pass

Current queue: exact-candidate host validation and publication, followed by explicit owner decision. This is a new candidate under the host-assigned issue-12-product-change name; no existing change with that name was present.

Evidence: the provider index and all accepted model leaves were read. Existing summary source and nine test definitions corroborate the owner-stated contract; no tests were run. These are observations supporting the proposal, not accepted model authority. The installed ProductShape schema and templates determine artifact structure.

Ambiguity pass: strict equality versus normalized/coerced matching, supplied observations versus recognized-status-only totals, zero counts versus absent fields for empty input, and preserved versus reordered/replaced observations would yield different observable outcomes. Issue #12 and its authenticated scope select strict matching, all supplied observations, four explicit zero fields and full preservation. Handling invalid containers or invalid observation objects is not defined or broadened by this proposal.

Verbatim owner-authored scope: "The current summarize(checks) function returns exactly total, passed, failed and unavailable. total equals the supplied observation count; status passed and failed increment their corresponding counts; unknown or missing statuses increment unavailable. Empty input yields four zeros. The function preserves input contents, identities and order." No additional verified owner answers were supplied. This quoted request is not approval of the resulting candidate.

Checked-and-excluded candidates are recorded above. Recommendation: validate the two-node draft without expanding scope. Parked items and parked questions: none. Technical design and implementation are consciously outside this product candidate, not unresolved product decisions. No material product decisions remain unresolved for authoring; exact-proposal approval and provider apply remain separate future effects. Repeat the integrity pass against the current model before requesting approval.

## Open Questions for the Product Owner

None. The bounded outcome is selected by the authenticated request; this does not imply approval of this proposal.
