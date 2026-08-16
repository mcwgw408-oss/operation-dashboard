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
const previousDate = "2026-07-18";
const nextDate = "2026-07-19";
const customMode = "custom afternoon mode";

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
    randomUUID: () => `after-ten-mode-${Math.random().toString(16).slice(2)}`,
  };
}

window.localStorage.setItem("operation-dashboard-after-ten-mode-options-v1", JSON.stringify([customMode]));
window.localStorage.setItem(
  "operation-dashboard-v1",
  JSON.stringify({
    [previousDate]: {
      dailyTasks: [],
      todayTasks: [],
      todayEvents: [],
      projects: [],
      metrics: {},
      reflection: {},
      afterTenMode: [customMode],
      afterTenModeStep: "previous day step",
      afterTenModeUpdatedAt: "2026-07-18T09:00:00.000Z",
    },
    [nextDate]: {
      dailyTasks: [],
      todayTasks: [],
      todayEvents: [],
      projects: [],
      metrics: {},
      reflection: {},
      afterTenMode: [],
      afterTenModeStep: "",
      afterTenModeUpdatedAt: "",
    },
  }),
);

window.eval(`${appJs}\n//# sourceURL=app.js`);

const dateField = window.document.querySelector("#activeDate");
const stepField = window.document.querySelector("#afterTenModeStep");

dateField.value = previousDate;
dateField.dispatchEvent(new window.Event("change", { bubbles: true }));
assert.equal(stepField.value, "previous day step");
assert.equal(window.document.querySelector(`#afterTenModeOptions input[value="${customMode}"]`).checked, true);

stepField.focus();
dateField.value = nextDate;
dateField.dispatchEvent(new window.Event("change", { bubbles: true }));

assert.equal(stepField.value, "", "after-ten-mode step should reset when the active date changes");
assert.equal(
  window.document.querySelector(`#afterTenModeOptions input[value="${customMode}"]`).checked,
  false,
  "after-ten-mode selections should be scoped to the active date",
);

if (errors.length) {
  dom.window.close();
  throw errors[0];
}

dom.window.close();
console.log("after-ten-mode date scope check passed");
