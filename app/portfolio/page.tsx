"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Expand } from "lucide-react";
import InstaSection from "@/components/InstaSection";
import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
import CustomImage from "@/components/CustomImage";
import HeroImage from "../../public/pictures/_DSC6971.jpg";
import { nunito, oswald } from "../fonts";

const portfolioSections = [
    {
        id: "sports",
        title: "Sports",
        description: "Capturing the intensity and emotion of sports like hockey, basketball, football, and more.",
        image: "/pictures/_DSC2941.jpg",
        link: "/portfolio/sports"
    },
    {
        id: "portraits",
        title: "Portraits",
        description: "Highlighting individuality and expression through carefully composed portrait photography.",
        image: "/portraits/JMAI LAX MEDIA DAY-26.jpg",
        link: "/portfolio/portraits"
    },
    {
        id: "graphics",
        title: "Graphics",
        description: "Creating dynamic visuals for game days, athlete commitments, and other sports-related designs.",
        image: "/graphics/Nathan Lowden Queens Commit Final.jpg",
        link: "/portfolio/graphics"
    }
];

const Home = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedImage) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedImage]);

    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portfolio" />

            <main id="portfolio-links">
                {portfolioSections.map(({ id, title, description, image, link }, index) => {
                    const isReversed = index % 2 !== 0;

                    const thumbnail = (
                        <>
                            <CustomImage
                                src={image}
                                width={6671}
                                height={4447}
                                alt={title}
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="pointer-events-none absolute left-4 bottom-4 w-9 h-9 rounded-full bg-white/95 grid place-items-center opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-y-0">
                                <Expand className="w-4 h-4" />
                            </div>
                        </>
                    );

                    return (
                        <div key={id}>
                            {/* Desktop View */}
                            <section className="hidden sm:grid grid-cols-5 sm:h-144 h-64">
                                {!isReversed && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 1 }}
                                        className="group relative col-span-3 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        {thumbnail}
                                    </motion.div>
                                )}

                                <div className="col-span-2 grid place-items-center">
                                    <div className="grid place-items-center">
                                        <Link
                                            href={link}
                                            className="group grid place-items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black/40"
                                        >
                                            <div className="grid grid-flow-col gap-4 px-10 items-center">
                                                <div className="grid">
                                                    <h1 className={`${oswald.className} md:text-5xl text-2xl text-center relative inline-block`}>
                                                        {title}
                                                        <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"></span>
                                                    </h1>
                                                    <p className={`sm:text-md text-sm text-center ${nunito.className} mt-6`}>
                                                        {description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-9 h-9 sm:block hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {isReversed && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 1 }}
                                        className="group relative col-span-3 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        {thumbnail}
                                    </motion.div>
                                )}
                            </section>

                            {/* Mobile View */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1 }}
                                className="flex flex-col sm:grid-cols-2 items-center gap-8 sm:hidden"
                            >
                                <section key={`${id}-mobile`} id={`${id}-hero`}>
                                    {/* Text & Link: Mobile (Below Image) */}
                                    <div className="text-center sm:text-left px-6 py-5">
                                        <Link href={link} className="group block">
                                            <h1 className={`${oswald.className} text-3xl sm:text-5xl`}>
                                                {title}
                                            </h1>
                                            <p className={`mt-5 text-sm sm:text-md ${nunito.className}`}>{description}</p>
                                            <div className="relative inline-flex justify-center sm:justify-start items-center gap-2 mt-4 w-min">
                                                <span className="flex gap-2 whitespace-nowrap">
                                                    <p>Link</p>
                                                    <ArrowRight className="transition-transform duration-300 group-active:translate-x-1" />
                                                </span>
                                                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black/30"></span>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Image: Mobile (Tappable for Enlargement) */}
                                    <div className="relative w-full overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileInView={{ scale: 1.02 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            className="relative w-full h-full"
                                        >
                                            <CustomImage
                                                src={image}
                                                width={6671}
                                                height={4447}
                                                alt={title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </motion.div>
                                        <div className="pointer-events-none absolute right-3 bottom-3 w-8 h-8 rounded-full bg-white/90 grid place-items-center">
                                            <Expand className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        </div>
                    );
                })}
            </main>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Plain img, not next/image: selectedImage is a bare path with no known
                                intrinsic size, and next/image's required width/height would force
                                every portrait-oriented category thumbnail into a fixed 3:2 box,
                                visibly stretching it. object-contain + a bounded box preserves the
                                real aspect ratio instead, matching the gallery's own lightbox. */}
                            <img
                                src={selectedImage}
                                alt="Enlarged image"
                                className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                aria-label="Close enlarged image"
                                className="absolute top-3 right-3 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContactSection />
            <InstaSection />
        </>
    );
};

export default Home;
