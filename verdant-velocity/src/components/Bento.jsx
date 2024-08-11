import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";
import { useLanyard } from "react-use-lanyard";

export const Bento = () => {
    return (
        <div className="min-h-screen bg-zinc-900 py-12 text-zinc-50 flex justify-center items-center">
            <div className="mx-auto grid max-w-4xl grid-cols-12 gap-2">
                <Header />
                <Projects />
                <Experience />
                <Contact />
                <NowPlaying />
                <UpcomingProjects />
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

const Header = () => (
    <Block className="row-span-2 md:col-span-7">
        <h1 className="mb-10 text-3xl font-medium leading-tight">i <span className="text-rose-400">procrastinate</span> quite a bit</h1>
    </Block>
)

const Projects = () => (
    <Block className="row-span-2 md:col-span-5">
        <h1 className="mb-3 text-2xl font-medium leading-tight">Projects</h1>
        <ul>
            <p><a href="https://github.com/HeyDadCoolWhip/quote"><span className="text-indigo-500 hover:text-indigo-300 hover:underline">Quote</span></a> - A quote grabber made for a CS class</p>
            <p><span className="text-indigo-500">mke</span> - This website</p>
        </ul>
    </Block>
)

const ExperienceText = ({ language, languageColor, timeLearned, howManyProjects, ...rest }) => {
    return (
        <p className="py-1"><span className={languageColor} {...rest}>{language}</span> | {timeLearned} year experience | {howManyProjects} projects completed</p>
    )
}

const Experience = () => {

    const experience = {
        javascript: ["JavaScript", "text-javascript", "<1", "1"],
        python: ['Python', 'text-python', '1', 'N/A'],
        nodejs: ['NodeJS', 'text-nodejs', '3+', '1'],
        lua: ['Lua/Luau', 'text-python', '<6', '2']
    }

    return (
        <Block className="row-span-2 md:col-span-6">
            <h1 className="mb-3 text-2xl font-medium leading-tight">Experience</h1>
            <ul>
                {Object.entries(experience).map(([key, [languageName, languageClass, timeLearned, projects]]) => (
                    <ExperienceText key={key} language={languageName} languageColor={languageClass} timeLearned={timeLearned} howManyProjects={projects} />
                ))}
            </ul>
        </Block>
    )
}

const Contact = () => {
    return (
        <Block className="row-span-2 md:col-span-3">
            <h1 className="text-2xl font-medium leading-tight"><a href="" className="text-[#6228d7] hover:underline decoration-white" >rikter</a> <br /> co-dev/friend <a className="text-yxn underline animate-wave" href="https://yxn.rikter.xyz/">yxn</a></h1>
        </Block>
    )
}

const NowPlaying = () => {

    const { loading, status, websocket } = useLanyard({
        userId: "685927736916705296",
        socket: true
    })

    const activity = status?.discord_status;
    const songName = status?.spotify?.song;
    const albumArt = status?.spotify?.album_art_url
    const trackId = status?.spotify?.track_id;
    const artist = status?.spotify?.artist;

    const statusMap = {
        online: ['online', "text-online"],
        offline: ['offline', "text-offline"],
        idle: ['idling', "text-idle"],
        dnd: ['on do not disturb', 'text-dnd']
    }

    const rgbaStatusMap = {
        online: ['87, 242, 135, .75'],
        offline: ['128, 128, 128, .75'],
        idle: ['240, 178, 50, .75'],
        dnd: ['237, 66, 69, .75']
    }

    const rgbaActivityStatusColor = rgbaStatusMap[activity] || ["128, 128, 128, .75"]
    const [activityStatusText, activityStatusColor] = statusMap[activity] || ['offline', "text-offline"]

    return (
        <Block className="row-span-2 md:col-span-3">
            <h1 className="text-2xl font-medium leading-tight">I am <span className={`${activityStatusColor}`}>{activityStatusText}</span></h1>
            {songName && <p className="text-lg">Listening to <a href={`spotify:track:${trackId}`}><span className="text-emerald-500 underline decoration-white">{songName}</span></a> {artist && <span><br />by {artist}</span>}</p>}
        </Block>
    )
};

const UpcomingProjects = () => (
    <Block className="row-span-2 md:col-span-12">
        <h1 className="mb-3 text-2xl font-medium leading-tight" >Upcoming Projects</h1>
        <ul className="pl-4">
            <p>
                Sparrow - A Roblox tycoon with an isometric camera system to act as if a bird is overwatching a company
                <br />
                <b className="pl-4">Features</b>
                <ul className="pl-6">
                    - Isometric Camera system <span>&#40;</span> pretty much the only feature thats worth noting <span>&#41;</span>
                </ul>
            </p>
            <p>More soon</p>
        </ul>
    </Block>
)
