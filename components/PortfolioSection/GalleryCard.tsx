import { lato, latoLite, oswald } from "@/app/fonts";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
    src: StaticImageData
    height: number
    width: number
    link: string
    title: string
}

const GalleryCard: FC<Props> = (props) => {

    return (
        <>
            <div id="image-wrap" className="overflow-hidden h-full relative">
                <Image src={props.src} height={props.height} width={props.width} alt="card image" className="object-cover w-full h-full" /> 
                {/* Overlay section */}
                <div className="inset-0 absolute">
                    <div className="relative h-full">
                        <div className="bg-black opacity-70 absolute inset-0 z-0"></div>
                        <div id="main-section" className="h-full">
                            <div id="text-wrap" className="h-full px-20 grid place-items-center z-10 pb-20">
                                <div className="grid gap-10">
                                    <Link href={props.link} className="flex gap-2 transition duration-300 relative group w-min">
                                        <p className={`text-white ${oswald.className} w-max text-3xl opacity-100 z-10 text-center`}>{props.title}</p>
                                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GalleryCard