/**
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

exports.createPages = async ({ graphql, actions }) => {
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

  // Create blog post pages
  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
          category {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  result.data.allContentfulBlogPost.nodes.forEach(post => {
  createPage({
    path: `/blog/${post.category.slug}/${post.slug}`,
    component: path.resolve("./src/templates/BlogPost.js"),
    context: {
      slug: post.slug,
      categorySlug: post.category.slug,
    },
  });
});
};

exports.onPostBuild = async ({ graphql }) => {
  console.log("Running post-build tasks...");

  // Run Google Merchant Feed script
  try {
    const scriptPath = path.join(__dirname, "generate-google-merchant-feed.js");
    execSync(`node ${scriptPath}`, { stdio: "inherit" });
    console.log("✅ Google Merchant Feed generated automatically.");
  } catch (err) {
    console.error("❌ Failed to generate Google Merchant Feed:", err);
  }

  // Sitemap generation
  const outputPath = path.join(__dirname, "public");
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          slug
          category {
            slug
          }
        }
      }
    }
  `);

  const sitemapPath = path.join(outputPath, "sitemap.xml");

  let urls = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n`;

  // Hardcoded static pages and product URLs with manual priority settings
  const staticUrls = [
    { path: "/", priority: "1.0" },
    { path: "/ordenadores-gaming/", priority: "0.9" },
    { path: "/ordenadores-creadores-streamers/", priority: "0.9" },
    { path: "/ordenadores-ia/", priority: "0.9" },
    { path: "/configuraciones/", priority: "0.8" },
    { path: "/contact/", priority: "0.7" },
    { path: "/about/", priority: "0.7" },
    { path: "/ordenadores-gaming/godmode-gamer/", priority: "0.8" },
    { path: "/ordenadores-gaming/casual-cruiser/", priority: "0.8" },
    { path: "/ordenadores-gaming/esports-edge/", priority: "0.8" },
    { path: "/ordenadores-gaming/aaa-avenger/", priority: "0.8" },
    { path: "/ordenadores-gaming/titan-dominator-(i9)/", priority: "0.8" },
    { path: "/ordenadores-gaming/titan-fury-(amd)/", priority: "0.8" },
    { path: "/ordenadores-gaming/virtual-voyager-(vr)/", priority: "0.8" },
    { path: "/ordenadores-gaming/powerstack/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/cineforge/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/workstation-i/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/studio-forge/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/cinestorm/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/vertex-forge/", priority: "0.8" },
    { path: "/ordenadores-creadores-streamers/resonance/", priority: "0.8" },
    { path: "/ordenadores-inteligencia-artificial/omnibrain/", priority: "0.8" },
    { path: "/ordenadores-inteligencia-artificial/neural-nexus/", priority: "0.8" },
    { path: "/ordenadores-inteligencia-artificial/tensorforge/", priority: "0.8" },
  ];

  staticUrls.forEach(entry => {
    urls += `  <url><loc>https://vlcextreme.com${entry.path}</loc><changefreq>weekly</changefreq><priority>${entry.priority}</priority></url>\n`;
  });

  result.data.allContentfulBlogPost.nodes.forEach(post => {
    urls += `  <url><loc>https://vlcextreme.com/blog/${post.category.slug}/${post.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
  });

  urls += "</urlset>";

  fs.writeFileSync(sitemapPath, urls);
  console.log("✅ Sitemap with blog posts and static/manual pages generated successfully.");
};
