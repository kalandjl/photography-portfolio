import HeroImageSection from "@/components/HeroImageSection";
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/graphics/Background.png"

const mobilePics = [
    { src: "/graphics/FINAL 6273341.jpg", width: 2160, height: 2160}, 
    { src: "/graphics/lucasgonzales.jpg", width: 5400, height: 7200}, 
    { src: "/graphics/Nathan Lowden Queens Commit Final.jpg", width: 4992, height: 6239}, 
    { src: "/graphics/Prov Sec.jpg", width: 1080, height: 1350 },
    { src: "/graphics/Saints day post.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Senior day post.jpg", width: 5358, height: 7200 },
    { src: "/graphics/24 hours.png", width: 1080, height: 1350 },
    { src: "/graphics/V3 6238121.jpg", width: 2160, height: 2160 },
    { src: "/graphics/Varsity Poster Final.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Winner.jpg", width: 6391, height: 4261 },
];

const pics = [
    { src: "/graphics/FINAL 6273341.jpg", width: 2160, height: 2160}, 
    { src: "/graphics/lucasgonzales.jpg", width: 5400, height: 7200}, 
    { src: "/graphics/Nathan Lowden Queens Commit Final.jpg", width: 4992, height: 6239}, 
    { src: "/graphics/Prov Sec.jpg", width: 1080, height: 1350 },
    { src: "/graphics/Saints day post.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Senior day post.jpg", width: 5358, height: 7200 },
    { src: "/graphics/24 hours.png", width: 1080, height: 1350 },
    { src: "/graphics/V3 6238121.jpg", width: 2160, height: 2160 },
    { src: "/graphics/Varsity Poster Final.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Winner.jpg", width: 6391, height: 4261 },
];

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