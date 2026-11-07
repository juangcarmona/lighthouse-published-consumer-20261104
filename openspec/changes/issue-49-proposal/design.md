# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. Existing tests cover single reads of distinct accessor/Proxy observations, but not repeated identities. The current summary loop reads status once for each inventory occurrence.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Detect identity-based deduplication or caching, multiple reads per occurrence and mutation, with two deterministic characterization cases.

**Non-Goals:** Change production behavior, define invalid-input handling, alter product requirements, apply ProductShape or authorize integration.

## Decisions

- Append a parameterized accessor/Proxy loop, producing two tests. Each fixture records the occurrence index and returned value for successive reads of `passed`, `failed` and `undefined`. An over-read fails immediately; final assertions also detect under-reading. Assert exactly `{ total: 3, passed: 1, failed: 1, unavailable: 1 }`.
- Repeat the same observation three times in a frozen array. Use a frozen getter-bearing object for the accessor case. For the Proxy case, intercept only `status` and forward other reads through `Reflect.get`; use a frozen target with no own `status` property. A frozen non-writable status data property was rejected because returning changing values would violate Proxy invariants.
- Snapshot inventory and observation property descriptors before summarizing. Afterward compare descriptors, array length, each entry identity, frozen state and nested details/notes identities and contents. Do not deep-compare or clone the whole observation, as that could invoke its status getter. Reassert the read count and trace after preservation assertions to prove they performed no status reads.
- Preserve the supplied metadata byte-for-byte. No specs are created because behavior and requirements do not change.

## Risks / Trade-offs

- [Assertions themselves consume status] → Inspect descriptors and explicit non-status data only; repeat the trace assertion at the end.
- [Three identical entries cannot reveal a permutation of identical references] → Assert index descriptors and reference identity at every position, plus sequential read trace and exact counters.
- [Unintended scope expansion] → Verify the original test-file prefix and all tracked changes against the allowed paths.

## Migration Plan

No runtime migration is needed. Publish plan and tests together through the trusted host. Removing only the appended cases and this plan removes the new coverage. Integration requires separate approval of the exact head; implementation authorizes neither ProductShape apply nor merge.
