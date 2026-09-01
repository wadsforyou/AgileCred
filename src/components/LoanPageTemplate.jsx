import React from "react";
import { Link } from "react-router-dom";
import { Users, Briefcase, Heart, Sparkles, Sprout, CheckCircle2, HelpCircle, ArrowRight, Calculator as CalcIcon, Phone } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import LoanCalculator from "@/components/LoanCalculator";

const iconMap = { Users, Briefcase, Heart, Sparkles, Sprout };

export default function LoanPageTemplate({ category }) {
  const MainIcon = iconMap[category.icon] || Briefcase;
  const accent =
    category.accent === "green"
      ? "hsl(var(--brand-green))"
      : category.accent === "purple"
      ? "hsl(var(--brand-purple))"
      : "hsl(var(--brand-blue))";
  const accentLight =
    category.accent === "green"
      ? "hsl(var(--brand-green-light))"
      : category.accent === "purple"
      ? "hsl(var(--brand-purple-light))"
      : "hsl(var(--brand-blue-light))";

  return (
    <>
      <PageBanner
        pageKey={`loan:${category.slug}`}
        title={category.title}
        subtitle={category.shortDescription}
        image={category.heroImage}
        eyebrow="Financial Solutions"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* Introduction */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: accentLight, color: accent }}
              >
                <MainIcon className="w-6 h-6" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">About {category.title}</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{category.introduction}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: accent }}>
                {category.title} Products
              </p>
              <div className="grid grid-cols-2 gap-3">
                {category.products.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-border p-3 flex items-center gap-2.5"
                    style={{ backgroundColor: accentLight }}
                  >
                    <MainIcon className="w-4 h-4 shrink-0" style={{ color: accent }} />
                    <span className="text-xs font-semibold text-foreground leading-tight">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Who it's for */}
        <section>
          <SectionHeading eyebrow="Who It's For" title={`Who ${category.title} Are For`} accent={category.accent} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.targetAudience.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border bg-white p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Available products */}
        <section>
          <SectionHeading eyebrow="Available Products" title="Loan Products" accent={category.accent} />
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {category.products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-border bg-white p-6 hover:border-foreground/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentLight, color: accent }}>
                      <MainIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground">{p.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Benefits & Typical Uses */}
        <section className="grid md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="h-full rounded-2xl p-6 md:p-8" style={{ backgroundColor: accentLight }}>
              <h3 className="text-xl font-heading font-bold mb-4" style={{ color: accent }}>Benefits</h3>
              <ul className="space-y-3">
                {category.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border p-6 md:p-8 bg-white">
              <h3 className="text-xl font-heading font-bold mb-4 text-foreground">Typical Uses</h3>
              <ul className="space-y-3">
                {category.typicalUses.map((u, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1" style={{ color: accent }} />
                    <span className="leading-relaxed">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </section>

        {/* Requirements */}
        <section>
          <SectionHeading eyebrow="Requirements" title="What You May Need" accent={category.accent} />
          <ScrollReveal>
            <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-border bg-white p-6 md:p-8">
              <ul className="space-y-4">
                {category.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-white" style={{ backgroundColor: accent }}>
                      {i + 1}
                    </div>
                    <span className="text-sm text-foreground leading-relaxed pt-0.5">{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-muted-foreground border-t border-border pt-4">
                Requirements may vary depending on the type of financing requested.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* How it works */}
        <section style={{ backgroundColor: "hsl(var(--muted))" }} className="rounded-2xl p-8 md:p-12">
          <SectionHeading eyebrow="How It Works" title="A Simple Four-Step Process" accent={category.accent} />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.howItWorks.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.08}>
                <div className="relative">
                  <div className="text-3xl font-heading font-bold mb-3" style={{ color: accent }}>{s.step}</div>
                  <h4 className="font-semibold text-foreground mb-2">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" accent={category.accent} />
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {category.faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="rounded-xl border border-border bg-white p-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accent }} />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1.5">{f.q}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Calculator CTA */}
        <section>
          <SectionHeading eyebrow="Plan Ahead" title="Loan Calculator" description="Use our calculator to estimate your repayments for this loan type." accent={category.accent} />
          <div className="mt-10 max-w-4xl mx-auto">
            <LoanCalculator defaultCategory={category.title} />
          </div>
        </section>

        {/* Final CTAs */}
        <section className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Ready to Take the Next Step?</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Apply online today or get in touch with our team to discuss your financing needs.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/apply"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: "hsl(var(--brand-green))" }}
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" /> Contact Us
              </Link>
              <Link
                to="/calculator"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                <CalcIcon className="w-4 h-4" /> Calculator
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}