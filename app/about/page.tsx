"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import AboutImage from "@/public/images/about/Untitled-2.jpeg";
import AboutImage2 from "@/public/images/about/about_me_photo.jpeg"
import Nav from "@/components/Nav";
import HeroImage from "@/public/images/about/Screenshot 2025-03-13 at 9.27.54 PM.png";
import BarrierImage from "@/public/images/about/Jmai.png";
import { lato, latoLite, nunito, oswald } from "../fonts";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import InstaSection from "@/components/InstaSection";
import PortfolioSection from "@/components/PortfolioSection";
import ActionSection from "@/components/ActionSection";
import HeroImageSection from "@/components/HeroImageSection";
import BarrierImageSection from "@/components/BarrierImageSection";
import ServicesSection from "@/components/ServicesSection";

// Section 1 lead-in: the portrait settles first -- an editorial "photo developing" cue,
// grayscale resolving to full color as it drops into place -- then the heading/paragraph
// column follows as a second beat. Checked against everything shipped tonight: not the
// blur-resolve on Contact/ActionSection/AboutMe (no filter:blur here), not the per-char
// clip/translate mask on the homepage masthead (no overflow-clip + vertical mask), not the
// letter-spacing collapse on testimonials/ServicesSection (no letterSpacing keyframe), and not
// InstaSection's clip-path curtain wipe (no clip-path at all) -- this leans on grayscale/contrast
// + scale/y on a custom expo-out ease instead.
const section1Variants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.05, staggerChildren: 0.3 },
    },
};

const section1ImageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.12, y: 30, filter: "grayscale(1) contrast(1.2)" },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "grayscale(0) contrast(1)",
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
};

// Text column is its own stagger group so the heading settles first and the paragraph rises
// in behind it, instead of both firing on the same independent viewport trigger.
const section1TextVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.1, staggerChildren: 0.16 },
    },
};

// Heading reads as two beats tipping up out of a 3D fold (perspective + rotateX on each span),
// not the vertical mask-clip used on the homepage masthead. "Hi, I'm" settles on a tighter
// spring; "John Mai" follows a beat later with more bounce, like a name landing with a flourish.
const heroWordVariants: Variants = {
    hidden: { opacity: 0, rotateX: -75, y: 14 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { type: "spring", stiffness: 130, damping: 15, mass: 0.9 },
    },
};

const heroNameVariants: Variants = {
    hidden: { opacity: 0, rotateX: -75, y: 14 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transition: { type: "spring", stiffness: 110, damping: 11, mass: 0.95 },
    },
};

const section1ParagraphVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
};

// Section 2 mirrors the layout (text-left, image-right) and mirrors the choreography order
// too: text leads this time -- heading presses down into place, the four-item list cascades in
// beneath it -- and the portrait settles in after, on a heavier spring with a slight tilt, like
// a print being set down. Deliberately not the grayscale-develop used for the first portrait, so
// the two sections read as composed rather than templated twice.
const section2Variants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.05, staggerChildren: 0.35 },
    },
};

const section2TextVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.05, staggerChildren: 0.12 },
    },
};

const section2HeadingVariants: Variants = {
    hidden: { opacity: 0, y: -14, scale: 1.06 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const section2ItemVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const section2ImageVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotate: 4, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 90, damping: 16, mass: 1 },
    },
};

const Home = () => {
    let aboutListTextStyle = `text-lg md:text-xl max-w-prose text-left ${nunito.className}`;

    return (
        <>
            <HeroImageSection src={HeroImage} height={7008} width={4672} title="About" imageTop={true} />
            <motion.section
                id="about-section-1"
                className="grid grid-cols-1 md:grid-cols-7 py-32 px-6 md:px-20 gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={section1Variants}
            >

                {/* About Image 2 */}
                <motion.div
                    variants={section1ImageVariants}
                    className="flex justify-center md:justify-end md:col-span-3"
                >
                    <Image
                        src={AboutImage2}
                        alt="John Mai"
                        width={500}
                        height={720}
                        className="rounded-sm shadow-lg"
                    />
                </motion.div>

                <motion.div
                    variants={section1TextVariants}
                    className="flex flex-col justify-center items-center text-center md:items-start md:text-left md:col-span-4"
                >
                    <div id="about-text">
                        <h1 style={{ perspective: 800 }} className={`${latoLite.className} text-black text-5xl md:text-6xl mb-6`}>
                            <motion.span variants={heroWordVariants} className="inline-block">Hi, I'm</motion.span>{" "}<motion.span variants={heroNameVariants} className={`inline-block ${lato.className}`}>John Mai</motion.span>
                        </h1>
                        <motion.p variants={section1ParagraphVariants} className="text-lg md:text-xl max-w-prose">
                            I’m John Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.
                        </motion.p>
                    </div>
                </motion.div>

            </motion.section>

            <BarrierImageSection src={BarrierImage} imageTop={true} barrierHeight={96} />

            {/* About Section 2 - Added AboutImage */}
            <motion.section
                id="about-section-2"
                className="grid grid-cols-1 md:grid-cols-2 py-20 gap-12 px-6 md:px-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={section2Variants}
            >
                {/* Text Section */}
                <motion.div
                    variants={section2TextVariants}
                    className="flex flex-col justify-center text-center md:text-left"
                >
                    <motion.h1 variants={section2HeadingVariants} className={`${lato.className} text-black text-2xl md:text-3xl mb-6`}>
                        What Sets Me Apart?
                    </motion.h1>
                    <div id="list" className="grid gap-6">
                        <motion.p variants={section2ItemVariants} className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>A Storytelling Approach:</span> I don’t just take photos; I capture emotions, movement, and meaning. Every shot is intentional, bringing out the raw energy of the moment.
                        </motion.p>
                        <motion.p variants={section2ItemVariants} className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Athlete’s Perspective:</span> As a football player and sports enthusiast, I understand the pace, angles, and emotions behind every play. This allows me to anticipate key moments and frame them in ways that truly represent the game.
                        </motion.p>
                        <motion.p variants={section2ItemVariants} className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Versatile & Detail-Oriented:</span> From high-speed action shots to cinematic brand visuals, I adapt my style to fit the vision of each project. Whether it’s a fast-paced sports event or a polished media day shoot, I bring a high level of precision and creativity.
                        </motion.p>
                        <motion.p variants={section2ItemVariants} className={aboutListTextStyle}>
                            <span className={`font-semibold ${lato.className}`}>Social Media Strategy:</span> In today’s digital world, content isn’t just about looking good—it’s about engagement. I help athletes, businesses, and brands create visuals that stand out and drive results on social media.
                        </motion.p>
                    </div>
                </motion.div>

                {/* About Image Section */}
                <motion.div
                    variants={section2ImageVariants}
                    className="flex justify-center md:justify-end"
                >
                    <Image
                        src={AboutImage}
                        alt="John Mai"
                        width={500}
                        height={750}
                        className="rounded-sm shadow-lg"
                    />
                </motion.div>
            </motion.section>

            <ServicesSection />

            <ActionSection links={[
                {
                    title: "My Photos",
                    link: "/portfolio",
                },
                {
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
