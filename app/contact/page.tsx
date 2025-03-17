"use client"

import Nav from "@/components/Nav"
import { lato, nunito } from "../fonts"
import { useState } from "react"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { firestore } from "@/lib/firebase"

const Home = () => {

    const labelClass = `text-xl text-gray-800 font-thin ${nunito.className}`
    const inputClass = `${nunito.className} text-lg border-b-1 py-3 border-gray-800 w-full outline-none text-gray-800 mb-10 font-thin focus:bg-gray-100`

    let [name, setName] = useState<string | undefined>(undefined)
    let [email, setEmail] = useState<string | undefined>(undefined)
    let [message, setMessage] = useState<string | undefined>(undefined)

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
                            <div className="mt-10"></div>
                            <p>
                                Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat ante potenti ex habitasse etiam interdum in. Nam dui ullamcorper suscipit quis fusce curae mollis scelerisque. Donec non commodo odio pretium magna fermentum sodales placerat!
                            </p>
                        </div>
                    </div>
                    <div id="contact-form-wrap" className="div px-32 h-screen py-20 col-span-3 grid gap-10 bg-gray-200">
                        <form action="" id="contact-form" className="w-full h-full"
                        onSubmit={e => {
                            e.preventDefault()

                            addDoc(collection(firestore, "messages"), {
                                name: name,
                                email: email,
                                message: message,
                                createdAt: new Timestamp(new Date().getSeconds(), new Date().getSeconds() * 1000000)
                            })
                        }}>
                            <div id="name-wrap" className="">
                                <label htmlFor="name-input" className={labelClass}>Name *</label>
                                <input type="text" id="name-input" className={inputClass} onChange={e => setName(e.currentTarget.value)} />
                            </div>
                            <div id="name-wrap" className="">
                                <label htmlFor="name-input" className={labelClass}>Email *</label>
                                <input type="text" id="name-input" className={inputClass} onChange={e => setEmail(e.currentTarget.value)} />
                            </div>
                            <div id="name-wrap" className="mb-10">
                                <label htmlFor="name-input" className={labelClass}>Message</label>
                                <textarea id="name-input" 
                                className={`${lato.className} text-lg border-b-1 py-3 border-gray-700 w-full outline-none text-gray-600 h-32`} 
                                onChange={e => setMessage(e.currentTarget.value)}
                                required/>
                            </div>
                            <button type="submit" className={`border-1 px-10 py-3 border-gray-900 ${nunito.className} rounded-md hover:bg-gray-300 transition
                             ease-in-out hover:scale-105 hover:cursor-pointer`}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home