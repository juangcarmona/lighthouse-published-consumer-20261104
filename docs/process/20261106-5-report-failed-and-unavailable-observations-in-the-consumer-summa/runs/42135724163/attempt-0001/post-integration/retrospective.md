## What went well
- The six changed paths match issue #5. Exact classification and purity are directly supported by src/summary.mjs:1–13 and nine meaningful assertions in src/summary.test.mjs:4–59. No source defect or affected guidance drift was established.
- Five retained command receipts, exact-head independent CI, an owner-authorized actual merge receipt and merged-revision CI provide separate delivery evidence. Owner: consumer maintainer and delivery host maintainers.

## What went wrong
- Continuation needed recovery: the PR technical review reports an unsent candidate CI request recovered by maintenance 42132306103; this review dispatch carries completionRecovery from 42135179053 despite successful continuation job 127619352843. Root cause is unknown; these observations concern one work item and do not establish recurrence. Owner: delivery host maintainers; reference R2.
- The retained integration report mixes a confirmed merged outcome with pre-merge assessment wording. Receipt integrity resolves the state, but prose is ambiguous. Owner: integration report publisher maintainers; reference R3.
- Installation emitted four low-severity dependency warnings; affected packages and baseline origin were not established. Owner: consumer maintainer; reference R4.

## Start doing
- Retain explicit assessment, merge receipt and current acceptance sections so historical missing CI cannot be confused with failed CI. Keep the original missing observation alongside its later resolution (R1).
- Triage the retained dependency warning in separately scoped maintenance; do not infer a new source defect or run an automatic breaking fix (R4).

## Stop doing
- Stop presenting pre-merge assessment prose as the current merge state (R3). Do not equate a green job with behavior proof or retries/recovery of this issue with recurrence across issues.

## Improvement candidates
- **Recovery continuity (R2)** — Owner: delivery host maintainers. Observed failure: recovery was needed to progress delivery. Evidence: technical review 5793795110 and current completionRecovery provenance. Smallest useful guard: an exact issue/PR/head-bound, idempotent continuation regression. In a separately authorized test fixture, first reproduce an unsent candidate CI intent or successful post-merge CI without a consumed review dispatch; demonstrate the missing continuation, then verify recovery emits one correctly bound continuation without republishing the PR or merging again. Root-cause diagnosis and RED/GREEN proof remain future work; no guard was implemented here.
- **Report-state consistency (R3)** — Owner: integration report publisher maintainers. Observed failure: retained integration report simultaneously says merged and no merge established. Smallest useful guard: a renderer fixture separating historical assessment text from authenticated outcome. Reproduce using the retained merged receipt and pre-merge assessment; first show contradictory current-state prose, then verify the corrected renderer labels it historical while preserving merge SHA and then-missing CI. Provider-owned changes require their own review and regression proof.
- No product or architecture redesign is supported by this small delivery. No attention-time or cost measurements, cross-issue recurrence, new permissions or follow-up issues are claimed.