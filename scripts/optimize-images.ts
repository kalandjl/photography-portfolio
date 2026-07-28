/**
 * Resizes/recompresses every referenced source image in place (same path, same
 * extension) so the site stops shipping full camera-resolution originals.
 *
 * Reads from the pre-optimization backup (../photography-portfolio-originals-backup,
 * a sibling of the repo root) and writes into public/, so reruns are always based on
 * the untouched original bytes -- never on a possibly-already-shrunk public/ file.
 *
 * Usage:
 *   npm run optimize:images          # process
 *   npm run optimize:images -- --dry-run   # log what would change, write nothing
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const REPO_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(REPO_ROOT, "public");
const BACKUP_DIR = path.resolve(REPO_ROOT, "..", "photography-portfolio-originals-backup");
const MANIFEST_PATH = path.join(__dirname, ".image-optimize-manifest.json");
const SETTINGS_VERSION = 1;
const DRY_RUN = process.argv.includes("--dry-run");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);

// Files that are never referenced by the site (confirmed orphaned uploads) or are
// already-small icons/spacers -- leave them alone entirely.
const EXCLUDE = new Set(
  [
    "pictures/about/BCSS 2025 media.jpg",
    "icons/whiteicon.png",
    "icons/github.png",
    "icons/google-logo.png",
    "icons/insta-logo.png",
    "hidden.jpeg",
    "hidden1.jpeg",
    "hidden2.jpeg",
    "hidden3.jpeg",
    "hidden4.jpeg",
    "hddenmobile.jpeg",
    "hddenmobile1.jpeg",
    "hddenmobile2.jpeg",
    "hddenmobile3.jpeg",
    "hddenmobile4.jpeg",
    "hddenmobile5.jpeg",
  ].map(normalize),
);

// Full-bleed hero/barrier/slideshow images -- generous cap, higher quality (more
// visible JPEG blocking at full-viewport display sizes).
const HERO_TIER = new Set(
  [
    "pictures/Windsor Champs-074.jpg",
    "portraits/Ryan and Taylor-005.jpg",
    "graphics/Background.png",
    "pictures/_DSC6971.jpg",
    "images/gallery/sports/JMAI -220.jpg",
    "images/gallery/sports/JMAI Post abits Rematch Retouched-2.jpg",
    "images/sections/DSC07916.jpg",
    "images/about/Screenshot 2025-03-13 at 9.27.54 PM.png",
    "images/about/Jmai.png",
    "images/sections/JMAI -01.jpg",
    "images/sections/JMAI -02.jpg",
    "images/sections/DSC01631.jpg",
    "images/sections/VC FB Finals-010.jpg",
    "images/hero/DSC00994.jpg",
    "images/hero/DSC01148.jpg",
    "images/hero/DSC07332.jpg",
    "images/hero/DSC07524.jpg",
    "images/hero/DSC07836.jpg",
    "images/hero/SFU MBB VS Seattle-64.jpg",
    "images/hero/UBC Homecoming Covered By JMAI.PHOTOS-045.jpg",
    "images/hero/UBC Homecoming Covered By JMAI.PHOTOS-092.jpg",
    "images/hero/VC FB Finals-010.jpg",
    "images/hero/VC VS SD-172.jpg",
    "images/hero/VC VS TF Play off  Game One-193.jpg",
    "images/testimonials/VC Mothers Day 2026-60.jpeg",
  ].map(normalize),
);

// Smaller supporting photos -- testimonials, insta squares, about-page portraits.
const SUPPORTING_TIER = new Set(
  [
    "images/about/Untitled-2.jpeg",
    "images/about/about_me_photo.jpeg",
    "images/testimonials/Cahsmun.jpeg",
    "images/testimonials/BC CATHOLICS FINAL-106.jpg",
    "images/insta/insta-photo-1.jpg",
    "images/insta/insta-photo-2.jpg",
    "images/insta/insta-photo-3.jpg",
    "images/insta/insta-photo-4.jpg",
    "images/insta/insta-photo-5.jpg",
    "images/insta/insta-photo-6.jpg",
    "images/insta/insta-photo-7.jpg",
  ].map(normalize),
);

const TIERS = {
  hero: { cap: 2600, jpegQuality: 85 },
  supporting: { cap: 1600, jpegQuality: 82 },
  gallery: { cap: 2200, jpegQuality: 82 },
} as const;

function normalize(relPath: string): string {
  return relPath.split(path.sep).join("/");
}

function tierFor(relPath: string): keyof typeof TIERS {
  const norm = normalize(relPath);
  if (HERO_TIER.has(norm)) return "hero";
  if (SUPPORTING_TIER.has(norm)) return "supporting";
  return "gallery";
}

function walk(dir: string, base: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      walk(abs, rel, out);
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      out.push(rel);
    }
  }
  return out;
}

type Manifest = Record<string, { sourceHash: string; settingsVersion: number }>;

function loadManifest(): Manifest {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

function saveManifest(manifest: Manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function hashFile(absPath: string): string {
  return createHash("sha256").update(fs.readFileSync(absPath)).digest("hex");
}

async function processFile(relPath: string, manifest: Manifest): Promise<{ before: number; after: number; skipped: boolean }> {
  const backupPath = path.join(BACKUP_DIR, relPath);
  const publicPath = path.join(PUBLIC_DIR, relPath);
  const before = fs.statSync(backupPath).size;

  const sourceHash = hashFile(backupPath);
  const norm = normalize(relPath);
  const cached = manifest[norm];
  if (cached && cached.sourceHash === sourceHash && cached.settingsVersion === SETTINGS_VERSION && fs.existsSync(publicPath)) {
    return { before, after: fs.statSync(publicPath).size, skipped: true };
  }

  const tier = TIERS[tierFor(relPath)];
  const ext = path.extname(relPath).toLowerCase();
  const tmpPath = publicPath + ".tmp";

  if (DRY_RUN) {
    console.log(`[dry-run] would process (${tierFor(relPath)} tier): ${norm}`);
    return { before, after: before, skipped: false };
  }

  let pipeline = sharp(backupPath).rotate().resize({
    width: tier.cap,
    height: tier.cap,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: tier.jpegQuality, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
  }

  await pipeline.toFile(tmpPath);
  fs.renameSync(tmpPath, publicPath);

  manifest[norm] = { sourceHash, settingsVersion: SETTINGS_VERSION };
  return { before, after: fs.statSync(publicPath).size, skipped: false };
}

async function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    console.error(`Backup directory not found at ${BACKUP_DIR}. Refusing to run without it.`);
    process.exit(1);
  }

  const allFiles = walk(BACKUP_DIR, "");
  const toProcess = allFiles.filter((f) => !EXCLUDE.has(normalize(f)));

  console.log(`Found ${allFiles.length} images in backup, ${toProcess.length} to consider (${allFiles.length - toProcess.length} excluded).`);
  if (DRY_RUN) console.log("--- DRY RUN: no files will be written ---");

  const manifest = loadManifest();
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const relPath of toProcess) {
    try {
      const result = await processFile(relPath, manifest);
      totalBefore += result.before;
      totalAfter += result.after;
      if (result.skipped) {
        skipped++;
      } else {
        processed++;
        if (!DRY_RUN) {
          console.log(
            `${normalize(relPath)}: ${(result.before / 1024 / 1024).toFixed(1)}MB -> ${(result.after / 1024 / 1024).toFixed(2)}MB`,
          );
        }
      }
    } catch (err) {
      console.error(`FAILED: ${relPath}`, err);
      process.exitCode = 1;
    }
  }

  if (!DRY_RUN) saveManifest(manifest);

  console.log("\n--- Summary ---");
  console.log(`Processed: ${processed}, skipped (already optimized): ${skipped}`);
  console.log(`Total size: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
}

main();
