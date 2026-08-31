import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ variant = "default", label = "Back", to }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors";
  const styles =
    variant === "light"
      ? "text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 backdrop-blur"
      : "text-foreground hover:bg-secondary px-3 py-1.5 border border-border";

  return (
    <button onClick={handleBack} className={`${base} ${styles}`} aria-label="Go back">
      <ArrowLeft className="w-4 h-4" />
      {label}
    </button>
  );
}