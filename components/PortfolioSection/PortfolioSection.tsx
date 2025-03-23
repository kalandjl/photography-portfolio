import { FC } from "react";
import HeroImage from "@/public/pictures/JMAI -001.jpg"
import CardImage1 from "@/public/pictures/DSC01374.jpg"
import CardImage2 from "@/public/pictures/_DSC6971.jpg"
import Image from "next/image";
import { lato, latoLite } from "@/app/fonts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"
import GalleryCard from "./GalleryCard";

interface Props {

}

const PortfolioSection: FC<Props> = (props) => {

    return (
        <>
            <section id="portfolio-section" className="h-128 mt-10 grid grid-cols-3 grid-flow-col">
                <div id="image-wrap" className="overflow-hidden h-full relative">
                    <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-full h-full">
                        <Image src={HeroImage} height={6039} width={4025} alt="hero image" className="object-cover h-full hover:scale-105" /> 
                    </motion.div>
                    {/* Overlay section */}
                    <div className="inset-0 absolute">
                        <div className="relative h-full">
                            <div className="bg-black opacity-70 absolute inset-0 z-0"></div>
                            <div id="main-section" className="flex h-full">
                                <div id="text-wrap" className="h-full w-min px-20 grid place-items-center z-10 pb-20">
                                    <div className="grid gap-10">
                                        <p className={`text-white ${lato.className} w-max text-3xl opacity-100 z-10`}>Check Out My Work</p>
                                        <Link href="/portfolio" className="flex gap-2 transition duration-300 relative group w-min">
                                            <p className={`w-max ${latoLite.className} text-white text-xl hover:text-gray-200`}>Portfolio
                                            </p>
                                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>

                                            <ArrowRight stroke="#ffffff" className="mt-1"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GalleryCard src={CardImage1} width={3902} height={6155} link="/portfolio/sports" title="Sports" />
                <GalleryCard src={CardImage2} width={7008} height={4672} link="/portfolio/graphics" title="Graphics" />
            </section>
        </>
    )
}

export default PortfolioSection