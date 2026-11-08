---
pdac-scope: cited
---

# Design

## Context

See proposal.md for motivation and scope. The existing classifier compares status values with primitive strings without inspecting objects. Existing coverage has 33 tests, including throwing coercion hooks but not this opaque-proxy/null-prototype pairing.

Exact matching without coercion is already required by BR-SUMMARY-001.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->

Frozen-input support and preservation are required by FR-SUMMARY-001.
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Distinguish opaque values from primitive controls in one test, detect any proxy property read even if its error is swallowed, and verify preserved identities and frozen state.

**Non-Goals:** Change production classification, extend invalid-input handling, add dependencies, alter accepted models, or exercise lifecycle transport controls.

## Decisions

- Use a frozen object proxy whose `get` trap records the property and throws a fixed error. Any attempted coercion requires property access, so the zero-access assertion also detects coercion attempts. A throwing hook alone would miss unrelated inspection.
- Use `Object.freeze(Object.create(null))` for the other object status. Its absent conversion methods make unintended coercion fail rather than produce a plausible status string.
- Freeze the four-item array and each observation. Capture observation references and compare each status by strict identity after summarization; avoid cloning, serializing or deep-comparing the opaque status itself, since test instrumentation must not inspect it.
- Assert literal expected counters independently of implementation logic. Keep both primitive controls in the same inventory rather than introducing additional tests.
- Leave specifications unchanged because no requirement changes. Retain provider metadata and append only the no-spec marker.

## Risks / Trade-offs

- [Assertions accidentally inspect the proxy] → Use strict identity for statuses and a final zero-access assertion; never stringify proxy values or use them in generated test names.
- [An attempted inspection throws but is swallowed] → Keep an access log as well as throwing, and require it to remain empty.
- [Accidental edits to the existing test prefix or other files] → Compare the candidate to the admitted checkout and retain an append-only/scope report.

## Migration Plan

No runtime migration is needed. Publish the plan and appended test together after host validation. Reverting this issue's addition would remove only its coverage and plan, not alter production behavior.
