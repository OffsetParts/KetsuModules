import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export const Bento = () => {
    return (
        <div className="min-h-screen bg-zinc-900 py-12 text-zinc-50 flex justify-center items-center">
            <div className="mx-auto grid max-w-4xl grid-cols-12 gap-2">
                <Header />
                <FeaturedProjects />
                <Credits />
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
                "col-span-4 border rounded-sm border-zinc-700 hover:border-red-600 bg-zinc-900 p-4",
                className
            )}
            {...rest}
        />
    )
}

const Header = () => (
    <Block className="row-span-2 md:col-span-12">
        <h1 className="mb-10 text-3xl font-medium leading-tight"> <span className="text-red-600">Welcome</span> to ZKetsu no Kaisen</h1>
    </Block>
)

const FeaturedProjects = () => (
    <Block className="row-span-2 md:col-span-12">
        <h1 className="mb-3 text-2xl font-medium leading-tight" >Featured Projects</h1>
        <ul className="pl-4">
            <p >
                <span className="text-violet-600 hover:underline" > <a href="ketsuapp://?moduleData=https://raw.githubusercontent.com/OffsetParts/KetsuModules/master/Modules/AsuraScans/Asura.json">Asurascans</a> </span> - popular and HQ scanlation group
            </p>
            <p>
                <span className="text-red-500 hover:underline" > <a href="ketsuapp://?moduleData=https://raw.githubusercontent.com/OffsetParts/KetsuModules/master/Modules/FlameScans/Flames.json">Flamescans</a> </span> - another popular manga scanlation group
            </p>
            <p>
                <span className="text-fuchsia-400 hover:underline"> <a href="ketsuapp://?moduleData=https://raw.githubusercontent.com/OffsetParts/KetsuModules/master/Modules/GalaxyAction/Galatic.json">Galaxyaction</a> </span>, formerly flixscans - a more niche group with quality scanlations
            </p>
        </ul>
    </Block>
)

const Credits = () => {
    return (
        <Block className="row-span-2 md:col-span-12">
            <h1 className="text-2xl font-medium leading-tight"><a className="text-red-600 hover:underline" >Credits</a> <br /> Ketsu:<a className="text-online underline animate-wave" href="https://ketsu.app">Page</a></h1>
        </Block>
    )
}