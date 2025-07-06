// src/components/ParticlesBg.tsx
import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      {/* Background Layer (low-density slow particles) */}
      <Particles
        id="bg-layer"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -20 },
          particles: {
            number: { value: 30, density: { enable: true, area: 800 } },
            color: { value: "#155dfc" },
            opacity: { value: 0.05 },
            size: { value: 2 },
            move: { enable: true, speed: 0.2, direction: "none", outModes: { default: "bounce" } },
          },
        }}
      />

      {/* Mid Layer (main orbitals + atoms) */}
      <Particles
        id="mid-layer"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -10 },
          background: { color: { value: "#18181b" } },
          particles: {
            number: { value: 70, density: { enable: true, area: 800 } },
            color: {
              value: ["#ffffff", "#e4e4e7", "#155dfc"],
            },
            shape: {
              type: ["circle", "polygon"],
              polygon: { sides: 5 },
            },
            links: {
              enable: true,
              distance: 100,
              color: "#155dfc",
              opacity: 0.15,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.4,
              direction: "none",
              outModes: { default: "bounce" },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
            size: {
              value: { min: 1.5, max: 3 },
            },
            opacity: {
              value: 0.25,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false,
              },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              grab: { distance: 150, links: { opacity: 0.4 } },
              push: { quantity: 2 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Foreground Layer (custom atom icons) */}
      <Particles
        id="icon-layer"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -5 },
          particles: {
            number: { value: 8 },
            shape: {
              type: "image",
              image: [
                {
                  src: "/assets/icons/atom-light.svg",
                  width: 24,
                  height: 24,
                },
                {
                  src: "/assets/icons/orbit-light.svg",
                  width: 24,
                  height: 24,
                },
              ],
            },
            size: { value: 10 },
            opacity: { value: 0.2 },
            move: {
              enable: true,
              speed: 0.15,
              outModes: { default: "bounce" },
              direction: "none",
            },
          },
        }}
      />
    </>
  );
};

export default ParticlesBg;
