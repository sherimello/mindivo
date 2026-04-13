'use client';

import { useEffect, useRef } from 'react';
import { Search, Map, Wrench, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We deep-dive into your business, goals, and constraints. Stakeholder interviews, competitive analysis, and technical scoping — all delivered in a clear project brief.',
    accent: 'text-foreground',
    bg: 'bg-foreground/10 border-foreground/20',
  },
  {
    step: '02',
    icon: Map,
    title: 'Strategy & Design',
    description:
      'Architecture planning, UX wireframes, and an iterative design process. You see your product before a single line of production code is written.',
    accent: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Build',
    description:
      'Agile sprints with bi-weekly demos. Full transparency on progress, blockers, and decisions. Automated testing at every layer so quality is never an afterthought.',
    accent: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch & Scale',
    description:
      'Smooth deployment with zero downtime, post-launch monitoring, and a clear roadmap for scaling features. We stay by your side long after go-live.',
    accent: 'text-muted-foreground',
    bg: 'bg-muted-foreground/10 border-muted-foreground/20',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('[data-card]');
    if (!cards) return;
    cards.forEach((card, i) => {
      (card as HTMLElement).style.opacity = '0';
      (card as HTMLElement).style.transform = 'translateY(40px)';
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 dark:via-card/10 to-background pointer-events-none" />
      <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              From Idea to
            </span>{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A proven process refined across 120+ projects that removes ambiguity, accelerates delivery, and ensures quality at every stage.
          </p>
        </div>

        {/* Steps */}
        <div ref={sectionRef} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  data-card
                  className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/25 hover:-translate-y-2 transition-all duration-500 group"
                >
                  {/* Step number bubble */}
                  <div className="relative mb-5">
                    <div className={cn('w-14 h-14 rounded-2xl border flex items-center justify-center mb-0 group-hover:scale-110 transition-transform duration-300', step.bg, step.accent)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-border/60 flex items-center justify-center">
                      <span className="text-[9px] font-black text-muted-foreground">{step.step}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                  {/* Connector arrow for desktop */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-14 z-10 w-6 h-6 items-center justify-center">
                      <svg className="w-4 h-4 text-primary/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
