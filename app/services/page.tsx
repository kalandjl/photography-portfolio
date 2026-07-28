"use client"
import Image, { StaticImageData } from "next/image"
import HeroImage from "../../public/images/gallery/sports/JMAI Post abits Rematch Retouched-2.jpg"
import Nav from "@/components/Nav"
import HeroImageSection from "@/components/HeroImageSection"
import { lato, latoLite, nunito, oswald } from "../fonts"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"
import InstaSection from "@/components/InstaSection"
import BarrierImageSection from "@/components/BarrierImageSection"
import ActionSection from "@/components/ActionSection"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useState } from "react"
import { services } from "@/lib/services"
import Service from "@/types/Service"

const reverseLayout = false; // Set to true if you want to start with text first

// Row-level orchestration: the row itself is the viewport trigger, image and text cells are
// pure variant-driven children -- so a row plays as one composed beat (image leads, text
// cascades in behind it) instead of two elements independently racing each other in.
const rowVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.05, staggerChildren: 0.22 } },
};

// Image cell: a solid panel -- a literal camera-shutter blade, skewed and slid clear on a snap
// ease -- covers the frame and slides off toward the outer edge (away from the text column,
// using isReversed as the direction cue), while the photo underneath settles in on its own
// slower scale/opacity beat. Checked against everything shipped tonight: not the grayscale-
// develop on About's first portrait (no filter here), not the 3D rotateX fold on About's hero
// heading / ContactSection's panel (no rotateX), not the per-character clip-mask on the
// homepage masthead, not the letter-spacing collapse on Testimonials/ServicesSection, not the
// plain filter:blur resolves on AboutMeSection/ActionSection/InstaSection/Contact, and not
// InstaSection's clip-path curtain wipe -- this is a transform-based sliding panel (x + skew),
// no clipPath property anywhere.
const imagePhotoVariants: Variants = {
    hidden: { opacity: 0, scale: 1.12 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

const shutterVariants = (isReversed: boolean): Variants => ({
    hidden: { x: "0%" },
    visible: {
        x: isReversed ? "112%" : "-112%",
        transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] },
    },
});

function ServiceImageCell({ service, isReversed, onOpen }: { service: Service; isReversed: boolean; onOpen: () => void }) {
    return (
        <div
            onClick={onOpen}
            id="image-wrap"
            className="group col-span-3 overflow-hidden h-full w-full relative cursor-pointer"
        >
            <motion.div variants={imagePhotoVariants} className="absolute inset-0">
                <Image
                    src={service.imageSrc}
                    height={service.imageHeight}
                    width={service.imageWidth}
                    alt="Service photo"
                    className={`object-cover h-full w-full ${service.objectTop ? "object-top" : "object-center"}`}
                />
            </motion.div>

            <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-500 ease-out group-hover:opacity-10" />

            {/* Viewfinder hover cue: four corner brackets close in to frame the shot -- a
                camera's "focus acquired" state -- as the considered affordance signalling this
                cell opens the lightbox, in place of the site-wide hover:scale-105/110 trick. */}
            <span className="pointer-events-none absolute top-5 left-5 h-6 w-6 border-t border-l border-white opacity-0 -translate-x-1.5 -translate-y-1.5 transition-all duration-500 ease-out group-hover:opacity-90 group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="pointer-events-none absolute top-5 right-5 h-6 w-6 border-t border-r border-white opacity-0 translate-x-1.5 -translate-y-1.5 transition-all duration-500 ease-out group-hover:opacity-90 group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-white opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-500 ease-out group-hover:opacity-90 group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-white opacity-0 translate-x-1.5 translate-y-1.5 transition-all duration-500 ease-out group-hover:opacity-90 group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className={`pointer-events-none absolute inset-0 grid place-items-center opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 ${oswald.className}`}>
                <span className="text-white text-xs tracking-[0.4em] uppercase">View</span>
            </span>

            <motion.div
                variants={shutterVariants(isReversed)}
                className="pointer-events-none absolute -inset-x-10 inset-y-0 bg-neutral-950 skew-x-12"
            />
        </div>
    );
}

// Text cell: its own nested stagger group -- title tips up out of a slight shear (echoing the
// image blade's skew so the two halves of the row read as one language), then description and
// captcha cascade in behind it.
const textColumnVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 22, skewY: 3 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const captchaVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ServiceTextContent({ service }: { service: Service }) {
    return (
        <motion.div variants={textColumnVariants} className="grid gap-5">
            <motion.h1 variants={titleVariants} className="text-4xl agency">{service.title}</motion.h1>
            <motion.p variants={descriptionVariants} className={`text-lg ${latoLite.className}`}>{service.description}</motion.p>
            <motion.p variants={captchaVariants} className={`text-lg ${latoLite.className} text-gray-700`}>{service.captcha}</motion.p>
        </motion.div>
    );
}

// Mobile fallback overlay: BarrierImageSection's own transition is untouched -- this only
// choreographs the page's own title/captcha overlay + description text sitting on top of it,
// on the same shear language as the desktop title for continuity across breakpoints.
const mobileOverlayVariants: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};

const mobileTitleVariants: Variants = {
    hidden: { opacity: 0, y: 18, skewY: 3 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const mobileCaptchaVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const mobileDescriptionVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const Home = () => {

    const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Services" />

            <section id="service-gallery">
                {services.map((service, i) => {
                    const isReversed = (i % 2 !== 0) === reverseLayout;

                    return (
                        <div key={i}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={rowVariants}
                                className="h-auto xl:h-128 lg:h-96 md:h-128 grid-cols-5 hidden sm:grid overflow-hidden"
                            >
                                {!isReversed ? (
                                    <>
                                        <ServiceImageCell service={service} isReversed={false} onOpen={() => setSelectedImage(service.imageSrc)} />
                                        <div id="text-wrap" className="col-span-2 grid place-items-center  xl:py-0 py-5 xl:px-20 xl:w-3/4 px-4">
                                            <div className="h-full pt-10">
                                                <ServiceTextContent service={service} />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div id="text-wrap" className="col-span-2 grid place-items-center xl:py-0 py-5 xl:px-20 xl:w-3/4 px-4">
                                        <div className="h-full lg:pt-10">
                                                <ServiceTextContent service={service} />
                                            </div>
                                        </div>
                                        <ServiceImageCell service={service} isReversed={true} onOpen={() => setSelectedImage(service.imageSrc)} />
                                    </>
                                )}
                            </motion.div>
                            <div className="grid sm:hidden">
                                <div id="barrier-image-wrap" className="relative">
                                <BarrierImageSection src={service.imageSrc} barrierHeight={64} />
                                    <motion.span
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.4 }}
                                        variants={mobileOverlayVariants}
                                        className="absolute inset-0 grid place-items-center z-20"
                                    >
                                        <div className="grid gap-5">
                                            <motion.h1 variants={mobileTitleVariants} className="text-3xl text-white agency w-64">{service.title}</motion.h1>
                                            <motion.h1 variants={mobileCaptchaVariants} className={` ${oswald.className} text-md text-gray-300 agency absolute top-5 left-5`}>{service.captcha}</motion.h1>
                                        </div>
                                    </motion.span>
                                    <span className="absolute inset-0 grid place-items-center z-10 bg-black opacity-60"></span>
                                </div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.4 }}
                                    variants={mobileDescriptionVariants}
                                    id="text-wrap"
                                    className="px-5 pt-5 pb-10"
                                >
                                    {service.description}
                                </motion.div>
                            </div>
                        </div>

                    );
                })}
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="relative flex justify-center items-center w-[90vw] h-[95vh] max-w-4xl max-h-[95vh]"
                        >
                            <Image
                                src={selectedImage}
                                width={800} // Fixed width
                                height={600} // Fixed height
                                alt="Enlarged Image"
                                className="rounded-lg object-contain w-full h-full"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            
            <ActionSection
            links={[
            { title: "Contact Me", link: "/contact" },
            { title: "My Story", link: "/about" },
            ]}
            />            
            <FAQSection asSection={true} />

            <ContactSection />

            <InstaSection />
        </>
    );
};

export default Home;
