# Tasks

<!-- pdac-scope: cited -->

The tasks preserve exact classification and input-preserving summary behavior.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## 1. Classification boundary and regression coverage

- [x] 1.1 Move the single status read into summarize, pass the value to the private classifier, and append getter/Proxy read-once and symbol/bigint tests; verify exact counters, frozen input support, references and access order with the summary tests while preserving all previous assertions.

## 2. Candidate verification

- [x] 2.1 Run all six policy commands to completed successful receipts, inspect the allowed-path diff, and retain check reports and a retrospective; verify planning citations and strict OpenSpec validation without changing prior plans or accepted models.

## Workflow follow-up

- The host independently verifies and publishes a fresh implementation PR.
- Integration requires separate authorization of the exact head.
- The original post-merge CI must automatically lead to final review and issue closure; no manual dispatch, rerun or repeated merge/apply is accepted as a substitute. This later-stage acceptance is not claimed here, and issue #34's blocked trace is not reused.
