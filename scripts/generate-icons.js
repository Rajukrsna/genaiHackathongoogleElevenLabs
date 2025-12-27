import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconSvgPath = path.resolve(process.cwd(), 'public', 'icons', 'icon.svg');
const outDir = path.resolve(process.cwd(), 'public', 'icons');

if (!fs.existsSync(iconSvgPath)) {
  console.error('Missing source SVG:', iconSvgPath);
  process.exit(1);
}

async function generate() {
  try {
    await sharp(iconSvgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(outDir, 'icon-192.png'));

    await sharp(iconSvgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(outDir, 'icon-512.png'));

    console.log('Icons generated: icon-192.png, icon-512.png');
  } catch (err) {
    console.error('Failed to generate icons', err);
    process.exit(1);
  }
}

generate();