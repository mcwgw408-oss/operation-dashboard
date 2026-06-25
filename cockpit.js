const COCKPIT_STORAGE_KEY = "operation-cockpit-v1";
const dailyItems = ["メール", "DM（前日分まで）", "記事（翌日分）", "ボイス（翌日分）", "Notes"];

const $ = (selector) => document.querySelector(selector);
let activeDate = toDateInputValue(new Date());
let store = loadStore();

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function blankDay() {
  return {
    checks: Object.fromEntries(dailyItems.map((item) => [item, false])),
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

function renderDailyChecks() {
  const day = getDay();
  const target = $("#dailyChecks");
  target.replaceChildren();
  dailyItems.forEach((item) => {
    if (!(item in day.checks)) day.checks[item] = false;
    const label = document.createElement("label");
    label.className = "cockpit-check-row";
    label.innerHTML = `<input type="checkbox" /> <span>${item}</span>`;
    const checkbox = label.querySelector("input");
    checkbox.checked = day.checks[item];
    checkbox.addEventListener("change", () => {
      day.checks[item] = checkbox.checked;
      label.classList.toggle("done", checkbox.checked);
      saveStore();
    });
    label.classList.toggle("done", checkbox.checked);
    target.append(label);
  });
}

function renderFields() {
  const day = getDay();
  $("#cockpitDate").value = activeDate;
  $("#cockpitDateLabel").textContent = formatDateLabel(activeDate);
  $("#topPriority").value = day.topPriority || "";
  $("#articleNote").value = day.articleNote || "";
  $("#todayFocus").value = day.todayFocus || "";
  $("#growthTarget").value = day.growthTarget || "";
  $("#noticed").value = day.noticed || "";
}

function renderAll() {
  getDay();
  renderFields();
  renderDailyChecks();
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
  ["topPriority", "articleNote", "todayFocus", "growthTarget", "noticed"].forEach((key) => {
    $(`#${key}`).addEventListener("input", (event) => {
      getDay()[key] = event.target.value;
      saveStore();
    });
  });
}

bindEvents();
renderAll();
