"use client";

import Nav from "@/components/Nav";
import { lato, roboto } from "../fonts";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firestore, provider } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { adminList } from "@/res/adminList";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: { seconds: number };
}

const Home: React.FC = () => {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageRefs, setMessageRefs] = useState<{ [key: string]: boolean }>({});
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const docs = await getDocs(collection(firestore, "messages"));
            const filteredDocs = docs.docs
                .filter(doc => doc.id !== "bd1MlzXf94J8Jh6p5JBZ")
                .map(doc => ({ ...doc.data(), id: doc.id }) as Message);
            setMessages(filteredDocs);
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        const refs: { [key: string]: boolean } = {};
        messages.forEach(message => {
            refs[message.id] = true;
        });
        setMessageRefs(refs);
    }, [messages]);

    const confirmDelete = (id: string) => {
        setSelectedMessageId(id);
        setModalVisible(true);
    };

    const handleDelete = async () => {
        if (selectedMessageId) {
            setMessageRefs(prev => ({ ...prev, [selectedMessageId]: false }));
            try {
                await deleteDoc(doc(firestore, `/messages/${selectedMessageId}`));
            } catch (error) {
                alert("Error deleting document: " + error);
            }
            setModalVisible(false);
        }
    };

    return (
        <>
            <Nav theme="dark" />
            <main className="h-screen px-32 py-10">
                <h1 className={`${roboto.className} text-4xl`}>Admin Dashboard</h1>
                {!user ? (
                    <>
                        <h1 className={`${roboto.className} text-xl`}>Login</h1>
                        <button
                            className="hover:bg-sky-400 bg-sky-300 p-3 rounded-md text-3xl mt-10 hover:cursor-pointer"
                            onClick={async () => {
                                try {
                                    await signInWithPopup(auth, provider);
                                } catch (e: any) {
                                    console.log(`Code ${e.code}, ${e.message}`);
                                }
                            }}
                        >
                            <div className="grid gap-7 grid-flow-col">
                                <Image src="/icons/google-logo.png" alt="Google Icon" width={100} height={50} />
                                <p className="h-26 grid place-items-center w-max whitespace-nowrap font-bold mr-2">SIGN IN</p>
                            </div>
                        </button>
                    </>
                ) : adminList.includes(user.email ?? "") ? (
                    <section id="admin-console">
                        <h1>Signed in as admin</h1>
                        <div className={`${roboto.className} mt-10 text-xl font-bold bg-gray-300 px-6 py-3 w-min mb-5`}>Message Inbox</div>
                        <div className="grid gap-5">
                            {messages.map(message => (
                                <div key={message.id} className={`bg-gray-200 px-10 py-5 flex justify-between ${messageRefs[message.id] ? "block" : "hidden"}`}>
                                    <div>
                                        <p className={`${lato.className} text-xl flex`}>
                                            {message.name}
                                            <span className="ml-3 font-normal">{message.email}</span>
                                            <span className="ml-3 font-normal bg-gray-300 px-2">{new Date(message.createdAt.seconds * 1000).toLocaleDateString()}</span>
                                        </p>
                                        <p>{message.message}</p>
                                    </div>
                                    <p
                                        className="text-red-500 hover:cursor-pointer hover:underline hover:scale-105 transition ease-in-out"
                                        onClick={() => confirmDelete(message.id)}
                                    >
                                        Delete
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}
            </main>

            {modalVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <p>Are you sure you want to delete this message?</p>
                        <div className="flex justify-end mt-3">
                            <button className="mr-3 px-4 py-2 bg-gray-300 rounded" onClick={() => setModalVisible(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;