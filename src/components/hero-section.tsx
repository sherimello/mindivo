'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { GLSLHills } from '@/components/ui/glsl-hills';

export default function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger animate headline lines on mount
    const children = headlineRef.current?.children;
    if (!children) return;
    Array.from(children).forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.15}s`;
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).classList.add('animate-fadeInUp');
    });
  }, []);

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Mesh grid background */}
      <div className="absolute inset-0 mesh-grid opacity-40 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 dark:bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-foreground/5 dark:bg-foreground/2 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Badge */}
        <div className="animate-fadeInUp mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5" />
            US-Based Software Company
          </div>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="space-y-2 mb-6">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Transform Your
            </span>
          </div>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Business Digitally
            </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p
          className="animate-fadeInUp max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          We craft custom mobile apps, scalable web platforms, and end-to-end digital transformations
          for forward-thinking American businesses.
        </p>

        {/* CTAs */}
        <div
          className="animate-fadeInUp flex flex-col sm:flex-row gap-4 items-center justify-center mb-16"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToServices}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-border/60 bg-card/40 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/40 transition-all duration-300 text-sm sm:text-base"
          >
            Explore Services
          </button>
        </div>

        {/* Social proof bar */}
        <div
          className="animate-fadeInUp flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground/60"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          {['50+ Clients', '120+ Projects', '5+ Years', '98% Satisfaction'].map((stat) => (
            <div key={stat} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-primary/60" />
              <span>{stat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GLSL Hills — fills the entire hero, no clipping */}
      {/* The gradient overlay masks the top half (where text lives) and reveals
          the animated hills in the lower half. No overflow-hidden = no hard clip. */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <GLSLHills width="100%" height="100%" cameraZ={115} planeSize={256} speed={0.4} />
        {/* Gradient: solid background at top → transparent at bottom third */}
        <div className="absolute inset-0 bg-gradient-to-b from-background from-[50%] to-transparent" />
        {/* Extra vignette at very bottom so hills blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground/80 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
