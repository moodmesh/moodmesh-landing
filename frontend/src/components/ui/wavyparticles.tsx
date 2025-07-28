import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

declare global {
  interface Window {
    tsParticles: any
  }
}

interface WavyParticlesProps {
  children?: ReactNode
}

const WavyParticles: React.FC<WavyParticlesProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src =
      "https://cdn.jsdelivr.net/npm/tsparticles@2/tsparticles.bundle.min.js"
    script.onload = () => {
      if (!window.tsParticles) return

      window.tsParticles.load(containerRef.current, {
        fullScreen: {
          enable: true,
        },
        background: {
          color: "#0e0f11",
        },
        particles: {
          number: {
            value: 500,
            density: {
              enable: true,
              area: 1000,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
          },
          size: {
            value: 2.5,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            straight: false,
            outModes: {
              default: "out",
            },
            attract: {
              enable: true,
              rotateX: 3000,
              rotateY: 3000,
            },
          },
          links: {
            enable: true,
            distance: 50,
            color: "#ffffff",
            opacity: 0.25,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.6,
              },
            },
          },
        },
        retina_detect: true,
      })
    }

    document.body.appendChild(script)

    return () => {
      if (containerRef.current && window.tsParticles?.domItem) {
        window.tsParticles?.domItem(0)?.destroy?.()
      }
    }
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default WavyParticles
