"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import InstaSection from "@/components/InstaSection"
import ContactSection from "@/components/ContactSection"
import HeroImageSection from "@/components/HeroImageSection"
import HeroImage from "../../public/pictures/_DSC6971.jpg"
import { nunito, oswald } from "../fonts"

// Portfolio sections data
const portfolioSections = [
    {
        "id": "sports",
        "title": "Sports",
        "description": "Capturing the intensity and emotion of sports like hockey, basketball, football, and more.",
        "image": "/pictures/_DSC2941.jpg",
        "link": "/portfolio/sports"
    },
    {
        "id": "portraits",
        "title": "Portraits",
        "description": "Highlighting individuality and expression through carefully composed portrait photography.",
        "image": "/portraits/JMAI LAX MEDIA DAY-26.jpg",
        "link": "/portfolio/portraits"
    },
    {
        "id": "graphics",
        "title": "Graphics",
        "description": "Creating dynamic visuals for game days, athlete commitments, and other sports-related designs.",
        "image": "/graphics/Nathan Lowden Queens Commit Final.jpg",
        "link": "/portfolio/graphics"
    }
]


const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portfolio" />

            <main id="portfolio-links">
                {portfolioSections.map(({ id, title, description, image, link }, index) => {
                    const isReversed = index % 2 !== 0 // Alternates layout
                    
                    return (
                        <>
                        <section key={id} id={`${id}-hero`} className="hidden sm:grid grid-cols-5 sm:h-144 h-64">
                            {/* Image (Left if index is even, Right if odd) */}
                            {!isReversed && (
                                <div className="col-span-3 overflow-hidden">
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileInView={{ scale: 1.02 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        className="w-full h-full"
                                    >
                                        <Image src={image} width={6671} height={4447} alt={title} className="w-full h-full object-cover"/>
                                    </motion.div>
                                </div>
                            )}

                            {/* Text & Link */}
                            <div className="col-span-2 grid place-items-center">
                                <div className="grid place-items-center">
                                    <Link href={link} className="hover:scale-105 transition ease-in-out">
                                        <div className="grid grid-flow-col gap-4 px-10">
                                            <div className="grid">
                                                <h1 className={`${oswald.className} md:text-5xl text-2xl text-center underline sm:no-underline`}>{title}</h1>
                                                <div className="mt-6"></div>
                                                <p className={`sm:text-md text-sm text-center ${nunito.className}`}>
                                                    {description}
                                                </p>
                                            </div>
                                            <div id="icon-wrap" className="grid h-full place-items-center">
                                                <ArrowRight className="w-9 h-9 sm:block hidden" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Image (Right if index is odd, Left if even) */}
                            {isReversed && (
                                <div className="col-span-3 overflow-hidden">
                                    <motion.div
                                        initial={{ scale: 1 }}
                                        whileInView={{ scale: 1.02 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        className="w-full h-full"
                                    >
                                        <Image src={image} width={6671} height={4447} alt={title} className="w-full h-full object-cover"/>
                                    </motion.div>
                                </div>
                            )}
                        </section>
                        <section
                            key={id}
                            id={`${id}-hero`}
                            className="flex flex-col sm:grid-cols-2 items-center gap-8 sm:hidden"
                        >

                            {/* Text & Link: Mobile (Below Image), Desktop (Alternating) */}
                            <div className="text-center sm:text-left px-6 py-5">
                                <Link href={link} className="group block hover:scale-105 transition ease-in-out">
                                    <h1 className={`${oswald.className} text-3xl sm:text-5xl underline sm:no-underline`}>
                                        {title}
                                    </h1>
                                    <p className={`mt-5 text-sm sm:text-md ${nunito.className}`}>{description}</p>
                                    <div className="flex justify-center sm:justify-start items-center gap-2 mt-4 text-blue-600">
                                        <span className="flex gap-2"><p>See more</p> <ArrowRight /></span>
                                        <ArrowRight className="w-6 h-6 sm:block hidden group-hover:translate-x-1 transition" />
                                    </div>
                                </Link>
                            </div>
                                                       {/* Image Placement: Mobile (Top), Desktop (Alternating) */}
                                                       <div className={`w-full overflow-hidden ${isReversed ? "sm:order-2" : "sm:order-1"}`}>
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
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        </section>
                        </>
                    )
                })}
                <ContactSection />
                <InstaSection />
            </main>
        </>
    )
}

export default Home
