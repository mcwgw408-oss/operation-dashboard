const STORAGE_KEY = "operation-dashboard-v1";
const LATER_STORAGE_KEY = "operation-dashboard-later-v1";
const LATER_VIEW_STORAGE_KEY = "operation-dashboard-later-view-v1";
const PERSISTENT_MEMO_STORAGE_KEY = "operation-dashboard-persistent-memos-v1";
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
      dmPending: "",
      dmHandled: "",
      dmPreviousDone: false,
      commentReplies: "",
      restackDone: false,
      liveJoined: false,
      notesExchange: false,
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
  localStorage.setItem(LATER_VIEW_STORAGE_KEY, JSON.stringify({ showDone: showDoneLater }));
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
    { done: day.metrics.restackDone, title: "リスタック" },
    { done: day.metrics.liveJoined, title: "ライブ参加" },
    { done: day.metrics.notesExchange, title: "Notes交流" },
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

function renderMemos() {
  const day = getDay();
  const target = $("#memoList");
  const template = $("#memoTemplate");
  target.replaceChildren();
  day.memos.forEach((memo) => {
    const row = template.content.firstElementChild.cloneNode(true);
    const textarea = row.querySelector("textarea");
    textarea.value = memo.text;
    textarea.addEventListener("input", () => {
      memo.text = textarea.value;
      saveStore();
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      day.memos = day.memos.filter((candidate) => candidate.id !== memo.id);
      saveStore();
      renderMemos();
    });
    target.append(row);
  });
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

function renderLaterItems() {
  const target = $("#laterList");
  if (!target) return;
  const showDoneField = $("#showDoneLater");
  if (showDoneField) showDoneField.checked = showDoneLater;
  const template = $("#laterTemplate");
  target.replaceChildren();
  const visibleItems = showDoneLater ? laterItems : laterItems.filter((item) => !item.done);
  if (!visibleItems.length) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = laterItems.length
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
    ...day.memos.map((memo) => memo.text),
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
        <span>${done}/${total} 完了・メモ ${day.memos.length} 件</span>
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

function renderAll() {
  getDay();
  $("#activeDate").value = activeDate;
  listIds.forEach(renderTaskList);
  renderMemos();
  renderPersistentMemos();
  renderLearnings();
  renderLaterItems();
  renderFields();
  renderSummary();
  renderHistory();
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
  $("#addMemo").addEventListener("click", () => {
    getDay().memos.unshift({ id: crypto.randomUUID(), text: "" });
    saveStore();
    renderMemos();
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
}

function updateField(group, key, field) {
  getDay()[group][key] = field.type === "checkbox" ? field.checked : field.value;
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
        day.memos.map((memo) => memo.text).join(" / "),
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
