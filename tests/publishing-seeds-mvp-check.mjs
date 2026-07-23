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
  "publishing-seeds",
  "publishingSeedForm",
  "publishingSeedTitle",
  "publishingSeedOriginalTheme",
  "publishingSeedPersonalTake",
  "publishingSeedTags",
  "publishingSeedStatus",
  "publishingSeedFilterStatus",
  "publishingSeedList",
]) {
  check(indexHtml.includes(`id="${id}"`), `Seeds UI ID is missing: ${id}`);
}

for (const label of [
  "タイトル（仮）",
  "元テーマ",
  "自分の一言",
  "種",
  "記事化",
  "保留",
]) {
  check(indexHtml.includes(label), `Seeds UI label is missing: ${label}`);
}

check(
  appJs.includes('const PUBLISHING_SEEDS_STORAGE_KEY = "operation-dashboard-publishing-seeds-v1";'),
  "Seeds localStorage key is missing",
);
check(appJs.includes('const PUBLISHING_SEED_STATUSES = ["種", "記事化", "保留"];'), "Seeds statuses are not fixed");
check(appJs.includes("let publishingSeeds = loadPublishingSeeds();"), "Seeds data is not loaded at startup");
check(appJs.includes("function savePublishingSeedFromForm"), "Seeds save handler is missing");
check(appJs.includes("function convertPublishingSeedToExperiment"), "Seeds article conversion is missing");
check(appJs.includes("renderPublishingSeeds();"), "Seeds render is not connected");
check(appJs.includes('$("#publishingSeedForm")?.addEventListener("submit", savePublishingSeedFromForm);'), "Seeds form submit is not bound");

const convertBody = extractDelimitedBlock(appJs, "function convertPublishingSeedToExperiment", "{", "}");
for (const token of [
  "xExperimentLogs.unshift(log)",
  'seed.status = "記事化"',
  "seed.articleExperimentId = log.id",
  "savePublishingSeeds();",
  "saveXExperimentLogs();",
  "renderXExperimentLogs();",
]) {
  check(convertBody.includes(token), `Seeds article conversion does not include: ${token}`);
}

const backupKeysBlock = extractDelimitedBlock(appJs, "const BACKUP_KEYS =", "[", "]");
const createBackupBody = extractDelimitedBlock(appJs, "function createBackup()", "{", "}");
check(backupKeysBlock.includes("PUBLISHING_SEEDS_STORAGE_KEY"), "Seeds key is not included in BACKUP_KEYS");
check(createBackupBody.includes("data[PUBLISHING_SEEDS_STORAGE_KEY]"), "Seeds data is not exported by createBackup()");
check(appJs.includes("publishingSeeds: publishingSeedItems"), "Seeds are not included in Sakura snapshot payload");

check(stylesCss.includes(".publishing-seeds-panel"), "Seeds panel styles are missing");
check(stylesCss.includes(".publishing-seed-card.status-記事化"), "Seeds article status styles are missing");
check(stylesCss.includes(".publishing-seed-card.status-保留"), "Seeds hold status styles are missing");

if (failures.length) {
  console.error("Publishing Seeds MVP check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Publishing Seeds MVP check: OK");
}
