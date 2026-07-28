"use client"
import { lato } from "@/app/fonts";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import InstaLogo from "@/public/icons/insta-logo.png"
import InstaPhoto1 from "@/public/images/insta/insta-photo-1.jpg"
import InstaPhoto2 from "@/public/images/insta/insta-photo-2.jpg"
import InstaPhoto3 from "@/public/images/insta/insta-photo-3.jpg"
import InstaPhoto4 from "@/public/images/insta/insta-photo-4.jpg"
import InstaPhoto5 from "@/public/images/insta/insta-photo-5.jpg"
import InstaPhoto6 from "@/public/images/insta/insta-photo-6.jpg"
import InstaPhoto7 from "@/public/images/insta/insta-photo-7.jpg"
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

// Top-level orchestrator: the CTA cell and the four photo cells are direct children so they
// arrive as one loosely-staggered group rather than each animating in isolation.
const sectionVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.05, staggerChildren: 0.13 },
    },
};

// CTA lands on a rotate+scale spring (a card settling into place, not a translate-up fade),
// then hands its own children (ring, heading, handle) a second, tighter stagger.
const ctaCellVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -4 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 130, damping: 17, mass: 0.9, delayChildren: 0.2, staggerChildren: 0.1 },
    },
};

const ctaItemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
};

// Photo cells reveal via an alternating clip-path curtain wipe (odd cells open left-to-right,
// even cells right-to-left) instead of a flat opacity fade -- its own distinct mechanic, not a
// copy of the spring-tilt/ink-blot/accent-bar treatments used elsewhere tonight.
const photoCellVariants = (i: number): Variants => ({
    hidden: {
        opacity: 0,
        clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    },
    visible: {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 0.95, ease: [0.83, 0, 0.17, 1] },
    },
});

const InstaSection: FC<Props> = () => {
    // Seeded with a deterministic pick (matches SSR) so real content is present on first paint --
    // the effect below then swaps in the actual random selection as a content swap, not a pop-in
    // from an empty grid.
    let [images, setImages] = useState<{ src: StaticImageData, height: number, width: number, link: string, objectPosition?: string }[]>(
        () => [permanentImages[0], rotatingImages[0], permanentImages[1], rotatingImages[1]]
    )

    useEffect(() => {
        const numArr = getUniqueRandomNumbers(2, rotatingImages.length);
        const rotatingPicks = numArr.map(num => rotatingImages[num - 1]);

        // Fixed positions: square 1 and square 3 are always the pinned photos;
        // squares 2 and 4 are filled with two random picks from the rotating pool.
        setImages([permanentImages[0], rotatingPicks[0], permanentImages[1], rotatingPicks[1]]);
    }, []);

    return (
        <motion.section
            id="insta-section"
            className="grid grid-cols-3 sm:grid-cols-5 sm:h-64 sm:mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={sectionVariants}
        >
            {/* Instagram CTA */}
            <motion.div
                id="action-section"
                variants={ctaCellVariants}
                className="group bg-gradient-to-br from-white to-neutral-100 ring-1 ring-inset ring-black/5 hover:from-neutral-50 hover:to-neutral-200 transition-colors duration-700 grid place-items-center aspect-square sm:aspect-auto sm:h-full"
            >
                <Link href="https://www.instagram.com/jmai.photos/">
                    <div id="text-wrap" className="grid gap-3">
                        <motion.div variants={ctaItemVariants} id="image-wrap" className="grid place-items-center">
                            {/* Lens-ring mark: a dashed ring idles in a slow continuous spin; on hover
                                the inner ring darkens and the glyph stops down slightly, like an
                                aperture closing, instead of the site-wide scale-up-on-hover trick. */}
                            <div className="relative w-14 h-14 grid place-items-center">
                                <motion.span
                                    aria-hidden
                                    className="absolute inset-0 rounded-full border border-dashed border-black/25"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                                />
                                <span
                                    aria-hidden
                                    className="absolute inset-2.5 rounded-full border border-black/35 transition-colors duration-500 group-hover:border-black"
                                />
                                <div id="image-cover" className="w-7 h-7 relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-90">
                                    <Image src={InstaLogo} fill className="object-cover" alt="instagram-logo" />
                                </div>
                            </div>
                        </motion.div>
                        <motion.p variants={ctaItemVariants} className={`${lato.className} text-center md:text-lg transition-[letter-spacing] duration-500 group-hover:tracking-wide`}>
                            Follow me on Instagram
                        </motion.p>
                        <motion.div variants={ctaItemVariants} id="underline-text-wrap" className="grid place-items-center w-full">
                            <p className={`${lato.className} text-center hover:text-gray-800 transition duration-300 relative group w-min text-sm md:text-md`}>
                                @jmai.photos
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
                            </p>
                        </motion.div>
                    </div>
                </Link>
            </motion.div>

            {/* Instagram Images */}
            {images.map((image, i) => (
                <motion.div
                    key={i}
                    variants={photoCellVariants(i)}
                    className="group aspect-square sm:aspect-auto sm:h-full"
                >
                    <Link href={image.link} className="block h-full w-full">
                        <div className="relative w-full h-full overflow-hidden">
                            <CustomImage src={image.src} fill alt={`insta image ${i + 1}`}
                            className={`object-cover grayscale contrast-[1.05] transition-[filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:cursor-pointer group-hover:grayscale-0 group-hover:contrast-100 ${image.objectPosition === "top" ? "object-top" : ""}`} />
                            {/* Bottom-up wash + Instagram-mark badge fade in on hover, in place of the
                                flat hover:scale-105 used everywhere else on the site. */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                            <div className="pointer-events-none absolute left-3 bottom-3 w-6 h-6 rounded-full bg-white/95 grid place-items-center overflow-hidden opacity-0 translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 group-hover:opacity-100 group-hover:translate-y-0">
                                <div className="w-3.5 h-3.5 relative">
                                    <Image src={InstaLogo} fill className="object-contain" alt="" aria-hidden />
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.section>
    )
}

export default InstaSection;
