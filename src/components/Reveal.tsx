import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase",
          tone === "light"
            ? "bg-secondary text-muted-foreground"
            : "bg-white/10 text-ink-muted",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 text-3xl leading-tight font-semibold sm:text-4xl",
          tone === "light" ? "text-foreground" : "text-ink-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "light" ? "text-muted-foreground" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
