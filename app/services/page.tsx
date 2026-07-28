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
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { services } from "@/lib/services"

const reverseLayout = false; // Set to true if you want to start with text first

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
                            <div className="h-auto xl:h-128 lg:h-96 md:h-128 grid-cols-5 hidden sm:grid overflow-hidden">
                                {!isReversed ? (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{ duration: 1 }}
                                            onClick={() => setSelectedImage(service.imageSrc)}
                                            id="image-wrap" 
                                            className="col-span-3 overflow-hidden h-full w-full relative"
                                        >
                                                <Image 
                                                    src={service.imageSrc} 
                                                    height={service.imageHeight} 
                                                    width={service.imageWidth} 
                                                    alt="Service photo"
                                                    className={`object-cover h-full w-full absolute ${service.objectTop ? "object-top" : "object-center"}`}
                                                />
                                            <div className="absolute inset-0 bg-black opacity-30"></div>
                                        </motion.div>
                                        <div id="text-wrap" className="col-span-2 grid place-items-center  xl:py-0 py-5 xl:px-20 xl:w-3/4 px-4">
                                            <div className="h-full pt-10">
                                                <div className="grid gap-5">
                                                    <h1 className="text-4xl agency">{service.title}</h1>
                                                    <p className={`text-lg ${latoLite.className}`}>{service.description}</p>
                                                    <p className={`text-lg ${latoLite.className} text-gray-700`}>{service.captcha}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div id="text-wrap" className="col-span-2 grid place-items-center xl:py-0 py-5 xl:px-20 xl:w-3/4 px-4">
                                        <div className="h-full lg:pt-10">
                                                <div className="grid gap-5">
                                                    <h1 className="text-4xl agency">{service.title}</h1>
                                                    <p className={`text-lg ${latoLite.className}`}>{service.description}</p>
                                                    <p className={`text-lg ${latoLite.className} text-gray-700`}>{service.captcha}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{ duration: 1 }}
                                            onClick={() => setSelectedImage(service.imageSrc)}
                                            id="image-wrap" 
                                            className="col-span-3 overflow-hidden h-full w-full relative"
                                        >
                                            <Image 
                                                src={service.imageSrc} 
                                                height={service.imageHeight} 
                                                width={service.imageWidth} 
                                                alt="Service photo"
                                                className={`object-cover h-full w-full absolute  ${service.objectTop ? "object-top" : "object-center"}`} 
                                            />
                                            <div className="absolute inset-0 bg-black opacity-30"></div>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                            <div className="grid sm:hidden">
                                <div id="barrier-image-wrap" className="relative">
                                <BarrierImageSection src={service.imageSrc} barrierHeight={64} />
                                    <span className="absolute inset-0 grid place-items-center z-20">
                                        <div className="grid gap-5">
                                            <h1 className="text-3xl text-white agency w-64">{service.title}</h1>
                                            <h1 className={` ${oswald.className} text-md text-gray-300 agency absolute top-5 left-5`}>{service.captcha}</h1>
                                        </div>
                                    </span>
                                    <span className="absolute inset-0 grid place-items-center z-10 bg-black opacity-60"></span>
                                </div>
                                <div id="text-wrap" className="px-5 pt-5 pb-10">{service.description}</div>
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
