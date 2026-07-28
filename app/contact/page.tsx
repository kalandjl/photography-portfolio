"use client";

import Nav from "@/components/Nav";
import { lato, latoLite, nunito } from "../fonts";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import InstaSection from "@/components/InstaSection";
import FAQSection from "@/components/FAQSection";
import HeroImageSection from "@/components/HeroImageSection";
import HeroImage from "@/public/images/sections/DSC07916.jpg";
import { AnimatePresence, motion } from "framer-motion";

type SubmitStatus = "idle" | "sending" | "success" | "error" | "rateLimited";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const BACK_OUT = [0.34, 1.56, 0.64, 1] as const;

const columnContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EXPO_OUT } },
};

const paragraphVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EXPO_OUT, delay: 0.15 } },
};

const panelVariants = {
    hidden: { opacity: 0, y: 48, rotateX: -10, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
};

const formStaggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const fieldVariants = {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: BACK_OUT } },
};

// Keyboard-focus-only affordance: four viewfinder-style AF brackets snap in
// around the active field, echoing the form panel's own corner brackets at a
// smaller scale. group-has-[:focus-visible] keys off the field's ancestor
// .group so this fires only for real focus-visible state, not mouse clicks
// (browsers do still grant text inputs focus-visible on click -- see report).
const FocusBrackets = () => (
    <>
        <span aria-hidden className="pointer-events-none absolute -top-2 -left-2 h-3 w-3 border-t-2 border-l-2 border-gray-900 opacity-0 scale-125 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:scale-100" />
        <span aria-hidden className="pointer-events-none absolute -top-2 -right-2 h-3 w-3 border-t-2 border-r-2 border-gray-900 opacity-0 scale-125 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:scale-100" />
        <span aria-hidden className="pointer-events-none absolute -bottom-2 -left-2 h-3 w-3 border-b-2 border-l-2 border-gray-900 opacity-0 scale-125 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:scale-100" />
        <span aria-hidden className="pointer-events-none absolute -bottom-2 -right-2 h-3 w-3 border-b-2 border-r-2 border-gray-900 opacity-0 scale-125 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:scale-100" />
    </>
);

const Home = () => {
    const labelClass = `text-xl text-gray-800 font-thin agency transition-colors duration-300 group-focus-within:text-black`;
    const inputClass = `${nunito.className} text-lg border-b-1 py-3 border-gray-300 w-full outline-none text-gray-800 font-thin bg-transparent`;
    const headline = "Let's Work Together";

    let [name, setName] = useState<string | undefined>(undefined);
    let [email, setEmail] = useState<string | undefined>(undefined);
    let [message, setMessage] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [waitSeconds, setWaitSeconds] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);
    const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent submission first

        if (status === "sending") return;
        if (statusTimerRef.current) clearTimeout(statusTimerRef.current);

        const lastSubmit = localStorage.getItem("lastContactFormSubmit");
        const now = Date.now();

        if (lastSubmit && now - parseInt(lastSubmit) < 10_000) {
            const waitTime = Math.ceil((10_000 - (now - parseInt(lastSubmit))) / 1000);
            setWaitSeconds(waitTime);
            setStatus("rateLimited");
            statusTimerRef.current = setTimeout(() => setStatus("idle"), waitTime * 1000);
            return;
        }

        setStatus("sending");

        try {
            await addDoc(collection(firestore, "messages"), {
                name,
                email,
                message,
                createdAt: Timestamp.fromDate(new Date()),
            });

            localStorage.setItem("lastContactFormSubmit", now.toString());
            formRef.current?.reset();
            setName(undefined);
            setEmail(undefined);
            setMessage(undefined);
            setStatus("success");
            statusTimerRef.current = setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("error");
            statusTimerRef.current = setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <>
            <main>
                <HeroImageSection src={HeroImage} width={6674} height={4449} title="Contact" />
                <motion.section
                    id="form-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid sm:grid-flow-col grid-flow-row sm:grid-cols-5 pb-32 pt-10"
                    style={{ perspective: 1200 }}
                >
                    <div className="w-full col-span-2 px-20 py-16">
                        <div id="contact-form-paragraph" >
                            <motion.div id="text-wrap" className="grid gap-12 h-2/3" variants={columnContainerVariants}>
                                <h1 className={`text-3xl agency mb-5 flex flex-wrap gap-x-3`}>
                                    {headline.split(" ").map((word, i) => (
                                        <motion.span key={i} variants={wordVariants} className="inline-block">
                                            {word}
                                        </motion.span>
                                    ))}
                                </h1>
                                <motion.p variants={paragraphVariants} className={`${latoLite.className}`}>
                                    Have a project in mind or need more details about my services? Fill out the form below to get in touch. Whether it’s photography, content creation, or social media strategy, I’m here to help bring your vision to life. Let’s create something unforgettable!
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                    <div className="sm:px-16 py-10 col-span-3 grid gap-10">
                        <div id="contact-form-wrap" >
                            <motion.div
                                id="form-outer"
                                variants={panelVariants}
                                className="relative px-16 py-16 bg-gradient-to-br from-white via-stone-50 to-stone-100 ring-1 ring-stone-200 shadow-[0_25px_60px_-20px_rgba(15,15,15,0.25)] h-min"
                            >
                                <span className="pointer-events-none absolute -top-2 -left-2 h-6 w-6 border-t-2 border-l-2 border-gray-900/70" />
                                <span className="pointer-events-none absolute -top-2 -right-2 h-6 w-6 border-t-2 border-r-2 border-gray-900/70" />
                                <span className="pointer-events-none absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-gray-900/70" />
                                <span className="pointer-events-none absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-gray-900/70" />
                                <motion.form
                                    id="contact-form"
                                    ref={formRef}
                                    className="w-full h-full"
                                    onSubmit={handleSubmit}
                                    variants={formStaggerVariants}
                                >
                                    <motion.div id="name-wrap" className="group" variants={fieldVariants}>
                                        <label htmlFor="name-input" className={labelClass}>Name *</label>
                                        <div className="relative mb-10">
                                            <input
                                                type="text"
                                                id="name-input"
                                                className={inputClass}
                                                onChange={e => setName(e.target.value)}
                                                maxLength={50}
                                                required
                                            />
                                            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
                                            <FocusBrackets />
                                        </div>
                                    </motion.div>
                                    <motion.div id="email-wrap" className="group" variants={fieldVariants}>
                                        <label htmlFor="email-input" className={labelClass}>Email *</label>
                                        <div className="relative mb-10">
                                            <input
                                                type="email"
                                                id="email-input"
                                                className={inputClass}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
                                            <FocusBrackets />
                                        </div>
                                    </motion.div>
                                    <motion.div id="message-wrap" className="group mb-10" variants={fieldVariants}>
                                        <label htmlFor="message-input" className={labelClass}>Message *</label>
                                        <div className="relative">
                                            <textarea
                                                id="message-input"
                                                className={`${lato.className} text-lg border-b-1 py-3 border-gray-300 w-full outline-none text-gray-600 h-32 bg-transparent`}
                                                onChange={e => setMessage(e.target.value)}
                                                minLength={20}
                                                maxLength={200}
                                                required
                                            />
                                            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
                                            <FocusBrackets />
                                        </div>
                                    </motion.div>
                                    <motion.button
                                        type="submit"
                                        disabled={status === "sending"}
                                        variants={fieldVariants}
                                        className={`group relative border-1 px-10 py-3 border-gray-900 ${nunito.className} rounded-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)] hover:cursor-pointer disabled:opacity-40 disabled:cursor-wait disabled:hover:translate-y-0 disabled:hover:shadow-none`}
                                    >
                                        <span className="relative inline-block">
                                            Send Message
                                            <span className="absolute -bottom-1 left-1/2 h-[1.5px] w-0 -translate-x-1/2 bg-gray-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                                        </span>
                                    </motion.button>
                                    <div className="relative">
                                        <AnimatePresence mode="wait">
                                            {status === "success" && (
                                                <motion.div
                                                    key="success"
                                                    initial={{ clipPath: "circle(0% at 0% 0%)", opacity: 0, filter: "blur(6px)" }}
                                                    animate={{ clipPath: "circle(150% at 0% 0%)", opacity: 1, filter: "blur(0px)" }}
                                                    exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.35, ease: EXPO_OUT } }}
                                                    transition={{ duration: 0.85, ease: BACK_OUT }}
                                                    className="relative mt-8 border-t border-gray-900/15 pt-6"
                                                >
                                                    <span aria-hidden className="pointer-events-none absolute -top-px left-0 h-2 w-2 border-t-2 border-l-2 border-gray-900/70" />
                                                    <span aria-hidden className="pointer-events-none absolute -top-px right-0 h-2 w-2 border-t-2 border-r-2 border-gray-900/70" />
                                                    <p className={`${nunito.className} text-lg text-gray-900`}>Message sent successfully!</p>
                                                </motion.div>
                                            )}
                                            {(status === "error" || status === "rateLimited") && (
                                                <motion.div
                                                    key="warn"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, x: [0, -7, 7, -4, 4, -1, 1, 0] }}
                                                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                                                    transition={{ opacity: { duration: 0.15 }, x: { duration: 0.5, ease: "easeOut" } }}
                                                    className="relative mt-8 border-t border-gray-900/15 pt-6"
                                                >
                                                    <span aria-hidden className="pointer-events-none absolute -top-px left-0 h-2 w-2 border-t-2 border-l-2 border-gray-900/40" />
                                                    <span aria-hidden className="pointer-events-none absolute -top-px right-0 h-2 w-2 border-t-2 border-r-2 border-gray-900/40" />
                                                    <p className={`${nunito.className} text-lg text-gray-700`}>
                                                        {status === "rateLimited"
                                                            ? `Wait ${waitSeconds} more second(s) before submitting again.`
                                                            : "Failed to send message. Please try again."}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.form>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
                <FAQSection asSection={true} />
                <InstaSection />
            </main>
        </>
    );
};

export default Home;
