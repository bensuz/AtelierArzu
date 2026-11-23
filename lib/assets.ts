import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Optional brand photographs. Drop a file with one of these names into public/images and the
 * matching slot on the site switches from a placeholder to the photo automatically.
 */
const optionalImages = {
  makerPortrait: ["arzu-portre.webp", "arzu-portre.jpg", "arzu-portre.png"],
  makerAtWork: ["arzu-atolye.webp", "arzu-atolye.jpg", "arzu-atolye.png"],
  hero: ["hero.webp", "hero.jpg", "hero.png"]
} as const;

export function optionalImage(key: keyof typeof optionalImages) {
  for (const file of optionalImages[key]) {
    if (existsSync(path.join(process.cwd(), "public", "images", file))) return `/images/${file}`;
  }
  return undefined;
}
