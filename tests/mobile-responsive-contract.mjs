import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

const featureImages = [...html.matchAll(/<img\s+class=["'][^"']*feature-photo[^"']*["'][^>]*src=["']([^"']+)["']/gi)]
  .map((m) => m[1]);

assert.ok(featureImages.length >= 6, `Expected at least 6 feature photos, found ${featureImages.length}`);

const normalizedPhotoIds = featureImages.map((url) => {
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[1] : url.split("?")[0];
});

assert.equal(
  new Set(normalizedPhotoIds).size,
  normalizedPhotoIds.length,
  "Feature photography must be unique within What already exists",
);

for (const bp of ["1024px", "768px", "640px", "480px", "360px"]) {
  assert.match(html, new RegExp(`@media\\s*\\(max-width:\\s*${bp.replace(".", "\\.")}\\)`, "i"), `Missing responsive breakpoint ${bp}`);
}

assert.match(
  html,
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.journey\s*\{[\s\S]*?grid-template-columns:\s*1fr[\s\S]*?overflow(?:-x)?:\s*visible/i,
  "Journey must become a vertical, non-horizontal-scrolling layout on mobile",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*768px\)[\s\S]*?\.feature-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/i,
  "Feature grid must be one column by tablet/mobile widths",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*480px\)[\s\S]*?h1\s*\{[\s\S]*?font-size:\s*clamp\([^;]*2\.5rem/i,
  "Mobile hero must stay below the oversized treatment shown in the reported screenshots",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*640px\)[\s\S]*?\.hero-actions\s*\{[\s\S]*?(?:display:\s*grid|flex-direction:\s*column)/i,
  "Hero actions must stack before the narrow-phone range becomes cramped",
);

assert.match(
  html,
  /@media\s*\(max-width:\s*360px\)[\s\S]*?\.nav-cta\s*\{[\s\S]*?font-size:/i,
  "Very small phones need a compact navigation CTA",
);

console.log("mobile responsive contract: pass");
