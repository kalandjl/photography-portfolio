"use client";

import Nav from "@/components/Nav";
import Link from "next/link";
import { latoLite } from "./fonts";
import { motion, Variants } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const BACK_OUT = [0.34, 1.56, 0.64, 1] as const;

// Top-level beat order: viewfinder frame snaps in first, then the numeral finds (fails to find)
// focus, then the caption and the way back settle in behind it.
const contentVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.1 } },
};

// Viewfinder frame: four brackets fly in from outside the numeral and snap onto it, like a
// camera's AF frame slamming onto a subject. Distinct from every other bracket use tonight
// (ContactSection's FocusBrackets / ServiceImageCell's corner brackets) in that those are
// hover/focus-visible-only affordances -- this one is a one-shot mount animation, no interaction
// gates it.
const bracketOffsets = {
    tl: { x: -26, y: -26 },
    tr: { x: 26, y: -26 },
    bl: { x: -26, y: 26 },
    br: { x: 26, y: 26 },
} as const;

const bracketVariants = (corner: keyof typeof bracketOffsets): Variants => ({
    hidden: { opacity: 0, ...bracketOffsets[corner], scale: 1.4 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 210, damping: 16, mass: 0.7 },
    },
});

// Rack-focus numeral: each digit hunts through a short blur/scale oscillation before landing
// sharp -- a lens racking past focus and pulling back, since there's no shot here for it to
// find. Checked against everything shipped tonight: not the per-character clip-mask on the
// homepage masthead (no overflow-clip + vertical mask here), not the single filter:blur resolve
// on Contact/AboutMe/ActionSection (this oscillates through multiple blur keyframes, not one
// resolve), not the grayscale-develop on About's first portrait, not the rotateX fold on About's
// hero / ContactSection's panel, and not the letter-spacing collapse on Testimonials/
// ServicesSection.
const digitGroupVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const digitVariants: Variants = {
    hidden: { opacity: 0, scale: 1.5, filter: "blur(20px)" },
    visible: {
        opacity: 1,
        scale: [1.5, 0.86, 1.06, 1],
        filter: ["blur(20px)", "blur(0px)", "blur(7px)", "blur(0px)"],
        transition: { duration: 1, times: [0, 0.5, 0.78, 1], ease: EXPO_OUT },
    },
};

const captionVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

const linkVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: BACK_OUT } },
};

const NotFound = () => {
    return (
        <>
            <div id="nav-wrap" className="absolute top-0 right-0 left-0 z-20">
                <Nav />
            </div>

            <main className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-950 to-black flex items-center justify-center px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="flex flex-col items-center text-center gap-8"
                >
                    <div className="relative px-10 py-6 sm:px-16 sm:py-10">
                        <motion.span
                            aria-hidden
                            variants={bracketVariants("tl")}
                            className="pointer-events-none absolute -top-1 -left-1 sm:-top-2 sm:-left-2 h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-l-2 border-white/60"
                        />
                        <motion.span
                            aria-hidden
                            variants={bracketVariants("tr")}
                            className="pointer-events-none absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-r-2 border-white/60"
                        />
                        <motion.span
                            aria-hidden
                            variants={bracketVariants("bl")}
                            className="pointer-events-none absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-l-2 border-white/60"
                        />
                        <motion.span
                            aria-hidden
                            variants={bracketVariants("br")}
                            className="pointer-events-none absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-r-2 border-white/60"
                        />

                        <motion.h1
                            variants={digitGroupVariants}
                            aria-label="404"
                            className="agency text-white text-[5rem] sm:text-[8rem] leading-none flex gap-2 sm:gap-5"
                        >
                            {"404".split("").map((digit, i) => (
                                <span key={i} aria-hidden="true" className="inline-block">
                                    <motion.span variants={digitVariants} className="inline-block">
                                        {digit}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.h1>
                    </div>

                    <motion.p
                        variants={captionVariants}
                        className={`text-white/70 text-lg sm:text-xl ${latoLite.className}`}
                    >
                        This page could not be found.
                    </motion.p>

                    <motion.div variants={linkVariants}>
                        <Link
                            href="/"
                            className="group relative inline-flex items-center px-6 py-3 outline-none"
                        >
                            <span className="agency text-white text-lg tracking-wide">
                                Home
                            </span>
                            <span
                                aria-hidden
                                className="pointer-events-none absolute bottom-2 left-6 right-6 h-px bg-white/70 scale-x-0 origin-center transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
};

export default NotFound;
