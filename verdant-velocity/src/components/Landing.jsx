import React from "react"
import { useLanyard } from "react-use-lanyard"

export const Landing = () => {
    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-50 pt-10 pl-16">
            <Intro />
        </div>
    )
}

const Intro = () => {
    return (
        <>
            <div className="p-8 relative" id="heading">
                <p className="text-8xl">This is <br /> mke's website</p>
                <p className="text-2xl">I spent tens of hours making this website</p>
                <div className="pl-6 pt-3 w-96 relative" id="explanation">
                    <p>This is my not-so-good-looking portfolio that is meant for online and in-person interactions. Obviously, I don't specialize in UI/UX, but I do have some experience in web development as shown in the <span className="text-purple-400">information</span> category.</p>
                </div>
            </div>
        </>
    )
}