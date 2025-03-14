import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/graphics/FINAL 6273341.jpg", width: 2160, height: 2160}, 
    { src: "/graphics/lucasgonzales.jpg", width: 5400, height: 7200}, 
    { src: "/graphics/Nathan Lowden Queens Commit Final.jpg", width: 4992, height: 6239}, 
    { src: "/graphics/Prov Sec.jpg", width: 1080, height: 1350 },
    { src: "/graphics/Saints day post.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Senior day post.jpg", width: 5358, height: 7200 },
    { src: "/graphics/V3 6238121.jpg", width: 2160, height: 2160 },
    { src: "/graphics/Varsity Poster Final.jpg", width: 5400, height: 7200 },
    { src: "/graphics/Winner.jpg", width: 6391, height: 4261 },
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="Graphics" />
    )
};

export default Home;