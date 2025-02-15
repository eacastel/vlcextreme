/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../../public/sitemap.xml");

// 🛑 Remove existing `sitemap.xml` directory if it exists
if (fs.existsSync(outputPath) && fs.lstatSync(outputPath).isDirectory()) {
  fs.rmdirSync(outputPath, { recursive: true });
  console.log("🗑️ Deleted existing sitemap.xml directory.");
}

// Define Sitemap Content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
    <url>
      <loc>https://vlcextreme.com/</loc>
      <changefreq>daily</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/ordenadores-para-gaming/</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/ordenadores-para-creadores-y-streamers/</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/ordenadores-ia/</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/configuraciones/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/about/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/contact/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/politica-de-garantia/</loc>
      <changefreq>yearly</changefreq>
      <priority>0.4</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/terminos-y-condiciones/</loc>
      <changefreq>yearly</changefreq>
      <priority>0.3</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/cookies/</loc>
      <changefreq>yearly</changefreq>
      <priority>0.3</priority>
    </url>
</urlset>`;

// ✅ Write the new `sitemap.xml` file
fs.writeFileSync(outputPath, sitemapContent);
console.log("✅ Custom Sitemap Generated Successfully!");
