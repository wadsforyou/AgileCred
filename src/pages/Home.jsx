import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Briefcase, Heart, Sparkles, Sprout, ShieldCheck, Handshake, Leaf, UserCog, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { useSiteContent } from "@/lib/useSiteContent";
import { loanCategories, HERO_IMAGE, LOGO_URL } from "@/data/loanCategories";

const iconMap = { Users, Briefcase, Heart, Sparkles, Sprout };

const trustPills = [
  { label: "Microfinance", icon: ShieldCheck },
  { label: "Financial Inclusion", icon: Handshake },
  { label: "MSME Finance", icon: Briefcase },
  { label: "Community Finance", icon: Users },
  { label: "Agricultural Finance", icon: Leaf },
  { label: "Consumer Finance", icon: Heart },
];

const howItWorks = [
  { step: "01", title: "Choose Your Solution", description: "Find the financing option that matches your needs from our range of loan products." },
  { step: "02", title: "Apply", description: "Complete the application and provide the required information and supporting documents." },
  { step: "03", title: "Assessment", description: "AgileCred reviews your application and supporting documentation carefully." },
  { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
];

const individualRequirements = [
  "National ID / Passport",
  "Proof of residence",
  "Current payslip",
  "Confirmation of employment where applicable",
];

const businessRequirements = [
  "Certificate of Incorporation",
  "CR6",
  "CR14",
  "Other relevant business documentation",
];

export default function Home() {
  const override = useSiteContent("home");
  const heroHeading = override?.heading || "Agile Finance for People, Businesses and Communities";
  const heroSubheading = override?.subheading || "AgileCred provides flexible and innovative financial solutions to individuals, groups, farmers and Micro, Small and Medium Enterprises across Zimbabwe.";
  const heroImage = override?.image_url || HERO_IMAGE;

  return (
    <div>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "clamp(560px, 88vh, 760px)" }}>
        <div className="absolute inset-0">
          <img src={heroImage} alt="Zimbabwean entrepreneur" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, hsl(222 100% 22% / 0.92) 0%, hsl(222 100% 22% / 0.72) 45%, hsl(222 100% 22% / 0.35) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium text-white" style={{ backgroundColor: "hsl(var(--brand-green) / 0.25)", border: "1px solid hsl(var(--brand-green) / 0.4)" }}>
              <ShieldCheck className="w-4 h-4" style={{ color: "hsl(123 46% 70%)" }} />
              Licensed Credit-Only Microfinance Institution
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
              {heroHeading}
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl">
              {heroSubheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/apply" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base transition-all hover:shadow-xl" style={{ backgroundColor: "hsl(var(--brand-green))" }}>
                Apply for a Loan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/loans" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base border-2 border-white/30 hover:bg-white/10 transition-colors">
                Explore Our Loans
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, white, transparent)" }} />
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Who We Are"
          title="Financial Solutions Built Around Your Needs"
          description="AgileCred is a duly Licensed Credit-Only Microfinance Institution (MFI) focused on fostering financial, social and economic inclusion within the informal and formal sectors of Zimbabwe."
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {trustPills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <ScrollReveal key={pill.label} delay={i * 0.05}>
                <div className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                  <Icon className="w-5 h-5" style={{ color: "hsl(var(--brand-blue))" }} />
                  <span className="text-sm font-semibold text-foreground">{pill.label}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Loan Categories */}
      <section className="bg-[hsl(var(--muted))] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Financial Solutions"
            title="Financing for Every Stage of Growth"
            description="From community businesses to commercial farms, explore the financing solutions designed for Zimbabwe's diverse economy."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Briefcase;
              const accent = cat.accent === "green" ? "hsl(var(--brand-green))" : cat.accent === "purple" ? "hsl(var(--brand-purple))" : "hsl(var(--brand-blue))";
              return (
                <ScrollReveal key={cat.slug} delay={i * 0.06}>
                  <Link to={`/loans/${cat.slug}`} className="group block h-full rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img src={cat.heroImage} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                      <div className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur" style={{ color: accent }}>
                        <Icon className="w-5.5 h-5.5" style={{ width: 22, height: 22 }} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{cat.shortDescription}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                        Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
            {/* Business support card */}
            <ScrollReveal delay={loanCategories.length * 0.06}>
              <Link to="/business-support" className="group block h-full rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 flex flex-col h-full" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/15">
                    <UserCog className="w-5.5 h-5.5 text-white" style={{ width: 22, height: 22 }} />
                  </div>
                  <h3 className="mt-4 text-lg font-heading font-bold text-white">Business Development Support</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Beyond financing, AgileCred supports MSMEs with training, business planning and registration support.
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                    Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <SectionHeading eyebrow="How It Works" title="A Simple Path to Financing" accent="green" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl font-heading font-bold mb-3" style={{ color: "hsl(var(--brand-blue))" }}>{s.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px" style={{ backgroundColor: "hsl(var(--border))" }} />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-[hsl(var(--muted))] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading eyebrow="Requirements" title="What You May Need to Apply" description="Typical documentation required during the application process. Requirements may vary by loan type." accent="green" />
          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="h-full rounded-2xl border border-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(var(--brand-blue-light))", color: "hsl(var(--brand-blue))" }}>
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground">Individuals</h3>
                </div>
                <ul className="space-y-3">
                  {individualRequirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <FileSearch className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--brand-blue))" }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground">Businesses</h3>
                </div>
                <ul className="space-y-3">
                  {businessRequirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <FileSearch className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--brand-green))" }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <p className="text-center mt-6 text-sm italic text-muted-foreground max-w-2xl mx-auto">
            Requirements may vary depending on the type of financing requested.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <ScrollReveal>
          <div className="text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[0,1,2,3,4].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--brand-green))" }} />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-heading font-semibold text-foreground leading-snug">
              "AgileCred's agile approach to financing gave my business the support it needed to grow. Their team understood our needs and provided a solution that worked."
            </blockquote>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                EM
              </div>
              <p className="mt-3 font-semibold text-foreground">Edmore Mutema</p>
              <p className="text-sm text-muted-foreground">AgileCred Client</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 justify-center">
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--brand-green))" }} />
              Our Impact
              <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--brand-green))" }} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Supporting Growth Across Zimbabwe
            </h2>
            <p className="mt-5 text-lg text-white/75 leading-relaxed">
              AgileCred supports entrepreneurs, vendors, farmers, women-led businesses, MSMEs, communities and individuals across the country — building pathways to financial inclusion and economic empowerment.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Entrepreneurs & Vendors", icon: Users },
              { label: "Farmers & Agriculture", icon: Sprout },
              { label: "Women-Led Businesses", icon: Heart },
              { label: "MSMEs & Enterprises", icon: Briefcase },
              { label: "Communities & Groups", icon: Handshake },
              { label: "Individuals & Families", icon: Heart },
              { label: "Sustainable Projects", icon: Leaf },
              { label: "Financial Inclusion", icon: ShieldCheck },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <div className="rounded-xl p-5 border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
                    <Icon className="w-7 h-7 mb-3" style={{ color: "hsl(123 46% 65%)" }} />
                    <p className="text-sm font-medium text-white/90">{item.label}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <ScrollReveal>
          <div className="rounded-3xl p-10 md:p-16 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--brand-blue)), hsl(262 52% 47%))" }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight max-w-2xl mx-auto">
              Ready to Take the Next Step?
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Apply for financing online, use our loan calculator, or reach out to our team at any of our offices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/apply" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base transition-all hover:shadow-xl" style={{ backgroundColor: "hsl(var(--brand-green))" }}>
                Apply for a Loan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/calculator" className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base border-2 border-white/30 hover:bg-white/10 transition-colors">
                Use Loan Calculator
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}