// Hand-curated gallery entries. `file` is resolved against disk and its real
// width/height are read at generation time (see scripts/generate-gallery-data.ts) --
// dimensions are never hand-typed.
export type CuratedEntry = {
  file: string;
  /** Folder under public/ to resolve `file` against. Defaults to the gallery's `dir` export. */
  dir?: string;
  /** Renders this photo as a featured 2-column-wide tile in the grid. */
  big?: boolean;
  quality?: number;
};
