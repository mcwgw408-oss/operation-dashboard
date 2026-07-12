import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appJs = readFileSync(resolve(root, "app.js"), "utf8");

function extractFunction(source, name) {
  const marker = `function ${name}`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`${name} was not found`);
  const openIndex = source.indexOf("{", markerIndex);
  if (openIndex < 0) throw new Error(`${name} body was not found`);
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(markerIndex, index + 1);
  }
  throw new Error(`${name} body was not closed`);
}

const factory = new Function(`
  ${extractFunction(appJs, "laterCreatedTime")}
  ${extractFunction(appJs, "sortLaterItemsForDisplay")}
  return { sortLaterItemsForDisplay };
`);
const { sortLaterItemsForDisplay } = factory();

{
  const items = [
    { id: "new", createdAt: "2026-01-03T00:00:00.000Z" },
    { id: "old", createdAt: "2026-01-01T00:00:00.000Z" },
    { id: "mid", createdAt: "2026-01-02T00:00:00.000Z" },
  ];
  assert.deepEqual(sortLaterItemsForDisplay(items).map((item) => item.id), ["old", "mid", "new"]);
  assert.deepEqual(
    sortLaterItemsForDisplay(items, "newest").map((item) => item.id),
    ["new", "mid", "old"],
  );
}

{
  const items = [
    { id: "legacy-a" },
    { id: "new", createdAt: "2026-01-02T00:00:00.000Z" },
    { id: "legacy-b" },
    { id: "old", createdAt: "2026-01-01T00:00:00.000Z" },
  ];
  assert.deepEqual(
    sortLaterItemsForDisplay(items).map((item) => item.id),
    ["legacy-a", "legacy-b", "old", "new"],
  );
  assert.deepEqual(
    sortLaterItemsForDisplay(items, "newest").map((item) => item.id),
    ["new", "old", "legacy-a", "legacy-b"],
  );
}

{
  const items = [
    { id: "new", createdAt: "2026-01-03T00:00:00.000Z" },
    { id: "old", createdAt: "2026-01-01T00:00:00.000Z" },
  ];
  const originalOrder = items.map((item) => item.id);
  const sorted = sortLaterItemsForDisplay(items);
  assert.deepEqual(items.map((item) => item.id), originalOrder);
  assert.notEqual(sorted, items);
}

console.log("later items sort check passed");
