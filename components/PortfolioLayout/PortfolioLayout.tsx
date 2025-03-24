"use client"
import { motion } from "framer-motion"
import { useState, useEffect, FC } from "react";
import Nav from "../Nav";
import "react-photo-album/masonry.css";
import { ColumnsPhotoAlbum, MasonryPhotoAlbum, RowsPhotoAlbum } from "react-photo-album";
import { renderNextImage } from "@/lib/render";
import { oswald, oswaldBold } from "@/app/fonts";
import ActionSection from "../ActionSection";
import InstaSection from "../InstaSection";

interface Props {
  pics: Pic[];
  title: string;
}

const PortfolioLayout: FC<Props> = ({ pics, title }) => {
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
  

  return (
    <>

      <section id="portfolio-gallery" className="min-h-screen text-black transition-opacity duration-500">
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
              <h1 className={`text-4xl font-bold agency`}>{title}</h1>
            </motion.div>
          </header>

          <div className="px-6 md:px-32 lg:px-64 pb-20 pt-10">
            <MasonryPhotoAlbum
            columns={3}
            
            spacing={0}
            padding={0}
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
      </section>

      <ActionSection links={[
        {
          title: "Contact Me",
          link: "/contact",
        }, {
          title: "About Me",
          link: "/about",
        }
      ]} />
      
      <InstaSection />
    </>
  );
};

export default PortfolioLayout;
