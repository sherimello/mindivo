import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import GlobeSection from "@/components/globe-section";
import ProcessSection from "@/components/process-section";
import StatsSection from "@/components/stats-section";
import PortfolioSection from "@/components/portfolio-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* 1 — Hero with animated GLSL Hills */}
        <HeroSection />

        {/* 2 — What We Build (service cards) */}
        <ServicesSection />

        {/* 3 — Globe scrollytelling (4 chapters about our solutions) */}
        <GlobeSection />

        {/* 4 — How We Work (4-step process) */}
        <ProcessSection />

        {/* 5 — Impact numbers */}
        <StatsSection />

        {/* 6 — Portfolio / case studies */}
        <PortfolioSection />

        {/* 7 — Contact form / CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
