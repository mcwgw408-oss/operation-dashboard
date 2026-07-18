import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
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
const today = "2026-07-19";
const tomorrow = "2026-07-20";

function renderDashboard(operationStore, activeDate) {
  const dom = new JSDOM(indexHtml, {
    pretendToBeVisual: true,
    runScripts: "outside-only",
    url: "https://operation-dashboard.local/index.html",
  });
  const { window } = dom;
  if (!window.crypto?.randomUUID) {
    window.crypto = {
      ...(window.crypto || {}),
      randomUUID: () => `daily-count-${Math.random().toString(16).slice(2)}`,
    };
  }
  window.localStorage.setItem("operation-dashboard-v1", JSON.stringify(operationStore));
  window.eval(`${appJs}\n//# sourceURL=app.js`);
  window.document.querySelector("#activeDate").value = activeDate;
  window.document.querySelector("#activeDate").dispatchEvent(new window.Event("change", { bubbles: true }));
  return dom;
}

const dailyTasks = Array.from({ length: 9 }, (_, index) => ({
  id: `daily-${index + 1}`,
  title: `daily-task-${index + 1}`,
  done: false,
  completed: false,
  priority: false,
}));

const todayDom = renderDashboard({
  [today]: {
    dailyTasks,
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
}, today);

const renderedDailyCount = todayDom.window.document.querySelectorAll("#dailyTasks .task-check").length;
assert.equal(todayDom.window.document.querySelector("#completeCount").textContent, `0 / ${renderedDailyCount}`);
assert.equal(todayDom.window.document.querySelector("#progressLabel").textContent, "0%");

todayDom.window.document.querySelector("#dailyTasks .task-check").click();
assert.equal(todayDom.window.document.querySelector("#completeCount").textContent, `1 / ${renderedDailyCount}`);
assert.equal(JSON.parse(todayDom.window.localStorage.getItem("operation-dashboard-v1"))[today].dailyTasks[0].done, true);

while ([...todayDom.window.document.querySelectorAll("#dailyTasks .task-check")].some((checkbox) => !checkbox.checked)) {
  todayDom.window.document.querySelector("#dailyTasks .task-check:not(:checked)").click();
}
assert.equal(todayDom.window.document.querySelector("#completeCount").textContent, `${renderedDailyCount} / ${renderedDailyCount}`);
assert.equal(todayDom.window.document.querySelector("#progressLabel").textContent, "100%");
todayDom.window.close();

const tomorrowDom = renderDashboard({
  [today]: {
    dailyTasks: dailyTasks.map((task) => ({ ...task, done: true, completed: true })),
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
  [tomorrow]: {
    dailyTasks: dailyTasks.map((task, index) => ({
      id: `tomorrow-daily-${index + 1}`,
      title: task.title,
      done: false,
      completed: false,
      priority: false,
    })),
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
}, tomorrow);

const tomorrowRenderedDailyCount = tomorrowDom.window.document.querySelectorAll("#dailyTasks .task-check").length;
assert.equal(tomorrowDom.window.document.querySelector("#completeCount").textContent, `0 / ${tomorrowRenderedDailyCount}`);
assert.equal(tomorrowDom.window.document.querySelector("#progressLabel").textContent, "0%");
tomorrowDom.window.close();

console.log("daily task completion count check passed");
