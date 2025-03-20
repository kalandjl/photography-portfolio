"use client"

import Nav from "@/components/Nav"
import { lato, nunito } from "../fonts"
import { useState } from "react"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { firestore } from "@/lib/firebase"

const Home = () => {
    const labelClass = `text-xl text-gray-800 font-thin ${nunito.className}`;
    const inputClass = `${nunito.className} text-lg border-b-1 py-3 border-gray-800 w-full outline-none text-gray-800 mb-10 font-thin focus:bg-gray-100`;

    let [name, setName] = useState<string | undefined>(undefined);
    let [email, setEmail] = useState<string | undefined>(undefined);
    let [message, setMessage] = useState<string | undefined>(undefined);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent submission first

        const lastSubmit = localStorage.getItem("lastContactFormSubmit");
        const now = Date.now();

        if (lastSubmit && now - parseInt(lastSubmit) < 10_000) {
            const waitTime = Math.ceil((10_000 - (now - parseInt(lastSubmit))) / 1000);
            return alert(`Wait ${waitTime} more second(s) before submitting again.`);
        }

        try {
            await addDoc(collection(firestore, "messages"), {
                name,
                email,
                message,
                createdAt: Timestamp.fromDate(new Date()),
            });

            localStorage.setItem("lastContactFormSubmit", now.toString());
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <>
            <Nav theme="dark" />
            <main>
                <section id="form-section" className="h-screen grid grid-flow-col grid-cols-5">
                    <div id="contact-form-paragraph" className="w-full col-span-2 px-10 py-32">
                        <div id="text-wrap grid gap-12 h-2/3 grid place-items-center">
                            <h1 className={`text-2xl ${lato.className} font-thin`}>
                                Contact Me
                            </h1>
                            <p>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat ante potenti ex habitasse etiam interdum in. Nam dui ullamcorper suscipit quis fusce curae mollis scelerisque. Donec non commodo odio pretium magna fermentum sodales placerat!
                            </p>
                        </div>
                    </div>
                    <div id="contact-form-wrap" className="px-16 h-screen py-10 col-span-3 grid gap-10">
                        <div id="form-outer" className="px-16 py-16 bg-gray-100 rounded-md h-min">
                            <form id="contact-form" className="w-full h-full" onSubmit={handleSubmit}>
                                <div id="name-wrap">
                                    <label htmlFor="name-input" className={labelClass}>Name *</label>
                                    <input type="text" id="name-input" className={inputClass} 
                                        onChange={e => setName(e.target.value)} maxLength={50} required />
                                </div>
                                <div id="email-wrap">
                                    <label htmlFor="email-input" className={labelClass}>Email *</label>
                                    <input type="email" id="email-input" className={inputClass} 
                                        onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <div id="message-wrap" className="mb-10">
                                    <label htmlFor="message-input" className={labelClass}>Message</label>
                                    <textarea id="message-input" className={`${lato.className} text-lg border-b-1 py-3 border-gray-700 w-full outline-none text-gray-600 h-32`}
                                        onChange={e => setMessage(e.target.value)}
                                        minLength={20} maxLength={200} required />
                                </div>
                                <button type="submit" className={`border-1 px-10 py-3 border-gray-900 ${nunito.className} rounded-md hover:bg-gray-300 transition ease-in-out hover:scale-105 hover:cursor-pointer`}>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;
