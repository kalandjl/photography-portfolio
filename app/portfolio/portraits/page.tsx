import HeroImageSection from "@/components/HeroImageSection";
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/portraits/Ryan and Taylor-005.jpg"

const pics = [

    // Row 1
    { src: "/portraits/Devine and Ngan-39.jpg", width: 3714, height: 5571}, 
    { src: "/portraits/Devine and Ngan-46.jpg", width: 4317, height: 6476, big: true }, 
    { src: "/portraits/Devine and Ngan-49.jpg", width: 4672, height: 7008, leftBig: true }, 

    { src: "/hidden.jpeg", width: 4672, height: 7008}, 
    


    { src: "/portraits/DSC01063.jpg", width: 4672, height: 7008}, 
    { src: "/hidden1.jpeg", width: 4672, height: 7008}, 
    { src: "/portraits/DSC01374.jpg", width: 4672, height: 7008}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-01.jpg", width: 4672, height: 5671, big: true}, 
    { src: "/portraits/DSC01032.jpg", width: 4672, height: 7008}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-06-2.jpg", width: 1684, height: 2048}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-08.jpg", width: 4672, height: 4936}, 
    { src: "/hidden2.jpeg", width: 1493, height: 2048}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-13-2.jpg", width: 2048, height: 2030}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-26.jpg", width: 4240, height: 5144}, 
    { src: "/hidden3.jpeg", width: 4297, height: 4500}, 
    { src: "/portraits/JMAi THEATRE HEADSHOTS-23.jpg", width: 3787, height: 5681}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-11-2.jpg", width: 1493, height: 2048}, 
    { src: "/portraits/JMAI LAX MEDIA DAY-41.jpg", width: 4297, height: 5554}, 
    { src: "/hidden4.jpeg", width: 4054, height: 6081, hidden: true}, 
    { src: "/portraits/JMAi THEATRE HEADSHOTS-48.jpg", width: 4248, height: 6372}, 
    { src: "/portraits/Devine and Ngan-51.jpg", width: 6184, height: 4123}, 
    // { src: "/portraits/Ryan and Taylor-006.jpg", width: 4672, height: 7008}, 
    { src: "/portraits/JMAi THEATRE HEADSHOTS-45.jpg", width: 4054, height: 6081}, 
];

const Home = () => {
    return (
        <>
            <HeroImageSection src={HeroImage} width={7008} height={4672} title="Portraits" />
            <PortfolioLayout pics={pics} title="Potraits" />
        </>
    )
};

export default Home;