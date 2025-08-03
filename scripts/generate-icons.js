const fs = require('fs');
const path = require('path');

// Create a simple SVG icon for Capital Firm
const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="64" fill="#6366f1"/>
  <rect x="64" y="64" width="384" height="384" rx="32" fill="white"/>
  <text x="256" y="280" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#6366f1">CF</text>
  <text x="256" y="380" font-family="Arial, sans-serif" font-size="40" font-weight="normal" text-anchor="middle" fill="#6366f1">Capital Firm</text>
</svg>
`;

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the SVG icon
fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);

console.log('✅ PWA icon created: public/icon.svg');
console.log('');
console.log('📱 To complete PWA setup, you need to:');
console.log('1. Convert icon.svg to PNG files:');
console.log('   - icon-192x192.png (192x192 pixels)');
console.log('   - icon-512x512.png (512x512 pixels)');
console.log('');
console.log('2. You can use online tools like:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('');
console.log('3. Or use command line tools like ImageMagick:');
console.log('   convert icon.svg -resize 192x192 icon-192x192.png');
console.log('   convert icon.svg -resize 512x512 icon-512x512.png'); 