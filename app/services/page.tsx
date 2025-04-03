"use client"
import Image, { StaticImageData } from "next/image"
import HeroImage from "../../public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import Nav from "@/components/Nav"
import { ArrowDown, Contact } from "lucide-react"
import HeroImageSection from "@/components/HeroImageSection"
import ServicePhoto1 from "@/public/pictures/Saitns Round 1 VARSITY-101.jpg"
import ServicePhoto2 from "@/public/portraits/JMAI LAX MEDIA DAY-41.jpg"
import ServicePhoto3 from "@/public/graphics/Nathan Lowden Queens Commit Final.jpg"
import ServicePhoto4 from "@/public/graphics/Saints day post.jpg"
import ServicePhoto5 from "@/public/pictures/_DSC0666-Enhanced-NR.jpg"
import ServicePhoto6 from "@/public/portraits/JMAi THEATRE HEADSHOTS-45.jpg"
import ServicePhoto7 from "@/public/graphics/Winner.jpg"
import ServicePhoto8 from "@/public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import ServicePhoto9 from "@/public/pictures/Ryan and Taylor-005.jpg"
import { lato, latoLite, nunito, oswald } from "../fonts"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"
import InstaSection from "@/components/InstaSection"
import BarrierImageSection from "@/components/BarrierImageSection"
import ActionSection from "@/components/ActionSection"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"


let services: {title: string, description: string, imageSrc: StaticImageData, imageWidth: number, imageHeight: number, captcha: string, objectTop?: boolean}[] = [
    {
        title: "Sports Photography",
        description: "High-energy shots that capture the excitement, passion, and intensity of sports. Ideal for athletes, teams, and organizations looking to document seasons or promote programs.",
        imageSrc: ServicePhoto1,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Capture the Action. Relive the Game.",
    },
    {
        title: "Team Media Day",
        objectTop: true,
        description: "Professional portraits that showcase team spirit, perfect for social media, promotions, and player profiles. These polished images enhance your team’s presence and serve as cherished keepsakes.",
        imageSrc: ServicePhoto2,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Polished Portraits. Lasting Memories.",
    },
    {
        title: "Graphic Design",
        description: "Custom-designed visuals for social media, posters, banners, and branding. Whether for announcements or marketing, I create eye-catching designs that captivate audiences.",
        imageSrc: ServicePhoto3,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Bold Designs. Strong Impressions.",
    },
    {
        title: "Event Photography",
        description: "Capturing live events, celebrations, and corporate gatherings with professional visuals that preserve the energy and atmosphere.",
        imageSrc: ServicePhoto5,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Capture Moments. Relive Experiences.",
    },
    {
        title: "Headshots & Corporate Portraits",
        description: "Modern, professional headshots for resumes, LinkedIn profiles, and company websites. Clean, polished, and tailored to your style.",
        imageSrc: ServicePhoto6,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Sharp. Professional. Impactful.",
    },
    {
        title: "Social Media Strategy & Management",
        description: "Helping businesses and teams build impactful online presences through content creation and strategic planning. Boost engagement, grow followers, and communicate your brand’s story effectively.",
        imageSrc: ServicePhoto4,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Increase Engagement. Strengthen Your Brand.",
    },
    {
        title: "Content Creation Packages",
        description: "Ongoing content solutions for businesses and influencers, providing high-quality photos, videos, and graphics to keep social media fresh and engaging.",
        imageSrc: ServicePhoto7,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Consistent Content. Steady Growth.",
    },
    {
        title: "Highlight Reels & Videos",
        description: "Short-form videos and highlight reels for social media, marketing, and events. Designed to capture energy and maximize engagement.",
        imageSrc: ServicePhoto8,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Dynamic Stories. Lasting Impact.",
    },
    {
        title: "Family Portraits",
        description: "Timeless portraits that celebrate families and relationships—perfect for holidays, milestones, or capturing everyday moments.",
        imageSrc: ServicePhoto9,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Cherish Today. Remember Forever.",
    },
];
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
                            <div className="h-auto xl:h-128 grid-cols-5 hidden sm:grid">
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
                                        <div id="text-wrap" className="col-span-2 grid place-items-center px-20 w-3/4">
                                            <div className="grid gap-5">
                                                <h1 className="text-4xl agency">{service.title}</h1>
                                                <p className={`text-lg ${latoLite.className}`}>{service.description}</p>
                                                <p className={`text-lg ${latoLite.className} text-gray-700`}>{service.captcha}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div id="text-wrap" className="col-span-2 grid place-items-center px-20 w-3/4">
                                            <div className="grid gap-5">
                                                <h1 className="text-4xl agency">{service.title}</h1>
                                                <p className={`text-lg ${latoLite.className}`}>{service.description}</p>
                                                <p className={`text-lg ${latoLite.className} text-gray-700`}>{service.captcha}</p>
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
                                                className="object-cover h-full w-full absolute object-top" 
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
