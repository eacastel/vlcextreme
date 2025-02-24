const fs = require("fs");
const path = require("path");

// Load product data
const builds = require("./src/data/builds.json").builds;

// Define the output path for the Google Merchant feed in the `static` folder
const feedPath = path.join(__dirname, "static", "google-merchant-feed.xml");

// Helper: Truncate description safely
function truncateDescription(description, maxLength = 5000) {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + "...";
}

// Helper: Calculate price from base components
function calculateTotalPrice(components) {
  if (!components || typeof components !== "object") return 0;

  return Object.values(components).reduce((total, component) => {
    if (component.price && !isNaN(component.price)) {
      return total + parseFloat(component.price);
    }
    return total;
  }, 0);
}

// Generate XML content
let feedContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>VLCExtreme Product Feed</title>
    <link>https://vlcextreme.com/</link>
    <description>Catálogo de productos de VLCExtreme</description>`;

// Generate each product entry
Object.entries(builds).forEach(([id, product]) => {
  let categorySlug = "otros";
  if (product.category === "gaming") categorySlug = "ordenadores-gaming";
  else if (product.category === "production") categorySlug = "ordenadores-creadores-streamers";
  else if (product.category === "ai") categorySlug = "ordenadores-inteligencia-artificial";

  const slug = `/ordenador/${categorySlug}/${product.name.toLowerCase().replace(/\s+/g, "-")}/`;

  // Use first image
  const imageUrl = product.imageKeys && product.imageKeys.length > 0
  ? `https://vlcextreme.com/images/products-png/${product.imageKeys[0]}`
  : `https://vlcextreme.com/images/default-product.png`;

  // Calculate price dynamically from components
  const totalPrice = calculateTotalPrice(product.base_components);
  if (!totalPrice || totalPrice <= 0) {
    console.warn(`⚠️ Skipping product "${product.name}" due to missing or invalid component prices.`);
    return; // Skip if price is missing or zero
  }

  // Use long description, truncated if necessary
  const description = product.long_description
    ? truncateDescription(product.long_description)
    : "Ordenador de alto rendimiento de VLCExtreme.";

  // Add product entry
  feedContent += `
    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${product.name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>https://vlcextreme.com${slug}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:brand>VLCExtreme</g:brand>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${totalPrice.toFixed(2)} EUR</g:price>
      <g:google_product_category>Electrónica > Computadoras > Computadoras de escritorio</g:google_product_category>
      <g:product_type>${categorySlug}</g:product_type>
    </item>`;
});

// Close XML tags
feedContent += `
  </channel>
</rss>`;

// Write the feed to a file
fs.writeFileSync(feedPath, feedContent);
console.log(`✅ Google Merchant Center feed generated at ${feedPath}`);
