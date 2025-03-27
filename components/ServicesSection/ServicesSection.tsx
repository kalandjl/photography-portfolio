"use client"
import { FC, useEffect, useState } from "react";
import ServicePhoto1 from "@/public/pictures/Saitns Round 1 VARSITY-101.jpg"
import ServicePhoto2 from "@/public/graphics/Senior day post.jpg"
import ServicePhoto3 from "@/public/graphics/Nathan Lowden Queens Commit Final.jpg"
import ServicePhoto4 from "@/public/graphics/Saints day post.jpg"
import ServicePhoto5 from "@/public/pictures/_DSC0666-Enhanced-NR.jpg"
import ServicePhoto6 from "@/public/pictures/insta/insta-photo-6.jpg"
import ServicePhoto7 from "@/public/graphics/Winner.jpg"
import ServicePhoto8 from "@/public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import ServicePhoto9 from "@/public/pictures/Ryan and Taylor-005.jpg"
import Image, { StaticImageData } from "next/image";
import BarrierImageSection from "../BarrierImageSection";
import { lato, latoLite, oswald } from "@/app/fonts";
import Service from "@/types/Service";
import { getUniqueRandomNumbers } from "@/lib/num";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {

}

let services: Service[] = [
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

const ServicesSection: FC<Props> = (props) => {

    let [servicesShort, setServicesShort] = useState<Service[]>([])

    useEffect(() => {

        let nums = getUniqueRandomNumbers(3, services.length)

        const t = nums.map((x) => services[x - 1])

        setServicesShort(t)
    }, [])


    return (
        <>
            <section id="services-section" className="grid mt-10">
                <div id="text-wrap" className="px-20 pt-10 pb-20">
                    <h1 className="text-4xl agency mb-5">Services Offered</h1>
                    <p className={`${latoLite.className}`}>
                    My services are designed to capture, create, and enhance your visual presence—whether through dynamic sports photography, polished team portraits, compelling graphic design, or engaging social media content. From professional headshots to event coverage and highlight reels, we bring expertise and creativity to every project. Explore our offerings and elevate your brand, memories, and storytelling with impactful visuals.
                    </p>
                </div>
                <div className="grid grid-flow-col grid-cols-3 h-128" id="services-grid">
                    {servicesShort.map((service, i) => (
                        <div key={i} className="grid">
                            <div id="image-wrap" className="relative overflow-hidden">
                                <Image src={service.imageSrc} height={service.imageHeight} width={service.imageWidth} alt=""
                                className="object-cover h-full" />
                                    <span className="absolute inset-0 grid place-items-center z-20">
                                        <div className="grid gap-5">
                                            <h1 className="text-3xl text-white agency w-64">{service.title}</h1>
                                            <h1 className={` ${oswald.className} text-md text-gray-300 agency absolute top-5 left-5`}>{service.captcha}</h1>
                                        </div>
                                    </span>
                                    <span className="absolute inset-0 grid place-items-center z-10 bg-black opacity-60"></span>
                                </div>
                        </div>
                    ))}
                </div>
                <div id="btn-wrap" className="pl-20 pr-15 py-10">
                    <Link href="/services">
                        <button className={`px-8 py-4 rounded-md border-1 border-black ${lato.className}
                        hover:scale-105 hover:bg-gray-200 transition ease-in-out hover:cursor-pointer`}>
                            <span className="flex gap-3">
                                <h1>See More</h1>
                                <ArrowRight />
                            </span>
                        </button>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default ServicesSection