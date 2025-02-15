/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "../../public");
const outputPath = path.join(outputDir, "sitemap.xml");

// 🛑 Ensure `public/` directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log("📁 Created missing `public/` directory.");
}

// 🛑 Remove existing `sitemap.xml` directory if it exists
if (fs.existsSync(outputPath) && fs.lstatSync(outputPath).isDirectory()) {
  fs.rmdirSync(outputPath, { recursive: true });
  console.log("🗑️ Deleted existing `sitemap.xml` directory.");
}

// Define Sitemap Content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vlcextreme.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-para-gaming/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/sobre-nosotros/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

// ✅ Write the new `sitemap.xml` file
fs.writeFileSync(outputPath, sitemapContent);
console.log("✅ Custom Sitemap Generated Successfully at `public/sitemap.xml`!");
