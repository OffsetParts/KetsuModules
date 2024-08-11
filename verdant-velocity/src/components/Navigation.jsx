import React from "react"

export const Navigation = () => {

    const items = {
        information: ["#information", "Information"]
    }

    return (
        <header className="w-min h-12 bg-zinc-900 border border-zinc-700 rounded fixed isolate overflow-hidden top-4 start-0 end-0 ms-auto me-auto z-50 flex items-center px-3">
            <nav className="flex items-center gap-2">
                <span className="text-purple-400">mke</span>
                <b>|</b>
                <ul className="flex gap-2">
                    {Object.entries(items).map(([key, [href, text]]) => (
                        <a key={key} href={href} className="hover:text-purple-400">{text}</a>
                    ))}
                </ul>
            </nav>
        </header>
    )
}