/**
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


// For sitemap
const fs = require("fs");

// For sitemap, build, and feed
const path = require("path");

// For google feed
const { execSync } = require("child_process");


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
    <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/godmode-gamer/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/casual-cruiser/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/esports-edge/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/aaa-avenger/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/titan-dominator-(i9)/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/titan-fury-(amd)/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/virtual-voyager-(vr)/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-gaming/powerstack/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/cineforge/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/workstation-i/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/studio-forge/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/cinestorm/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/vertex-forge/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-creadores-streamers/resonance/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-inteligencia-artificial/omnibrain/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-inteligencia-artificial/neural-nexus/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vlcextreme.com/ordenadores-inteligencia-artificial/tensorforge/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  // Write the `sitemap.xml` inside `public/` directory
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

    const slug = `/${categorySlug}/${product.name.toLowerCase().replace(/\s+/g, "-")}/`;

    createPage({
      path: slug,
      component: path.resolve("./src/templates/ProductPage.js"),
      context: {
        productName: product.name,
        description: product.description || "",
        shortDescription: product.short_description || "",
        longDescription: product.long_description || "",
        compatibleSoftware: Array.isArray(product.compatible_software) ? product.compatible_software : [],
        compatibleGames: Array.isArray(product.compatible_games) ? product.compatible_games : [],
        personalize: product.personalize || [],
        baseComponents: product.base_components || {},
        imageKeys: product.imageKeys || [],
        category: categorySlug,
        slug,
      },
    });
  });
};


// CREATE GOOGLE MERCHANT FEED



exports.onPostBuild = async () => {
  console.log("Running post-build tasks...");

  // Run the feed generation script automatically
  try {
    const scriptPath = path.join(__dirname, "generate-google-merchant-feed.js");
    execSync(`node ${scriptPath}`, { stdio: "inherit" });
    console.log("✅ Google Merchant Feed generated automatically.");
  } catch (err) {
    console.error("❌ Failed to generate Google Merchant Feed:", err);
  }
};
