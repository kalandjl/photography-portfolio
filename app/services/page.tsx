"use client"
import Image, { StaticImageData } from "next/image"
import HeroImage from "../../public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import Nav from "@/components/Nav"
import { ArrowDown } from "lucide-react"
import HeroImageSection from "@/components/HeroImageSection"
import ServicePhoto1 from "@/public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import ServicePhoto2 from "@/public/graphics/Senior day post.jpg"
import ServicePhoto3 from "@/public/graphics/Nathan Lowden Queens Commit Final.jpg"
import ServicePhoto4 from "@/public/graphics/Saints day post.jpg"
import ServicePhoto5 from "@/public/pictures/_DSC0666-Enhanced-NR.jpg"
import ServicePhoto6 from "@/public/pictures/insta/insta-photo-6.jpg"
import ServicePhoto7 from "@/public/graphics/Winner.jpg"
import ServicePhoto8 from "@/public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import ServicePhoto9 from "@/public/pictures/Ryan and Taylor-005.jpg"
import { lato, latoLite } from "../fonts"
import FAQSection from "@/components/FAQSection"
import ContactSection from "@/components/ContactSection"
import InstaSection from "@/components/InstaSection"


let services: {title: string, description: string, imageSrc: StaticImageData, imageWidth: number, imageHeight: number, captcha: string}[] = [
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
        title: "Social Media Strategy & Management",
        description: "Helping businesses and teams build impactful online presences through content creation and strategic planning. Boost engagement, grow followers, and communicate your brand’s story effectively.",
        imageSrc: ServicePhoto4,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Increase Engagement. Strengthen Your Brand.",
    },
    {
        title: "Event Photography & Videography",
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
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Services" />

            <section id="service-gallery">
                {services.map((service, i) => {
                    const isReversed = (i % 2 !== 0) === reverseLayout;

                    return (
                        <div key={i} className="h-128 grid grid-cols-5">
                            {!isReversed ? (
                                <>
                                    <div id="image-wrap" className="col-span-3 overflow-hidden h-full w-full relative">
                                        <Image 
                                            src={service.imageSrc} 
                                            height={service.imageHeight} 
                                            width={service.imageWidth} 
                                            alt="Service photo"
                                            className="object-cover h-full w-full absolute" 
                                        />
                                    </div>
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
                                    <div id="image-wrap" className="col-span-3 overflow-hidden h-full w-full relative">
                                        <Image 
                                            src={service.imageSrc} 
                                            height={service.imageHeight} 
                                            width={service.imageWidth} 
                                            alt="Service photo"
                                            className="object-cover h-full w-full absolute" 
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </section>
            
            <FAQSection />

            <ContactSection />

            <InstaSection />
        </>
    );
};

export default Home;
