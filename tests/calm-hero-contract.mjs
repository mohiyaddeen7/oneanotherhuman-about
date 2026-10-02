import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const hero = html.match(/<section class=["']hero["']>[\s\S]*?<\/section>/i)?.[0] ?? "";

assert.ok(hero, "Hero section not found");
assert.doesNotMatch(hero, /People over popularity/i, "Hero should not repeat the People over popularity eyebrow");
assert.match(hero, /A social network[\s\S]*for being understood\./i, "Hero headline should remain");
assert.match(hero, /Meaningful connections\. Real conversations\. A calmer place to belong\./i, "Hero supporting line should remain");

const primaryButtons = hero.match(/class=["'][^"']*btn\s+primary[^"']*["']/gi) || [];
assert.equal(primaryButtons.length, 1, `Expected one primary hero CTA, found ${primaryButtons.length}`);

assert.match(hero, /class=["'][^"']*hero-secondary[^"']*["'][^>]*>\s*Explore the platform/i, "Explore the platform should be a lightweight hero text link");
assert.doesNotMatch(hero, /class=["'][^"']*btn[^"']*["'][^>]*>\s*Explore the platform/i, "Explore the platform should not render as a button");

assert.match(
  html,
  /\.hero-actions\s*\{[\s\S]*?align-items:\s*center/i,
  "Hero actions should align compact CTA and text link cleanly",
);

assert.match(
  html,
  /\.hero-secondary\s*\{[\s\S]*?border-bottom:/i,
  "Secondary hero action should use a restrained text-link treatment",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?h1\s*\{[\s\S]*?font-size:\s*clamp\([^;]*2\.5rem/i,
  "Phone hero headline should remain restrained",
);

console.log("calm hero contract: pass");
