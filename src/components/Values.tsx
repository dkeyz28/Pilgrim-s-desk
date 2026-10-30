import {
  LayoutList,
  Microscope,
  ScanEye,
  FileType2,
  CalendarClock,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { values } from "@/data/services";
import { Reveal, SectionHeading } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  LayoutList,
  Microscope,
  ScanEye,
  FileType2,
  CalendarClock,
  MessagesSquare,
};

export function Values() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="What you actually get working together"
        description="Six commitments that shape how every project is planned, written and delivered."
      />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, i) => {
          const Icon = icons[value.icon] ?? LayoutList;
          return (
            <Reveal as="li" key={value.title} delay={i * 60}>
              <div className="surface-card flex h-full gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-parchment text-accent-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
