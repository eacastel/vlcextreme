const fs = require("fs");
const path = require("path");

// Load product data
const builds = require("./src/data/builds.json").builds;

// Define the output path for the sitemap
const sitemapPath = path.join(__dirname, "sitemap-snippet.xml");

// Start building the sitemap content
let sitemapContent = "";

// Loop through the builds and generate URLs
Object.entries(builds).forEach(([id, product]) => {
  let categorySlug = "otros";
  if (product.category === "gaming") categorySlug = "ordenadores-gaming";
  else if (product.category === "production") categorySlug = "ordenadores-creadores-streamers";
  else if (product.category === "ai") categorySlug = "ordenadores-inteligencia-artificial";

  const slug = `/ordenador/${categorySlug}/${product.name.toLowerCase().replace(/\s+/g, "-")}/`;

  sitemapContent += `
  <url>
    <loc>https://vlcextreme.com${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Save the generated snippet to a file
fs.writeFileSync(sitemapPath, sitemapContent);
console.log(`✅ Sitemap snippet saved to ${sitemapPath}`);
