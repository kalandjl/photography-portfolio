import { FC } from "react";
import HeroImage from "@/public/images/sections/VC FB Finals-010.jpg"
import { lato, latoLite } from "@/app/fonts";
import Link from "next/link";
import CustomImage from "../CustomImage";
import { motion, Variants } from "framer-motion";

interface Props {


}

// Image settles first (slow zoom-out + fade), overlay darkens in behind it,
// then heading and button follow with their own later, springier timing.
const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.12 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
    },
};

const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 0.7,
        transition: { duration: 1, ease: "easeOut", delay: 0.15 },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.55 },
    },
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.94 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 17, mass: 0.9, delay: 0.78 },
    },
};

const ContactSection: FC<Props> = (props) => {

    return (
        <>
          <div
            className="relative overflow-hidden rounded-lg shadow-lg"
            >
            <section id="contact-section" className="md:h-128 sm:h-96 h-64">
                <div id="image-wrap" className="overflow-hidden h-full relative">

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={imageVariants}
                        className="h-full w-full"
                        >
                        <CustomImage src={HeroImage} height={6039} width={4025} alt="hero image" className="object-cover" />
                    </motion.div>
                    {/* Overlay section */}
                    <div className="inset-0 absolute">
                        <div className="relative h-full">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={overlayVariants}
                                className="bg-black absolute inset-0 z-0"
                                ></motion.div>
                            <div id="main-section" className="flex h-full pt-10 md:pt-0">
                                <div id="text-wrap" className="h-full w-min px-20 grid place-items-center z-10 pb-20">
                                    <div className="grid gap-10">
                                        <motion.p
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.2 }}
                                            variants={headingVariants}
                                            className={`text-white ${lato.className} w-max lg:text-5xl md:text-4xl sm:text-3xl text-2xl z-10`}
                                            >Let's Get In Touch</motion.p>
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.2 }}
                                            variants={buttonVariants}
                                            className="w-max"
                                            >
                                            <Link href="/contact" className="group relative inline-flex items-center overflow-hidden rounded-sm border border-white/80 px-4 md:px-8 md:py-5 py-2 z-10">
                                                <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"></span>
                                                <p className={`relative z-10 w-max md:text-xl text-sm text-white tracking-normal transition-all duration-500 ease-out group-hover:text-black group-hover:tracking-wider ${latoLite.className}`}>
                                                    Contact Me
                                                </p>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </>
    )
}

export default ContactSection