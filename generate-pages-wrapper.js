// generate-pages-wrapper.js
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import 'ignore-styles'; // ✅ Ignore CSS/SCSS import
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { fileURLToPath, pathToFileURL } from 'url';

// Register Babel to handle .jsx files
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')]
});

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src/pages');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const ASSETS_SRC = path.join(ROOT_DIR, 'src/assets');
const ASSETS_DEST = path.join(DIST_DIR, 'assets');

if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_DEST)) fs.mkdirSync(ASSETS_DEST, { recursive: true });

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

// Generate HTML pages
const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(SRC_DIR, file);
  const pageModule = require(filePath); // Babel will transpile .jsx automatically
  
  // Normalize the default export to a React component
  let Page = pageModule?.default || pageModule;
  if (typeof Page !== 'function' && typeof Page !== 'object') {
    throw new Error(`Invalid React component in ${file}`);
  }

  // If React is undefined in SSR (CRA auto JSX runtime), wrap with React
  if (!Page.prototype && typeof Page === 'function') {
    const originalPage = Page;
    Page = function SSRPage(props) {
      return React.createElement(originalPage, props);
    };
  }

  const pageName = path.basename(file, '.jsx');
  const outputFile = path.join(DIST_DIR, routeMap[pageName] || `${pageName.toLowerCase()}.html`);

  const htmlContent = ReactDOMServer.renderToString(React.createElement(Page));

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageName} — Apply4Study</title>
  <meta name="description" content="${pageName} page" />
</head>
<body>
  <div id="root">${htmlContent}</div>
  <script type="module">
    import React from '/node_modules/react/index.js';
    import ReactDOM from '/node_modules/react-dom/client.js';
    import Page from './src/pages/${file}';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.hydrate(React.createElement(Page));
  </script>
</body>
</html>`;

  fs.writeFileSync(outputFile, fullHtml, 'utf8');
  console.log('✅ Generated HTML:', outputFile);
}

// Copy assets
glob(`${ASSETS_SRC}/**/*`, { nodir: true }, (err, files) => {
  if (err) throw err;
  for (const f of files) {
    const relPath = path.relative(ASSETS_SRC, f);
    const dest = path.join(ASSETS_DEST, relPath);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(f, dest);
  }
  console.log('✅ Copied all assets to dist/assets');
});

console.log('\n✨ All pages generated successfully!');
