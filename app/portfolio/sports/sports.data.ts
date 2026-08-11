import type { CuratedEntry } from "@/lib/galleryTypes";

export const dir = "pictures/";

// Client request: group by team/event in this order, with the most recently sent
// batch last. Each group's membership was confirmed by opening the actual photos
// (jerseys/banners), not guessed from filenames alone -- e.g. "SFU MBB VS Seattle"
// turned out to be men's basketball, not softball, so it lives in `everything else`
// instead, while several plain "DSC0xxxx" files turned out to be the real softball
// game (an "SFU Alumni" field banner is visible in them).

const ubcFootball: CuratedEntry[] = [
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-045.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-069.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-074.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-093.jpg" },
];

const vcFootball: CuratedEntry[] = [
  { file: "VC FB Finals-042.jpg" },
  { file: "VC FB Finals-081.jpg" },
  { file: "VC FB Finals-149.jpg" },
  { file: "VC FB Finals-187.jpg" },
  { file: "VC VS SD-259.jpg" },
];

const sfuSoftball: CuratedEntry[] = [
  { file: "DSC06860.jpg" },
  { file: "DSC06900.jpg" },
  { file: "DSC07181.jpg" },
  { file: "DSC07296.jpg" },
  { file: "DSC07351.jpg" },
];

const ubcHockey: CuratedEntry[] = [
  { file: "JMAI Post abits Rematch Retouched-2.jpg" },
  { file: "JMAI Post abits Rematch-018.jpg" },
  { file: "JMAI Post abits Rematch-031.jpg" },
  { file: "DSC07246.jpg" },
  { file: "DSC07551.jpg" },
  { file: "DSC08229.jpg" },
];

const vcBball: CuratedEntry[] = [
  { file: "VCBBAll VS Dover Finals-103.jpg" },
  { file: "VCBBAll VS Dover Finals-375.jpg" },
  { file: "_DSC0316-Enhanced-NR.jpg" },
  { file: "_DSC6059-Enhanced-NR.jpg", big: true },
  { file: "_DSC2941.jpg" },
  { file: "Saitns Round 1 VARSITY-101.jpg" },
  { file: "Saitns Round 1 VARSITY-131.jpg", big: true },
  { file: "VC VS TF Play off  Game One-192.jpg" },
];

const ubcVolleyball: CuratedEntry[] = [
  { file: "UBC MVB Jan 16 2026-01.jpg" },
  { file: "UBC MVB Jan 16 2026-23.jpg" },
  { file: "UBC MVB Jan 16 2026-35.jpg" },
];

// Real photos that don't belong to any of the six named groups above (other
// schools/events entirely, or -- for one shot -- too ambiguous to place).
const everythingElse: CuratedEntry[] = [
  { file: "_DSC9997-Enhanced-NR.jpg" },
  { file: "JMAI -128.jpg" },
  { file: "_DSC6815.jpg" },
  { file: "_DSC6971.jpg" },
  { file: "_DSC9083.jpg" },
  { file: "DSC00878.jpg" },
  { file: "SFU MBB VS Seattle-33.jpg" },
];

// The client's most recently sent batch -- shown last.
const latestEntries: CuratedEntry[] = [
  { file: "A1_02604.jpeg" },
  { file: "A1_03161.jpeg" },
  { file: "DSC07534.jpeg" },
  { file: "Off Season Training July 11-057.jpeg" },
  { file: "Off Season Training July 11-068.jpeg" },
  { file: "Off Season Training July 11-073.jpeg" },
  { file: "Off Season Training July 11-106.jpeg" },
  { file: "Off Season Training July 11-120.jpeg" },
  { file: "Off Season Training July 11-124.jpeg" },
];

export const desktop: CuratedEntry[] = [
  ...ubcFootball,
  ...vcFootball,
  ...sfuSoftball,
  ...ubcHockey,
  ...vcBball,
  ...ubcVolleyball,
  ...everythingElse,
  ...latestEntries,
];

export const mobile: CuratedEntry[] = [
  ...ubcFootball,
  ...vcFootball,
  ...sfuSoftball,
  ...ubcHockey,
  ...vcBball,
  ...ubcVolleyball,
  ...everythingElse,
  ...latestEntries,
];
