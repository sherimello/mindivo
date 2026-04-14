'use client';

import { useState, useEffect, useRef } from 'react';
import Globe from '@/components/ui/globe';
import { cn } from '@/lib/utils';
import { Rocket, Smartphone, Globe2, Zap } from 'lucide-react';

/* ─────────────────────────────────────────
   Chapters — Mindivo content
   Each chapter has its own globe position so
   the globe visually "moves" between ideas.
───────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'mission',
    badge: 'Who We Are',
    icon: Rocket,
    title: 'Powering Digital',
    subtitle: 'America',
    description:
      'Mindivo is a US-based technology partner dedicated to helping businesses across every industry embrace the digital age. We believe every company — from Main Street to the Fortune 500 — deserves world-class, custom-built software.',
    align: 'left' as const,
    features: [
      { title: 'Nationwide Coverage', description: 'Serving clients coast-to-coast, from San Francisco to New York.' },
      { title: 'Agile & Transparent', description: 'Bi-weekly demos, clear milestones, and zero surprises on delivery.' },
    ],
    // Globe: hardware-accelerated positioning based on provided config
    globeStyle: {
      top: 0,
      left: 0,
      transform: 'translate3d(75vw, 50vh, 0) translate3d(-50%, -50%, 0) scale3d(1.4, 1.4, 1)',
      opacity: '0.85',
      willChange: 'transform'
    },
  },
  {
    id: 'mobile',
    badge: 'Mobile Apps',
    icon: Smartphone,
    title: 'Apps Your Customers',
    subtitle: 'Will Love',
    description:
      'We design and build native iOS and Android apps — and cross-platform solutions with React Native — that are fast, reliable, and effortless to use. Our mobile products drive real business outcomes from day one.',
    align: 'left' as const,
    features: [
      { title: 'React Native & Native Code', description: 'Full native performance with a shared codebase where it counts.' },
      { title: 'Data-Driven UX', description: 'User research, prototyping, and A/B testing built into every sprint.' },
    ],
    // Globe: hardware-accelerated positioning based on provided config
    globeStyle: {
      top: 0,
      left: 0,
      transform: 'translate3d(50vw, 25vh, 0) translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1)',
      opacity: '0.85',
      willChange: 'transform'
    },
  },
  {
    id: 'web',
    badge: 'Web Platforms',
    icon: Globe2,
    title: 'Scalable Web',
    subtitle: 'Solutions',
    description:
      'From SaaS dashboards to customer portals and e-commerce platforms, we architect and ship web applications that handle real-world traffic, complex workflows, and enterprise-grade security requirements.',
    align: 'right' as const,
    features: [
      { title: 'Cloud-Native Architecture', description: 'AWS / GCP auto-scaling, 99.9% uptime SLAs, and zero-downtime deploys.' },
      { title: 'Modern Stack', description: 'Next.js, TypeScript, REST & GraphQL — battle-tested patterns throughout.' },
    ],
    // Globe: hardware-accelerated positioning based on provided config
    globeStyle: {
      top: 0,
      left: 0,
      transform: 'translate3d(10vw, 15vh, 0) translate3d(-50%, -50%, 0) scale3d(2, 2, 1)',
      opacity: '0.85',
      willChange: 'transform'
    },
  },
  {
    id: 'digitize',
    badge: 'Digital Transformation',
    icon: Zap,
    title: 'Digitize Your',
    subtitle: 'Operations',
    description:
      'Paper forms, spreadsheets, and disconnected tools cost you time, money, and talent. We audit your workflows, identify the highest-impact automation opportunities, and build the integrated digital backbone your business needs to scale.',
    align: 'center' as const,
    features: [
      { title: 'Legacy System Migration', description: 'Modernize existing infrastructure without disrupting daily operations.' },
      { title: 'Workflow Automation', description: 'Intelligent automation that cuts manual work by up to 70%.' },
    ],
    actions: [
      { label: 'Start Your Transformation', href: '#contact', primary: true },
      { label: 'View Case Studies',         href: '#portfolio', primary: false },
    ],
    // Globe: hardware-accelerated positioning based on provided config
    globeStyle: {
      top: 0,
      left: 0,
      transform: 'translate3d(50vw, 50vh, 0) translate3d(-50%, -50%, 0) scale3d(1.8, 1.8, 1)',
      opacity: '0.4',
      willChange: 'transform'
    },
  },
] as const;

/* ─────────────────────────────────────────
   How the scroll math works
   ───────────────────────────────────────
   Layout inside <section>:

   ┌─ sticky panel (100 vh) ─┐   ← stays pinned at viewport top
   │  progress bar            │     while the section is in view
   │  Globe (transitions)     │
   │  nav dots                │
   └─────────────────────────┘

   ┌─ text div (marginTop: -100vh) ─┐  ← overlays the sticky panel
   │  Chapter 1  (min-h-screen)      │
   │  Chapter 2  (min-h-screen)      │
   │  Chapter 3  (min-h-screen)      │
   │  Chapter 4  (min-h-screen)      │
   │  Scroll buffer (100vh spacer)   │  ← keeps globe pinned through last chapter
   └────────────────────────────────┘

   Container total height = 100vh + (-100vh + 5 × 100vh) = 500 vh
   Globe stays pinned for  500vh − 100vh = 400 vh  (= 4 full chapters) ✓
───────────────────────────────────────── */

export default function GlobeSection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Section-local scroll progress ── */
  useEffect(() => {
    let ticking = false;
    let animationFrameId: number;

    const updateScrollPosition = () => {
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const scrollableH = c.offsetHeight - window.innerHeight;
      if (scrollableH <= 0) return;
      
      const scrolled = Math.max(-rect.top, 0);
      setSectionProgress(Math.min(scrolled / scrollableH, 1));

      // Active chapter detection based on scroll amount
      const newIndex = Math.max(
        0,
        Math.min(Math.round(scrolled / window.innerHeight), CHAPTERS.length - 1)
      );
      setActiveChapter(newIndex);
    };

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollPosition(); // Initial invocation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const { globeStyle } = CHAPTERS[activeChapter];

  return (
    <section 
      id="solutions" 
      ref={containerRef} 
      className="relative bg-background"
      style={{ height: `${(CHAPTERS.length + 1) * 100}vh` }}
    >

      {/* ══════════════════════════════════════════
          STICKY PANEL
          — Globe, progress bar, nav dots.
          All "fixed-like" chrome lives here.
          Scoped to this section: disappears when
          the section scrolls off screen.
         ══════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden z-0">

        {/* Section-scoped progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-border/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent will-change-transform"
            style={{
              transform: `scaleX(${sectionProgress})`,
              transformOrigin: 'left center',
              transition: 'transform 0.12s ease-out',
            }}
          />
        </div>

        {/* Globe — moves between positions as chapters change */}
        <div
          className="absolute transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={globeStyle as React.CSSProperties}
        >
          <div className="scale-50 sm:scale-75 lg:scale-100">
            <Globe />
          </div>
        </div>

        {/* Section-local nav dots (right edge, desktop) */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-5 pointer-events-auto z-20">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} className="group relative flex items-center justify-end gap-3">
              {/* Hover label */}
              <span className="absolute right-6 whitespace-nowrap text-xs font-semibold px-3 py-1 rounded-lg border border-border/60 bg-background/90 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {ch.badge}
              </span>
              <button
                onClick={() => {
                  if (containerRef.current) {
                    const top = window.scrollY + containerRef.current.getBoundingClientRect().top;
                    window.scrollTo({ top: top + i * window.innerHeight, behavior: 'smooth' });
                  }
                }}
                aria-label={`Jump to ${ch.badge}`}
                className={cn(
                  'w-2.5 h-2.5 rounded-full border-2 transition-all duration-300',
                  activeChapter === i
                    ? 'bg-primary border-primary scale-125 shadow-md shadow-primary/50'
                    : 'bg-transparent border-muted-foreground/40 hover:border-primary/60 hover:scale-110'
                )}
              />
            </div>
          ))}
          <div className="absolute right-[4.5px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -z-10" />
        </div>

        {/* Ambient glow that follows the globe */}
        <div
          className="absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${
              activeChapter === 2 ? '10%' : activeChapter === 3 ? '50%' : '78%'
            } ${activeChapter === 1 ? '35%' : '55%'}, color-mix(in srgb, var(--primary) 7%, transparent) 0%, transparent 70%)`,
          }}
        />

        {/* ══════════════════════════════════════════
            TEXT SECTIONS
            Placed absolutely inside the sticky panel so
            they don't scroll up. They fade in place.
           ══════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {CHAPTERS.map((chapter, index) => {
            const Icon = chapter.icon;
            const isActive = activeChapter === index;

            // Keep text away from the globe side on desktop
            const padClass =
              chapter.align === 'left'
                ? 'pl-8 sm:pl-14 lg:pl-24 pr-4 sm:pr-8 lg:pr-[48%]'
                : chapter.align === 'right'
                ? 'pr-8 sm:pr-14 lg:pr-24 pl-4 sm:pl-8 lg:pl-[48%]'
                : 'px-8 sm:px-16 lg:px-32';

            return (
              <div
                key={chapter.id}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={cn(
                  'absolute inset-0 flex flex-col justify-center py-24 pointer-events-none',
                  padClass,
                  chapter.align === 'right' && 'items-end',
                  chapter.align === 'center' && 'items-center text-center',
                  chapter.align === 'left' && 'items-start',
                )}
              >
                {/* Content fades in when active, invisible when not */}
                <div
                  className={cn(
                    'transition-all duration-700 ease-out will-change-transform pointer-events-auto',
                    isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8',
                  chapter.align === 'center' ? 'max-w-2xl w-full' : 'max-w-xl w-full',
                )}
              >
                {/* Badge row */}
                <div className={cn('flex items-center gap-3 mb-7', chapter.align === 'center' && 'justify-center')}>
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-widest">
                    {chapter.badge}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  <div className="text-foreground">
                    {chapter.title}
                  </div>
                  <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {chapter.subtitle}
                  </div>
                </h2>

                {/* Description */}
                <p className="text-muted-foreground/90 text-base sm:text-lg leading-relaxed mb-8 font-light">
                  {chapter.description}
                </p>

                {/* Feature cards */}
                {'features' in chapter && chapter.features && (
                  <div className="space-y-3 mb-8">
                    {chapter.features.map((f) => (
                      <div
                        key={f.title}
                        className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 group-hover:bg-primary transition-colors flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-foreground mb-0.5">{f.title}</div>
                          <div className="text-xs text-muted-foreground/80 leading-relaxed">{f.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA actions (last chapter) */}
                {'actions' in chapter && chapter.actions && (
                  <div className={cn('flex flex-col sm:flex-row flex-wrap gap-3', chapter.align === 'center' && 'justify-center')}>
                    {chapter.actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => document.querySelector(action.href)?.scrollIntoView({ behavior: 'smooth' })}
                        className={cn(
                          'px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary/20',
                          action.primary
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40'
                            : 'border-2 border-border/60 bg-background/60 backdrop-blur-sm hover:border-primary/40 hover:bg-accent/50'
                        )}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Watermark chapter number */}
              <div 
                className={cn(
                  "hidden xl:block absolute right-[3%] bottom-12 text-[8rem] font-black text-foreground/[0.04] leading-none select-none pointer-events-none tabular-nums transition-all duration-700 ease-out",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              >
                0{index + 1}
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
