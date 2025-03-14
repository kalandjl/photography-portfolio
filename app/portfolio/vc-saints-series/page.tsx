import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/pictures/_DSC0316-Enhanced-NR.jpg", width: 5994, height: 3996}, 
    { src: "/pictures/_DSC2941.jpg", width: 6671, height: 4447}, 
    { src: "/pictures/_DSC6059-Enhanced-NR.jpg", width: 6419, height: 4279}, 
    { src: "/pictures/_DSC6639.jpg", width: 6476, height: 4317}, 
    { src: "/pictures/Saitns Round 1 VARSITY-101.jpg", width: 2400, height: 1600}, 
    { src: "/pictures/Saitns Round 1 VARSITY-101.jpg", width: 6256, height: 4171}, 
    { src: "/pictures/Saitns Round 1 VARSITY-131.jpg", width: 7008, height: 4672}, 
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="VC Saints Series 2025" />
    )
};

export default Home;