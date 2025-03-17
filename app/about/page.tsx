import Image from "next/image";
import HeroPic from "../../public/pictures/about/Screenshot 2025-03-13 at 9.27.54 PM.png";
import Nav from "@/components/Nav";
import { lato } from "../fonts";

const Home = () => {
    return (
        <>
            <Nav theme="dark" />
            <div id="hero-section" className="grid grid-cols-1 md:grid-cols-7 h-screen">
                {/* Fullscreen Image */}
                <div id="image-container" className="relative h-screen md:col-span-3">
                    <Image 
                        src={HeroPic} 
                        alt="hero pic"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>

                {/* Centered Text Section */}
                <div id="about-text" className="flex flex-col justify-center items-center text-center p-6 md:col-span-4">
                    <h1 className={`${lato.className} text-black text-5xl md:text-6xl mb-6`}>
                        Johnson Mai
                    </h1>
                    <p className="text-lg md:text-xl max-w-prose">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat ante potenti ex habitasse etiam interdum in. Nam dui ullamcorper suscipit quis fusce curae mollis scelerisque. Donec non commodo odio pretium magna fermentum sodales placerat!
                    </p>
                </div>
            </div>
        </>
    );
};

export default Home;
