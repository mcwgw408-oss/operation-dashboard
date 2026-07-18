import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");
const stylesCss = readFileSync(resolve(root, "styles.css"), "utf8");
const failures = [];
const warnings = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function warn(condition, message) {
  if (condition) warnings.push(message);
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

function sortedDifference(left, right) {
  const rightSet = new Set(right);
  return [...new Set(left)].filter((item) => !rightSet.has(item)).sort();
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split("\n").length;
}

function enclosingFunctionName(source, index) {
  const prefix = source.slice(0, index);
  const matches = [...prefix.matchAll(/^(?:async\s+)?function\s+([A-Za-z0-9_]+)\s*\(/gm)];
  return matches.at(-1)?.[1] || "";
}

for (const docPath of [
  "docs/app-js-map.md",
  "docs/design-rules.md",
  "docs/decision-pipeline.md",
]) {
  check(existsSync(resolve(root, docPath)), `保守docsがありません: ${docPath}`);
}

check(
  existsSync(resolve(root, "tests/later-items-sort-check.mjs")),
  "あとで見る・あとで読むの表示順単体テストが検査セットから外れています: tests/later-items-sort-check.mjs",
);

const ids = [...indexHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))].sort();
check(duplicateIds.length === 0, `index.htmlに重複IDがあります: ${duplicateIds.join(", ")}`);

const requiredIds = [
  "activeDate",
  "backToTop",
  "laterSortToggle",
  "dashboard-start",
  "dashboard-input",
  "dashboard-accumulation",
  "dashboard-closed",
  "morningGuidanceText",
  "explainableGuidanceReasons",
  "dailyFocusPriority",
  "dailyFocusNextAction",
  "dailyFocusCondition",
  "dailyFocusTask",
  "brainRecommendationTitle",
  "brainRecommendationMessage",
  "brainRecommendationAction",
  "brainPriority",
  "firstAgentResponse",
  "generatedReplyMount",
  "generatedReplyText",
  "replyFeedbackMount",
  "conversationFeedbackNote",
  "learningFeedbackNote",
  "dailyInputText",
  "todayTaskDateLabel",
  "todayEventDateLabel",
  "dailyTasks",
  "healthCheckInputMount",
  "memoryMemoForm",
  "memoryMemoText",
  "laterSearch",
  "laterList",
  "persistentMemoSearch",
  "persistentMemoList",
  "learningSearch",
  "learningGlobalSearch",
  "learningGlobalSearchResults",
  "learningGlobalSearchList",
  "learningList",
  "addLearning",
  "memoryLibrarySearch",
  "memoryLibraryType",
  "memoryLibraryCount",
  "memoryLibraryList",
  "memoryLibraryMore",
  "publishingOpsRecentRange",
  "publishingOpsRecentSummary",
  "publishingOpsRecentList",
  "operationExperimentName",
  "operationExperimentExecution",
  "operationExperimentReaction",
  "operationExperimentObservation",
  "operationExperimentRecentList",
  "saveOperationExperiment",
  "sakuraInnerToggle",
  "exportBackup",
  "importBackup",
  "importBackupFile",
];
const idSet = new Set(ids);
const missingIds = requiredIds.filter((id) => !idSet.has(id));
check(missingIds.length === 0, `必須DOM IDがありません: ${missingIds.join(", ")}`);

const backupKeysBlock = extractDelimitedBlock(appJs, "const BACKUP_KEYS =", "[", "]");
check(Boolean(backupKeysBlock), "BACKUP_KEYS配列を取得できません");
const backupKeys = [...backupKeysBlock.matchAll(/\b([A-Z][A-Z0-9_]*_KEY)\b/g)]
  .map((match) => match[1]);
const createBackupBody = extractDelimitedBlock(appJs, "function createBackup()", "{", "}");
check(Boolean(createBackupBody), "createBackup()本体を取得できません");
const exportedKeys = [...createBackupBody.matchAll(/data\[([A-Z][A-Z0-9_]*_KEY)\]\s*=/g)]
  .map((match) => match[1]);
const missingExports = sortedDifference(backupKeys, exportedKeys);
const unexpectedExports = sortedDifference(exportedKeys, backupKeys);
check(backupKeys.includes("OPERATION_COCKPIT_STORAGE_KEY"), "operation-cockpit must be protected by dashboard backup");
check(missingExports.length === 0, `BACKUP_KEYSにあるが書き出されないキー: ${missingExports.join(", ")}`);
check(unexpectedExports.length === 0, `書き出されるがBACKUP_KEYSにないキー: ${unexpectedExports.join(", ")}`);

for (const key of [
  "STORAGE_KEY",
  "LEARNING_LOG_STORAGE_KEY",
  "MEMORY_STORE_STORAGE_KEY",
  "SNAPSHOT_SETTINGS_KEY",
  "OPERATION_COCKPIT_STORAGE_KEY",
  "OPERATION_EXPERIMENT_STORAGE_KEY",
  "CUSTOM_DAILY_TASKS_STORAGE_KEY",
  "DAILY_TASK_ORDER_STORAGE_KEY",
]) {
  check(backupKeys.includes(key), `必須バックアップキーがありません: ${key}`);
}

for (const token of [
  "copy-learning-memory",
  "add-learning-memory",
  "learning-memory-status",
  'id="learningGlobalSearchResults"',
  'id="learningGlobalSearchList"',
]) {
  check(indexHtml.includes(token), `学び・記憶UIがありません: ${token}`);
}
check(appJs.includes("function upsertLearningMemory"), "学びから記憶へ追加する関数がありません");
check(appJs.includes("const source = `learning:${learning.id}`;"), "学び由来記憶のsource規則がありません");
check(appJs.includes('result.status === "updated"'), "学び由来記憶の更新状態表示がありません");
check(appJs.includes("const MEMORY_LIBRARY_PAGE_SIZE = 10;"), "記憶一覧の初期表示件数が10件ではありません");
check(appJs.includes("const SNAPSHOT_VERSION = 1;"), "snapshotVersion must remain 1 for the additive cockpit app section");
check(appJs.includes('const SNAPSHOT_DICTIONARY_VERSION = "v1.4";'), "snapshot dictionaryVersion must describe the todayWeather summary and cockpit app section");
check(appJs.includes('const OPERATION_COCKPIT_STORAGE_KEY = "operation-cockpit-v1";'), "operation-cockpit read key is missing");
check(appJs.includes('"operation-cockpit": {'), "operation-cockpit Snapshot app payload is missing");
const readOperationCockpitStoreBody = extractDelimitedBlock(appJs, "function readOperationCockpitStore", "{", "}");
const buildOperationCockpitRecentDaysBody = extractDelimitedBlock(appJs, "function buildOperationCockpitRecentDays", "{", "}");
const buildOperationCockpitIntentContextBody = extractDelimitedBlock(appJs, "function buildOperationCockpitIntentContext", "{", "}");
const collectBrainContextBody = extractDelimitedBlock(appJs, "function collectBrainContext", "{", "}");
const buildBrainDecisionBody = extractDelimitedBlock(appJs, "function buildBrainDecision", "{", "}");
const buildBrainExpressionStart = appJs.indexOf("function buildBrainExpression");
const buildBrainExpressionEnd = appJs.indexOf("function renderMorningGuidanceLayer", buildBrainExpressionStart);
const buildBrainExpressionBody = appJs.slice(buildBrainExpressionStart, buildBrainExpressionEnd);
check(readOperationCockpitStoreBody.includes("readStoredJson"), "operation-cockpit adapter must use guarded JSON reading");
check(!readOperationCockpitStoreBody.includes("localStorage.setItem"), "operation-cockpit adapter must not write localStorage");
for (const forbiddenToken of ["localStorage", "saveStore(", "getDay("]) {
  check(
    !buildOperationCockpitRecentDaysBody.includes(forbiddenToken),
    `operation-cockpit pure transform calls forbidden token: ${forbiddenToken}`,
  );
  check(
    !buildOperationCockpitIntentContextBody.includes(forbiddenToken),
    `operation-cockpit Intent transform calls forbidden token: ${forbiddenToken}`,
  );
}
check(collectBrainContextBody.includes("cockpitIntent"), "Brain Context must expose cockpitIntent");
check(buildBrainDecisionBody.includes("cockpitIntent"), "Brain Decision must use cockpitIntent in Step13-c");
check(!buildBrainExpressionBody.includes("cockpitIntent"), "Brain Expression must not read raw cockpitIntent");
check(buildBrainExpressionBody.includes("intentDecision"), "Brain Expression must use the normalized intentDecision");
check(appJs.includes("function shouldRegenerateBrainForIntentChange"), "Intent regeneration boundary is missing");
check(appJs.includes('window.addEventListener("storage", handleOperationCockpitStorageChange);'), "Cockpit storage changes must be observed");
const forgetShortMemoryBody = extractDelimitedBlock(appJs, "function forgetShortMemory", "{", "}");
check(forgetShortMemoryBody.includes("memoryStore.shortMemory"), "記憶削除処理がshortMemoryを対象にしていません");
check(!forgetShortMemoryBody.includes("projectMemory"), "記憶削除処理がprojectMemoryに触れています");

for (const token of [
  "発信運営の保存済み記録",
  "最近7日の発信運営",
  'id="publishingOpsRecentRange"',
  'id="publishingOpsRecentSummary"',
  'id="publishingOpsRecentList"',
]) {
  check(indexHtml.includes(token), `recent publishing ops UI is missing: ${token}`);
}
check(appJs.includes("const PUBLISHING_OPS_RECENT_DAYS = 7;"), "recent publishing ops period is not fixed to 7 days");
check(appJs.includes("function buildPublishingOpsRecentFlow"), "recent publishing ops aggregation function is missing");
check(appJs.includes("function renderPublishingOpsRecentFlow"), "recent publishing ops render function is missing");
check(appJs.includes("store[dateKey]?.publishingOps"), "recent publishing ops must read only store[dateKey].publishingOps");
check(appJs.includes("Number(value)"), "recent publishing ops counts must be numeric");
for (const token of [
  "ノート投稿数",
  "チャット投稿数",
  "記事投稿数",
  "音声記事投稿数",
  "おはスタック「できた／少しできた」の日数",
  "記録なし",
]) {
  check(appJs.includes(token) || indexHtml.includes(token), `recent publishing ops label is missing: ${token}`);
}
const buildPublishingOpsRecentFlowBody = extractDelimitedBlock(appJs, "function buildPublishingOpsRecentFlow", "{", "}");
const renderPublishingOpsRecentFlowBody = extractDelimitedBlock(appJs, "function renderPublishingOpsRecentFlow", "{", "}");
for (const [label, body] of [
  ["aggregation", buildPublishingOpsRecentFlowBody],
  ["render", renderPublishingOpsRecentFlowBody],
]) {
  for (const forbiddenToken of [
    "getDay(",
    "ensurePublishingOps(",
    "saveStore(",
    "localStorage.setItem",
  ]) {
    check(!body.includes(forbiddenToken), `recent publishing ops ${label} calls forbidden token: ${forbiddenToken}`);
  }
}
const savePublishingOpsFromFormBody = extractDelimitedBlock(appJs, "function savePublishingOpsFromForm", "{", "}");
check(savePublishingOpsFromFormBody.includes("renderPublishingOpsRecentFlow();"), "recent publishing ops is not refreshed after save");
check(appJs.includes('publishingOpsUpdatedAt: ""'), "発信運営の更新日時初期値がありません");
check(appJs.includes('dailyInputUpdatedAt: ""'), "今日の入力の更新日時初期値がありません");
check(savePublishingOpsFromFormBody.includes("day.publishingOpsUpdatedAt = new Date().toISOString();"), "発信運営の更新日時が保存されません");
check(appJs.includes('day.dailyInputUpdatedAt = new Date().toISOString();'), "今日の入力の更新日時が保存されません");
for (const label of [
  "本日の記録を保存する",
  "本日の記録を更新する",
  "本日の入力を保存する",
  "本日の入力を更新する",
  "最終更新",
]) {
  check(appJs.includes(label) || indexHtml.includes(label), `保存・更新表示がありません: ${label}`);
}
for (const label of [
  "今日だけの用事",
  "今日だけの予定（単発）",
  "翌日には引き継がれません",
]) {
  check(indexHtml.includes(label), `今日だけの予定・用事の説明がありません: ${label}`);
}
check(appJs.includes("function renderTodayOnlyDateLabels"), "今日だけの予定・用事に対象日を表示する処理がありません");
check(indexHtml.includes("ここに追加した項目は、翌日以降にも引き継がれます"), "毎日タスクの引き継ぎ説明がありません");
check(appJs.includes("function loadCustomDailyTasks"), "追加した毎日タスクを引き継ぐ読み込み処理がありません");
check(appJs.includes('form.dataset.addList === "dailyTasks"'), "毎日タスク追加時の共通保存処理がありません");
const ensureDefaultDailyTasksBody = extractDelimitedBlock(appJs, "function ensureDefaultDailyTasks", "{", "}");
check(appJs.includes("function dailyTaskTitlesForDate"), "毎日タスクの表示順を日付ごとに決める処理がありません");
check(appJs.includes('const DAILY_TASK_ORDER_BASE_DATE = "2026-07-15";'), "毎日タスク順の基準日が2026-07-15に固定されていません");
check(appJs.includes("function previousDateKey"), "前日の日付キーを作る処理がありません");
check(appJs.includes("previousDayOrder.length"), "毎日タスク補完時に前日の順序が優先されません");
check(appJs.includes("DAILY_TASK_ORDER_BASE_DATE"), "毎日タスク補完時に2026-07-15の順序が参照されません");
check(appJs.includes("function loadDailyTaskOrder"), "最後に並べ替えた毎日タスク順を読み込む処理がありません");
check(appJs.includes("function saveDailyTaskOrderFromDay"), "最後に並べ替えた毎日タスク順を保存する処理がありません");
check(appJs.includes("function applySavedDailyTaskOrder"), "保存済みの毎日タスク順を日付データへ適用する処理がありません");
check(ensureDefaultDailyTasksBody.includes("dailyTaskTitlesForDate(activeDate)"), "毎日タスク補完時に保存済み順序が参照されません");
check(appJs.includes("return [...defaultDailyTasks, ...customDailyTasks].filter"), "独自の毎日タスクが日付データへ引き継がれません");
check(appJs.includes("function loadDeletedDailyTasks"), "削除した毎日タスクを引き継ぐ読み込み処理がありません");
check(appJs.includes("DELETED_DAILY_TASKS_STORAGE_KEY"), "削除した毎日タスクの保存キーがありません");
check(appJs.includes("!deletedDailyTasks.includes(title)"), "削除した毎日タスクが通常リストに復活します");
const renderTaskListBody = extractDelimitedBlock(appJs, "function renderTaskList", "{", "}");
check(renderTaskListBody.includes("renderBrainPrototype();"), "用事の変更後に判断メモが更新されません");
check(renderTaskListBody.includes('if (listId === "dailyTasks") saveDailyTaskOrderFromDay(day);'), "毎日タスクの並び替え後に最後の順序が保存されません");
check(/renderTaskList\(form\.dataset\.addList\);\s*renderBrainPrototype\(\);/s.test(appJs), "用事の追加後に判断メモが更新されません");
const publishingOpsPanelIndex = indexHtml.indexOf('class="panel publishing-ops-panel span-2"');
const publishingOpsHistoryIndex = indexHtml.indexOf('class="panel publishing-ops-history-panel span-2"');
const accumulationHeadingIndex = indexHtml.indexOf('id="dashboard-accumulation"');
check(publishingOpsPanelIndex >= 0, "発信運営入力パネルがありません");
check(publishingOpsHistoryIndex > publishingOpsPanelIndex, "保存済み記録が発信運営入力より前にあります");
check(accumulationHeadingIndex > publishingOpsHistoryIndex, "保存済み記録が「ここから、今日を書く」の最後にありません");

check(indexHtml.includes('class="dashboard-page-nav"'), "ページ内ナビがありません");
const dashboardZoneTargets = [
  "#dashboard-start",
  "#dashboard-input",
  "#dashboard-accumulation",
  "#dashboard-closed",
];
for (const target of dashboardZoneTargets) {
  check(indexHtml.includes(`href="${target}"`), `ページ内ナビのリンクがありません: ${target}`);
  check(indexHtml.includes(`id="${target.slice(1)}"`), `ページ内ナビ対象の見出しIDがありません: ${target}`);
}

const requiredOrders = new Map([
  [".dashboard .dashboard-page-nav", "8"],
  [".dashboard .dashboard-proposal-heading", "9"],
  [".dashboard .morning-guidance-panel", "10"],
  [".dashboard .summary-panel", "11"],
  [".dashboard .daily-focus-panel", "12"],
  [".dashboard .welcome-home-panel", "13"],
  [".dashboard .brain-panel", "14"],
  [".dashboard .dashboard-input-heading", "30"],
  [".dashboard .publishing-ops-panel", "31"],
  [".dashboard .operation-experiment-panel", "32"],
  [".dashboard .daily-input-panel", "33"],
  [".dashboard .dashboard-task-panel", "34"],
  [".dashboard .schedule-panel", "35"],
  [".dashboard .dashboard-health-input-panel", "36"],
  [".dashboard .dashboard-memory-input-panel", "37"],
  [".dashboard > .panel:has(#dailyTasks)", "38"],
  [".dashboard > .metrics-panel:has(#mailMorningChecked)", "39"],
  [".dashboard > .metrics-panel:has(#dmPending)", "40"],
  [".dashboard .publishing-ops-history-panel", "41"],
  [".dashboard .dashboard-accumulation-heading", "59"],
  [".dashboard .reflection-panel", "60"],
  [".dashboard .learning-panel", "61"],
  [".dashboard .later-panel", "62"],
  [".dashboard .persistent-memo-panel", "63"],
  [".dashboard .memory-library-panel", "64"],
  [".dashboard .dashboard-closed-heading", "79"],
  [".dashboard .sakura-panel", "80"],
  [".dashboard .home-launch-panel", "81"],
  [".dashboard > .panel:has(#projects)", "83"],
  [".dashboard .dashboard-ai-analysis-panel", "85"],
  [".dashboard .data-panel", "86"],
]);
for (const [selector, order] of requiredOrders) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escapedSelector}\\s*\\{[^}]*\\border:\\s*${order}\\s*;`, "s");
  check(pattern.test(stylesCss), `CSS orderが見つからないか変更されています: ${selector} = ${order}`);
}
check(/\.dashboard\s+\.dashboard-page-nav\s*\{[^}]*\border:\s*8\s*;/s.test(stylesCss), "ページ内ナビのorder 8が維持されていません");

const knownEnglishEmptyMessages = [
  "Retrieved memory is not available yet.",
  "Recent memory is not available yet.",
];
for (const message of knownEnglishEmptyMessages) {
  warn(indexHtml.includes(message) || appJs.includes(message), `既知の英語空文言が残っています: ${message}`);
}

const allowedSetItemFunctionNames = new Set([
  "loadPersonalityProfile",
  "loadRelationshipProfile",
  "getDay",
  "persistStore",
  "renderHistory",
  "handleImportBackupFile",
]);
const forbiddenSetItemCalls = [...appJs.matchAll(/localStorage\.setItem\s*\(/g)]
  .map((match) => ({
    line: lineNumberAt(appJs, match.index),
    functionName: enclosingFunctionName(appJs, match.index),
  }))
  .filter(({ functionName }) => !functionName.startsWith("save") && !allowedSetItemFunctionNames.has(functionName));
check(
  forbiddenSetItemCalls.length === 0,
  `許可範囲外のlocalStorage.setItemがあります: ${forbiddenSetItemCalls.map((call) => `${call.functionName || "(global)"}:${call.line}`).join(", ")}`,
);

const mobileBlocks = [];
let searchIndex = 0;
const mobileMarker = "@media (max-width: 720px)";
while ((searchIndex = stylesCss.indexOf(mobileMarker, searchIndex)) >= 0) {
  mobileBlocks.push(extractDelimitedBlock(stylesCss.slice(searchIndex), mobileMarker, "{", "}"));
  searchIndex += mobileMarker.length;
}
const mobileCss = mobileBlocks.join("\n");
check(mobileBlocks.length > 0, "720px以下のモバイルメディアクエリがありません");
for (const selector of [
  ".dashboard",
  ".daily-focus-grid",
  ".dashboard-page-nav",
  ".daily-input-panel",
  ".learning-item",
  ".learning-actions",
  ".learning-search-heading",
  ".learning-global-search-result",
  ".memory-library-controls",
  ".memory-library-footer",
  ".publishing-ops-recent-summary",
  ".publishing-ops-recent-counts",
  ".publishing-ops-recent-statuses",
  ".publishing-ops-recent-heading",
]) {
  check(mobileCss.includes(selector), `モバイル規則に必須セレクタがありません: ${selector}`);
}
check(/\.dashboard[\s\S]*?grid-template-columns:\s*1fr\s*;/.test(mobileCss), "モバイルでdashboardが1列になっていません");
check(/\.dashboard-page-nav[\s\S]*?scrollbar-width:\s*thin\s*;/.test(mobileCss), "モバイルでページ内ナビの横スクロール補助がありません");
check(/\.dashboard-page-nav[\s\S]*?overflow-x:\s*auto\s*;/.test(stylesCss), "ページ内ナビが横スクロール可能になっていません");
check(/\.dashboard-section-heading[\s\S]*?scroll-margin-top:\s*18px\s*;/.test(stylesCss), "ページ内ナビ対象見出しにscroll-margin-topがありません");
check(/\.back-to-top\s*\{[^}]*position:\s*fixed\s*;/s.test(stylesCss), "上へ戻るボタンが画面に固定されていません");
check(appJs.includes('window.scrollY < 600'), "上へ戻るボタンの表示開始位置がありません");
check(appJs.includes('$("#backToTop")?.addEventListener("click", scrollBackToTop);'), "上へ戻るボタンのクリック処理がありません");
check(appJs.includes("function buildDailyInputDecisionContext"), "今日の入力を一日の判断材料にする処理がありません");
check(appJs.includes('find((item) => item.date === brainActiveDate)'), "判断メモが選択日の体調を参照していません");
check(appJs.includes("function buildDailyConditionCandidate"), "予定・体調を作業候補より先に扱う処理がありません");
check(appJs.includes("recommendation: recommendationExpression"), "生成された返答が判断メモの最終提案を参照していません");
check(existsSync(resolve(root, "tests/brain-golden/run-daily-decision-reply-check.mjs")), "一日の判断と生成された返答の連動テストがありません");
check(/\.learning-actions[\s\S]*?flex-direction:\s*column\s*;/.test(mobileCss), "モバイルで学び操作欄が縦並びになっていません");

if (failures.length) {
  console.error("Static regression check: FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  warnings.forEach((warning) => console.warn(`Static regression check warning: ${warning}`));
  console.log(`Static regression check: OK (${ids.length} IDs, ${backupKeys.length} backup keys)`);
}
