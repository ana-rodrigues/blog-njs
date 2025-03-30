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
    const pngOutputTablet = path.join(outputDir, `${filename}-tablet.png`);
    const pngOutputMobile = path.join(outputDir, `${filename}-mobile.png`);
    
    // Create desktop version (1200px width)
    exec(`magick "${inputPath}" -resize "1600>" -strip -define png:compression-filter=1 -define png:compression-level=9 -define png:compression-strategy=1 -sharpen 0x0.7 "${pngOutput}"`, (error) => {
      if (error) console.error(`Error processing ${file} to desktop PNG:`, error);
      else console.log(`Successfully converted ${file} to desktop PNG (${pngOutput})`);
    });

    // Create tablet version (1000px width)
    exec(`magick "${inputPath}" -resize "1200>" -strip -define png:compression-filter=1 -define png:compression-level=9 -define png:compression-strategy=1 -sharpen 0x0.7 "${pngOutputTablet}"`, (error) => {
      if (error) console.error(`Error processing ${file} to tablet PNG:`, error);
      else console.log(`Successfully converted ${file} to tablet PNG (${pngOutputTablet})`);
    });

    // Create mobile version (800px width)
    exec(`magick "${inputPath}" -resize "800>" -strip -define png:compression-filter=1 -define png:compression-level=9 -define png:compression-strategy=1 -sharpen 0x0.7 "${pngOutputMobile}"`, (error) => {
      if (error) console.error(`Error processing ${file} to mobile PNG:`, error);
      else console.log(`Successfully converted ${file} to mobile PNG (${pngOutputMobile})`);
    });
  }
});