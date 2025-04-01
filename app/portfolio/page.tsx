"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import InstaSection from "@/components/InstaSection";
import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
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

    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portfolio" />

            <main id="portfolio-links">
                {portfolioSections.map(({ id, title, description, image, link }, index) => {
                    const isReversed = index % 2 !== 0;

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
                                        className="col-span-3 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image}
                                            width={6671}
                                            height={4447}
                                            alt={title}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </motion.div>
                                )}

                                <div className="col-span-2 grid place-items-center">
                                    <div className="grid place-items-center">
                                        <Link href={link} className="hover:scale-105 transition ease-in-out">
                                            <div className="grid grid-flow-col gap-4 px-10">
                                                <div className="grid">
                                                    <h1 className={`${oswald.className} md:text-5xl text-2xl text-center underline sm:no-underline group relative`}>
                                                        {title}
                                                        <span className="absolute left-0 -bottom-1 w-full h-1 grid place-items-center overflow-hidden">
                                                        </span>

                                                    </h1>
                                                    <p className={`sm:text-md text-sm text-center ${nunito.className} mt-6`}>
                                                        {description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-9 h-9 sm:block hidden" />
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
                                        className="col-span-3 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedImage(image)}
                                    >
                                        <Image
                                            src={image}
                                            width={6671}
                                            height={4447}
                                            alt={title}
                                            className="w-full h-full object-cover object-top"
                                        />
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
                                        <Link href={link} className="group block hover:scale-105 transition ease-in-out">
                                            <h1 className={`${oswald.className} text-3xl sm:text-5xl underline sm:no-underline`}>
                                                {title}
                                            </h1>
                                            <p className={`mt-5 text-sm sm:text-md ${nunito.className}`}>{description}</p>
                                            <div className="flex justify-center sm:justify-start items-center gap-2 mt-4 text-blue-600">
                                                <span className="flex gap-2"><p>Link</p><ArrowRight /></span>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Image: Mobile (Tappable for Enlargement) */}
                                    <div className="w-full overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            whileInView={{ scale: 1.02 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            className="w-full h-full"
                                        >
                                            <Image
                                                src={image}
                                                width={6671}
                                                height={4447}
                                                alt={title}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </motion.div>
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
                        >
                            <Image
                                src={selectedImage}
                                width={1000}
                                height={667}
                                alt="Enlarged Image"
                                className="rounded-lg"
                            />
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
