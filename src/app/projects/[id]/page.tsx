import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import Navbar from "@/components/navbar";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { WavePath } from "@/components/ui/wave-path";
import { HoverFooter } from "@/components/ui/hover-footer";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* ── Hero ── */}
        <section className="relative h-screen flex flex-col overflow-hidden">
          {/* Mesh grid background */}
          <div className="absolute inset-0 mesh-grid opacity-30 pointer-events-none" />

          {/* Dead Center Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto">
              {/* HandWrittenTitle hero */}
              <div className="-ml-4 sm:-ml-8 lg:-ml-12">
                 <HandWrittenTitle title={project.title} subtitle={project.tagline} />
              </div>
            </div>
          </div>

          {/* Meta strip — anchored to the bottom */}
          <div className="absolute bottom-0 left-0 right-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 border-t border-border/30 pt-10">
              {[
                { icon: User, label: "Client", value: project.client },
                { icon: Clock, label: "Duration", value: project.duration },
                { icon: Calendar, label: "Year", value: project.year },
                { icon: Tag, label: "Role", value: project.role },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 uppercase tracking-widest mb-2">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                  <p className="text-base font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary/30" />
                Overview
              </p>
              <p className="text-2xl sm:text-3xl font-light leading-relaxed text-foreground/90">
                {project.description}
              </p>
            </div>
            <div className="space-y-8 pt-2">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WavePath divider ── */}
        <div className="flex justify-center text-foreground/20 py-4">
          <WavePath />
        </div>

        {/* ── Gallery ── */}
        <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            Gallery
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-video overflow-hidden rounded-xl border border-border/20 group"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Results ── */}
        <section id="results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-12 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            Results
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/20">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="bg-background p-8 group hover:bg-card transition-colors duration-300"
              >
                <p className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-2">
                  {r.value}
                </p>
                <p className="text-sm text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section id="tech-stack" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((t) => (
              <div
                key={t.name}
                className="group flex items-center gap-2 border border-border/50 rounded-full px-4 py-2 bg-card/30 hover:bg-card hover:border-primary/30 transition-all duration-200"
              >
                <span className="text-sm font-medium text-foreground">
                  {t.name}
                </span>
                <span className="text-xs text-muted-foreground/60">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── WavePath divider ── */}
        <div className="flex justify-center text-foreground/20 py-4">
          <WavePath />
        </div>

        {/* ── Process ── */}
        <section id="process" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-16 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            How We Did It
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.process.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {i < project.process.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+1rem)] w-8 h-px bg-border/40" />
                )}
                <div className="w-10 h-10 rounded-full border border-border/50 bg-card flex items-center justify-center text-sm font-bold text-muted-foreground mb-4">
                  {String(step.step).padStart(2, "0")}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>



        {/* ── Related Projects ── */}
        <section id="related" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-10 flex items-center gap-3">
            <span className="w-8 h-px bg-primary/30" />
            More Work
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/20 hover:bg-card transition-all duration-300 hover:border-primary/20"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <span className="text-xs text-muted-foreground/50 font-mono">
                        /{p.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {p.tagline}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* ── Hover Footer ── */}
      <HoverFooter />
    </>
  );
}
