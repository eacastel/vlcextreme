const fs = require("fs");
const path = require("path");

const siteUrl = "https://vlcextreme.com";

// Define SEO-priority pages
const pages = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/ordenadores-para-gaming/", priority: 0.9, changefreq: "weekly" },
  { path: "/ordenadores-para-creadores-y-streamers/", priority: 0.9, changefreq: "weekly" },
  { path: "/ordenadores-ia/", priority: 0.9, changefreq: "weekly" },
  { path: "/configuraciones/", priority: 0.8, changefreq: "monthly" },
  { path: "/contact/", priority: 0.7, changefreq: "monthly" },
  { path: "/politica-de-garantia/", priority: 0.4, changefreq: "yearly" },
  { path: "/terminos-y-condiciones/", priority: 0.3, changefreq: "yearly" },
  { path: "/cookies/", priority: 0.3, changefreq: "yearly" },
  { path: "/sobre-nosotros/", priority: 0.7, changefreq: "monthly" }, // ✅ Add About Page
];

// Build XML structure
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${siteUrl}${page.path}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`).join("")}
</urlset>`;

// Ensure the directory exists
const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outputPath, sitemap);


