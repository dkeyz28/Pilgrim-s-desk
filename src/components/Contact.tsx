import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { whatsappLink } from "@/config/siteConfig";
import { Reveal, SectionHeading } from "@/components/Reveal";

type FieldName = "name" | "email" | "phone" | "department" | "topic" | "projectType" | "message";
type Errors = Partial<Record<FieldName, string>>;
type FormValues = Record<FieldName, string>;

const projectTypes = [
  "Thesis",
  "Dissertation",
  "Proposal",
  "SOPs",
  "CV",
  "SIWES reports",
  "Slides",
  "Corporate Profiles",
  "Project Writing",
  "Seminar Report",
  "Proposal",
  "Editing",
  "Proofreading"
];

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as FormValues;

    const next: Errors = {};
    if (!data["name"]?.trim()) next["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data["email"] ?? "")) next["email"] = "Enter a valid email address.";
    if (!data["phone"]?.trim()) next["phone"] = "Please add a phone or WhatsApp number.";
    if (!data["projectType"]) next["projectType"] = "Select a project type.";
    if (!data["message"]?.trim() || (data["message"].trim().length ?? 0) < 10)
      next["message"] = "Tell me a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");

    /**
     * ------------------------------------------------------------
     * FORM SUBMISSION — CONNECT YOUR SERVICE HERE
     * ------------------------------------------------------------
     * Set `contact.formEndpoint` in src/config/siteConfig.ts to a
     * Formspree / Web3Forms / EmailJS / custom endpoint URL.
     * Example: "https://formspree.io/f/xxxxxxx"
     * With no endpoint set, the form only simulates a submission.
     */
    const endpoint = siteConfig.contact.formEndpoint;
    try {
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent";

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Have a Project in Mind?"
          description="Tell me what you're working on and let's discuss how I can help."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="gradient-ink relative overflow-hidden rounded-3xl p-7 text-ink-foreground shadow-lift">
            <div className="paper-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-xl font-semibold">Talk to a real person</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {siteConfig.contact.responseTime}. Share your field, topic idea and deadline to get a
                clear plan and timeline.
              </p>
              <ul className="mt-7 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a className="break-all hover:underline" href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a className="hover:underline" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {siteConfig.contact.location}
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {siteConfig.contact.responseTime}
                </li>
              </ul>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={80} className="surface-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input id="name" name="name" className={field} placeholder="Your full name" />
                {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input id="email" name="email" type="email" className={field} placeholder="you@email.com" />
                {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone / WhatsApp
                </label>
                <input id="phone" name="phone" className={field} placeholder="+234 800 000 0000" />
                {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
              </div>
              <div>
                <label htmlFor="department" className="text-sm font-medium">
                  Department / Field
                </label>
                <input id="department" name="department" className={field} placeholder="e.g. Microbiology" />
              </div>
              <div>
                <label htmlFor="projectType" className="text-sm font-medium">
                  Project Type
                </label>
                <select id="projectType" name="projectType" defaultValue="" className={field}>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors["projectType"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["projectType"]}</p>
                )}
              </div>
              <div>
                <label htmlFor="topic" className="text-sm font-medium">
                  Project Topic
                </label>
                <input id="topic" name="topic" className={field} placeholder="Working title or idea" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={field}
                  placeholder="Describe your project, stage and deadline."
                />
                {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  {status === "sending" ? "Sending…" : "Send Project Request"}
                </button>
                <p aria-live="polite" className="text-sm text-muted-foreground">
                  {status === "sent" && (
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-teal" aria-hidden="true" />
                      Thanks, your request has been Submitted.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
