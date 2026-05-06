import { execFileSync } from "node:child_process";
import { readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import ffmpegPath from "ffmpeg-static";

if (!ffmpegPath) {
  console.error("ffmpeg-static nao encontrado.");
  process.exit(1);
}

const videosDir = join(process.cwd(), "public", "videos");
const files = readdirSync(videosDir).filter((name) => name.toLowerCase().endsWith(".mp4"));

if (files.length === 0) {
  console.log("Nenhum .mp4 encontrado em public/videos.");
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;
let optimizedCount = 0;

for (const fileName of files) {
  const inputPath = join(videosDir, fileName);
  const tempOutputPath = join(videosDir, `${fileName}.optimized.mp4`);

  const beforeSize = statSync(inputPath).size;
  totalBefore += beforeSize;

  try {
    execFileSync(
      ffmpegPath,
      [
        "-y",
        "-i",
        inputPath,
        "-map",
        "0:v:0",
        "-map",
        "0:a?",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "24",
        "-maxrate",
        "3M",
        "-bufsize",
        "6M",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        "-movflags",
        "+faststart",
        "-pix_fmt",
        "yuv420p",
        tempOutputPath,
      ],
      { stdio: "ignore" }
    );

    const afterSize = statSync(tempOutputPath).size;

    if (afterSize < beforeSize) {
      renameSync(tempOutputPath, inputPath);
      optimizedCount += 1;
      totalAfter += afterSize;
      const savedMb = ((beforeSize - afterSize) / (1024 * 1024)).toFixed(2);
      console.log(`OK ${fileName}: ${(beforeSize / (1024 * 1024)).toFixed(2)}MB -> ${(afterSize / (1024 * 1024)).toFixed(2)}MB (-${savedMb}MB)`);
    } else {
      unlinkSync(tempOutputPath);
      totalAfter += beforeSize;
      console.log(`SKIP ${fileName}: arquivo original ja estava menor.`);
    }
  } catch (error) {
    try {
      unlinkSync(tempOutputPath);
    } catch {
      // ignore cleanup error
    }
    totalAfter += beforeSize;
    console.log(`ERRO ${fileName}: mantendo original.`);
  }
}

const totalSaved = totalBefore - totalAfter;
console.log(`\nVideos processados: ${files.length}`);
console.log(`Videos otimizados: ${optimizedCount}`);
console.log(`Total antes: ${(totalBefore / (1024 * 1024)).toFixed(2)}MB`);
console.log(`Total depois: ${(totalAfter / (1024 * 1024)).toFixed(2)}MB`);
console.log(`Economia total: ${(totalSaved / (1024 * 1024)).toFixed(2)}MB`);
