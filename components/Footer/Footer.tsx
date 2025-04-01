import { lato, latoLite, nunito, oswald, shoulders } from "@/app/fonts";
import Link from "next/link";
import { FC } from "react";

interface Props {
    
}

let links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Clients", href: "/clients" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" }
];


const Footer: FC<Props> = (props) => {

    return (
        <>
            <footer id="footer" className="px-10 grid py-5 gap-5">
                <div id="links" className="sm:flex hidden gap-3">
                    {links.map((link, i) => (
                        <Link href={link.href} key={i} className="hover:scale-105 hover:bg-gray-100 transition ease-in-out">
                            <p className={`text-black font-semibold px-4 py-2 rounded-lg transition ${lato.className}`}>
                                {link.title}
                            </p>
                        </Link>
                    ))}
                </div>
                <div id="copyright" className="px-10 w-screen flex">
                    <p className={`${latoLite.className}`}>
                        {`© ${new Date().getFullYear()} JMAI.PHOTOS. `}
                        <span className="italic flex">
                            {`Designed and Developed by`}
                            <span className="w-1"></span>
                            <Link href="https://www.github.com/kalandjl" className="text-blue-500 not-italic underline">
                                Kalan Jarvis-Loewen
                            </Link>
                        </span>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer