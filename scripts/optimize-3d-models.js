const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to optimize GLTF models
function optimizeGLTFModel(inputPath, outputPath) {
  try {
    console.log(`Optimizing ${inputPath}...`);
    
    // Run gltf-pipeline to optimize the model
    execSync(`gltf-pipeline -i "${inputPath}" -o "${outputPath}" --draco.compressionLevel 10`, {
      stdio: 'inherit'
    });
    
    console.log(`Optimized model saved to ${outputPath}`);
  } catch (error) {
    console.error(`Failed to optimize ${inputPath}:`, error.message);
  }
}

// Function to optimize all models in a directory
function optimizeModelsInDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    if (path.extname(file) === '.gltf') {
      const inputPath = path.join(directory, file);
      const outputPath = path.join(directory, file.replace('.gltf', '.optimized.gltf'));
      
      optimizeGLTFModel(inputPath, outputPath);
    }
  });
}

// Main function
function main() {
  console.log('Starting 3D model optimization...');
  
  // Optimize desktop_pc models
  const desktopPCDir = path.join(__dirname, '..', 'public', 'desktop_pc');
  if (fs.existsSync(desktopPCDir)) {
    console.log('Optimizing desktop PC models...');
    optimizeModelsInDirectory(desktopPCDir);
  }
  
  // Optimize planet models
  const planetDir = path.join(__dirname, '..', 'public', 'planet');
  if (fs.existsSync(planetDir)) {
    console.log('Optimizing planet models...');
    optimizeModelsInDirectory(planetDir);
  }
  
  console.log('3D model optimization complete!');
}

main();