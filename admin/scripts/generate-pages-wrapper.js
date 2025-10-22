// generate-pages-wrapper.js
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import esbuild from "esbuild";
import { fileURLToPath, pathToFileURL } from "url";
import fsExtra from "fs-extra";
import { minify } from "html-minifier-terser";
import zlib from "zlib";
import crypto from "crypto";
import seoConfig from "../lib/seoConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const PAGES_DIR = path.join(SRC_DIR, "pages");
const BUILD_DIR = path.join(ROOT, "build");
const DIST_DIR = path.join(ROOT, "dist");
const PUBLIC_DIR = path.join(ROOT, "public");
const ASSETS_SRC = path.join(SRC_DIR, "assets");
const ASSETS_DEST = path.join(DIST_DIR, "assets");
const TEMP_DIR = path.join(ROOT, ".temp");

// Auto-detect CSS & JS bundles
function getAllFilesRecursively(dir, extFilter = null) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // ensure extFilter is always an array
  const filters = !extFilter
    ? null
    : Array.isArray(extFilter)
    ? extFilter
    : [extFilter];

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getAllFilesRecursively(fullPath, filters);
    if (!filters) return [fullPath];
    return filters.some((ext) => fullPath.endsWith(ext)) ? [fullPath] : [];
  });
}

// Generate hash of file contents
function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("md5");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex").slice(0, 8); // 8 chars
}

async function gzipFile(inputPath, outputPath) {
  const fileContents = fs.readFileSync(inputPath);
  const gzipped = zlib.gzipSync(fileContents, { level: zlib.constants.Z_BEST_COMPRESSION });
  fs.writeFileSync(outputPath, gzipped);
}

function copyAndGzipFiles(files, buildSubDir) {
  return files.map((filePath) => {
    const relativePath = path.relative(path.join(BUILD_DIR, buildSubDir), filePath);
    
    const ext = path.extname(relativePath);
    const baseName = path.basename(relativePath, ext);
    const hash = getFileHash(filePath);
    const hashedFileName = `${baseName}.${hash}${ext}`;
    const destPath = path.join(DIST_DIR, buildSubDir, hashedFileName);
    // const destPath = path.join(DIST_DIR, buildSubDir, relativePath);

    // Ensure destination folder exists
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    // Copy original file
    fs.copyFileSync(filePath, destPath);

    // Create gzipped version
    gzipFile(filePath, destPath + ".gz");

    console.log(`✅ Copied & gzipped: ${destPath}`);
    return destPath; // Return the destination path for link/script generation
  });
}

function copyStaticAssets(files, subDir) {
  files.forEach((filePath) => {
    const relativePath = path.relative(path.join(BUILD_DIR, subDir), filePath);
    const destPath = path.join(DIST_DIR, subDir, relativePath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(filePath, destPath);
    gzipFile(destPath, destPath + ".gz");
    console.log(`📦 Copied static asset: ${destPath}`);
  });
}

// Recursively transpile all .jsx → .mjs in TEMP_DIR
async function transpileAllJSX(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await transpileAllJSX(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".jsx")) {
      let code = fs.readFileSync(fullPath, "utf8");

      // Rewrite relative imports of local JSX files to .mjs
      code = code.replace(
        /from\s+["'](\..*?)\.?jsx?["']/g,
        (match, p1) => `from "${p1}.mjs"`
      );

      // Ignore imports from 'swiper/css' or any css-like module
      code = code.replace(/import\s+['"].*\/css.*['"];?/g, '');

      // Ignore CSS & replace image imports with string paths
      code = code.replace(/import\s+(\w+)\s+from\s+["'](.*\.(png|jpg|jpeg|svg|gif))["'];?/g,
                         (match, varName, filePath) => `const ${varName} = "${filePath}";`);

      // Remove all CSS imports, local or node_modules
      code = code.replace(/import\s+['"].*\.css['"];?/g, '');

      /*import { transform } from "@swc/core";

      const { code: transpiled } = await transform(code, {
        filename: fullPath,
        jsc: {
          parser: { syntax: "ecmascript", jsx: true },
          transform: { react: { runtime: "automatic" } },
          target: "es2017"
        },
        module: { type: "es6" },
        minify: true
      });

      const mjsFile = fullPath.replace(/\.jsx$/, ".mjs");
      fs.writeFileSync(mjsFile, transpiled, "utf8");*/

      const result = await esbuild.transform(code, {
        loader: "jsx",
        format: "esm",     // or "cjs" if you need CommonJS
        minify: true,
        sourcemap: false,
        jsx: "automatic"   // React 17+ JSX transform
      });

      const mjsFile = fullPath.replace(/\.jsx$/, ".mjs");
      await fs.writeFileSync(mjsFile, result.code, "utf8");
      // Optionally delete original .jsx to avoid confusion
      // fs.unlinkSync(fullPath);
    }
  }
}

// Import page module from .mjs
async function importJSX(pageName) {
  const tempFile = path.join(TEMP_DIR, "pages", `${pageName}.mjs`);
  if (!fs.existsSync(tempFile)) throw new Error(`Temp module not found: ${tempFile}`);
  return await import(pathToFileURL(tempFile).href);
}

async function generateSEO(seoData = {}) {
  const { title, description, canonical, keywords, og = {}, twitter = {}, schema = {} } = seoData;

  const ogMeta = Object.entries(og || {}).map(
    ([property, content]) => `<meta property="${property}" content="${content}" />`
  );

  const twitterMeta = Object.entries(twitter || {}).map(
    ([name, content]) => `<meta name="${name}" content="${content}" />`
  );

  const schemaJson =
    schema && Object.keys(schema).length
      ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
      : "";

  return `
    <title>${title || ""}</title>
    ${description ? `<meta name="description" content="${description}" />` : ""}
    ${keywords ? `<meta name="keywords" content="${keywords}" />` : ""}
    ${canonical ? `<link rel="canonical" href="${canonical}" />` : ""}
    ${ogMeta.join("\n")}
    ${twitterMeta.join("\n")}
    ${schemaJson}
  `;
}


// Wrap the whole prerender in an async IIFE
(async () => {
  try {
    // Ensure directories exist
    await fsExtra.ensureDirSync(DIST_DIR);
    await fsExtra.ensureDirSync(ASSETS_DEST);
    await fsExtra.ensureDirSync(TEMP_DIR);

    // Copy public and assets
    if (fs.existsSync(PUBLIC_DIR)) {
      await fsExtra.copySync(PUBLIC_DIR, DIST_DIR, { overwrite: true });
      console.log("📦 Copied public → dist");
    }
    if (fs.existsSync(ASSETS_SRC)) {
      await fsExtra.copySync(ASSETS_SRC, ASSETS_DEST, { overwrite: true });
      console.log("📦 Copied src/assets → dist/assets");
    }

    // Detect CSS and JS files
    const cssFiles = getAllFilesRecursively(path.join(BUILD_DIR, "static/css"), ".css");
    const jsFiles = getAllFilesRecursively(path.join(BUILD_DIR, "static/js"), ".js");

    // Copy & gzip, get new paths in DIST_DIR
    const distCssFiles = copyAndGzipFiles(cssFiles, "static/css");
    const distJsFiles = copyAndGzipFiles(jsFiles, "static/js");

    // ────────────────────────────────
    // Step X: Copy static media (images, videos, fonts)
    // ────────────────────────────────
    const mediaFiles = getAllFilesRecursively(path.join(BUILD_DIR, "static/media"));
    copyStaticAssets(mediaFiles, "static/media");

    // Generate updated HTML links and scripts
    const cssLinks = distCssFiles.map((f) => {
      const rel = path.relative(DIST_DIR, f).replace(/\\/g, "/");
      return `<link rel="preload" as="style" href="${rel}">\n<link rel="stylesheet" href="${rel}">`;
    });

    const jsScripts = distJsFiles.map((f) => {
      const rel = path.relative(DIST_DIR, f).replace(/\\/g, "/");
      return `<script src="${rel}" defer></script>`;
    });

    console.log(`🧩 Detected ${cssFiles.length} CSS and ${jsFiles.length} JS assets from build/static`);

    // Copy src to TEMP_DIR
    await fsExtra.copySync(SRC_DIR, TEMP_DIR, { overwrite: true });
    console.log("📂 Copied src → .temp");

    // 1️⃣ Transpile all JSX → MJS
    await transpileAllJSX(TEMP_DIR);
    console.log("⚡ Transpiled all JSX → MJS in .temp");

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

    await new Promise(async (resolve, reject) => {
      try {
        var countr = 0;        

        // 2️⃣ Generate all pages
        const pageFiles = await fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.jsx'));

        var total_files = pageFiles.length;

        for (const file of pageFiles) {
          const pageName = path.basename(file, ".jsx");
          try {

            const pageModule = await importJSX(pageName);
            let Page = pageModule?.default || pageModule;

            if (!Page || (typeof Page !== "function" && typeof Page !== "object")) {
              throw new Error(`Invalid React component in ${file}`);
            }

            const pageSeo = seoConfig[pageName];
            // console.log("seo config ", pageSeo);
            const pageSeoHtml = await generateSEO(pageSeo);

            if (["Price"].includes(pageName)) {
              jsScripts.push(`<script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>`);
            }

            const outputFile = path.join(DIST_DIR, routeMap[pageName] || `${pageName.toLowerCase()}.html`);
            const htmlContent = ReactDOMServer.renderToString(React.createElement(Page));

            let fullHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${pageSeoHtml}
      ${cssLinks.join("\n")}
      </head>
      <body>
      <div id="root">${htmlContent}</div>
      ${jsScripts.join("\n")}
      </body>
      </html>`;

            fullHtml = await minify(fullHtml, {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeEmptyAttributes: true,
              minifyCSS: true,
              minifyJS: true,
            });

            await fs.writeFileSync(outputFile, fullHtml, "utf8");
            console.log("✅ Generated HTML:", outputFile);

            await gzipFile(outputFile, outputFile + ".gz");
            console.log("✅ Gzipped:", outputFile + ".gz");

            countr++;

          } catch (err) {
            console.error(`❌ Failed to render ${file}:`, err);
          }
        }

        if (countr == total_files) {
          console.log("\n✨ All pages prerendered successfully with CSS & JS bundles injected!");
          resolve(true);
        }
        reject(false);

      } catch (err) {
        console.log(`Error in rendering: ${err}`);
        reject(false);
      }

    }).then((pageResult) => {
      // console.log("removeSync ", pageResult)
      if(pageResult) {
        var countr = 0;
        // Cleanup TEMP_DIR after all pages done
        fsExtra.removeSync(TEMP_DIR);
        console.log("🧹 Cleaned up temporary .temp directory");
      }
    });

  } catch (err) {
    console.error("❌ Prerender process failed:", err);
  }

})();