"use client"
import { lato } from "@/app/fonts";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import InstaLogo from "@/public/icons/insta-logo.png"
import InstaPhoto1 from "@/public/pictures/insta/insta-photo-1.jpg" 
import InstaPhoto2 from "@/public/pictures/insta/insta-photo-2.jpg"
import InstaPhoto3 from "@/public/pictures/insta/insta-photo-3.jpg"
import InstaPhoto4 from "@/public/pictures/insta/insta-photo-4.jpg"
import InstaPhoto5 from "@/public/pictures/insta/insta-photo-5.jpg"
import InstaPhoto6 from "@/public/pictures/insta/insta-photo-6.jpg"
import InstaPhoto7 from "@/public/pictures/insta/insta-photo-7.jpg"
import { getUniqueRandomNumbers } from "@/lib/num";
import CustomImage from "../CustomImage";

// Always shown, pinned to the first and third square (not subject to the random rotation below).
let permanentImages = [
    {src: InstaPhoto1, width: 1200, height: 1500, link: "https://www.instagram.com/p/DZ0LfsfHbtt/?img_index=1", objectPosition: "top"},
    {src: InstaPhoto3, width: 1280, height: 1600, link: "https://www.instagram.com/p/DW5lC3clU40/?img_index=1", objectPosition: "top"},
]

// Two of these are randomly picked each load to fill out the remaining squares.
let rotatingImages = [
    {src: InstaPhoto2, width: 2160, height: 2160, link: "https://www.instagram.com/p/DVovusYki5L/?img_index=1"},
    {src: InstaPhoto4, width: 2160, height: 2160, link: "https://www.instagram.com/p/DVmt1u-lJIf/?img_index=1"},
    {src: InstaPhoto5, width: 2160, height: 2160, link: "https://www.instagram.com/p/DVmdsXBlMmm/?img_index=1"},
    {src: InstaPhoto6, width: 2160, height: 2160, link: "https://www.instagram.com/p/DVkYSNWFOXT/?img_index=1"},
    {src: InstaPhoto7, width: 2160, height: 2160, link: "https://www.instagram.com/p/DViNMpslPdN/?img_index=1"},
]

interface Props {}

const InstaSection: FC<Props> = () => {
    let [images, setImages] = useState<{ src: StaticImageData, height: number, width: number, link: string, objectPosition?: string }[]>([])

    useEffect(() => {
        const numArr = getUniqueRandomNumbers(2, rotatingImages.length);
        const rotatingPicks = numArr.map(num => rotatingImages[num - 1]);

        // Fixed positions: square 1 and square 3 are always the pinned photos;
        // squares 2 and 4 are filled with two random picks from the rotating pool.
        setImages([permanentImages[0], rotatingPicks[0], permanentImages[1], rotatingPicks[1]]);
    }, []);

    return (
        <>
            <section id="insta-section" className="grid grid-cols-3 sm:grid-cols-5 sm:h-64 sm:mt-20">
                {/* Instagram CTA */}
                <div id="action-section" className="bg-gray-100 grid place-items-center aspect-square sm:aspect-auto sm:h-full">
                    <Link href="https://www.instagram.com/jmai.photos/">
                        <div id="text-wrap" className="grid gap-3 hover:scale-105 transition ease-in-out">
                            <div id="image-wrap" className="grid place-items-center">
                                <div id="image-cover" className="w-7 h-7 relative overflow-hidden">
                                    <Image src={InstaLogo} fill className="object-cover" alt="instagram-logo" />
                                </div>
                            </div>
                            <p className={`${lato.className} text-center md:text-lg`}>
                                Follow me on Instagram
                            </p>
                            <div id="underline-text-wrap" className="grid place-items-center w-full">
                                <p className={`${lato.className} text-center hover:text-gray-800 transition duration-300 relative group w-min text-sm md:text-md`}>
                                    @jmai.photos
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Instagram Images */}
                {images.map((image, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="aspect-square sm:aspect-auto sm:h-full"
                    >
                        <Link href={image.link}>
                            <div className="relative w-full h-full overflow-hidden">
                                <CustomImage src={image.src} fill alt={`insta image ${i + 1}`}
                                className={`object-cover hover:scale-105 hover:cursor-pointer transition ease-in-out ${image.objectPosition === "top" ? "object-top" : ""}`} />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </section>
        </>
    )
}

export default InstaSection;
