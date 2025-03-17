"use client"
import { useState, useEffect, FC } from "react";
import Nav from "../Nav";
import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";
import { renderNextImage } from "@/lib/render";

interface Props {
  pics: Pic[];
  title: string;
}

const PortfolioLayout: FC<Props> = ({ pics, title }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {


    // Preload all images
    const loadImages = async () => {
      await Promise.all(
        pics.map((pic) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = pic.src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );
      setLoaded(true);
    };

    loadImages();
  }, [pics]);

  return (
    <>

      <div id="wrap" className="min-h-screen text-black transition-opacity duration-500">
        <Nav theme="dark" />
        {!loaded && (
          <div className="h-screen grid place-items-center">
                Loading...
          </div>
        )}
        <div className={` ${loaded ? "opacity-100" : "opacity-0"}`}>
          <header className="text-center py-12">
            <h1 className="text-4xl font-bold">{title}</h1>
          </header>

          <div className="px-6 md:px-32 lg:px-64 pb-20 pt-10">
            <RowsPhotoAlbum
              photos={pics}
              render={{ image: renderNextImage }}
              defaultContainerWidth={1200}
              sizes={{
                size: "1168px",
                sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioLayout;
