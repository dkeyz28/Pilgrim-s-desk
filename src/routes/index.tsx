import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Values } from "@/components/Values";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.seoTitle },
      { name: "description", content: siteConfig.seoDescription },
      { property: "og:title", content: siteConfig.seoTitle },
      { property: "og:description", content: siteConfig.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteConfig.seoTitle },
      { name: "twitter:description", content: siteConfig.seoDescription },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Values />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
