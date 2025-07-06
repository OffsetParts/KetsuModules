import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-zinc-900 py-12 text-zinc-50 flex justify-center items-center">
            <div className="mx-auto grid max-w-4xl grid-cols-12 gap-2">
                <What />
                <Features />
            </div>
        </div>
    )
}

const variant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 }
}

const Block = ({ className, ...rest }) => {

    const control = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            control.start("visible")
        } else {
            control.start('hidden')
        }
    }, [control, inView])

    return (
        <motion.div
            variants={variant}
            ref={ref}
            initial="hidden"
            animate={control}
            className={twMerge(
                "col-span-4 border rounded border-zinc-700 hover:border-indigo-400 bg-zinc-800 p-3",
                className
            )}
            {...rest}
        />
    )
}

const What = () => (
    <Block className="py-20 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-100 mb-4">Welcome</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Polished, fluid, elegant UI for modern apps.</p>
        </div>
    </Block>
)
const Features = () => (
    <Block className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition duration-300 mx-auto">
                <h3 className="text-xl font-semibold text-gray-900">Card Title</h3>
                <p className="text-gray-500 mt-2">Subtle contrast for clean layout.</p>
            </div>
        </div>
    </Block>
)