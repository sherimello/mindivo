import { ProjectShowcase } from '@/components/ui/project-showcase';

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative overflow-hidden">
      {/* Visual Header */}
      <div className="relative max-w-7xl mx-auto px-4 pt-24 sm:pt-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Our Work
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8">
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Crafting Digital</span>{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Excellence</span>
        </h2>
        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          We don't just write code; we architect solutions that drive growth and redefine industries.
        </p>
      </div>

      <ProjectShowcase />

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
