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
const activeDate = "2026-07-19";

function renderDashboard(operationStore) {
  const dom = new JSDOM(indexHtml, {
    pretendToBeVisual: true,
    runScripts: "outside-only",
    url: "https://operation-dashboard.local/index.html",
  });
  const { window } = dom;
  if (!window.crypto?.randomUUID) {
    window.crypto = {
      ...(window.crypto || {}),
      randomUUID: () => `daily-focus-source-${Math.random().toString(16).slice(2)}`,
    };
  }
  window.localStorage.setItem("operation-dashboard-v1", JSON.stringify(operationStore));
  window.eval(`${appJs}\n//# sourceURL=app.js`);
  window.document.querySelector("#activeDate").value = activeDate;
  window.document.querySelector("#activeDate").dispatchEvent(new window.Event("change", { bubbles: true }));
  return dom;
}

const dailyOnlyDom = renderDashboard({
  [activeDate]: {
    dailyTasks: [
      { id: "daily-1", title: "おはスタック回り", done: false, completed: false, priority: true },
    ],
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
});

assert.equal(dailyOnlyDom.window.document.querySelector("#completeCount").textContent, "0 / 0");
assert.equal(dailyOnlyDom.window.document.querySelector("#progressLabel").textContent, "0%");
assert.ok(!dailyOnlyDom.window.document.querySelector("#dailyFocusTask").textContent.includes("おはスタック回り"));
dailyOnlyDom.window.close();

const todayDom = renderDashboard({
  [activeDate]: {
    dailyTasks: [
      { id: "daily-1", title: "おはスタック回り", done: false, completed: false, priority: true },
    ],
    todayTasks: [
      { id: "today-1", title: "今日だけの用事", done: false, completed: false, priority: false },
    ],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
});

assert.equal(todayDom.window.document.querySelector("#completeCount").textContent, "0 / 1");
assert.equal(todayDom.window.document.querySelector("#dailyFocusTask").textContent, "今日だけの用事");
todayDom.window.close();

console.log("daily focus today task source check passed");
