import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Info, Briefcase, Users, FileText } from "lucide-react";

// Mobile-only floating pill-shaped bottom navigation:
// Home, About, Loans, Business Support, Apply
const bottomItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Loans", path: "/loans", icon: Briefcase },
  { label: "Support", path: "/business-support", icon: Users },
  { label: "Apply", path: "/apply", icon: FileText, highlight: true },
];

export default function FloatingNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav
      className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
      style={{
        backgroundColor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 8px 32px rgba(0,45,114,0.18), 0 2px 8px rgba(0,0,0,0.06)",
        maxWidth: "calc(100vw - 1.5rem)",
      }}
      aria-label="Mobile navigation"
    >
      {bottomItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        if (item.highlight) {
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-full text-white shrink-0"
              style={{
                backgroundColor: "hsl(var(--brand-green))",
                boxShadow: "0 4px 14px rgba(46,125,50,0.4)",
              }}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold mt-0.5">{item.label}</span>
            </button>
          );
        }
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors"
            aria-label={item.label}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: active ? "hsl(var(--brand-blue))" : "hsl(var(--muted-foreground))" }}
            />
            <span
              className="text-[9px] font-medium mt-0.5"
              style={{ color: active ? "hsl(var(--brand-blue))" : "hsl(var(--muted-foreground))" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}