import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /class=["'][^"']*journey-heading-row[^"']*["']/i, "How it works needs a compact heading plus rule");
assert.match(html, /class=["'][^"']*journey-icon[^"']*["']/i, "Journey nodes need circular icon treatment");
assert.match(html, /class=["'][^"']*journey-step[^"']*is-active[^"']*["']/i, "Final messaging node should be highlighted");
assert.match(html, /\.journey-step::after\s*\{[\s\S]*?height:\s*1px/i, "Journey nodes should be connected by a thin rail");
assert.match(
  html,
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.journey-step\s*\{[\s\S]*?flex:\s*0\s+0\s+25%/i,
  "First mobile journey row should fit four steps",
);
assert.match(
  html,
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.journey-step:nth-child\(n\+5\)\s*\{[\s\S]*?flex-basis:\s*33\.333%/i,
  "Second mobile journey row should fit three centered-width steps",
);
assert.match(
  html,
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.journey-step:nth-child\(4\)::after[\s\S]*?display:\s*none/i,
  "Wrapped rail must stop after the fourth node",
);
assert.match(html, /Your profile/i, "Journey should use the selected concise profile label");
assert.match(html, /A Moment/i, "Journey should use the selected concise Moment label");
assert.match(html, /Messaging/i, "Journey should end with Messaging");

const iconCount = (html.match(/class=["'][^"']*journey-icon[^"']*["']/gi) || []).length;
assert.equal(iconCount, 7, `Expected 7 journey icons, found ${iconCount}`);

console.log("how-it-works visual rail contract: pass");
