const STORAGE_KEY = "operation-dashboard-v1";
const LATER_STORAGE_KEY = "operation-dashboard-later-v1";
const LATER_VIEW_STORAGE_KEY = "operation-dashboard-later-view-v1";
const PERSISTENT_MEMO_STORAGE_KEY = "operation-dashboard-persistent-memos-v1";
const LEARNING_LOG_STORAGE_KEY = "sakura-learning-log-v1";

// ===== さくらスナップショット（Phase 1）の定数 =====
const SNAPSHOT_FORMAT = "sakura-snapshot";
const SNAPSHOT_VERSION = 1;
const SNAPSHOT_DICTIONARY_VERSION = "v1.2";
const SNAPSHOT_SETTINGS_KEY = "sakura-snapshot-settings-v1";
const SNAPSHOT_DETAIL_DAYS = 7;
const SNAPSHOT_LOG_DAYS = 30;

const EXTERNAL_APP_KEYS = {
  discoveries: "discovery-labo-discoveries",
  discoverySources: "discovery-labo-entry-sources-v1",
  koryu: "koryu-log-labo-entries",
  hasshin: "hasshin-kansatsu-labo-entries",
  substack: "substack-labo-workspace-v2",
  substackLegacy: "substack-labo-store",
  stock: "stock-labo-items-v1",
};

const snapshotSettingDefaults = {
  reflection: true,
  feelings: true,
  mailDmCounts: true,
  stock: false,
};
let snapshotMode = new Date().getHours() < 12 ? "morning" : "night";
const defaultDailyTasks = [
  "メール確認",
  "DM確認（前日分まで）",
  "記事執筆（翌日公開分）",
  "ボイスメッセージ（翌日公開分）",
  "Notes投稿",
  "おはスタック投稿",
  "チャット投稿",
];
const defaultProjects = [
  "無料アプリ改善",
  "Substack交流",
  "GitHub",
  "新企画",
  "新アプリ構想",
];

const $ = (selector) => document.querySelector(selector);
const listIds = ["dailyTasks", "todayTasks", "projects"];
const eventTypeLabels = {
  meeting: "打ち合わせ",
  outing: "外出",
  medical: "医療・ケア",
  delivery: "配信",
  broadcast: "コラボ・配信",
  other: "その他",
};
let activeDate = toDateInputValue(new Date());
let store = loadStore();
let laterItems = loadLaterItems();
let showDoneLater = loadShowDoneLater();
let autoDedupeLater = loadAutoDedupeLater();
let laterSearchQuery = "";
let persistentMemos = loadPersistentMemos();
let learningLog = loadLearningLog();
let currentLearningLogId = "";

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function newItem(title = "") {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    priority: false,
  };
}

function newEvent({ title = "", time = "", type = "other", note = "" } = {}) {
  return {
    id: crypto.randomUUID(),
    title,
    time,
    type,
    note,
  };
}

function newLaterItem({ type = "見る", title = "", url = "", memo = "" } = {}) {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    url,
    memo,
    done: false,
    createdAt: new Date().toISOString(),
  };
}

function newLearningItem() {
  return {
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    title: "",
    url: "",
    hook: "",
    experiment: "",
    intro: "",
  };
}

function newPersistentMemo() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    text: "",
    createdAt: now,
    updatedAt: now,
  };
}

function blankDay() {
  return {
    dailyTasks: defaultDailyTasks.map(newItem),
    todayTasks: [],
    todayEvents: [],
    projects: defaultProjects.map(newItem),
    memos: [],
    learnings: [],
    metrics: {
      mailUnread: "",
      mailProcessed: "",
      mailMorningChecked: false,
      mailNoonChecked: false,
      mailNightChecked: false,
      mailLastCheckedAt: "",
      dmPending: "",
      dmHandled: "",
      dmPreviousDone: false,
      commentReplies: "",
    },
    reflection: {
      didToday: "",
      blockedToday: "",
      tomorrowPlan: "",
    },
    updatedAt: new Date().toISOString(),
  };
}

function ensureDefaultDailyTasks(day) {
  let changed = false;
  day.dailyTasks ||= [];
  defaultDailyTasks.forEach((title) => {
    if (!day.dailyTasks.some((item) => item.title === title)) {
      day.dailyTasks.push(newItem(title));
      changed = true;
    }
  });
  return changed;
}

function ensureMetricDefaults(day) {
  let changed = false;
  day.metrics ||= {};
  ["mailMorningChecked", "mailNoonChecked", "mailNightChecked"].forEach((key) => {
    if (!(key in day.metrics)) {
      day.metrics[key] = false;
      changed = true;
    }
  });
  if (!("mailLastCheckedAt" in day.metrics)) {
    day.metrics.mailLastCheckedAt = "";
    changed = true;
  }
  return changed;
}

function ensureLearningList(day) {
  if (!Array.isArray(day.learnings)) {
    day.learnings = [];
    return true;
  }
  return false;
}

function ensureTodayEvents(day) {
  if (!Array.isArray(day.todayEvents)) {
    day.todayEvents = [];
    return true;
  }
  return false;
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function loadLaterItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(LATER_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadShowDoneLater() {
  try {
    return JSON.parse(localStorage.getItem(LATER_VIEW_STORAGE_KEY))?.showDone ?? true;
  } catch {
    return true;
  }
}

function loadAutoDedupeLater() {
  try {
    return JSON.parse(localStorage.getItem(LATER_VIEW_STORAGE_KEY))?.autoDedupe ?? false;
  } catch {
    return false;
  }
}

function loadPersistentMemos() {
  try {
    const saved = JSON.parse(localStorage.getItem(PERSISTENT_MEMO_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadLearningLog() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEARNING_LOG_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveLaterItems() {
  localStorage.setItem(LATER_STORAGE_KEY, JSON.stringify(laterItems));
}

function saveLaterView() {
  localStorage.setItem(
    LATER_VIEW_STORAGE_KEY,
    JSON.stringify({ showDone: showDoneLater, autoDedupe: autoDedupeLater }),
  );
}

function savePersistentMemos() {
  localStorage.setItem(PERSISTENT_MEMO_STORAGE_KEY, JSON.stringify(persistentMemos));
}

function saveLearningLog() {
  localStorage.setItem(LEARNING_LOG_STORAGE_KEY, JSON.stringify(learningLog));
}

function saveStore() {
  store[activeDate].updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  renderSummary();
  renderHistory();
}

function getDay() {
  if (!store[activeDate]) {
    store[activeDate] = blankDay();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureDefaultDailyTasks(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureMetricDefaults(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureLearningList(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  if (ensureTodayEvents(store[activeDate])) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }
  return store[activeDate];
}

function formatDateLabel(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

function renderClock() {
  $("#timeLabel").textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function renderSummary() {
  const day = getDay();
  const tracked = [
    ...day.dailyTasks,
    ...day.todayTasks,
    ...day.projects,
    { done: day.metrics.mailMorningChecked, title: "メール朝チェック" },
    { done: day.metrics.mailNoonChecked, title: "メール昼チェック" },
    { done: day.metrics.mailNightChecked, title: "メール夜チェック" },
    { done: day.metrics.dmPreviousDone, title: "DM前日分" },
  ];
  const total = tracked.length;
  const done = tracked.filter((item) => item.done).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  $("#dateLabel").textContent = formatDateLabel(activeDate);
  $("#progressLabel").textContent = `${progress}%`;
  $("#progressBar").style.width = `${progress}%`;
  $("#completeCount").textContent = `${done} / ${total}`;
}

function renderTaskList(listId) {
  const day = getDay();
  const target = $(`#${listId}`);
  const template = $("#taskTemplate");
  target.replaceChildren();
  day[listId].forEach((item, index) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.classList.toggle("done", item.done);
    row.classList.toggle("priority", item.priority && !item.done);
    const checkbox = row.querySelector(".task-check");
    const title = row.querySelector(".task-title");
    const priority = row.querySelector(".priority-button");
    checkbox.checked = item.done;
    title.value = item.title;
    priority.classList.toggle("active", item.priority);
    checkbox.addEventListener("change", () => {
      item.done = checkbox.checked;
      saveStore();
      renderTaskList(listId);
    });
    title.addEventListener("input", () => {
      item.title = title.value;
      saveStore();
    });
    priority.addEventListener("click", () => {
      day[listId].forEach((candidate) => {
        if (candidate.id !== item.id) candidate.priority = false;
      });
      item.priority = !item.priority;
      saveStore();
      renderTaskList(listId);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day[listId] = day[listId].filter((candidate) => candidate.id !== item.id);
      saveStore();
      renderTaskList(listId);
    });
    row.querySelectorAll(".move-button").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.move === "up" ? -1 : 1;
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= day[listId].length) return;
        const [moving] = day[listId].splice(index, 1);
        day[listId].splice(nextIndex, 0, moving);
        saveStore();
        renderTaskList(listId);
      });
    });
    target.append(row);
  });
}

function formatEventLabel(event) {
  return [
    event.time,
    event.title,
    event.type && event.type !== "other" ? `(${eventTypeLabels[event.type] || event.type})` : "",
  ].filter(Boolean).join(" ");
}

function renderEventList() {
  const day = getDay();
  const target = $("#todayEvents");
  const template = $("#eventTemplate");
  if (!target || !template) return;
  target.replaceChildren();
  day.todayEvents.forEach((event) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const time = row.querySelector(".event-time");
    const type = row.querySelector(".event-type");
    const title = row.querySelector(".event-title");
    const note = row.querySelector(".event-note");
    const updateEvent = () => {
      event.time = time.value.trim();
      event.type = type.value;
      event.title = title.value.trim();
      event.note = note.value.trim();
      saveStore();
      renderBrainPrototype();
    };
    time.value = event.time || "";
    type.value = event.type || "other";
    title.value = event.title || "";
    note.value = event.note || "";
    [time, type, title, note].forEach((field) => {
      field.addEventListener("input", updateEvent);
      field.addEventListener("change", updateEvent);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day.todayEvents = day.todayEvents.filter((candidate) => candidate.id !== event.id);
      saveStore();
      renderEventList();
      renderBrainPrototype();
    });
    target.append(row);
  });
}

function renderMailLastChecked() {
  const label = $("#mailLastCheckedLabel");
  if (!label) return;
  const value = getDay().metrics.mailLastCheckedAt;
  if (!value) {
    label.textContent = "未確認";
    return;
  }
  label.textContent = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function renderPersistentMemos({ focusId } = {}) {
  const target = $("#persistentMemoList");
  if (!target) return;
  const template = $("#persistentMemoTemplate");
  target.replaceChildren();
  if (!persistentMemos.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "残るメモはまだありません。";
    target.append(empty);
    return;
  }
  persistentMemos.forEach((memo) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const textarea = row.querySelector("textarea");
    const meta = row.querySelector(".persistent-memo-meta");
    textarea.value = memo.text || "";
    meta.textContent = memo.updatedAt
      ? `更新 ${new Intl.DateTimeFormat("ja-JP", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(memo.updatedAt))}`
      : "";
    textarea.addEventListener("input", () => {
      memo.text = textarea.value;
      memo.updatedAt = new Date().toISOString();
      savePersistentMemos();
      meta.textContent = `更新 ${new Intl.DateTimeFormat("ja-JP", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(memo.updatedAt))}`;
    });
    row.querySelector(".edit-button").addEventListener("click", () => {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      if (!confirm("この残るメモを削除しますか？")) return;
      persistentMemos = persistentMemos.filter((candidate) => candidate.id !== memo.id);
      savePersistentMemos();
      renderPersistentMemos();
    });
    target.append(row);
    if (memo.id === focusId) {
      textarea.focus();
    }
  });
}

function renderLearnings() {
  const day = getDay();
  const target = $("#learningList");
  if (!target) return;
  const template = $("#learningTemplate");
  target.replaceChildren();
  if (!day.learnings.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = "今日の学びはまだありません。";
    target.append(empty);
    return;
  }
  day.learnings.forEach((learning) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const title = row.querySelector(".learning-title");
    const url = row.querySelector(".learning-url");
    const hook = row.querySelector(".learning-hook");
    const experiment = row.querySelector(".learning-experiment");
    const intro = row.querySelector(".learning-intro");
    title.value = learning.title || "";
    url.value = learning.url || "";
    hook.value = learning.hook || "";
    experiment.value = learning.experiment || "";
    intro.value = learning.intro || "";
    [
      ["title", title],
      ["url", url],
      ["hook", hook],
      ["experiment", experiment],
      ["intro", intro],
    ].forEach(([key, field]) => {
      field.addEventListener("input", () => {
        learning[key] = field.value;
        saveStore();
      });
    });
    row.querySelector(".copy-learning-intro").addEventListener("click", async () => {
      const text = intro.value.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        intro.select();
        document.execCommand("copy");
      }
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day.learnings = day.learnings.filter((candidate) => candidate.id !== learning.id);
      saveStore();
      renderLearnings();
    });
    target.append(row);
  });
}

function renderLaterCounts() {
  const counts = laterItems.reduce(
    (summary, item) => {
      summary.total += 1;
      if (!item.done) summary.open += 1;
      if (item.type === "読む") summary.read += 1;
      else summary.watch += 1;
      return summary;
    },
    { open: 0, watch: 0, read: 0, total: 0 },
  );
  $("#laterOpenCount").textContent = counts.open;
  $("#laterWatchCount").textContent = counts.watch;
  $("#laterReadCount").textContent = counts.read;
  $("#laterTotalCount").textContent = counts.total;
}

function normalizeLaterText(value = "") {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeLaterUrl(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    url.hash = "";
    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return trimmed.replace(/\/$/, "").toLowerCase();
  }
}

function laterDuplicateKey(item) {
  const url = normalizeLaterUrl(item.url || "");
  if (url) return `url:${url}`;

  const title = normalizeLaterText(item.title || "");
  if (!title) return `id:${item.id}`;
  return `text:${item.type || "見る"}:${title}`;
}

function laterMatchesSearch(item, query) {
  if (!query) return true;
  return [item.type, item.title, item.url, item.memo]
    .map((value) => normalizeLaterText(value || ""))
    .join(" ")
    .includes(query);
}

function removeLaterDuplicates() {
  const seen = new Set();
  const before = laterItems.length;
  laterItems = laterItems.filter((item) => {
    const key = laterDuplicateKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return before - laterItems.length;
}

function renderLaterItems() {
  const target = $("#laterList");
  if (!target) return;
  const showDoneField = $("#showDoneLater");
  if (showDoneField) showDoneField.checked = showDoneLater;
  const autoDedupeField = $("#autoDedupeLater");
  if (autoDedupeField) autoDedupeField.checked = autoDedupeLater;
  renderLaterCounts();
  const template = $("#laterTemplate");
  target.replaceChildren();
  const searchField = $("#laterSearch");
  if (searchField && searchField.value !== laterSearchQuery) searchField.value = laterSearchQuery;
  const searchQuery = normalizeLaterText(laterSearchQuery);
  const statusItems = showDoneLater ? laterItems : laterItems.filter((item) => !item.done);
  const visibleItems = statusItems.filter((item) => laterMatchesSearch(item, searchQuery));
  const searchCount = $("#laterSearchCount");
  if (searchCount) {
    searchCount.hidden = !searchQuery;
    searchCount.querySelector("strong").textContent = visibleItems.length;
  }
  if (!visibleItems.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = searchQuery
      ? "検索に一致するあとで見るもの、読むものはありません。"
      : laterItems.length
      ? "未完了のあとで見るもの、読むものはありません。"
      : "あとで見るもの、読むものはまだありません。";
    target.append(empty);
    return;
  }
  visibleItems.forEach((item) => {
    const row = template.content.firstElementChild.cloneNode(true);
    row.classList.toggle("done", item.done);
    const check = row.querySelector(".later-check");
    const type = row.querySelector(".later-type");
    const title = row.querySelector(".later-title");
    const url = row.querySelector(".later-url");
    const memo = row.querySelector(".later-memo");
    const open = row.querySelector(".later-open");
    check.checked = item.done;
    type.value = item.type;
    title.value = item.title;
    url.value = item.url;
    memo.value = item.memo;
    open.href = item.url || "#";
    open.classList.toggle("disabled", !item.url);
    check.addEventListener("change", () => {
      item.done = check.checked;
      if (item.done) {
        showDoneLater = true;
        saveLaterView();
      }
      saveLaterItems();
      renderLaterItems();
    });
    type.addEventListener("change", () => {
      item.type = type.value;
      saveLaterItems();
      renderLaterCounts();
    });
    title.addEventListener("input", () => {
      item.title = title.value;
      saveLaterItems();
    });
    url.addEventListener("input", () => {
      item.url = url.value.trim();
      saveLaterItems();
      open.href = item.url || "#";
      open.classList.toggle("disabled", !item.url);
    });
    memo.addEventListener("input", () => {
      item.memo = memo.value;
      saveLaterItems();
    });
    open.addEventListener("click", (event) => {
      if (!item.url) event.preventDefault();
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      laterItems = laterItems.filter((candidate) => candidate.id !== item.id);
      saveLaterItems();
      renderLaterItems();
    });
    target.append(row);
  });
}

function renderFields() {
  const day = getDay();
  Object.entries(day.metrics).forEach(([key, value]) => {
    const field = $(`#${key}`);
    if (!field) return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value;
  });
  Object.entries(day.reflection).forEach(([key, value]) => {
    $(`#${key}`).value = value;
  });
}

function collectSearchText(day) {
  return [
    ...day.dailyTasks.map((item) => item.title),
    ...day.todayTasks.map((item) => item.title),
    ...asArray(day.todayEvents).flatMap((event) => [
      event.time,
      event.title,
      eventTypeLabels[event.type] || event.type,
      event.note,
    ]),
    ...day.projects.map((item) => item.title),
    ...(day.memos || []).map((memo) => memo.text),
    ...(day.learnings || []).flatMap((learning) => [
      learning.title,
      learning.url,
      learning.hook,
      learning.experiment,
      learning.intro,
    ]),
    ...Object.values(day.reflection),
  ].join(" ");
}

function renderHistory() {
  const query = $("#historySearch").value.trim().toLowerCase();
  const target = $("#historyList");
  target.replaceChildren();
  Object.entries(store)
    .sort(([a], [b]) => b.localeCompare(a))
    .filter(([, day]) => !query || collectSearchText(day).toLowerCase().includes(query))
    .slice(0, 30)
    .forEach(([date, day]) => {
      const row = document.createElement("div");
      row.className = "history-item";
      const tracked = [...day.dailyTasks, ...day.todayTasks, ...day.projects];
      const done = tracked.filter((item) => item.done).length;
      const total = tracked.length;
      row.innerHTML = `
        <strong>${date}</strong>
        <span>${done}/${total} 完了</span>
        <button class="ghost-button" type="button">開く</button>
        <button class="delete-button" type="button">削除</button>
      `;
      row.querySelector(".ghost-button").addEventListener("click", () => {
        activeDate = date;
        $("#activeDate").value = activeDate;
        renderAll();
      });
      row.querySelector(".delete-button").addEventListener("click", () => {
        if (!confirm(`${date} のデータを削除しますか？`)) return;
        delete store[date];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        if (activeDate === date) {
          activeDate = toDateInputValue(new Date());
        }
        renderAll();
      });
      target.append(row);
    });
}

function appendBrainItems(target, items, emptyText) {
  if (!target) return;
  target.replaceChildren();
  const visibleItems = items.filter(Boolean).slice(0, 5);
  if (!visibleItems.length) {
    const item = document.createElement("li");
    item.className = "empty-note";
    item.textContent = emptyText;
    target.append(item);
    return;
  }
  visibleItems.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    target.append(item);
  });
}

const PRIORITY_ENGINE_WEIGHTS = {
  explicitPriority: 40,
  todayTask: 30,
  dailyTask: 20,
  project: 16,
  hasshinNextAction: 18,
  writingInProgress: 18,
  fermentingIdea: 12,
  laterItem: 8,
  persistentMemo: 8,
  revisitPerson: 10,
  updatedToday: 8,
  staleSevenDays: 6,
  staleThirtyDays: 10,
  completedPenalty: -100,
  missingTitlePenalty: -20,
};

function brainTitleOf(item, fallback = "無題") {
  if (!item || typeof item !== "object") return fallback;
  return item.title || item.name || item.memo || item.text || item.body || fallback;
}

function brainIsOpen(item) {
  return item && !item.done && item.status !== "done" && item.status !== "完了";
}

function brainStatusMatches(value, labels) {
  return labels.includes(String(value || "").trim());
}

function brainFormatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function brainRecentDateOf(item) {
  return item?.updatedAt || item?.createdAt || item?.date || "";
}

function brainDaysSince(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
}

function readSubstackWorkspace() {
  const raw = readFirstStoredJson([EXTERNAL_APP_KEYS.substack, EXTERNAL_APP_KEYS.substackLegacy], null);
  if (!raw || typeof raw !== "object") return null;
  return raw;
}

function collectBrainWritingItems(workspace) {
  if (!workspace) return [];
  if (workspace.writings) {
    return [
      ...asArray(workspace.writings.notes),
      ...asArray(workspace.writings.articles),
    ];
  }
  if (workspace.content) {
    return Object.values(workspace.content).flatMap((entry) => asArray(entry));
  }
  return [];
}

function createPriorityCandidate({ item, source, sourceLabel, baseReason, basePoints }) {
  const title = brainTitleOf(item, "");
  const updatedAt = brainRecentDateOf(item);
  return {
    id: item?.id || `${source}:${title}`,
    item,
    source,
    sourceLabel,
    title,
    done: Boolean(item?.done),
    status: item?.status || "open",
    priorityFlag: Boolean(item?.priority),
    createdAt: item?.createdAt || item?.date || "",
    updatedAt,
    ageDays: brainDaysSince(item?.createdAt || item?.date),
    stalenessDays: brainDaysSince(updatedAt || item?.createdAt || item?.date),
    baseReason,
    basePoints,
  };
}

function collectPriorityCandidates(context) {
  const candidates = [];
  context.todayTasks.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.todayTasks",
    sourceLabel: "今日やること",
    baseReason: "今日やることに入っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.todayTask,
  })));
  context.dailyTasks.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.dailyTasks",
    sourceLabel: "毎日タスク",
    baseReason: "毎日タスクとして残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.dailyTask,
  })));
  context.projects.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.projects",
    sourceLabel: "育てるプロジェクト",
    baseReason: "育てるプロジェクトに入っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.project,
  })));
  context.laterOpen.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.laterItems",
    sourceLabel: "あとで見る/読む",
    baseReason: "あとで見る/読むに未完了で残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.laterItem,
  })));
  context.persistentMemos.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "operation-dashboard.persistentMemos",
    sourceLabel: "残るメモ",
    baseReason: "最近更新された残るメモです。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.persistentMemo,
  })));
  context.fermentingIdeas.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "discovery-labo.discoveries",
    sourceLabel: "発酵中アイデア",
    baseReason: "発酵中アイデアとして残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.fermentingIdea,
  })));
  context.hasshinNextActions.forEach((item) => candidates.push(createPriorityCandidate({
    item: { ...item, title: item.nextAction || item.title || item.memo },
    source: "hasshin-kansatsu-labo.entries",
    sourceLabel: "発信観察",
    baseReason: "発信観察に次アクションが残っています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.hasshinNextAction,
  })));
  context.writingInProgress.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "substack-labo.writing",
    sourceLabel: "執筆中記事",
    baseReason: "執筆中の記事です。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.writingInProgress,
  })));
  context.revisitPeople.forEach((item) => candidates.push(createPriorityCandidate({
    item,
    source: "koryu-log-labo.entries",
    sourceLabel: "また見たい人",
    baseReason: "また見たい人として記録されています。",
    basePoints: PRIORITY_ENGINE_WEIGHTS.revisitPerson,
  })));
  return candidates;
}

function scorePriorityCandidate(candidate) {
  const reasons = [];
  let score = 0;
  if (candidate.basePoints) {
    score += candidate.basePoints;
    reasons.push({ points: candidate.basePoints, text: candidate.baseReason });
  }
  if (candidate.priorityFlag) {
    score += PRIORITY_ENGINE_WEIGHTS.explicitPriority;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.explicitPriority, text: "優先マークが付いています。" });
  }
  if (candidate.updatedAt && brainDaysSince(candidate.updatedAt) === 0) {
    score += PRIORITY_ENGINE_WEIGHTS.updatedToday;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.updatedToday, text: "今日更新されています。" });
  }
  if (candidate.stalenessDays >= 30) {
    score += PRIORITY_ENGINE_WEIGHTS.staleThirtyDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleThirtyDays, text: "30日以上残っている未完了の項目です。" });
  } else if (candidate.stalenessDays >= 7) {
    score += PRIORITY_ENGINE_WEIGHTS.staleSevenDays;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.staleSevenDays, text: "7日以上残っている未完了の項目です。" });
  }
  if (candidate.done || candidate.status === "done" || candidate.status === "完了") {
    score += PRIORITY_ENGINE_WEIGHTS.completedPenalty;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.completedPenalty, text: "完了済みのため優先度を下げています。" });
  }
  if (!candidate.title) {
    score += PRIORITY_ENGINE_WEIGHTS.missingTitlePenalty;
    reasons.push({ points: PRIORITY_ENGINE_WEIGHTS.missingTitlePenalty, text: "タイトルがないため判断しにくい項目です。" });
  }
  const clampedScore = Math.max(0, Math.min(100, score));
  return { ...candidate, score: clampedScore, rawScore: score, reasons };
}

function inferEnergyContext(day, completedToday, openTodayCount) {
  const totalOpen = openTodayCount + asArray(day.dailyTasks).filter(brainIsOpen).length;
  const reflection = day.reflection || {};
  const reflectionText = [reflection.didToday, reflection.blockedToday, reflection.tomorrowPlan].join(" ");
  if (/休|疲|無理|しんど|回復/.test(reflectionText)) {
    return { state: "Recovery", modifier: -30, text: "回復を優先したい記録があるため、重い提案を控えめにしています。" };
  }
  if (completedToday >= 4) {
    return { state: "High Energy", modifier: 10, text: "今日は完了が多く、進める力がありそうです。" };
  }
  if (totalOpen >= 8 && completedToday === 0) {
    return { state: "Low Energy", modifier: -15, text: "未完了が多いため、短時間で触れる形に寄せています。" };
  }
  return { state: "Normal", modifier: 0, text: "通常の優先度で表示しています。" };
}

function inferMomentumContext(day, writingInProgress, hasshinNextActions) {
  const recentlyUpdatedWriting = writingInProgress.filter((item) => brainDaysSince(brainRecentDateOf(item)) !== null && brainDaysSince(brainRecentDateOf(item)) <= 2);
  const recentActions = hasshinNextActions.filter((item) => brainDaysSince(brainRecentDateOf(item)) !== null && brainDaysSince(brainRecentDateOf(item)) <= 3);
  if (recentlyUpdatedWriting.length || recentActions.length) {
    return { state: "Rising", modifier: 8, text: "最近の更新や次アクションがあり、流れが続いています。" };
  }
  const staleOpen = [...asArray(day.todayTasks), ...asArray(day.projects)].some((item) => brainIsOpen(item) && brainDaysSince(brainRecentDateOf(item)) >= 14);
  if (staleOpen) {
    return { state: "Declining", modifier: -6, text: "止まっている項目があるため、再開しやすい一手として扱います。" };
  }
  return { state: "Stable", modifier: 0, text: "大きな勢いの偏りはないため、基本スコアを優先しています。" };
}

function applyPriorityModifiers(candidate, energyContext, momentumContext) {
  const adjustedScore = Math.max(
    0,
    Math.min(100, candidate.score + energyContext.modifier + momentumContext.modifier),
  );
  return {
    ...candidate,
    adjustedScore,
    modifiers: [energyContext, momentumContext],
  };
}

function rankPriorityCandidates(candidates, energyContext, momentumContext) {
  return candidates
    .map(scorePriorityCandidate)
    .filter((candidate) => candidate.title && !candidate.done && candidate.status !== "done" && candidate.status !== "完了")
    .map((candidate) => applyPriorityModifiers(candidate, energyContext, momentumContext))
    .sort((a, b) => {
      if (b.adjustedScore !== a.adjustedScore) return b.adjustedScore - a.adjustedScore;
      if (Number(b.priorityFlag) !== Number(a.priorityFlag)) return Number(b.priorityFlag) - Number(a.priorityFlag);
      return String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a)));
    });
}

function explainPriorityCandidate(candidate) {
  if (!candidate) {
    return {
      summary: "未完了の候補が少ないため、今日は整える日として表示しています。",
      reasons: ["今日の優先候補として強く出る項目はありません。"],
    };
  }
  const topReasons = candidate.reasons
    .filter((reason) => reason.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
    .map((reason) => reason.text);
  const modifierReasons = candidate.modifiers
    .filter((modifier) => modifier.modifier !== 0)
    .map((modifier) => `${modifier.state}: ${modifier.text}`);
  return {
    summary: `${candidate.sourceLabel}から選ばれました。スコア ${candidate.adjustedScore} / 100 の最優先候補です。`,
    reasons: [...topReasons, ...modifierReasons],
  };
}

function inferEventContext(todayEvents) {
  const events = asArray(todayEvents).filter((event) => (event.title || "").trim());
  if (!events.length) {
    return {
      count: 0,
      level: "Open",
      text: "今日の予定は少なめに見えます。",
      labels: [],
    };
  }
  const labels = events.map(formatEventLabel);
  if (events.length >= 2) {
    return {
      count: events.length,
      level: "Busy",
      text: `今日は予定が${events.length}件あるため、新しい作業を増やしすぎない提案にしています。`,
      labels,
    };
  }
  return {
    count: events.length,
    level: "Scheduled",
    text: "今日は予定があるため、準備や休息の余白を残す提案にしています。",
    labels,
  };
}

function buildRecommendationInput(priorityCandidate, explanation, energyContext, momentumContext, context) {
  return {
    topCandidate: priorityCandidate || null,
    priorityReasons: asArray(explanation?.reasons),
    energy: energyContext,
    momentum: momentumContext,
    eventContext: context.eventContext,
    hasTodayEvents: context.eventContext.count > 0,
    hasFermentingIdeas: context.fermentingIdeas.length > 0,
    hasWritingInProgress: context.writingInProgress.length > 0,
    hasNextActions: context.hasshinNextActions.length > 0,
    openTodayCount: context.openTodayCount,
    completedToday: context.completedToday,
  };
}

function chooseRecommendationType(input) {
  if (!input.topCandidate) return "organize_or_rest";
  if (input.hasTodayEvents && input.eventContext.level !== "Open") return "schedule_context";
  if (input.energy.state === "Recovery") return "rest_first";
  if (input.energy.state === "Low Energy") return "start_small";
  if (input.momentum.state === "Rising" && (input.hasWritingInProgress || input.hasNextActions)) {
    return "continue_flow";
  }
  if (input.hasFermentingIdeas && input.hasWritingInProgress) return "write_from_idea";
  return "start_small";
}

function recommendationReasonForSource(source) {
  const sourceReasons = {
    "operation-dashboard.todayTasks": "今日やることに入っています。",
    "operation-dashboard.dailyTasks": "毎日タスクとして残っています。",
    "operation-dashboard.projects": "育てているプロジェクトに入っています。",
    "operation-dashboard.laterItems": "あとで見る項目として残っています。",
    "operation-dashboard.persistentMemos": "最近更新されたメモがあります。",
    "discovery-labo.discoveries": "発酵中アイデアがあります。",
    "hasshin-kansatsu-labo.entries": "次のアクションが残っています。",
    "substack-labo.writing": "執筆中の記事があります。",
    "koryu-log-labo.entries": "また見たい人の記録があります。",
  };
  return sourceReasons[source] || "優先候補として読み取れる項目があります。";
}

function buildRecommendationReasons(input) {
  if (!input.topCandidate) {
    const reasons = [
      "強く急ぐ候補は見つかっていません。",
      "今日は整理や回復を優先しても良さそうです。",
    ];
    if (input.hasTodayEvents) reasons.unshift(input.eventContext.text);
    return reasons;
  }

  const reasons = [recommendationReasonForSource(input.topCandidate.source)];
  if (input.hasTodayEvents) reasons.push(input.eventContext.text);
  if (input.hasFermentingIdeas && !reasons.includes("発酵中アイデアがあります。")) {
    reasons.push("発酵中アイデアがあります。");
  }
  if (input.hasWritingInProgress && !reasons.includes("執筆中の記事があります。")) {
    reasons.push("執筆中の記事があります。");
  }
  if (input.momentum.state === "Rising") reasons.push("今日は勢いがあります。");
  if (input.energy.state === "Low Energy") reasons.push("今日は短時間で触れる形が合いそうです。");
  if (input.energy.state === "Recovery") reasons.push("今日は回復を優先した方が良さそうです。");
  if (input.completedToday > 0) reasons.push(`今日はすでに${input.completedToday}件進んでいます。`);
  return [...new Set(reasons)].slice(0, 4);
}

function generateRecommendationMessage(input, type) {
  const title = input.topCandidate?.title || "";
  if (type === "organize_or_rest") {
    if (input.hasTodayEvents) {
      return {
        title: "おはよう、さくら。",
        message: "今日は予定があるため、新しい作業を増やすより、準備と休息を優先しても良さそうです。",
        actionText: "まず予定の時間と持ち物だけ確認しておきませんか？",
      };
    }
    return {
      title: "おはよう、さくら。",
      message: "今日は少し休みながら整理する日にしても良さそうです。",
      actionText: "まず今日やることを1つだけ眺めてみませんか？",
    };
  }
  if (type === "rest_first") {
    return {
      title: "おはよう、さくら。",
      message: `「${title}」が候補ですが、今日は回復を優先して良さそうです。`,
      actionText: "完了を目指さず、開くだけでも十分です。",
    };
  }
  if (type === "continue_flow") {
    return {
      title: "おはよう、さくら。",
      message: `今日は「${title}」の流れを少し続けるタイミングかもしれません。`,
      actionText: "まず15分だけ始めてみませんか？",
    };
  }
  if (type === "schedule_context") {
    return {
      title: "おはよう、さくら。",
      message: `今日は予定があるため、「${title}」は余力があれば軽く触れるくらいで良さそうです。`,
      actionText: "大きな作業より、予定の準備や少し休むことを優先しても良さそうです。",
    };
  }
  if (type === "write_from_idea") {
    return {
      title: "おはよう、さくら。",
      message: "今日は記事を書くタイミングかもしれません。",
      actionText: "まず15分だけ始めてみませんか？",
    };
  }
  return {
    title: "おはよう、さくら。",
    message: `今日は「${title}」に少し触れてみるのが良さそうです。`,
    actionText: "まず15分だけ、軽く始めてみませんか？",
  };
}

function buildRecommendation(input) {
  const type = chooseRecommendationType(input);
  return {
    type,
    reasons: buildRecommendationReasons(input),
    ...generateRecommendationMessage(input, type),
  };
}

function inferLearningMode(input, recommendation) {
  if (input.hasTodayEvents) return "schedule-aware";
  if (input.energy.state === "Recovery") return "recovery";
  if (input.energy.state === "Low Energy") return "low-energy";
  if (input.momentum.state === "Rising") return "momentum";
  return recommendation.type || "normal";
}

function buildLearningLogEntry(input, recommendation, context) {
  const recommendationText = [recommendation.message, recommendation.actionText]
    .filter(Boolean)
    .join(" ");
  return {
    id: crypto.randomUUID(),
    date: activeDate,
    energy: input.energy.state,
    mode: inferLearningMode(input, recommendation),
    taskCount: context.taskCount,
    eventCount: input.eventContext.count,
    recommendationType: recommendation.type,
    recommendationText,
    accepted: null,
    note: "",
    createdAt: new Date().toISOString(),
  };
}

function syncCurrentLearningLog(input, recommendation, context) {
  const latestSameRecommendation = learningLog.find((entry) =>
    entry.date === activeDate &&
    entry.recommendationType === recommendation.type &&
    entry.recommendationText === [recommendation.message, recommendation.actionText].filter(Boolean).join(" "),
  );
  if (latestSameRecommendation) {
    currentLearningLogId = latestSameRecommendation.id;
    latestSameRecommendation.energy = input.energy.state;
    latestSameRecommendation.mode = inferLearningMode(input, recommendation);
    latestSameRecommendation.taskCount = context.taskCount;
    latestSameRecommendation.eventCount = input.eventContext.count;
    saveLearningLog();
    return latestSameRecommendation;
  }
  const entry = buildLearningLogEntry(input, recommendation, context);
  learningLog.unshift(entry);
  currentLearningLogId = entry.id;
  saveLearningLog();
  return entry;
}

function currentLearningLogEntry() {
  return learningLog.find((entry) => entry.id === currentLearningLogId) || null;
}

function renderLearningFeedback(entry) {
  const note = $("#learningFeedbackNote");
  const status = $("#learningFeedbackStatus");
  document.querySelectorAll("[data-learning-feedback]").forEach((button) => {
    const value = button.dataset.learningFeedback === "true";
    button.classList.toggle("active", entry?.accepted === value);
  });
  if (note && note.value !== (entry?.note || "")) {
    note.value = entry?.note || "";
  }
  if (!status) return;
  if (!entry) {
    status.textContent = "まだ記録はありません。";
  } else if (entry.accepted === true) {
    status.textContent = "この提案は合っていた、と記録しました。";
  } else if (entry.accepted === false) {
    status.textContent = "この提案は違った、と記録しました。";
  } else {
    status.textContent = "この提案をLearning Logに記録しました。";
  }
}

function energyToScore(energy) {
  const scores = {
    "High Energy": 85,
    Normal: 60,
    "Low Energy": 35,
    Recovery: 20,
  };
  return scores[energy] ?? null;
}

function mostCommonValue(items, key) {
  const counts = items.reduce((result, item) => {
    const value = item[key];
    if (!value) return result;
    result[value] = (result[value] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "なし";
}

function buildLearningSummary(logItems = learningLog) {
  const logs = asArray(logItems);
  const recent = logs.slice(0, 7);
  const acceptedCount = logs.filter((entry) => entry.accepted === true).length;
  const rejectedCount = logs.filter((entry) => entry.accepted === false).length;
  const answeredRecent = recent.filter((entry) => entry.accepted === true || entry.accepted === false);
  const acceptedRecent = recent.filter((entry) => entry.accepted === true).length;
  const energyScores = recent.map((entry) => energyToScore(entry.energy)).filter((score) => score !== null);
  return {
    totalLogs: logs.length,
    acceptedCount,
    rejectedCount,
    unansweredCount: logs.filter((entry) => entry.accepted !== true && entry.accepted !== false).length,
    recentAcceptanceRate: answeredRecent.length ? Math.round((acceptedRecent / answeredRecent.length) * 100) : null,
    commonRecommendationType: mostCommonValue(recent, "recommendationType"),
    averageEnergy: energyScores.length ? Math.round(energyScores.reduce((sum, score) => sum + score, 0) / energyScores.length) : null,
  };
}

function learningConfidence(totalLogs) {
  if (totalLogs >= 30) return 90;
  if (totalLogs >= 10) return 60;
  if (totalLogs >= 3) return 20;
  return 10;
}

function buildLearningHint(summary = buildLearningSummary()) {
  const confidence = learningConfidence(summary.totalLogs);
  if (summary.totalLogs < 3 || summary.recentAcceptanceRate === null) {
    return {
      message: "フィードバック数が少ないため、まだ学習中です。",
      confidence,
      source: "totalLogs",
    };
  }
  if (summary.commonRecommendationType === "schedule_context" && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は予定がある日に準備や休息を優先する提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  if (["start_small", "continue_flow", "write_from_idea"].includes(summary.commonRecommendationType) && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は小さな一歩の提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  if (summary.commonRecommendationType === "rest_first" && summary.recentAcceptanceRate >= 60) {
    return {
      message: "最近は休息を優先する提案が合いやすい傾向があります。",
      confidence,
      source: "recentAcceptanceRate, commonRecommendationType",
    };
  }
  return {
    message: "最近の傾向はまだはっきりしていないため、参考情報として見ています。",
    confidence,
    source: "recentAcceptanceRate",
  };
}

function renderLearningSummary(summary = buildLearningSummary()) {
  const setText = (selector, value) => {
    const target = $(selector);
    if (target) target.textContent = value;
  };
  setText("#learningSummaryTotal", `${summary.totalLogs}件`);
  setText("#learningSummaryAccepted", `${summary.acceptedCount}件`);
  setText("#learningSummaryRejected", `${summary.rejectedCount}件`);
  setText("#learningSummaryUnanswered", `${summary.unansweredCount}件`);
  setText("#learningSummaryRate", summary.recentAcceptanceRate === null ? "-" : `${summary.recentAcceptanceRate}%`);
  setText("#learningSummaryType", summary.commonRecommendationType);
  setText("#learningSummaryEnergy", summary.averageEnergy === null ? "-" : String(summary.averageEnergy));
}

function renderLearningHint(hint = buildLearningHint()) {
  const message = $("#learningHintMessage");
  const confidence = $("#learningHintConfidence");
  const source = $("#learningHintSource");
  if (message) message.textContent = hint.message;
  if (confidence) confidence.textContent = `${hint.confidence}%`;
  if (source) source.textContent = hint.source;
}

function buildExplainLayerDetails(input, recommendation) {
  const seenInfo = [
    input.topCandidate ? `${input.topCandidate.sourceLabel}の候補を見ています。` : "今日の候補全体を軽く見ています。",
    input.openTodayCount ? `今日やることに未完了が${input.openTodayCount}件あります。` : "今日やることの未完了は少なめです。",
    input.hasTodayEvents ? `今日の予定が${input.eventContext.count}件あります。` : "",
    input.hasFermentingIdeas ? "発酵中アイデアがあります。" : "",
    input.hasWritingInProgress ? "執筆中の記事があります。" : "",
    input.hasNextActions ? "発信観察の次アクションがあります。" : "",
  ].filter(Boolean);

  const mainReasons = input.topCandidate
    ? asArray(recommendation.reasons).map((reason) => `${reason} そのため、この提案にしています。`)
    : ["強く急ぐ候補が見えていないため、整理や回復寄りの提案にしています。"];

  const uncertainty = [
    "画面上とlocalStorageにある情報だけを見ています。",
    "今日の体調や気持ちは、記録されている範囲だけを手がかりにしています。",
  ];
  const learningSummary = buildLearningSummary();
  const learningHint = buildLearningHint(learningSummary);
  if (learningSummary.commonRecommendationType !== "なし" && learningSummary.recentAcceptanceRate !== null) {
    uncertainty.push(`最近は「${learningSummary.commonRecommendationType}」の提案が記録されており、一致率は${learningSummary.recentAcceptanceRate}%です。`);
  }
  uncertainty.push(`${learningHint.message} このヒントは過去のフィードバックから生成されています。まだ学習途中のため、参考情報として扱っています。`);
  if (!input.topCandidate) {
    uncertainty.push("候補が少ないため、優先順位は軽めに扱っています。");
  }
  if (input.hasTodayEvents) {
    uncertainty.push("予定は着手候補ではなく、今日の余白や負荷を見る材料として扱っています。");
  }
  if (input.energy.state === "Normal" && input.momentum.state === "Stable") {
    uncertainty.push("EnergyとMomentumに大きな偏りが見えていないため、説明は控えめにしています。");
  }

  return {
    seenInfo,
    mainReasons,
    energyImpact: input.energy.text,
    momentumImpact: input.momentum.text,
    uncertainty,
  };
}

function setExplainLayerExpanded(isExpanded) {
  const toggle = $("#explainLayerToggle");
  const body = $("#explainLayerBody");
  if (!toggle || !body) return;
  toggle.setAttribute("aria-expanded", String(isExpanded));
  toggle.textContent = isExpanded ? "理由を閉じる" : "理由を見る";
  body.hidden = !isExpanded;
}

function renderExplainLayerDetails(details) {
  appendBrainItems($("#explainSeenInfo"), details.seenInfo, "見ている情報はまだ少なめです。");
  appendBrainItems($("#explainMainReasons"), details.mainReasons, "主な理由はまだありません。");
  appendBrainItems($("#explainUncertainty"), details.uncertainty, "不確かな点は少なめです。");
  const energyTarget = $("#explainEnergyImpact");
  const momentumTarget = $("#explainMomentumImpact");
  if (energyTarget) energyTarget.textContent = details.energyImpact;
  if (momentumTarget) momentumTarget.textContent = details.momentumImpact;
  setExplainLayerExpanded(false);
}

const FIRST_AGENT_RESPONSES = {
  try: "いいですね。まず15分だけ始めてみましょう。",
  later: "了解です。必要になったらまた一緒に考えましょう。",
  rest: "今日は回復を優先しましょう。それも大切な選択です。",
  other: "了解です。今日は今の自分に合うことを選びましょう。",
};

function showFirstAgentResponse(reply) {
  const target = $("#firstAgentResponse");
  if (!target) return;
  const message = FIRST_AGENT_RESPONSES[reply];
  target.textContent = message || "";
  target.hidden = !message;
}

function renderBrainPrototype() {
  if (!$("#brainPriority")) return;

  const day = store[activeDate] || {};
  const dailyTasks = asArray(day.dailyTasks);
  const todayTasks = asArray(day.todayTasks);
  const todayEvents = asArray(day.todayEvents);
  const projects = asArray(day.projects);
  const completedToday = [...todayTasks, ...dailyTasks].filter((item) => item.done).length;
  const openToday = todayTasks.filter(brainIsOpen);
  const laterOpen = laterItems.filter((item) => !item.done);
  const reflection = day.reflection || {};
  const discoveries = asArray(readStoredJson(EXTERNAL_APP_KEYS.discoveries, []));
  const fermentingIdeas = discoveries.filter((seed) =>
    brainStatusMatches(seed.status, ["発酵中", "逋ｺ驟ｵ荳ｭ"]),
  );
  const writingItems = collectBrainWritingItems(readSubstackWorkspace());
  const writingInProgress = writingItems.filter((item) =>
    brainStatusMatches(item.status, ["執筆中", "蝓ｷ遲・ｸｭ"]),
  );
  const hasshinEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.hasshin, []));
  const hasshinNextActions = hasshinEntries.filter((entry) => (entry.nextAction || "").trim());
  const koryuEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.koryu, []));
  const revisitPeople = koryuEntries.filter((entry) => brainStatusMatches(entry.revisit, ["はい", "縺ｯ縺・"]));
  const newestMemo = persistentMemos
    .filter((memo) => memo.updatedAt || memo.createdAt)
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const recentMemos = persistentMemos.filter((memo) => brainDaysSince(memo.updatedAt || memo.createdAt) !== null && brainDaysSince(memo.updatedAt || memo.createdAt) <= 7);
  const energyContext = inferEnergyContext(day, completedToday, openToday.length);
  const momentumContext = inferMomentumContext(day, writingInProgress, hasshinNextActions);
  const eventContext = inferEventContext(todayEvents);
  const candidates = collectPriorityCandidates({
    todayTasks,
    dailyTasks,
    projects,
    laterOpen,
    persistentMemos: recentMemos,
    fermentingIdeas,
    hasshinNextActions,
    writingInProgress,
    revisitPeople,
  });
  const rankedCandidates = rankPriorityCandidates(candidates, energyContext, momentumContext);
  const priorityCandidate = rankedCandidates[0];
  const explanation = explainPriorityCandidate(priorityCandidate);
  const recommendationInput = buildRecommendationInput(
    priorityCandidate,
    explanation,
    energyContext,
    momentumContext,
    {
      fermentingIdeas,
      writingInProgress,
      hasshinNextActions,
      eventContext,
      openTodayCount: openToday.length,
      completedToday,
    },
  );
  const recommendation = buildRecommendation(recommendationInput);
  const explainLayerDetails = buildExplainLayerDetails(recommendationInput, recommendation);
  const learningEntry = syncCurrentLearningLog(recommendationInput, recommendation, {
    taskCount: todayTasks.length,
  });

  $("#brainPriority").textContent = priorityCandidate?.title || "今日は整える日";
  $("#brainPriorityNote").textContent = explanation.summary;
  appendBrainItems($("#brainPriorityReasons"), explanation.reasons, "理由はまだありません。");

  $("#brainRecommendationTitle").textContent = recommendation.title;
  $("#brainRecommendationMessage").textContent = recommendation.message;
  $("#brainRecommendationAction").textContent = recommendation.actionText;
  appendBrainItems($("#brainRecommendationReasons"), recommendation.reasons, "今日は理由を少なくして、軽く整える提案です。");
  renderExplainLayerDetails(explainLayerDetails);
  renderLearningFeedback(learningEntry);
  renderLearningSummary();
  renderLearningHint();
  showFirstAgentResponse("");

  appendBrainItems(
    $("#brainTodayTasks"),
    openToday.map((item) => item.title),
    "今日だけのタスクはまだありません。",
  );

  appendBrainItems(
    $("#brainTodayEvents"),
    eventContext.labels,
    "今日の予定はまだありません。",
  );

  const suggestions = [
    eventContext.count ? "今日の予定前後に休む余白を残す" : priorityCandidate ? `まず「${priorityCandidate.title}」を5分だけ触る` : "最初の一手を1つだけ決める",
    laterOpen.length ? `あとで見る/読むが${laterOpen.length}件あります。1件だけ処理する` : "あとで見る/読むは落ち着いています",
    completedToday ? `今日はすでに${completedToday}件完了しています。追加しすぎない` : "完了がまだ少ないので、短いタスクから始める",
    reflection.tomorrowPlan ? "昨日の「明日やること」を見直す" : "夜に短い振り返りを残す",
  ];
  appendBrainItems($("#brainSuggestions"), suggestions, "提案はまだありません。");

  appendBrainItems(
    $("#brainFermentingIdeas"),
    fermentingIdeas.map((seed) => brainTitleOf(seed, "無題のアイデア")),
    "発酵中アイデアはまだありません。",
  );

  appendBrainItems(
    $("#brainWritingItems"),
    writingInProgress.map((item) => brainTitleOf(item, "無題の記事")),
    "執筆中の記事はまだありません。",
  );

  const newestHasshin = hasshinNextActions
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const newestRevisit = revisitPeople
    .sort((a, b) => String(brainRecentDateOf(b)).localeCompare(String(brainRecentDateOf(a))))[0];
  const recentChanges = [
    newestHasshin?.nextAction ? `発信観察の次アクション: ${newestHasshin.nextAction}` : "",
    newestRevisit?.name ? `また見たい人: ${newestRevisit.name}` : "",
    newestMemo ? `残るメモ更新: ${brainFormatDateTime(newestMemo.updatedAt || newestMemo.createdAt)}` : "",
    day.updatedAt ? `今日の記録更新: ${brainFormatDateTime(day.updatedAt)}` : "",
  ];
  appendBrainItems($("#brainRecentChanges"), recentChanges, "最近の変化はまだありません。");
}
function renderAll() {
  getDay();
  $("#activeDate").value = activeDate;
  listIds.forEach(renderTaskList);
  renderEventList();
  renderMailLastChecked();
  renderPersistentMemos();
  renderLearnings();
  renderLaterItems();
  renderFields();
  renderSummary();
  renderHistory();
  renderBrainPrototype();
}

function bindEvents() {
  $("#explainLayerToggle")?.addEventListener("click", () => {
    const body = $("#explainLayerBody");
    setExplainLayerExpanded(Boolean(body?.hidden));
  });
  document.querySelectorAll("[data-first-agent-reply]").forEach((button) => {
    button.addEventListener("click", () => {
      showFirstAgentResponse(button.dataset.firstAgentReply);
    });
  });
  document.querySelectorAll("[data-learning-feedback]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = currentLearningLogEntry();
      if (!entry) return;
      entry.accepted = button.dataset.learningFeedback === "true";
      saveLearningLog();
      renderLearningFeedback(entry);
      renderLearningSummary();
      renderLearningHint();
    });
  });
  $("#learningFeedbackNote")?.addEventListener("input", (event) => {
    const entry = currentLearningLogEntry();
    if (!entry) return;
    entry.note = event.target.value;
    saveLearningLog();
    renderLearningFeedback(entry);
    renderLearningSummary();
    renderLearningHint();
  });
  $("#activeDate").addEventListener("change", (event) => {
    activeDate = event.target.value || toDateInputValue(new Date());
    renderAll();
  });
  $("#prevDay").addEventListener("click", () => shiftDate(-1));
  $("#nextDay").addEventListener("click", () => shiftDate(1));
  document.querySelectorAll("[data-add-list]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const title = input.value.trim();
      if (!title) return;
      getDay()[form.dataset.addList].push(newItem(title));
      input.value = "";
      saveStore();
      renderTaskList(form.dataset.addList);
    });
  });
  $("#eventForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#eventTitle").value.trim();
    const time = $("#eventTime").value.trim();
    const note = $("#eventNote").value.trim();
    if (!title) return;
    getDay().todayEvents.push(newEvent({
      title,
      time,
      type: $("#eventType").value,
      note,
    }));
    $("#eventTitle").value = "";
    $("#eventTime").value = "";
    $("#eventNote").value = "";
    $("#eventType").value = "meeting";
    saveStore();
    renderEventList();
    renderBrainPrototype();
  });
  $("#addPersistentMemo")?.addEventListener("click", () => {
    const memo = newPersistentMemo();
    persistentMemos.unshift(memo);
    savePersistentMemos();
    renderPersistentMemos({ focusId: memo.id });
  });
  $("#addLearning")?.addEventListener("click", () => {
    getDay().learnings.unshift(newLearningItem());
    saveStore();
    renderLearnings();
  });
  $("#laterForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#laterTitle").value.trim();
    if (!title) return;
    laterItems.unshift(newLaterItem({
      type: $("#laterType").value,
      title,
      url: $("#laterUrl").value.trim(),
      memo: $("#laterMemo").value.trim(),
    }));
    if (autoDedupeLater) removeLaterDuplicates();
    $("#laterTitle").value = "";
    $("#laterUrl").value = "";
    $("#laterMemo").value = "";
    saveLaterItems();
    renderLaterItems();
  });
  $("#showDoneLater")?.addEventListener("change", (event) => {
    showDoneLater = event.target.checked;
    saveLaterView();
    renderLaterItems();
  });
  $("#laterSearch")?.addEventListener("input", (event) => {
    laterSearchQuery = event.target.value;
    renderLaterItems();
  });
  $("#autoDedupeLater")?.addEventListener("change", (event) => {
    autoDedupeLater = event.target.checked;
    saveLaterView();
  });
  $("#dedupeLater")?.addEventListener("click", () => {
    const removed = removeLaterDuplicates();
    if (!removed) {
      alert("重複している項目はありません。");
      return;
    }
    saveLaterItems();
    renderLaterItems();
    alert(`${removed}件の重複を削除しました。`);
  });
  $("#clearDoneLater")?.addEventListener("click", () => {
    laterItems = laterItems.filter((item) => !item.done);
    saveLaterItems();
    renderLaterItems();
  });
  Object.keys(getDay().metrics).forEach((key) => {
    const field = $(`#${key}`);
    if (!field) return;
    field.addEventListener("input", () => updateField("metrics", key, field));
    field.addEventListener("change", () => updateField("metrics", key, field));
  });
  Object.keys(getDay().reflection).forEach((key) => {
    const field = $(`#${key}`);
    if (!field) return;
    field.addEventListener("input", () => updateField("reflection", key, field));
  });
  $("#historySearch").addEventListener("input", renderHistory);
  $("#downloadCsv").addEventListener("click", downloadCsv);
  $("#exportBackup")?.addEventListener("click", handleExportBackup);
  $("#importBackup")?.addEventListener("click", () => $("#importBackupFile")?.click());
  $("#importBackupFile")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) handleImportBackupFile(file);
  });
  bindSnapshotPanel();
}

const mailCheckKeys = ["mailMorningChecked", "mailNoonChecked", "mailNightChecked"];

function updateField(group, key, field) {
  const day = getDay();
  const value = field.type === "checkbox" ? field.checked : field.value;
  day[group][key] = value;
  if (group === "metrics" && mailCheckKeys.includes(key) && value === true) {
    day.metrics.mailLastCheckedAt = new Date().toISOString();
    renderMailLastChecked();
  }
  saveStore();
}

function shiftDate(delta) {
  const date = new Date(`${activeDate}T00:00:00`);
  date.setDate(date.getDate() + delta);
  activeDate = toDateInputValue(date);
  renderAll();
}

function escapeCsv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const rows = [
    [
      "date",
      "progress_done",
      "progress_total",
      "daily_tasks",
      "today_tasks",
      "today_events",
      "projects",
      "memos",
      "learnings",
      "mail_morning_checked",
      "mail_noon_checked",
      "mail_night_checked",
      "dm_pending",
      "dm_handled",
      "did_today",
      "blocked_today",
      "tomorrow_plan",
    ],
  ];
  Object.entries(store)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([date, day]) => {
      ensureMetricDefaults(day);
      const tracked = [
        ...day.dailyTasks,
        ...day.todayTasks,
        ...day.projects,
        { done: day.metrics.mailMorningChecked },
        { done: day.metrics.mailNoonChecked },
        { done: day.metrics.mailNightChecked },
      ];
      rows.push([
        date,
        tracked.filter((item) => item.done).length,
        tracked.length,
        day.dailyTasks.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        day.todayTasks.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        asArray(day.todayEvents).map(formatEventLabel).join(" / "),
        day.projects.map((item) => `${item.done ? "完了" : "未完了"}:${item.title}`).join(" / "),
        (day.memos || []).map((memo) => memo.text).join(" / "),
        (day.learnings || [])
          .map((learning) => [
            learning.title,
            learning.url,
            learning.hook,
            learning.experiment,
            learning.intro,
          ].filter(Boolean).join(" | "))
          .join(" / "),
        day.metrics.mailMorningChecked ? "1" : "0",
        day.metrics.mailNoonChecked ? "1" : "0",
        day.metrics.mailNightChecked ? "1" : "0",
        day.metrics.dmPending,
        day.metrics.dmHandled,
        day.reflection.didToday,
        day.reflection.blockedToday,
        day.reflection.tomorrowPlan,
      ]);
    });
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `operation-dashboard-${toDateInputValue(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

bindEvents();
renderAll();
renderClock();
setInterval(renderClock, 1000);

// ===== さくらバックアップ形式（Phase 0 共通の封筒） =====
// 参照：さくらAI Phase 0 詳細設計書 / さくらLaboデータ辞書 v1
const BACKUP_FORMAT = "sakura-backup";
const BACKUP_APP_NAME = "operation-dashboard";
const BACKUP_SCHEMA_VERSION = 1;
const BACKUP_DICTIONARY_VERSION = "v1";
const BACKUP_KEYS = [STORAGE_KEY, LATER_STORAGE_KEY, PERSISTENT_MEMO_STORAGE_KEY, LATER_VIEW_STORAGE_KEY];

function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function readFirstStoredJson(keys, fallback) {
  for (const key of keys) {
    const value = readStoredJson(key, null);
    if (value !== null) return value;
  }
  return fallback;
}

function createBackup() {
  const data = {};
  data[STORAGE_KEY] = readStoredJson(STORAGE_KEY, {});
  data[LATER_STORAGE_KEY] = readStoredJson(LATER_STORAGE_KEY, []);
  data[PERSISTENT_MEMO_STORAGE_KEY] = readStoredJson(PERSISTENT_MEMO_STORAGE_KEY, []);
  data[LATER_VIEW_STORAGE_KEY] = readStoredJson(LATER_VIEW_STORAGE_KEY, {});
  return {
    format: BACKUP_FORMAT,
    app: BACKUP_APP_NAME,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    dictionaryVersion: BACKUP_DICTIONARY_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

function backupFilename(autoBeforeImport) {
  const date = toDateInputValue(new Date());
  return autoBeforeImport
    ? `${BACKUP_APP_NAME}-backup-auto-before-import-${date}.json`
    : `${BACKUP_APP_NAME}-backup-${date}.json`;
}

function downloadJson(value, filename) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function validateBackup(parsed) {
  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "JSONファイルとして読み取れませんでした。" };
  }
  if (parsed.format !== BACKUP_FORMAT) {
    return { ok: false, error: "さくらバックアップ形式のファイルではありません。" };
  }
  if (parsed.app !== BACKUP_APP_NAME) {
    return {
      ok: false,
      error: `これは「${parsed.app ?? "不明"}」のバックアップです。生活・発信ダッシュボードには取り込めません。`,
    };
  }
  if (typeof parsed.data !== "object" || parsed.data === null) {
    return { ok: false, error: "ファイルにデータが入っていません。" };
  }
  return { ok: true, backup: parsed };
}

function handleExportBackup() {
  downloadJson(createBackup(), backupFilename(false));
}

async function handleImportBackupFile(file) {
  let parsed;
  try {
    parsed = JSON.parse(await file.text());
  } catch (error) {
    alert("JSONファイルとして読み取れませんでした。");
    return;
  }

  const result = validateBackup(parsed);
  if (!result.ok) {
    alert(result.error);
    return;
  }

  const incomingStore = result.backup.data[STORAGE_KEY];
  if (typeof incomingStore !== "object" || incomingStore === null || Array.isArray(incomingStore)) {
    alert("ファイルにデータが入っていません。");
    return;
  }

  // 取り込み前に、今のデータを自動でバックアップ
  downloadJson(createBackup(), backupFilename(true));

  const currentStore = readStoredJson(STORAGE_KEY, {});
  const currentLater = readStoredJson(LATER_STORAGE_KEY, []);
  const incomingLater = Array.isArray(result.backup.data[LATER_STORAGE_KEY])
    ? result.backup.data[LATER_STORAGE_KEY]
    : [];

  const accepted = confirm(
    `今のデータ（記録${Object.keys(currentStore).length}日分・あとで見る${currentLater.length}件）を、\n` +
      `ファイルの内容（記録${Object.keys(incomingStore).length}日分・あとで見る${incomingLater.length}件）で置き換えます。\n` +
      "直前のデータは自動バックアップとしてダウンロードされています。\nよろしいですか？",
  );
  if (!accepted) return;

  BACKUP_KEYS.forEach((key) => {
    if (key in result.backup.data) {
      localStorage.setItem(key, JSON.stringify(result.backup.data[key]));
    }
  });

  alert("取り込みが完了しました。画面を読み込み直します。");
  location.reload();
}

// ===== さくらスナップショット（Phase 1） =====
// 参照：さくらAI Phase 1 詳細設計書

function loadSnapshotSettings() {
  const stored = readStoredJson(SNAPSHOT_SETTINGS_KEY, {});
  return { ...snapshotSettingDefaults, ...stored };
}

function saveSnapshotSettings(settings) {
  localStorage.setItem(SNAPSHOT_SETTINGS_KEY, JSON.stringify(settings));
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function flattenRecordArrays(value) {
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap((entry) => asArray(entry));
}

function daysBetween(fromIso, now) {
  const from = new Date(fromIso).getTime();
  if (Number.isNaN(from)) return null;
  return Math.max(0, Math.floor((now.getTime() - from) / 86400000));
}

function dateKeyDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateInputValue(date);
}

function buildSakuraSnapshot(mode) {
  const settings = loadSnapshotSettings();
  const now = new Date();
  const fromKey = dateKeyDaysAgo(SNAPSHOT_DETAIL_DAYS - 1);
  const toKey = toDateInputValue(now);
  const logFromKey = dateKeyDaysAgo(SNAPSHOT_LOG_DAYS - 1);

  // --- ダッシュボード：直近7日分の詳細＋それ以前は日数のみ ---
  const fullStore = readStoredJson(STORAGE_KEY, {});
  const recentDays = {};
  let olderDaysCount = 0;
  Object.keys(fullStore)
    .sort()
    .forEach((dateKey) => {
      if (dateKey < fromKey) {
        olderDaysCount += 1;
        return;
      }
      const day = deepCopy(fullStore[dateKey]);
      if (!settings.reflection) {
        day.reflection = null;
      }
      if (!settings.mailDmCounts && day.metrics) {
        ["dmPending", "dmHandled", "mailUnread", "mailProcessed"].forEach((key) => {
          if (key in day.metrics) day.metrics[key] = null;
        });
      }
      recentDays[dateKey] = day;
    });

  const laterItems = asArray(readStoredJson(LATER_STORAGE_KEY, [])).filter((item) => !item.done);
  const persistentMemos = asArray(readStoredJson(PERSISTENT_MEMO_STORAGE_KEY, []));
  const learningLogItems = asArray(readStoredJson(LEARNING_LOG_STORAGE_KEY, []));
  const learningSummary = buildLearningSummary(learningLogItems);
  const learningHint = buildLearningHint(learningSummary);

  // --- Discovery-Labo：種と発生源は全件 ---
  const discoveries = deepCopy(asArray(readStoredJson(EXTERNAL_APP_KEYS.discoveries, [])));
  const discoverySources = asArray(readStoredJson(EXTERNAL_APP_KEYS.discoverySources, []));

  // --- 交流ログ：直近30日＋「また見たい：はい」は期間外でも全件 ---
  const koryuAll = asArray(readStoredJson(EXTERNAL_APP_KEYS.koryu, []));
  const koryuEntries = deepCopy(
    koryuAll.filter((entry) => entry.date >= logFromKey || entry.revisit === "はい"),
  );
  if (!settings.feelings) {
    koryuEntries.forEach((entry) => {
      ["tension", "impression", "happyMoment"].forEach((key) => {
        if (key in entry) entry[key] = null;
      });
    });
  }

  // --- 発信観察：直近30日＋nextActionが残っているものは期間外でも全件 ---
  const hasshinAll = asArray(readStoredJson(EXTERNAL_APP_KEYS.hasshin, []));
  const hasshinEntries = deepCopy(
    hasshinAll.filter(
      (entry) => entry.date >= logFromKey || (entry.nextAction || "").trim() !== "",
    ),
  );

  // --- Substack-Labo：emailListだけは構造ごと除外（常に） ---
  const substackRaw = readFirstStoredJson(
    [EXTERNAL_APP_KEYS.substack, EXTERNAL_APP_KEYS.substackLegacy],
    null,
  );
  let substackData = null;
  if (substackRaw && typeof substackRaw === "object") {
    if (substackRaw.writings || substackRaw.articleReviews || substackRaw.quickMemos) {
      substackData = {
        writings: deepCopy(substackRaw.writings ?? { notes: [], articles: [] }),
        people: deepCopy(substackRaw.people ?? { follows: [], followers: [] }),
        articleReviews: deepCopy(substackRaw.articleReviews ?? []),
        ideas: deepCopy(substackRaw.ideas ?? []),
        quickMemos: deepCopy(substackRaw.quickMemos ?? []),
      };
    } else {
      substackData = {
        content: deepCopy(substackRaw.content ?? { notes: [], articles: [], posts: [] }),
        people: deepCopy(substackRaw.people ?? { following: [], followers: [] }),
        ideas: deepCopy(substackRaw.ideas ?? { ideas: [], quick: [] }),
      };
    }
  }

  // --- ストック管理：スイッチがオンのときだけ ---
  const stockItems = settings.stock
    ? deepCopy(asArray(readStoredJson(EXTERNAL_APP_KEYS.stock, [])))
    : null;

  // --- summary（計算済みの要約） ---
  const todayRecord = fullStore[toKey];
  let todayProgress = "0/0";
  let todayEventCount = 0;
  if (todayRecord) {
    const tracked = [
      ...(todayRecord.dailyTasks || []),
      ...(todayRecord.todayTasks || []),
    ].map((task) => Boolean(task.done));
    todayEventCount = asArray(todayRecord.todayEvents).length;
    const metrics = todayRecord.metrics || {};
    tracked.push(
      Boolean(metrics.mailMorningChecked),
      Boolean(metrics.mailNoonChecked),
      Boolean(metrics.mailNightChecked),
      Boolean(metrics.dmPreviousDone),
    );
    todayProgress = `${tracked.filter(Boolean).length}/${tracked.length}`;
  }

  const fermenting = discoveries.filter((seed) => seed.status === "発酵中");
  const fermentingDays = fermenting
    .map((seed) => (seed.statusChangedAt ? daysBetween(seed.statusChangedAt, now) : null))
    .filter((value) => value !== null);

  const revisitNames = new Set(
    koryuAll.filter((entry) => entry.revisit === "はい").map((entry) => entry.name),
  );

  let writingInProgress = 0;
  if (substackData) {
    const writingItems = substackData.content
      ? flattenRecordArrays(substackData.content)
      : [
          ...asArray(substackData.writings?.notes),
          ...asArray(substackData.writings?.articles),
        ];
    writingInProgress = writingItems.filter((item) => item.status === "執筆中").length;
  }

  const openNextActions = hasshinAll.filter(
    (entry) => (entry.nextAction || "").trim() !== "",
  ).length;

  return {
    format: SNAPSHOT_FORMAT,
    snapshotVersion: SNAPSHOT_VERSION,
    dictionaryVersion: SNAPSHOT_DICTIONARY_VERSION,
    createdAt: now.toISOString(),
    mode,
    period: { detailDays: SNAPSHOT_DETAIL_DAYS, from: fromKey, to: toKey },
    privacy: {
      reflection: settings.reflection,
      feelings: settings.feelings,
      mailDmCounts: settings.mailDmCounts,
      stock: settings.stock,
    },
    summary: {
      todayProgress,
      todayEventCount,
      seedsFermenting: fermenting.length,
      longestFermentingDays: fermentingDays.length ? Math.max(...fermentingDays) : null,
      revisitPeople: revisitNames.size,
      writingInProgress,
      openNextActions,
    },
    apps: {
      "operation-dashboard": {
        schemaVersion: 1,
        data: { recentDays, olderDaysCount, laterItems, persistentMemos, learningLog: learningLogItems, learningSummary, learningHint },
      },
      "discovery-labo": {
        schemaVersion: 1,
        data: { discoveries, sources: discoverySources },
      },
      "koryu-log-labo": { schemaVersion: 1, data: { entries: koryuEntries } },
      "hasshin-kansatsu-labo": { schemaVersion: 1, data: { entries: hasshinEntries } },
      "substack-labo": substackData ? { schemaVersion: 1, data: substackData } : null,
      "stock-labo": stockItems ? { schemaVersion: 1, data: { items: stockItems } } : null,
    },
  };
}

function snapshotFilename(mode) {
  const date = new Date().toISOString().slice(0, 10);
  return `sakura-snapshot-${mode}-${date}.json`;
}

async function copySnapshotText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // HTTPのローカル確認環境などではClipboard APIが拒否されるため、下の旧式コピーに落とす。
    }
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.append(field);
  field.select();
  const copied = document.execCommand?.("copy");
  field.remove();
  if (!copied) throw new Error("copy failed");
}

function renderSnapshotPanel() {
  const settings = loadSnapshotSettings();
  const reflection = $("#snapReflection");
  if (!reflection) return;
  reflection.checked = settings.reflection;
  $("#snapFeelings").checked = settings.feelings;
  $("#snapMailDm").checked = settings.mailDmCounts;
  $("#snapStock").checked = settings.stock;
  $("#snapModeMorning").classList.toggle("active", snapshotMode === "morning");
  $("#snapModeNight").classList.toggle("active", snapshotMode === "night");
  const label = $("#snapshotLastCreated");
  if (settings.lastCreatedAt) {
    const time = new Intl.DateTimeFormat("ja-JP", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(settings.lastCreatedAt));
    label.textContent = `最後に作成：${time}（${settings.lastMode === "morning" ? "朝" : "夜"}）`;
  } else {
    label.textContent = "まだ作成していません";
  }
}

function rememberSnapshotCreated(mode) {
  const settings = loadSnapshotSettings();
  settings.lastCreatedAt = new Date().toISOString();
  settings.lastMode = mode;
  saveSnapshotSettings(settings);
  renderSnapshotPanel();
}

function bindSnapshotPanel() {
  if (!$("#snapReflection")) return;
  const switchMap = [
    ["#snapReflection", "reflection"],
    ["#snapFeelings", "feelings"],
    ["#snapMailDm", "mailDmCounts"],
    ["#snapStock", "stock"],
  ];
  switchMap.forEach(([selector, key]) => {
    $(selector).addEventListener("change", (event) => {
      const settings = loadSnapshotSettings();
      settings[key] = event.target.checked;
      saveSnapshotSettings(settings);
    });
  });
  $("#snapModeMorning").addEventListener("click", () => {
    snapshotMode = "morning";
    renderSnapshotPanel();
  });
  $("#snapModeNight").addEventListener("click", () => {
    snapshotMode = "night";
    renderSnapshotPanel();
  });
  $("#snapshotDownload").addEventListener("click", () => {
    const snapshot = buildSakuraSnapshot(snapshotMode);
    downloadJson(snapshot, snapshotFilename(snapshotMode));
    rememberSnapshotCreated(snapshotMode);
  });
  $("#snapshotCopy").addEventListener("click", async () => {
    const snapshot = buildSakuraSnapshot(snapshotMode);
    const text = JSON.stringify(snapshot, null, 2);
    try {
      await copySnapshotText(text);
      alert(`クリップボードにコピーしました（約${Math.round(text.length / 1000)}千文字）。`);
      rememberSnapshotCreated(snapshotMode);
    } catch (error) {
      alert("コピーできませんでした。「ダウンロード」をお使いください。");
    }
  });
  renderSnapshotPanel();
}
