const fs = require("fs");
const path = require("path");
const builds = require("./src/data/builds.json").builds;

const imageDir = path.join(__dirname, "src/images/builds"); // ✅ Corrected image directory

if (!fs.existsSync(imageDir)) {
  console.error("❌ Error: Image directory does not exist:", imageDir);
  process.exit(1);
}

Object.entries(builds).forEach(([id, product]) => {
  const [firstImage, secondImage] = product.imageKeys || [];
  if (!firstImage) {
    console.warn(`⚠️ No images listed for ${product.name} in builds.json`);
    return;
  }

  const firstImagePath = path.join(imageDir, firstImage);
  const secondImagePath = secondImage ? path.join(imageDir, secondImage) : null;

  if (!fs.existsSync(firstImagePath)) {
    console.warn(`⚠️ Missing first image: ${firstImage} for ${product.name}`);
    return;
  }

  if (!secondImage || !fs.existsSync(secondImagePath)) {
    // Generate a placeholder filename if second image is missing
    const ext = path.extname(firstImage);
    const placeholderImage = firstImage.replace(ext, `-placeholder${ext}`);
    const placeholderPath = path.join(imageDir, placeholderImage);

    try {
      fs.copyFileSync(firstImagePath, placeholderPath);
      console.log(`✅ Created placeholder image for ${product.name}: ${placeholderImage}`);
      product.imageKeys[1] = placeholderImage; // Update JSON with new image filename
    } catch (error) {
      console.error(`❌ Error copying ${firstImage} to ${placeholderImage}:`, error);
    }
  }
});

// ✅ Update builds.json with the new placeholder image paths
fs.writeFileSync("./src/data/builds.json", JSON.stringify({ builds }, null, 2));
console.log("✅ Updated builds.json with missing image placeholders.");
