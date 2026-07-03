const STORAGE_KEY = "operation-dashboard-v1";
const LATER_STORAGE_KEY = "operation-dashboard-later-v1";
const LATER_VIEW_STORAGE_KEY = "operation-dashboard-later-view-v1";
const PERSISTENT_MEMO_STORAGE_KEY = "operation-dashboard-persistent-memos-v1";

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
let activeDate = toDateInputValue(new Date());
let store = loadStore();
let laterItems = loadLaterItems();
let showDoneLater = loadShowDoneLater();
let autoDedupeLater = loadAutoDedupeLater();
let laterSearchQuery = "";
let persistentMemos = loadPersistentMemos();

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
  const visibleItems = items.filter(Boolean).slice(0, 4);
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

function renderBrainPrototype() {
  if (!$("#brainPriority")) return;

  const day = store[activeDate] || {};
  const dailyTasks = asArray(day.dailyTasks);
  const todayTasks = asArray(day.todayTasks);
  const projects = asArray(day.projects);
  const trackedTasks = [...todayTasks, ...dailyTasks, ...projects];
  const priorityTask = trackedTasks.find((item) => item.priority && !item.done)
    || todayTasks.find((item) => !item.done)
    || dailyTasks.find((item) => !item.done)
    || projects.find((item) => !item.done);

  $("#brainPriority").textContent = priorityTask?.title || "今日は整える日";
  $("#brainPriorityNote").textContent = priorityTask
    ? "既存タスクから最初に見る候補を表示しています。"
    : "未完了タスクが少ないため、無理に増やさず整える前提で表示しています。";

  appendBrainItems(
    $("#brainTodayTasks"),
    todayTasks.filter((item) => !item.done).map((item) => item.title),
    "今日だけのタスクはまだありません。",
  );

  const laterOpen = laterItems.filter((item) => !item.done).length;
  const reflection = day.reflection || {};
  const suggestions = [
    priorityTask ? `まず「${priorityTask.title}」から着手する` : "今日の最初の一手を1つだけ決める",
    laterOpen ? `あとで見る/読むが${laterOpen}件あります` : "あとで見る/読むは落ち着いています",
    reflection.tomorrowPlan ? "昨日の明日メモを見直す" : "夜に短く振り返りを残す",
  ];
  appendBrainItems($("#brainSuggestions"), suggestions, "提案はまだありません。");

  const discoveries = asArray(readStoredJson(EXTERNAL_APP_KEYS.discoveries, []));
  appendBrainItems(
    $("#brainFermentingIdeas"),
    discoveries
      .filter((seed) => seed.status === "発酵中")
      .map((seed) => seed.title || seed.memo || "無題のアイデア"),
    "発酵中アイデアはまだありません。",
  );

  const writingItems = collectBrainWritingItems(readSubstackWorkspace());
  appendBrainItems(
    $("#brainWritingItems"),
    writingItems
      .filter((item) => item.status === "執筆中")
      .map((item) => item.title || "無題の記事"),
    "執筆中の記事はまだありません。",
  );

  const hasshinEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.hasshin, []));
  const koryuEntries = asArray(readStoredJson(EXTERNAL_APP_KEYS.koryu, []));
  const recentChanges = [
    hasshinEntries.find((entry) => (entry.nextAction || "").trim())?.nextAction
      ? `未消化の観察アクション: ${hasshinEntries.find((entry) => (entry.nextAction || "").trim()).nextAction}`
      : "",
    koryuEntries.find((entry) => entry.revisit === "はい")?.name
      ? `また見たい人: ${koryuEntries.find((entry) => entry.revisit === "はい").name}`
      : "",
    day.updatedAt ? `今日の記録更新: ${new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(day.updatedAt))}` : "",
  ];
  appendBrainItems($("#brainRecentChanges"), recentChanges, "最近の変化はまだありません。");
}

function renderAll() {
  getDay();
  $("#activeDate").value = activeDate;
  listIds.forEach(renderTaskList);
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
  if (todayRecord) {
    const tracked = [
      ...(todayRecord.dailyTasks || []),
      ...(todayRecord.todayTasks || []),
    ].map((task) => Boolean(task.done));
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
      seedsFermenting: fermenting.length,
      longestFermentingDays: fermentingDays.length ? Math.max(...fermentingDays) : null,
      revisitPeople: revisitNames.size,
      writingInProgress,
      openNextActions,
    },
    apps: {
      "operation-dashboard": {
        schemaVersion: 1,
        data: { recentDays, olderDaysCount, laterItems, persistentMemos },
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
