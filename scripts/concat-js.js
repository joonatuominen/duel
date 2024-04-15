const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../frontend/build/static/js");
const destFile = path.resolve(__dirname, "../frontend/build/static/js/main.js");

fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const content = files
    .filter((file) => file.endsWith(".js"))
    .map((file) => fs.readFileSync(path.join(srcDir, file), "utf8"))
    .join("\n");

  fs.writeFileSync(destFile, content, "utf8");

  console.log("JavaScript files concatenated successfully.");
});
