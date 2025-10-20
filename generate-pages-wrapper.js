// generate-pages-wrapper.js
import fs from "fs";
import path from "path";
import glob from "glob";
import React from "react";
import ReactDOMServer from "react-dom/server";

// Use Babel register to allow Node to import CRA JSX files
import babelRegister from "@babel/register";

babelRegister({
  extensions: [".js", ".jsx"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

// Paths
const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, "src/pages");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const ASSETS_SRC = path.join(ROOT_DIR, "src/assets");
const ASSETS_DEST = path.join(DIST_DIR, "assets");

// Ensure directories exist
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_DEST)) fs.mkdirSync(ASSETS_DEST, { recursive: true });

// Route map: filename -> HTML file
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
const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".jsx"));

for (const file of files) {
  const filePath = path.join(SRC_DIR, file);
  const pageName = path.basename(file, ".jsx");
  const outputFile = path.join(DIST_DIR, routeMap[pageName] || `${pageName.toLowerCase()}.html`);

  // Import CRA component dynamically via Babel register
  const Page = (await import(filePath)).default;

  // Render static HTML
  const pageHtml = ReactDOMServer.renderToString(React.createElement(Page));

  // Full HTML with hydration script
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName} — Apply4Study</title>
  <meta name="description" content="${pageName} page">
</head>
<body>
  <div id="root">${pageHtml}</div>

  <script type="module">
    import React from '/node_modules/react/index.js';
    import ReactDOM from '/node_modules/react-dom/client.js';
    import Page from '/src/pages/${file}';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.hydrate(React.createElement(Page));
  </script>
</body>
</html>`;

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

console.log("\n✨ All pages generated successfully!");
