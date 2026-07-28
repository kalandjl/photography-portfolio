import type { CuratedEntry } from "@/lib/galleryTypes";

export const dir = "pictures/";

// New photos (from the old "newPics"/"newMobilePics" arrays) are appended after the
// original set, rather than rendered as a second stacked gallery -- that was bug #2
// in GALLERY.md (two separate PortfolioLayout instances on this page).
const newEntries: CuratedEntry[] = [
  { file: "DSC00878.jpg" },
  { file: "DSC06860.jpg" },
  { file: "DSC06900.jpg" },
  { file: "DSC07181.jpg" },
  { file: "DSC07246.jpg" },
  { file: "DSC07296.jpg" },
  { file: "DSC07351.jpg" },
  { file: "DSC07551.jpg" },
  { file: "DSC08229.jpg" },
  { file: "SFU MBB VS Seattle-33.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-045.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-069.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-074.jpg" },
  { file: "UBC Homecoming Covered By JMAI.PHOTOS-093.jpg" },
  { file: "UBC MVB Jan 16 2026-01.jpg" },
  { file: "UBC MVB Jan 16 2026-23.jpg" },
  { file: "UBC MVB Jan 16 2026-35.jpg" },
  { file: "VC FB Finals-042.jpg" },
  { file: "VC FB Finals-081.jpg" },
  { file: "VC FB Finals-149.jpg" },
  { file: "VC FB Finals-187.jpg" },
  { file: "VC VS SD-259.jpg" },
  { file: "VC VS TF Play off  Game One-192.jpg" },
  { file: "VCBBAll VS Dover Finals-103.jpg" },
  { file: "VCBBAll VS Dover Finals-375.jpg" },

  // Added from stuff_to_do/add_these/sports/
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
  { file: "_DSC0316-Enhanced-NR.jpg" },
  { file: "Saitns Round 1 VARSITY-131.jpg", big: true },
  { file: "Saitns Round 1 VARSITY-101.jpg" },

  { file: "_DSC2941.jpg" },
  { file: "_DSC6059-Enhanced-NR.jpg", big: true },

  { file: "JMAI Post abits Rematch Retouched-2.jpg" },
  { file: "JMAI -128.jpg" },
  { file: "JMAI Post abits Rematch-018.jpg" },
  { file: "JMAI Post abits Rematch-031.jpg" },
  { file: "_DSC6815.jpg" },
  { file: "_DSC6971.jpg" },
  { file: "_DSC9083.jpg" },
  { file: "_DSC9997-Enhanced-NR.jpg" },

  ...newEntries,
];

const newMobileEntries: CuratedEntry[] = newEntries;

export const mobile: CuratedEntry[] = [
  { file: "Saitns Round 1 VARSITY-131.jpg", big: true, quality: 80 },
  { file: "_DSC0316-Enhanced-NR.jpg" },
  { file: "Saitns Round 1 VARSITY-101.jpg" },
  { file: "_DSC2941.jpg" },
  { file: "JMAI Post abits Rematch Retouched-2.jpg" },
  { file: "JMAI -128.jpg" },
  { file: "JMAI Post abits Rematch-018.jpg" },
  { file: "_DSC6059-Enhanced-NR.jpg", big: true },
  { file: "JMAI Post abits Rematch-031.jpg" },
  { file: "_DSC6815.jpg" },
  { file: "_DSC6971.jpg" },
  { file: "_DSC9083.jpg" },
  { file: "_DSC9997-Enhanced-NR.jpg" },

  ...newMobileEntries,
];
