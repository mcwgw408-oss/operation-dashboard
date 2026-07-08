import manyOpen from "./many-open.mjs";

const learningLog = Array.from({ length: 10 }, (_, index) => ({
  id: `learning-start-small-${index + 1}`,
  date: `2026-06-${String(24 + index).padStart(2, "0")}`,
  energy: "Low Energy",
  mode: "low-energy",
  taskCount: 8,
  eventCount: 0,
  recommendationType: "start_small",
  recommendationText: "今日は小さく始める提案が合っていました。",
  accepted: true,
  note: "",
  createdAt: `2026-06-${String(24 + index).padStart(2, "0")}T08:00:00.000Z`,
}));

export default {
  ...manyOpen,
  name: "learning-high-confidence",
  learningLog,
};
