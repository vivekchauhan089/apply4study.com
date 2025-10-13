import fs from "fs";
import path from "path";
import * as replace from "replace-in-file";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssDir = path.join(__dirname, "build", "static", "css");
const jsDir = path.join(__dirname, "build", "static", "js");

const mainCss = fs.readdirSync(cssDir).find(f => f.startsWith("main") && f.endsWith(".css"));
const mainJs = fs.readdirSync(jsDir).find(f => f.startsWith("main") && f.endsWith(".js"));

if (mainCss || mainJs) {
  const indexFile = path.join(__dirname, "build", "index.html");
  let preloadTags = "";
  if (mainCss) preloadTags += `  <link rel="preload" as="style" href="/static/css/${mainCss}" />\n`;
  if (mainJs) preloadTags += `  <link rel="preload" as="script" href="/static/js/${mainJs}" />\n`;

  replace.replaceInFileSync({
    files: indexFile,
    from: "</head>",
    to: `${preloadTags}</head>`,
  });

  console.log(`✅ Added preload for: ${mainCss || ""} ${mainJs || ""}`);
} else {
  console.warn("⚠️ No main assets found in build folder.");
}
