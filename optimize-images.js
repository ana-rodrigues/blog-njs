const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure the output directory exists
const outputDir = path.join(__dirname, 'public', 'media');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all files from rawmedia directory
const rawMediaDir = path.join(__dirname, 'rawmedia');
if (!fs.existsSync(rawMediaDir)) {
  console.error('rawmedia directory does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(rawMediaDir);

// Process each file
files.forEach(file => {
  const inputPath = path.join(rawMediaDir, file);
  const stat = fs.statSync(inputPath);
  
  // Skip directories
  if (stat.isDirectory()) return;
  
  // Get file extension
  const ext = path.extname(file).toLowerCase();
  
  // Process only image files
  if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    const filename = path.basename(file, ext);
    
    const pngOutput = path.join(outputDir, `${filename}.png`);
    
    // Create a png version to test sharpness of UI elements
    exec(`magick "${inputPath}" -resize "1800>" -strip -define png:compression-filter=1 -define png:compression-level=9 -define png:compression-strategy=1 -sharpen 0x0.7 "${pngOutput}"`, (error) => {
      if (error) console.error(`Error processing ${file} to PNG:`, error);
      else console.log(`Successfully converted ${file} to PNG`);
    });
  }
});