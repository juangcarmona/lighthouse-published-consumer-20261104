---
id: FR-SUMMARY-001
type: functional-requirement
title: Summarize supplied observations without changing them
status: draft
derived-from:
  - BR-SUMMARY-001
verification:
  - scenario: Empty input yields exactly total 0, passed 0, failed 0 and unavailable 0.
  - scenario: Two observations with exact passed statuses yield exactly total 2, passed 2, failed 0 and unavailable 0.
  - scenario: Two observations with exact failed statuses yield exactly total 2, passed 0, failed 2 and unavailable 0.
  - scenario: One passed status and one unknown status yield exactly total 2, passed 1, failed 0 and unavailable 1.
  - scenario: One passed, one failed, one unknown and one missing status yield exactly total 4, passed 1, failed 1 and unavailable 2.
  - scenario: An observation with no status yields exactly total 1, passed 0, failed 0 and unavailable 1.
  - scenario: Nonmatching strings and nonstring status values all contribute to unavailable without normalization or coercion.
  - scenario: Summarization preserves all input contents including nested contents, each observation identity and the original observation order.
  - scenario: Frozen input and frozen observations can be summarized with the same counts and without mutation.
uses-terms: []
provenance:
  source: https://github.com/juangcarmona/lighthouse-published-consumer-20261104/issues/12
  confidence: high
  recovered-from: documentation
---

## Requirement

The product MUST return a summary containing exactly the four fields total, passed, failed and unavailable. Total MUST equal the number of supplied observations, including observations with unknown or missing statuses. Passed, failed and unavailable MUST count observations according to BR-SUMMARY-001; their sum MUST equal total.

For empty input, all four fields MUST be present and equal zero. Summarization MUST preserve input contents, including nested contents, observation identities and observation order. It MUST also support frozen inputs and frozen observations without mutation.

This obligation does not establish an input validation policy or broaden the contract to invalid containers or invalid observation objects.

## Rationale

Consumers need an exact, predictable summary of every supplied observation without counting unavailable evidence as passing or changing the supplied evidence. These are the existing delivered outcomes being formalized, not new behavior.
