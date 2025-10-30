const dotenv = require("dotenv");
dotenv.config();

const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const START_URL = process.env.REACT_APP_URL || 'https://apply4study.com';
const MAX_PAGES = 500;
const BUILD_DIR = path.join(process.cwd(), 'build');
const SITEMAP_PATH1 = path.join(BUILD_DIR, 'sitemap.xml');

const DIST_DIR = path.join(process.cwd(), 'dist');
const SITEMAP_PATH2 = path.join(DIST_DIR, 'sitemap.xml');

const visited = new Set();
const queue = [
  '/',
  '/about',
  '/courses',
  '/services',
  '/pricing',
  '/get-started',
  '/partners',
  '/contact',
  '/privacy-policy',
  '/terms-conditions',
  '/shipping-policy',
  '/refund-policy',
  '/blog',
];

// 🕷️ Crawl pages recursively
function crawl(next) {
  if (queue.length === 0 || visited.size >= MAX_PAGES) {
    return next();
  }

  var url = queue.shift();
  
  // ✅ Avoid duplicating domain if already absolute
  if (!/^https?:\/\//i.test(url)) {
    url = `${START_URL.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  
  if (visited.has(url)) return crawl(next);
  visited.add(url);

  console.log(`🔍 Crawling: ${url}`);

  request(
    { url, timeout: 10000 },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.warn(`⚠️ Failed to fetch ${url}`);
        return crawl(next);
      }

      const $ = cheerio.load(body);
      const links = $('a[href]')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter(href => href && !href.startsWith('#'))
        .map(href => new URL(href, START_URL).href)
        .filter(href => href.startsWith(START_URL))
        .filter(href => !href.includes('logout') && !href.includes('javascript:'));

      for (const link of links) {
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }

      console.log(`✅ Found: ${visited.size} pages so far`);
      crawl(next);
    }
  );
}

const formatDate = (date) => {
  const d = new Date(date);

  const options = { year: "numeric", month: "short", day: "numeric" };

  return {
    readable: d.toLocaleDateString("en-US", options), // Jan 1, 2022
    ymd: d.toISOString().split("T")[0],               // 2022-01-01
    iso: d.toISOString()                              // 2025-10-25T11:21:32.487Z
  };
};

// 🧩 Generate XML sitemap
async function generateSitemap(urls) {
  const now = new Date().toISOString();

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

  // 2️⃣ Blog pages
  const blogEntriesArr = blogs.map((b) => ({
    loc: `${START_URL}/blog/${b.slug}`,
    lastmod: formatDate(b.updatedAt || b.publishDate || new Date()).iso,
    changefreq: "weekly",
    priority: "0.7",
  }));

  // blog entries
  const blogEntries = blogEntriesArr
    .map(
      (e) => `
  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  const xmlEntries = Array.from(urls)
    .map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === START_URL ? '1.0' : '0.7'}</priority>
  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
${blogEntries}
</urlset>`;
}

// 🏁 Main
crawl(async () => {
  console.log('\n🧾 Generating sitemap.xml...');
  const sitemapXml = await generateSitemap(visited);

  if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH1, sitemapXml, 'utf8');

  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH2, sitemapXml, 'utf8');

  const sitemapLiveUrl = `${START_URL}/sitemap.xml`;
  console.log(`\n📦 Sitemap generated with ${visited.size} URLs`);
  console.log(`📍 Saved to: ${SITEMAP_PATH1}`);
  console.log(`🌍 Sitemap URL: ${sitemapLiveUrl}`);
  console.log('\n🎉 Done! Sitemap is ready and search engines have been notified.');

});
