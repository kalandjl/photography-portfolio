import { oswald, oswaldBold } from "@/app/fonts";
import { ArrowDown } from "lucide-react";
import { FC, useState, useRef, useEffect } from "react";

interface Props {}

const faqArr = [
    { question: "How do I book a shoot?", answer: "Booking is simple! Just email or message me on social media to discuss details." },
    { question: "How long does it take to receive my photos?", answer: "I aim to deliver photos within 7 days, often sooner." },
    { question: "Do you offer custom packages?", answer: "Yes! I can create tailored packages for events or businesses." },
    { question: "What payment methods are available?", answer: "E-transfer is preferred, but let me know if you need alternatives." },
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
        <div className="w-screen px-64 mx-auto p-6 space-y-4">
            {faqArr.map((faq, index) => (
                <div key={index} className="border-b mt-10 first:mt-0">
                    <button 
                        className={`w-full text-left text-lg font-medium py-3 focus:outline-none
                        hover:cusor-pointer hover:text-gray-700 transition ease-in-out flex justify-between ${oswaldBold.className}`}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        {faq.question}
                        <ArrowDown />
                    </button>
                    <div
                    // @ts-ignore
                        ref={(el) => (contentRefs.current[index] = el)}
                        className="overflow-hidden transition-all duration-300"
                    >
                        <p className="text-gray-800 py-2">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQSection;