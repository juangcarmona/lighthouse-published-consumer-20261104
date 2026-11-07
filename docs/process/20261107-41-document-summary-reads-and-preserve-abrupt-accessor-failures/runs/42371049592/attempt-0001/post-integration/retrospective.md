## What went well
- PR #44 retained bounded source/tests/plan scope. Inspection of src/summary.test.mjs:168-216 confirms exception identity, partial traversal and uncontaminated preservation assertions; receipt :2 records 24 passing tests.
- Six independent command receipts bind the published tree; exact-head owner approval and host integration receipt distinguish assessment from actual merge. Original CI 42370697740 and its continuation job passed at the merged revision.

## What went wrong
- The current evidence package does not demonstrate the specific overlapping-CI wait, retained-grant recheck or exactly-once review required by issue #41 (R1). Issue #38 recovery provenance is also absent (R2). These are verification gaps, not established automation defects.
- Original OpenSpec marker-only metadata blocked strict validation, as preserved in tasks.md:18 and owner correction 6705919648; later receipt :6 proves it fixed (R3). Corrections on this PR are retries of one work item, not evidence of recurring failures across deliveries.
- PRODUCT103 and four low-severity audit advisories remain separately owned observations; no new application defect is established.

## Start doing
- Delivery host maintainer: retain a bounded ordered callback trace with original CI identity, integration state, wait outcome, retained-grant validation and dispatch reservation/result. First recover existing records for R1/R2; do not manufacture acceptance by rerunning delivery.
- OpenSpec integration maintainer: distinguish historical plan blockers from current receipts in the durable review record while preserving frozen plans.

## Stop doing
- Do not treat green callback conclusions as proof of the required race or exactly-once behavior, or infer recovery mode from null or workflow_dispatch. No evidence establishes that maintainers deliberately made those mistakes; this is a reporting guardrail.
- Do not turn retries of PR #44 into a recurrence claim, or apply audit fixes/model changes under this review.

## Improvement candidates
- **Callback evidence guard — owner: delivery host maintainer.** Observed failure: R1/R2 evidence is insufficient to qualify the explicit workflow exercise. Evidence: issue #41 acceptance, continuation fields and historical integration report. Smallest guard: a bounded evidence manifest for ordered wait/grant/dispatch events and a separate historical recovery reference. Reproduce first in an isolated regression fixture where CI completes while integration remains running and a success-only bundle cannot prove the race; then show the manifest proves wait/recheck and duplicate callbacks yield one dispatch, including negative expired-grant/no-wait cases. This is a proposal requiring its own review and regression proof, not a validated automation fix.
- **Provider metadata handoff — owner: OpenSpec integration maintainer.** Observed failure: marker-only metadata rejected by strict validation (tasks.md:18); owner comment 6705919648 and receipt :6 show correction. Smallest guard: check provider-generated metadata before candidate strict validation, without granting agent authority to invent it. Reproduce the marker-only failure with pinned OpenSpec 1.15.0, then validate provider-materialized schema/created/skip_specs content while checking source/test/plan preservation. Any guidance or guard change requires separate review and regression proof.
- Product model owner may separately assess PRODUCT103 using the retained citation diagnostic; dependency maintainer may separately assess the four audit advisories. Details and correction requirements are not supplied, so no specific guard or fix is proposed here.

No timings, costs, recurrence across work items, new permissions, issues or delivery stages are inferred.