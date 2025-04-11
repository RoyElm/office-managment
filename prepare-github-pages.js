// GitHub Pages deployment preparation script
const fs = require('fs');
const path = require('path');

// Prepare build for GitHub Pages deployment
console.log('Preparing build for GitHub Pages deployment...');

// Create .nojekyll file to prevent GitHub from ignoring files that begin with an underscore
const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');
console.log('Created .nojekyll file for GitHub Pages');

// Check if we need to add any special handling for GitHub Pages
// For example, you could add a custom 404 page or redirects here

console.log('GitHub Pages preparation complete!'); 