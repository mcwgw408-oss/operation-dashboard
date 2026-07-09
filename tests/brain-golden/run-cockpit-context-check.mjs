import assert from "node:assert/strict";
import { createBrainGoldenHarness } from "./harness.mjs";
import { normalizeBrainGoldenResult } from "./normalize.mjs";
import { normalizeBrainExpressionGoldenResult } from "./expression-normalize.mjs";
import candidateNone from "./fixtures/candidate-none.mjs";

const validCockpitStore = {
  "2026-07-03": {
    topPriority: "Previous day",
  },
  "2026-07-04": {
    topPriority: "Ship the current release",
    articleNote: "Use a concrete opening",
    todayFocus: "Resolve the final blocker",
    growthTarget: "Keep a steady cadence",
    noticed: "Morning focus was clear",
    communityChecks: { comments: true },
    checks: { mail: true },
    mailChecks: { morning: true },
    creatorChecks: { privateCreatorId: true },
    updatedAt: "2026-07-04T08:30:00.000Z",
  },
};

const withCockpit = {
  ...candidateNone,
  name: "candidate-none-with-cockpit",
  localStorage: {
    ...candidateNone.localStorage,
    "operation-cockpit-v1": validCockpitStore,
  },
};
const malformedCockpit = {
  ...candidateNone,
  localStorage: {
    ...candidateNone.localStorage,
    "operation-cockpit-v1": "{not-json",
  },
};
const legacyCockpit = {
  ...candidateNone,
  localStorage: {
    ...candidateNone.localStorage,
    "operation-cockpit-v1": {
      schemaVersion: 0,
      days: [{ date: "2026-07-04", priority: "legacy priority" }],
    },
  },
};

const harness = createBrainGoldenHarness();
const cockpitIntent = harness.runContextFixture(withCockpit);
assert.deepEqual(JSON.parse(JSON.stringify(cockpitIntent)), {
  date: "2026-07-04",
  topPriority: "Ship the current release",
  articleNote: "Use a concrete opening",
  todayFocus: "Resolve the final blocker",
  growthTarget: "Keep a steady cadence",
  noticed: "Morning focus was clear",
  updatedAt: "2026-07-04T08:30:00.000Z",
});

assert.equal(harness.runContextFixture(candidateNone), null);
assert.equal(harness.runContextFixture(malformedCockpit), null);
assert.equal(harness.runContextFixture(legacyCockpit), null);

const brainWithoutCockpit = normalizeBrainGoldenResult(harness.runFixture(candidateNone));
const brainWithCockpit = normalizeBrainGoldenResult(harness.runFixture(withCockpit));
assert.deepEqual(brainWithCockpit, brainWithoutCockpit);

const expressionWithoutCockpit = normalizeBrainExpressionGoldenResult(
  harness.runExpressionFixture(candidateNone),
);
const expressionWithCockpit = normalizeBrainExpressionGoldenResult(
  harness.runExpressionFixture(withCockpit),
);
assert.deepEqual(expressionWithCockpit, expressionWithoutCockpit);

console.log("cockpit context check passed");
