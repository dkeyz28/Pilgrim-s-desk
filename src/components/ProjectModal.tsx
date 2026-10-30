import { useEffect, useRef } from "react";
import { ArrowLeft, X, Target, FlaskConical, ListChecks, Package } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const blocks = [
    { icon: Target, title: "Objectives", items: project.objectives },
    { icon: ListChecks, title: "Key Areas Covered", items: project.keyAreas },
    { icon: Package, title: "Deliverables", items: project.deliverables },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-card shadow-lift sm:rounded-3xl">
        <div className="gradient-ink sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 text-ink-foreground">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
              {project.field} • {project.year}
            </p>
            <h3 id="project-modal-title" className="mt-1.5 text-xl leading-snug font-semibold">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close project details"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-parchment px-3 py-1 text-xs font-semibold">{project.type}</span>
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <h4 className="mt-6 text-base font-semibold">Overview</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>

          <div className="mt-5 rounded-2xl border border-border bg-parchment p-5">
            <h4 className="flex items-center gap-2 text-base font-semibold">
              <FlaskConical className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
              Methodology
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.methodology}</p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {blocks.map((b) => (
              <div key={b.title} className="surface-card p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <b.icon className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                  {b.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {b.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
