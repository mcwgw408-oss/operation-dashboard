import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createBrainGoldenHarness } from "../brain-golden/harness.mjs";
import { normalizeSnapshotGoldenResult } from "./normalize.mjs";

const fixtures = [
  {
    name: "cockpit-empty",
    localStorage: {},
  },
  {
    name: "cockpit-valid",
    localStorage: {
      "operation-dashboard-v1": {
        "2026-07-04": {
          todayWeather: "cloudy",
          todayWeatherUpdatedAt: "2026-07-04T08:00:00.000Z",
          dailyTasks: [],
          todayTasks: [],
          todayEvents: [],
          reflection: {},
        },
      },
      "operation-cockpit-v1": {
        "2026-06-27": { topPriority: "outside range" },
        "2026-06-29": {
          topPriority: "Ship the weekly note",
          articleNote: "Keep the opening concrete",
          todayFocus: "Finish the first draft",
          growthTarget: "Write consistently",
          noticed: "Morning focus was steady",
          communityChecks: { comments: true, notes: false, ignored: "yes" },
          checks: { mail: true },
          creatorChecks: { privateCreatorId: true },
          updatedAt: "2026-06-29T08:00:00.000Z",
        },
        "2026-07-04": {
          topPriority: "Review the release",
          todayFocus: "Resolve the final blocker",
          updatedAt: "2026-07-04T08:30:00.000Z",
        },
        "2026-07-05": { topPriority: "future value" },
      },
    },
  },
  {
    name: "cockpit-malformed",
    localStorage: {
      "operation-cockpit-v1": "{not-json",
    },
  },
  {
    name: "cockpit-legacy",
    localStorage: {
      "operation-cockpit-v1": {
        schemaVersion: 0,
        days: [{ date: "2026-07-04", priority: "legacy priority" }],
      },
    },
  },
];

const currentDir = dirname(fileURLToPath(import.meta.url));
const expectedDir = resolve(currentDir, "expected");
const shouldUpdate = process.argv.includes("--update");
const harness = createBrainGoldenHarness();
const failures = [];

if (shouldUpdate) mkdirSync(expectedDir, { recursive: true });

for (const fixture of fixtures) {
  const actual = normalizeSnapshotGoldenResult(harness.runSnapshotFixture(fixture));
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
  console.error(`snapshot golden failed: ${failures.join(", ")}`);
  console.error("Run with --update only after intentionally accepting changed Snapshot output.");
  process.exit(1);
}

console.log("snapshot golden passed");
