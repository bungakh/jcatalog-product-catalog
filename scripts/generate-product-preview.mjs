import sharp from 'sharp';

const [, , sourcePath, destinationPath, widthArg = '1200', heightArg = '630', qualityArg = '82'] = process.argv;

if (!sourcePath || !destinationPath) {
    console.error('Usage: node scripts/generate-product-preview.mjs <source> <destination> [width] [height] [quality]');
    process.exit(1);
}

const width = Number.parseInt(widthArg, 10) || 1200;
const height = Number.parseInt(heightArg, 10) || 630;
const quality = Number.parseInt(qualityArg, 10) || 82;

const image = sharp(sourcePath).rotate();
const metadata = await image.metadata();
const sourceWidth = metadata.width || width;
const sourceHeight = metadata.height || height;

const mainImage = await sharp(sourcePath)
    .rotate()
    .resize(width, height, {
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: false,
    })
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toBuffer();

await sharp({
    create: {
        width,
        height,
        channels: 3,
        background: '#f8fafc',
    },
})
    .composite([{ input: mainImage, left: 0, top: 0 }])
    .jpeg({ quality, progressive: true, mozjpeg: true })
    .toFile(destinationPath);
