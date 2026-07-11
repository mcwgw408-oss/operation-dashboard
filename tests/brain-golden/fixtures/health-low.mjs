import manyOpen from "./many-open.mjs";

export default {
  ...manyOpen,
  name: "health-low",
  healthState: [
    {
      id: "health-2026-07-05",
      date: "2026-07-05",
      sleepHours: "8",
      sleepQuality: "good",
      recoveryFeeling: "recovered",
      nutritionSatisfaction: "good",
      medicationStatus: "unknown",
      energyLevel: "high",
      mood: "steady",
      stressLevel: "low",
      bodyNote: "翌日の記録",
      createdAt: "2026-07-05T07:00:00.000Z",
      updatedAt: "2026-07-05T08:30:00.000Z",
    },
    {
      id: "health-2026-07-04",
      date: "2026-07-04",
      sleepHours: "5",
      sleepQuality: "light",
      recoveryFeeling: "low",
      nutritionSatisfaction: "low",
      medicationStatus: "unknown",
      energyLevel: "low",
      mood: "mixed",
      stressLevel: "high",
      bodyNote: "今日は軽めにする",
      createdAt: "2026-07-04T07:00:00.000Z",
      updatedAt: "2026-07-04T07:30:00.000Z",
    },
  ],
};
