import assert from "node:assert/strict";
import { createBrainGoldenHarness } from "./brain-golden/harness.mjs";

const activeDate = "2026-07-04";
const dailyTasks = [
  { id: "daily-1", title: "Daily routine 1", done: true },
  { id: "daily-2", title: "Daily routine 2", done: true },
  { id: "daily-3", title: "Daily routine 3", done: true },
  { id: "daily-4", title: "Daily routine 4", done: true },
];
const todayTasks = [
  { id: "today-1", title: "Today task open", done: false },
  { id: "today-2", title: "Today task done", done: true },
];
const day = {
  dailyTasks,
  todayTasks,
  todayEvents: [],
  projects: [],
  reflection: {},
};

const harness = createBrainGoldenHarness();
const decision = harness.runFixture({
  name: "today-completion-scope",
  activeDate,
  store: { [activeDate]: day },
  laterItems: [],
  persistentMemos: [
    {
      id: "memo-1",
      title: "Long-running research note",
      done: false,
      updatedAt: "2026-07-04T08:00:00.000Z",
    },
  ],
  learningLog: [],
  memoryStore: { projectMemory: [], shortMemory: [] },
  healthState: [],
  localStorage: {},
});

assert.equal(decision.recommendationInput.completedToday, 1);
assert.equal(decision.priorityCandidate.source, "operation-dashboard.todayTasks");
assert.equal(decision.priorityCandidate.title, "Today task open");

const snapshot = harness.runSnapshotFixture({
  mode: "morning",
  localStorage: {
    "operation-dashboard-v1": {
      [activeDate]: day,
    },
  },
});

assert.equal(snapshot.summary.todayProgress, "1/2");

console.log("today completion scope check passed");
