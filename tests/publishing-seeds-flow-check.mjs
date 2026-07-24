import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "app.js");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function createFakeLocalStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    dump() {
      return Object.fromEntries(data.entries());
    },
  };
}

function createNode(tagName = "div") {
  return {
    tagName: tagName.toUpperCase(),
    value: "",
    textContent: "",
    className: "",
    hidden: false,
    dataset: {},
    children: [],
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
    append(...nodes) {
      this.children.push(...nodes);
    },
    appendChild(node) {
      this.children.push(node);
    },
    replaceChildren(...nodes) {
      this.children = [...nodes];
    },
    setAttribute() {},
    querySelector(selector) {
      if (selector === "textarea") {
        return this.children.find((child) => child.tagName === "TEXTAREA") || null;
      }
      return null;
    },
    scrollIntoView() {},
    get childElementCount() {
      return this.children.length;
    },
  };
}

function createDocumentStub(seedValues) {
  const nodes = new Map();
  for (const [id, value] of Object.entries(seedValues)) {
    const node = createNode(id.includes("Theme") || id.includes("Take") || id.includes("Summary") ? "textarea" : "input");
    node.value = value;
    nodes.set(`#${id}`, node);
  }
  for (const id of [
    "publishingSeedTotalCount",
    "publishingSeedOpenCount",
    "publishingSeedArticleCount",
    "publishingSeedHoldCount",
    "publishingSeedSearchCount",
    "publishingSeedSaveStatus",
    "publishingSeedList",
    "publishing-seed-candidates",
    "publishing-seeds",
    "publishingSeedNewsTab",
    "publishingSeedSeedsTab",
  ]) {
    nodes.set(`#${id}`, nodes.get(`#${id}`) || createNode());
  }
  return {
    body: createNode("body"),
    createElement: createNode,
    createTextNode(text) {
      return { textContent: text };
    },
    execCommand() {
      return false;
    },
    querySelector(selector) {
      return nodes.get(selector) || null;
    },
    querySelectorAll() {
      return [];
    },
  };
}

function stripStartup(source) {
  return source
    .replace(/\r?\narrangeDashboardUxSections\(\);\r?\n/, "\n")
    .replace(/\r?\nbindEvents\(\);\r?\n/, "\n")
    .replace(/\r?\nresetXExperimentForm\(\);\r?\n/, "\n")
    .replace(/\r?\nrenderAll\(\);\r?\n/, "\n")
    .replace(/\r?\nrenderClock\(\);\r?\n/, "\n")
    .replace(/\r?\nsetInterval\(renderClock, 1000\);\r?\n/, "\n");
}

const context = {
  Blob: class Blob {},
  URL: { createObjectURL: () => "blob:seeds-flow", revokeObjectURL() {} },
  alert() {},
  confirm: () => true,
  console,
  crypto: {
    randomUUID() {
      return `seed-flow-${Math.random().toString(36).slice(2)}`;
    },
  },
  document: createDocumentStub({
    publishingSeedTitle: "Seeds MVP",
    publishingSeedThemeName: "未来の発信",
    publishingSeedSummary: "書けない日に備える思考メモ",
    publishingSeedOriginalTheme: "書けない日に未来の自分を助ける",
    publishingSeedPersonalTake: "記事を貯めるのではなく、自分の反応を貯める。",
    publishingSeedTags: "発信, Seeds",
    publishingSeedStatus: "種",
  }),
  Intl,
  localStorage: createFakeLocalStorage(),
  navigator: {},
  setInterval() {
    return 0;
  },
  window: {},
};
context.globalThis = context;
context.window = context;

const exposed = `
savePublishingSeedFromForm({ preventDefault() {} });
const savedSeeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
publishingSeedCandidates = [
  normalizePublishingSeedCandidate({ id: "candidate-a", originalTopic: "関連ニュースA", status: "Seed化", seedIds: [publishingSeeds[0].id] }),
  normalizePublishingSeedCandidate({ id: "candidate-b", originalTopic: "関連ニュースB", status: "Seed化", seedIds: ["merge-source"] }),
];
publishingSeeds.push(normalizePublishingSeed({
  id: "merge-source",
  title: "統合元Seed",
  summary: "統合元の要約",
  personalTake: "統合元のメモ",
  tags: "統合",
  candidateIds: ["candidate-b"],
}));
publishingSeeds[0].candidateIds = ["candidate-a"];
mergePublishingSeeds(publishingSeeds[0], "merge-source");
const mergedSeeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
const mergedCandidates = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
convertPublishingSeedToExperiment(publishingSeeds[0]);
const articleSeeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
const experimentLogs = JSON.parse(localStorage.getItem(X_EXPERIMENT_LOG_STORAGE_KEY));
deletePublishingSeed(publishingSeeds[0]);
const deletedSeeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
const deletedCandidates = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
const backup = createBackup();
globalThis.__seedsFlowResult = {
  savedSeeds,
  mergedSeeds,
  mergedCandidates,
  articleSeeds,
  experimentLogs,
  deletedSeeds,
  deletedCandidates,
  backupSeeds: backup.data[PUBLISHING_SEEDS_STORAGE_KEY],
  backupExperiments: backup.data[X_EXPERIMENT_LOG_STORAGE_KEY],
};
`;

vm.runInNewContext(`${stripStartup(readFileSync(sourcePath, "utf8"))}\n${exposed}`, context, {
  filename: sourcePath,
});

const result = context.__seedsFlowResult;
check(result.savedSeeds.length === 1, "Seed was not saved");
check(result.savedSeeds[0].title === "Seeds MVP", "Seed title was not persisted");
check(result.savedSeeds[0].summary === "書けない日に備える思考メモ", "Seed summary was not persisted");
check(result.savedSeeds[0].themeName === "未来の発信", "Seed theme name was not persisted");
check(result.savedSeeds[0].personalTake.includes("自分の反応"), "Seed personal take was not persisted");
check(result.mergedSeeds.length === 1, "Merged source Seed was not removed");
check(result.mergedSeeds[0].candidateIds.includes("candidate-a") && result.mergedSeeds[0].candidateIds.includes("candidate-b"), "Merged Seed did not preserve candidate links");
check(result.mergedCandidates.find((candidate) => candidate.id === "candidate-b").seedIds.includes(result.mergedSeeds[0].id), "Merged candidate was not relinked");
check(result.articleSeeds[0].status === "記事化", "Seed was not marked as article");
check(Boolean(result.articleSeeds[0].articleExperimentId), "Seed articleExperimentId was not set");
check(result.experimentLogs.length === 1, "Experiment log was not created from Seed");
check(result.experimentLogs[0].hypothesis.includes("自分の反応"), "Experiment hypothesis did not use the personal take");
check(result.deletedSeeds.length === 0, "Deleted Seed was not removed");
check(result.deletedCandidates.every((candidate) => candidate.status === "未確認" && !candidate.seedIds.length), "Deleted Seed did not unlink related candidates");
check(result.backupSeeds.length === 0, "Backup still includes deleted Seeds");
check(result.backupExperiments.length === 1, "Backup does not include generated experiment log");

if (failures.length) {
  console.error("Publishing Seeds flow check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Publishing Seeds flow check: OK");
}
