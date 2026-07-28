import Link from "next/link";
import { FC } from "react";
import { motion, Variants } from "framer-motion";

interface Props {
    links: {link: string, title: string}[]
}

// Sequenced reveal: heading settles first, then the link row / divider stagger in behind it.
const sectionVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.14,
        },
    },
};

const headingVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
};

const linkVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.9 },
    },
};

const dividerVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
        scaleY: 1,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const ActionSection: FC<Props> = (props) => {

    return (
        <motion.section
        id="action-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="relative flex flex-col justify-center items-center text-center px-6 py-24 md:py-32 border-y border-stone-200 bg-gradient-to-b from-white via-stone-50 to-stone-100/80 overflow-hidden"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

            <motion.h1 variants={headingVariants} className="agency text-4xl md:text-5xl tracking-wide text-stone-900 mb-10">
                Ready to Get Started?
            </motion.h1>

            <div id="links" className="flex items-center gap-8 md:gap-12">
                <motion.div variants={linkVariants}>
                    <Link href={props.links[0].link} className="text-lg md:text-xl font-medium text-stone-800 hover:text-stone-500 transition-colors duration-500 ease-out relative group">
                        {props.links[0].title}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-stone-800 transition-all duration-500 ease-out group-hover:w-full"></span>
                    </Link>
                </motion.div>

                <motion.div variants={dividerVariants} className="w-px h-10 bg-stone-300 origin-center"></motion.div>

                <motion.div variants={linkVariants}>
                    <Link href={props.links[1].link} className="text-lg md:text-xl font-medium text-stone-800 hover:text-stone-500 transition-colors duration-500 ease-out relative group">
                        {props.links[1].title}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-stone-800 transition-all duration-500 ease-out group-hover:w-full"></span>
                    </Link>
                </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        </motion.section>
    )
}

export default ActionSection