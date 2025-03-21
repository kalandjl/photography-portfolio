import { FC, useState, useRef, useEffect } from "react";

interface Props {}

const faqArr = [
    {
        question: "How do I book a shoot?", 
        answer: "Booking a session is simple! Just reach out to me via email or social media to discuss the details, and we can start organizing your photoshoot.",
    },
    {
        question: "How long does it take to receive my photos?", 
        answer: "Typically, I aim to deliver your photos within 7 days of the photoshoot. However, I strive to get your digital collection to you as quickly as possible, often in less time.",
    },
    {
        question: "Do you offer custom packages for events or businesses?", 
        answer: "Yes! I offer custom packages tailored to the specific needs of your event or business. Let’s discuss your requirements, and I’ll create a package that works for you.",
    },
    {
        question: "What payment methods are available?", 
        answer: "E-transfer is the most convenient way to pay for services. Let me know if you require a different payment method, and we can make arrangements.",
    },
];

const FAQ: FC<Props> = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                if (openIndex === index) {
                    ref.style.maxHeight = ref.scrollHeight + "px";
                    ref.style.opacity = "1";
                } else {
                    ref.style.maxHeight = "0px";
                    ref.style.opacity = "0";
                }
            }
        });
    }, [openIndex]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqArr.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                        <button 
                            className="w-full text-left font-semibold text-xl flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-lg shadow-sm"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span className="text-2xl text-gray-600 transition-transform duration-300" style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0)" }}>
                                ▼
                            </span>
                        </button>
                        <div 
                            // @ts-ignore
                            ref={(el) => (contentRefs.current[index] = el)}
                            className="overflow-hidden transition-all duration-500 ease-in-out opacity-0 max-h-0"
                        >
                            <p className="mt-4 text-lg text-gray-700 p-4 bg-gray-50 rounded-lg shadow-inner">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;