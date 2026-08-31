import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Compass, Zap, Lightbulb, ShieldCheck, Crosshair, Smile } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { ABOUT_BANNER } from "@/data/loanCategories";

const values = [
  { title: "Agility", description: "Our processes are seamless and fast.", icon: Zap },
  { title: "Innovation", description: "We always seek new ways of solving our customers' problems.", icon: Lightbulb },
  { title: "Integrity", description: "We are committed to delivering the best results to all our stakeholders.", icon: ShieldCheck },
  { title: "Disciplined Execution", description: "Closing commitments is core to our business.", icon: Crosshair },
  { title: "Inclusive & Responsible", description: "We engage in responsible business in pursuit of financial inclusion.", icon: Smile },
  { title: "Customer Centric", description: "We seek to offer value-adding processes for great customer experience.", icon: Target },
];

const team = [
  {
    name: "Raymond Mutandi",
    role: "Chief Executive Officer",
    bio: "Raymond Mutandi leads AgileCred as Chief Executive Officer, bringing extensive experience in microfinance and financial inclusion to guide the institution's strategic direction and commitment to serving Zimbabwe's underserved communities.",
  },
  {
    name: "Phillip Makanhiwa",
    role: "Business Development Director",
    bio: "Phillip Makanhiwa serves as Business Development Director, responsible for driving AgileCred's growth and expanding access to financial solutions for individuals, MSMEs and communities across Zimbabwe.",
  },
  {
    name: "Rodwell Nyanyirai",
    role: "Chief Operating Officer",
    bio: "Rodwell Nyanyirai is Chief Operating Officer, overseeing AgileCred's operations to ensure agile, innovative and customer-centric service delivery across all of the institution's financing and support activities.",
  },
];

export default function About() {
  return (
    <div>
      <PageBanner
        pageKey="about"
        title="About AgileCred"
        subtitle="A licensed credit-only Microfinance Institution fostering financial, social and economic inclusion in Zimbabwe."
        image={ABOUT_BANNER}
        eyebrow="About Us"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* Introduction */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Who We Are</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              AgileCred is a duly Licensed Credit-Only Microfinance Institution (MFI) which focuses mainly on fostering financial, social, and economic inclusion within the informal and formal sectors of Zimbabwe.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We are committed to serving underserved individuals, marginalized communities, groups, MSMEs, and those seeking productive and bridging finance, as well as personal and consumer facilities.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Underserved individuals",
                "Marginalized communities",
                "Groups and cooperatives",
                "Micro, Small & Medium Enterprises",
                "Productive lending",
                "Bridging finance",
                "Personal & consumer facilities",
                "Financial inclusion",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border bg-white p-4 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--brand-green))" }} />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="h-full rounded-2xl p-8 md:p-10" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
              <Compass className="w-10 h-10 mb-4" style={{ color: "hsl(123 46% 65%)" }} />
              <h3 className="text-xl font-semibold uppercase tracking-wider text-white/70 mb-3">Our Vision</h3>
              <p className="text-2xl font-heading font-semibold text-white leading-snug">
                To become the most preferred innovative and agile Microfinance business in Zimbabwe and Southern Africa.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-white p-8 md:p-10">
              <Target className="w-10 h-10 mb-4" style={{ color: "hsl(var(--brand-green))" }} />
              <h3 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mb-3">Our Mission</h3>
              <p className="text-lg text-foreground leading-relaxed">
                To be a leading development-oriented Microfinance Institution providing agile, innovative and customer centric service, entrepreneurial support while bridging financial inclusion gap through delivering fair value to our employees, partners and stakeholders.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Values */}
        <section>
          <SectionHeading eyebrow="Our Values" title="What Drives Us Forward" accent="purple" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "hsl(var(--brand-purple-light))", color: "hsl(var(--brand-purple))" }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section>
          <SectionHeading eyebrow="Leadership" title="Our Management Team" description="Experienced leadership committed to AgileCred's mission of financial inclusion." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-white overflow-hidden p-6 text-center hover:shadow-md transition-shadow">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-heading font-bold text-white"
                    style={{ backgroundColor: "hsl(var(--brand-blue))" }}
                  >
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg">{member.name}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: "hsl(var(--brand-green))" }}>{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-left">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center mt-6 text-xs text-muted-foreground italic">
            Professional profile photographs will replace these placeholders as they become available.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base transition-all hover:shadow-xl" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
            Get in Touch <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}