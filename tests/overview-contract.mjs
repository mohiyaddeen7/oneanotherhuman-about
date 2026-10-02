import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function expectFeature(key, status) {
  const pattern = new RegExp(
    `data-feature=["']${key}["'][\\s\\S]{0,700}?data-status=["']${status}["']`,
    "i",
  );
  assert.match(
    html,
    pattern,
    `Expected feature "${key}" to be explicitly labelled "${status}"`,
  );
}

assert.match(html, /id=["']features["']/i, "Missing Explore the platform section");
assert.match(html, /Explore the platform/i, "Missing feature-map heading");
assert.match(html, /Available now/i, "Missing Available now legend");
assert.match(html, /In development/i, "Missing In development legend");
assert.match(html, /Future direction/i, "Missing Future direction legend");

for (const key of [
  "pseudonymous-identity",
  "meaningful-discovery",
  "moments",
  "crossing-paths",
  "circle",
  "direct-messaging",
]) {
  expectFeature(key, "available");
}

expectFeature("happiness", "development");

for (const key of [
  "communities",
  "check-ins",
  "live-circles",
  "shared-games",
]) {
  expectFeature(key, "future");
}

assert.match(
  html,
  /Built, being built, and future ideas are deliberately separated/i,
  "Missing status-boundary explanation",
);
assert.match(
  html,
  /No follower-count race/i,
  "Missing product differentiation constraints",
);
assert.match(
  html,
  /Pseudonymous profile[\s\S]*Discovery[\s\S]*Moment[\s\S]*Crossed path[\s\S]*Mutual connection[\s\S]*Circle[\s\S]*Messaging/i,
  "Missing relationship-journey feature path",
);

console.log("overview contract: pass");
