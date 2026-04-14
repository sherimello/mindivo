'use client';

import { useEffect, useRef } from 'react';
import { Smartphone, Globe2, Zap, ArrowRight, Code2, Layers, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    icon: Smartphone,
    badge: 'Mobile',
    title: 'Mobile App Development',
    description:
      'Native iOS & Android apps and cross-platform solutions built for performance, scalability, and delightful user experiences.',
    features: ['React Native & Swift/Kotlin', 'Offline-first architecture', 'App Store deployment', 'Push notifications & analytics'],
    color: 'from-foreground/20 to-foreground/5',
    accent: 'text-foreground',
    border: 'hover:border-foreground/40',
    glow: 'group-hover:shadow-foreground/10',
  },
  {
    icon: Globe2,
    badge: 'Web',
    title: 'Web Application Development',
    description:
      'Scalable, cloud-native web platforms designed to handle real-world traffic, complex workflows, and enterprise-grade demands.',
    features: ['Next.js & React ecosystems', 'Cloud infrastructure (AWS/GCP)', 'REST & GraphQL APIs', 'CI/CD & DevOps pipelines'],
    color: 'from-accent/20 to-accent/5',
    accent: 'text-accent',
    border: 'hover:border-accent/40',
    glow: 'group-hover:shadow-accent/10',
  },
  {
    icon: Zap,
    badge: 'Digitization',
    title: 'Business Digitization',
    description:
      'We replace paper trails, manual processes, and legacy systems with intelligent digital workflows that save time and reduce error.',
    features: ['Process audit & mapping', 'Custom ERP/CRM solutions', 'System integrations', 'Staff training & support'],
    color: 'from-primary/20 to-primary/5',
    accent: 'text-primary',
    border: 'hover:border-primary/40',
    glow: 'group-hover:shadow-primary/10',
  },
];

const EXTRAS = [
  { icon: Code2, label: 'API Development', desc: 'Robust backend services' },
  { icon: Layers,  label: 'UI/UX Design',    desc: 'Research-driven interfaces' },
  { icon: ShieldCheck, label: 'Security Audits', desc: 'Enterprise-grade protection' },
];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const Icon = service.icon;
  return (
    <div
      ref={ref}
      className={cn(
        'group relative flex flex-col p-6 sm:p-8 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm',
        'hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
        service.border, service.glow, 'gradient-border'
      )}
    >
      {/* Background gradient */}
      <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none', service.color)} />

      <div className="relative z-10">
        {/* Icon + badge */}
        <div className="flex items-start justify-between mb-5">
          <div className={cn('w-12 h-12 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:border-current/30 transition-colors', service.accent)}>
            <Icon className="w-6 h-6" />
          </div>
          <span className={cn('text-xs font-semibold px-3 py-1 rounded-full border bg-background/60 backdrop-blur-sm', service.accent, 'border-current/20')}>
            {service.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Feature list */}
        <ul className="space-y-2 mb-6">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', service.accent.replace('text-', 'bg-'))} />
              {f}
            </li>
          ))}
        </ul>

        <button className={cn('flex items-center gap-2 text-sm font-semibold group/btn transition-all duration-200', service.accent)}>
          Learn more
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useScrollReveal();

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            What We Build
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="text-foreground">
              Software That Moves Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Business Forward
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            From the first wireframe to post-launch support, we deliver complete digital solutions
            tailored to your industry and growth goals.
          </p>
        </div>

        {/* Main service cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Extras row */}
        <div className="grid sm:grid-cols-3 gap-4">
          {EXTRAS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
