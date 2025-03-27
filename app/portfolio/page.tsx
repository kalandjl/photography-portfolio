"use client"

import { motion } from "framer-motion"
import Nav from "@/components/Nav"
import Image from "next/image"
import HeroImage from "../../public/pictures/_DSC6971.jpg"
import SportsImage from "../../public/pictures/_DSC2941.jpg"
import GraphicsImage from "../../public/graphics/Nathan Lowden Queens Commit Final.jpg"
import { lato, nunito, oswald } from "../fonts"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import InstaSection from "@/components/InstaSection"
import ContactSection from "@/components/ContactSection"
import HeroImageSection from "@/components/HeroImageSection"

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portfolio" />

            {/* Portfolio Links */}
            <main id="portfolio-links">
                <section id="sports-hero" className="grid grid-cols-5 sm:h-144 h-96">
                    {/* Fixed Frame, Zooming Image */}
                    <div id="image-wrap" className="col-span-3 overflow-hidden">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="w-full h-full"
                        >
                            <Image src={SportsImage} width={6671} height={4447} alt="" className="w-full h-full object-cover"/>
                        </motion.div>
                    </div>

                    <div id="link-wrap" className="col-span-2 grid place-items-center">
                        <div className="grid place-items-center">
                            <Link href="/portfolio/sports" className="hover:scale-105 transition ease-in-out">
                                <div className="grid grid-flow-col gap-4">
                                    <div className="grid">
                                        <h1 className={`${oswald.className} md:text-5xl text-2xl text-center underline sm:no-underline`}>Sports</h1>
                                        <div className="mt-6"></div>
                                        <p className={`sm:text-md text-sm text-center ${nunito.className}`}>
                                            Hockey, Basketball, Football, and more!
                                        </p>
                                    </div>
                                    <div id="icon-wrap" className="grid h-full place-items-center">
                                        <ArrowRight className="w-9 h-9 sm:block hidden" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="graphics-hero" className="grid grid-cols-5 sm:h-144 h-96">
                    <div id="link-wrap" className="col-span-2 grid place-items-center">
                        <div className="grid place-items-center">
                            <Link href="/portfolio/graphics" className="hover:scale-105 transition ease-in-out">
                                <div className="grid grid-flow-col gap-4">
                                <div className="grid">
                                        <h1 className={`${oswald.className} md:text-5xl text-2xl text-center underline sm:no-underline`}>Graphics</h1>
                                        <div className="mt-6"></div>
                                        <p className={`sm:text-md text-sm text-center ${nunito.className}`}>
                                            Game Day, Athlete Commits
                                        </p>
                                    </div>
                                    <div id="icon-wrap" className="grid h-full place-items-center">
                                        <ArrowRight className="w-9 h-9 sm:block hidden" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Fixed Frame, Zooming Image */}
                    <div id="image-wrap" className="col-span-3 overflow-hidden">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-full h-full"
                        >
                            <Image src={GraphicsImage} width={6671} height={4447} alt="" className="w-full h-full object-cover"/>
                        </motion.div>
                    </div>
                </section>
                <ContactSection />
                <InstaSection />
            </main>
        </>
    )
}

export default Home
