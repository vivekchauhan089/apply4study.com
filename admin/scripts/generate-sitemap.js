// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const PUBLIC_DIR = path.join(process.cwd(), '../build');
const DOMAIN = process.env.SITE_URL || 'https://apply4study.com';

// Helper: convert page path to URL, skip special Next.js files, API routes and dynamic routes
function pagePathToUrl(pagePath) {
  // pagePath: pages/about.js  -> /about
  // pages/index.js -> /
  let route = pagePath
    .replace(/^pages/, '')
    .replace(/\.js$/, '')
    .replace(/\/index$/, '/')
    .replace(/\\/g, '/');
  // Remove leading slash from "pages" -> ensure it starts with /
  if (!route.startsWith('/')) route = '/' + route;
  return route;
}

(async function generate() {
  // 1) find static pages in pages/ (non-dynamic, non-api)
  const pages = glob.sync('pages/**/*.js', { nodir: true })
    .filter(p => !/\/api\//.test(p))
    .filter(p => !/\[.*\]/.test(p)) // filter out dynamic routes (they're handled below)
    .filter(p => !/\/_app\.js|\/_document\.js|\/_error\.js/.test(p));

  // 2) optionally include dynamic routes from a data source (example: data/paths.json)
  // Expects an array like: ['/blog/my-post','/courses/react-101']
  let dynamicRoutes = [];
  const dynamicDataPath = path.join(process.cwd(), 'data', 'paths.json');
  if (fs.existsSync(dynamicDataPath)) {
    try {
      dynamicRoutes = JSON.parse(fs.readFileSync(dynamicDataPath, 'utf8'));
      if (!Array.isArray(dynamicRoutes)) dynamicRoutes = [];
    } catch (e) {
      console.warn('Failed to read data/paths.json — skipping dynamic routes', e);
    }
  }

  // 3) compose final list of URLs
  const urls = pages.map(pagePathToUrl)
    .concat(dynamicRoutes)
    .map(u => (u.endsWith('/') && u !== '/') ? u.slice(0, -1) : u); // optional: normalise trailing slash

  // 4) Build sitemap XML
  const now = new Date().toISOString();
  const sitemapEntries = urls.map(url => {
    const fullUrl = `${DOMAIN}${url === '/' ? '' : url}`;
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`✅ sitemap.xml created at /build/sitemap.xml — ${urls.length} urls`);
})();
