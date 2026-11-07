---
id: BR-SUMMARY-001
type: business-rule
title: Classify observation statuses exactly
status: draft
applies-to: []
uses-terms: []
provenance:
  source: https://github.com/juangcarmona/lighthouse-published-consumer-20261104/issues/12
  confidence: high
  recovered-from: documentation
---

## Rule

Each supplied observation MUST contribute to exactly one classification count: passed if its status is exactly the string "passed", failed if its status is exactly the string "failed", and unavailable otherwise, including when the status is missing. Matching MUST NOT normalize case, trim whitespace or coerce other values into those strings.

## Rationale

Only explicitly passed observations provide passing evidence. Unknown or missing evidence must not be represented as passed or failed.

## Examples

- Status "passed" contributes one to passed.
- Status "failed" contributes one to failed.
- Status "unknown" or an absent status contributes one to unavailable.
- Status values "Passed", "FAILED", " passed", "failed ", the empty string, null, undefined, true, 1 and an object containing a value of "passed" each contribute one to unavailable.

## Exceptions

None within the supplied-observation contract. This rule does not define input validation or handling of invalid containers or invalid observation objects.
