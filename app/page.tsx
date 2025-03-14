"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroPic1 from "../public/pictures/_DSC0316-Enhanced-NR.jpg"
import HeroPic2 from "../public/pictures/_DSC0646-Enhanced-NR.jpg"
import HeroPic3 from "../public/pictures/_DSC6639.jpg"
import HeroPic4 from "../public/pictures/JMAI Post abits Rematch-094.jpg"
import Nav from "../components/Nav"; // Adjust the import path as needed

const images = [
  HeroPic1,
  HeroPic2,
  HeroPic3,
  HeroPic4
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
        {/* Hero Section with Slideshow */}
        <section className="z-0 w-full h-screen fixed top-0 overflow-hidden">
          <div className="bg-black opacity-60 w-full h-full absolute z-10"></div>
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
          </div>
        </section>
  
        {/* Overlay Section */}
        <section className="z-10 absolute top-0 w-full">
          <Nav />
          <main className="px-32 grid place-items-center mt-10">
            <h1 className="font-bold text-4xl px-10 py-5 text-white">
              JOHNSON MAI PHOTOGRAPHY
            </h1>
          </main>
        </section>
      </>
    );
  }