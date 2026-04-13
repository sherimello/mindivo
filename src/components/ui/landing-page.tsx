'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";

interface ScrollGlobeProps {
  sections: {
    id: string;
    badge?: string;
    title: string;
    subtitle?: string;
    description: string;
    align?: 'left' | 'center' | 'right';
    features?: { title: string; description: string }[];
    actions?: { label: string; variant: 'primary' | 'secondary'; onClick?: () => void }[];
  }[];
  globeConfig?: {
    positions: { top: string; left: string; scale: number }[];
  };
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "75%", scale: 1.4 },
    { top: "25%", left: "50%", scale: 0.9 },
    { top: "15%", left: "90%", scale: 2 },
    { top: "50%", left: "50%", scale: 1.8 },
  ],
};

const parsePercent = (str: string): number => parseFloat(str.replace('%', ''));

export function ScrollGlobe({ sections, globeConfig = defaultGlobeConfig, className }: ScrollGlobeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const navLabelTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const calculatedPositions = useMemo(() =>
    globeConfig.positions.map(pos => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
    })), [globeConfig.positions]);

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    setScrollProgress(progress);

    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < minDistance) { minDistance = distance; newActiveSection = index; }
      }
    });

    const currentPos = calculatedPositions[newActiveSection];
    setGlobeTransform(`translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`);
    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => { updateScrollPosition(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollPosition();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (navLabelTimeoutRef.current) clearTimeout(navLabelTimeoutRef.current);
    };
  }, [updateScrollPosition]);

  useEffect(() => {
    const initialPos = calculatedPositions[0];
    setGlobeTransform(`translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`);
  }, [calculatedPositions]);

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground", className)}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 z-50">
        <div className="h-full bg-gradient-to-r from-primary via-blue-600 to-blue-900 will-change-transform shadow-sm"
          style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: 'left center', transition: 'transform 0.15s ease-out', filter: 'drop-shadow(0 0 2px rgba(59,130,246,0.3))' }} />
      </div>

      {/* Nav dots */}
      <div className="hidden sm:flex fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="relative group">
              <div className={cn(
                "nav-label absolute right-5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2",
                "px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-medium whitespace-nowrap",
                "bg-background/95 backdrop-blur-md border border-border/60 shadow-xl z-50",
                activeSection === index ? "animate-fadeOut" : "opacity-0"
              )}>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span>{section.badge || `Section ${index + 1}`}</span>
                </div>
              </div>
              <button
                onClick={() => sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={cn(
                  "relative w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-2 transition-all duration-300 hover:scale-125",
                  "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
                  activeSection === index
                    ? "bg-primary border-primary shadow-lg before:animate-ping before:bg-primary/20"
                    : "bg-transparent border-muted-foreground/40 hover:border-primary/60 hover:bg-primary/10"
                )}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 -z-10" />
      </div>

      {/* Globe */}
      <div className="fixed z-10 pointer-events-none will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: globeTransform, filter: `opacity(${activeSection === sections.length - 1 ? 0.4 : 0.85})` }}>
        <div className="scale-75 sm:scale-90 lg:scale-100">
          <Globe />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section key={section.id}
          ref={(el) => { sectionRefs.current[index] = el; }}
          className={cn(
            "relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-20 py-12 sm:py-16 lg:py-20",
            "w-full max-w-full overflow-hidden",
            section.align === 'center' && "items-center text-center",
            section.align === 'right' && "items-end text-right",
            (!section.align || section.align === 'left') && "items-start text-left"
          )}
        >
          <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            {section.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {section.badge}
              </div>
            )}
            <h2 className={cn(
              "font-bold mb-6 leading-[1.1] tracking-tight",
              index === 0
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            )}>
              {section.subtitle ? (
                <div className="space-y-1">
                  <div className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{section.title}</div>
                  <div className="text-muted-foreground/90 text-[0.65em] font-medium tracking-wider">{section.subtitle}</div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">{section.title}</div>
              )}
            </h2>
            <p className="text-muted-foreground/80 leading-relaxed mb-8 text-base sm:text-lg font-light max-w-2xl">
              {section.description}
            </p>
            {section.features && (
              <div className="grid gap-3 mb-8">
                {section.features.map((feature, i) => (
                  <div key={feature.title}
                    className="group p-4 sm:p-5 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-card-foreground mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground/80 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {section.actions && (
              <div className={cn("flex flex-col sm:flex-row flex-wrap gap-3",
                section.align === 'center' && "justify-center",
                section.align === 'right' && "justify-end",
                (!section.align || section.align === 'left') && "justify-start"
              )}>
                {section.actions.map((action) => (
                  <button key={action.label} onClick={action.onClick}
                    className={cn(
                      "group relative px-6 sm:px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base w-full sm:w-auto",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      action.variant === 'primary'
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                        : "border-2 border-border/60 bg-background/50 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/30"
                    )}>
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function GlobeScrollDemo() {
  return (
    <ScrollGlobe
      sections={[
        {
          id: "hero", badge: "Welcome", title: "Explore", subtitle: "Our World",
          description: "Journey through an immersive experience where technology meets innovation.",
          align: "left",
          actions: [
            { label: "Begin Journey", variant: "primary" },
            { label: "Learn More", variant: "secondary" },
          ],
        },
        {
          id: "innovation", badge: "Innovation", title: "Connected Worldwide",
          description: "From every corner of the globe, we witness the interconnected web of human achievement.",
          align: "center",
        },
        {
          id: "discovery", badge: "Discovery", title: "Expanding", subtitle: "Possibilities",
          description: "As we push beyond familiar boundaries, new worlds of opportunity emerge.",
          align: "left",
          features: [
            { title: "Limitless Exploration", description: "Discover new dimensions of possibility" },
            { title: "Seamless Integration", description: "Where technology meets human intuition" },
            { title: "Future-Ready Solutions", description: "Built for tomorrow's challenges" },
          ],
        },
        {
          id: "future", badge: "Future", title: "Our Shared", subtitle: "Tomorrow",
          description: "Every connection represents hope, every innovation builds bridges to our collective future.",
          align: "center",
          actions: [
            { label: "Join the Movement", variant: "primary" },
            { label: "Explore More", variant: "secondary" },
          ],
        },
      ]}
      className="bg-gradient-to-br from-background via-muted/20 to-background"
    />
  );
}
