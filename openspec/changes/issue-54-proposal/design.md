---
pdac-scope: cited
---

# Design

## Context

See `proposal.md` for motivation and product-impact discovery. `summarize` already reads each observation's status and classifies only exact primitive `"passed"` and `"failed"` strings; all other requested statuses are unavailable. Keep that implementation unchanged.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

The result already has exactly four counters, and supplied contents, observation identities, order and frozen inputs must be preserved. Existing tests use `node:test`, `node:assert/strict` and frozen nested fixtures.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** One deterministic, append-only test that makes the requested counts and preservation guarantees explicit.

**Non-Goals:** Production edits, coercion or validation policy changes, new specifications, dependencies, model changes, prior-plan edits, architecture decisions or workflow changes. No public interface, stored-data or deployment effects.

## Decisions

1. **One mixed inventory, not ten isolated cases.** Use the fixed order `[true, false, 0, -0, NaN, Infinity, -Infinity, null, undefined, "", "passed", "failed"]`. Build twelve distinct observations, each with its own frozen `details` object containing a frozen `notes` array, and freeze the observations and inventory. Controls demonstrate recognized classifications in the same call; separate cases would not assert the requested combined result.
2. **Independent literal oracle.** Invoke `summarize` and use strict deep equality against exactly `{ total: 12, passed: 1, failed: 1, unavailable: 10 }`. Do not derive expected counters from production logic or accept only a subset of result fields. This characterizes the unchanged classification rule.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

3. **Capture references before the call.** Save the original ordered observations, statuses, details and notes references, plus independent content snapshots using `structuredClone` or explicit copies. Afterward assert length 12, identity at every inventory index, nested reference identity, unchanged contents and `Object.isFrozen` for the inventory, each observation, each details object and each notes array. Compare each scalar with `Object.is` or strict SameValue assertions, preserving `NaN` and distinguishing `-0` from `0`. JSON serialization is not a preservation oracle because it loses these distinctions. Freeze alone does not prove reference or content preservation.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

4. **No specification delta.** Remove the prior candidate's invented capability and repeated requirement rather than shorten and retain them. This replacement consists of three cited Markdown documents and the `skip_specs: true` payload only; the host retains ownership of final metadata.

## Risks / Trade-offs

- [Scalar oracle conflates unusual numbers] → Use SameValue semantics, never JSON or ordinary equality alone.
- [Snapshots miss replaced references or freeze regressions] → Combine independent contents, saved references and explicit frozen-state assertions at every nested level.
- [Checks reveal unrelated baseline failures] → Record failures and seek an authorized resolution; do not alter protected files or weaken checks.

## Verification and Migration Plan

Implement the single test slice, then execute the six admitted commands in `tasks.md` from the candidate repository, installation first. Preserve argv, exit status, output and candidate provenance. Agent fixture/scope observations supplement rather than replace these checks. No commands were executed by this proposal worker.

No migration or runtime rollout is needed. If rollback is authorized, remove only the appended test and this issue's newly introduced plan, preserving unrelated work. Host validation/materialization precedes implementation; authenticated host verification precedes publication, and configured forge CI for the exact published head follows separately. No unresolved design question affects implementation.
