"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroPic7 from "../public/images/hero/DSC00994.jpg"
import HeroPic8 from "../public/images/hero/DSC01148.jpg"
import HeroPic9 from "../public/images/hero/DSC07332.jpg"
import HeroPic10 from "../public/images/hero/DSC07524.jpg"
import HeroPic11 from "../public/images/hero/DSC07836.jpg"
import HeroPic12 from "../public/images/hero/SFU MBB VS Seattle-64.jpg"
import HeroPic13 from "../public/images/hero/UBC Homecoming Covered By JMAI.PHOTOS-045.jpg"
import HeroPic14 from "../public/images/hero/UBC Homecoming Covered By JMAI.PHOTOS-092.jpg"
import HeroPic15 from "../public/images/hero/VC FB Finals-010.jpg"
import HeroPic16 from "../public/images/hero/VC VS SD-172.jpg"
import HeroPic17 from "../public/images/hero/VC VS TF Play off  Game One-193.jpg"
import Nav from "../components/Nav"; // Adjust the import path as needed
import { lato, roboto } from "./fonts";
import InstaSection from "@/components/InstaSection";
import ContactSection from "@/components/ContactSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutMeSection from "@/components/AboutMeSection";
import ServicesSection from "@/components/ServicesSection";
import { motion, Variants } from "framer-motion";

const HERO_TEXT = "JMAI.PHOTOS";

// Per-character mask reveal: each glyph rises out of its own clipped box like a shutter
// lifting, rather than the whole-block blur/letter-spacing moves used elsewhere on the site.
const heroWordVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.25 },
  },
};

const heroCharVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.75, ease: [0.19, 1, 0.22, 1] },
  },
};

// Rule draws in just as the last character settles -- a small deliberate flourish, not a
// second competing animation.
const HERO_LAST_CHAR_DELAY = 0.25 + (HERO_TEXT.length - 1) * 0.05;
const heroRuleVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: HERO_LAST_CHAR_DELAY + 0.65, ease: [0.65, 0, 0.35, 1] },
  },
};

const images = [
  HeroPic13,
  HeroPic7,
  HeroPic8,
  HeroPic9,
  HeroPic10,
  HeroPic11,
  HeroPic12,
  HeroPic14,
  HeroPic15,
  HeroPic16,
  HeroPic17,
];


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <main className="h-screen overflow-hidden relative">
        {/* Hero Section with Slideshow */}
        <section className="absolute top-0 left-0 w-full h-full">
          <div className="bg-black opacity-75 w-full h-full absolute z-10"></div>
          <div className="relative w-full h-full">
            {images.map((src, index) => (
              <Image
                key={index}
                src={src}
                width={5000}
                height={5000}
                alt={`slide-${index}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Navigation Arrows */}
            <button
              id="slide-btn"
              onClick={prevSlide}
              className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:cursor-pointer"
            >
              <ChevronLeft size={32} color="white" />
            </button>
            <button
              id="slide-btn"
              onClick={nextSlide}
              className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:cursor-pointer"
            >
              <ChevronRight size={32} color="white" />
            </button>
            {/* Dots Navigation */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-gray-500"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Overlay Section */}
        <section className="relative z-10 w-full">
          <Nav />
          <main className="lg:px-32 md:px-20 px-10 grid place-items-center mt-10">
            <motion.div
            initial="hidden"
            animate="visible"
            variants={heroWordVariants}
            className="grid gap-6">
              <div id="text-wrap">
                <h1 className={`font-bold text-5xl md:px-10 py-10 text-white grid place-items-center h-96 ${roboto.className}`}>
                  <div className="flex flex-col items-center">
                    <p className="px-6 py-3 shadow-2xl agency" aria-label={HERO_TEXT}>
                      {HERO_TEXT.split("").map((char, index) => (
                        <span key={index} aria-hidden="true" className="inline-block overflow-hidden align-bottom">
                          <motion.span variants={heroCharVariants} className="inline-block">
                            {char}
                          </motion.span>
                        </span>
                      ))}
                    </p>
                    <motion.span
                      aria-hidden="true"
                      variants={heroRuleVariants}
                      className="mt-3 h-px w-20 bg-white/70 origin-center"
                    />
                  </div>
                </h1>
              </div>
            </motion.div>
          </main>
        </section>

      </main>
              

      <AboutMeSection />

      <PortfolioSection />

      <ServicesSection />

      <ContactSection />

      <InstaSection />
    </>
  );
}
