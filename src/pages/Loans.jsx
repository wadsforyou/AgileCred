import React from "react";
import { Link } from "react-router-dom";
import { Users, Briefcase, Heart, Sparkles, Sprout, ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import { loanCategories } from "@/data/loanCategories";

const iconMap = { Users, Briefcase, Heart, Sparkles, Sprout };

export default function Loans() {
  return (
    <div>
      <PageBanner
        pageKey="loans"
        title="Our Financial Solutions"
        subtitle="Flexible and innovative financing for individuals, groups, farmers, businesses and communities across Zimbabwe."
        image={loanCategories[1].heroImage}
        eyebrow="Financial Solutions"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Briefcase;
            const accent = cat.accent === "green" ? "hsl(var(--brand-green))" : cat.accent === "purple" ? "hsl(var(--brand-purple))" : "hsl(var(--brand-blue))";
            return (
              <ScrollReveal key={cat.slug} delay={i * 0.06}>
                <Link to={`/loans/${cat.slug}`} className="group block h-full rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    <img src={cat.heroImage} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur" style={{ color: accent }}>
                      <Icon style={{ width: 22, height: 22 }} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold text-foreground">{cat.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cat.shortDescription}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Products</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.products.slice(0, 4).map((p) => (
                          <span key={p.name} className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground">{p.name}</span>
                        ))}
                        {cat.products.length > 4 && (
                          <span className="text-xs px-2.5 py-1 rounded-full text-muted-foreground">+{cat.products.length - 4} more</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                      Explore {cat.title} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}