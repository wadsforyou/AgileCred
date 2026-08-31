import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import OfficeMap from "@/components/OfficeMap";
import ContactForm from "@/components/ContactForm";
import { CONTACT_INFO, loanCategories, CONTACT_BANNER } from "@/data/loanCategories";

export default function Contact() {
  return (
    <div>
      <PageBanner
        pageKey="contact"
        title="Contact & Locations"
        subtitle="Visit us at our offices in Harare and Bulawayo, or reach out by phone or email. We're here to help with your financing needs."
        image={CONTACT_BANNER}
        eyebrow="Get in Touch"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* General contact */}
        <section className="grid md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-border bg-white p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}>
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-foreground">Call Us</h3>
              <div className="mt-3 space-y-1.5">
                {CONTACT_INFO.generalPhones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-sm hover:underline" style={{ color: "hsl(var(--brand-blue))" }}>
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-white p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "hsl(var(--brand-blue-light))", color: "hsl(var(--brand-blue))" }}>
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-foreground">Email Us</h3>
              <div className="mt-3 space-y-1.5">
                <a href={`mailto:${CONTACT_INFO.email}`} className="block text-sm hover:underline break-all" style={{ color: "hsl(var(--brand-blue))" }}>
                  {CONTACT_INFO.email}
                </a>
                <a href={`mailto:${CONTACT_INFO.emailBulawayo}`} className="block text-sm hover:underline break-all" style={{ color: "hsl(var(--brand-blue))" }}>
                  {CONTACT_INFO.emailBulawayo}
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <div className="h-full rounded-2xl border border-border bg-white p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "hsl(var(--brand-purple-light))", color: "hsl(var(--brand-purple))" }}>
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-foreground">Office Hours</h3>
              <p className="mt-3 text-sm text-muted-foreground">Monday – Friday</p>
              <p className="text-sm font-medium text-foreground">8:00 AM – 4:30 PM</p>
              <p className="mt-2 text-sm text-muted-foreground">Saturday – Sunday: Closed</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Offices */}
        <section>
          <SectionHeading eyebrow="Our Offices" title="Where to Find Us" />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {CONTACT_INFO.offices.map((office, i) => (
              <ScrollReveal key={office.name} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 md:p-7">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 shrink-0 mt-1" style={{ color: "hsl(var(--brand-blue))" }} />
                    <div>
                      <h3 className="font-heading font-bold text-foreground text-lg">{office.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{office.address}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    {office.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm hover:underline" style={{ color: "hsl(var(--brand-green))" }}>
                        <Phone className="w-4 h-4" />
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Map */}
        <section>
          <SectionHeading eyebrow="Find Us" title="Interactive Map" description="Official offices shown in blue, with service coverage areas shown in green across Zimbabwe." />
          <div className="mt-10">
            <ScrollReveal>
              <OfficeMap />
            </ScrollReveal>
          </div>
        </section>

        {/* Contact form */}
        <section className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div>
              <SectionHeading eyebrow="Enquiries" title="Send Us a Message" description="Have a question about a loan product, your application, or working with AgileCred? Send us a message and our team will respond." />
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(var(--brand-blue-light))", color: "hsl(var(--brand-blue))" }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Call our team</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.generalPhones.join(" · ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email our team</p>
                    <p className="text-sm text-muted-foreground">{CONTACT_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}