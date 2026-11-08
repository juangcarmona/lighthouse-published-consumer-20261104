# integrate result

[Work item](https://github.com/juangcarmona/lighthouse-published-consumer-20261104/issues/72) · [PR](https://github.com/juangcarmona/lighthouse-published-consumer-20261104/pull/74) · [Actions run](https://github.com/juangcarmona/lighthouse-published-consumer-20261104/actions/runs/42468253120)

Accepted head: `0a2cd38a37e132b14e626541d6dcc0dc183165f4`. Base observed: `8d07da78092e308003c23e9ce0c004e5a3b27910`.

Outcome: blocked. Merged revision: not merged.

## Confirmed host state

Merge is not confirmed by this receipt. Post-merge CI: unavailable. Final review: not requested.

## Agent assessment before publication

PR #74's added characterization matches issue #72, and the required checks passed. Integration is blocked because the supplied evidence does not prove that the original 33-test prefix is byte-for-byte unchanged; no failed check or source defect was found. The trusted implementation host should supply the candidate-bound prefix comparison before integration is reassessed; no merge has occurred.

## Verification

- repository: passed at `0a2cd38a37e132b14e626541d6dcc0dc183165f4`.

## Post-merge checks

Not performed by this invocation.

## Limits

The agent assessment is separate from authenticated GitHub check results. This bundle retains reports and receipts; raw sessions and earlier screenshots remain in their original evidence locations. No additional test or visual acceptance is implied.
