---
pdac-scope: cited
---

# Design

## Context

See proposal.md for motivation and scope. The existing suite has 32 tests; production classification uses strict string matching. The design must make accidental callable invocation or conversion observable without modifying production.

## Goals / Non-Goals

**Goals:** One appended test with literal expected counts and direct identity/descriptor checks on frozen input.

**Non-Goals:** New runtime behavior, product requirements, dependencies, harness controls or workflow changes.

## Decisions

- Use statuses `["passed", "failed", 1n, callableStatus]`. Freeze the callable after attaching a throwing `Symbol.toPrimitive` hook. Both its body and hook increment separate counters then throw, so neither can run unnoticed. Strict classification of unusual values follows BR-SUMMARY-001.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
- Freeze every observation and the inventory. Snapshot references and property descriptors before summarization; compare each observation and status directly afterward, plus inventory and callable descriptors. This avoids serialization or cloning, which cannot faithfully snapshot functions, while checking FR-SUMMARY-001's preservation contract.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->
- Assert the four counters literally instead of deriving expectations from classification logic. Leave bigint primitives untouched; do not modify built-in prototypes to instrument them. The callable hook detects coercive classification paths, while the bigint confirms unavailable classification and identity preservation.
- Keep the original test bytes as a prefix. Verify preservation and allowed scope with a separate evidence check, not by changing repository tooling.

## Risks / Trade-offs

- Function values cannot be structured-cloned → use strict identity and descriptor snapshots instead.
- A passing characterization does not prove every possible coercion implementation absent → combine throwing hooks, zero-call assertions, exact counts and unchanged production source.
- Local receipts do not prove publication or forge CI → retain those as subsequent host gates.

## Migration Plan

No runtime migration is needed. Rollback removes only the appended test and this issue's planning artifacts.
