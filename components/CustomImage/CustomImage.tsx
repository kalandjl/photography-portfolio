"use client";

import { ImageProps } from "next/image";
import { FC, useState } from "react";
import Image from "next/image";

// Some callers (the gallery) pad the Image itself rather than its wrapper, to inset the
// photo away from its grid cell's edges -- see lib/render.tsx. The haze needs that same
// inset or it reads as a bigger box than the photo it's standing in for. Pulling just the
// padding/box-sizing utilities out of the caller's className (never touching the Image's
// own className) keeps this automatic for any current or future caller of that pattern.
const SPACING_CLASS_RE = /^(?:[a-z0-9-]+:)*(?:p[trblxy]?-\S+|box-(?:border|content))$/;

function extractSpacingClasses(className?: string): string {
  if (!className) return "";
  return className.split(/\s+/).filter((cls) => SPACING_CLASS_RE.test(cls)).join(" ");
}

// Thin wrapper kept for a consistent import path across the site, now also responsible for
// the grey "haze" loading placeholder (see .image-haze in globals.css). The Image itself is
// rendered completely untouched -- every prop/className/style a caller passes goes straight
// through unmodified -- and the haze is a sibling overlay that fades out on load, so this
// never risks clobbering a caller's own hover/transition classes.
//
// Relies on the caller already providing a sized, position:relative ancestor for the haze to
// overlay, which is true for every current usage site-wide (either via the `fill` prop, or
// the same "parent CSS controls the box, next/image just fills it" pattern already used
// throughout this codebase for the non-fill cases).
const CustomImage: FC<ImageProps> = ({ onLoad, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const spacingClasses = extractSpacingClasses(
    typeof props.className === "string" ? props.className : undefined
  );

  return (
    <>
      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
      <div
        aria-hidden="true"
        className={`image-haze absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${spacingClasses} ${loaded ? "opacity-0" : "opacity-100"}`}
      />
    </>
  );
};

export default CustomImage;
