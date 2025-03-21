"use client"
import FAQ from "@/components/FAQ"
import Nav from "@/components/Nav"
import {motion} from "framer-motion"

const Home = () => {

    return (
        <> 
            <Nav theme="dark" />
            <main>
                <header className="text-center py-12">
                    <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.10 }}
                    viewport={{ once: false }} // Ensure animation triggers even if already visible
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full"
                    >
                        <h1 className="text-4xl font-bold ">FAQ</h1>
                    </motion.div>
                </header>
                <FAQ />
            </main>
        </>
    )
}

export default Home