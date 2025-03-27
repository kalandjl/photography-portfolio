"use client"
import { motion } from "framer-motion"
import Image from "next/image";
import Nav from "@/components/Nav";
import HeroImage from "@/public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png"
import BarrierImage from "@/public/pictures/about/Jmai.png"
import { lato, latoLite, nunito, oswald } from "../fonts";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import InstaSection from "@/components/InstaSection";
import PortfolioSection from "@/components/PortfolioSection";
import ActionSection from "@/components/ActionSection";
import HeroImageSection from "@/components/HeroImageSection";
import BarrierImageSection from "@/components/BarrierImageSection";
import ServicesSection from "@/components/ServicesSection";

const Home = () => {

    let aboutListTextStyle = `text-lg md:text-xl max-w-prose text-left ${nunito.className}`

    return (
        <>

            <HeroImageSection src={HeroImage} height={7008} width={4672} title="About" imageTop={true} />

            <section id="about-section-1" className="grid grid-cols-1 md:grid-cols-7 py-32">
                {/* Fullscreen Image */}
                <div id="image-container" className="relative h-screen md:col-span-0 overflow-hidden hidden">
                        <motion.div
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="w-full h-full"
                        >
                            <Image 
                                src={HeroImage} 
                                alt="hero pic"
                                layout="fill"
                                objectFit="cover"
                                className="absolute top-0"
                                priority
                            />
                        </motion.div>
                </div>


                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-7">
                    <h1 className={`${latoLite.className} text-black text-5xl md:text-6xl mb-6`}>
                        Hi, I'm <span className={`${lato.className}`}>Johnson Mai</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-prose">
                    I’m Johnson Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.

                   </p>
                </div>
            </section>
            <BarrierImageSection src={BarrierImage} imageTop={true} barrierHeight={96} />

            <section id="about-section-2" className="grid py-20">

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
            </section>

            <ServicesSection />

            <ActionSection links={[
                {
                title: "My Photos",
                link: "/portfolio",
                }, {
                title: "Contact Me",
                link: "/contact",
                }
            ]} />
            
            <PortfolioSection />

            <InstaSection />


        </>
    );
};

export default Home;

       