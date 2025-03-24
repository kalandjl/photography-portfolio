"use client"
import { motion } from "framer-motion"
import Image from "next/image";
import HeroPic from "../../public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png";
import Nav from "@/components/Nav";
import HeroImage from "@/public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png"
import BarrierImage from "@/public/pictures/_DSC6639.jpg"
import { lato, nunito, oswald } from "../fonts";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import InstaSection from "@/components/InstaSection";
import PortfolioSection from "@/components/PortfolioSection";

const Home = () => {

    let aboutListTextStyle = `text-lg md:text-xl max-w-prose text-left ${nunito.className}`

    return (
        <>

            <section id="hero-section">
                <section className="h-screen relative">
                    <div className="bg-black opacity-70 w-full h-full absolute z-10"></div>
                    <div className="relative w-full h-full">
                        <Image src={HeroImage} height={7008} width={4672} alt="hero image" 
                        className="absolute w-full h-full object-cover object-top top-0"/>
                    </div>
                </section>

                {/* Overlay Section */}
                <section className="z-10 absolute top-0 w-full h-screen">
                    <Nav />
                    <main className="px-32 grid place-items-center relative h-full">
                        <div id="header-wrap" className="h-96">
                        <h1 className="font-bold text-4xl px-10 py-5 text-white">About Me</h1>
                        </div>
                        <div id="arrow" className="absolute bottom-0 h-20 mb-16 grid place-items-center">
                            <ArrowDown stroke="#ffffff" className="h-12 w-8 animate-bounce" />
                        </div>
                    </main>
                </section>
            </section>
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
                                src={HeroPic} 
                                alt="hero pic"
                                layout="fill"
                                objectFit="cover"
                                priority
                            />
                        </motion.div>
                </div>


                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-7">
                    <h1 className={`${lato.className} text-black text-5xl md:text-6xl mb-6`}>
                        Hi, I'm Johnson Mai
                    </h1>
                    <p className="text-lg md:text-xl max-w-prose">
                    I’m Johnson Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.

                   </p>
                </div>
            </section>
            <section id="image-barrier-section" className="w-full h-64">
                <div id="image-container" className="relative h-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1 }}
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="w-full h-full"
                    >
                        <Image 
                            src={BarrierImage} 
                            alt="hero pic"
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </motion.div>
                    {/* Opacity overlay */}
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>
            </section>
            <section id="about-section-2" className="grid py-20">

                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-4">
                    <h1 className={`${lato.className} text-black text-2xl md:text-3xl mb-6`}>
                        What Sets Me Apart?
                    </h1>
                    <div id="list" className="grid gap-6">
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}> - A Storytelling Approach:</span> I don’t just take photos; I capture emotions, movement, and meaning. Every shot is intentional, bringing out the raw energy of the moment.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}> - Athlete’s Perspective:</span> As a football player and sports enthusiast, I understand the pace, angles, and emotions behind every play. This allows me to anticipate key moments and frame them in ways that truly represent the game.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}> - Versatile & Detail-Oriented:</span> From high-speed action shots to cinematic brand visuals, I adapt my style to fit the vision of each project. Whether it’s a fast-paced sports event or a polished media day shoot, I bring a high level of precision and creativity.
                        </p>
                        <p className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}> - Social Media Strategy:</span> In today’s digital world, content isn’t just about looking good—it’s about engagement. I help athletes, businesses, and brands create visuals that stand out and drive results on social media. 
                        </p>
                    </div>
                </div>
            </section>
            <section id="action-section" className="h-96 bg-gray-100 flex flex-col justify-center items-center text-center px-6">
                <h1 className={`text-4xl font-bold text-gray-900 mb-8 ${lato.className}`}>
                    Ready to Get Started?
                </h1>

                <div id="links" className="flex items-center gap-12">
                    <Link href="/portfolio" className="text-xl font-medium text-gray-800 hover:text-gray-600 transition duration-300 relative group">
                        My Photos
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <div className="w-[2px] h-12 bg-gray-400"></div>

                    <Link href="/contact" className="text-xl font-medium text-gray-800 hover:text-gray-600 transition duration-300 relative group">
                        Contact me 
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>
            </section>
            
            <PortfolioSection />

            <InstaSection />


        </>
    );
};

export default Home;

       