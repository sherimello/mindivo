'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 50,  suffix: '+', label: 'Clients Served',    description: 'Businesses transformed' },
  { value: 120, suffix: '+', label: 'Projects Delivered', description: 'On time and on budget' },
  { value: 5,   suffix: '+', label: 'Years of Excellence', description: 'In the industry' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction', description: 'Based on post-project surveys' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = 16;
          const increment = value / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('[data-stat]');
    if (!items) return;
    items.forEach((item) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = 'translateY(24px)';
    });

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => {
              (item as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
              (item as HTMLElement).style.opacity = '1';
              (item as HTMLElement).style.transform = 'translateY(0)';
            }, i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Full-width glowing band */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
