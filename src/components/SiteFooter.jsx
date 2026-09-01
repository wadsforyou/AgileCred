import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, BadgeCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { CONTACT_INFO } from "@/data/loanCategories";

const NAVY = "#072448";
const GREEN = "#1A7336";

export default function SiteFooter() {
  return (
    <footer className="relative text-white" style={{ backgroundColor: NAVY }}>
      {/* Top green hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: GREEN }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        {/* Desktop / tablet: three columns */}
        <div className="hidden md:grid md:grid-cols-12 gap-10 items-start">
          {/* Left: logo + Licensed MFI badge */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div
              className="relative flex flex-col items-center justify-center px-8 py-7"
              style={{
                backgroundColor: "#0a2c54",
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 60%)",
                border: "1px dashed rgba(255,255,255,0.18)",
                transform: "rotate(0deg)",
                clipPath:
                  "polygon(8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%, 0 50%)",
              }}
            >
              <Logo size="lg" background />
              <div
                className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#ffffff", color: NAVY }}
              >
                <BadgeCheck className="w-3.5 h-3.5" style={{ color: GREEN }} />
                Licensed MFI
              </div>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-xs">
              Agile Finance for People, Businesses and Communities. A licensed credit-only Microfinance Institution in Zimbabwe.
            </p>
          </div>

          {/* Center: Essential Links + offices */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Essential Links
            </h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Loans", path: "/loans" },
                { label: "Business Support", path: "/business-support" },
                { label: "Loan Application", path: "/apply" },
                { label: "Contact", path: "/contact" },
              ].map((l, i, arr) => (
                <li key={l.path} className="flex items-center">
                  <Link to={l.path} className="text-white/80 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                  {i < arr.length - 1 && (
                    <span className="ml-4 h-3 w-px bg-white/25" />
                  )}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Our Offices
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <span className="rounded-full px-4 py-1.5 text-xs font-medium text-white/90" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                Harare Head Office
              </span>
              <span className="rounded-full px-4 py-1.5 text-xs font-medium text-white/90" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                Bulawayo Office
              </span>
              <Link
                to="/contact"
                className="rounded-full px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.5)" }}
              >
                View all locations →
              </Link>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <MapPin className="w-4 h-4 text-white" />
                </span>
                <span className="leading-snug pt-1">309 Adylinn Road, Westgate, Harare</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <Phone className="w-4 h-4 text-white" />
                </span>
                <a href={`tel:${CONTACT_INFO.generalPhones[2].replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.generalPhones[2]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <Mail className="w-4 h-4 text-white" />
                </span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden space-y-8">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex flex-col items-center justify-center px-8 py-6"
              style={{
                backgroundColor: "#0a2c54",
                border: "1px dashed rgba(255,255,255,0.18)",
                clipPath: "polygon(8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%, 0 50%)",
              }}
            >
              <Logo size="md" background />
              <div
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: "#ffffff", color: NAVY }}
              >
                <BadgeCheck className="w-3.5 h-3.5" style={{ color: GREEN }} />
                Licensed MFI
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Agile Finance for People, Businesses and Communities. A licensed credit-only Microfinance Institution in Zimbabwe.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Essential Links</h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/loans" className="text-white/80 hover:text-white transition-colors">Loans</Link></li>
              <li><Link to="/business-support" className="text-white/80 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/apply" className="text-white/80 hover:text-white transition-colors">Apply</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Our Offices</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full px-3 py-1.5 text-xs font-medium text-white/90" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                Harare Head Office
              </span>
              <span className="rounded-full px-3 py-1.5 text-xs font-medium text-white/90" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                Bulawayo Office
              </span>
              <Link to="/contact" className="rounded-full px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                View all →
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="pt-0.5">309 Adylinn Road, Westgate, Harare</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <Phone className="w-3.5 h-3.5 text-white" />
                </span>
                <a href={`tel:${CONTACT_INFO.generalPhones[2].replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {CONTACT_INFO.generalPhones[2]}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ backgroundColor: GREEN }}>
                  <Mail className="w-3.5 h-3.5 text-white" />
                </span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: divider + copyright */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">© 2026 AgileCred (Private) Limited. All Rights Reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/60">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}