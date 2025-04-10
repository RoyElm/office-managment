// GitHub Pages deployment preparation script
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Clean up API routes from the build output
console.log('Preparing build for GitHub Pages deployment...');

// Remove API routes directory if it exists
const apiRoutesPath = path.join(__dirname, 'out', 'api');
if (fs.existsSync(apiRoutesPath)) {
  console.log('Removing API routes from static build...');
  rimraf.sync(apiRoutesPath);
}

console.log('GitHub Pages preparation complete!'); 