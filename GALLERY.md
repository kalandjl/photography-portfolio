# How the photo gallery system works

This describes the masonry photo galleries at `/portfolio/sports`, `/portfolio/portraits`, and `/portfolio/graphics`.

This is the **second** rebuild of this system in this project's history. If you're looking at git history and see an even older `GALLERY.md`, that one describes a hand-typed-array version with real bugs; a later revision replaced hand-typed dimensions with generated ones but kept a fragile "photo overlaps its neighbor" trick for featured photos — that trick is what this revision removes, because it broke (a blank gap in the grid) every time the photo list changed. Details on why, below.

## The short version

Each gallery has two files:

```
app/portfolio/<category>/<category>.data.ts       <- hand-curated: which photos, in what order, which ones are "big"
app/portfolio/<category>/<category>.generated.ts  <- AUTO-GENERATED: real src/width/height, do not edit
app/portfolio/<category>/page.tsx                 <- imports the generated data, renders the page
```

You only ever hand-edit the `.data.ts` file. Running `npm run gen:gallery` (or just `npm run dev` / `npm run build`, which run it automatically via `predev`/`prebuild`) regenerates the `.generated.ts` file by reading each referenced photo's **real** dimensions off disk with `sharp`.

## The pieces involved

```
scripts/generate-gallery-data.ts     <- the codegen script described above
lib/galleryTypes.ts                  <- CuratedEntry type (what a .data.ts file's entries look like)
types/Pic.d.ts                       <- Pic type (what a .generated.ts file's entries look like)
components/PortfolioLayout/          <- the masonry grid itself (desktop + mobile)
lib/render.tsx                       <- one photo tile: the image + click-to-enlarge
```

**There is no external masonry library anymore** (the earlier revision used `react-photo-album`; that dependency is gone). `PortfolioLayout.tsx`'s `MasonryGrid` is a plain CSS Grid, laid out with a well-known technique:

- `grid-auto-rows: 1px` — so a row-span of `N` is exactly `N` pixels tall.
- Each photo's row-span is computed from its **real aspect ratio** at the container's actual measured width (via `ResizeObserver`).
- `grid-auto-flow: dense` — the browser packs every photo into the first slot it fits, automatically, with no manual gap-filling needed.
- A `big: true` photo just gets `grid-column: span 2` (spans two columns instead of one) — its row-span is computed the same way, just using its now-doubled effective width.

## Anatomy of one curated entry

A `.data.ts` file looks like this (from `app/portfolio/portraits/portraits.data.ts`):

```ts
export const dir = "portraits/"; // default public/ subfolder for this gallery

export const desktop: CuratedEntry[] = [
  { file: "Devine and Ngan-39.jpg" },
  { file: "JMAI LAX MEDIA DAY-01.jpg", big: true },
  // ...
];

export const mobile: CuratedEntry[] = [ /* ... */ ];
```

Each entry is `{ file, dir?, big?, quality? }` (see `lib/galleryTypes.ts`). `file` is a filename, resolved against `dir` (the gallery's default, or a per-entry override). `big` renders the photo as a featured 2-column tile. That's the whole vocabulary — there's no spacer entries and no `leftBig`/`rightBig`/`firstRightBig`/`bigLeft`/`bigWithRowBelow` variants anymore (see "What changed," below, for why).

## Why the previous "big photo" mechanism had to go

The prior revision made a `big`-flagged photo visually overlap its neighbors by absolutely-positioning it at 200-300% size with `z-index: -10`, relying on whichever photo the masonry library happened to place next to it to visually complete the illusion. That adjacency was never guaranteed — it depended on the exact column-balancing result of every photo before it in the array. **Every time the photo list changed** (added, removed, reordered — which happened three times over the course of building this system), the column balance shifted, a different photo landed next to the "big" one, and nothing filled the gap it left behind. That produced a real, user-visible blank rectangle in the grid, more than once, on more than one gallery.

The CSS Grid approach has no such dependency: a `big` photo's 2-column span and row-height are computed entirely from its own aspect ratio and the container width — nothing about where any other photo in the list ends up can affect it. Adding, removing, or reordering photos anywhere in a `.data.ts` file cannot break another photo's layout, structurally, not just "in the cases we tested."

## Local file locations

Every gallery image is local, under `public/`. To add a photo:

1. Get the file into the right `public/` subfolder: `public/pictures/` (sports), `public/portraits/`, `public/graphics/`. Give the `.data.ts` entry a `dir` override if it genuinely belongs somewhere else (see `graphics.data.ts`'s `Andres BC All Stars Game.png` entry, which lives at the `public/` root).
2. **Run it through the resize/compression pipeline before it goes in `public/`** — see "Image optimization," below.
3. Add `{ file: "..." }` to the gallery's `.data.ts` — to **both** `desktop` and `mobile` arrays, since they're independent lists (a photo only added to one won't show up on the other breakpoint).
4. `npm run gen:gallery` (or just start `npm run dev`) and check both a desktop-width and mobile-width browser window. There's no more "big photo" re-tuning step needed — that's the point of this revision.

To remove a photo, delete its entry from both arrays. That's it — no neighboring spacer or flag cleanup required anymore.

## Image optimization

`next.config.ts` sets `images.unoptimized: true`, required for this site's static export (`output: "export"`, deployed to Firebase Hosting — there's no server to do on-demand image processing). Whatever bytes are in `public/` are exactly what ships to the browser.

`scripts/optimize-images.ts` (`npm run optimize:images`) resizes and recompresses every referenced source image **in place** — same filename, same folder, same extension, so no code references ever need to change. It reads from a pre-optimization backup of `public/` kept outside the repo (ask whoever ran this last where it is), resizes based on how the image is used (masonry photo / full-bleed hero / smaller supporting image — see the `TIERS` constants), and is idempotent via a gitignored manifest so re-runs only touch new/changed files.

**If you add a new photo anywhere on the site, run `npm run optimize:images` before it goes live.** A full-resolution camera JPEG is routinely 20-40MB; this pipeline gets it down to a few hundred KB with no visible quality loss at the sizes it's actually displayed.

## Desktop vs. mobile: two independent lists

Each gallery's `.data.ts` has separate `desktop` and `mobile` arrays, rendered as two separate `MasonryGrid`s (one hidden below the `sm:` Tailwind breakpoint, one hidden above it). A photo added to only one array won't show up on that breakpoint. Column counts: 3 desktop / 2 mobile for sports and portraits; 2 desktop / 1 mobile for graphics (via the `columns` prop on `PortfolioLayout`). On a 1-column mobile grid, `big` has no visible effect (nothing to span into); on a 2-column mobile grid, a `big` photo spans the full row width.

## The lightbox

Clicking a photo opens a fullscreen preview (`lib/render.tsx`'s `GalleryPhoto`). Right-click is disabled on all gallery images (`PortfolioLayout.tsx`'s `disableRightClick` effect).

## What changed from the previous revision (and why)

- **`react-photo-album` dependency removed entirely**, replaced with a ~70-line CSS Grid component. Fewer moving parts, no black-box column-balancing algorithm to reason about.
- **`big`/`leftBig`/`rightBig`/`firstRightBig`/`bigLeft`/`bigWithRowBelow` (6 flags) → just `big`.** The other 5 existed solely to hand-tune the old overlap illusion; CSS Grid's `dense` packing makes them unnecessary.
- **Spacer entries removed entirely** (both the `{ spacer: true, width, height }` curated-data concept and, before that, the original system's 11 placeholder image files). Dense packing fills gaps on its own; nothing needs to reserve one by hand.
- **The staggered `index * 100ms` fade-in reveal is gone.** It existed to spread out image network requests back when photos were 20-40MB originals; now that everything's pre-optimized to a few hundred KB, native `loading="lazy"` plus each photo's own scroll-triggered fade (`framer-motion`'s `whileInView`, unchanged) does the same visual job without re-flowing the whole grid as more items arrive.
- **A dead `modal`/`closeModal`/Escape-key handler in `PortfolioLayout` was removed.** It referenced a piece of state that no click handler ever actually set — Escape never closed the lightbox in any version of this site. Not a regression; it never worked.

If you're comparing against the *very first* `GALLERY.md`, add: hand-typed width/height → generated from real files; filename-based spacer detection → gone; Firebase Storage image URLs + a `badImage` plain-`<img>` escape hatch → everything local, one render path; the sports gallery's two stacked masonry instances → one merged list.
