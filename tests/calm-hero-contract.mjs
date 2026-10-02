import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const hero = html.match(/<section class=["'][^"']*hero[^"']*["'][^>]*>[\s\S]*?<\/section>/i)?.[0] ?? "";

assert.ok(hero, "Hero section not found");
assert.match(hero, /class=["'][^"']*hero-inner[^"']*["']/i, "Hero copy should overlay the photograph");
assert.match(hero, /class=["'][^"']*hero-photo[^"']*["']/i, "Hero must remain photo-led");
assert.match(hero, /A social network[\s\S]*for being understood\./i, "Hero headline should remain");
assert.match(hero, /Meaningful connections\. Real conversations\./i, "Hero supporting copy should be shorter");
assert.doesNotMatch(hero, /A calmer place to belong/i, "Hero should remove the extra supporting clause");
assert.doesNotMatch(hero, /Explore the platform/i, "Hero should contain only one action");
assert.doesNotMatch(hero, /People over popularity/i, "Hero should not contain an eyebrow");

const heroLinks = hero.match(/<a\b/gi) || [];
assert.equal(heroLinks.length, 1, `Expected exactly one hero CTA, found ${heroLinks.length}`);
assert.match(hero, /See how it works\s*→/i, "Hero CTA should be the single See how it works action");

assert.match(
  html,
  /\.hero\s*\{[\s\S]*?min-height:\s*7[0-8]vh/i,
  "Desktop hero should be cinematic rather than stacked",
);
assert.match(
  html,
  /\.hero-inner\s*\{[\s\S]*?align-items:\s*flex-end/i,
  "Hero copy should sit in the lower portion of the photograph",
);
assert.match(
  html,
  /\.hero::after\s*\{[\s\S]*?linear-gradient/i,
  "Hero needs a restrained readability gradient",
);
assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero\s*\{[\s\S]*?min-height:\s*6[2-8]vh/i,
  "Mobile hero should use a controlled portrait-height composition",
);
assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-photo\s*\{[\s\S]*?object-position:/i,
  "Mobile hero needs an explicit portrait crop",
);

console.log("cinematic hero contract: pass");
