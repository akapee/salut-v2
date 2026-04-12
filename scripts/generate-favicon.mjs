import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const logoPath = path.join(root, 'public', 'salut-logo.png');

async function generateFavicon() {
  try {
    const metadata = await sharp(logoPath).metadata();
    console.log(`Logo dimensions: ${metadata.width}x${metadata.height}`);

    // The globe+book icon is roughly in the left 25% of the image, 
    // and we want just the icon without the "UNIVERSITAS TERBUKA" text below
    // The icon portion is approximately the top 85% of the height, left 22% of width
    const cropWidth = Math.floor(metadata.width * 0.22);
    const cropHeight = Math.floor(metadata.height * 0.78);
    
    console.log(`Cropping: ${cropWidth}x${cropHeight}`);

    const iconBuffer = await sharp(logoPath)
      .extract({
        left: Math.floor(cropWidth * 0.05),
        top: 0,
        width: cropWidth,
        height: cropHeight
      })
      .resize(256, 256, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 } 
      })
      .png()
      .toBuffer();

    // Save as icon.png (192x192) - Next.js App Router convention
    await sharp(iconBuffer)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(root, 'src', 'app', 'icon.png'));
    console.log('✅ Generated src/app/icon.png (192x192)');

    // Generate apple-icon.png (180x180)
    await sharp(iconBuffer)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(root, 'src', 'app', 'apple-icon.png'));
    console.log('✅ Generated src/app/apple-icon.png (180x180)');

    // Generate favicon.ico (32x32)
    await sharp(iconBuffer)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(root, 'src', 'app', 'favicon.ico'));
    console.log('✅ Generated src/app/favicon.ico (32x32)');

    console.log('\n🎉 All favicon files generated successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

generateFavicon();
