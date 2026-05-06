import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, "public", "images"),
  path.join(ROOT, "public", "lovable-uploads"),
];

const IMAGE_REGEX = /\.(jpg|jpeg|png)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (IMAGE_REGEX.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function ensureWebp(sourcePath) {
  const targetPath = sourcePath.replace(IMAGE_REGEX, ".webp");

  try {
    const [srcStat, dstStat] = await Promise.all([
      fs.stat(sourcePath),
      fs.stat(targetPath).catch(() => null),
    ]);

    if (dstStat && dstStat.mtimeMs >= srcStat.mtimeMs) {
      return { sourcePath, targetPath, skipped: true };
    }

    await sharp(sourcePath).webp({ quality: 78 }).toFile(targetPath);
    return { sourcePath, targetPath, skipped: false };
  } catch (error) {
    return { sourcePath, targetPath, skipped: false, error };
  }
}

async function main() {
  const existingDirs = [];
  for (const dir of TARGET_DIRS) {
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) {
        existingDirs.push(dir);
      }
    } catch {
      // Ignore missing directories.
    }
  }

  const sourceFiles = [];
  for (const dir of existingDirs) {
    sourceFiles.push(...(await walk(dir)));
  }

  const results = await Promise.all(sourceFiles.map(ensureWebp));

  const failed = results.filter((r) => r.error);
  const converted = results.filter((r) => !r.error && !r.skipped);
  const skipped = results.filter((r) => !r.error && r.skipped);

  console.log(`Total de imagens analisadas: ${results.length}`);
  console.log(`Convertidas para WebP: ${converted.length}`);
  console.log(`Ja atualizadas (sem conversao): ${skipped.length}`);

  if (failed.length > 0) {
    console.error(`Falhas na conversao: ${failed.length}`);
    for (const item of failed) {
      console.error(`- ${item.sourcePath}: ${item.error?.message ?? "erro desconhecido"}`);
    }
    process.exitCode = 1;
  }
}

main();