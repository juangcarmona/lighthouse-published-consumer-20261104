# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. The current classifier matches only primitive strings using a switch. The existing 24 tests cover boxed strings and other nonmatching values, but not objects whose conversion would throw.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Distinguish classification from conversion, prove zero conversion-hook calls, and retain frozen inventory, observation, status and nested-content identities.

**Non-Goals:** Alter production functions, define invalid-input handling, introduce product requirements, apply ProductShape or authorize integration.

## Decisions

- Append two cases using a small parameterized test loop: one object with throwing `Symbol.toPrimitive`, and one with throwing `toString` and `valueOf`. Each hook increments its own counter before throwing. Returning a matching string instead was rejected because a thrown error makes accidental conversion fail immediately; counters also explicitly establish that neither legacy hook ran.
- Place each object between primitive `passed` and `failed` controls in a frozen inventory. Assert exactly `{ total: 3, passed: 1, failed: 1, unavailable: 1 }`, preventing a blanket unavailable classifier from passing.
- Freeze statuses, observations, nested details and notes. Save identities and property descriptors before summarizing; compare them afterward and assert nested contents. Do not use `structuredClone` on function-bearing fixtures, since it cannot clone hooks. Avoid string interpolation of object statuses in test names or diagnostics.
- Keep specifications absent: the provider metadata opts out for this test-only change. Preserve its schema and creation date byte-for-byte.

## Risks / Trade-offs

- [Fixture setup accidentally converts the object] → Use explicit primitive test labels and never stringify statuses.
- [Mutation assertions miss nested changes] → Check frozen state, descriptors, identities and explicit note contents.
- [Coverage expands beyond the requested engineering change] → Preserve the original test-file prefix and verify that only allowed paths differ.

## Migration Plan

No runtime migration is needed. The host publishes plan and tests together; reverting only these appended cases and this plan would remove the added coverage. Integration still needs separate approval of the exact PR head.
