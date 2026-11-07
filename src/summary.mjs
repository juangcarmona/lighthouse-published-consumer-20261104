// Only exact primitive "passed" and "failed" strings match; all other values are unavailable.
function classify(status) {
  switch (status) {
    case "passed":
      return "passed";
    case "failed":
      return "failed";
    default:
      return "unavailable";
  }
}

// Read each status once in inventory order; a read failure escapes and stops traversal.
export function summarize(checks) {
  const summary = { total: checks.length, passed: 0, failed: 0, unavailable: 0 };
  for (const check of checks) {
    const status = check.status;
    summary[classify(status)] += 1;
  }
  return summary;
}
