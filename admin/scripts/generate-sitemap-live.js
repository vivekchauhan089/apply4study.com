const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const START_URL = process.env.SITE_URL || 'https://apply4study.com';
const MAX_PAGES = 500;
const BUILD_DIR = path.join(process.cwd(), '../build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');

const visited = new Set();
const queue = [
  '/',
  '/about',
  '/courses',
  '/services',
  '/pricing',
  '/get-started',
  '/blog',
  '/partners',
  '/contact',
  '/privacy-policy',
  '/terms-conditions',
  '/shipping-policy',
  '/refund-policy',
];

// 🕷️ Crawl pages recursively
function crawl(next) {
  if (queue.length === 0 || visited.size >= MAX_PAGES) {
    return next();
  }

  var url = queue.shift();
  url = `${START_URL}${url === '/' ? '' : url}`;
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

// 🧩 Generate XML sitemap
function generateSitemap(urls) {
  const now = new Date().toISOString();
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
</urlset>`;
}

// 🌐 Ping search engines
function pingSearchEngines(sitemapUrl, done) {
  const engines = [
    { name: 'Google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
    { name: 'Bing', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
  ];

  console.log('\n🔔 Pinging search engines...');

  let remaining = engines.length;
  engines.forEach(engine => {
    setTimeout(() => {
      request(engine.url, (err, res) => {
        if (!err && res && res.statusCode === 200) {
          console.log(`✅ Successfully pinged ${engine.name}`);
        } else {
          console.warn(`⚠️ Failed to ping ${engine.name} (code: ${res && res.statusCode})`);
        }
        if (--remaining === 0) done();
      });
    }, 3000); // Wait 3s before sending to give sitemap time to upload
  });
}

// 🏁 Main
crawl(() => {
  console.log('\n🧾 Generating sitemap.xml...');
  const sitemapXml = generateSitemap(visited);

  if (!fs.existsSync(BUILD_DIR)) fs.mkdirSync(BUILD_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, sitemapXml, 'utf8');

  const sitemapLiveUrl = `${START_URL}/sitemap.xml`;
  console.log(`\n📦 Sitemap generated with ${visited.size} URLs`);
  console.log(`📍 Saved to: ${SITEMAP_PATH}`);
  console.log(`🌍 Sitemap URL: ${sitemapLiveUrl}`);
  console.log('\n🎉 Done! Sitemap is ready and search engines have been notified.');

  /*pingSearchEngines(sitemapLiveUrl, () => {
    console.log('\n🎉 Done! Sitemap is ready and search engines have been notified.');
  });*/
});
