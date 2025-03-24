"use client"
import ActionSection from "@/components/ActionSection"
import FAQSection from "@/components/FAQSection"
import InstaSection from "@/components/InstaSection"
import Nav from "@/components/Nav"
import {motion} from "framer-motion"

const Home = () => {

    return (
        <> 
            <Nav theme="dark" />
     
            
            <FAQSection />

            <ActionSection links={[
                {
                title: "My Photos",
                link: "/portfolio",
                }, {
                title: "Contact Me",
                link: "/contact",
                }
            ]} />

            <InstaSection />
        </>
    )
}

export default Home