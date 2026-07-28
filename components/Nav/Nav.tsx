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
                                <Image src={Icon} height={150} width={110} alt="icon logo" className="object-contain" />
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
                                    >
                                        <Link href={link.href} className="relative">
                                            <p className={`text-white lg:text-lg font-semibold px-4 py-2 ${link.href != pathname ? "hover:bg-stone-800": ""} group-hover:bg-stone-800 rounded-sm transition agency`}>
                                                {link.title} 
                                            </p>
                                            {link.href === pathname && (
                                                <div className="absolute bottom-0 h-1 px-3 right-0 left-0 block">
                                                    <div className="relative h-full">
                                                        <ActiveTabIndicator />
                                                    </div>

                                                </div>
                                            )}
                                        </Link>
                                        {/* Dropdown Menu */}
                                        <div className={`agency z-20 absolute left-0 mt-2 w-32 bg-stone-800 rounded-sm shadow-lg overflow-hidden transition-all duration-200 ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                                            {shuffledPortfolioLinks.map((item: any, index: number) => (
                                                <Link key={index} href={item.href}>
                                                    <p className={`text-white font-semibold px-4 py-2 transition lg:text-xl hover:bg-stone-900
                                                    }`}>
                                                        {item.title}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link href={link.href} key={i} className="border-r border-gray-500 last:border-r-0 lg:px-5 relative">
                                        <p className={`text-white font-semibold px-4 py-2 ${link.href !== pathname ? "hover:bg-stone-800": ""} rounded-sm transition agency lg:text-xl`}>
                                            {link.title}
                                        </p>
 
                                        {link.href === pathname && (
                                            <div className="absolute bottom-0 h-1 px-7 right-0 left-0 block">
                                                <div className="relative h-full">
                                                    <ActiveTabIndicator />
                                                </div>

                                            </div>
                                        )}
                                </Link>
                                )
                            )}
                        </div>
                        <div id="sidebar-btn" className="sm:flex md:hidden w-10 h-full hover:cursor-pointer" 
                        onClick={() => setSidebarOpen(true)}>
                            {Bars3}
                        </div>
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
                            <motion.p
                                className="text-white hover:cursor-pointer inline-block"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ rotate: 90, scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <XIcon stroke="#ffffff" />
                            </motion.p>

                            <motion.div
                                id="links"
                                className="grid gap-3 pt-10"
                                variants={sidebarLinksContainerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {links.map((link, i) => (
                                    <motion.div key={i} variants={sidebarLinkVariants}>
                                        <Link href={link.href} className={`text-white ${lato.className} text-lg`}>
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
