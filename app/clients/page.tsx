"use client";

import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
import InstaSection from "@/components/InstaSection";
import ServicesSection from "@/components/ServicesSection";
import HeroImage from "@/public/pictures/JMAI -220.jpg";
import { lato, latoLite, oswald } from "../fonts";
import { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const clients = [
    "CASHMUN", 
    "VANCOUVER COLLEGE ATHLETICS", 
    "VANCOUVER COLLEGE VARSITY BASKETBALL", 
    "RICHMOND RAIDERS FOOTBALL", 
    "BC SCHOOL SPORTS"
];

const testimonials = [
    {
        testimonial: "As Under-Secretary-General Marketing for Canadian High Schools Model United Nations (CAHSMUN) 2024, I had the pleasure of working with Johnson Mai, who played a vital role as one of our photographers. Johnson consistently demonstrated a keen artistic eye, capturing the energy and essence of our conference with professionalism and creativity. Beyond his technical skill, Johnson was incredibly reliable, meeting tight deadlines while adapting seamlessly to the fast-paced nature of the conference. His dedication to the media team was evident in every aspect of his work, from meticulous planning to his commitment to delivering high-quality content. Johnson’s contributions were invaluable.",
        quote: "— Rachel Wei, Under-Secretary-General Marketing, CAHSMUN 2024"
    },
    {
        testimonial: "As Under-Secretary-General Marketing for Canadian High Schools Model United Nations (CAHSMUN) 2024, I had the pleasure of working with Johnson Mai, who played a vital role as one of our photographers. Johnson consistently demonstrated a keen artistic eye, capturing the energy and essence of our conference with professionalism and creativity. Beyond his technical skill, Johnson was incredibly reliable, meeting tight deadlines while adapting seamlessly to the fast-paced nature of the conference. His dedication to the media team was evident in every aspect of his work, from meticulous planning to his commitment to delivering high-quality content. Johnson’s contributions were invaluable.",
        quote: "— Rachel Wei, Under-Secretary-General Marketing, CAHSMUN 2024"
    },
];

const Home = () => {
    const [curSlide, setCurSlide] = useState(0);
    const [inView, setInView] = useState(false);
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const [slideDirection, setSlideDirection] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false); // Track if the screen is mobile
    const testimonialsRef = useRef(null);

    useEffect(() => {
        // Detect if on mobile
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        
        // Add resize listener
        window.addEventListener("resize", checkMobile);

        // Initial check
        checkMobile();

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !animationTriggered) {
                    setInView(true);
                    setAnimationTriggered(true);
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (testimonialsRef.current) {
            observer.observe(testimonialsRef.current);
        }

        return () => {
            window.removeEventListener("resize", checkMobile); // Cleanup on unmount
            if (testimonialsRef.current) {
                observer.unobserve(testimonialsRef.current);
            }
        };
    }, [animationTriggered]);

    const prevSlide = () => {
        if (testimonials.length <= 1) return;
        setSlideDirection('backward');
        setCurSlide(curSlide === 0 ? testimonials.length - 1 : curSlide - 1);
    };

    const nextSlide = () => {
        if (testimonials.length <= 1) return;
        setSlideDirection('forward');
        setCurSlide(curSlide === testimonials.length - 1 ? 0 : curSlide + 1);
    };

    return (
        <>
            <HeroImageSection src={HeroImage} width={3889} height={2593} title="Clients" />

            <section className="px-6 sm:px-12 py-24 text-center" id="clients-section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight uppercase agency">My Clients</h1>
                    <p className={`mt-6 text-lg text-gray-800 ${latoLite.className}`}>
                        I’ve had the privilege of working with incredible clients, capturing their most meaningful moments with authenticity and artistry. 
                        From personal projects to commercial shoots, each collaboration is a story waiting to be told.
                    </p>
                </div>

                <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1 }}
                // onClick={() => setSelectedImage(image)}
                id="image-wrap" 
                className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 sm:px-32"
                >
                    {clients.map((client, index) => (
                        <div key={index} className="bg-gray-200 p-6 rounded-sm transform transition">
                            <p className={`text-2xl font-semibold text-gray-800 ${oswald.className}`}>{client}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            <div
                id="testimonials-section"
                ref={testimonialsRef}
                className="px-6 sm:px-20 py-20 bg-gray-50"
            >
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase agency text-center">Testimonials</h1>

                {/* Show Testimonials as Slideshow for Desktop, as Cards for Mobile */}
                {isMobile ? (
                    <div className="mt-10 grid grid-cols-1 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
                            >
                                <p className={`text-lg text-gray-800 italic leading-relaxed ${latoLite.className}`}>
                                    {testimonial.testimonial}
                                </p>
                                <p className={`text-lg text-gray-800 italic leading-relaxed mt-10 ml-5 ${lato.className}`}>
                                    {testimonial.quote}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center mt-10">
                        {testimonials.length > 1 && (
                            <button
                                className="hover:scale-110 transition ease-in-out hover:cursor-pointer"
                                onClick={prevSlide}
                            >
                                <ArrowLeftIcon className="w-8 h-8 text-gray-600 hover:text-gray-900 mr-6 sm:mr-20" />
                            </button>
                        )}

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={curSlide}
                                initial={{ opacity: 0, x: slideDirection === 'forward' ? 100 : -100 }}
                                animate={inView ? { opacity: 1, x: 0 } : { opacity: 1, x: slideDirection === 'forward' ? 100 : -100 }}
                                exit={{ opacity: 0, x: slideDirection === 'forward' ? -100 : 100 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="max-w-3xl mx-6 bg-white p-10 shadow-lg rounded-lg border border-gray-200"
                            >
                                <p className={`text-lg text-gray-800 italic leading-relaxed ${latoLite.className}`}>
                                    {testimonials[curSlide].testimonial}
                                </p>
                                <p className={`text-lg text-gray-800 italic leading-relaxed mt-10 ml-5 ${lato.className}`}>
                                    {testimonials[curSlide].quote}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {testimonials.length > 1 && (
                            <button
                                className="hover:scale-110 transition ease-in-out hover:cursor-pointer ml-6 sm:ml-20"
                                onClick={nextSlide}
                            >
                                <ArrowRightIcon className="w-8 h-8 text-gray-600 hover:text-gray-900" />
                            </button>
                        )}
                    </div>
                )}

                {testimonials.length > 1 && !isMobile && (
                    <div className="flex gap-2 justify-center mt-6">
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: curSlide === i ? 1.3 : 1 }}
                                transition={{ duration: 0.3 }}
                                className={`rounded-full h-3 w-3 ${
                                    curSlide === i ? "bg-gray-700" : "bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ServicesSection />
            <ContactSection />
            <InstaSection />
        </>
    );
};

export default Home;
