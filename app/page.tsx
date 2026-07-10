import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Leistungen from "@/components/Leistungen";
import Ablauf from "@/components/Ablauf";
import Showcase from "@/components/Showcase";
import Sicherheit from "@/components/Sicherheit";
import UeberMich from "@/components/UeberMich";
import FAQ from "@/components/FAQ";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <SmoothScroll />
      <Navbar />

      {/* Floating page frame — the white sheet sits on the gradient canvas */}
      <div className="px-2 sm:px-3 lg:px-4 pt-2 sm:pt-3 lg:pt-4">
        <div className="relative bg-surface rounded-[1.5rem] md:rounded-[2.25rem] shadow-frame overflow-hidden">
          <Hero />
          <Stats />
          <Leistungen />
          <Ablauf />
          <Showcase />
          <Sicherheit />
          <UeberMich />
          <FAQ />
          <Kontakt />
        </div>
      </div>

      <Footer />
    </main>
  );
}
