import { lato, latoLite, oswald, oswaldBold } from "@/app/fonts";
import { ArrowDown } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";

interface Props {}

const faqArr = [
    { 
        question: "How do I book a shoot?", 
        answer: "Booking a session is easy! Just email me or reach out via social media to discuss the details, and we’ll start planning your photoshoot." 
    },
    { 
        question: "How long does it take to receive my photos?", 
        answer: "I typically deliver your photos within 7 days, but I always strive to send them as soon as possible." 
    },
    { 
        question: "Do you offer custom packages for events or businesses?", 
        answer: "Yes! I can create personalized packages to fit your event or business needs. Let’s discuss what works best for you." 
    },
    { 
        question: "Do you offer payment plans?", 
        answer: "I don’t have formal payment plans, but I’m open to discussing flexible payment options if needed." 
    },
    { 
        question: "Do you travel for photoshoots or events?", 
        answer: "Yes, I’m available for travel! Travel fees may apply depending on the location." 
    },
    { 
        question: "Do you provide both digital and printed photos?", 
        answer: "I provide a digital collection of all photos from the shoot. If you’d like physical prints, they can be arranged for an additional cost." 
    },
    { 
        question: "How can you help manage or grow my social media?", 
        answer: "While I can’t guarantee specific results, my content creation and strategy expertise can help improve engagement and online presence over time." 
    },
    { 
        question: "What payment methods are available?", 
        answer: "E-transfer is the preferred payment method, but let me know if you need an alternative." 
    },
];


const FAQSection: FC<Props> = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.style.maxHeight = openIndex === index ? ref.scrollHeight + "px" : "0px";
            }
        });
    }, [openIndex]);

    return (
        <section id="faq-section" className="min-h-128 mb-20 mt-32">
            <h1 className={`${oswald.className} text-3xl text-center mt-20`}>Frequently Asked Questions</h1>
            <div className="w-screen px-64 mx-auto p-6 space-y-4">
                {faqArr.map((faq, index) => (
                    <div key={index} className="border-b mt-10 first:mt-0">
                        <button 
                            className={`w-full text-left text-xl font-medium py-3 focus:outline-none
                            hover:cursor-pointer hover:text-gray-700 transition ease-in-out flex justify-between ${oswald.className}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            <ArrowDown
                                className={`transform transition-transform duration-300 ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        <div
                        // @ts-ignore
                            ref={(el) => (contentRefs.current[index] = el)}
                            className={`overflow-hidden transition-all duration-300 ${latoLite.className}`}
                        >
                            <p className="text-gray-800 py-2">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSection;