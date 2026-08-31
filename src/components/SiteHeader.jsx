import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone, Menu, X, Home, Info, Briefcase, Users, Calculator, Mail, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { loanCategories, CONTACT_INFO } from "@/data/loanCategories";

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Loans", path: "/loans", icon: Briefcase, hasDropdown: true },
  { label: "Business Support", path: "/business-support", icon: Users },
  { label: "Calculator", path: "/calculator", icon: Calculator },
  { label: "Contact", path: "/contact", icon: Mail },
];

const hamburgerMenuItems = [
  { label: "Calculator", path: "/calculator", icon: Calculator, desc: "Estimate your loan repayments" },
  { label: "Contact", path: "/contact", icon: Mail, desc: "Reach our offices and team" },
  { label: "Careers", path: "/careers", icon: Briefcase, desc: "Join the AgileCred team" },
];

const essentialLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Loans", path: "/loans", icon: Briefcase },
  { label: "Business Support", path: "/business-support", icon: Users },
  { label: "Loan Application", path: "/apply", icon: ArrowRight },
  { label: "Contact", path: "/contact", icon: Mail },
];

export default function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 500);
  };

  const ApplyButton = ({ className = "", compact = false }) => (
    <button
      onClick={() => navigate("/apply")}
      className={`flex items-center gap-1.5 rounded-full text-sm font-semibold text-white transition-all hover:shadow-lg ${className}`}
      style={{ backgroundColor: "hsl(var(--brand-green))" }}
    >
      Apply Now
      {!compact && <ArrowRight className="w-4 h-4" />}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Row 1: logo + apply (both mobile and desktop) */}
      <div className="bg-white/90 backdrop-blur-md border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Left: hamburger (mobile) + logo */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 -ml-2 text-foreground hover:opacity-70 transition-opacity"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" aria-label="AgileCred Home">
                <Logo size="md" />
              </Link>
            </div>

            {/* Right: apply (mobile, far right) */}
            <div className="md:hidden">
              <ApplyButton compact className="px-4 py-2" />
            </div>

            {/* Right: desktop phone + apply */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href={`tel:${CONTACT_INFO.generalPhones[0].replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" style={{ color: "hsl(var(--brand-green))" }} />
                {CONTACT_INFO.generalPhones[0]}
              </a>
              <ApplyButton className="px-5 py-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: full-width nav bar (desktop/tablet only) */}
      <div className="hidden md:block bg-white/95 backdrop-blur-md border-b border-border/60">
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-center h-12" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      active ? "text-white shadow-sm" : "text-foreground hover:text-primary hover:bg-secondary"
                    }`}
                    style={active ? { backgroundColor: "hsl(var(--brand-blue))" } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                      {/* Transparent bridge to prevent dropdown closing when moving mouse */}
                      <div className="absolute -top-1 left-0 right-0 h-4" />
                      <div
                        className="w-[560px] max-w-[90vw] rounded-2xl p-2 grid grid-cols-2 gap-1"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.98)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          border: "1px solid hsl(var(--border))",
                          boxShadow: "0 16px 48px rgba(0,45,114,0.18)",
                        }}
                      >
                        {loanCategories.map((cat) => {
                          const accentColor =
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
                            <button
                              key={cat.slug}
                              onClick={() => navigate(`/loans/${cat.slug}`)}
                              className="flex items-start gap-3 p-3 rounded-xl text-left hover:bg-secondary transition-colors"
                            >
                              <div
                                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: accentBg, color: accentColor }}
                              >
                                <Briefcase style={{ width: 18, height: 18 }} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-foreground">{cat.title}</div>
                                <div className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                                  {cat.shortDescription}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active ? "text-white shadow-sm" : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
                style={active ? { backgroundColor: "hsl(var(--brand-blue))" } : {}}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile hamburger drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-[82%] max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Logo size="sm" />
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CONTACT_INFO.generalPhones[0].replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "hsl(var(--brand-green))" }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground hover:opacity-70"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <p className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Essential Links
              </p>
              {essentialLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.path);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-secondary transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: active ? "hsl(var(--brand-blue))" : "hsl(var(--brand-blue-light))",
                        color: active ? "white" : "hsl(var(--brand-blue))",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  </button>
                );
              })}

              <p className="px-2 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                More
              </p>
              {hamburgerMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.path);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-secondary transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-4 border-t border-border">
              <ApplyButton className="w-full justify-center py-3" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}