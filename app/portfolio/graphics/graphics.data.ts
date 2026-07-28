import type { CuratedEntry } from "@/lib/galleryTypes";

// Default folder these `file`s resolve against, unless an entry sets its own `dir`.
export const dir = "images/gallery/graphics/";

// Same set on desktop and mobile -- this gallery has no "big" layout flags and no
// spacers, so there's nothing that needs to differ between breakpoints.
const entries: CuratedEntry[] = [
  { file: "Andres BC All Stars Game.png" },
  { file: "Varsity Poster Final.jpg" },
  { file: "488968301_1765443150672408_7674308146999412494_n.jpg" },
  { file: "Nathan Lowden Queens Commit Final.jpg", dir: "graphics/" },
  { file: "FINAL 6273341.jpg" },
  { file: "Prov Sec.jpg" },
  { file: "lucasgonzales.jpg" },
  { file: "Saints day post.jpg" },
  { file: "Senior day post.jpg" },
  { file: "24 hours.png" },
  { file: "V3 6238121.jpg" },
  { file: "Winner.jpg" },
  { file: "VC Football Senior Day Jerome.png" },
];

export const desktop: CuratedEntry[] = entries;
export const mobile: CuratedEntry[] = entries;
