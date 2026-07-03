const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class MemoryStorage {
  constructor(seed = {}) {
    this.values = new Map(Object.entries(seed));
    this.writes = [];
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.writes.push(key);
    this.values.set(key, String(value));
  }
}

function dateKeyDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const repoRoot = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(repoRoot, "app.js"), "utf8");
const top = appJs.slice(0, appJs.indexOf("const defaultDailyTasks"));
const dateHelper = appJs.slice(
  appJs.indexOf("function toDateInputValue"),
  appJs.indexOf("function newItem"),
);
const helpers = appJs.slice(
  appJs.indexOf("function readStoredJson"),
  appJs.indexOf("function renderSnapshotPanel"),
);

const today = dateKeyDaysAgo(0);
const oldDay = dateKeyDaysAgo(12);

const storage = new MemoryStorage({
  "sakura-snapshot-settings-v1": JSON.stringify({
    reflection: false,
    feelings: false,
    mailDmCounts: false,
    stock: false,
  }),
  "operation-dashboard-v1": JSON.stringify({
    [oldDay]: { dailyTasks: [], todayTasks: [], projects: [], metrics: {}, reflection: {} },
    [today]: {
      dailyTasks: [{ title: "daily", done: true }],
      todayTasks: [{ title: "today", done: false }],
      projects: [{ title: "project", done: true }],
      metrics: {
        mailMorningChecked: true,
        mailNoonChecked: false,
        mailNightChecked: true,
        dmPreviousDone: true,
        dmPending: "4",
        dmHandled: "2",
        mailUnread: "9",
        mailProcessed: "3",
      },
      reflection: {
        didToday: "private",
        blockedToday: "private",
        tomorrowPlan: "private",
      },
    },
  }),
  "operation-dashboard-later-v1": JSON.stringify([{ title: "open", done: false }]),
  "operation-dashboard-persistent-memos-v1": JSON.stringify([{ text: "memo" }]),
  "discovery-labo-discoveries": JSON.stringify([
    { title: "seed", status: "発酵中", statusChangedAt: dateKeyDaysAgo(5) },
  ]),
  "discovery-labo-entry-sources-v1": JSON.stringify([{ name: "source" }]),
  "koryu-log-labo-entries": JSON.stringify([
    {
      date: today,
      name: "person",
      revisit: "はい",
      tension: "private",
      impression: "private",
      happyMoment: "private",
    },
  ]),
  "hasshin-kansatsu-labo-entries": JSON.stringify([
    { date: oldDay, trigger: "old", nextAction: "do this" },
  ]),
  "substack-labo-workspace-v2": JSON.stringify({
    writings: { notes: [{ title: "draft", status: "執筆中" }], articles: [] },
    people: { follows: [], followers: [] },
    articleReviews: [],
    ideas: [],
    quickMemos: [],
    emailList: [{ email: "must-not-appear@example.com" }],
  }),
  "stock-labo-items-v1": JSON.stringify([{ name: "rice" }]),
});

const context = {
  localStorage: storage,
  crypto,
  Blob: function Blob() {},
  URL: { createObjectURL() {}, revokeObjectURL() {} },
  document: {},
  navigator: {},
  console,
};
vm.createContext(context);
vm.runInContext(
  `${top}\n${dateHelper}\n${helpers}\nglobalThis.__snapshot = buildSakuraSnapshot("morning");`,
  context,
);

const snapshot = context.__snapshot;
const text = JSON.stringify(snapshot);

assert.equal(snapshot.format, "sakura-snapshot");
assert.equal(snapshot.mode, "morning");
assert.equal(snapshot.privacy.reflection, false);
assert.equal(snapshot.privacy.feelings, false);
assert.equal(snapshot.privacy.mailDmCounts, false);
assert.equal(snapshot.privacy.stock, false);
assert.equal(snapshot.apps["operation-dashboard"].data.recentDays[today].reflection, null);
assert.equal(snapshot.apps["operation-dashboard"].data.recentDays[today].metrics.dmPending, null);
assert.equal(snapshot.apps["operation-dashboard"].data.recentDays[today].metrics.dmHandled, null);
assert.equal(snapshot.apps["operation-dashboard"].data.olderDaysCount, 1);
assert.equal(snapshot.apps["koryu-log-labo"].data.entries[0].tension, null);
assert.equal(snapshot.apps["koryu-log-labo"].data.entries[0].impression, null);
assert.equal(snapshot.apps["koryu-log-labo"].data.entries[0].happyMoment, null);
assert.equal(snapshot.apps["stock-labo"], null);
assert.equal(snapshot.summary.seedsFermenting, 1);
assert.equal(snapshot.summary.writingInProgress, 1);
assert.equal(snapshot.summary.openNextActions, 1);
assert.equal(text.includes("emailList"), false);
assert.equal(text.includes("must-not-appear@example.com"), false);
assert.deepEqual(storage.writes, []);

console.log("snapshot.test.js: ok");
