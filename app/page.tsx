import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import HowItWorks from "@/components/HowItWorks";
import AIWorkforce from "@/components/AIWorkforce";
import AgentsShowcase from "@/components/AgentsShowcase";
import Stack from "@/components/Stack";
import Deliverables from "@/components/Deliverables";
import ROICalculator from "@/components/ROICalculator";
import Founder from "@/components/Founder";
import FAQ from "@/components/FAQ";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
// Auskommentiert, bis echte Kundenstimmen & belegbare Zahlen vorliegen:
// import Testimonials from "@/components/Testimonials";
// import StatsBand from "@/components/StatsBand";

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <SmoothScroll />
      <Navbar />

      <Hero />
      <PainPoints />
      <HowItWorks />
      <AIWorkforce />
      <AgentsShowcase />
      <Stack />
      <Deliverables />
      {/* <StatsBand /> — einkommentieren, sobald echte Zahlen vorliegen */}
      <ROICalculator />
      {/* <Testimonials /> — einkommentieren, sobald echte Kundenstimmen vorliegen */}
      <Founder />
      <FAQ />
      <Kontakt />

      <Footer />
    </main>
  );
}
