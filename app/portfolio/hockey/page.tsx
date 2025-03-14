import PortfolioLayout from "@/components/PortfolioLayout";

const pics = [
    { src: "/pictures/JMAI Post abits Rematch-094.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI -006.jpg", width: 4622, height: 3081}, 
    { src: "/pictures/JMAI -038.jpg", width: 4158, height: 2772}, 
    { src: "/pictures/JMAI -001.jpg", width: 2048, height: 1365}, 
    { src: "/pictures/JMAI -069.jpg", width: 6645, height: 4430}, 
    { src: "/pictures/JMAI -148.jpg", width: 6087, height: 4058}, 
    { src: "/pictures/JMAI -220.jpg", width: 3889, height: 2593}, 
    { src: "/pictures/JMAI NV HOCKEY-018.jpg", width: 5812, height: 3875}, 
    { src: "/pictures/JMAI Post abits Rematch Retouched-2.jpg", width: 6220, height: 4147}, 
    { src: "/pictures/JMAI -128.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI Post abits Rematch-018.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI -009.jpg", width: 6426, height: 4284}, 
    { src: "/pictures/JMAI Post abits Rematch-031.jpg", width: 3620, height: 2413}, 
];

const Home = () => {
    return (
        <PortfolioLayout pics={pics} title="Hockey" />
    )
};

export default Home;