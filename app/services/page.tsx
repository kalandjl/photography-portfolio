import Image from "next/image"
import HeroImage from "../../public/pictures/JMAI Post abits Rematch Retouched-2.jpg"
import Nav from "@/components/Nav"
import { ArrowDown } from "lucide-react"
import HeroImageSection from "@/components/HeroImageSection"

const Home = () => {

    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Services" />
        </>
    )
}

export default Home