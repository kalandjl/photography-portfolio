import HeroImageSection from "@/components/HeroImageSection";
import PortfolioLayout from "@/components/PortfolioLayout";
import HeroImage from "@/public/graphics/Background.png"

const mobilePics = [
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/FINAL%206273341.jpg?alt=media&token=10171455-3aa2-46b4-8d92-cc793d29fa5f", width: 2160, height: 2160}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/lucasgonzales.jpg?alt=media&token=de62b6f4-9dda-4f8c-8f9e-4b06cda37992", width: 5400, height: 7200}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Nathan%20Lowden%20Queens%20Commit%20Final.jpg?alt=media&token=8bf5cd3a-2761-4819-bdd4-9b385a8c4aee", width: 4992, height: 6239}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Prov%20Sec.jpg?alt=media&token=82a64521-0de9-448c-ab39-0d8fd76b7b5f", width: 1080, height: 1350 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Saints%20day%20post.jpg?alt=media&token=5dee91cb-e75e-4b3a-ab6c-8704244e6b85", width: 5400, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Senior%20day%20post.jpg?alt=media&token=d52de52e-1878-46f0-9770-7529372d785f", width: 5358, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/24%20hours.png?alt=media&token=37bb413c-03c0-4f58-b848-5ce197ab62bc", width: 1080, height: 1350 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/V3%206238121.jpg?alt=media&token=9f9bf11c-52cb-44c4-8252-29ea0d4f02da", width: 2160, height: 2160 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Varsity%20Poster%20Final.jpg?alt=media&token=e8e0adf9-f75d-4b4b-94ff-9ac881b3a35a", width: 5400, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Winner.jpg?alt=media&token=f4bfad90-8695-4854-bce4-ca54c8c51f6c", width: 6391, height: 4261 },
];

const pics = [
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/FINAL%206273341.jpg?alt=media&token=10171455-3aa2-46b4-8d92-cc793d29fa5f", width: 2160, height: 2160}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/lucasgonzales.jpg?alt=media&token=de62b6f4-9dda-4f8c-8f9e-4b06cda37992", width: 5400, height: 7200}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Nathan%20Lowden%20Queens%20Commit%20Final.jpg?alt=media&token=8bf5cd3a-2761-4819-bdd4-9b385a8c4aee", width: 4992, height: 6239}, 
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Prov%20Sec.jpg?alt=media&token=82a64521-0de9-448c-ab39-0d8fd76b7b5f", width: 1080, height: 1350 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Saints%20day%20post.jpg?alt=media&token=5dee91cb-e75e-4b3a-ab6c-8704244e6b85", width: 5400, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Senior%20day%20post.jpg?alt=media&token=d52de52e-1878-46f0-9770-7529372d785f", width: 5358, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/24%20hours.png?alt=media&token=37bb413c-03c0-4f58-b848-5ce197ab62bc", width: 1080, height: 1350 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/V3%206238121.jpg?alt=media&token=9f9bf11c-52cb-44c4-8252-29ea0d4f02da", width: 2160, height: 2160 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Varsity%20Poster%20Final.jpg?alt=media&token=e8e0adf9-f75d-4b4b-94ff-9ac881b3a35a", width: 5400, height: 7200 },
    { src: "https://firebasestorage.googleapis.com/v0/b/photography-portfolio-e32a8.firebasestorage.app/o/Winner.jpg?alt=media&token=f4bfad90-8695-4854-bce4-ca54c8c51f6c", width: 6391, height: 4261 },
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