"use client";
import { motion } from "framer-motion";
import { useState, useEffect, FC } from "react";
import Nav from "../Nav";
import "react-photo-album/masonry.css";
import { MasonryPhotoAlbum } from "react-photo-album";
import { renderNextImage } from "@/lib/render";
import ActionSection from "../ActionSection";
import InstaSection from "../InstaSection";
import PortfolioSection from "../PortfolioSection";

interface Props {
  pics: Pic[];
  title: string;
}

const PortfolioLayout: FC<Props> = ({ pics, title }) => {
  const [loadedImages, setLoadedImages] = useState<number>(0);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];

    pics.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setLoadedImages((prev) => prev + 1);
      }, index * 200); // Delay each image by 200ms (adjust as needed)
      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [pics]);

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
      <Nav theme="dark" />

      <header className="text-center py-12">
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full"
        >
          <h1 className="text-4xl font-bold agency">{title}</h1>
        </motion.div>
      </header>

      <div className="px-6 md:px-32 lg:px-64 pt-10">
        <MasonryPhotoAlbum
          columns={3}
          spacing={0}
          padding={0}
          photos={pics.slice(0, loadedImages)} // Only render loaded images
          render={{ image: renderNextImage }}
          defaultContainerWidth={1200}
          sizes={{
            size: "1168px",
            sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
          }}
        />
      </div>

      <ActionSection
        links={[
          { title: "Contact Me", link: "/contact" },
          { title: "My Story", link: "/about" },
        ]}
      />
      <PortfolioSection />
      <InstaSection />
    </section>
  );
};

export default PortfolioLayout;
