"use client";

import { FC, useEffect, useState } from "react";
import { lato, latoLite, oswald } from "@/app/fonts";
import Service from "@/types/Service";
import { services } from "@/lib/services";
import { getUniqueRandomNumbers } from "@/lib/num";
import Link from "next/link";
import CustomImage from "../CustomImage";
import { motion } from "framer-motion";

interface Props {}

const ServicesSection: FC = () => {

    const [servicesShort, setServicesShort] = useState<Service[]>([]);

    useEffect(() => {
        const randomIndexes = getUniqueRandomNumbers(3, services.length);
        setServicesShort(randomIndexes.map(index => services[index - 1]));
    }, []);

    return (
        <section id="services-section" className="grid pt-10 border-t-2 border-black">
            <motion.div
            initial={{ opacity: 0, x: -300 }} // Start below the view (50px down) and hidden (opacity 0)
            whileInView={{ opacity: 1, x: 0 }} // Animate to the original position and opacity 1
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
            transition={{ duration: 1 }} // Set the duration for the fly-in effect
            >
                <div className="px-6 sm:px-20 pt-10 pb-20">
                    <h1 className="text-4xl agency mb-5">Services Offered</h1>
                    <p>
                        My services are designed to capture, create, and enhance your visual presence...
                    </p>
                </div>
            </motion.div>
            <div className="grid grid-flow-row sm:grid-flow-col sm:grid-cols-3 gap-6 px-6" id="services-grid">
                {servicesShort.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 150 }} // Start below the view (50px down) and hidden (opacity 0)
                        whileInView={{ opacity: 1, y: 0 }} // Animate to the original position and opacity 1
                        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
                        transition={{ duration: 1 }} // Set the duration for the fly-in effect
                        className="relative overflow-hidden rounded-lg shadow-lg"
                    >
                        <CustomImage
                            loading="eager"
                            src={service.imageSrc}
                            alt={service.title}
                            className="object-cover h-full transition ease-in-out"
                        />
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-5">
                            <h2 className="text-3xl text-white agency">
                                <Link href="/services">
                                    <h1 className="transition duration-300 relative group">
                                        {service.title}
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
                                    </h1>
                                </Link>
                            </h2>
                            <p className="text-md text-gray-300 mt-2">{service.captcha}</p>
                        </div>
                        <div className="absolute inset-0 bg-black opacity-70" />
                    </motion.div>
            ))}
            </div>

            <motion.div
            initial={{ opacity: 0, y: 150 }} // Start below the view (50px down) and hidden (opacity 0)
            whileInView={{ opacity: 1, y: 0 }} // Animate to the original position and opacity 1
            viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is visible
            transition={{ duration: 1 }}
            className="pl-6 pr-6 sm:pl-20 sm:pr-15 py-10 grid place-items-center"
            >
                <Link href="/services">
                    <button className="sm:px-26 px-16 py-6 rounded-md border-1 border-black hover:scale-105 transition hover:cursor-pointer hover:bg-gray-100">
                        <span className="flex gap-3">
                            <span className="w-max">More Services</span>
                        </span>
                    </button>
                </Link>
            </motion.div>
        </section>
    );
};

export default ServicesSection;
