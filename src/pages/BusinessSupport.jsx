import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ClipboardList, BarChart3, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { BUSINESS_SUPPORT_IMAGE } from "@/data/loanCategories";

const services = [
  {
    title: "Financial Literacy Training",
    description: "Practical training programs designed to build financial knowledge and money management skills for entrepreneurs and individuals.",
    icon: GraduationCap,
  },
  {
    title: "Strategy & Business Plan Development Support",
    description: "Support to help you develop clear business strategies and well-structured business plans that guide sustainable growth.",
    icon: BarChart3,
  },
  {
    title: "Business Management Support",
    description: "Ongoing guidance and mentorship to help MSMEs strengthen their operations, improve efficiency and navigate challenges.",
    icon: ClipboardList,
  },
  {
    title: "MSME Registration",
    description: "Assistance with the formal registration of micro, small and medium enterprises to unlock new opportunities and credibility.",
    icon: FileCheck,
  },
];

export default function BusinessSupport() {
  return (
    <div>
      <PageBanner
        pageKey="business-support"
        title="Business Development Support Services"
        subtitle="AgileCred supports MSMEs beyond financing — with training, planning, management guidance and registration support to help businesses grow."
        image={BUSINESS_SUPPORT_IMAGE}
        eyebrow="Business Support"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* Introduction */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">More Than Just Financing</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              At AgileCred, we believe that access to financing is only part of the journey. For MSMEs to truly thrive, they need knowledge, strategy and the right support structures.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our Business Development Support Services are designed to complement our financing products, helping entrepreneurs and small business owners build stronger, more resilient enterprises.
            </p>
            <Link
              to="/apply"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: "hsl(var(--brand-blue))" }}
            >
              Strengthen Your Business <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={BUSINESS_SUPPORT_IMAGE} alt="Business development support" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </section>

        {/* Services */}
        <section>
          <SectionHeading eyebrow="Our Services" title="How We Support Your Business" accent="green" />
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-border bg-white p-6 md:p-7 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground text-lg">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: "hsl(var(--brand-blue-light))" }}>
          <SectionHeading eyebrow="The Difference" title="Why This Matters" accent="blue" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Build financial knowledge and confidence",
              "Develop clear, actionable business plans",
              "Improve day-to-day business operations",
              "Formalise your enterprise for growth",
            ].map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="flex flex-col items-start gap-3">
                  <CheckCircle2 className="w-7 h-7" style={{ color: "hsl(var(--brand-blue))" }} />
                  <p className="text-sm font-medium text-foreground leading-relaxed">{b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <ScrollReveal>
            <div className="rounded-3xl p-10 md:p-14" style={{ background: "linear-gradient(135deg, hsl(var(--brand-blue)), hsl(var(--brand-purple)))" }}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Strengthen Your Business</h2>
              <p className="mt-3 text-white/80 max-w-xl mx-auto">
                Ready to take your business to the next level? Combine our development support with financing tailored to your needs.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link to="/apply" className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:shadow-xl" style={{ backgroundColor: "hsl(var(--brand-green))" }}>
                  Apply for Financing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}