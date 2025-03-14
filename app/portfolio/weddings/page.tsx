import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/pictures/DSC01032.jpg", width: 4672, height: 7008}, 
    { src: "/pictures/DSC01063.jpg", width: 4672, height: 7008}, 
    { src: "/pictures/DSC01374.jpg", width: 3902, height: 6165}, 
    { src: "/pictures/Ryan and Taylor-005.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/Ryan and Taylor-006.jpg", width: 4672, height: 7008}, 
    { src: "/pictures/Ryan and Taylor-074.jpg", width: 3835, height: 4672}, 
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="Wedding" />
    )
};

export default Home;