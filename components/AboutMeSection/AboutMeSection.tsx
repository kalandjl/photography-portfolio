import { lato } from "@/app/fonts";
import Image from "next/image";
import { FC } from "react";
import HeroImage from "@/public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png"
import Link from "next/link";
import { motion } from "framer-motion"

interface Props {
    
}

const AboutMeSection: FC<Props> = (props) => {

    return (   
        <section id="about-me-section" className="grid grid-cols-5 grid-flow-col h-128">
            <div id="image-wrap" className="col-span-2 h-full">
                <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full">
                    <Image src={HeroImage} alt="about me photo" 
                    objectFit="cover"
                    className="object-cover h-full" />
                </motion.div>
            </div>
            <div id="text-wrap" className="col-span-3 px-20">
                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-7 mt-10">
                    <h1 className={`${lato.className} text-black text-3xl md:text-4xl mb-6`}>
                        Hi, I'm Johnson Mai
                    </h1>
                    <p className="md:text-xl max-w-prose">
                    I’m Johnson Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.

                    </p>
                </div>
                <div id="button-wrap" className="grid place-items-center mt-5">
                    <Link href="/about">
                        <button className={`${lato.className} rounded-md border-1 border-black px-8 py-5 hover:bg-gray-100 transition ease-in-out hover:scale-105 hover:cursor-pointer`}>See more</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutMeSection