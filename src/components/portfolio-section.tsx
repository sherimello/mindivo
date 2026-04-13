'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Smartphone, Globe2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const PROJECTS = [
  {
    title: 'RetailPro',
    category: 'Web Platform',
    icon: Globe2,
    description: 'An end-to-end retail management SaaS — inventory, POS, analytics, and supplier portal — replacing a patchwork of spreadsheets for a national chain.',
    stack: ['Next.js', 'PostgreSQL', 'AWS', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    color: 'from-foreground/25 to-foreground/10',
    accent: 'text-foreground',
    result: '40% faster checkout time',
  },
  {
    title: 'MedTrack',
    category: 'Mobile App',
    icon: Smartphone,
    description: 'A HIPAA-compliant patient tracking mobile app connecting care teams, enabling real-time vitals monitoring and care plan updates directly from the bedside.',
    stack: ['React Native', 'Node.js', 'Firebase', 'HL7 FHIR'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    color: 'from-accent/25 to-accent/10',
    accent: 'text-accent',
    result: '60% reduction in charting errors',
  },
  {
    title: 'LogiFlow',
    category: 'Digitization',
    icon: Zap,
    description: 'A complete supply-chain digitization for a Midwest logistics company — from driver mobile app to operations dashboard — replacing entirely paper-based workflows.',
    stack: ['Vue.js', 'Python', 'GCP', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    color: 'from-primary/25 to-primary/10',
    accent: 'text-primary',
    result: '3x increase in daily throughput',
  },
  {
    title: 'EduLearn',
    category: 'Web Platform',
    icon: Globe2,
    description: 'An adaptive learning platform for K-12 schools with personalized content paths, real-time teacher dashboards, and district-wide analytics.',
    stack: ['React', 'Django', 'PostgreSQL', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    color: 'from-muted-foreground/25 to-muted-foreground/10',
    accent: 'text-muted-foreground',
    result: '85% student engagement increase',
  },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('[data-pcard]');
    if (!cards) return;
    cards.forEach((c) => {
      (c as HTMLElement).style.opacity = '0';
      (c as HTMLElement).style.transform = 'translateY(36px)';
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((c, i) => {
              setTimeout(() => {
                (c as HTMLElement).style.transition = 'opacity 0.65s ease-out, transform 0.65s ease-out';
                (c as HTMLElement).style.opacity = '1';
                (c as HTMLElement).style.transform = 'translateY(0)';
              }, i * 110);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 dark:via-card/5 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Projects We&apos;re</span>{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Proud Of</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real products, real impact. Here&apos;s a sample of what we&apos;ve built for clients across industries.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                data-pcard
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 hover:border-primary/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/95" />
                  {/* Overlay on hover */}
                  <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br', project.color)} />
                  {/* Arrow icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-7 h-7 rounded-lg bg-card border border-border/50 flex items-center justify-center', project.accent)}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={cn('text-xs font-semibold', project.accent)}>{project.category}</span>
                    </div>
                    {/* Result badge */}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                      {project.result}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-xs px-2.5 py-1 rounded-md border border-border/40 bg-background/60 text-muted-foreground font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
