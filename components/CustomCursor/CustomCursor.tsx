"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Generic tag/role based detection -- deliberately does not import or know about
// any individual component, so gallery links, nav links, buttons and form fields
// all pick up the hover state without ever touching those files.
const INTERACTIVE_SELECTOR =
    'a, button, [role="button"], input, textarea, select, summary, label';

// Site's signature expo-out (see PageTransition.tsx) for the dot's own snap;
// the ring instead uses a real spring so its lag reads as weight, not lag.
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Dot: stiff, fast spring -- reads as glued to the real pointer.
    const dotX = useSpring(mouseX, { stiffness: 1400, damping: 70, mass: 0.15 });
    const dotY = useSpring(mouseY, { stiffness: 1400, damping: 70, mass: 0.15 });

    // Ring: softer, heavier spring -- visibly trails behind, gives it physical weight.
    const ringX = useSpring(mouseX, { stiffness: 200, damping: 24, mass: 0.7 });
    const ringY = useSpring(mouseY, { stiffness: 200, damping: 24, mass: 0.7 });

    useEffect(() => {
        // Touch devices never get the overlay at all -- no listeners, no mount.
        if (window.matchMedia("(pointer: coarse)").matches) return;
        setEnabled(true);

        const handleMove = (e: PointerEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };
        const handleOver = (e: PointerEvent) => {
            const target = e.target as Element | null;
            setIsHovering(!!target?.closest(INTERACTIVE_SELECTOR));
        };
        const handleHide = () => setIsVisible(false);

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerover", handleOver);
        window.addEventListener("blur", handleHide);
        document.documentElement.addEventListener("mouseleave", handleHide);

        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerover", handleOver);
            window.removeEventListener("blur", handleHide);
            document.documentElement.removeEventListener("mouseleave", handleHide);
        };
    }, [mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60]"
            style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
            {/* mix-blend-difference inverts against whatever sits underneath, so a single
                white shape stays legible over both the site's dark hero overlays and its
                white/stone sections without any per-section color logic. */}
            <motion.div
                className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
                style={{ x: dotX, y: dotY, mixBlendMode: "difference" }}
                animate={{ scale: isHovering ? 0 : 1 }}
                transition={{ duration: 0.22, ease: EXPO_OUT }}
            />
            <motion.div
                className="fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-white"
                style={{ x: ringX, y: ringY, mixBlendMode: "difference" }}
                animate={{ scale: isHovering ? 1.85 : 1, opacity: isHovering ? 1 : 0.65 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
            />
        </div>
    );
}
