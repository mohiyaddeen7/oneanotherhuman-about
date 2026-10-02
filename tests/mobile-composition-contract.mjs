import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.nav-links\s*\{[\s\S]*?display:\s*none/i,
  "Phone header should remove the desktop navigation cluster",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hand-note\s*\{[\s\S]*?display:\s*block[\s\S]*?margin:[^;]*auto/i,
  "People over popularity should remain visible and centered on phones",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?h1\s*\{[\s\S]*?font-size:\s*clamp\([^;]*2\.75rem/i,
  "Phone hero typography must stay restrained",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-actions\s*\{[\s\S]*?display:\s*flex[\s\S]*?justify-content:\s*center/i,
  "Hero actions should remain compact and centered on phones",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-actions\s+\.btn\s*\{[\s\S]*?width:\s*auto/i,
  "Hero buttons must not stretch full width on phones",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.constraints\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,1fr\)\)/i,
  "Mobile constraints should use a compact two-column layout",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.constraint\s*\{[\s\S]*?padding:\s*1[0-2]px/i,
  "Constraint items should have compact mobile padding",
);

assert.match(
  html,
  /<br\s+class=["']hero-break["']\s*\/?>(?:\s*)for being understood\./i,
  "Hero line break must remain addressable responsively",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-break\s*\{[\s\S]*?display:\s*none/i,
  "Hero should wrap naturally on phones instead of forcing the desktop line break",
);

console.log("screenshot-driven mobile composition contract: pass");
