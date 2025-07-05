import React from "react"

export const Navigation = () => {

    const items = {
        Animations: ["/modules#Animations", "Animations"],
        Mangas: ["/modules#Mangas", "Mangas"],
        Novels: ["/modules#Novels", "Novels"]
    }

    return (
        <header className="w-min h-12 bg-zinc-900 border border-zinc-700 rounded-sm fixed isolate overflow-hidden top-4 start-0 end-0 ms-auto me-auto z-50 flex flex-row items-center px-3">
            <nav className="flex items-center gap-2">
                <a href="/"><span className="text-red-500">ZKetsu</span></a>
                <b>|</b>
                <ul className="flex gap-2">
                    {Object.entries(items).map(([key, [href, text]]) => (
                        <a key={key} href={href} className="hover:text-red-400">{text}</a>
                    ))}
                </ul>
            </nav>
        </header>
    )
}