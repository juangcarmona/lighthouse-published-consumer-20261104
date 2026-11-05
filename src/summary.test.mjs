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
