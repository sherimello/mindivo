"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const mindivoProjects: Project[] = [
  {
    title: "RetailPro",
    description: "End-to-end retail management SaaS with real-time analytics.",
    year: "2024",
    link: "/projects/retailpro",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "MedTrack",
    description: "HIPAA-compliant patient monitoring and care coordination app.",
    year: "2024",
    link: "/projects/medtrack",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "LogiFlow",
    description: "Supply-chain digitization and logistics automation platform.",
    year: "2023",
    link: "/projects/logiflow",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "EduLearn",
    description: "Adaptive learning platform with personalized content paths.",
    year: "2023",
    link: "/projects/edulearn",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2670&auto=format&fit=crop",
  },
]

export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-4xl mx-auto px-6 py-24">
      <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-12 flex items-center gap-3">
        <span className="w-8 h-px bg-primary/30" />
        Selected Work
      </h2>

      {/* Floating Image Follower */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-border/20 isolate"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 30}px, ${smoothPosition.y - 120}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), scale 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="relative w-[340px] h-[220px] bg-card rounded-2xl overflow-hidden">
          {mindivoProjects.map((project, index) => (
            <img
              key={project.title}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.15,
                filter: hoveredIndex === index ? "none" : "blur(20px) grayscale(1)",
              }}
            />
          ))}
          {/* Edge gradient for that premium feel */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </div>
      </div>

      {/* List */}
      <div className="space-y-0 relative">
        {mindivoProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            className="group block relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-10 border-t border-border/40 transition-all duration-500 ease-in-out">
              {/* Animated reveal background */}
              <div
                className={`
                  absolute inset-0 -mx-6 px-6 bg-primary/[0.03] dark:bg-primary/[0.05]
                  transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
                `}
              />

              <div className="relative flex items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-4">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground transition-all duration-500">
                      <span className="relative">
                        {project.title}
                        <span
                          className={`
                            absolute left-0 -bottom-1 h-0.5 bg-primary
                            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                            ${hoveredIndex === index ? "w-full" : "w-0"}
                          `}
                        />
                      </span>
                    </h3>

                    <ArrowUpRight
                      className={`
                        w-6 h-6 text-primary transition-all duration-500
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0 rotate-0"
                            : "opacity-0 -translate-x-4 translate-y-4 -rotate-45"
                        }
                      `}
                    />
                  </div>

                  <p
                    className={`
                      text-lg mt-3 max-w-xl transition-all duration-500
                      ${hoveredIndex === index ? "text-foreground/80" : "text-muted-foreground/60"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`
                      text-sm font-mono tracking-tighter tabular-nums transition-all duration-500
                      ${hoveredIndex === index ? "text-primary font-bold" : "text-muted-foreground/40"}
                    `}
                  >
                    /{project.year}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
        <div className="border-t border-border/40" />
      </div>
    </section>
  )
}
