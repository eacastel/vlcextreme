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


// CREATE PAGES

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const builds = require("./src/data/builds.json").builds;

  Object.entries(builds).forEach(([id, product]) => {
    let categorySlug = "otros";
    if (product.category === "gaming") categorySlug = "ordenadores-gaming";
    else if (product.category === "production") categorySlug = "ordenadores-creadores-streamers";
    else if (product.category === "ai") categorySlug = "ordenadores-inteligencia-artificial";

    const slug = `/ordenador/${categorySlug}/${product.name.toLowerCase().replace(/\s+/g, "-")}/`;

    createPage({
      path: slug,
      component: path.resolve("./src/templates/ProductPage.js"),
      context: {
        productName: product.name,
        description: product.description || "",
        shortDescription: product.short_description || "",
        compatibleSoftware: Array.isArray(product.compatible_software) ? product.compatible_software : [],
        compatibleGames: Array.isArray(product.compatible_games) ? product.compatible_games : [],
        optionalUpgrades: Array.isArray(product.optional_upgrades) ? product.optional_upgrades : [],
        baseComponents: product.base_components || {},
        imageKeys: product.imageKeys || [],
        category: categorySlug,
        slug,
        alternatives: Object.entries(product.base_components || {}).reduce((acc, [key, component]) => {
          if (Array.isArray(component.alternatives) && component.alternatives.length > 0) {
            acc[key] = component.alternatives;
          }
          return acc;
        }, {}),
        upgrades: Object.entries(product.base_components || {}).reduce((acc, [key, component]) => {
          if (Array.isArray(component.optional_upgrades) && component.optional_upgrades.length > 0) {
            acc[key] = component.optional_upgrades;
          }
          return acc;
        }, {}),
      },
    });
  });
};
