import { ArrowDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import Nav from "../Nav";

interface Props {
    src: StaticImageData
    width: number
    height: number
    title: string
}

const HeroImageSection: FC<Props> = (props) => {

    return (
        <>
            <main id="hero-section">
                <section className="h-screen relative">
                    <div className="bg-black opacity-70 w-full h-full absolute z-10"></div>
                    <div className="relative w-full h-full">
                        <Image src={props.src} height={props.height} width={props.width} alt="hero image" className="absolute w-full h-full object-cover"/>
                    </div>
                </section>

                {/* Overlay Section */}
                <section className="z-10 absolute top-0 w-full h-screen">
                    <Nav />
                    <main className="px-32 grid place-items-center relative h-full">
                        <h1 className="font-bold text-4xl px-10 py-5 text-white h-64">{props.title}</h1>
                        <div id="arrow" className="absolute bottom-0 h-20 mb-16 grid place-items-center">
                            <ArrowDown stroke="#ffffff" className="h-12 w-8 animate-bounce" />
                        </div>
                    </main>
                </section>


            </main>
        </>
    )
}

export default HeroImageSection