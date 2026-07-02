import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mehrwert from "@/components/Mehrwert";
import Leistungen from "@/components/Leistungen";
import Ablauf from "@/components/Ablauf";
import FAQ from "@/components/FAQ";
import UeberMich from "@/components/UeberMich";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Mehrwert />
      <Leistungen />
      <Ablauf />
      <FAQ />
      <UeberMich />
      <Kontakt />
      <Footer />
    </main>
  );
}
