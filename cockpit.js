const COCKPIT_STORAGE_KEY = "operation-cockpit-v1";
const CREATOR_MASTER_STORAGE_KEY = "operation-cockpit-daily-creators-v1";
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
const initialCreators = [
  "いとん",
  "ゆるAI納得設計ラボ",
  "よしなり",
  "よしだ健康",
  "まさひろ",
  "ひろし",
  "noteクリエイターまさひろ",
  "小澤竜太",
  "イケハヤ",
  "こばだい",
  "マナブ",
  "ウミノ",
  "ボン",
];

const $ = (selector) => document.querySelector(selector);
let activeDate = toDateInputValue(new Date());
let store = loadStore();
let creators = loadCreators();

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function checksFrom(items) {
  return Object.fromEntries(items.map((item) => [item, false]));
}

function newCreator(name = "") {
  return {
    id: crypto.randomUUID(),
    name,
    memo: "",
  };
}

function blankDay() {
  return {
    checks: checksFrom(dailyItems),
    mailChecks: checksFrom(mailCheckItems),
    communityChecks: checksFrom(communityItems),
    creatorChecks: {},
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

function loadCreators() {
  try {
    const saved = JSON.parse(localStorage.getItem(CREATOR_MASTER_STORAGE_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
  }
  const seeded = initialCreators.map(newCreator);
  localStorage.setItem(CREATOR_MASTER_STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function saveCreators() {
  localStorage.setItem(CREATOR_MASTER_STORAGE_KEY, JSON.stringify(creators));
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
  day.creatorChecks ||= {};
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

function renderCreators() {
  const day = getDay();
  const target = $("#creatorList");
  target.replaceChildren();
  creators.forEach((creator, index) => {
    if (!(creator.id in day.creatorChecks)) day.creatorChecks[creator.id] = false;
    const row = document.createElement("div");
    row.className = "creator-row";
    row.classList.toggle("done", day.creatorChecks[creator.id]);
    row.innerHTML = `
      <input class="creator-check" type="checkbox" />
      <div class="creator-fields">
        <input class="creator-name" type="text" aria-label="発信者名" />
        <textarea class="creator-memo" rows="2" aria-label="発信者メモ" placeholder="メモ"></textarea>
      </div>
      <div class="creator-actions">
        <button class="move-button" data-move="up" type="button" title="上へ">↑</button>
        <button class="move-button" data-move="down" type="button" title="下へ">↓</button>
        <button class="delete-button" type="button">削除</button>
      </div>
    `;
    const checkbox = row.querySelector(".creator-check");
    const nameInput = row.querySelector(".creator-name");
    const memoInput = row.querySelector(".creator-memo");
    checkbox.checked = day.creatorChecks[creator.id];
    nameInput.value = creator.name;
    memoInput.value = creator.memo || "";
    checkbox.addEventListener("change", () => {
      day.creatorChecks[creator.id] = checkbox.checked;
      row.classList.toggle("done", checkbox.checked);
      saveStore();
    });
    nameInput.addEventListener("input", () => {
      creator.name = nameInput.value;
      saveCreators();
    });
    memoInput.addEventListener("input", () => {
      creator.memo = memoInput.value;
      saveCreators();
    });
    row.querySelector(".delete-button").addEventListener("click", () => {
      creators = creators.filter((candidate) => candidate.id !== creator.id);
      delete day.creatorChecks[creator.id];
      saveCreators();
      saveStore();
      renderCreators();
    });
    row.querySelectorAll(".move-button").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.move === "up" ? -1 : 1;
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= creators.length) return;
        const [moving] = creators.splice(index, 1);
        creators.splice(nextIndex, 0, moving);
        saveCreators();
        renderCreators();
      });
    });
    target.append(row);
  });
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
  renderCreators();
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
  $("#creatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#creatorNameInput");
    const name = input.value.trim();
    if (!name) return;
    creators.push(newCreator(name));
    input.value = "";
    saveCreators();
    renderCreators();
  });
  ["mailLastChecked", "topPriority", "articleNote", "todayFocus", "growthTarget", "noticed"].forEach((key) => {
    $(`#${key}`).addEventListener("input", (event) => {
      getDay()[key] = event.target.value;
      saveStore();
    });
  });
}

bindEvents();
renderAll();
