import { lato, nunito } from "@/app/fonts";
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
            <footer id="footer" className="h-20">
                <div id="links" className="flex gap-3">
                    {links.map((link, i) => (
                        <Link href={link.href} key={i}>
                            <p className={`text-black text-lg font-semibold px-4 py-2 rounded-lg transition ${nunito.className}`}>
                                {link.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </footer>
        </>
    )
}

export default Footer