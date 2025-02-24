const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Directories
const sourceDir = path.join(__dirname, "src", "images", "builds");
const outputDir = path.join(__dirname, "static", "images", "products-png");

// ✅ Automatically create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📂 Created directory: ${outputDir}`);
}

// Load product data
const builds = require("./src/data/builds.json").builds;

// ✅ Resize and optimize only the first image for each product
Object.entries(builds).forEach(([id, product]) => {
  if (product.imageKeys && product.imageKeys.length > 0) {
    const firstImageKey = product.imageKeys[0];
    const inputFile = path.join(sourceDir, `${firstImageKey}`);

    // Ensure file exists
    if (fs.existsSync(inputFile)) {
      const outputFile = path.join(outputDir, `${firstImageKey.replace(path.extname(firstImageKey), ".png")}`);

      sharp(inputFile)
        .resize(800, 800, {
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy, // Focus on the most "interesting" part of the image
        })
        .png({ quality: 90, compressionLevel: 9 }) // Optimize PNG
        .toFile(outputFile)
        .then(() => {
          console.log(`✅ Processed: ${firstImageKey} → ${path.basename(outputFile)}`);
        })
        .catch((err) => {
          console.error(`❌ Error processing ${firstImageKey}:`, err);
        });
    } else {
      console.warn(`⚠️ Image not found: ${inputFile}`);
    }
  } else {
    console.warn(`⚠️ No images defined for product: ${product.name}`);
  }
});
