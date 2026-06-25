const COCKPIT_STORAGE_KEY = "operation-cockpit-v1";
const dailyItems = [
  "メール",
  "DM（前日分まで）",
  "記事（翌日分）",
  "ボイス（翌日分）",
  "Notes",
  "おはスタック投稿",
  "チャット投稿",
];
const mailCheckItems = ["朝チェック", "昼チェック", "夜チェック"];
const communityItems = ["コメント返信", "リスタック", "Notes交流", "ライブ参加"];

const $ = (selector) => document.querySelector(selector);
let activeDate = toDateInputValue(new Date());
let store = loadStore();

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function checksFrom(items) {
  return Object.fromEntries(items.map((item) => [item, false]));
}

function blankDay() {
  return {
    checks: checksFrom(dailyItems),
    mailChecks: checksFrom(mailCheckItems),
    communityChecks: checksFrom(communityItems),
    mailLastChecked: "",
    topPriority: "",
    articleNote: "",
    todayFocus: "",
    growthTarget: "",
    noticed: "",
    updatedAt: new Date().toISOString(),
  };
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(COCKPIT_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStore() {
  store[activeDate].updatedAt = new Date().toISOString();
  localStorage.setItem(COCKPIT_STORAGE_KEY, JSON.stringify(store));
}

function getDay() {
  if (!store[activeDate]) {
    store[activeDate] = blankDay();
    localStorage.setItem(COCKPIT_STORAGE_KEY, JSON.stringify(store));
  }
  const day = store[activeDate];
  day.checks ||= {};
  day.mailChecks ||= {};
  day.communityChecks ||= {};
  dailyItems.forEach((item) => {
    if (!(item in day.checks)) day.checks[item] = false;
  });
  mailCheckItems.forEach((item) => {
    if (!(item in day.mailChecks)) day.mailChecks[item] = false;
  });
  communityItems.forEach((item) => {
    if (!(item in day.communityChecks)) day.communityChecks[item] = false;
  });
  day.mailLastChecked ||= "";
  return day;
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

function renderCheckGroup(targetSelector, checkStore, items) {
  const target = $(targetSelector);
  target.replaceChildren();
  items.forEach((item) => {
    const label = document.createElement("label");
    label.className = "cockpit-check-row";
    label.innerHTML = `<input type="checkbox" /> <span>${item}</span>`;
    const checkbox = label.querySelector("input");
    checkbox.checked = checkStore[item];
    checkbox.addEventListener("change", () => {
      checkStore[item] = checkbox.checked;
      label.classList.toggle("done", checkbox.checked);
      saveStore();
    });
    label.classList.toggle("done", checkbox.checked);
    target.append(label);
  });
}

function renderChecks() {
  const day = getDay();
  renderCheckGroup("#dailyChecks", day.checks, dailyItems);
  renderCheckGroup("#mailChecks", day.mailChecks, mailCheckItems);
  renderCheckGroup("#communityChecks", day.communityChecks, communityItems);
}

function renderFields() {
  const day = getDay();
  $("#cockpitDate").value = activeDate;
  $("#cockpitDateLabel").textContent = formatDateLabel(activeDate);
  $("#mailLastChecked").value = day.mailLastChecked || "";
  $("#topPriority").value = day.topPriority || "";
  $("#articleNote").value = day.articleNote || "";
  $("#todayFocus").value = day.todayFocus || "";
  $("#growthTarget").value = day.growthTarget || "";
  $("#noticed").value = day.noticed || "";
}

function renderAll() {
  getDay();
  renderFields();
  renderChecks();
}

function shiftDate(delta) {
  const date = new Date(`${activeDate}T00:00:00`);
  date.setDate(date.getDate() + delta);
  activeDate = toDateInputValue(date);
  renderAll();
}

function bindEvents() {
  $("#cockpitDate").addEventListener("change", (event) => {
    activeDate = event.target.value || toDateInputValue(new Date());
    renderAll();
  });
  $("#prevDay").addEventListener("click", () => shiftDate(-1));
  $("#nextDay").addEventListener("click", () => shiftDate(1));
  ["mailLastChecked", "topPriority", "articleNote", "todayFocus", "growthTarget", "noticed"].forEach((key) => {
    $(`#${key}`).addEventListener("input", (event) => {
      getDay()[key] = event.target.value;
      saveStore();
    });
  });
}

bindEvents();
renderAll();
