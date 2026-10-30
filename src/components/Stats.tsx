import { siteConfig } from "@/config/siteConfig";
import { Reveal } from "@/components/Reveal";

export function Stats() {
  return (
    <section aria-label="Key statistics" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="surface-card grid grid-cols-2 gap-px overflow-hidden bg-border lg:grid-cols-4">
        {siteConfig.stats.map((stat) => (
          <div key={stat.label} className="bg-card px-5 py-8 text-center">
            <p className="font-display text-3xl font-semibold sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
