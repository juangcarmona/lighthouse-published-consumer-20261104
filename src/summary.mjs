function classify(check) {
  switch (check.status) {
    case "passed":
      return "passed";
    case "failed":
      return "failed";
    default:
      return "unavailable";
  }
}

export function summarize(checks) {
  const summary = { total: checks.length, passed: 0, failed: 0, unavailable: 0 };
  for (const check of checks) {
    summary[classify(check)] += 1;
  }
  return summary;
}
