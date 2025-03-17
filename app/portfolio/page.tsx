import Nav from "@/components/Nav"
import Image from "next/image"
import HeroImage from "../../public/pictures/_DSC6971.jpg"
import SportsImage from "../../public/pictures/_DSC2941.jpg"
import GraphicsImgae from "../../public/graphics/Nathan Lowden Queens Commit Final.jpg"
import { lato, nunito, oswald } from "../fonts"
import Link from "next/link"
import { ArrowBigLeft, ArrowRight } from "lucide-react"

const Home = () => {

    return (
        <>
            <main id="main-hero">
                <section className="h-screen">
                    <div className="bg-black opacity-70 w-full h-full absolute z-10"></div>
                        <div className="relative w-full h-full">
                        <Image src={HeroImage} height={7008} width={4672} alt="hero image" className="absolute w-full h-full object-cover"/>
                        {/* Navigation Arrows */}
                    </div>
                </section>
                {/* Overlay Section */}
                <section className="z-10 absolute top-0 w-full">
                <Nav  />
                <main className="px-32 grid place-items-center mt-64">
                    <h1 className="font-bold text-4xl px-10 py-5 text-white">
                        Portfolio
                    </h1>
                </main>
                </section>
            </main>
            <main id="portfolio-links">
                <section id="sports-hero" className="grid grid-cols-5 h-144">
                    <div id="image-wrap" className="col-span-3 overflow-hidden">
                        <Image src={SportsImage} width={6671} height={4447} alt="" />
                    </div>
                    <div id="link-wrap" className="col-span-2 grid place-items-center">
                        <div className="grid place-items-center">
                            <Link href="/portfolio/sports" className="hover:scale-105 transition ease-in-out">
                                <div className="grid grid-flow-col gap-4">
                                    <div className="grid">
                                        <h1 className={`${oswald.className} text-4xl text-center`}>Sports</h1>
                                        <div className="mt-6"></div>
                                        <p className={`text-sm text-center ${nunito.className}`}>
                                            Hockey, Basketball, Football and more!
                                        </p>
                                    </div>
                                    <div id="icon-wrap" className="grid h-full place-items-center">
                                        <ArrowRight />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
                <section id="sports-hero" className="grid grid-cols-5 h-192">
                    <div id="link-wrap" className="col-span-2 grid place-items-center">
                        <div className="grid place-items-center">
                            <Link href="/portfolio/graphics" className="hover:scale-105 transition ease-in-out">
                                <div className="grid grid-flow-col gap-4">
                                    <div className="grid">
                                        <h1 className={`${oswald.className} text-4xl text-center`}>Graphics</h1>
                                        <div className="mt-6"></div>
                                        <p className={`text-sm text-center ${nunito.className}`}>
                                            Game day, Athlete commits
                                        </p>
                                    </div>
                                    <div id="icon-wrap" className="grid h-full place-items-center">
                                        <ArrowRight />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div id="image-wrap" className="col-span-3 overflow-hidden">
                        <Image src={GraphicsImgae} width={6671} height={4447} alt="" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home