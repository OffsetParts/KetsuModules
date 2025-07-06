import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

// 🔭 Main App Component
const Atlas = () => {
  return (
    <div className="min-h-screen bg-zinc-900 py-12 text-zinc-50 flex justify-center items-center">
      <div className="mx-auto grid max-w-5xl grid-cols-12 gap-2">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

// 🎯 Reusable Block component
const variant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0, scale: 0.95 },
};

const Block = ({ className, ...rest }) => {
  const control = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={control}
      variants={variant}
      className={twMerge(
        "col-span-12 border rounded border-zinc-700 hover:border-indigo-400 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

// 💬 Hero section
const Hero = () => (
  <Block className="py-20 px-6">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold text-white mb-4">Welcome to Atlas</h1>
      <p className="text-gray-400 text-lg">
        Reigniting STEM through curiosity, creativity, and collaboration.
      </p>
    </div>
  </Block>
);

// 🧠 Features section
const Features = () => (
  <Block className="bg-gray-100 dark:bg-zinc-900 py-16 px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard
        title="🔬 STEM Events"
        desc="Run hands-on builds like ionic thrusters and make science fun and accessible."
      />
      <FeatureCard
        title="🧠 Innovation"
        desc="Support interdisciplinary student-led projects across CS, physics, and engineering."
      />
      <FeatureCard
        title="🏗 Impact"
        desc="Build a scalable STEM model with research partnerships and enterprise vision."
      />
    </div>
  </Block>
);

// 📦 Individual Feature Card
const FeatureCard = ({ title, desc }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-soft p-6 hover:shadow-lg transition duration-300">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mt-2">{desc}</p>
  </div>
);

export default Atlas;