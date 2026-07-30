"use client";

import { ImageProps } from "next/image";
import { FC, useState } from "react";
import Image from "next/image";

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
        className={`image-haze absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${loaded ? "opacity-0" : "opacity-100"}`}
      />
    </>
  );
};

export default CustomImage;
