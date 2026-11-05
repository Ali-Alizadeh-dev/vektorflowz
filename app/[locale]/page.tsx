import { getDict, type Locale } from "@/lib/i18n";
import { DEPARTMENTS } from "@/lib/departments";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import LogoBand from "@/components/site/LogoBand";
import HowItWorks from "@/components/site/HowItWorks";
import Features from "@/components/site/Features";
import Team from "@/components/site/Team";
import Integrations from "@/components/site/Integrations";
import { Founder, DataSafety, FAQ } from "@/components/site/Sections";
import { FinalCta, Contact, Footer } from "@/components/site/Closing";
import { RevealObserver } from "@/components/site/ui";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <Navbar t={t.nav} locale={locale as Locale} />
      <main id="main">
        <Hero t={t.hero} depts={t.depts} />
        <LogoBand label={t.band.label} />
        <HowItWorks t={t.how} names={DEPARTMENTS.map((d) => t.depts[d.id].name)} />
        <Features t={t.features} depts={t.depts} locale={locale} jobs={DEPARTMENTS.map((d) => t.team.depts[d.id].jobs[0].title)} />
        <Team t={t.team} depts={t.depts} />
        <Integrations t={t.integrations} />
        <Founder t={t.founder} />
        <DataSafety t={t.data} />
        <FAQ t={t.faq} />
        <FinalCta t={t.final} />
        <Contact t={t.contact} locale={locale as Locale} />
      </main>
      <Footer t={t.footer} locale={locale as Locale} />
      <RevealObserver />
    </>
  );
}
