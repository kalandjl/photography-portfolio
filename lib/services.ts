import ServicePhoto1 from "@/public/images/gallery/sports/Saitns Round 1 VARSITY-101.jpg";
import ServicePhoto2 from "@/public/images/gallery/portraits/JMAI LAX MEDIA DAY-41.jpg";
import ServicePhoto3 from "@/public/graphics/Nathan Lowden Queens Commit Final.jpg";
import ServicePhoto4 from "@/public/images/gallery/graphics/Saints day post.jpg";
import ServicePhoto5 from "@/public/images/gallery/sports/DSC07868.jpg";
import ServicePhoto6 from "@/public/images/gallery/portraits/JMAi THEATRE HEADSHOTS-48 copy.jpg";
import ServicePhoto7 from "@/public/images/gallery/graphics/Winner.jpg";
import ServicePhoto8 from "@/public/images/gallery/sports/JMAI Post abits Rematch Retouched-2.jpg";
import ServicePhoto9 from "@/public/images/gallery/sports/Ryan and Taylor-005.jpg";
import ServicePhoto10 from "@/public/images/gallery/graphics/Andres BC All Stars Game.png";
import Service from "@/types/Service";

// Single source of truth for the services list -- both the /services page (full
// detail layout) and ServicesSection (homepage/other-pages teaser) import this,
// rather than maintaining two independently-hand-typed copies that can (and did)
// drift apart.
export const services: Service[] = [
    {
        title: "Sports Photography",
        description: "High-energy shots that capture the excitement, passion, and intensity of sports. Ideal for athletes, teams, and organizations looking to document seasons or promote programs.",
        imageSrc: ServicePhoto1,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Capture the Action. Relive the Game.",
    },
    {
        title: "Team Media Day",
        objectTop: true,
        description: "Professional portraits that showcase team spirit, perfect for social media, promotions, and player profiles. These polished images enhance your team’s presence and serve as cherished keepsakes.",
        imageSrc: ServicePhoto2,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Polished Portraits. Lasting Memories.",
    },
    {
        title: "Graphic Design",
        description: "Custom-designed visuals for social media, posters, banners, and branding. Whether for announcements or marketing, I create eye-catching designs that captivate audiences.",
        imageSrc: ServicePhoto3,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Bold Designs. Strong Impressions.",
    },
    {
        title: "Event Photography",
        description: "Capturing live events, celebrations, and corporate gatherings with professional visuals that preserve the energy and atmosphere.",
        imageSrc: ServicePhoto5,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Capture Moments. Relive Experiences.",
    },
    {
        title: "Headshots & Corporate Portraits",
        description: "Modern, professional headshots for resumes, LinkedIn profiles, and company websites. Clean, polished, and tailored to your style.",
        imageSrc: ServicePhoto6,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Sharp. Professional. Impactful.",
    },
    {
        title: "Social Media Strategy & Management",
        description: "Helping businesses and teams build impactful online presences through content creation and strategic planning. Boost engagement, grow followers, and communicate your brand’s story effectively.",
        imageSrc: ServicePhoto4,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Increase Engagement. Strengthen Your Brand.",
    },
    {
        title: "Content Creation Packages",
        description: "Ongoing content solutions for businesses and influencers, providing high-quality photos, videos, and graphics to keep social media fresh and engaging.",
        imageSrc: ServicePhoto7,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Consistent Content. Steady Growth.",
    },
    {
        title: "Highlight Reels & Videos",
        description: "Short-form videos and highlight reels for social media, marketing, and events. Designed to capture energy and maximize engagement.",
        imageSrc: ServicePhoto8,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Dynamic Stories. Lasting Impact.",
    },
    {
        title: "Family Portraits",
        description: "Timeless portraits that celebrate families and relationships—perfect for holidays, milestones, or capturing everyday moments.",
        imageSrc: ServicePhoto9,
        imageWidth: 7002,
        imageHeight: 3016,
        captcha: "Cherish Today. Remember Forever.",
    },
    {
        title: "Commitment or Player Recognition",
        description: "Celebrate dedication and achievement with my custom graphics designed to honor outstanding commitment or recognize exceptional players in your organization",
        imageSrc: ServicePhoto10,
        imageWidth: 5400,
        imageHeight: 7200,
        captcha: "For those who deserve the recognition",
    },
];
