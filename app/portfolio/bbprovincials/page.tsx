import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/pictures/_DSC0646-Enhanced-NR.jpg", width: 6673, height: 4449}, 
    { src: "/pictures/_DSC0666-Enhanced-NR.jpg", width: 7708, height: 4672}, 
    { src: "/pictures/_DSC0676-Enhanced-NR.jpg", width: 7708, height: 4672}, 
    { src: "/pictures/_DSC6815.jpg", width: 6037, height: 4025},
    { src: "/pictures/_DSC6971.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/_DSC9083.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/_DSC9997-Enhanced-NR.jpg", width: 3763, height: 5645}
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="BC Basketball Provincials" />
    )
};

export default Home;