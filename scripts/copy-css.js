const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "../frontend/build/static/css");
//const flaskStaticDir = path.resolve(__dirname, "../static/css");

fs.readdir(buildDir, (err, files) => {
  if (err) {
    console.error("Error reading build directory:", err);
    return;
  }

  // Find the CSS file in the build directory
  const cssFile = files.find((file) => file.endsWith(".css"));

  if (!cssFile) {
    console.error("No CSS file found in build directory.");
    return;
  }

  // Copy the CSS file to the Flask static folder
  const src = path.join(buildDir, cssFile);
  const dest = path.join(buildDir, "styles.css");

  fs.copyFileSync(src, dest);
  console.log("CSS file copied successfully:", cssFile);
});
