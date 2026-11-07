# Tasks

<!-- pdac-scope: cited -->

The classification and preservation constraints remain unchanged.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## 1. Document and Characterize Existing Behavior

- [x] 1.1 Add concise classifier/read-contract comments and append accessor/Proxy abrupt-failure tests; verify exception identity, one failing read, no later reads and frozen input preservation with the summary test suite, while retaining all existing cases and assertions.

## 2. Candidate Verification

- [ ] 2.1 Run all six supplied policy checks, strict OpenSpec validation and citation verification; retain completed command receipts and logs under `/output/evidence/`.
- [x] 2.2 Inspect the final diff to verify comments-only source changes, append-only test changes and permitted paths; record the evidence report and retrospective and return the implementation envelope.

Verification outcome: 24 tests and the installation, repository, Lighthouse, guard and citation checks passed. Strict OpenSpec validation failed because the marker-only `.openspec.yaml` lacks `schema`. The implement/propose skill requires exactly `skip_specs: true` and assigns provider metadata to the host, so that marker is preserved. Task 2.1 remains incomplete until the host supplies valid metadata and strict validation passes. No product requirement or delta is invented to bypass this failure.

## Workflow follow-up

- Host independently checks the candidate and publishes a fresh native implementation PR.
- Owner separately approves integration of its exact head; this stage grants no merge authority.
- Authorized later stages exercise original post-merge CI finishing during integration, retained-grant recheck, exactly one automatic final review and automatic issue closure without manual recovery substitutes.
- Preserve issue #38's pending trace and document its actual recovery mode from authoritative workflow evidence; that mode is not supplied in this implementation context.
