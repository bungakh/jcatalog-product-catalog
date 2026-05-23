import sharp from 'sharp';

const [, , sourcePath, destinationPath, widthArg = '480', heightArg = '480', qualityArg = '72'] = process.argv;

if (!sourcePath || !destinationPath) {
    console.error('Usage: node scripts/resize-product-image.mjs <source> <destination> [width] [height] [quality]');
    process.exit(1);
}

const width = Number.parseInt(widthArg, 10) || 480;
const height = Number.parseInt(heightArg, 10) || 480;
const quality = Number.parseInt(qualityArg, 10) || 72;

await sharp(sourcePath)
    .rotate()
    .resize(width, height, {
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
    })
    .webp({ quality, effort: 4 })
    .toFile(destinationPath);
