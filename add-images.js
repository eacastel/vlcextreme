const fs = require("fs");
const path = require("path");

// 🔹 Define the path to the JSON file
const filePath = path.join(__dirname, "src", "data", "builds.json");

// 🔹 Read and parse the existing JSON file
const buildsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

// 🔹 Function to generate image filenames dynamically
const formatImageKey = (name, index) => {
  return name.toLowerCase().replace(/\s+/g, "-") + `-${index}.webp`;
};

// 🔹 Iterate over each build and add imageKeys dynamically
Object.keys(buildsData.builds).forEach((key) => {
  const build = buildsData.builds[key];

  // ✅ Add image keys (change number range if needed)
  build.imageKeys = [formatImageKey(build.name, 1), formatImageKey(build.name, 2)];

  console.log(`✅ Added imageKeys for ${build.name}:`, build.imageKeys);
});

// 🔹 Save the updated JSON back to the file
fs.writeFileSync(filePath, JSON.stringify(buildsData, null, 2), "utf8");

console.log("🚀 JSON file updated successfully!");
