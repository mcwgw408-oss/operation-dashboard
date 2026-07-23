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
    const node = createNode(id.includes("Theme") || id.includes("Take") ? "textarea" : "input");
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
convertPublishingSeedToExperiment(publishingSeeds[0]);
const articleSeeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
const experimentLogs = JSON.parse(localStorage.getItem(X_EXPERIMENT_LOG_STORAGE_KEY));
const backup = createBackup();
globalThis.__seedsFlowResult = {
  savedSeeds,
  articleSeeds,
  experimentLogs,
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
check(result.savedSeeds[0].personalTake.includes("自分の反応"), "Seed personal take was not persisted");
check(result.articleSeeds[0].status === "記事化", "Seed was not marked as article");
check(Boolean(result.articleSeeds[0].articleExperimentId), "Seed articleExperimentId was not set");
check(result.experimentLogs.length === 1, "Experiment log was not created from Seed");
check(result.experimentLogs[0].hypothesis.includes("自分の反応"), "Experiment hypothesis did not use the personal take");
check(result.backupSeeds.length === 1, "Backup does not include Seeds");
check(result.backupExperiments.length === 1, "Backup does not include generated experiment log");

if (failures.length) {
  console.error("Publishing Seeds flow check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Publishing Seeds flow check: OK");
}
