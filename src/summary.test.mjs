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

for (const kind of ["accessor", "Proxy"]) {
  test(`reads each ${kind} status exactly once in inventory order`, () => {
    const statuses = ["passed", "failed", "unknown", undefined];
    const reads = statuses.map(() => 0);
    const trace = [];
    const details = statuses.map(() => Object.freeze({ notes: Object.freeze(["original"]) }));
    const targets = statuses.map((status, index) => {
      const read = () => {
        reads[index] += 1;
        trace.push(index);
        assert.equal(reads[index], 1, `status ${index} must not be read twice`);
        return status;
      };
      if (kind === "accessor") {
        return Object.freeze({ get status() { return read(); }, details: details[index] });
      }
      const target = Object.freeze(index === 3
        ? { details: details[index] }
        : { status, details: details[index] });
      return new Proxy(target, {
        get(target, property, receiver) {
          if (property === "status") read();
          return Reflect.get(target, property, receiver);
        }
      });
    });
    const checks = Object.freeze([...targets]);
    const descriptors = targets.map(target => Object.getOwnPropertyDescriptors(target));

    assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });
    assert.deepEqual(reads, [1, 1, 1, 1]);
    assert.deepEqual(trace, [0, 1, 2, 3]);
    checks.forEach((check, index) => {
      assert.strictEqual(check, targets[index]);
      assert.strictEqual(check.details, details[index]);
      assert.strictEqual(check.details.notes, details[index].notes);
      assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
      assert.ok(Object.isFrozen(check));
    });
    assert.ok(Object.isFrozen(checks));
  });
}

for (const status of [Symbol("passed"), Symbol("failed"), 0n, 1n, -1n]) {
  test(`counts ${String(status)} as unavailable alongside primitive controls`, () => {
    const details = Object.freeze({ notes: Object.freeze(["original"]) });
    const checks = Object.freeze([status, "passed", "failed"].map(value => Object.freeze({
      status: value, details
    })));
    const originalOrder = [...checks];

    assert.deepEqual(summarize(checks), { total: 3, passed: 1, failed: 1, unavailable: 1 });
    assert.strictEqual(checks[0].status, status);
    assert.strictEqual(checks[1].status, "passed");
    assert.strictEqual(checks[2].status, "failed");
    checks.forEach((check, index) => {
      assert.strictEqual(check, originalOrder[index]);
      assert.strictEqual(check.details, details);
      assert.strictEqual(check.details.notes, details.notes);
      assert.deepEqual(check.details.notes, ["original"]);
    });
  });
}

for (const kind of ["accessor", "Proxy"]) {
  test(`preserves an abrupt ${kind} status failure without reading later observations`, () => {
    const failure = new Error("status read failed");
    const statuses = ["passed", "failed", "unknown", "passed"];
    const reads = statuses.map(() => 0);
    const trace = [];
    const details = statuses.map(() => Object.freeze({ notes: Object.freeze(["original"]) }));
    const observations = statuses.map((status, index) => {
      const read = () => {
        reads[index] += 1;
        trace.push(index);
        if (index === 1) throw failure;
        return status;
      };
      if (kind === "accessor") {
        return Object.freeze({ get status() { return read(); }, details: details[index] });
      }
      return new Proxy(Object.freeze({ status, details: details[index] }), {
        get(target, property, receiver) {
          if (property === "status") read();
          return Reflect.get(target, property, receiver);
        }
      });
    });
    const checks = Object.freeze([...observations]);
    const descriptors = observations.map(observation => Object.getOwnPropertyDescriptors(observation));

    assert.throws(() => summarize(checks), error => {
      assert.strictEqual(error, failure);
      return true;
    });
    assert.deepEqual(reads, [1, 1, 0, 0]);
    assert.deepEqual(trace, [0, 1]);
    assert.ok(Object.isFrozen(checks));
    assert.equal(checks.length, observations.length);
    checks.forEach((check, index) => {
      assert.strictEqual(check, observations[index]);
      assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
      assert.ok(Object.isFrozen(check));
      assert.strictEqual(check.details, details[index]);
      assert.strictEqual(check.details.notes, details[index].notes);
      assert.deepEqual(details[index].notes, ["original"]);
      assert.ok(Object.isFrozen(details[index]));
      assert.ok(Object.isFrozen(details[index].notes));
    });
    assert.deepEqual(reads, [1, 1, 0, 0]);
    assert.deepEqual(trace, [0, 1]);
  });
}

for (const kind of ["Symbol.toPrimitive", "toString/valueOf"]) {
  test(`classifies an object with throwing ${kind} hooks without coercion`, () => {
    const calls = { toPrimitive: 0, toString: 0, valueOf: 0 };
    const status = Object.freeze(kind === "Symbol.toPrimitive" ? {
      [Symbol.toPrimitive]() {
        calls.toPrimitive += 1;
        throw new Error("Symbol.toPrimitive must not be called");
      }
    } : {
      toString() {
        calls.toString += 1;
        throw new Error("toString must not be called");
      },
      valueOf() {
        calls.valueOf += 1;
        throw new Error("valueOf must not be called");
      }
    });
    const statuses = ["passed", status, "failed"];
    const details = statuses.map(() => Object.freeze({ notes: Object.freeze(["original"]) }));
    const observations = statuses.map((value, index) => Object.freeze({
      status: value, details: details[index]
    }));
    const checks = Object.freeze([...observations]);
    const descriptors = observations.map(check => Object.getOwnPropertyDescriptors(check));
    const statusDescriptors = Object.getOwnPropertyDescriptors(status);

    assert.deepEqual(summarize(checks), { total: 3, passed: 1, failed: 1, unavailable: 1 });
    assert.deepEqual(calls, { toPrimitive: 0, toString: 0, valueOf: 0 });
    assert.ok(Object.isFrozen(checks));
    assert.equal(checks.length, observations.length);
    checks.forEach((check, index) => {
      assert.strictEqual(check, observations[index]);
      assert.strictEqual(check.status, statuses[index]);
      assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
      assert.ok(Object.isFrozen(check));
      assert.strictEqual(check.details, details[index]);
      assert.strictEqual(check.details.notes, details[index].notes);
      assert.deepEqual(check.details.notes, ["original"]);
      assert.ok(Object.isFrozen(check.details));
      assert.ok(Object.isFrozen(check.details.notes));
    });
    assert.ok(Object.isFrozen(status));
    assert.deepEqual(Object.getOwnPropertyDescriptors(status), statusDescriptors);
    assert.deepEqual(calls, { toPrimitive: 0, toString: 0, valueOf: 0 });
  });
}

for (const kind of ["accessor", "Proxy"]) {
  test(`reads a repeated ${kind} observation once per inventory occurrence without caching`, () => {
    const statuses = ["passed", "failed", undefined];
    let reads = 0;
    const trace = [];
    const notes = Object.freeze(["original"]);
    const details = Object.freeze({ notes });
    const read = () => {
      const occurrence = reads++;
      assert.ok(occurrence < statuses.length, "status must not be read more than three times");
      const status = statuses[occurrence];
      trace.push([occurrence, status]);
      return status;
    };
    const observation = kind === "accessor"
      ? Object.freeze({ get status() { return read(); }, details })
      : new Proxy(Object.freeze({ details }), {
        get(target, property, receiver) {
          if (property === "status") return read();
          return Reflect.get(target, property, receiver);
        }
      });
    const checks = Object.freeze([observation, observation, observation]);
    const descriptors = Object.getOwnPropertyDescriptors(observation);
    const inventoryDescriptors = Object.getOwnPropertyDescriptors(checks);
    const detailsDescriptors = Object.getOwnPropertyDescriptors(details);
    const notesDescriptors = Object.getOwnPropertyDescriptors(notes);
    const expectedTrace = [[0, "passed"], [1, "failed"], [2, undefined]];

    assert.deepEqual(summarize(checks), { total: 3, passed: 1, failed: 1, unavailable: 1 });
    assert.equal(reads, 3);
    assert.deepEqual(trace, expectedTrace);
    assert.equal(checks.length, 3);
    assert.ok(Object.isFrozen(checks));
    assert.deepEqual(Object.getOwnPropertyDescriptors(checks), inventoryDescriptors);
    checks.forEach(check => {
      assert.strictEqual(check, observation);
      assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors);
      assert.ok(Object.isFrozen(check));
      assert.strictEqual(check.details, details);
      assert.strictEqual(check.details.notes, notes);
    });
    assert.deepEqual(Object.getOwnPropertyDescriptors(details), detailsDescriptors);
    assert.deepEqual(Object.getOwnPropertyDescriptors(notes), notesDescriptors);
    assert.deepEqual(notes, ["original"]);
    assert.ok(Object.isFrozen(details));
    assert.ok(Object.isFrozen(notes));
    assert.equal(reads, 3);
    assert.deepEqual(trace, expectedTrace);
  });
}

test("returns independent mixed-inventory summaries across calls and caller mutation", () => {
  const checks = Object.freeze([
    Object.freeze({ status: "passed", details: Object.freeze({ notes: Object.freeze(["success"]) }) }),
    Object.freeze({ status: "failed", details: Object.freeze({ notes: Object.freeze(["failure"]) }) }),
    Object.freeze({ status: "unknown", details: Object.freeze({ notes: Object.freeze(["unavailable"]) }) }),
    Object.freeze({ details: Object.freeze({ notes: Object.freeze([]) }) })
  ]);
  const snapshot = structuredClone(checks);
  const observations = [...checks];
  const details = checks.map(check => check.details);
  const notes = checks.map(check => check.details.notes);
  const inventoryDescriptors = Object.getOwnPropertyDescriptors(checks);
  const descriptors = checks.map(check => Object.getOwnPropertyDescriptors(check));
  const expected = { total: 4, passed: 1, failed: 1, unavailable: 2 };

  const first = summarize(checks);
  const second = summarize(checks);
  assert.deepEqual(first, expected);
  assert.deepEqual(second, expected);
  assert.notStrictEqual(first, second);

  const mutated = { total: 100, passed: 101, failed: 102, unavailable: 103 };
  Object.assign(first, mutated);
  assert.deepEqual(first, mutated);
  assert.deepEqual(second, expected);

  const later = summarize(checks);
  assert.deepEqual(later, expected);
  assert.notStrictEqual(later, first);
  assert.notStrictEqual(later, second);
  assert.deepEqual(first, mutated);
  assert.deepEqual(second, expected);

  assert.deepEqual(checks, snapshot);
  assert.ok(Object.isFrozen(checks));
  assert.deepEqual(Object.getOwnPropertyDescriptors(checks), inventoryDescriptors);
  checks.forEach((check, index) => {
    assert.strictEqual(check, observations[index]);
    assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
    assert.ok(Object.isFrozen(check));
    assert.strictEqual(check.details, details[index]);
    assert.strictEqual(check.details.notes, notes[index]);
    assert.deepEqual(notes[index], snapshot[index].details.notes);
    assert.ok(Object.isFrozen(details[index]));
    assert.ok(Object.isFrozen(notes[index]));
  });
});

test("returns independent empty-inventory summaries without retaining prior counts", () => {
  const checks = Object.freeze([]);
  const descriptors = Object.getOwnPropertyDescriptors(checks);
  const expected = { total: 0, passed: 0, failed: 0, unavailable: 0 };
  const prior = summarize(Object.freeze([
    Object.freeze({ status: "passed" }),
    Object.freeze({ status: "failed" }),
    Object.freeze({ status: "unknown" })
  ]));
  assert.deepEqual(prior, { total: 3, passed: 1, failed: 1, unavailable: 1 });

  const first = summarize(checks);
  const second = summarize(checks);
  assert.deepEqual(first, expected);
  assert.deepEqual(second, expected);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first, prior);
  assert.notStrictEqual(second, prior);

  const mutated = { total: 100, passed: 101, failed: 102, unavailable: 103 };
  Object.assign(first, mutated);
  assert.deepEqual(first, mutated);
  assert.deepEqual(second, expected);

  const later = summarize(checks);
  assert.deepEqual(later, expected);
  assert.notStrictEqual(later, first);
  assert.notStrictEqual(later, second);
  assert.notStrictEqual(later, prior);
  assert.deepEqual(first, mutated);
  assert.deepEqual(second, expected);
  assert.deepEqual(prior, { total: 3, passed: 1, failed: 1, unavailable: 1 });
  assert.deepEqual(checks, []);
  assert.ok(Object.isFrozen(checks));
  assert.deepEqual(Object.getOwnPropertyDescriptors(checks), descriptors);
});

test("preserves frozen numeric, boolean and nullish statuses in a mixed inventory", () => {
  const statuses = [true, false, 0, -0, NaN, Infinity, -Infinity, null, undefined, "", "passed", "failed"];
  const checks = Object.freeze(statuses.map(status => Object.freeze({
    status,
    details: Object.freeze({ notes: Object.freeze(["original"]) })
  })));
  const snapshot = structuredClone(checks);
  const observations = [...checks];
  const originalStatuses = checks.map(check => check.status);
  const details = checks.map(check => check.details);
  const notes = checks.map(check => check.details.notes);

  assert.deepEqual(summarize(checks), { total: 12, passed: 1, failed: 1, unavailable: 10 });

  assert.equal(checks.length, 12);
  assert.deepEqual(checks, snapshot);
  assert.ok(Object.isFrozen(checks));
  checks.forEach((check, index) => {
    assert.strictEqual(check, observations[index]);
    assert.ok(Object.is(check.status, originalStatuses[index]));
    assert.ok(Object.is(check.status, statuses[index]));
    assert.ok(Object.isFrozen(check));
    assert.strictEqual(check.details, details[index]);
    assert.strictEqual(check.details.notes, notes[index]);
    assert.deepEqual(check.details, snapshot[index].details);
    assert.deepEqual(check.details.notes, snapshot[index].details.notes);
    assert.ok(Object.isFrozen(check.details));
    assert.ok(Object.isFrozen(check.details.notes));
  });
});

test("preserves frozen symbol and throwing-object statuses without coercion", () => {
  let conversionCalls = 0;
  const objectStatus = Object.freeze({
    toString() {
      conversionCalls += 1;
      throw new Error("status must not be converted to a string");
    }
  });
  const statuses = ["passed", "failed", Symbol("passed"), objectStatus];
  const checks = Object.freeze(statuses.map(status => Object.freeze({ status })));
  const observations = [...checks];
  const inventoryDescriptors = Object.getOwnPropertyDescriptors(checks);
  const descriptors = checks.map(check => Object.getOwnPropertyDescriptors(check));
  const statusDescriptors = Object.getOwnPropertyDescriptors(objectStatus);

  assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });
  assert.equal(conversionCalls, 0);
  assert.equal(checks.length, 4);
  assert.ok(Object.isFrozen(checks));
  assert.deepEqual(Object.getOwnPropertyDescriptors(checks), inventoryDescriptors);
  checks.forEach((check, index) => {
    assert.strictEqual(check, observations[index]);
    assert.strictEqual(check.status, statuses[index]);
    assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
    assert.ok(Object.isFrozen(check));
  });
  assert.ok(Object.isFrozen(objectStatus));
  assert.deepEqual(Object.getOwnPropertyDescriptors(objectStatus), statusDescriptors);
  assert.equal(conversionCalls, 0);
});

test("preserves frozen callable and bigint statuses without invocation or coercion", () => {
  let invocationCalls = 0;
  let conversionCalls = 0;
  const callableStatus = function () {
    invocationCalls += 1;
    throw new Error("status must not be invoked");
  };
  callableStatus[Symbol.toPrimitive] = () => {
    conversionCalls += 1;
    throw new Error("status must not be converted to a primitive");
  };
  Object.freeze(callableStatus);
  const statuses = ["passed", "failed", 1n, callableStatus];
  const checks = Object.freeze(statuses.map(status => Object.freeze({ status })));
  const observations = [...checks];
  const inventoryDescriptors = Object.getOwnPropertyDescriptors(checks);
  const descriptors = checks.map(check => Object.getOwnPropertyDescriptors(check));
  const statusDescriptors = Object.getOwnPropertyDescriptors(callableStatus);

  assert.deepEqual(summarize(checks), { total: 4, passed: 1, failed: 1, unavailable: 2 });
  assert.equal(invocationCalls, 0);
  assert.equal(conversionCalls, 0);
  assert.equal(checks.length, 4);
  assert.ok(Object.isFrozen(checks));
  assert.deepEqual(Object.getOwnPropertyDescriptors(checks), inventoryDescriptors);
  checks.forEach((check, index) => {
    assert.strictEqual(check, observations[index]);
    assert.strictEqual(check.status, statuses[index]);
    assert.deepEqual(Object.getOwnPropertyDescriptors(check), descriptors[index]);
    assert.ok(Object.isFrozen(check));
  });
  assert.ok(Object.isFrozen(callableStatus));
  assert.deepEqual(Object.getOwnPropertyDescriptors(callableStatus), statusDescriptors);
  assert.equal(invocationCalls, 0);
  assert.equal(conversionCalls, 0);
});
