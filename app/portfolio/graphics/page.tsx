import HeroImageSection from "@/components/HeroImageSection";
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/graphics/Background.png"
import { pics, mobilePics } from "./graphics.generated";

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={1920} height={1022} title="Graphics" opacity={85} />
            <div className="opacity-85"></div>
            <PortfolioLayout pics={pics} title="Graphics" mobilePicsProps={mobilePics} columns={2} />
        </>
    )
};

export default Home;
