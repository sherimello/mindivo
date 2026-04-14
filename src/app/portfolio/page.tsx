import { ProjectShowcase } from "@/components/ui/project-showcase";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">Our Work</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A deep dive into the digital products we've architected and shipped.
          </p>
        </div>
        <ProjectShowcase />
      </main>
      <Footer />
    </>
  )
}
