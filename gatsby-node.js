/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require("fs");
const path = require("path");

exports.onPostBuild = async () => {
  const outputPath = path.join(__dirname, "public");

  // ✅ Ensure `public/` directory exists before writing the file
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const sitemapPath = path.join(outputPath, "sitemap.xml");

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
      <loc>https://vlcextreme.com/contact/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://vlcextreme.com/about/</loc>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
</urlset>`;

 // ✅ Write the `sitemap.xml` inside `public/` directory
 fs.writeFileSync(sitemapPath, sitemapContent);
 console.log("✅ Custom Sitemap Generated Successfully in `public/sitemap.xml`!");
};
