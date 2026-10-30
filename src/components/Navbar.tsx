import { useEffect, useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { navLinks, siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-panel border-b border-border/70 py-2" : "border-b border-transparent py-4",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <button
          onClick={() => go("home")}
          className="flex min-w-0 items-center gap-2.5 text-left"
          aria-label={`${siteConfig.brand} — back to top`}
        >
          <span className="gradient-ink grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink-foreground shadow-soft">
            <img src="public/images/logo.png" className="w-6 h-6" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none font-semibold">
              {siteConfig.brand}
            </span>
            <span className="mt-1 block truncate text-[11px] tracking-wide text-muted-foreground">
              Academic Writer
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                aria-current={active === link.id ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active === link.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift sm:inline-flex"
          >
            {siteConfig.navCta}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="glass-panel mx-4 mt-3 rounded-2xl p-3 lg:hidden"
      >
        <ul className="grid gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={cn(
                  "w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors",
                  active === link.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70",
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => go("contact")}
          className="mt-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          {siteConfig.navCta}
        </button>
      </div>
    </header>
  );
}
