"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroPic1 from "../public/pictures/_DSC0316-Enhanced-NR.jpg"
import HeroPic2 from "../public/pictures/_DSC0646-Enhanced-NR.jpg"
import HeroPic3 from "../public/pictures/_DSC6639.jpg"
import HeroPic4 from "../public/pictures/JMAI Post abits Rematch-094.jpg"
import HeroPic5 from "../public/pictures/_DSC6815.jpg"
import HeroPic6 from "../public/pictures/Ryan and Taylor-005.jpg"
import Nav from "../components/Nav"; // Adjust the import path as needed
import { roboto } from "./fonts";
import InstaSection from "@/components/InstaSection";
import ContactSection from "@/components/ContactSection";
import PortfolioSection from "@/components/PortfolioSection";

const images = [
  HeroPic1,
  HeroPic2,
  HeroPic3,
  HeroPic4,
  HeroPic5,
  HeroPic6
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
              onClick={prevSlide}
              className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-20 hover:cursor-pointer"
            >
              <ChevronLeft size={32} color="white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 p-2 rounded-full z-20 hover:cursor-pointer"
            >
              <ChevronRight size={32} color="white" />
            </button>
            {/* Dots Navigation */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
          <main className="px-32 grid place-items-center mt-10">
            <h1 className={`font-bold text-5xl px-10 py-10 text-white grid place-items-center h-96 ${roboto.className}`}>
              <p className="shadow-2xl px-6 py-3">JMAI.PHOTOS</p>
            </h1>
          </main>
        </section>

      </main>
      

      <PortfolioSection />
      
      <ContactSection />

      <InstaSection />
    </>
  );
}
