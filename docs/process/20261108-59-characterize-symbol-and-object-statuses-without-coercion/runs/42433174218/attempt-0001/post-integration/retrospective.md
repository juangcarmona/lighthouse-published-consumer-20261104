## What went well
- One focused frozen-inventory test checks literal counters, identities, descriptors and zero conversion calls (src/summary.test.mjs:434-463). No source defect was established.
- Six retained candidate receipts, exact-head owner review, an authorized merge receipt and merged-revision CI provide distinct execution, review, integration and acceptance evidence.

## What went wrong
- The work item reports an initial unsupported-check-claim stop; accepted-delivery receipts now resolve that evidence gap (R1). An earlier dispatch failed, but its cause is unknown (R2). These are observations for one issue, not demonstrated recurrence.
- Consumer guidance still describes the issue #12 prerequisite as pending despite the later applied-contract plan (R3). PRODUCT103 and four low-severity dependency advisories remain diagnostic follow-ups (R4/R5), not failed acceptance checks.

## Start doing
- Keep candidate, published-branch, integration and post-merge claims tied to their own receipts and exact revisions. Record trigger identity separately: workflow_dispatch does not prove automatic scheduling. Owner: delivery maintainer; evidence: R1/R2 and continuation.ci.
- Reconcile current guidance against completed prerequisite records during documentation review. Owner: consumer maintainer; evidence: R3.

## Stop doing
- Do not infer completed checks, automatic scheduling, current-tip verification or merge effects from a green assessment. Do not turn optional skipped/failed routing jobs into product-test failures.
- Do not infer repeated failures, time savings or cost from retries of this issue; no such measurements or cross-item evidence were supplied.

## Improvement candidates
- **Receipt-bound claims (R1):** Observed failure: initial unsupported claims, as reported by issue #59. Owner: SDLC verification maintainer. Smallest useful guard: review each completion claim against a matching terminal receipt. In a separately authorized regression, first use a synthetic claim with a missing or wrong-revision receipt and show rejection; then supply a matching receipt and show acceptance. Earlier raw seed evidence is unavailable; this is a candidate guard, not proven remediation.
- **Dispatch continuity (R2):** Observed failure: github-check:128575527865 failed; successful CI used workflow_dispatch. Owner: SDLC workflow maintainer; continuity: existing Lighthouse #541 exercise. Smallest useful guard: retain distinct dispatch and CI-trigger outcomes without asserting automatic recovery. Before proposing a fix, use the retained failed run to establish its cause and reproduce it in an authorized isolated regression; then prove the corrected path while a stale or unauthorized grant remains rejected. No root cause or guard correction is established here.
- **Guidance freshness (R3):** Observed failure: docs/consumer-contract.md:5 conflicts with openspec/changes/issue-12-proposal/proposal.md:7. Owner: consumer maintainer. Smallest useful guard: a prerequisite-state check in documentation review. Reproduce by comparing those passages before editing; independently review a narrow wording correction and confirm unchanged delivery permissions and preserved application/tests afterward.
- **Model diagnostic (R4):** Observed gap: PRODUCT103 and the empty incoming-edge report for FR-SUMMARY-001. Owner: product-model owner. Smallest useful guard: explicit owner disposition of the warning, not a new blanket failure policy. Reproduce using the retained diagnostic before any separately approved model change; if a correction is approved, require before/after provider diagnostics and unchanged classification regressions.
- **Dependency diagnostic (R5):** Observed gap: four low-severity advisories without retained package details. Owner: dependency maintainer. Smallest useful guard: an owned maintenance disposition with advisory references. Review existing diagnostic evidence without exploit testing; any authorized dependency correction needs its own baseline advisory evidence and complete verification regression.

All candidates are recorded only. They require their own review and regression proof before adoption; no policy, provider guidance, permissions, issue creation or next-stage execution is authorized by this review.