import {
  MessageCircle,
  Compass,
  PenLine,
  SearchCheck,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import { processSteps } from "@/data/services";
import { Reveal, SectionHeading } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  MessageCircle,
  Compass,
  PenLine,
  SearchCheck,
  PackageCheck,
};

export function Process() {
  return (
    <section id="process" className="gradient-ink relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Process"
          title="From Research Question to Final Project"
          description="Five clear stages, with checkpoints you approve before the work moves forward."
          tone="dark"
        />

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-5">
          <span
            className="absolute top-[3.25rem] right-0 left-0 hidden h-px bg-white/15 lg:block"
            aria-hidden="true"
          />
          {processSteps.map((step, i) => {
            const Icon = icons[step.icon] ?? MessageCircle;
            return (
              <Reveal as="li" key={step.number} delay={i * 80} className="relative">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-semibold text-white/25">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
