// scripts/generate-robots.js
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), '../build');

const DOMAIN = process.env.SITE_URL || 'https://apply4study.com';

const robots = `# robots.txt generated on ${new Date().toISOString()}
User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
Host: ${DOMAIN}
`;

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');
console.log('✅ robots.txt created at /build/robots.txt');
