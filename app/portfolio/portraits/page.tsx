import HeroImageSection from "@/components/HeroImageSection";
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/portraits/Ryan and Taylor-005.jpg"
import { pics, mobilePics } from "./portraits.generated";

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portraits" />
            <PortfolioLayout pics={pics} title="Portraits" mobilePicsProps={mobilePics} />
        </>
    )
};

export default Home;
