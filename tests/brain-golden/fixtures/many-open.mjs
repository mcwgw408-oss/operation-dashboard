const todayTasks = Array.from({ length: 8 }, (_, index) => ({
  id: `open-task-${index + 1}`,
  title: `未完了タスク ${index + 1}`,
  done: false,
  priority: index === 0,
  createdAt: `2026-07-0${index < 3 ? 3 : 2}T08:00:00.000Z`,
  updatedAt: `2026-07-0${index < 2 ? 4 : 3}T08:00:00.000Z`,
}));

export default {
  name: "many-open",
  activeDate: "2026-07-04",
  store: {
    "2026-07-04": {
      dailyTasks: [],
      todayTasks,
      todayEvents: [],
      projects: [],
      reflection: {},
    },
  },
  laterItems: [],
  persistentMemos: [],
  learningLog: [],
  memoryStore: { projectMemory: [], shortMemory: [] },
  healthState: [],
  localStorage: {},
};
