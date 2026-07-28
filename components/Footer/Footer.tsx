import { lato, latoLite, nunito, oswald } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
    
}

let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Clients", href: "/testimonials" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" }
];


const Footer: FC<Props> = (props) => {

    return (
        <>
            <footer id="footer" className="px-4 sm:px-10 grid py-5 gap-5">
                <div id="links" className="group/nav sm:flex hidden gap-3">
                    {links.map((link, i) => (
                        <Link
                            href={link.href}
                            key={i}
                            className="group relative px-4 py-2 outline-none transition-opacity duration-300 ease-out group-hover/nav:[&:not(:hover)]:opacity-40"
                        >
                            <p className={`text-black font-semibold transition-[letter-spacing] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:tracking-wide group-focus-visible:tracking-wide ${lato.className}`}>
                                {link.title}
                            </p>
                            <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-black transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-[calc(100%-2rem)] group-focus-visible:w-[calc(100%-2rem)]" />
                        </Link>
                    ))}
                </div>
                <div id="copyright" className="px-10 w-full text-center">
                <p className={`${latoLite.className} text-sm text-gray-700`}>
                    © {new Date().getFullYear()} JMAI.PHOTOS.{" "}
                </p>
                <div className="grid place-items-center sm:flex mt-5">
                    <div id="icons" className="flex gap-3">
                        <Link
                            href="https://www.instagram.com/jmai.photos"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram Profile"
                            className="group/insta relative w-8 h-8 flex items-center justify-center outline-none"
                        >
                            <span className="absolute inset-0 scale-75 rounded-full border border-black/0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/insta:scale-110 group-hover/insta:border-black/25 group-hover/insta:opacity-100 group-focus-visible/insta:scale-110 group-focus-visible/insta:border-black/25 group-focus-visible/insta:opacity-100" />
                            <Image
                                src="/icons/insta-logo.png"
                                width={32}
                                height={32}
                                alt="Instagram logo"
                                className="relative w-8 h-8 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/insta:rotate-[18deg] group-focus-visible/insta:rotate-[18deg]"
                            />
                        </Link>
                        <Link
                            href="https://www.github.com/kalandjl"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            className="group/github relative w-8 h-8 flex items-center justify-center outline-none"
                        >
                            <Image
                                src="/icons/github.png"
                                width={32}
                                height={32}
                                alt="GitHub logo"
                                className="w-8 h-8 object-contain transition-opacity duration-300 ease-out group-hover/github:opacity-60 group-focus-visible/github:opacity-60"
                            />
                            <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-black transition-all duration-300 ease-out group-hover/github:w-4 group-focus-visible/github:w-4" />
                        </Link>
                    </div>
                </div>


            </div>
            </footer>
        </>
    )
}

export default Footer