import { useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                },
                modes: {
                    push: {
                        quantity: 2,
                    },
                    grab: {
                        distance: 150,
                        links: {
                            opacity: 0.8,
                            color: "#8b5cf6",
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ["#8b5cf6", "#06b6d4", "#22d3ee", "#ec4899"],
                },
                links: {
                    color: "#8b5cf6",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                    triangles: {
                        enable: true,
                        opacity: 0.05,
                        color: "#06b6d4",
                    },
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: { min: 0.3, max: 0.8 },
                    animation: {
                        enable: true,
                        speed: 1,
                        sync: false,
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 4 },
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false,
                    },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
            }}
        />
    );
};

export default ParticleBackground;
