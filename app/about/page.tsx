"use client"
import { motion } from "framer-motion"
import Image from "next/image";
import HeroPic from "../../public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png";
import Nav from "@/components/Nav";
import { lato } from "../fonts";

const Home = () => {

    let aboutListTextStyle = "text-lg md:text-xl max-w-prose text-left"

    return (
        <>
            <Nav theme="dark" />
            <section id="hero-section" className="grid grid-cols-1 md:grid-cols-7 h-screen">
                {/* Fullscreen Image */}
                <div id="image-container" className="relative h-screen md:col-span-3 overflow-hidden">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="w-full h-full"
                        >
                            <Image 
                                src={HeroPic} 
                                alt="hero pic"
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </motion.div>
                </div>

                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-4">
                    <h1 className={`${lato.className} text-black text-5xl md:text-6xl mb-6`}>
                        JMAI.PHOTOS
                    </h1>
                    <p className="text-lg md:text-xl max-w-prose">
                    I’m Johnson Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.

                   </p>
                </div>
            </section>
            <section id="body-section" className="grid grid-cols-1 md:grid-cols-7 h-screen">


                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-4">
                    <h1 className={`${lato.className} text-black text-2xl md:text-3xl mb-6`}>
                        What Sets Me Apart?
                    </h1>
                    <div id="list" className="grid gap-6">
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>A Storytelling Approach:</span> I don’t just take photos; I capture emotions, movement, and meaning. Every shot is intentional, bringing out the raw energy of the moment.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Athlete’s Perspective:</span> As a football player and sports enthusiast, I understand the pace, angles, and emotions behind every play. This allows me to anticipate key moments and frame them in ways that truly represent the game.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Versatile & Detail-Oriented:</span> From high-speed action shots to cinematic brand visuals, I adapt my style to fit the vision of each project. Whether it’s a fast-paced sports event or a polished media day shoot, I bring a high level of precision and creativity.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Social Media Strategy:</span> In today’s digital world, content isn’t just about looking good—it’s about engagement. I help athletes, businesses, and brands create visuals that stand out and drive results on social media. 
                        </p>
                    </div>
                </div>

                {/* Fullscreen Image */}
                <div id="image-container" className="relative h-screen md:col-span-3 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1 }}
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="w-full h-full"
                    >
                        <Image 
                            src={HeroPic} 
                            alt="hero pic"
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;

                {/* What Sets Me Apart? 
                    - A Storytelling Approach – I don’t just take photos; I capture emotions, movement, and meaning. Every shot is intentional, bringing out the raw energy of the moment.

                    - Athlete’s Perspective – As a football player and sports enthusiast, I understand the pace, angles, and emotions behind every play. This allows me to anticipate key moments and frame them in ways that truly represent the game.

                    - Versatile & Detail-Oriented – From high-speed action shots to cinematic brand visuals, I adapt my style to fit the vision of each project. Whether it’s a fast-paced sports event or a polished media day shoot, I bring a high level of precision and creativity.

                    - Social Media Strategy – In today’s digital world, content isn’t just about looking good—it’s about engagement. I help athletes, businesses, and brands create visuals that stand out and drive results on social media. */}
            