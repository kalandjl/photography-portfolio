import Image from "next/image";
import { FC } from "react";
import HeroImage from "@/public/pictures/_DSC6815.jpg"
import { lato, latoLite } from "@/app/fonts";
import Link from "next/link";

interface Props {


}

const ContactSection: FC<Props> = (props) => {

    return (
        <>
            <section id="contact-section" className="h-128 mt-10">
                <div id="image-wrap" className="overflow-hidden h-full relative">
                    <Image src={HeroImage} height={6039} width={4025} alt="hero image" className="object-cover" /> 
                    {/* Overlay section */}
                    <div className="inset-0 absolute">
                        <div className="relative h-full">
                            <div className="bg-black opacity-70 absolute inset-0 z-0"></div>
                            <div id="main-section" className="flex h-full">
                                <div id="text-wrap" className="h-full w-min px-20 grid place-items-center z-10 pb-20">
                                    <div className="grid gap-10">
                                        <p className={`text-white ${lato.className} w-max text-5xl opacity-100 z-10`}>Let's Get In Touch</p>
                                        <Link href="/contact">
                                            <button className="rounded-md border-1 border-white px-8 py-5 z-10 text-white hover:bg-white hover:text-black transition ease-in-out hover:cursor-pointer">
                                                <p className={`w-max ${latoLite.className}`}>Contact Me</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactSection