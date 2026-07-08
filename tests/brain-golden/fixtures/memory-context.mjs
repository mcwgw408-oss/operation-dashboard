import writingFlow from "./writing-flow.mjs";

export default {
  ...writingFlow,
  name: "memory-context",
  memoryStore: {
    projectMemory: [
      {
        project: "Substack",
        title: "Sakura AI記事の流れ",
        summary: "判断ログを記事化する流れを継続している。",
        source: "project-memory",
        importance: 4,
        tags: ["substack", "writing"],
        updatedAt: "2026-07-04T07:00:00.000Z",
      },
    ],
    shortMemory: [
      {
        id: "memory-recent-writing",
        type: "recommendation",
        title: "昨日も記事を少し進めた",
        summary: "完了よりも15分進める提案が合っていた。",
        source: "recommendation",
        importance: 3,
        tags: ["recommendation", "continue_flow", "writing"],
        updatedAt: "2026-07-03T20:00:00.000Z",
      },
    ],
  },
};
