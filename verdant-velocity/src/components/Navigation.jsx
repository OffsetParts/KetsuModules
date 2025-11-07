import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export const Navigation = () => {
    const headerRef = useRef(null)
    
    const navItems = [
        { href: "/modules#Animations", label: "Animations" },
        { href: "/modules#Mangas", label: "Mangas" },
        { href: "/modules#Novels", label: "Novels" }
    ]

    useEffect(() => {
        // Debug: Log navigation element position and visibility
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect()
            console.log('🔍 Navigation Debug Info:', {
                visible: rect.top >= 0 && rect.bottom <= window.innerHeight,
                position: {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                },
                zIndex: window.getComputedStyle(headerRef.current).zIndex,
                opacity: window.getComputedStyle(headerRef.current).opacity,
                display: window.getComputedStyle(headerRef.current).display
            })
        }
    }, [])

    return (
        <motion.header 
            ref={headerRef}
            className="h-14 bg-zinc-900 backdrop-blur-md border-4 border-red-500 rounded-lg fixed top-4 left-1/2 -translate-x-1/2 px-6 shadow-lg shadow-black/20"
            style={{ zIndex: 9999 }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onAnimationComplete={() => console.log('✅ Navigation animation complete')}
        >
            <nav className="flex items-center gap-4 h-full whitespace-nowrap">
                <motion.a 
                    href="/" 
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="font-bold text-lg bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        ZKetsu
                    </span>
                    <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-red-500 to-transparent rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.a>
                
                <span className="text-zinc-600 select-none">|</span>
                
                <ul className="flex gap-4">
                    {navItems.map(({ href, label }, index) => (
                        <motion.li 
                            key={label}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                        >
                            <motion.a 
                                href={href} 
                                className="relative text-white hover:text-red-400 transition-colors duration-200 text-sm font-medium group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {label}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </motion.header>
    )
}