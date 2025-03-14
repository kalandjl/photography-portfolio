"use client"
import { lato } from "@/app/fonts";
import Link from "next/link";
import { FC, useState, useEffect } from "react";

interface Props {
    theme?: "dark" | "light";
}

let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Clients", href: "/clients" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" }
];

// Random additional links for Portfolio dropdown
const portfolioLinks = [
    { title: "VC Saints Series", href: "/portfolio/vc-saints-series" },
    { title: "Basketball Provincials", href: "/portfolio/bbprovincials" },
    { title: "Graphics", href: "/portfolio/graphics" },
    { title: "Ski", href: "/portfolio/ski" },
    { title: "Weddings", href: "/portfolio/weddings" },
    { title: "Hockey", href: "/portfolio/hockey" },
];

const shuffledPortfolioLinks = [...portfolioLinks].sort(() => Math.random() - 0.5).slice(0, portfolioLinks.length + 1);

const Nav: FC<Props> = ({ theme }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => setIsDropdownOpen(false), 200); // Small delay to prevent flickering
    };

    useEffect(() => {
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <nav id="nav" className={`h-16 ${theme === "dark" ? "bg-stone-900" : ""}`}>
            <div id="nav-inner" className="flex px-32 justify-between h-full items-center">
                <div id="logo"></div>
                <div id="links" className="flex gap-10 items-center">
                    {links.map((link, i) =>
                        link.title === "Portfolio" ? (
                            <div
                                key={i}
                                className="relative"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link href={link.href}>
                                    <p className={`text-white text-lg font-semibold px-4 py-2 hover:bg-stone-700 rounded-lg transition ${lato.className}`}>
                                        {link.title} 
                                    </p>
                                </Link>
                                {/* Dropdown Menu */}
                                <div className={`z-20 absolute left-0 mt-2 w-48 bg-stone-900 rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                                    {shuffledPortfolioLinks.map((item, index) => (
                                        <Link key={index} href={item.href}>
                                            <p className="block px-6 py-3 text-white text-lg hover:bg-stone-700 transition">
                                                {item.title}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link href={link.href} key={i}>
                                <p className={`text-white text-lg font-semibold px-4 py-2 hover:bg-stone-700 rounded-lg transition ${lato.className}`}>
                                    {link.title}
                                </p>
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
