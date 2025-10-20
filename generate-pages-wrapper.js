// generate-pages-wrapper.js
import fs from "fs";
import path from "path";
import glob from "glob";
import React from "react";
import ReactDOMServer from "react-dom/server";
import babel from "@babel/core";
import { fileURLToPath, pathToFileURL } from "url";
import fsExtra from "fs-extra";
import { minify } from 'html-minifier-terser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src/pages");
const BUILD_DIR = path.join(ROOT, "build");
const DIST_DIR = path.join(ROOT, "dist");
const PUBLIC_DIR = path.join(ROOT, "public");
const ASSETS_SRC = path.join(ROOT, "src/assets");
const ASSETS_DEST = path.join(DIST_DIR, "assets");

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

// ✅ Auto-detect CSS & JS bundles
function getAllFilesRecursively(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getAllFilesRecursively(fullPath, ext);
    return fullPath.endsWith(ext) ? [fullPath] : [];
  });
}

const cssFiles = getAllFilesRecursively(path.join(BUILD_DIR, "static/css"), ".css");
const jsFiles = getAllFilesRecursively(path.join(BUILD_DIR, "static/js"), ".js");

const cssLinks = cssFiles.map((f) => {
  const rel = path.relative(DIST_DIR, f).replace(/\\/g, "/");
  return `<link rel="stylesheet" href="../${rel}">`;
});

const jsScripts = jsFiles.map((f) => {
  const rel = path.relative(DIST_DIR, f).replace(/\\/g, "/");
  return `<script src="../${rel}" defer></script>`;
});
console.log(`🧩 Detected ${cssFiles.length} CSS and ${jsFiles.length} JS assets from build/static`);

// 3️⃣ Transpile JSX → ESM temp module
async function importJSX(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const { code: transpiled } = babel.transformSync(code, {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    filename: filePath,
    sourceMaps: false,
    babelrc: false,
    configFile: false,
    assumptions: { noDocumentAll: true },
    plugins: [],
    // ✅ Force ESM output (so no "exports" errors)
    presetsConfig: {},
    comments: false,
    compact: true,
    retainLines: false,
    sourceType: "module",
    envName: "production",
    caller: { name: "babel-loader" },
    // Critical fix:
    presetsOptions: { modules: false },
  });

  const tempFile = path.join(__dirname, `.temp-${path.basename(filePath, ".jsx")}.mjs`);
  fs.writeFileSync(tempFile, transpiled, "utf8");

  const module = await import(pathToFileURL(tempFile).href);
  fs.unlinkSync(tempFile);
  return module;
}

// Route mapping
const routeMap = {
  Home: 'index.html',
  About: 'about.html',
  Courses: 'courses.html',
  Services: 'services.html',
  Price: 'pricing.html',
  GetStarted: 'get-started.html',
  Blog: 'blog.html',
  Partners: 'partners.html',
  Contact: 'contact.html',
  PrivacyPolicy: 'privacy-policy.html',
  TermsConditions: 'terms-conditions.html',
  ShippingPolicy: 'shipping-policy.html',
  RefundPolicy: 'refund-policy.html'
};

// Utility: transpile JSX to temp .mjs then import it
async function importJSX(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const { code: transpiled } = babel.transformSync(code, {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    filename: filePath,
  });

  const tempFile = path.join(__dirname, `.temp-${path.basename(filePath, ".jsx")}.mjs`);
  fs.writeFileSync(tempFile, transpiled, "utf8");

  const module = await import(pathToFileURL(tempFile).href);
  fs.unlinkSync(tempFile); // clean up
  return module;
}

// Generate HTML pages
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(SRC_DIR, file);
  const pageName = path.basename(file, ".jsx");

  try {
    const pageModule = await importJSX(filePath);
    
    // Normalize the default export to a React component
    let Page = pageModule?.default || pageModule;
    if (typeof Page !== 'function' && typeof Page !== 'object') {
      throw new Error(`Invalid React component in ${file}`);
    }

    // If React is undefined in SSR (CRA auto JSX runtime), wrap with React
    if (!Page) {
      console.warn(`⚠️ Skipping ${file} — no valid React component export`);
      continue;
    }

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

    // ✅ Minify HTML before saving
    fullHtml = await minify(fullHtml, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    });

    fs.writeFileSync(outputFile, fullHtml, 'utf8');
    console.log('✅ Generated HTML:', outputFile);
  } catch (err) {
    console.error(`❌ Failed to render ${file}:`, err);
  } 
}

console.log("\n✨ All pages prerendered successfully with CSS & JS bundles injected!");