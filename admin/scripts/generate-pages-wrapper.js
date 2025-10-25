// generate-pages-wrapper.js
import dotenv from "dotenv";
dotenv.config();

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
const BLOG_DIR = path.join(DIST_DIR, "blog");

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
    <link rel="apple-touch-icon" href="/favicon-32x32.png" />
    ${ogMeta.join("\n")}
    ${twitterMeta.join("\n")}
    ${schemaJson}
  `;
}


// Wrap the whole prerender in an async IIFE
async function generateStaticPages(cssLinks, jsScripts) {
  try {
    // Route mapping
    const routeMap = {
      Home: 'index.html',
      About: 'about.html',
      Courses: 'courses.html',
      Services: 'services.html',
      Price: 'pricing.html',
      GetStarted: 'get-started.html',
      Blog: 'blog.html',
      BlogDetail: 'blogdetail.html',
      Partners: 'partners.html',
      Contact: 'contact.html',
      PrivacyPolicy: 'privacy-policy.html',
      TermsConditions: 'terms-conditions.html',
      ShippingPolicy: 'shipping-policy.html',
      RefundPolicy: 'refund-policy.html',
      SearchResults: 'search.html',
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

            const outputFile = path.join(DIST_DIR, routeMap[pageName] || `${pageName.toLowerCase()}.html`);
            const htmlContent = ReactDOMServer.renderToString(React.createElement(Page));

            let fullHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="manifest" href="${process.env.REACT_APP_URL}/manifest.json" />
      <meta name="theme-color" content="#fd7311" />
      <meta name="msapplication-config" content="/browserconfig.xml">
      <meta name="msapplication-TileColor" content="#fd7311">
      <meta name="msapplication-starturl" content="/" />
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
        // fsExtra.removeSync(TEMP_DIR);
        // console.log("🧹 Cleaned up temporary .temp directory");
      }
    });

  } catch (err) {
    console.error("❌ Prerender process failed:", err);
  } finally {
    // fsExtra.removeSync(TEMP_DIR);
    // console.log("🧹 Cleaned up temporary .temp directory");
  }
}

/**** Blog Slug Pages Generation ****/
const formatDate = (date) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return {
    readable: d.toLocaleDateString("en-US", options), // Jan 1, 2022
    ymd: d.toISOString().split("T")[0]                // 2022-01-01
  };
};

const blog1 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-1.jpg`;
const blog2 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-2.jpg`;
const blog3 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-3.jpg`;
const blog4 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-4.jpg`;
const blog5 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-5.jpg`;
const blog6 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-6.jpg`;
const blogAuth1 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-2.jpg`;
const blogAuth2 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-2.jpg`;
const blogAuth3 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-3.jpg`;
const blogAuth4 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-4.jpg`;
const blogAuth5 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-5.jpg`;
const blogAuth6 = `${process.env.REACT_APP_URL}/assets/img/blog/blog-author-6.jpg`;

let currentIndex = 0;
function getSequentialImage(images) {
  if (!images || images.length === 0) return null;
  const image = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;
  return image;
}

let currentAIndex = 0;
function getSequentialAImage(images) {
  if (!images || images.length === 0) return null;
  const image = images[currentAIndex];
  currentAIndex = (currentAIndex + 1) % images.length;
  return image;
}

const blogImages = [
  blog1,
  blog2,
  blog3,
  blog4,
  blog5,
  blog6,
];

const authorImages = [
  blogAuth1,
  blogAuth2,
  blogAuth3,
  blogAuth4,
  blogAuth5,
  blogAuth6,
];

// Wrap the whole prerender in an async IIFE
export async function generateBlogPages(cssLinks, jsScripts) {
  try {
    // 2️⃣ Fetch all blogs
    const blogRes = await fetch(`${process.env.REACT_APP_API_URL}/blog/fetchall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc"
      },
      body: JSON.stringify({ user_id: "68d27fa20a1b391f84d652ba" }),
    });

    const blogData = await blogRes.json();
    if (!blogData?.data || !Array.isArray(blogData.data)) {
      console.error("❌ Invalid blog API response");
      return;
    }

    const blogs = blogData.data;

    // 4️⃣ Import the BlogDetail.jsx page once
    const blogPageModule = await importJSX("BlogDetail");
    const BlogPage = blogPageModule?.default || blogPageModule;
    if (!BlogPage) throw new Error("BlogDetail.jsx not found or invalid");

    // 5️⃣ Generate HTML for each blog
    for (const blog of blogs) {
      const slug = blog.slug.replace(/[^a-zA-Z0-9-_]/g, "");
      const outputFile = path.join(BLOG_DIR, `${slug}.html`);

      await fsExtra.ensureDir(path.dirname(outputFile));

      const blogSeo = {
        title: blog?.seo?.metaTitle || blog?.title,
        description: blog.seo.metaDescription?.slice(0, 150) || blog?.summary || "",
        canonical: blog?.seo?.canonical || `${process.env.REACT_APP_URL}/blog/${blog.slug}`,
        keywords: Array.isArray(blog?.seo?.keywords) ? blog.seo.keywords.join(", ") : blog?.seo?.keywords,
      };
      const seoHtml = await generateSEO(blogSeo);

      // Create HTML
      let htmlContent = ReactDOMServer.renderToString(
        React.createElement(BlogPage, { blog })
      );

      let blog_tag_html = '';
      if (blog.tags != "" && Array.isArray(blog.tags)) {
        blog_tag_html += '<i className="bi bi-tags"></i>';
        blog_tag_html += '<ul className="tags">'
        blog.tags.forEach((tag) => {
          blog_tag_html += `<li><a href="#">${tag}</a></li>`;
        });          
        blog_tag_html += '</ul>';
      }
      htmlContent = htmlContent
        .replace(/BLOG_TITLE/g, blog.title)
        .replace(/BLOG_SUMARRY/g, blog.summary)
        .replace(/BLOG_HERO_IMG/g, getSequentialImage())
        .replace(/BLOG_CONTENT/g, blog.contentExcerpt)
        .replace(/BLOG_CATEGORY/g, blog.category)
        .replace(/BLOG_TAGS/g, blog_tag_html)
        .replace(/BLOG_AUTH_NAME/g, blog.author.name)
        .replace(/BLOG_AUTH_IMG/g, getSequentialAImage())
        .replace(/BLOG_AUTH_BIO/g, blog.author.bio)
        .replace(/BLOG_PUBLISH_DATE/g, formatDate(blog.publishDate).readable)
        .replace(/BLOG_PUBLISH_DATE_YMD/g, formatDate(blog.publishDate).ymd);

      let fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="manifest" href="${process.env.REACT_APP_URL}/manifest.json" />
          <meta name="theme-color" content="#fd7311" />
          <meta name="msapplication-config" content="/browserconfig.xml">
          <meta name="msapplication-TileColor" content="#fd7311">
          <meta name="msapplication-starturl" content="/" />
          ${seoHtml}
          ${cssLinks.join("\n")}
        </head>
        <body>
          <div id="root">${htmlContent}</div>
          ${jsScripts.join("\n")}
        </body>
        </html>
      `;

      fullHtml = await minify(fullHtml, {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      });

      await fs.writeFileSync(outputFile, fullHtml, "utf8");
      await gzipFile(outputFile, outputFile + ".gz");

      console.log(`✅ Blog page prerendered: ${outputFile}`);
    }

    console.log("✨ All blog pages prerendered successfully!");
  } catch (err) {
    console.error("❌ Error generating blog pages:", err);
  }  finally {
    fsExtra.removeSync(path.join(DIST_DIR,'blogdetail.html'));
    fsExtra.removeSync(path.join(DIST_DIR,'blogdetail.html.gz'));
    fsExtra.removeSync(TEMP_DIR);
    console.log("🧹 Cleaned up temporary .temp directory");
  }
}



async function main() {
    console.log("⚙️ Starting prerender process...");

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
    jsScripts.push(`<script src="https://checkout.razorpay.com/v1/checkout.js" defer></script>`);
    console.log(`🧩 Detected ${cssFiles.length} CSS and ${jsFiles.length} JS assets from build/static`);

    // Copy src to TEMP_DIR
    await fsExtra.copySync(SRC_DIR, TEMP_DIR, { overwrite: true });
    console.log("📂 Copied src → .temp");

    // 1️⃣ Transpile all JSX → MJS
    await transpileAllJSX(TEMP_DIR);
    console.log("⚡ Transpiled all JSX → MJS in .temp");

    await generateStaticPages(cssLinks, jsScripts);
    await generateBlogPages(cssLinks, jsScripts); // <— add this line

    console.log("🎉 Prerender complete!");
}

main();