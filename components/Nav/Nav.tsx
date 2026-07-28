"use client"
import { lato } from "@/app/fonts";
import Link from "next/link";
import { FC, useState, useEffect, useRef } from "react";
import Icon from "@/public/icons/whiteicon.png"
import Image from "next/image";
import { XIcon } from "lucide-react";
import { Bars3 } from "@/app/icons";
import SidebarImage from "@/public/images/sections/JMAI -02.jpg"
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    theme?: "dark" | "light";
}

// Shared active-tab indicator: springs open from the center rather than
// sliding in from one edge, so it reads distinct from the site's default
// fade/slide-on-scroll recipe.
const ActiveTabIndicator: FC = () => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.7 }}
        style={{ originX: 0.5 }}
        className="h-full w-full bg-stone-200 block absolute top-0 bottom-0 left-0"
    />
);

const sidebarLinksContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
};

const sidebarLinkVariants = {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Desktop portfolio dropdown: panel scales/settles in from its top edge
// rather than a flat opacity/scale-95 fade, and its rows stagger in after.
const dropdownPanelVariants = {
    hidden: { opacity: 0, scaleY: 0.82, y: -6 },
    visible: {
        opacity: 1, scaleY: 1, y: 0,
        transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0, scaleY: 0.9, y: -4,
        transition: { duration: 0.14, ease: [0.4, 0, 1, 1] },
    },
};

const dropdownListVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Testimonials", href: "/testimonials" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/FAQ" }
];

// Static portfolio links
const portfolioLinks = [
    { title: "Graphics", href: "/portfolio/graphics" },
    { title: "Sports", href: "/portfolio/sports" },
    { title: "Portraits", href: "/portfolio/portraits" },
];

const Nav: FC<Props> = ({ theme }) => {

    const pathname = usePathname(); // Get current path
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [shuffledPortfolioLinks, setShuffledPortfolioLinks] = useState<any[]>([]);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeoutRef.current);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 200); // Small delay to prevent flickering
    };

    useEffect(() => {
        setShuffledPortfolioLinks([...portfolioLinks].sort(() => Math.random() - 0.5));
    }, []); // Shuffle only on client-side

    useEffect(() => {
        return () => clearTimeout(dropdownTimeoutRef.current);
    }, []);

    // Lock/unlock body scroll while the mobile sidebar is open, and keep the
    // homepage slideshow's prev/next buttons (#slide-btn) below the sidebar overlay.
    useEffect(() => {
        document.body.style.height = sidebarOpen ? "100vh" : "";
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        document.querySelectorAll("#slide-btn").forEach((el) => {
            (el as HTMLElement).style.setProperty("z-index", sidebarOpen ? "10" : "30");
        });

        return () => {
            document.body.style.height = "";
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <>
            <nav id="nav" className={` ${theme === "dark" ? "bg-stone-900 h-30" : "max-h-22"}`}>
                <div id="nav-inner" className="flex lg:px-32 px-10 md:px-20 justify-between h-full items-center">
                    <div id="logo" className="w-32 h-22 grid place-items-center py-2 hover:scale-105 transition ease-in-out">
                        <Link href="/">
                            <div id="image-wrap" className="relative w-max h-max">
                                <Image src={Icon} height={110} width={110} alt="icon logo" className="object-contain" priority />
                            </div>
                        </Link>
                    </div>
                    <div>
                        <div id="links" className="items-center hidden md:flex">
                            {links.map((link, i) =>
                                link.title === "Portfolio" ? (
                                    <div
                                        key={i}
                                        className="relative border-r-1 border-gray-500 lg:px-5 group"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onFocus={handleMouseEnter}
                                        onBlur={handleMouseLeave}
                                    >
                                        <Link href={link.href} className="relative outline-none">
                                            <p className={`text-white lg:text-lg font-semibold px-4 py-2 ${link.href != pathname ? "hover:bg-stone-800": ""} group-hover:bg-stone-800 group-has-[:focus-visible]:bg-stone-800 rounded-sm transition agency`}>
                                                {link.title}
                                            </p>
                                            {link.href === pathname && (
                                                <div className="absolute bottom-0 h-1 px-3 right-0 left-0 block">
                                                    <div className="relative h-full">
                                                        <ActiveTabIndicator />
                                                    </div>

                                                </div>
                                            )}
                                            {/* Keyboard-focus underline: same accent color/position as the
                                                active-tab indicator, snaps in via group-has-[:focus-visible]
                                                on the row wrapper so real mouse clicks don't trigger it. */}
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute bottom-0 left-3 right-3 h-0.5 bg-stone-200 scale-x-0 origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-[:focus-visible]:scale-x-100"
                                            />
                                        </Link>
                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    className="agency z-20 absolute left-0 mt-2 w-40 rounded-md overflow-hidden bg-gradient-to-b from-stone-800 to-stone-950 ring-1 ring-white/10 shadow-2xl shadow-black/50"
                                                    style={{ originY: 0 }}
                                                    variants={dropdownPanelVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                >
                                                    <motion.span
                                                        className="block h-px bg-white/25 origin-left"
                                                        initial={{ scaleX: 0 }}
                                                        animate={{ scaleX: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.12, ease: [0.65, 0, 0.35, 1] }}
                                                    />
                                                    <motion.div variants={dropdownListVariants}>
                                                        {shuffledPortfolioLinks.map((item: any, index: number) => (
                                                            <motion.div key={index} variants={dropdownItemVariants}>
                                                                <Link
                                                                    href={item.href}
                                                                    className="group/drop relative flex items-center px-4 py-2.5 border-b border-white/5 last:border-b-0 overflow-hidden outline-none"
                                                                >
                                                                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/80 scale-y-0 origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/drop:scale-y-100 group-focus-visible/drop:scale-y-100" />
                                                                    <p className="text-white font-semibold lg:text-xl transition-[transform,letter-spacing] duration-300 ease-out group-hover/drop:translate-x-1.5 group-hover/drop:tracking-wide group-focus-visible/drop:translate-x-1.5 group-focus-visible/drop:tracking-wide">
                                                                        {item.title}
                                                                    </p>
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link href={link.href} key={i} className="group border-r border-gray-500 last:border-r-0 lg:px-5 relative outline-none">
                                        <p className={`text-white font-semibold px-4 py-2 ${link.href !== pathname ? "hover:bg-stone-800 group-focus-visible:bg-stone-800": ""} rounded-sm transition agency lg:text-xl`}>
                                            {link.title}
                                        </p>

                                        {link.href === pathname && (
                                            <div className="absolute bottom-0 h-1 px-7 right-0 left-0 block">
                                                <div className="relative h-full">
                                                    <ActiveTabIndicator />
                                                </div>

                                            </div>
                                        )}
                                        {/* Keyboard-focus underline, same accent/position language as the
                                            active-tab indicator; group-focus-visible so a mouse click
                                            (no focus-visible on links) leaves this untouched. */}
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute bottom-0 left-7 right-7 h-0.5 bg-stone-200 scale-x-0 origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-focus-visible:scale-x-100"
                                        />
                                </Link>
                                )
                            )}
                        </div>
                        <button
                            type="button"
                            id="sidebar-btn"
                            aria-label="Open menu"
                            className="sm:flex md:hidden w-10 h-full items-center justify-center hover:cursor-pointer rounded-md outline-none transition-shadow duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:ring-2 focus-visible:ring-stone-200"
                            onClick={() => setSidebarOpen(true)}
                        >
                            {Bars3}
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        id="sidebar"
                        className="z-20 px-10 py-5 fixed inset-0 bg-stone-800 overflow-hidden scroll"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
                    >
                        {/* Background Image */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1.15, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Image
                                src={SidebarImage}
                                fill
                                className="object-cover z-30" // Ensures the image is behind content
                                alt=""
                            />
                            <div className="absolute top-0 -bottom-10 right-0 left-0 bg-black opacity-80 z-40"></div>
                        </motion.div>

                        {/* Inner Content */}
                        <div id="inner" className="h-full relative z-50">
                            <motion.button
                                type="button"
                                aria-label="Close menu"
                                className="text-white hover:cursor-pointer inline-block rounded-full outline-none transition-shadow duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:ring-2 focus-visible:ring-stone-200"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ rotate: 90, scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <XIcon stroke="#ffffff" />
                            </motion.button>

                            <motion.div
                                id="links"
                                className="grid gap-3 pt-10"
                                variants={sidebarLinksContainerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {links.map((link, i) => (
                                    <motion.div key={i} variants={sidebarLinkVariants}>
                                        <Link
                                            href={link.href}
                                            className={`group relative inline-flex items-center text-white ${lato.className} text-lg outline-none transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:translate-x-2`}
                                        >
                                            {/* Left accent tick, same idiom as the desktop dropdown's
                                                per-item bar, scoped to keyboard focus only. */}
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-stone-200 scale-y-0 origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-focus-visible:scale-y-100"
                                            />
                                            {link.title}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;
