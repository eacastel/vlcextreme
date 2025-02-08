const fs = require("fs");
const path = require("path");

// Define paths
const buildsFilePath = path.join(__dirname, "src", "data", "builds.json");
const placeholderImagePath = path.join(__dirname, "src", "images", "builds", "imagen-no-disponible.png");
const outputDir = path.join(__dirname, "src", "images", "builds");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Check if the builds JSON exists
if (!fs.existsSync(buildsFilePath)) {
    console.error(`❌ Error: JSON file not found at ${buildsFilePath}`);
    process.exit(1);
}

// Check if placeholder image exists
if (!fs.existsSync(placeholderImagePath)) {
    console.error(`❌ Error: Placeholder image not found at ${placeholderImagePath}`);
    process.exit(1);
}

// Read and parse the builds.json file
const buildsData = JSON.parse(fs.readFileSync(buildsFilePath, "utf8"));

// Function to generate image filenames
const formatImageKey = (name, index) => {
    return name.toLowerCase().replace(/\s+/g, "-") + `-${index}.png`;
};

// Loop through builds and create placeholder images
Object.keys(buildsData.builds).forEach((key) => {
    const build = buildsData.builds[key];

    // Define two placeholder image names
    const image1 = formatImageKey(build.name, 1);
    const image2 = formatImageKey(build.name, 2);

    // Paths where placeholders will be saved
    const imagePath1 = path.join(outputDir, image1);
    const imagePath2 = path.join(outputDir, image2);

    // Copy the placeholder image with new names
    fs.copyFileSync(placeholderImagePath, imagePath1);
    fs.copyFileSync(placeholderImagePath, imagePath2);

    console.log(`✅ Placeholder images created: ${image1}, ${image2}`);
});

console.log("🚀 Placeholder images generated successfully!");
