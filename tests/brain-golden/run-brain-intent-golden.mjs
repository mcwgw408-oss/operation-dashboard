import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createBrainGoldenHarness } from "./harness.mjs";
import { normalizeBrainGoldenResult } from "./normalize.mjs";
import { normalizeBrainExpressionGoldenResult } from "./expression-normalize.mjs";
import {
  INTENT_DIRECTION,
  INTENT_RECEIVED_MARKER,
  SAFETY_MESSAGE,
  STEP_SIZE_MARKER,
  intentCases,
} from "./fixtures/intent-cases.mjs";

const currentDir = dirname(fileURLToPath(import.meta.url));
const expectedDir = resolve(currentDir, "intent-expected");
const harness = createBrainGoldenHarness();
const failures = [];
const results = new Map();
const decisionOnly = process.argv.includes("--decision-only");

function stableText(value) {
  return JSON.stringify(value);
}

for (const testCase of intentCases) {
  const brain = normalizeBrainGoldenResult(harness.runFixture(testCase.fixture));
  const expression = normalizeBrainExpressionGoldenResult(
    harness.runExpressionFixture(testCase.fixture),
  );
  let actual;

  if (testCase.baseline) {
    const baselineBrain = normalizeBrainGoldenResult(harness.runFixture(testCase.baseline));
    const baselineExpression = normalizeBrainExpressionGoldenResult(
      harness.runExpressionFixture(testCase.baseline),
    );
    actual = {
      brainByteIdentical: stableText(brain) === stableText(baselineBrain),
      expressionByteIdentical: stableText(expression) === stableText(baselineExpression),
    };
    if (decisionOnly) {
      actual = { brainByteIdentical: actual.brainByteIdentical };
    }
  } else {
    const message = expression.recommendation.message || "";
    const judgmentMemo = stableText(expression.explainLayerDetails);
    actual = {
      direction: INTENT_DIRECTION,
      priorityTitle: brain.priorityCandidate?.title || "",
      directionRepeated: message.includes(INTENT_DIRECTION),
      intentReceivedInMessage: message.includes(INTENT_RECEIVED_MARKER),
      intentReceivedInJudgmentMemo: judgmentMemo.includes(INTENT_RECEIVED_MARKER),
      stepSizeRecorded: judgmentMemo.includes(STEP_SIZE_MARKER),
      safetyMessageIncluded: stableText(expression).includes(SAFETY_MESSAGE),
    };
    if (decisionOnly) {
      actual = {
        direction: actual.direction,
        priorityTitle: actual.priorityTitle,
      };
    }
  }

  results.set(testCase.name, { brain, expression, actual });
  const expected = JSON.parse(
    readFileSync(resolve(expectedDir, `${testCase.name}.json`), "utf8"),
  );
  const comparableExpected = decisionOnly
    ? Object.fromEntries(Object.keys(actual).map((key) => [key, expected[key]]))
    : expected;
  if (stableText(actual) !== stableText(comparableExpected)) {
    failures.push(testCase.name);
    console.error(`mismatch: ${testCase.name}`);
  } else {
    console.log(`ok ${testCase.name}`);
  }
}

const normalPriority = results.get("intent-normal-health")?.brain.priorityCandidate?.title;
const lowPriority = results.get("intent-low-health")?.brain.priorityCandidate?.title;
if (normalPriority !== INTENT_DIRECTION) {
  failures.push("intent-direction-normal-health");
  console.error("mismatch: intent direction was not prioritized under normal health");
}
if (lowPriority !== "休息を優先する") {
  failures.push("intent-health-safety-priority");
  console.error("mismatch: low health did not place recovery before execution");
}

if (failures.length) {
  console.error(`brain intent golden failed: ${[...new Set(failures)].join(", ")}`);
  process.exit(1);
}

console.log("brain intent golden passed");
