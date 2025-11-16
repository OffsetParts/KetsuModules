import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

export const Bento = () => {
    return (
        <div className="relative min-h-screen bg-zinc-900 pt-24 pb-12 text-zinc-50 flex justify-center items-center overflow-hidden">
            {/* Animated background gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    className="absolute top-20 -left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 -right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative mx-auto grid max-w-4xl grid-cols-12 gap-2 z-10">
                <Header />
                <FeaturedProjects />
                <Credits />
            </div>
        </div>
    )
}

const animationVariants = {
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hidden: { opacity: 0, scale: 0.95, y: 20 }
}

const Block = ({ className, ...rest }) => {
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <motion.div
            variants={animationVariants}
            ref={ref}
            initial="hidden"
            animate={controls}
            className={twMerge(
                "col-span-4 border rounded-lg border-zinc-700/50 bg-zinc-900/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1",
                className
            )}
            {...rest}
        />
    )
}

const Header = () => (
    <Block className="row-span-2 md:col-span-12 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-red-500/20 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-violet-500/20 to-transparent rounded-tr-3xl" />
        
        <h1 className="mb-10 text-4xl font-bold leading-tight relative">
            <span className="bg-linear-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                Welcome
            </span>
            {" "}to{" "}
            <span className="relative inline-block">
                ZKetsu no Kaisen
                <motion.span
                    className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-red-500 to-violet-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
            </span>
        </h1>
    </Block>
)

const projects = [
    {
        name: "Asurascans",
        url: "ketsuapp://?moduleData=https://raw.githubusercontent.com/OffsetParts/KetsuModules/master/Modules/AsuraScans/Asurascans.json",
        color: "violet-600",
        gradient: "from-violet-500 to-purple-600",
        description: "Popular and HQ scanlation group, goy slop",
        icon: "📚"
    },
    {
        name: "Flamecomics",
        url: "ketsuapp://?moduleData=https://raw.githubusercontent.com/OffsetParts/KetsuModules/master/Modules/FlameScans/Flamecomics.json",
        color: "red-500",
        gradient: "from-red-500 to-orange-600",
        description: "Another popular manga scanlation group",
        icon: "🔥"
    }
]

const FeaturedProjects = () => (
    <Block className="row-span-2 md:col-span-12 relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
        
        <h2 className="mb-4 text-2xl font-bold leading-tight flex items-center gap-2">
            <span className="text-red-500">✦</span>
            Featured Projects
            <span className="text-red-500">✦</span>
        </h2>
        <ul className="space-y-3">
            {projects.map((project, index) => (
                <motion.li 
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="group"
                >
                    <a 
                        href={project.url} 
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                    >
                        <div className="flex-1">
                            <span className={`text-lg font-semibold bg-linear-to-r ${project.gradient} bg-clip-text text-transparent group-hover:underline`}>
                                {project.name}
                            </span>
                            <p className="text-sm text-zinc-400 mt-1">{project.description}</p>
                        </div>
                    </a>
                </motion.li>
            ))}
        </ul>
    </Block>
)

const Credits = () => (
    <Block className="row-span-2 md:col-span-12 relative overflow-hidden">
        {/* Animated shimmer effect */}
        <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-red-500/5 to-transparent"
            animate={{
                x: ['-100%', '100%'],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }}
        />
        
        <h2 className="text-2xl font-bold leading-tight mb-4 flex items-center gap-2">
            <span className="text-red-500">❤</span>
            <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Credits
            </span>
        </h2>
        
        <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2">
                <span className="text-zinc-400">Ketsu:</span>
                <a 
                    className="text-red-500 hover:text-red-400 font-semibold underline decoration-red-500/30 hover:decoration-red-500 underline-offset-4 transition-all duration-200" 
                    href="https://ketsu.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Official Page ↗
                </a>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="text-zinc-400">Developers:</span>
                <a 
                    className="text-fuchsia-400 hover:text-pink-400 font-semibold underline decoration-fuchsia-400/30 hover:decoration-fuchsia-400 underline-offset-4 transition-all duration-200" 
                    href="https://github.com/OffsetParts/KetsuModules"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Scrumptious ↗
                </a>
            </div>
        </div>
        
        {/* Decorative dots */}
        <div className="absolute bottom-4 right-4 flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/30" />
            <div className="w-2 h-2 rounded-full bg-violet-500/30" />
            <div className="w-2 h-2 rounded-full bg-fuchsia-500/30" />
        </div>
    </Block>
)