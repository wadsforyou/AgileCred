import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Users, Briefcase, Heart, Sparkles, Sprout, ArrowRight, ChevronLeft } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ApplyForm from "@/components/ApplyForm";
import { loanCategories, APPLY_BANNER } from "@/data/loanCategories";

const iconMap = { Users, Briefcase, Heart, Sparkles, Sprout };

export default function Apply() {
  const [searchParams] = useSearchParams();
  const initialSlug = searchParams.get("category");
  const initial = initialSlug ? loanCategories.find((c) => c.slug === initialSlug)?.title : null;
  const [selected, setSelected] = useState(initial || null);

  return (
    <div>
      <PageBanner
        pageKey="apply"
        title={selected ? "Complete Your Application" : "What Would You Like a Loan For?"}
        subtitle={
          selected
            ? "Please complete the application below. Our team will review your information and be in touch."
            : "Choose the loan category that best matches your needs to begin a secure and professional application."
        }
        image={APPLY_BANNER}
        eyebrow="Application"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {selected ? (
          <div>
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Choose a different loan type
            </button>
            <ScrollReveal>
              <ApplyForm prefillCategory={selected} />
            </ScrollReveal>
          </div>
        ) : (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                Select Your Loan Category
              </h2>
              <p className="mt-3 text-muted-foreground">
                AgileCred offers five tailored financing categories. Select the one that fits your needs to proceed to the application form.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanCategories.map((cat, i) => {
                const Icon = iconMap[cat.icon] || Briefcase;
                const accent =
                  cat.accent === "green"
                    ? "hsl(var(--brand-green))"
                    : cat.accent === "purple"
                    ? "hsl(var(--brand-purple))"
                    : "hsl(var(--brand-blue))";
                const accentBg =
                  cat.accent === "green"
                    ? "hsl(var(--brand-green-light))"
                    : cat.accent === "purple"
                    ? "hsl(var(--brand-purple-light))"
                    : "hsl(var(--brand-blue-light))";
                return (
                  <ScrollReveal key={cat.slug} delay={i * 0.06}>
                    <button
                      onClick={() => setSelected(cat.title)}
                      className="group block w-full h-full text-left rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img src={cat.heroImage} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
                        <div className="absolute top-4 right-4 w-11 h-11 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur" style={{ color: accent }}>
                          <Icon style={{ width: 22, height: 22 }} />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-heading font-bold text-foreground">{cat.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{cat.shortDescription}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cat.products.slice(0, 3).map((p) => (
                            <span key={p.name} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: accentBg, color: accent }}>
                              {p.name}
                            </span>
                          ))}
                          {cat.products.length > 3 && (
                            <span className="text-xs px-2 py-0.5 rounded-full text-muted-foreground">+{cat.products.length - 3}</span>
                          )}
                        </div>
                        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                          Start Application <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 md:p-8 flex flex-col md:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(var(--brand-blue-light))", color: "hsl(var(--brand-blue))" }}>
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-foreground">Not Sure Which Loan is Right for You?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Use our loan calculator to estimate repayments, or speak with our team — we'll help you find the financing that matches your needs.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link to="/calculator" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold border border-border bg-white hover:bg-secondary transition-colors">
                  Calculator
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}