# Tasks

<!-- pdac-scope: cited -->

The regression qualifies exact status classification and preservation of frozen supplied observations under the existing contract.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## 1. Characterization test and plan

- [x] 1.1 Complete this issue's proposal and design with provider-generated citations and no spec-level change; verify the provider inventory and inspection/impact reports and preserve host metadata with `skip_specs: true`.
- [x] 1.2 Append exactly one inherited non-enumerable primitive-status test, checking literal counters, zero own statuses, frozen objects, descriptors, order and identities; verify it passes through `npm run verify` and the original file remains an exact byte prefix.

## 2. Candidate verification

- [x] 2.1 Revalidate all six policy commands (installation, consumer verify, Lighthouse verify, guard verify, ProductShape citation verify and strict implementation-plan check); retain current completed exit-zero receipts, scope/prefix evidence and the retrospective under `/output/evidence/`.
- [x] 2.2 Validate current product-derived external evidence using `prodshape evidence verify`, confirm current citations and record its completed result with source and model identities under `/output/evidence/`.

Historical attempt: all six declared checks were reported passed, but additional product-derived external evidence validation was blocked by v1alpha1 configuration and the provider's v1alpha2 evidence integration (PRODUCT050), including with explicit v1alpha2 selection. Native run `44405954883` remains failed, including its missing-input host error. The owner reports preparation corrected in merged #81; the current source uses v1alpha2. This attempt retains those original outcomes and records fresh verification separately, without changing provider configuration.

Current attempt: all 36 tests pass, including the retained inherited-status test. External evidence validation passes with a current FR-SUMMARY-001 citation and no diagnostics. Product validation reports zero errors and the pre-existing PRODUCT103 unreachable-actor warning; no model changes are made. All six policy checks have current exit-zero receipts in `/output/evidence/commands/`.

Preservation: the complete seeded test, its pre-existing prefix, production modules and host metadata remain unchanged against the candidate snapshot. A supplemental attempt to compare against the original source revision failed because that history is absent from this snapshot; its receipt is retained, not counted as a passing source check. The host supplied the seed's source/base verification and independently rechecks the candidate before publication.

## Workflow follow-up

- The host independently rechecks the candidate and publishes the plan and test together for review.
- The operator reviews the exact candidate head before any separately authorized merge; no ProductShape apply or protected acceptance is authorized here.

## Operator-assisted recovery

Native run `44410610359` completed the six declared commands but failed before validated publication because its instruction-review report named an ignored installed-package README as a candidate source. The original run remains failed. This change retains its test and plan source, with all earlier test bytes and production files unchanged. The operator reran consumer, Lighthouse, guard, citation and strict OpenSpec checks for this recovery candidate and will review the exact PR head before merge. No successful native assessment, protected acceptance or broader authority is asserted by this recovery.
