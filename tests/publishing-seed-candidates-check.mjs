import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");
const stylesCss = readFileSync(resolve(root, "styles.css"), "utf8");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function extractDelimitedBlock(source, marker, openCharacter, closeCharacter) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return "";
  const start = source.indexOf(openCharacter, markerIndex);
  if (start < 0) return "";
  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === openCharacter) depth += 1;
    if (source[index] === closeCharacter) depth -= 1;
    if (depth === 0) return source.slice(start + 1, index);
  }
  return "";
}

for (const id of [
  "publishing-seed-candidates",
  "publishingSeedCandidateForm",
  "publishingSeedCandidateTopic",
  "publishingSeedCandidateSummary",
  "publishingSeedCandidateReason",
  "publishingSeedCandidateSourceName",
  "publishingSeedCandidateSourceUrl",
  "publishingSeedCandidateFetchedDate",
  "publishingSeedCandidateJson",
  "publishingSeedCandidateList",
]) {
  check(indexHtml.includes(`id="${id}"`), `Seed candidate UI ID is missing: ${id}`);
}

for (const label of [
  "Seed候補",
  "元の話題",
  "要点",
  "選定理由",
  "出典名",
  "出典URL",
  "未確認",
  "Seed化",
  "見送り",
  "JSONで候補を取り込む",
]) {
  check(indexHtml.includes(label), `Seed candidate UI label is missing: ${label}`);
}

check(
  appJs.includes('const PUBLISHING_SEED_CANDIDATES_STORAGE_KEY = "operation-dashboard-publishing-seed-candidates-v1";'),
  "Seed candidate localStorage key is missing",
);
check(appJs.includes('const PUBLISHING_SEED_CANDIDATE_STATUSES = ["未確認", "Seed化", "見送り"];'), "Seed candidate statuses are not fixed");
check(appJs.includes("let publishingSeedCandidates = loadPublishingSeedCandidates();"), "Seed candidates are not loaded at startup");
check(appJs.includes("function normalizePublishingSeedCandidate"), "Seed candidate normalizer is missing");
check(appJs.includes("source.reason ??"), "Seed candidate JSON import does not support reason");
check(appJs.includes('source["なぜ、さくら向け？"]'), "Seed candidate JSON import does not support Japanese reason key");
check(appJs.includes("function savePublishingSeedCandidateFromForm"), "Seed candidate manual save handler is missing");
check(appJs.includes("function importPublishingSeedCandidatesFromJson"), "Seed candidate JSON import handler is missing");
check(appJs.includes("function createSeedFromCandidate"), "Seed candidate conversion function is missing");

const conversionBody = extractDelimitedBlock(appJs, "function createSeedFromCandidate", "{", "}");
for (const token of [
  "publishingSeeds.unshift(seed)",
  'candidate.status = "Seed化"',
  "seedCandidateId: candidate.id",
  "sourceUrl: candidate.sourceUrl",
  "選定理由",
  "savePublishingSeeds();",
  "savePublishingSeedCandidates();",
  "renderPublishingSeeds();",
]) {
  check(conversionBody.includes(token), `Seed candidate conversion does not include: ${token}`);
}

const importBody = extractDelimitedBlock(appJs, "function candidateItemsFromJson", "{", "}");
for (const token of ["parsed?.candidates", "parsed?.items", "parsed?.results"]) {
  check(importBody.includes(token), `Seed candidate JSON import does not support: ${token}`);
}

const backupKeysBlock = extractDelimitedBlock(appJs, "const BACKUP_KEYS =", "[", "]");
const createBackupBody = extractDelimitedBlock(appJs, "function createBackup()", "{", "}");
check(backupKeysBlock.includes("PUBLISHING_SEED_CANDIDATES_STORAGE_KEY"), "Seed candidate key is not included in BACKUP_KEYS");
check(createBackupBody.includes("data[PUBLISHING_SEED_CANDIDATES_STORAGE_KEY]"), "Seed candidate data is not exported by createBackup()");
check(appJs.includes("publishingSeedCandidates: publishingSeedCandidateItems"), "Seed candidates are not included in Sakura snapshot payload");

check(stylesCss.includes(".publishing-seed-candidates-panel"), "Seed candidate panel styles are missing");
check(stylesCss.includes(".publishing-seed-candidate-reason"), "Seed candidate reason styles are missing");
check(stylesCss.includes(".publishing-seed-candidate-card.status-Seed化"), "Seed candidate Seed化 styles are missing");
check(stylesCss.includes(".publishing-seed-candidate-card.status-見送り"), "Seed candidate 見送り styles are missing");

if (failures.length) {
  console.error("Publishing Seed Candidates check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Publishing Seed Candidates check: OK");
}
