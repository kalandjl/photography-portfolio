import { lato, nunito } from "@/app/fonts";
import Image from "next/image";
import { FC } from "react";
import HeroImage from "@/public/images/about/Untitled-2.jpeg"
import Link from "next/link";
import { motion, Variants } from "framer-motion"

interface Props {

}

// Heading leads on a blurred quint-ease rise, paragraph settles in behind it on a softer
// ease with its own delay, button arrives last on a spring -- three distinct stages instead
// of one shared opacity/x block.
const textGroupVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.22,
        },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, x: 90, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
};

const paragraphVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: "easeOut" },
    },
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 160, damping: 18, mass: 0.8 },
    },
};

const AboutMeSection: FC<Props> = (props) => {

    return (   
        <section id="about-me-section" className="grid grid-cols-1 md:grid-cols-5 sm:grid-flow-col sm:h-160">
            <div id="image-wrap" className="col-span-2 sm:h-full overflow-hidden h-96">
                <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative w-full h-full">
                    <Image src={HeroImage} alt="about me photo"
                    fill
                    quality={75}
                    loading="eager"
                    className="object-cover h-full object-top" />
                </motion.div>
            </div>
            <div id="text-wrap" className="sm:col-span-3 px-10 sm:px-20 grid place-items-center pb-16">
                <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={textGroupVariants}
                >
                    <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-7 mt-10">
                        <motion.h1 variants={headingVariants} className={`americain text-black text-3xl md:text-4xl mb-6`}>
                            Hi, I'm John Mai
                        </motion.h1>
                        <motion.p variants={paragraphVariants} className={`md:text-xl max-w-prose agency ${nunito.className}`}>
                        I’m John Mai, a photographer, content creator, and social media strategist based in Burnaby, BC. My passion lies in capturing authentic moments—whether it’s the intensity of a sports game, the energy of a live event, or the personality behind a brand. With a background in sports media and content creation, I specialize in telling stories through powerful visuals that leave a lasting impact.

                        </motion.p>
                    </div>
                    <motion.div variants={buttonVariants} id="button-wrap" className="grid place-items-center mt-5">
                        <Link href="/about" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-black/80 px-8 py-5">
                            <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[30]"></span>
                            <span className={`${lato.className} relative z-10 text-black transition-colors duration-300 delay-200 group-hover:text-white`}>See more</span>
                            <span aria-hidden className="relative z-10 inline-block text-black transition-all duration-300 delay-200 group-hover:translate-x-1 group-hover:text-white">&rarr;</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutMeSection