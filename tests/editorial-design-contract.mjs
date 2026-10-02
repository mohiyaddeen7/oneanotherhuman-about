import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-layout=["']editorial["']/i, "Missing editorial layout marker");
assert.match(html, /class=["'][^"']*story-rail[^"']*["']/i, "Missing relationship story rail");
assert.match(html, /class=["'][^"']*feature-line[^"']*["']/i, "Missing editorial feature rows");
assert.match(html, /What exists today/i, "Missing current-product narrative");
assert.match(html, /What we're building next/i, "Missing next-phase narrative");
assert.match(html, /Where this can go/i, "Missing future-direction narrative");

assert.doesNotMatch(html, /backdrop-filter/i, "Glassmorphism should be removed");
assert.doesNotMatch(html, /radial-gradient/i, "Decorative radial gradients should be removed");
assert.doesNotMatch(html, /feature-card/i, "Card-grid feature presentation should be removed");
assert.doesNotMatch(html, /legend-pill/i, "Status badge legend should be removed");

const roundedBlocks = (html.match(/border-radius:\s*(?:2[0-9]|3[0-9]|[4-9][0-9])px/gi) || []).length;
assert.ok(roundedBlocks <= 2, `Too many large rounded surfaces: ${roundedBlocks}`);

console.log("editorial design contract: pass");
