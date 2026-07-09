import candidateNone from "./candidate-none.mjs";

export const INTENT_DIRECTION = "今週のリリースを仕上げる";
export const INTENT_RECEIVED_MARKER = "意図を受け取";
export const STEP_SIZE_MARKER = "歩幅";
export const SAFETY_MESSAGE = "その方向でいきましょう。今日は少し小さめの入口から始めると良さそうです。";

const cockpitStore = {
  "2026-07-04": {
    topPriority: INTENT_DIRECTION,
    articleNote: "",
    todayFocus: "",
    growthTarget: "",
    noticed: "",
    communityChecks: {},
    updatedAt: "2026-07-04T08:30:00.000Z",
  },
};

const normalHealthState = [{
  id: "health-normal-2026-07-04",
  date: "2026-07-04",
  sleepHours: "7",
  sleepQuality: "good",
  recoveryFeeling: "good",
  nutritionSatisfaction: "good",
  medicationStatus: "unknown",
  energyLevel: "normal",
  mood: "steady",
  stressLevel: "low",
  createdAt: "2026-07-04T07:00:00.000Z",
  updatedAt: "2026-07-04T07:30:00.000Z",
}];

const lowHealthState = [{
  id: "health-low-2026-07-04",
  date: "2026-07-04",
  sleepHours: "5",
  sleepQuality: "light",
  recoveryFeeling: "low",
  nutritionSatisfaction: "low",
  medicationStatus: "unknown",
  energyLevel: "low",
  mood: "mixed",
  stressLevel: "high",
  createdAt: "2026-07-04T07:00:00.000Z",
  updatedAt: "2026-07-04T07:30:00.000Z",
}];

function withIntent(name, healthState) {
  return {
    ...candidateNone,
    name,
    healthState,
    localStorage: {
      ...candidateNone.localStorage,
      "operation-cockpit-v1": cockpitStore,
    },
  };
}

export const intentCases = [
  {
    name: "intent-none",
    fixture: candidateNone,
    baseline: candidateNone,
  },
  {
    name: "intent-normal-health",
    fixture: withIntent("intent-normal-health", normalHealthState),
  },
  {
    name: "intent-low-health",
    fixture: withIntent("intent-low-health", lowHealthState),
  },
  {
    name: "intent-no-health-signal",
    fixture: withIntent("intent-no-health-signal", []),
  },
];
