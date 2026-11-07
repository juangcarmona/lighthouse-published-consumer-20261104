import test from "node:test";
import assert from "node:assert/strict";
import { summarize } from "./summary.mjs";
test("summarizes an empty inventory", () => assert.deepEqual(summarize([]), { total: 0, passed: 0, failed: 0, unavailable: 0 }));
test("does not count unavailable evidence as passed", () => assert.deepEqual(summarize([{ status: "passed" }, { status: "unknown" }]), { total: 2, passed: 1, failed: 0, unavailable: 1 }));

test("summarizes an all-passed inventory", () => {
  assert.deepEqual(summarize([{ status: "passed" }, { status: "passed" }]), {
    total: 2, passed: 2, failed: 0, unavailable: 0
  });
});

test("summarizes an all-failed inventory", () => {
  assert.deepEqual(summarize([{ status: "failed" }, { status: "failed" }]), {
    total: 2, passed: 0, failed: 2, unavailable: 0
  });
});

test("summarizes a mixed inventory", () => {
  const checks = [{ status: "passed" }, { status: "failed" }, { status: "unknown" }, {}];
  assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });
});

test("counts a missing status as unavailable", () => {
  assert.deepEqual(summarize([{}]), { total: 1, passed: 0, failed: 0, unavailable: 1 });
});

test("counts only exact passed and failed strings", () => {
  const statuses = ["Passed", "FAILED", " passed", "failed ", "", null, undefined, true, 1, { value: "passed" }];
  assert.deepEqual(summarize(statuses.map(status => ({ status }))), {
    total: 10, passed: 0, failed: 0, unavailable: 10
  });
});

test("preserves input contents, object identities and order", () => {
  const checks = [
    { id: "z", status: "unknown", details: { notes: ["unavailable"] } },
    { id: "a", status: "failed", details: { notes: ["failure"] } },
    { id: "m", status: "passed", details: { notes: ["success"] } },
    { id: "b", details: { notes: [] } }
  ];
  const snapshot = structuredClone(checks);
  const originalOrder = [...checks];

  assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });

  assert.deepEqual(checks, snapshot);
  checks.forEach((check, index) => assert.strictEqual(check, originalOrder[index]));
});

test("supports frozen inventory and observation objects", () => {
  const checks = Object.freeze([
    Object.freeze({ status: "passed" }),
    Object.freeze({ status: "failed" }),
    Object.freeze({ status: "unknown" }),
    Object.freeze({})
  ]);
  assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });
});

for (const status of ["__proto__", "constructor", "toString", new String("passed"), new String("failed")]) {
  const label = typeof status === "string" ? status : `boxed ${status}`;
  test(`counts ${label} as unavailable without changing the observation`, () => {
    const check = { status, details: { notes: ["original"] } };
    const checks = [check];
    const snapshot = structuredClone(checks);
    const details = check.details;
    const notes = details.notes;

    assert.deepEqual(summarize(checks), { total: 1, passed: 0, failed: 0, unavailable: 1 });
    assert.deepEqual(checks, snapshot);
    assert.strictEqual(checks[0], check);
    assert.strictEqual(check.status, status);
    assert.strictEqual(check.details, details);
    assert.strictEqual(check.details.notes, notes);
  });
}

test("preserves frozen prototype-key and boxed-string observations in a mixed inventory", () => {
  const statuses = [
    "__proto__", "constructor", "toString",
    Object.freeze(new String("passed")), Object.freeze(new String("failed")),
    "passed", "failed"
  ];
  const checks = Object.freeze(statuses.map(status => Object.freeze({
    status,
    details: Object.freeze({ notes: Object.freeze(["original"]) })
  })));
  const snapshot = structuredClone(checks);
  const originalOrder = [...checks];
  const originalDetails = checks.map(check => check.details);
  const originalNotes = checks.map(check => check.details.notes);

  assert.deepEqual(summarize(checks), { total: 7, passed: 1, failed: 1, unavailable: 5 });
  assert.deepEqual(checks, snapshot);
  checks.forEach((check, index) => {
    assert.strictEqual(check, originalOrder[index]);
    assert.strictEqual(check.status, statuses[index]);
    assert.strictEqual(check.details, originalDetails[index]);
    assert.strictEqual(check.details.notes, originalNotes[index]);
  });
});
