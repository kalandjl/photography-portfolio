import ContactSection from "@/components/ContactSection";
import HeroImageSection from "@/components/HeroImageSection";
import InstaSection from "@/components/InstaSection";
import ServicesSection from "@/components/ServicesSection";
import HeroImage from "@/public/pictures/JMAI -220.jpg";
import { lato, oswald } from "../fonts";

let clients: string[] = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6", "Client 7"]

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroImageSection src={HeroImage} width={3889} height={2593} title="Clients" />
            
            {/* Clients Section */}
            <section className="px-12 py-24 text-center" id="clients-section">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl font-bold tracking-tight uppercase agency">My Clients</h1>
                    <p className={`mt-6 text-lg text-gray-800 ${lato.className}`}>
                        I’ve had the privilege of working with incredible clients, capturing their most meaningful moments with authenticity and artistry. 
                        From personal projects to commercial shoots, each collaboration is a story waiting to be told.
                    </p>
                </div>

                {/* Client Showcase */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {clients.map((client, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-sm transform hover:scale-105 transition">
                            <p className={`text-2xl font-semibold text-gray-800 ${oswald.className}`}>{client}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div id="testimonials-section" className="px-20 py-20">
                <h1 className="text-3xl font-bold tracking-tight uppercase agency">Testimonials</h1>

            </div>

            <ServicesSection />
            <ContactSection />
            <InstaSection />
        </>
    );
};

export default Home;
