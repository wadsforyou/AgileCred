import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function SectionHeading({ eyebrow, title, description, align = "center", accent = "blue" }) {
  const accentColor =
    accent === "green"
      ? "hsl(var(--brand-green))"
      : accent === "purple"
      ? "hsl(var(--brand-purple))"
      : "hsl(var(--brand-blue))";

  return (
    <ScrollReveal className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-4 ${
            align === "center" ? "justify-center" : ""
          }`}
          style={{ color: accentColor }}
        >
          <span className="h-px w-8" style={{ backgroundColor: accentColor }} />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{description}</p>
      )}
    </ScrollReveal>
  );
}