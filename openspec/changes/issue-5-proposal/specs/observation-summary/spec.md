# Observation Summary

<!-- pdac-scope: cited -->

## Purpose

Provide consumers with complete classification counts for supplied check observations while preserving the original inventory and its evidence.

## ADDED Requirements

### Requirement: Exact classification counts
The summary SHALL return exactly `total`, `passed`, `failed` and `unavailable` counts. Total MUST equal the number of observations. Only an exact string status of `passed` SHALL count as passed and only an exact string status of `failed` SHALL count as failed. Every other or missing status SHALL count as unavailable.

**Product citation**: <!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
**Product citation**: <!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

#### Scenario: Empty inventory
- **WHEN** the inventory is empty
- **THEN** the result is exactly `{ total: 0, passed: 0, failed: 0, unavailable: 0 }`

#### Scenario: All passed
- **WHEN** two observations both have status `passed`
- **THEN** the result is exactly `{ total: 2, passed: 2, failed: 0, unavailable: 0 }`

#### Scenario: All failed
- **WHEN** two observations both have status `failed`
- **THEN** the result is exactly `{ total: 2, passed: 0, failed: 2, unavailable: 0 }`

#### Scenario: Mixed inventory
- **WHEN** the inventory contains one `passed`, one `failed`, one `unknown` and one missing status
- **THEN** the result is exactly `{ total: 4, passed: 1, failed: 1, unavailable: 2 }`

#### Scenario: Unknown status is not passed
- **WHEN** the inventory contains one `passed` and one `unknown` status
- **THEN** the result is exactly `{ total: 2, passed: 1, failed: 0, unavailable: 1 }`

#### Scenario: Missing status
- **WHEN** an observation has no status property
- **THEN** the result is exactly `{ total: 1, passed: 0, failed: 0, unavailable: 1 }`

#### Scenario: Non-exact statuses
- **WHEN** observations have case variants, whitespace variants, empty, null, undefined or non-string statuses
- **THEN** every such observation counts as unavailable, not passed or failed

### Requirement: Preserve supplied evidence
Summarization MUST leave the supplied inventory order, object identities and object contents unchanged. It SHALL perform no I/O.

**Product citation**: <!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

#### Scenario: Input remains unchanged
- **WHEN** an inventory containing distinct observation objects and nested metadata is summarized
- **THEN** its order, original object references and all contents remain unchanged

#### Scenario: Frozen inventory
- **WHEN** the inventory and its observation objects are frozen
- **THEN** summarization succeeds and returns the same classification counts without mutation
