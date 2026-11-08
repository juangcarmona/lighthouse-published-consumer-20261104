---
pdac-scope: cited
---

# Design

## Context

See proposal.md for motivation. The current classifier uses exact matching, and existing tests cover symbols and throwing objects separately. The issue requires their combined four-status case while retaining all 31 tests and production bytes.

## Goals / Non-Goals

**Goals:** One appended test that can fail on coercion, incorrect counters, reordered observations or replaced status identities.

**Non-Goals:** Production changes, new behavior, new dependencies, model edits, prior-plan edits or delivery-policy changes.

## Decisions

- Use primitive `passed` and `failed` controls, `Symbol("passed")` and a frozen object with a throwing `toString`. Count conversion calls and require zero rather than relying only on the absence of an exception; this also detects swallowed conversion failures. Exact classification follows BR-SUMMARY-001.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

- Freeze the inventory and each observation. Save observation references and property descriptors, then compare them and each original status after summarization. Use direct identity assertions rather than cloning: Symbols and method-bearing objects are not structured-cloneable. Check frozen state and literal counters under FR-SUMMARY-001.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

- Do not create a spec delta: no externally visible behavior changes. Preserve metadata and add only the no-spec marker.

## Risks / Trade-offs

- Accidental edits to existing tests → compare the entire original byte prefix and require exactly one appended test.
- Assertions accidentally coercing the object → use strict identity and descriptor comparisons, never string interpolation or conversion of statuses.
- Local verification mistaken for publication proof → retain local command receipts and explicitly defer named-branch validation and forge CI to the host.

## Migration Plan

No runtime migration or deployment is required. The appended test and this plan can be reverted together without changing production behavior.
