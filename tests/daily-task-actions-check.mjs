import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jsdomCacheRoot = resolve(tmpdir(), "operation-dashboard-jsdom-smoke");
const jsdomPackageJson = resolve(jsdomCacheRoot, "node_modules", "jsdom", "package.json");

if (!existsSync(jsdomPackageJson)) {
  mkdirSync(jsdomCacheRoot, { recursive: true });
  const npmArgs = ["install", "--silent", "--no-audit", "--no-fund", "--prefix", jsdomCacheRoot, "jsdom"];
  if (process.platform === "win32") {
    execFileSync("cmd.exe", ["/d", "/s", "/c", "npm", ...npmArgs], { stdio: "inherit" });
  } else {
    execFileSync("npm", npmArgs, { stdio: "inherit" });
  }
}

const require = createRequire(pathToFileURL(resolve(jsdomCacheRoot, "package.json")));
const { JSDOM } = require("jsdom");

const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");
const dom = new JSDOM(indexHtml, {
  pretendToBeVisual: true,
  runScripts: "outside-only",
  url: "https://operation-dashboard.local/index.html",
});

const { window } = dom;
if (!window.crypto?.randomUUID) {
  window.crypto = {
    ...(window.crypto || {}),
    randomUUID: () => `test-${Math.random().toString(16).slice(2)}`,
  };
}

const today = "2026-07-18";
const yesterday = "2026-07-17";
const yesterdayTitles = ["メール確認", "DM確認（前日分まで）", "記事執筆（翌日公開分）"];
const todayTitles = ["記事執筆（翌日公開分）", "メール確認", "DM確認（前日分まで）"];
window.localStorage.setItem("operation-dashboard-v1", JSON.stringify({
  [yesterday]: {
    dailyTasks: yesterdayTitles.map((title, index) => ({ id: `y-${index}`, title, done: false, priority: false })),
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
  [today]: {
    dailyTasks: todayTitles.map((title, index) => ({ id: `t-${index}`, title, done: false, priority: false })),
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
}));

window.eval(`${appJs}\n//# sourceURL=app.js`);
window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));
window.document.querySelector("#activeDate").value = today;
window.document.querySelector("#activeDate").dispatchEvent(new window.Event("change", { bubbles: true }));

const dailyTaskTitles = () => [...window.document.querySelectorAll("#dailyTasks .task-title")].map((input) => input.value);
const fail = (message) => {
  dom.window.close();
  console.error(`daily task actions check failed: ${message}`);
  process.exit(1);
};

const beforeMove = dailyTaskTitles();
if (beforeMove.length < 2) fail("not enough daily tasks rendered");

window.document.querySelector("#dailyTasks .move-button[data-move='down']")?.click();
const afterMove = dailyTaskTitles();
if (afterMove[0] !== beforeMove[1] || afterMove[1] !== beforeMove[0]) {
  fail("down button did not reorder daily tasks");
}

window.document.querySelector("#dailyTasks .delete-button")?.click();
const afterDelete = dailyTaskTitles();
if (afterDelete.includes(afterMove[0]) || afterDelete.length !== afterMove.length - 1) {
  fail("delete button did not remove the selected daily task");
}

const deletedTitles = JSON.parse(window.localStorage.getItem("operation-dashboard-deleted-daily-tasks-v1") || "[]");
if (!deletedTitles.includes(afterMove[0])) {
  fail("deleted default daily task title was not persisted");
}

dom.window.close();
console.log("daily task actions check passed");
