import { ArrowRight, BookMarked, Quote, LineChart, FileText, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { hero } = siteConfig;
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {siteConfig.tagline}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Academic Projects, Research &{" "}
            <span className="text-gradient-accent">Writing Done With Precision.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => go("portfolio")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift"
            >
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              {hero.secondaryCta}
            </button>
          </div>

          <p className="mt-8 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            {hero.trustLine}
          </p>
        </div>

        {/* Decorative academic composition — pure CSS, no external images */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
          <div className="surface-card relative rotate-[-2deg] p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Chapter Three
              </span>
              <BookMarked className="h-4 w-4 text-accent" />
            </div>
            <div className="mt-4 h-3 w-3/4 rounded-full bg-secondary" />
            <div className="mt-3 space-y-2">
              {[100, 96, 88, 92, 70].map((w, i) => (
                <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Aim", "Method", "Result"].map((t) => (
                <div key={t} className="rounded-xl bg-parchment px-2 py-2 text-center text-[11px] font-medium">
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card absolute -bottom-10 -left-2 w-48 rotate-[3deg] p-4 sm:-left-8 sm:w-56">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <LineChart className="h-4 w-4 text-teal" />
              Results Overview
            </div>
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {[38, 62, 46, 84, 56, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${h}%`,
                    background: i % 2 ? "var(--teal)" : "var(--gradient-accent)",
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="glass-panel absolute -top-6 -right-1 w-52 rounded-2xl p-4 sm:-right-6">
            <Quote className="h-4 w-4 text-accent" />
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Adeyemi, T. (2024). <em>Research Methods in Applied Science</em>, 3rd ed.
            </p>
            <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold">
              APA 7th
            </span>
          </div>

          <div className="gradient-ink absolute -bottom-6 right-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-ink-foreground shadow-lift sm:right-0">
            <FileText className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold">Formatted & Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
