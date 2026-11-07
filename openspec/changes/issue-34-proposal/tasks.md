# Tasks

<!-- pdac-scope: cited -->

All work preserves exact classification and the four counters, input contents, identities, order and frozen-input support.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## 1. Classification refactor and regression coverage

- [x] 1.1 Replace the private conditional classifier with an explicit switch/default and append prototype-key and boxed-string tests, including frozen observations and identity/content checks; verify with `node --test src/summary.test.mjs` and preserve all original assertions.

## 2. Candidate verification

- [x] 2.1 Complete all six policy commands (dependency installation, repository verify, Lighthouse verify, guard verify, citation verify and strict OpenSpec validation); retain terminal receipts and logs in evidence, and inspect the diff for allowed scope and unchanged existing assertions.
- [x] 2.2 Deliver a check report, retrospective and implementation envelope with accurate task status; verify the evidence references and keep later-stage obligations explicit.

## Workflow follow-up

- Host independently checks and publishes a fresh implementation PR; publication is not an engine action.
- Wait for separately authorized integration, retain final review, and close the issue only through the workflow after original post-merge CI. No manual maintenance or review resignal is authorized here.
