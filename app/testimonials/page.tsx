"use client";

import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
import InstaSection from "@/components/InstaSection";
import ServicesSection from "@/components/ServicesSection";
import HeroImage from "@/public/images/testimonials/VC Mothers Day 2026-60.jpeg";
import { lato, latoLite, oswald } from "../fonts";
import { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialImage1 from "@/public/images/testimonials/Cahsmun.jpeg"
import TestimonialImage2 from "@/public/images/testimonials/BC CATHOLICS FINAL-106.jpg"
import TestimonialImage3 from "@/public/images/insta/insta-photo-5.jpg"
import Image from "next/image";

const clients = [
    "CAHSMUN", 
    "VANCOUVER COLLEGE ATHLETICS", 
    "VANCOUVER COLLEGE VARSITY BASKETBALL", 
    "RICHMOND RAIDERS FOOTBALL", 
    "BC SCHOOL SPORTS"
];

type Testimonial = {
    testimonial: string;
    quote: string;
    imageSrc: typeof TestimonialImage1;
    imageHeight: number;
    imageWidth: number;
};

const testimonials: Testimonial[] = [
    {
        testimonial: "As Under-Secretary-General Marketing for Canadian High Schools Model United Nations (CAHSMUN) 2024, I had the pleasure of working with Johnson Mai, who played a vital role as one of our photographers. Johnson consistently demonstrated a keen artistic eye, capturing the energy and essence of our conference with professionalism and creativity. Beyond his technical skill, Johnson was incredibly reliable, meeting tight deadlines while adapting seamlessly to the fast-paced nature of the conference. His dedication to the media team was evident in every aspect of his work, from meticulous planning to his commitment to delivering high-quality content. Johnson’s contributions were invaluable.",
        quote: "— Rachel Wei, Under-Secretary-General Marketing, CAHSMUN 2024",
        imageSrc: TestimonialImage1,
        imageHeight: 4672,
        imageWidth: 7008
    },
    {
        testimonial: "As the Head of VC Basketball, I had the privilege of working with Johnson Mai, who was instrumental in enhancing our program’s social media presence. Johnson brought a fresh and creative perspective, capturing the excitement and energy of our games through compelling and visually striking content. His ability to tell our program’s story—whether through highlight reels, player spotlights, or event coverage—helped us engage more deeply with our community. Johnson was also incredibly dependable, consistently meeting tight deadlines and adapting quickly to the fast-paced nature of the basketball season. His attention to detail, professionalism, and dedication to delivering top-quality content made a significant impact on promoting our program. I truly appreciate Johnson’s contributions and the value he brought to VC Basketball.",
        quote: "— Ryan Shams, Head of VC Basketball 2025",
        imageSrc: TestimonialImage2,
        imageHeight: 3767,
        imageWidth: 5651
    },
    {
        testimonial: `In February and March, Johnson assisted BC School Sports as a student media
volunteer at the 2025 Wrestling and Boys Basketball Championships. Throughout the
events, he expressed a keen interest to learn and adapt in a fast-paced environment.
Johnson was tasked with capturing high-quality photos of student-athletes, coaches,
and spectators during both events. He provided excellent images that were featured
across all BCSS social media platforms and included in several of our print publications.
Johnson worked efficiently throughout both championships, making a key
contribution to BC School Sports' media coverage of the events. In high-pressure
situations, he took initiatives with his photography to ensure that he captured
significant moments, particularly the team and student-athlete celebrations on
championship day. Additionally, Johnson showed a strong willingness to receive
feedback and was a collaborative team player, maintaining a positive attitude even
during the long days.
I am confident that Johnson will be able to meet the needs of other clients due to his
exceptional photography skills and eagerness to learn and adapt in changing
environments.`,
        quote: " - Josephine Delisa, BC Sports Graphic Design & Content Coordinator",
        imageSrc: TestimonialImage3,
        imageWidth: 1080,
        imageHeight: 1350
    }
];

const cardHoverVariants = {
    rest: { y: 0, boxShadow: "0 10px 25px -15px rgba(15,15,15,0.14)" },
    hover: { y: -8, boxShadow: "0 30px 48px -20px rgba(15,15,15,0.24)" },
};

const quoteMarkVariants = {
    rest: { opacity: 0.05, scale: 0.9, rotate: -4 },
    hover: { opacity: 0.11, scale: 1, rotate: 0 },
};

const TestimonialCard = ({ data }: { data: Testimonial }) => (
    <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHoverVariants}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white p-8 sm:p-12 rounded-lg border border-gray-200 text-center overflow-hidden"
    >
        <motion.span
            aria-hidden
            variants={quoteMarkVariants}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-4 left-4 sm:left-8 text-[6rem] sm:text-[8rem] leading-none text-gray-900 select-none pointer-events-none font-serif"
        >
            “
        </motion.span>
        <div className="relative">
            <Image
                src={data.imageSrc}
                alt="Testimonial Image"
                width={500}
                height={300}
                className="rounded-lg mx-auto mb-6"
            />
            <p className={`text-lg text-gray-800 italic leading-relaxed ${latoLite.className}`}>
                {data.testimonial}
            </p>
            <p className={`text-lg text-gray-800 italic leading-relaxed mt-10 ml-5 ${lato.className}`}>
                {data.quote}
            </p>
        </div>
    </motion.div>
);

const clientGridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
};

const clientTagVariants = (index: number) => ({
    hidden: { opacity: 0, y: 26, rotate: index % 2 === 0 ? -3.5 : 3.5, scale: 0.94 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 140, damping: 15, mass: 0.9 },
    },
});

const clientCardHoverVariants = {
    rest: { y: 0, boxShadow: "0 6px 16px -12px rgba(15,15,15,0.1)", borderColor: "rgba(0,0,0,0.08)" },
    hover: { y: -6, boxShadow: "0 22px 34px -16px rgba(15,15,15,0.2)", borderColor: "rgba(0,0,0,0.18)" },
};

const NavArrow = ({
    direction,
    onClick,
}: {
    direction: "left" | "right";
    onClick: () => void;
}) => {
    const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;
    const nudge = direction === "left" ? -6 : 6;
    return (
        <motion.button
            initial="rest"
            whileHover="hover"
            whileTap="hover"
            animate="rest"
            onClick={onClick}
            className={`group relative p-3 cursor-pointer ${direction === "left" ? "mr-6 sm:mr-14" : "ml-6 sm:ml-14"}`}
        >
            <motion.span
                variants={{ rest: { opacity: 0, scale: 0.55 }, hover: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute inset-0 rounded-full bg-gray-900/5"
            />
            <motion.span
                variants={{ rest: { x: 0 }, hover: { x: nudge } }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative block"
            >
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </motion.span>
        </motion.button>
    );
};

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
            <HeroImageSection src={HeroImage} width={2048} height={1250} title="Testimonials" />

            <section className="px-6 sm:px-12 py-24 text-center" id="clients-section">
            <motion.div
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                whileInView={{ opacity: 1, letterSpacing: "-0.01em" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                id="image-wrap"
                className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl font-bold uppercase agency">My Clients</h1>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`mt-6 text-lg text-gray-800 ${latoLite.className}`}
                    >
                        I’ve had the privilege of working with incredible clients, capturing their most meaningful moments with authenticity and artistry.
                        From personal projects to commercial shoots, each collaboration is a story waiting to be told.
                    </motion.p>
                </motion.div>

                <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={clientGridVariants}
                id="image-wrap"
                className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 sm:px-32"
                >
                    {clients.map((client, index) => (
                        <motion.div key={index} variants={clientTagVariants(index)}>
                            <motion.div
                                initial="rest"
                                whileHover="hover"
                                animate="rest"
                                variants={clientCardHoverVariants}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="p-6 rounded-sm bg-neutral-50 border border-black/5"
                            >
                                <p className={`text-2xl font-semibold text-gray-800 ${oswald.className}`}>{client}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <section
                id="testimonials-section"
                ref={testimonialsRef}
                className="px-6 sm:px-20 py-20 bg-gray-50"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl font-bold tracking-tight uppercase agency text-center"
                >
                    Testimonials
                </motion.h1>

                {/* Show Testimonials as Slideshow for Desktop, as Cards for Mobile */}
                {isMobile ? (
                    <div className="mt-10 grid grid-cols-1 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <TestimonialCard data={testimonial} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center mt-10"
                    >
                    {testimonials.length > 1 && (
                        <NavArrow direction="left" onClick={prevSlide} />
                    )}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={curSlide}
                            initial={{ opacity: 0, x: slideDirection === 'forward' ? 100 : -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slideDirection === 'forward' ? -100 : 100 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="max-w-3xl mx-6"
                        >
                            <TestimonialCard data={testimonials[curSlide]} />
                        </motion.div>
                    </AnimatePresence>
                    {testimonials.length > 1 && (
                        <NavArrow direction="right" onClick={nextSlide} />
                    )}
                </motion.div>
                )}

                {testimonials.length > 1 && !isMobile && (
                    <div className="flex gap-2 justify-center mt-6">
                        {testimonials.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ width: curSlide === i ? 28 : 12 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className={`rounded-full h-3 ${
                                    curSlide === i ? "bg-gray-900" : "bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </section>

            <ServicesSection />
            <ContactSection />
            <InstaSection />
        </>
    );
};

export default Home;
