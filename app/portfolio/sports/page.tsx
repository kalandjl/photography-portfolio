import PortfolioLayout from "@/components/PortfolioLayout";
import Head from "next/head";

const pics = [
    { src: "/pictures/_DSC0316-Enhanced-NR.jpg", width: 5994, height: 3996}, 
    { src: "/pictures/_DSC2941.jpg", width: 6671, height: 4447}, 
    { src: "/pictures/_DSC6059-Enhanced-NR.jpg", width: 6419, height: 4279}, 
    { src: "/pictures/_DSC6639.jpg", width: 6476, height: 4317}, 
    { src: "/pictures/Saitns Round 1 VARSITY-101.jpg", width: 2400, height: 1600}, 
    { src: "/pictures/Saitns Round 1 VARSITY-131.jpg", width: 7008, height: 4672}, 
    { src: "/pictures/JMAI -22.jpg", width: 5467, height: 3645}, 
    { src: "/pictures/JMAI -45.jpg", width: 2965, height: 1977}, 
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
        <>
            <PortfolioLayout pics={pics} title="Sports" />
        </>
    )
};

export default Home;