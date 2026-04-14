'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <div ref={headlineRef} className="space-y-2 mb-6 text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] animate-fadeInUp">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Transform Your
            </span>
          </div>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] animate-fadeInUp">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Business Digitally
            </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p
          className="animate-fadeInUp max-w-xl mx-auto text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed mb-8"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          We craft custom mobile apps, scalable web platforms, and end-to-end digital transformations
          for forward-thinking American businesses.
        </p>

        {/* CTAs */}
        <div
          className="animate-fadeInUp flex flex-col sm:flex-row gap-3.5 items-center justify-center mb-10"
          style={{ animationDelay: '0.55s', opacity: 0 }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-sm"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToServices}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-border/60 bg-card/40 backdrop-blur-sm hover:bg-accent/50 hover:border-primary/40 transition-all duration-300 text-sm"
          >
            Explore Services
          </button>
        </div>

        {/* Social proof bar */}
        <div
          className="animate-fadeInUp flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-8 mt-2 border-t border-border/10"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          {[
            { label: 'Clients Served', value: '50+' },
            { label: 'Projects Delivered', value: '120+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Satisfaction Rate', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] text-primary/90">
                {stat.label}
              </span>
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
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
