# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation and scope. The summary reads each observation's status through ordinary property lookup, which already includes inherited non-enumerable properties. Existing coverage ends with own non-enumerable statuses; this test adds the inherited case without modifying that coverage.

## Goals / Non-Goals

**Goals:** Verify exact classification and preservation for a frozen prototype-backed fixture using independent literal expected counters.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

**Non-Goals:** Change classification, define invalid-input behavior, migrate the model, add specs or dependencies, or alter production code.

## Decisions

- Define each prototype's status with `Object.defineProperty`, explicitly setting non-enumerable and read-only flags, then freeze it. Freeze an observation created with each prototype and freeze the inventory. Avoid global prototype edits or accessors: the requested case is primitive data properties.
- Retain independent arrays of observations, prototypes and descriptor snapshots before summarization. Afterwards compare each inventory slot and prototype by identity, check zero own status properties, unchanged descriptors and values, and all frozen states. A cloned snapshot alone would lose prototype and descriptor evidence.
- Append exactly one named test using the file's existing Node test/assert style. Verify the old file as an exact byte prefix, rather than relying only on a textual diff.
- Use a unit test because the outcome is wholly inside the supplied-observation summary boundary; no browser or service integration is involved.
- Reuse the owner-admitted seed test unchanged, rather than appending a duplicate. Verify its complete bytes and single-test suffix against the retained candidate snapshot, run the current checks, and validate external evidence against the current v1alpha2 model. The host checks the seed's original source prefix and rechecks it before publication; the disposable workspace has no original source history. Keep historical failures distinct from this attempt's results; do not repair provider scaffolds in this scope.

## Risks / Trade-offs

- [Ordinary deep equality can hide prototype-property loss] → Explicitly assert prototype identities, own-property absence and inherited descriptor values and flags.
- [A test-only change could accidentally rewrite existing coverage] → Check the exact source prefix and allowed-path diff after implementation.
- [Passing local checks might be mistaken for delivery approval] → Retain receipts and distinguish host rechecks, forge CI and owner exact-head review from this stage.

## Migration Plan

No runtime migration. Deliver the test and plan in one reviewable PR; reverting the appended test and this plan removes the change without affecting production behavior.
