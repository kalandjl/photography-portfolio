import Image from "next/image";
import HeroPic from "../../public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png"
import Nav from "@/components/Nav";
import { lato } from "../fonts";

const Home = () => {
    return (
        <>
            <Nav theme="dark" />
            <div id="hero-section" className="flex">
                <div id="image-container" className="relative h-screen">
                    {/* Overlay */}

                    {/* Fullscreen Image */}
                    <Image 
                        src={HeroPic} 
                        alt="hero pic" 
                        width={750}
                    />
                </div>
                <div id="about-text" className="grid py-32 px-32">
                    <div id="h1-container" className="grid place-items-center h-min w-full">
                        <h1 className={`${lato.className} text-black text-6xl w-full`}>
                            Johnson Mai
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
