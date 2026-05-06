import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const QUARTOS_DIR = path.join(ROOT, "public", "images", "quartos");
const REFERENCE_FILE = path.join(QUARTOS_DIR, "zeus", "3.jpg");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (/\.jpg$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function standardizeOne(jpgPath, width, height) {
  const webpPath = jpgPath.replace(/\.jpg$/i, ".webp");
  const avifPath = jpgPath.replace(/\.jpg$/i, ".avif");

  const sourceBuffer = await sharp(jpgPath)
    .rotate()
    .resize(width, height, {
      fit: "cover",
      position: "attention",
      withoutEnlargement: false,
    })
    .toBuffer();

  await sharp(sourceBuffer).jpeg({ quality: 84, mozjpeg: true }).toFile(jpgPath);
  await sharp(sourceBuffer).webp({ quality: 78 }).toFile(webpPath);
  await sharp(sourceBuffer).avif({ quality: 50 }).toFile(avifPath);
}

async function main() {
  const refMeta = await sharp(REFERENCE_FILE).metadata();
  const targetWidth = refMeta.width;
  const targetHeight = refMeta.height;

  if (!targetWidth || !targetHeight) {
    throw new Error("Nao foi possivel ler dimensoes da referencia zeus/3.jpg");
  }

  const jpgFiles = await walk(QUARTOS_DIR);

  for (const file of jpgFiles) {
    await standardizeOne(file, targetWidth, targetHeight);
  }

  console.log(`Quartos padronizados em ${targetWidth}x${targetHeight}.`);
  console.log(`Arquivos JPG processados: ${jpgFiles.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
