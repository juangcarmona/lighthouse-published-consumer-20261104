# Proposal

<!-- pdac-scope: cited -->

## Why

Issue #77 qualifies the existing summary contract for inherited, non-enumerable primitive statuses. One focused regression test protects classification and input preservation without introducing product behavior.

## What Changes

- Append one test to `src/summary.test.mjs`, preserving every existing byte as an exact prefix.
- Exercise three frozen observations with frozen prototypes holding non-enumerable, read-only `passed`, `failed` and `unknown` statuses in a frozen inventory.
- Check literal counters, absence of own status properties, descriptor preservation, inventory order and observation/prototype identities.
- Complete only this issue's plan and run the declared consumer checks.

## Capabilities

### New Capabilities

None. This is test-only qualification of delivered behavior.

### Modified Capabilities

None. `openspec list --specs` reports no specs. No requirement changes or delta specs are needed; metadata declares `skip_specs: true`.

## Product Context

The affected artifacts are BR-SUMMARY-001 (exact classification) and FR-SUMMARY-001 (counters and input preservation). Both baseline documents retain draft status; citation is not product approval. Full model inspection and provider impact reports found these two artifacts as each other's only neighbours, with no additional neighbours to exclude.
<!-- pdac:cite id="BR-SUMMARY-001" digest="sha256:a21b966ff4747da8ee35ee1366ffeac16f6a6fa3da508ca04d3f0b31380677c4" -->
<!-- pdac:cite id="FR-SUMMARY-001" digest="sha256:d422a7f0e7294b9ffbb099871260c2ac5c287609036e808fc160786f294971ac" -->

No Product Change, accepted-intent edit or broader input policy is requested. No lifecycle or structured behaviour is defined in this small model; the test exercises the existing rule and requirement directly.

### Current revalidation

The owner requested reuse of the retained implementation seed after preparation merged in #81, at source `542985f2ada538feab2e2426614d43c0b57a8e28`. Current provider inspection and impact reports confirm the same two draft artifacts, unchanged digests and no additional neighbours; the installed OpenSpec inventory still contains no specs. PDaC serialization is now v1alpha2, with ProductShape CLI 0.26.1/core 0.25.0. This attempt rechecks the candidate without changing the test, model or provider configuration. The earlier native run `44405954883` remains failed; its missing-input host error and worker-reported provider blocker are historical evidence, not current passing receipts.

## Impact

Only the appended test and `openspec/changes/issue-77-proposal/` change. Production modules, earlier tests and plans, accepted models, provider scaffolds, dependencies, hooks, tools and check policies remain unchanged. Publication and exact-head owner review remain with the host and operator; this work grants no merge or protected acceptance authority.
