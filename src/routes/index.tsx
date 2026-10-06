import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LangProvider } from "@/lib/i18n";
import { Navbar } from "@/components/site/Navbar";
import { Hero, Stats } from "@/components/site/Hero";
import { About, Achievers, Approach, Batches, CtaBand, Programs, WhyUs } from "@/components/site/Sections";
import { Contact, FinalCta, Footer, Gallery, ScrollTop, Testimonials } from "@/components/site/Interactive";

const title = "Prarambh Physical Academy | Physical Training for Police, Army & All Forces";
const description =
  "Prarambh Physical Academy provides professional physical training for Police Bharti, Army, Forest, BSF, CRPF, SRPF, Agniveer and other force recruitments.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Programs />
        <Approach />
        <WhyUs />
        <Batches />
        <CtaBand />
        <Achievers />
        <Testimonials />
        <Gallery />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
      <ScrollTop />
      <Toaster />
    </LangProvider>
  );
}
