# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. The private classifier currently uses strict comparisons in an if/else chain; summary accumulation already returns the required four fields. The full product model and dependency graph contain only the two artifacts below.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Keep the classification domain closed to passed, failed and unavailable; verify object preservation with the newly requested edge cases.

**Non-Goals:** New exports, output fields, coercion, normalization, input validation, changed product intent or getter evaluation guarantees for arbitrary stateful accessors. No ProductShape apply or merge.

## Decisions

- Switch on `check.status` with literal `passed` and `failed` cases and a default returning `unavailable`. Switch matching is strict, so boxed strings cannot enter primitive buckets. Prefer this over a property lookup table, which would require extra safeguards for inherited keys; retaining conditionals would not meet the requested refactor.
- Leave accumulation and the public interface untouched. Return only fixed bucket names, never status-derived property keys.
- Append table-driven tests, preserving all existing assertions. Check each prototype-key and boxed-string value separately, then a frozen mixed inventory with primitive controls. Compare contents to snapshots, assert original observation and status identities and order, and freeze boxed values as well as their containing observations.
- No delta specifications: the change exercises the existing contract rather than defining new behavior. Bind all planning documents to the unchanged canonical artifacts.

## Risks / Trade-offs

- Accidental coercion or inherited-property classification → explicit switch plus per-value regression assertions.
- Mutation or replacement hidden by equal totals → frozen inputs, content snapshots and strict identity assertions.
- Scope creep through generated provider files → change only the three allowed paths and inspect the final diff.

## Migration Plan

No data migration or dependency change. Deliver source, additive tests and this plan in one PR. Reverting this refactor restores the prior conditional chain without changing the contract. The host owns publication, separately authorized integration and subsequent review/CI; workspace checks do not claim those later receipts.
