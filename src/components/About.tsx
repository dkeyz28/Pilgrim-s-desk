import { Microscope, LayoutList, ShieldCheck, Presentation, Check } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { Reveal, SectionHeading } from "@/components/Reveal";

const features = [
  { icon: Microscope, title: "Research-Focused", text: "Every claim traced to a credible source." },
  { icon: LayoutList, title: "Well-Structured", text: "Chapters that build on one another logically." },
  { icon: ShieldCheck, title: "Original Work", text: "Written from scratch for your specific topic." },
  { icon: Presentation, title: "Professional Presentation", text: "Formatting your department will accept." },
];

export function About() {
  const { about } = siteConfig;
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="About the Writer"
        title="A research partner, not just a writer"
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start lg:gap-14">
        <Reveal className="relative">
          <div className="surface-card overflow-hidden p-3">
            <img
              src={about.photo}
              alt={`Portrait of ${about.name}, ${about.role}`}
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-4/5 w-full rounded-xl object-cover"
            />
          </div>
          <div className="glass-panel absolute -right-2 -bottom-6 max-w-[15rem] rounded-2xl p-4 sm:right-6">
            <p className="font-display text-sm leading-snug font-semibold">{about.highlight}</p>
          </div>
        </Reveal>

        <div>
          <Reveal delay={80}>
            <h3 className="font-display text-2xl font-semibold">{about.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent-foreground/70">{about.role}</p>
            {about.bio.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            <blockquote className="mt-6 rounded-2xl border-l-4 border-accent bg-parchment px-5 py-4 text-sm leading-relaxed italic">
              {about.philosophy}
            </blockquote>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {about.expertise.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10 border-y border-border">
  <div className="flex items-end justify-between gap-6 py-6">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        The approach
      </p>

      <h4 className="mt-2 font-display text-xl font-semibold">
        What goes into every project
      </h4>
    </div>

    <span className="hidden font-mono text-xs text-muted-foreground sm:block">
      04 PRINCIPLES
    </span>
  </div>

  {features.map((f, i) => (
    <Reveal key={f.title} delay={i * 70}>
      <div className="group grid gap-3 border-t border-border py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
        <span className="font-mono text-xs text-muted-foreground">
          {String(i + 1).padStart(2, "0")}
        </span>

        <div>
          <h4 className="font-display text-base font-semibold">
            {f.title}
          </h4>

          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {f.text}
          </p>
        </div>

        <span className="text-lg text-muted-foreground/30 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Reveal>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}
