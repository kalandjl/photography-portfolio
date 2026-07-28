"use client"
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/pictures/Windsor Champs-074.jpg"
import HeroImageSection from "@/components/HeroImageSection";
import ActionSection from "@/components/ActionSection";
import PortfolioSection from "@/components/PortfolioSection";
import InstaSection from "@/components/InstaSection";
import { pics, mobilePics } from "./sports.generated";

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Sports" />
            <PortfolioLayout pics={pics} mobilePicsProps={mobilePics} title="Sports" />

            <ActionSection
                links={[
                { title: "Contact Me", link: "/contact" },
                { title: "My Story", link: "/about" },
                ]}
            />
            <PortfolioSection />
            <InstaSection />
        </>
    )
};

export default Home;
