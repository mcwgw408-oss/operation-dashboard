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
  };
}

function createNode(tagName = "div") {
  return {
    tagName: tagName.toUpperCase(),
    value: "",
    textContent: "",
    className: "",
    hidden: false,
    disabled: false,
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
    focus() {},
    scrollIntoView() {},
    get childElementCount() {
      return this.children.length;
    },
  };
}

function createDocumentStub(values) {
  const nodes = new Map();
  for (const [id, value] of Object.entries(values)) {
    const node = createNode(id.includes("Summary") || id.includes("Reason") || id.includes("Json") ? "textarea" : "input");
    node.value = value;
    nodes.set(`#${id}`, node);
  }
  for (const id of [
    "publishingSeedCandidateTotalCount",
    "publishingSeedCandidateUncheckedCount",
    "publishingSeedCandidateSeededCount",
    "publishingSeedCandidateSkippedCount",
    "publishingSeedCandidateSearchCount",
    "publishingSeedCandidateStatus",
    "publishingSeedCandidateImportStatus",
    "publishingSeedCandidateList",
    "publishingSeedTotalCount",
    "publishingSeedOpenCount",
    "publishingSeedArticleCount",
    "publishingSeedHoldCount",
    "publishingSeedSearchCount",
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
  URL: { createObjectURL: () => "blob:seed-candidates-flow", revokeObjectURL() {} },
  alert() {},
  confirm: () => true,
  console,
  crypto: {
    randomUUID() {
      return `seed-candidate-flow-${Math.random().toString(36).slice(2)}`;
    },
  },
  document: createDocumentStub({
    publishingSeedCandidateTopic: "AI時代の毎日発信",
    publishingSeedCandidateSummary: "書く前の反応を保存する人が増えている",
    publishingSeedCandidateReason: "さくらの毎日発信に近い悩みだから",
    publishingSeedCandidateSourceName: "manual",
    publishingSeedCandidateSourceUrl: "https://example.com/topic",
    publishingSeedCandidateFetchedDate: "2026-07-23",
    publishingSeedCandidateJson: JSON.stringify({
      candidates: [{
        "元の話題": "JSON候補",
        "要点": "外部取得をあとで接続できる形",
        "なぜ、さくら向け？": "候補からSeedへ移す判断を試せるから",
        "出典名": "json",
        "出典URL": "https://example.com/json",
        "取得日": "2026-07-23",
      }],
    }),
  }),
  Intl,
  localStorage: createFakeLocalStorage(),
  navigator: {},
  setInterval() {
    return 0;
  },
  setTimeout(callback) {
    callback();
    return 0;
  },
  window: {},
};
context.globalThis = context;
context.window = context;

const exposed = `
savePublishingSeedCandidateFromForm({ preventDefault() {} });
const afterManual = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
importPublishingSeedCandidatesFromJson();
const afterImport = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
createSeedFromCandidate(publishingSeedCandidates[0], "ここは自分の視点で書ける。");
const afterSeed = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
const seeds = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
deletePublishingSeedCandidate(publishingSeedCandidates[0]);
const afterDelete = JSON.parse(localStorage.getItem(PUBLISHING_SEED_CANDIDATES_STORAGE_KEY));
const seedsAfterDelete = JSON.parse(localStorage.getItem(PUBLISHING_SEEDS_STORAGE_KEY));
const backup = createBackup();
globalThis.__seedCandidateFlowResult = {
  afterManual,
  afterImport,
  afterSeed,
  seeds,
  afterDelete,
  seedsAfterDelete,
  backupCandidates: backup.data[PUBLISHING_SEED_CANDIDATES_STORAGE_KEY],
  backupSeeds: backup.data[PUBLISHING_SEEDS_STORAGE_KEY],
};
`;

vm.runInNewContext(`${stripStartup(readFileSync(sourcePath, "utf8"))}\n${exposed}`, context, {
  filename: sourcePath,
});

const result = context.__seedCandidateFlowResult;
check(result.afterManual.length === 1, "Manual candidate was not saved");
check(result.afterManual[0].originalTopic === "AI時代の毎日発信", "Manual candidate topic was not persisted");
check(result.afterManual[0].reason === "さくらの毎日発信に近い悩みだから", "Manual candidate reason was not persisted");
check(result.afterImport.length === 2, "JSON candidate was not imported");
check(result.afterImport[0].originalTopic === "JSON候補", "Japanese JSON keys were not normalized");
check(result.afterImport[0].reason === "候補からSeedへ移す判断を試せるから", "Japanese reason key was not normalized");
check(result.afterSeed[0].status === "Seed化", "Candidate was not marked Seed化");
check(result.afterSeed[0].collapsed === true, "Seeded candidate was not collapsed");
check(result.afterSeed[0].seedIds.includes(result.seeds[0].id), "Candidate does not link to created Seed");
check(result.seeds.length === 1, "Seed was not created from candidate");
check(result.seeds[0].personalTake.includes("自分の視点"), "Created Seed did not use personal take");
check(result.seeds[0].candidateIds.includes(result.afterSeed[0].id), "Created Seed does not include candidateIds");
check(result.seeds[0].seedCandidateId === result.afterSeed[0].id, "Created Seed does not link back to candidate");
check(result.afterDelete.length === 1, "Deleted candidate was not removed");
check(!result.afterDelete.some((candidate) => candidate.id === result.afterSeed[0].id), "Deleted candidate is still present");
check(!result.seedsAfterDelete[0].candidateIds.includes(result.afterSeed[0].id), "Deleted candidate link stayed on Seed");
check(result.seedsAfterDelete[0].seedCandidateId === "", "Deleted candidate primary link stayed on Seed");
check(result.backupCandidates.length === 1, "Backup still includes deleted Seed candidate");
check(result.backupSeeds.length === 1, "Backup does not include created Seed");

if (failures.length) {
  console.error("Publishing Seed Candidates flow check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Publishing Seed Candidates flow check: OK");
}
