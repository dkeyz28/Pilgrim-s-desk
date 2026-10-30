import { GraduationCap, Mail, MessageCircle, Phone, Linkedin, Twitter, Instagram, type LucideIcon } from "lucide-react";
import { navLinks, siteConfig, whatsappLink } from "@/config/siteConfig";
import { services } from "@/data/services";

const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="gradient-ink relative overflow-hidden text-ink-foreground">
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold">{siteConfig.brand}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{siteConfig.footer.description}</p>
            <ul className="mt-5 flex gap-2">
              {siteConfig.socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? Linkedin;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-muted md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button onClick={() => go(l.id)} className="transition-colors hover:text-ink-foreground">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">Services</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {services.map((s) => (
                <li key={s.title}>
                  <button onClick={() => go("services")} className="text-left transition-colors hover:text-ink-foreground">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a className="break-all hover:text-ink-foreground" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a className="hover:text-ink-foreground" href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-ink-foreground">
                  Chat On Whatsapp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-ink-muted">{siteConfig.footer.disclaimer}</p>
          <p className="mt-4 text-xs text-ink-muted">{siteConfig.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
