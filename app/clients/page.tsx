"use client";

import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
import InstaSection from "@/components/InstaSection";
import ServicesSection from "@/components/ServicesSection";
import HeroImage from "@/public/pictures/JMAI -220.jpg";
import { lato, latoLite, oswald } from "../fonts";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { ArrowRightHeroIcon } from "../icons";

const clients = [
    "CAHSMUN", 
    "VANCOUVER COLLEGE ATHLETICS", 
    "VANCOUVER COLLEGE VARSITY BASKETBALL", 
    "RICHMOND RAIDERS FOOTBALL", 
    "BC SCHOOL SPORTS"
];

const testimonials = [
    {
        testimonial: "As Under-Secretary-General Marketing for Canadian High Schools Model United Nations (CAHSMUN) 2024, I had the pleasure of working with Johnson Mai, who played a vital role as one of our photographers. Johnson consistently demonstrated a keen artistic eye, capturing the energy and essence of our conference with professionalism and creativity. Beyond his technical skill, Johnson was incredibly reliable, meeting tight deadlines while adapting seamlessly to the fast-paced nature of the conference. His dedication to the media team was evident in every aspect of his work, from meticulous planning to his commitment to delivering high-quality content. Johnson’s contributions were invaluable."
    },
];

const Home = () => {
    const [curSlide, setCurSlide] = useState(0);

    const prevSlide = () => {
        if (testimonials.length <= 1) return;
        setCurSlide(curSlide === 0 ? testimonials.length - 1 : curSlide - 1);
    };

    const nextSlide = () => {
        if (testimonials.length <= 1) return;
        setCurSlide(curSlide === testimonials.length - 1 ? 0 : curSlide + 1);
    };

    return (
        <>
            <HeroImageSection src={HeroImage} width={3889} height={2593} title="Clients" />
            
            <section className="px-12 py-24 text-center" id="clients-section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold tracking-tight uppercase agency">My Clients</h1>
                    <p className={`mt-6 text-lg text-gray-800 ${latoLite.className}`}>
                        I’ve had the privilege of working with incredible clients, capturing their most meaningful moments with authenticity and artistry. 
                        From personal projects to commercial shoots, each collaboration is a story waiting to be told.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
                    {clients.map((client, index) => (
                        <div key={index} className="bg-gray-200 p-6 rounded-md transform hover:scale-105 transition">
                            <p className={`text-2xl font-semibold text-gray-800 ${oswald.className}`}>{client}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="testimonials-section" className="px-20 py-20 bg-gray-50">
                <h1 className="text-3xl font-bold tracking-tight uppercase agency text-center">{`Testimonial${testimonials.length > 1 ? "s" : ""}`}</h1>
                <div className="flex items-center justify-center mt-10">
                    {testimonials.length > 1 ?
                    <button className="hover:scale-110 transition ease-in-out hover:cursor-pointer pr-20" onClick={prevSlide}>
                        <ArrowRightHeroIcon className="w-8 h-8 rotate-180" />
                    </button>
                    :
                    <></>
                    }
                    <div className="max-w-3xl mx-6 bg-white p-8 shadow-md rounded-md">
                        <p className={`text-lg text-gray-800 italic ${lato.className}`}>
                            {testimonials[curSlide].testimonial}
                        </p>
                    </div>
                    {testimonials.length > 1 ?
                    <button className="hover:scale-110 transition ease-in-out hover:cursor-pointer pl-20" onClick={nextSlide}>
                        <ArrowRightHeroIcon className="w-8 h-8" />
                    </button>
                    :
                    <></>
                    }
                </div>
                {testimonials.length > 1 ?
                <div className="flex gap-2 justify-center mt-6">
                    {testimonials.map((_, i) => (
                        <div className={`rounded-full h-3 w-3 ${curSlide === i ? "bg-gray-500" : "bg-gray-300"}`} key={i}></div>
                    ))}
                </div>
                :
                <></>
                }
            </section>

            <ServicesSection />
            <ContactSection />
            <InstaSection />
        </>
    );
};

export default Home;
