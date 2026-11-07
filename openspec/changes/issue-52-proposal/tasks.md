# Tasks

<!-- pdac-scope: cited -->

The tests characterize the existing classification and input-preservation contract without changing it.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## 1. Characterize independent results

- [x] 1.1 Append the frozen mixed-inventory result-isolation case with exact counts, pairwise distinct results, caller mutation and input/nested preservation; verify with the Node summary test suite.
- [x] 1.2 Append a frozen empty-inventory control with independent zero-count results after a nonempty call and caller mutation; verify with the Node summary test suite and preserve all 28 original cases.

## 2. Verify the bounded candidate

- [x] 2.1 Run all six supplied policy checks, confirm append-only test changes and allowed-path scope, and retain completed receipts, a test report and retrospective under `/output/evidence/`.

## Workflow follow-up

- The trusted host independently checks and publishes the plan and tests together in one implementation PR.
- PR CI and separate owner approval of the exact head are required before integration; implementation does not authorize merge or ProductShape apply.
