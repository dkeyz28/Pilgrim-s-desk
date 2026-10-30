import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { services } from "@/data/services";

export function Services() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[number] | null
  >(null);

  return (
    <>
      <section
        id="services"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <SectionHeading
          eyebrow="What I do"
          title="Research support that moves your project forward."
          description="From the first research idea to the final document, each service is designed to make academic work clearer, stronger and easier to present."
        />

        <div className="mt-14 space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <article
                className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid lg:grid-cols-[1fr_0.7fr]">

                  {/* Main content */}
                  <div className="relative p-7 sm:p-10 lg:p-12">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Academic Support
                      </span>
                    </div>

                    <div className="mt-12 max-w-xl">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        Service
                      </p>

                      <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                        {service.title}
                      </h3>

                      <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                        {service.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-foreground hover:text-background"
                    >
                      View service
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Visual panel */}
                  <div className="relative min-h-[240px] overflow-hidden bg-muted lg:min-h-[360px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-foreground/[0.04]" />

                    {/* Decorative document */}
                    <div className="absolute left-1/2 top-1/2 w-[65%] max-w-[300px] -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] rounded-xl border border-border bg-background p-5 shadow-2xl transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                          Research Document
                        </span>

                        <span className="h-2 w-2 rounded-full bg-accent" />
                      </div>

                      <div className="mt-5 space-y-3">
                        <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
                        <div className="h-2 w-full rounded-full bg-foreground/10" />
                        <div className="h-2 w-5/6 rounded-full bg-foreground/10" />

                        <div className="mt-6 h-20 rounded-lg bg-muted" />

                        <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
                        <div className="h-2 w-full rounded-full bg-foreground/10" />
                      </div>
                    </div>

                    <div className="absolute bottom-5 right-5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest backdrop-blur">
                      Research / Writing
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col justify-between gap-6 rounded-3xl border border-border bg-muted/40 p-7 sm:flex-row sm:items-center sm:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Have something specific in mind?
              </p>

              <h3 className="mt-2 font-display text-2xl font-semibold">
                Let&apos;s discuss your project.
              </h3>
            </div>

            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-1"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Service modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background p-7 shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close service details"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Service details
            </p>

            <h3
              id="service-title"
              className="mt-3 max-w-lg font-display text-3xl font-semibold sm:text-4xl"
            >
              {selectedService.title}
            </h3>

            <p className="mt-5 leading-7 text-muted-foreground">
              {selectedService.description}
            </p>

            <div className="my-8 border-t border-border" />

            <div>
              <p className="text-sm font-semibold">What you can expect</p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>• Clear communication about the project requirements.</li>
                <li>• A structured approach based on the project objectives.</li>
                <li>• Careful review and refinement before final delivery.</li>
                <li>• Professional presentation and documentation.</li>
              </ul>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                Request this service
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}