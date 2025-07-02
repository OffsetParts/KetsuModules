import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import modules from "../assets/modules.json"



export const Modules = () => {
    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-50 pt-10 pl-16">
            <Intro />
            <div>
                <ModulesList />
            </div>
        </div>
    )
}

const variant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hidden: { opacity: 0, scale: 0 }
}

const Block = ({ className, image, author, KetsuHref, ZetsuHref, ...rest }) => {

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
                "relative border rounded border-zinc-700 hover:border-teal-50 bg-zinc-900 p-4",
                className
            )}
            {...rest}
        >
            {/* Top-right image */}
            {image && (
                <img
                    src={image}
                    alt="Module Image"
                    className="absolute top-0 right-0 w-16 h-16 rounded-full m-2 object-cover"
                />
            )}

            {/* Author Tag */}
            {author && (
                <div className="text-xs text-zinc-400 mb-4">
                    <span className="bg-zinc-800 py-1 px-2 rounded-lg">By {author}</span>
                </div>
            )}

            {/* Content inside the block */}
            <div>
                {/* Content goes here (title, description, etc.) */}
                {rest.children}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-4">
                {KetsuHref && (
                    <a href={KetsuHref} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                        Ketsu
                    </a>
                )}
                {ZetsuHref && (
                    <a href={ZetsuHref} className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg">
                        Zetsu
                    </a>
                )}
            </div>
        </motion.div>
    )
}


const Intro = () => {
    return (
        <>
            <div className="p-8 relative" id="heading">
                <h1 className="text-8xl">Modules</h1>
                <h2 className="text-5xl">Where the magic happens</h2>
            </div>
        </>
    )
}

const ModulesList = () => {
    return (
        <>
            {Object.keys(modules).map(category => (
                <section id={category} className="mb-10 p-4 bg-zinc-900 rounded-lg shadow-lg outline outline-offset-2 outline-red-500">
                    <h2 class="text-5xl font-bold text-white mb-4 capitalize">{category}</h2>
                    <div class="grid grid-cols-3 gap-4">
                        {modules[category].map(module => (
                        <Block className="col-span-1" image={module.image} author={module.author} KetsuHref={module.ketsu_link} ZetsuHref={module.zetsu_link}>
                            <h3 class="text-2xl font-bold text-white">{module.name}</h3>
                            <p class="text-zinc-400">{module.info}</p>
                        </Block>
                        ))}
                    </div>
                </section>
            ))}
        </>
    )
}