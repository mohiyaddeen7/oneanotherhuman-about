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
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hand-note\s*\{[\s\S]*?display:\s*none/i,
  "Handwritten desktop flourish should not consume a mobile section",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?h1\s*\{[\s\S]*?font-size:\s*clamp\([^;]*2\.75rem/i,
  "Phone hero typography must be materially smaller than the tablet treatment",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.section-title\s*\{[\s\S]*?font-size:\s*clamp\([^;]*2\.25rem/i,
  "Phone section headings must fit without dominating the viewport",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.section\s*\{[\s\S]*?padding:\s*4[0-9]px\s+0/i,
  "Phone sections should use compact vertical rhythm",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.constraints\s*\{[\s\S]*?margin-top:\s*2[0-9]px/i,
  "Constraint list should not start with desktop-sized spacing on phones",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.constraint\s*,\s*\.constraint:nth-child\(even\)\s*\{[\s\S]*?padding:\s*1[0-3]px\s+0/i,
  "Constraint rows should be compact on phones",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-actions\s+\.btn:not\(\.primary\)\s*\{[\s\S]*?border:\s*0/i,
  "Secondary hero action should become a lightweight text action on phones",
);

assert.match(
  html,
  /<br\s+class=["']hero-break["']\s*\/?>(?:\s*)for being understood\./i,
  "Hero line break must be addressable responsively",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-break\s*\{[\s\S]*?display:\s*none/i,
  "Hero should wrap naturally on phones instead of forcing the desktop line break",
);

console.log("screenshot-driven mobile composition contract: pass");
