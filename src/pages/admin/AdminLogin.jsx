import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";

export const DEMO_FLAG = "agilecred_demo_mode";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    sessionStorage.setItem(DEMO_FLAG, "true");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, hsl(222 100% 22%) 0%, hsl(222 80% 18%) 60%, hsl(262 52% 30%) 100%)" }}>
      <div className="p-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to website
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-2">
            <div className="flex items-center justify-between mb-1">
              <Logo size="md" background />
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "hsl(var(--brand-purple-light))", color: "hsl(var(--brand-purple))" }}>
                <ShieldCheck className="w-3.5 h-3.5" /> Staff
              </span>
            </div>
            <h1 className="mt-6 text-2xl font-heading font-bold text-foreground">Admin Sign In</h1>
            <p className="text-sm text-muted-foreground mt-1">Secure access for AgileCred staff only.</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@agilecred.co.zw"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60 transition-all hover:shadow-lg"
              style={{ backgroundColor: "hsl(var(--brand-blue))" }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              {loading ? "Signing in…" : "Sign In to Dashboard"}
            </button>

            <div className="text-xs text-muted-foreground text-center pt-2">
              Authorized personnel only. All access is logged.
            </div>
          </form>

          <div className="px-8 pb-8 -mt-2">
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-muted-foreground">or</span></div>
            </div>
            <button
              type="button"
              onClick={handleDemo}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:shadow-md"
              style={{ borderColor: "hsl(var(--brand-purple))", color: "hsl(var(--brand-purple))", backgroundColor: "hsl(var(--brand-purple-light))" }}
            >
              <Sparkles className="w-4 h-4" />
              Explore Demo Mode
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Skip sign-in and preview the dashboard with sample data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}