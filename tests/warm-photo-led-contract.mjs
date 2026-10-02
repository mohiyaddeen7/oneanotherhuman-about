import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /data-layout=["']warm-photo-led["']/i, "Missing warm photo-led layout marker");
assert.match(html, /class=["'][^"']*hero-photo[^"']*["']/i, "Hero must be photography-led");
assert.match(html, /class=["'][^"']*feature-photo[^"']*["']/i, "Core product should use photographic feature previews");
assert.match(html, /class=["'][^"']*happiness-photo[^"']*["']/i, "Happiness section should use photography");
assert.match(html, /People over popularity/i, "Missing human brand statement");
assert.match(html, /A calmer place to belong/i, "Missing concise emotional subhead");
assert.match(html, /The platform today/i, "Missing present-tense product section");
assert.match(html, /A calmer, kinder internet is possible/i, "Missing closing brand statement");

assert.doesNotMatch(html, /data-layout=["']editorial["']/i, "Old editorial layout marker should be replaced");
assert.doesNotMatch(html, /manifesto/i, "Old manifesto grid should be removed");
assert.doesNotMatch(html, /principless*{/i, "Old principles grid styling should be removed");

const photos = (html.match(/<img\b/gi) || []).length;
assert.ok(photos >= 5, `Expected at least 5 editorial photos, found ${photos}`);

console.log("warm photo-led design contract: pass");
