import assert from "node:assert/strict";
import { createBrainGoldenHarness } from "./harness.mjs";

const harness = createBrainGoldenHarness();

assert.equal(
  harness.intentRegenerationBoundary("operation-cockpit-v1", ""),
  true,
  "Intent save must regenerate before the first response",
);
assert.equal(
  harness.intentRegenerationBoundary("operation-cockpit-v1", "try"),
  false,
  "Intent save must not regenerate after the first response",
);
assert.equal(
  harness.intentRegenerationBoundary("operation-cockpit-v1", "later"),
  false,
  "Every first-response choice must lock the current proposal",
);
assert.equal(
  harness.intentRegenerationBoundary("unrelated-storage-key", ""),
  false,
  "Unrelated storage changes must not regenerate the Brain",
);

console.log("intent regeneration check passed");
