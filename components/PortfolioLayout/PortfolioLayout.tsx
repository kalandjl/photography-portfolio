"use client";
import { motion } from "framer-motion";
import { useState, useEffect, FC } from "react";
import Nav from "../Nav";
import "react-photo-album/masonry.css";
import { MasonryPhotoAlbum } from "react-photo-album";
import { renderNextImage, renderNextImageMobile } from "@/lib/render";
import ActionSection from "../ActionSection";
import InstaSection from "../InstaSection";
import PortfolioSection from "../PortfolioSection";
import Image from "next/image";

interface Props {
  pics: Pic[];
  mobilePicsProps?: Pic[];
  title: string;
  columns?: number
}

const PortfolioLayout: FC<Props> = ({ pics, title, mobilePicsProps, columns }) => {



  const closeModal = () => {
    if (!modal) return
    document.getElementById(`img-${modal.src}`)?.setAttribute("data-modal", "false")
    setModal(undefined)
  }
  let [mobilePics, setMobilePics] = useState<any>([])

  useEffect(() => {

    setMobilePics(pics.filter(pic => pic.src.includes("hidden") ? false : true))
  }, [])


  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [loadedImagesMobile, setLoadedImagesMobile] = useState<number>(0);

  const [modal, setModal] = useState<Pic | undefined>()
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {

      pics.forEach((pic) => {
        const el = document.getElementById(`img-${pic.src}`);
        if (!el) return;

        const data = el.getAttribute("data-modal")
        if (data === "true") setModal(pic)
      });

      setCount((prevCount) => prevCount + 1);
    }, 500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pics]);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];

    // Handle the image loading for desktop
    pics.forEach((_, index) => {
        const timeoutId = setTimeout(() => {
            setLoadedImages((prev) => prev + 1);
        }, index * 100); // Delay each image by 100ms (adjust as needed)
        timeoutIds.push(timeoutId);
    });

    // Handle the image loading for mobile
    mobilePics.forEach((_: any, index: any) => {
        const timeoutId = setTimeout(() => {
            setLoadedImagesMobile((prev) => prev + 1);
        }, index * 100); // Delay each image by 100ms (adjust as needed)
        timeoutIds.push(timeoutId);
    });

    // Cleanup function to clear the timeouts on component unmount
    return () => {
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [pics, mobilePics]);

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

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") closeModal()
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);



  return (
    <section id="portfolio-gallery" className="min-h-screen text-black transition-opacity duration-500">

      <div className="px-4 md:px-8 lg:px-12 pt-10">
        <div className="sm:block hidden">
          <MasonryPhotoAlbum
            columns={columns ?? 3}
            spacing={0}
            padding={0}
            photos={pics.filter(pics => pics.src.includes("hdden") ? false : true).slice(0, loadedImages)} // Only render loaded images
            render={{ image: renderNextImage }}
            defaultContainerWidth={1200}
            sizes={{
              size: "1168px",
              sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
            }}
          />
        </div>
        <div className="sm:hidden block">
          <MasonryPhotoAlbum
              columns={columns ? columns - 1 : 2}
              spacing={0}
              padding={0}
              photos={mobilePicsProps ?? mobilePics.slice(0, loadedImagesMobile)} // Only render loaded images
              render={{ image: renderNextImageMobile }}
              defaultContainerWidth={1200}
              sizes={{
                size: "1168px",
                sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
              }}
            />
        </div>
      </div>

      <ActionSection
        links={[
          { title: "Contact Me", link: "/contact" },
          { title: "My Story", link: "/about" },
        ]}
      />
      <PortfolioSection />
      <InstaSection />

      {modal ?
        <div
      id="modal"
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={() => closeModal()} // Click outside to close
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-40"></div>

      {/* Modal content (Centered, Scrollable if needed) */}
      <div
        className="relative bg-white rounded-lg shadow-lg z-50 p-6 max-w-[90vw] max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close button (Positioned properly) */}
        <button
          onClick={() => closeModal()}
          className="absolute top-3 right-3 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
        >
          ✕
        </button>

        {/* Image (Resizes properly) */}
        <Image
          src={modal.src}
          height={modal.height}
          width={modal.width}
          className="object-contain max-h-[80vh] max-w-full rounded-md"
          alt=""
        />
      </div>
    </div>
        :
        <></>}
      
    </section>
  );
};

export default PortfolioLayout;
