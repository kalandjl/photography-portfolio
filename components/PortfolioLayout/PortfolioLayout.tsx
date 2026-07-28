"use client";
import { useEffect, useLayoutEffect, useRef, useState, FC } from "react";
import { GalleryPhoto } from "@/lib/render";

interface GridProps {
  photos: Pic[];
  columns: number;
}

// A deterministic CSS Grid masonry: each photo's row-span is computed from its
// real aspect ratio (grid-auto-rows: 1px, so a span of N is exactly N pixels
// tall), and `big` photos just span 2 columns. `grid-auto-flow: dense` packs
// everything else around them automatically -- no manual spacer entries, and no
// dependency on which photo happens to land next to a "big" one, so adding or
// removing photos anywhere in the list can never break another photo's layout.
const MasonryGrid: FC<GridProps> = ({ photos, columns }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colWidth = containerWidth / columns;

  return (
    <div
      ref={containerRef}
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: "1px",
        gridAutoFlow: "dense",
      }}
    >
      {containerWidth > 0 &&
        photos.map((photo, i) => {
          const spanCols = photo.big ? Math.min(2, columns) : 1;
          const cellWidth = spanCols * colWidth;
          const cellHeight = cellWidth * (photo.height / photo.width);
          return (
            <div
              key={`${photo.src}-${i}`}
              style={{
                gridColumn: `span ${spanCols}`,
                gridRowEnd: `span ${Math.max(1, Math.round(cellHeight))}`,
              }}
            >
              <GalleryPhoto photo={photo} />
            </div>
          );
        })}
    </div>
  );
};

interface Props {
  pics: Pic[];
  mobilePicsProps?: Pic[];
  title: string;
  columns?: number;
}

const PortfolioLayout: FC<Props> = ({ pics, title, mobilePicsProps, columns }) => {
  const mobilePics = mobilePicsProps ?? pics;

  // Disable right-click on images
  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).tagName === "IMG") {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  return (
    <section id="portfolio-gallery" className="min-h-screen text-black transition-opacity duration-500">
      <div className="px-4 md:px-8 lg:px-12 pt-10">
        <div className="sm:block hidden">
          <MasonryGrid photos={pics} columns={columns ?? 3} />
        </div>
        <div className="sm:hidden block">
          <MasonryGrid photos={mobilePics} columns={columns ? columns - 1 : 2} />
        </div>
      </div>
    </section>
  );
};

export default PortfolioLayout;
