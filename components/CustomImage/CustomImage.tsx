import { ImageProps } from "next/image";
import { FC } from "react";
import Image from "next/image";

// Thin wrapper kept for a consistent import path across the site. Used to also
// gate rendering behind a client-side mobile check so it could pass a lower
// `quality` on small screens -- but `next.config.ts` sets `images.unoptimized:
// true` (required for this site's static export), which makes the `quality`
// prop a no-op everywhere. That gating meant every image on the site rendered
// as a blank grey box until after hydration, for no actual benefit.
const CustomImage: FC<ImageProps> = (props) => {
  return <Image {...props} />;
};

export default CustomImage;
