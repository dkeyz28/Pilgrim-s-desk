import { useState } from "react";
import { ArrowUpRight, FileText, Filter } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/projects";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { ProjectModal } from "@/components/ProjectModal";
import { cn } from "@/lib/utils";

const accentVar: Record<string, string> = {
  teal: "var(--teal)",
  indigo: "var(--indigo)",
  rose: "var(--rose)",
  violet: "var(--violet)",
  amber: "var(--amber)",
};

function DocumentPreview({ project }: { project: Project }) {
  const color = accentVar[project.accent] ?? "var(--indigo)";
  return (
    <div
      className="relative flex h-44 items-end overflow-hidden rounded-xl p-4"
      style={{ background: `color-mix(in oklab, ${color} 12%, white)` }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{ background: color }}
      />
      <div className="relative w-full rounded-t-lg bg-card px-4 pt-4 pb-0 shadow-soft">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" style={{ color }} />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color }}>
            {project.type}
          </span>
        </div>
        <div className="mt-3 h-2.5 w-2/3 rounded-full bg-secondary" />
        <div className="mt-2 space-y-1.5 pb-4">
          {[100, 88, 94, 62].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-muted" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected Projects"
        description="A sample of past academic work, anonymised."
      />

      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-1 hidden items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:inline-flex">
          <Filter className="h-3.5 w-3.5" aria-hidden="true" /> Filter
        </span>
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              filter === cat
                ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 60}>
            <article className="group surface-card flex h-full flex-col overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
              <DocumentPreview project={project} />
              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>{project.field}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-2 text-lg leading-snug font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelected(project)}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold transition-colors hover:text-accent-foreground"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
