"use client";

import { FC, useEffect, useState } from "react";
import { lato, latoLite, oswald } from "@/app/fonts";
import Service from "@/types/Service";
import { services } from "@/lib/services";
import { getUniqueRandomNumbers } from "@/lib/num";
import Link from "next/link";
import CustomImage from "../CustomImage";
import { motion, Variants } from "framer-motion";

interface Props {}

// Heading condenses in from wide tracking, paragraph settles in just behind it, then the
// card grid assembles as its own staggered group with alternating spring/tilt per card --
// three distinct stages instead of one shared opacity/x block reused verbatim across the site.
const headingGroupVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.05, staggerChildren: 0.18 },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, x: -60, letterSpacing: "0.3em" },
    visible: {
        opacity: 1,
        x: 0,
        letterSpacing: "0em",
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
};

const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const cardGridVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.1, staggerChildren: 0.14 },
    },
};

const cardVariants = (i: number): Variants => ({
    hidden: { opacity: 0, y: 90, rotate: i % 2 === 0 ? -3 : 3 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.9 },
    },
});

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.94 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 150, damping: 17, mass: 0.85 },
    },
};

const ServicesSection: FC = () => {

    const [servicesShort, setServicesShort] = useState<Service[]>([]);

    useEffect(() => {
        const randomIndexes = getUniqueRandomNumbers(3, services.length);
        setServicesShort(randomIndexes.map(index => services[index - 1]));
    }, []);

    return (
        <section id="services-section" className="grid pt-10 border-t-2 border-black">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={headingGroupVariants}
            >
                <div className="px-6 sm:px-20 pt-10 pb-20">
                    <motion.h1 variants={headingVariants} className="text-4xl agency mb-5">Services Offered</motion.h1>
                    <motion.p variants={paragraphVariants}>
                        My services are designed to capture, create, and enhance your visual presence...
                    </motion.p>
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardGridVariants}
                className="grid grid-flow-row sm:grid-flow-col sm:grid-cols-3 gap-6 px-6"
                id="services-grid"
            >
                {servicesShort.map((service, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants(i)}
                        className="group relative overflow-hidden rounded-lg shadow-lg"
                    >
                        <motion.div
                            className="h-full w-full"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <CustomImage
                                loading="eager"
                                src={service.imageSrc}
                                alt={service.title}
                                className="object-cover h-full"
                            />
                        </motion.div>
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-5">
                            <h2 className="text-3xl text-white agency">
                                <Link href="/services">
                                    <h1 className="transition duration-300 relative">
                                        {service.title}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"></span>
                                    </h1>
                                </Link>
                            </h2>
                            <p className="text-md text-gray-300 mt-2">{service.captcha}</p>
                        </div>
                        <div className="absolute inset-0 bg-black opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 pointer-events-none" />
                    </motion.div>
            ))}
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={buttonVariants}
                className="pl-6 pr-6 sm:pl-20 sm:pr-15 py-10 grid place-items-center"
            >
                <Link
                    href="/services"
                    className="group relative inline-flex items-center justify-center sm:px-26 px-16 py-6 rounded-sm border border-black/25"
                >
                    {/* Focus-bracket corners -- a camera viewfinder locking on, distinct from the
                        fill-sweep and ink-blot mechanics used elsewhere on this shift. */}
                    <span aria-hidden className="pointer-events-none absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-black opacity-0 -translate-x-1 -translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span aria-hidden className="pointer-events-none absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-black opacity-0 translate-x-1 -translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span aria-hidden className="pointer-events-none absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-black opacity-0 -translate-x-1 translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span aria-hidden className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-black opacity-0 translate-x-1 translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <span className="relative z-10 flex gap-3 transition-all duration-300 group-hover:tracking-wider">
                        <span className="w-max">More Services</span>
                    </span>
                </Link>
            </motion.div>
        </section>
    );
};

export default ServicesSection;
