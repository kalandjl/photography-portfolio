import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/pictures/JMAI -22.jpg", width: 5467, height: 3645}, 
    { src: "/pictures/JMAI -45.jpg", width: 2965, height: 1977}, 
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="Ski" />
    )
};

export default Home;