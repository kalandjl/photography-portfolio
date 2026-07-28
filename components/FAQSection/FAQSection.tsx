import { latoLite, oswald } from "@/app/fonts";
import { FC, useState } from "react";
import SectionImage from "@/public/images/sections/JMAI -02.jpg"
import PageImage from "@/public/images/sections/JMAI -01.jpg"
import CustomImage from "../CustomImage";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface Props {
    asSection: boolean
}

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
        question: "What payment methods are available?",
        answer: "E-transfer is the preferred payment method, but let me know if you need an alternative."
    },
];

// Heading rises first, then the list container hands each row its own delayed entrance via
// staggerChildren -- rows arrive one at a time on a spring instead of the whole block fading
// in as one flat unit.
const headingVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const listVariants: Variants = {
    hidden: {},
    visible: {
        transition: { delayChildren: 0.15, staggerChildren: 0.12 },
    },
};

const rowVariants: Variants = {
    hidden: { opacity: 0, y: 34 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 130, damping: 18, mass: 0.9 },
    },
};

const FAQSection: FC<Props> = (props) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq-section" className="min-h-128 relative text-white">
            <div className="py-20" id="content-wrap">
                <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={headingVariants}
                    className="agency text-3xl text-center mt-20"
                >
                    Frequently Asked Questions
                </motion.h1>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={listVariants}
                    className="max-w-4xl w-full px-6 md:px-16 lg:px-32 mx-auto p-6 mt-6"
                >
                    {faqArr.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div key={index} variants={rowVariants} className="group relative border-b border-white/15">
                                {/* Active/hover accent -- grows from the top edge, stays lit while the
                                    row is open, distinct from the fill-sweep/ink-blot mechanics used
                                    elsewhere tonight. */}
                                <span
                                    aria-hidden
                                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-white origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                                    }`}
                                />
                                <button
                                    className="w-full text-left py-5 pl-6 md:pl-8 pr-2 flex items-center gap-4 md:gap-6 focus:outline-none hover:cursor-pointer"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={`text-xs md:text-sm tabular-nums transition-colors duration-300 ${oswald.className} ${
                                        isOpen ? "text-white" : "text-white/30 group-hover:text-white/60"
                                    }`}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className={`flex-1 text-lg md:text-xl transition-all duration-300 ease-out ${oswald.className} ${
                                        isOpen
                                            ? "font-semibold text-white translate-x-1"
                                            : "font-medium text-white/75 group-hover:text-white group-hover:translate-x-1"
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <span className="relative w-4 h-4 shrink-0">
                                        <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-white" />
                                        <motion.span
                                            className="absolute left-1/2 top-0 w-[1.5px] h-4 -translate-x-1/2 bg-white"
                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                                                opacity: { duration: 0.3, ease: "easeOut" },
                                            }}
                                            className="overflow-hidden pl-6 md:pl-8"
                                        >
                                            <p className={`text-white/70 pb-5 pr-6 md:pr-16 leading-relaxed ${latoLite.className}`}>
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="absolute inset-0 -z-10">
                <div id="image-wrap" className="h-full relative">
                    <CustomImage src={props.asSection ? SectionImage : PageImage} alt="background image"
                    fill className="object-cover" />
                    <div className="absolute inset-0 bg-black opacity-80 "></div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
