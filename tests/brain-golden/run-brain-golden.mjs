import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createBrainGoldenHarness } from "./harness.mjs";
import { normalizeBrainGoldenResult } from "./normalize.mjs";
import candidateNone from "./fixtures/candidate-none.mjs";
import scheduledDay from "./fixtures/scheduled-day.mjs";
import manyOpen from "./fixtures/many-open.mjs";
import writingFlow from "./fixtures/writing-flow.mjs";
import memoryContext from "./fixtures/memory-context.mjs";
import healthLow from "./fixtures/health-low.mjs";
import learningHighConfidence from "./fixtures/learning-high-confidence.mjs";

const fixtures = [
  candidateNone,
  scheduledDay,
  manyOpen,
  writingFlow,
  memoryContext,
  healthLow,
  learningHighConfidence,
];

const currentDir = dirname(fileURLToPath(import.meta.url));
const expectedDir = resolve(currentDir, "expected");
const shouldUpdate = process.argv.includes("--update");
const harness = createBrainGoldenHarness();
const failures = [];

for (const fixture of fixtures) {
  const actual = normalizeBrainGoldenResult(harness.runFixture(fixture));
  const expectedPath = resolve(expectedDir, `${fixture.name}.json`);
  const actualText = `${JSON.stringify(actual, null, 2)}\n`;

  if (shouldUpdate) {
    writeFileSync(expectedPath, actualText);
    console.log(`updated ${fixture.name}`);
    continue;
  }

  const expectedText = readFileSync(expectedPath, "utf8");
  if (actualText !== expectedText) {
    failures.push(fixture.name);
    console.error(`mismatch: ${fixture.name}`);
  } else {
    console.log(`ok ${fixture.name}`);
  }
}

if (failures.length) {
  console.error(`brain golden failed: ${failures.join(", ")}`);
  console.error("Run with --update only after intentionally accepting changed Brain decisions.");
  process.exit(1);
}

console.log("brain golden passed");
