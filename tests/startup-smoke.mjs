import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jsdomCacheRoot = resolve(tmpdir(), "operation-dashboard-jsdom-smoke");
const jsdomPackageJson = resolve(jsdomCacheRoot, "node_modules", "jsdom", "package.json");

function ensureJsdom() {
  if (existsSync(jsdomPackageJson)) return;
  mkdirSync(jsdomCacheRoot, { recursive: true });
  const npmArgs = ["install", "--silent", "--no-audit", "--no-fund", "--prefix", jsdomCacheRoot, "jsdom"];
  if (process.platform === "win32") {
    execFileSync("cmd.exe", ["/d", "/s", "/c", "npm", ...npmArgs], { stdio: "inherit" });
    return;
  }
  execFileSync("npm", npmArgs, { stdio: "inherit" });
}

ensureJsdom();

const require = createRequire(pathToFileURL(resolve(jsdomCacheRoot, "package.json")));
const { JSDOM, VirtualConsole } = require("jsdom");

const indexHtml = readFileSync(resolve(root, "index.html"), "utf8");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");
const errors = [];
const virtualConsole = new VirtualConsole();

virtualConsole.on("jsdomError", (error) => {
  errors.push(error);
});
virtualConsole.on("error", (message) => {
  errors.push(new Error(String(message)));
});

const dom = new JSDOM(indexHtml, {
  pretendToBeVisual: true,
  runScripts: "outside-only",
  url: "https://operation-dashboard.local/index.html",
  virtualConsole,
});

dom.window.addEventListener("error", (event) => {
  errors.push(event.error || new Error(event.message));
});
dom.window.addEventListener("unhandledrejection", (event) => {
  errors.push(event.reason instanceof Error ? event.reason : new Error(String(event.reason)));
});

if (!dom.window.crypto?.randomUUID) {
  dom.window.crypto = {
    ...(dom.window.crypto || {}),
    randomUUID: () => "00000000-0000-4000-8000-000000000000",
  };
}

try {
  dom.window.eval(`${appJs}\n//# sourceURL=app.js`);
  await new Promise((resolveTick) => dom.window.setTimeout(resolveTick, 0));
} catch (error) {
  errors.push(error);
} finally {
  dom.window.close();
}

if (errors.length > 0) {
  console.error("startup smoke failed");
  errors.forEach((error) => {
    console.error(error?.stack || error);
  });
  process.exit(1);
}

console.log("startup smoke passed");
