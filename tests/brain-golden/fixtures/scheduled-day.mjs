export default {
  name: "scheduled-day",
  activeDate: "2026-07-04",
  store: {
    "2026-07-04": {
      dailyTasks: [],
      todayTasks: [
        {
          id: "task-schedule-prepare",
          title: "配信準備メモを整える",
          done: false,
          priority: true,
          createdAt: "2026-07-03T21:00:00.000Z",
          updatedAt: "2026-07-04T07:30:00.000Z",
        },
      ],
      todayEvents: [
        {
          id: "event-standup",
          title: "編集打ち合わせ",
          time: "10:30",
          type: "meeting",
          note: "",
        },
      ],
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
