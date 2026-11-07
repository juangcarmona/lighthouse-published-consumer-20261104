function classify(check) {
  if (check.status === "passed") {
    return "passed";
  } else if (check.status === "failed") {
    return "failed";
  } else {
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
