"use client"
import Nav from "@/components/Nav"
import { lato, roboto } from "../fonts"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore, provider } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import Image from "next/image";
import { adminList } from "@/res/adminList";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";


const Home = () => {

    let [user] = useAuthState(auth)
    let [messages, setMessages] = useState<{[x:string]: any}[]>([])

    useEffect(() => {

        const doAsync = async () => {

            const docs = await getDocs(collection(firestore, "messages"))
            const t = docs.docs.filter(doc => doc.id != "bd1MlzXf94J8Jh6p5JBZ").map((doc) => doc.data())
            setMessages(t)
        }

        doAsync()
    }, [])

    return (
        <>  
            <Nav theme="dark" />
            <main className="h-screen px-32 py-10">
                <h1 className={`${roboto.className} text-4xl`}>Admin Dashboard</h1>
                {user ? <></> :
                <>
                    <h1 className={`${roboto.className} text-xl`}>Login</h1>
                    <button
                    className="hover:bg-sky-400 bg-sky-300 p-3 rounded-md text-3xl mt-10 hover:cursor-pointer"
                    onClick={async e => {

                        try {
                            const res = await signInWithPopup(auth, provider)

                            let { user } = res
            
                        
                        } catch (e) {

                            // @ts-ignore
                            const errorCode = e.code;
                            // @ts-ignore
                            const errorMessage = e.message;
                            // @ts-ignore
                            const email = e.customData.email;
                            // @ts-ignore
                            const credential = GoogleAuthProvider.credentialFromError(e);

                            console.log(`Code ${errorCode}, ${errorMessage}`)
                        }
                    }}>
                        <div className="grid gap-7 grid-flow-col">
                            <Image src="/icons/google-logo.png" alt="Google Icon" width={100} height={50} />
                            <p
                            className="h-26 grid place-items-center w-max whitespace-nowrap font-bold mr-2">
                                SIGN IN
                            </p> 
                        </div>
                    </button> 
                </>
                }
                {user?.email ? adminList.includes(user.email) ? 
                <section id="admin-console">
                    <h1>Signed in as admin</h1>
                    <div id="header-wrap" className={`${roboto.className} mt-10 text-xl fond-bold bg-gray-300 px-6 py-3 w-min font-bold mb-5`}>
                        <h1 className="w-max">Message Inbox</h1>
                    </div>
                    <div id="messages-wrap" className="grid gap-5">
                        {messages.map((message, i) => (
                            <div key={i} className="bg-gray-200 px-10 py-5">
                                <div className="flex">
                                    <p className={`${lato.className} text-xl flex`}>
                                        {message.name}
                                        <div className="mr-3"></div>
                                        <span className="font-normal">{`${message.email}`}</span>
                                        <div className="mr-3"></div>
                                        <span className="font-normal bg-gray-300 px-2">
                                            {`${new Date(message.createdAt.seconds * 1000).toLocaleDateString()}`}
                                        </span>
                                    </p>
                                </div>
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </section> : 
                <></> : 
                <></>
                }
            </main>
        </>
    )
}

export default Home