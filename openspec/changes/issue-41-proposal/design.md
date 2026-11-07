# Design

<!-- pdac-scope: cited -->

## Context

See proposal.md for motivation. The private switch classifies a captured value; the loop reads each observation's status and accumulates four counters. Exceptions already escape without a catch. The unchanged product constraints are exact classification and preservation of input contents and identities.

<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

## Goals / Non-Goals

**Goals:** Document the existing read boundary and detect swallowed, wrapped or retried status failures, continued traversal and input mutation.

**Non-Goals:** Runtime changes, new exports, normalization, input validation, new product requirements or delivery automation changes. No apply or merge authority is granted.

## Decisions

- Place concise comments above the existing functions; leave their bodies and exports untouched. Rewriting control flow to handle errors would exceed this clarification.
- Append one parameterized test for each of accessor and Proxy observations. Read one successful observation, throw a sentinel Error on the second, and instrument two later observations. Assert strict exception identity, counts `[1, 1, 0, 0]` and trace `[0, 1]`; unlike a first-item-only failure, this also exercises partial traversal.
- Freeze inventory, observation targets and nested details/notes. Capture property descriptors before summarization and compare them afterward, checking references and nested contents without reading status in assertions. Do not deep-compare observed objects: that could execute getters or traps and contaminate the evidence.
- Keep specifications unchanged via `skip_specs: true`. Cite the existing product dependencies without broadening their contract.

## Risks / Trade-offs

- Assertion code could trigger a second status read → use descriptors, identities and separately held nested references; assert the read trace again after preservation checks.
- A Proxy fixture could fail due to frozen-property invariants instead of the intended error → throw the sentinel directly from its status get trap; use Reflect.get for other properties.
- Local passing tests could be mistaken for automatic delivery acceptance → record later workflow requirements separately, including the unresolved provenance of issue #38's recovery mode.

## Migration Plan

No data or dependency migration. Deliver planning, comments and additive tests together. Rollback removes this issue's additions only. The host checks the candidate independently before publication; integration approval, original CI continuation, final review and closure remain separate.
