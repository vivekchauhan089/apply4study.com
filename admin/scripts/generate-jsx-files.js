// scripts/generate-jsx-files.js
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');

const PAGES_DIR = path.join(process.cwd(), "../src/pages");
const ROUTES_FILE = path.join(process.cwd(), "../src/routes/LayoutRoutes.jsx");
const DOMAIN = process.env.SITE_URL || "http://localhost:3000";

const Menus = require("../models/Menus");
const Pages = require("../models/Pages");

// Connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/lms?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// 🔹 Helper: recursively get full menu slug path
async function getFullSlug(menu) {
  let slugs = [menu.slug];
  let parentId = menu.parent_id;

  while (parentId) {
    var parentMenu = await Menus.findById(parentId);
    if (!parentMenu) break;
    slugs.unshift(parentMenu.slug);
    parentId = parentMenu.parent_id;
  }

  return slugs.join("/");
}

// 🔧 Generate React JSX page files
(async function generate() {
  try {
    // 🔍 Join Menus to Pages using aggregation
    var pages = await Pages.aggregate([
      {
        $match: {
          status: { $in: ["draft", "published"] },
        },
      },
      {
        $lookup: {
          from: "menus", // ✅ must match actual Mongo collection name (lowercase)
          localField: "slug",
          foreignField: "slug",
          as: "menuData",
        },
      },
      {
        $match: { "menuData.0": { $exists: true } }, // ✅ only include if matching menu exists
      },
    ]);

    var importLines = "";
    var routeLines = "";
    console.log(`🔍 Aggregation result count: ${pages.length}`);
    if(pages.length) {
      for (const page of pages) {
        const menu = page.menuData && page.menuData[0];
        let fullSlug = page.slug;

        // If menu exists, use full slug path from hierarchy
        if (menu) {
          fullSlug = await getFullSlug(menu);
        }

        var slugParts = fullSlug.split("/").filter(Boolean);
        var lastPart = slugParts.pop();

        var componentName = lastPart.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");

        var folderPath = path.join(PAGES_DIR, ...slugParts);
        var filePath = path.join(folderPath, `${componentName}.jsx`);

        fs.mkdirSync(folderPath, { recursive: true });

        var dirSlash = '../';
        if (slugParts.length)
          slugParts.forEach((s)=> { dirSlash += '../'; });

        const jsxContent = `
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useSEO from "${dirSlash}hooks/useSEO.jsx";

export default function ${componentName}() {
  const APP_URL = process.env.REACT_APP_URL;

  useSEO({
    title: "${page.title}",
    canonical: \`\${APP_URL}/${fullSlug}\`,
  });

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="page">
      <div className="container" data-aos="fade-up">
        <h1>${page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: \`${page.content || ""}\` }} />
        ${page.blocks
          .map((block) => {
            if (block.type === "faq") {
              return `<div className="faq-section">
                ${block.content
                  .map(
                    (faq) =>
                      `<h4>${faq.question}</h4><p>${faq.answer}</p>`
                  )
                  .join("")}
              </div>`;
            }
            return "";
          })
          .join("\n")}
      </div>
    </div>
  );
}
`;

        var slugPath = path.join('../pages', ...slugParts, `${componentName}.jsx`);
        importLines += `import ${componentName} from '${slugPath.replace(/\\/g, "/")}';\n`;
        routeLines += `        <Route path='${page.slug}' element={<${componentName} />} />\n`;

        fs.writeFileSync(filePath, jsxContent, "utf8");
        console.log(`✅ Page generated: /${fullSlug}`);
      }
      console.log("🎉 All JSX pages generated successfully!");


      const layoutRoutesContent = `import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout.jsx';

// Pages
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Pricing from '../pages/Price.jsx';
import Services from '../pages/Services.jsx';
import Courses from '../pages/Courses.jsx';
import Blog from '../pages/Blog.jsx';
import BlogDetail from '../pages/BlogDetail.jsx';
import Partners from '../pages/Partners.jsx';
import SearchResults from '../pages/SearchResults.jsx';
import GetStarted from '../pages/GetStarted.jsx';
import Contact from '../pages/Contact.jsx';
import PrivacyPolicy from '../pages/PrivacyPolicy.jsx';
import TermsConditions from '../pages/TermsConditions.jsx';
import ShippingPolicy from '../pages/ShippingPolicy.jsx';
import RefundPolicy from '../pages/RefundPolicy.jsx';
${importLines}
// ✅ Styles (safe for prerender)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/global.css';

const LayoutRoutes = ({ skipRedirects }) => {
  // ✅ Load Bootstrap JS only on client-side
  useEffect(() => {
    if (typeof window !== "undefined" && !document?.body?.dataset?.prerendered) {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
        .then(() => {
          console.log('✅ Bootstrap JS loaded');
        })
        .catch((err) => console.error('⚠️ Bootstrap JS load failed:', err));
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='services' element={<Services />} />
        <Route path='blog' element={<Blog />} />
        <Route path='blog/:slug' element={<BlogDetail />} />
        <Route path='courses' element={<Courses />} />
        <Route path='partners' element={<Partners />} />
        <Route path='get-started' element={<GetStarted />} />
        <Route path='contact' element={<Contact />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='terms-conditions' element={<TermsConditions />} />
        <Route path='shipping-policy' element={<ShippingPolicy />} />
        <Route path='refund-policy' element={<RefundPolicy />} />
        <Route path='search' element={<SearchResults />} />
${routeLines}
        {/* SPA fallback */}
        {!skipRedirects && <Route path='*' element={<Home />} />}
      </Route>
    </Routes>
  );
};

export default LayoutRoutes;`;

      fs.writeFileSync(ROUTES_FILE, layoutRoutesContent, "utf8");
      console.log("✅ Updated LayoutRoutes.jsx with all generated pages!");

    } else {
      console.log("🔹No new Menu found to generate JSX pages!");
    }
  } catch (err) {
    console.error("❌ Error generating pages:", err);
  } finally {
    mongoose.connection.close();
  }
})();
