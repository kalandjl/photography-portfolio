"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CustomImage from "@/components/CustomImage";

interface Props {
  photo: Pic;
}

// One gallery tile: the image itself (sized entirely by its CSS Grid cell --
// see PortfolioLayout.tsx, which computes that cell's column/row span from this
// photo's real aspect ratio) plus click-to-enlarge. Used for both desktop and
// mobile grids; there's nothing breakpoint-specific left to differ between them
// now that "big" is just a 2-column grid span instead of hand-tuned overlap math.
export function GalleryPhoto({ photo }: Props) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full"
      >
        <div className="relative w-full h-full" onClick={() => setModal(true)}>
          <CustomImage
            fill
            src={photo}
            alt=""
            quality={photo.quality}
            id="gallery-photo"
            className="object-cover p-2 sm:p-4 box-border"
            sizes="(max-width: 1200px) calc(100vw - 32px), 1168px"
            loading="lazy"
            priority={false}
          />
        </div>
      </motion.div>

      <div className={`${modal ? "" : "hidden"} fixed inset-0 z-50 flex items-center justify-center`}>
        <div className="absolute bg-black opacity-80 inset-0" onClick={() => setModal(false)}></div>
        <div className="relative max-w-[90vw] max-h-[90vh] bg-white p-4 rounded-lg shadow-lg z-50">
          <img
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt=""
            className="max-h-[80vh] max-w-full object-contain rounded-md"
          />
          <div className="top-0 right-0 absolute">
            <button
              onClick={() => setModal(false)}
              className="absolute top-3 right-3 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
