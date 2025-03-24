"use client"
import { lato } from "@/app/fonts";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import Icon from "@/public/icon.png"
import Image from "next/image";

interface Props {
    theme?: "dark" | "light";
}

let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Clients", href: "/clients" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/FAQ" }
];

// Random additional links for Portfolio dropdown
const portfolioLinks = [
    { title: "Graphics", href: "/portfolio/graphics" },
    { title: "Sports", href: "/portfolio/sports" },
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
        <nav id="nav" className={`max-h-20 ${theme === "dark" ? "bg-stone-900" : ""}`}>
            <div id="nav-inner" className="flex px-32 justify-between h-full items-center">
                <div id="logo" className="w-32 h-20 grid place-items-center py-2 hover:scale-105 transition ease-in-out">
                    <Link href="/">
                        <div id="image-wrap" className="relative w-max h-max">
                            <Image src={Icon} height={150} width={110} alt="icon logo" className="object-contain" />
                        </div>
                    </Link>
                </div>
                <div id="links" className="flex items-center">
                    {links.map((link, i) =>
                        link.title === "Portfolio" ? (
                            <div
                                key={i}
                                className="relative border-r-1 border-gray-500 px-5"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link href={link.href}>
                                    <p className={`text-white text-lg font-semibold px-4 py-2 hover:bg-stone-800 rounded-sm transition agency`}>
                                        {link.title} 
                                    </p>
                                </Link>
                                {/* Dropdown Menu */}
                                <div className={`z-20 absolute left-0 mt-2 w-48 bg-stone-800 rounded-sm shadow-lg overflow-hidden transition-all duration-200 ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
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
                            <Link href={link.href} key={i} className="border-r border-gray-500 last:border-r-0 px-5">
                                <p className={`text-white font-semibold px-4 py-2 hover:bg-stone-800 rounded-sm transition agency text-xl`}>
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
