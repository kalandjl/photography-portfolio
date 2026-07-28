"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, Transition, Variants } from "framer-motion";

// Shared with the rest of the site's motion vocabulary (see Nav.tsx, contact/page.tsx):
// a sharp accelerating curve for anything leaving, the site's signature expo-out for
// anything settling in.
const SHARP_IN = [0.7, 0, 0.84, 0] as const;
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// The outgoing page defocuses and drops away fast; the incoming page is a photograph
// racking into focus -- a literal camera reference rather than a generic fade/slide.
const pageVariants: Variants = {
    initial: { opacity: 0, scale: 1.015, filter: "blur(14px)" },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.18, ease: EXPO_OUT, delay: 0.22 },
    },
    exit: {
        opacity: 0,
        scale: 1.008,
        filter: "blur(8px)",
        transition: { duration: 0.14, ease: SHARP_IN },
    },
};

// Two aperture blades close over the outgoing page, hold shut just long enough for the
// swap to happen underneath, then snap back open on the site's signature ease -- a
// single keyframed timeline rather than a hand-rolled sequencer.
const shutterTransition: Transition = {
    duration: 0.42,
    times: [0, 0.36, 0.52, 1],
    ease: [SHARP_IN, SHARP_IN, EXPO_OUT],
};

const shutterBladeVariants: Variants = {
    initial: { scaleY: 0 },
    animate: { scaleY: [0, 1, 1, 0], transition: shutterTransition },
};

const shutterSeamVariants: Variants = {
    initial: { scaleX: 0 },
    animate: { scaleX: [0, 1, 1, 0], transition: shutterTransition },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {children}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence initial={false}>
                <motion.div
                    key={pathname}
                    className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
                    aria-hidden
                >
                    <motion.div
                        className="absolute inset-x-0 top-0 h-1/2 bg-neutral-950 origin-top"
                        variants={shutterBladeVariants}
                        initial="initial"
                        animate="animate"
                    />
                    <motion.div
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-950 origin-bottom"
                        variants={shutterBladeVariants}
                        initial="initial"
                        animate="animate"
                    />
                    <motion.div
                        className="absolute inset-x-0 top-1/2 h-px bg-white/30 origin-center -translate-y-1/2"
                        variants={shutterSeamVariants}
                        initial="initial"
                        animate="animate"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
