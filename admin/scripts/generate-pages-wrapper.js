// generate-pages-wrapper.js
import fs from "fs";
import path from "path";
import glob from "glob";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { pathToFileURL } from "url";

import * as babel from "@babel/register";
import fsExtra from "fs-extra";

import { minify } from 'html-minifier-terser';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src/pages");
const BUILD_DIR = path.join(ROOT, "build");
const DIST_DIR = path.join(ROOT, "dist");
const PUBLIC_DIR = path.join(ROOT, "public");
const ASSETS_SRC = path.join(ROOT, "src/assets");
const ASSETS_DEST = path.join(DIST_DIR, "assets");

// Transpile JSX files for Node.js
babel.default({
  extensions: [".js", ".jsx"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/node_modules/],
});

// Ensure directories exist
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_DEST)) fs.mkdirSync(ASSETS_DEST, { recursive: true });

// ✅ Copy assets and public files
if (fs.existsSync(PUBLIC_DIR)) {
  fsExtra.copySync(PUBLIC_DIR, DIST_DIR, { overwrite: true });
  console.log("📦 Copied public → dist");
}
if (fs.existsSync(ASSETS_SRC)) {
  fsExtra.copySync(ASSETS_SRC, ASSETS_DEST, { overwrite: true });
  console.log("📦 Copied src/assets → dist/assets");
}

// ✅ Detect CSS and JS bundles from CRA build
let cssLinks = [];
let jsScripts = [];
const staticCssDir = path.join(BUILD_DIR, "static/css");
const staticJsDir = path.join(BUILD_DIR, "static/js");

if (fs.existsSync(staticCssDir)) {
  const cssFiles = fs.readdirSync(staticCssDir).filter((f) => f.endsWith(".css"));
  cssLinks = cssFiles.map((file) => `<link rel="stylesheet" href="../build/static/css/${file}">`);
}

if (fs.existsSync(staticJsDir)) {
  const jsFiles = fs.readdirSync(staticJsDir).filter((f) => f.endsWith(".js"));
  jsScripts = jsFiles.map((file) => `<script src="../build/static/js/${file}" defer></script>`);
}
console.log(`🧩 Detected ${cssLinks.length} CSS and ${jsScripts.length} JS assets from build/static`);

// Route map: filename -> URL
const routeMap = {
  Home: "index.html",
  About: "about.html",
  Courses: "courses.html",
  Services: "services.html",
  Price: "pricing.html",
  GetStarted: "get-started.html",
  Blog: "blog.html",
  Partners: "partners.html",
  Contact: "contact.html",
  PrivacyPolicy: "privacy-policy.html",
  TermsConditions: "terms-conditions.html",
  ShippingPolicy: "shipping-policy.html",
  RefundPolicy: "refund-policy.html",
};

// 1️⃣ Generate HTML pages
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith(".jsx"));

for (const file of files) {
  const filePath = path.join(SRC_DIR, file);
  const { default: Page } = await import(pathToFileURL(filePath).href + `?ts=${Date.now()}`); // cache-busting import

  const pageName = path.basename(file, ".jsx");
  const outputFile = path.join(DIST_DIR, routeMap[pageName] || `${pageName.toLowerCase()}.html`);

  const htmlContent = ReactDOMServer.renderToString(React.createElement(Page));

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageName} — Apply4Study</title>
  <meta name="description" content="${pageName} page" />
  ${cssLinks.join("\n  ")}
</head>
<body>
  <div id="root">${htmlContent}</div>
  ${jsScripts.join("\n  ")}
</body>
</html>`;

  const html = await minify(fullHtml, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });

  fs.writeFileSync(outputFile, fullHtml, "utf8");
  console.log("✅ Generated HTML:", outputFile);
}

// 2️⃣ Copy assets
glob(`${ASSETS_SRC}/**/*`, { nodir: true }, (err, files) => {
  if (err) throw err;
  for (const f of files) {
    const relPath = path.relative(ASSETS_SRC, f);
    const dest = path.join(ASSETS_DEST, relPath);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(f, dest);
  }
  console.log("✅ Copied all assets to dist/assets");
});

console.log("\n✨ All pages prerendered successfully with CSS & JS bundles injected!");
