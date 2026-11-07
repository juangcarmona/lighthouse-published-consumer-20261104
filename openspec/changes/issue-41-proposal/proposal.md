# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #41 makes the existing classification and status-read boundary explicit without changing behavior. Abrupt accessor failures need characterization coverage so a future refactor cannot silently replace an exception or continue reading observations.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## What Changes

- Add concise source comments explaining exact primitive classification and ordered, single status reads with uncaught failures.
- Append accessor and Proxy failure tests proving exception identity, one failing read, no later status reads and preservation of frozen inputs.
- Preserve every existing assertion, function body, export and all four counters.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. `openspec list --specs` found no accepted capabilities. This clarification changes no spec-level behavior; `.openspec.yaml` sets `skip_specs: true` rather than inventing a requirement or specification delta.

## Product Dependencies

The complete product model contains BR-SUMMARY-001 and FR-SUMMARY-001. Both are unchanged dependencies for exact classification, four counters and input preservation. Inspection and impact traversal found only their dependency edge, with no additional direct or transitive neighbours to include or exclude. Abrupt failure tests characterize existing JavaScript behavior; they do not establish a new invalid-input policy. No ProductShape apply is needed or authorized.

## Impact

Only comments in `src/summary.mjs`, appended tests in `src/summary.test.mjs` and this issue's plan change. No dependencies, APIs, accepted models, previous plans, architecture, tools, hooks, workflow/check policy or adopter customizations change. All six supplied checks and scope preservation must pass before implementation completion. The host independently verifies and publishes a fresh implementation PR; exact-head integration approval remains separate.

## Later Workflow Acceptance

Issue #41 separately requires original post-merge CI to finish while integration remains in progress, followed by the existing bot callback waiting, rechecking the retained grant, starting exactly one final review and closing the issue automatically. This is later-stage evidence, not a local implementation check. Do not substitute manual maintenance, review resignal, repeated merge, CI rerun or ProductShape apply. Issue #38's earlier pending trace is not proof of that automatic path; its actual recovery mode is not supplied here and must remain explicit in the later workflow record rather than inferred. Preserve that trace and all prior plans unchanged.
