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
const { JSDOM, VirtualConsole } = require("jsdom");

const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");
const activeDate = "2026-07-18";

function createDashboardDom(operationStore) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", (error) => errors.push(error));
  virtualConsole.on("error", (message) => errors.push(new Error(String(message))));

  const dom = new JSDOM(indexHtml, {
    pretendToBeVisual: true,
    runScripts: "outside-only",
    url: "https://operation-dashboard.local/index.html",
    virtualConsole,
  });
  const { window } = dom;
  window.addEventListener("error", (event) => {
    errors.push(event.error || new Error(event.message));
  });
  window.addEventListener("unhandledrejection", (event) => {
    errors.push(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
  });
  if (!window.crypto?.randomUUID) {
    window.crypto = {
      ...(window.crypto || {}),
      randomUUID: () => `today-task-ui-${Math.random().toString(16).slice(2)}`,
    };
  }

  window.localStorage.setItem("operation-dashboard-v1", JSON.stringify(operationStore));
  window.eval(`${appJs}\n//# sourceURL=app.js`);
  window.document.querySelector("#activeDate").value = activeDate;
  window.document.querySelector("#activeDate").dispatchEvent(new window.Event("change", { bubbles: true }));

  if (errors.length) {
    dom.window.close();
    throw errors[0];
  }
  return dom;
}

function readOperationStore(window) {
  return JSON.parse(window.localStorage.getItem("operation-dashboard-v1") || "{}");
}

const initialStore = {
  [activeDate]: {
    dailyTasks: [],
    todayTasks: [
      {
        id: "today-1",
        title: "UI completion regression task",
        completed: false,
        priority: false,
      },
    ],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
};

const dom = createDashboardDom(initialStore);
const { window } = dom;
const checkbox = window.document.querySelector("#todayTasks .task-check");

assert.ok(checkbox, "today task checkbox should render");
assert.equal(checkbox.checked, false);
assert.equal(window.document.querySelector("#progressLabel").textContent, "0%");
assert.equal(window.document.querySelector("#completeCount").textContent, "0 / 1");

checkbox.click();

const savedAfterClick = readOperationStore(window);
const savedTask = savedAfterClick[activeDate].todayTasks[0];
assert.equal(savedTask.completed, true);
assert.equal(savedTask.done, true);
assert.equal(window.document.querySelector("#todayTasks .task-check").checked, true);
assert.equal(window.document.querySelector("#progressLabel").textContent, "100%");
assert.equal(window.document.querySelector("#completeCount").textContent, "1 / 1");

const persistedStore = readOperationStore(window);
dom.window.close();

const reloadedDom = createDashboardDom(persistedStore);
const reloadedWindow = reloadedDom.window;
assert.equal(reloadedWindow.document.querySelector("#todayTasks .task-check").checked, true);
assert.equal(reloadedWindow.document.querySelector("#progressLabel").textContent, "100%");
assert.equal(reloadedWindow.document.querySelector("#completeCount").textContent, "1 / 1");
assert.equal(readOperationStore(reloadedWindow)[activeDate].todayTasks[0].completed, true);

reloadedDom.window.close();
console.log("today task completion UI check passed");
