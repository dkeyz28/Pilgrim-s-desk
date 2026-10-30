import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions students usually ask"
        description="Something not covered here? Send a message and you'll get a straight answer."
      />
      <div className="mt-12 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={i * 40}>
              <div className="surface-card overflow-hidden">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                        isOpen ? "rotate-45 bg-primary text-primary-foreground" : "bg-secondary",
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground"
                >
                  {faq.answer}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
