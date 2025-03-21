"use client"
import { motion } from "framer-motion"
import { useState, useEffect, FC } from "react";
import Nav from "../Nav";
import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";
import { renderNextImage } from "@/lib/render";
import PhotoSwipeLightbox from "photoswipe/lightbox";

interface Props {
  pics: Pic[];
  title: string;
  galleryId: string
}

const PortfolioLayout: FC<Props> = (props) => {

  let {pics, title} = props

  const [loaded, setLoaded] = useState(true);

  // useEffect(() => {
  //   // Preload all images
  //   const loadImages = async () => {
  //     await Promise.all(
  //       pics.map((pic) => {
  //         const img = new Image();
  //         img.src = pic.src;
  //         return new Promise((resolve) => {
  //           img.onload = resolve;
  //           img.onerror = resolve;
  //         });
  //       })
  //     );
  //     setLoaded(true);
  //   };
  
  //   loadImages();
  // }, [pics]);

  // Disable right click on images
  useEffect(() => {
    const disableRightClick = (event: MouseEvent) => {
        if ((event.target as HTMLElement).tagName === "IMG") {
            event.preventDefault();
        }
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => {
        document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [])
  
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryId,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      // @ts-ignore
      lightbox = null;
    };
  }, []);

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
            <motion.div
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.10 }}
            viewport={{ once: false }} // Ensure animation triggers even if already visible
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
            >
              <h1 className="text-4xl font-bold ">{title}</h1>
            </motion.div>
          </header>


    <div className="pswp-gallery" id={props.galleryId}>
      {props.pics.map((image, index) => (
        <a
          href={image.src}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={props.galleryId + '-' + index}
          target="_blank"
          rel="noreferrer"
        >
          <img src={image.src} alt="" />
        </a>
      ))}
    </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioLayout;
