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
const activeDate = "2026-08-16";
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
    randomUUID: () => `substack-scope-${Math.random().toString(16).slice(2)}`,
  };
}

window.localStorage.setItem("operation-dashboard-v1", JSON.stringify({
  [activeDate]: {
    dailyTasks: [],
    todayTasks: [],
    todayEvents: [],
    projects: [],
    metrics: {},
    reflection: {},
  },
}));

window.eval(`${appJs}\n//# sourceURL=app.js`);
window.document.querySelector("#activeDate").value = activeDate;
window.document.querySelector("#activeDate").dispatchEvent(new window.Event("change", { bubbles: true }));

if (errors.length) {
  dom.window.close();
  throw errors[0];
}

const regularEntry = window.document.querySelector('[data-page-entry="Substack（いつもの）"]');
const abuseEntry = window.document.querySelector('[data-page-entry="Substack（虐待）"]');
const titleInput = window.document.querySelector("#substackArticleTitle");
const saveButton = window.document.querySelector("#saveSubstack");

assert.ok(regularEntry, "regular Substack entry should exist");
assert.ok(abuseEntry, "abuse Substack entry should exist");
assert.ok(titleInput, "Substack title input should exist");
assert.ok(saveButton, "Substack save button should exist");

regularEntry.click();
titleInput.value = "regular article";
saveButton.click();

abuseEntry.click();
assert.equal(titleInput.value, "", "abuse Substack entry should not reuse regular input data");
titleInput.value = "abuse article";
saveButton.click();

const savedStore = JSON.parse(window.localStorage.getItem("operation-dashboard-v1") || "{}");
assert.equal(savedStore[activeDate].substack.articleTitle, "regular article");
assert.equal(savedStore[activeDate].substackAbuse.articleTitle, "abuse article");

regularEntry.click();
assert.equal(titleInput.value, "regular article", "regular Substack entry should reload its own saved data");

dom.window.close();
console.log("substack entry storage scope check passed");
