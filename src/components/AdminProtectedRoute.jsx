import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Logo from "@/components/Logo";
import { ShieldAlert } from "lucide-react";
import { DEMO_FLAG } from "@/pages/admin/AdminLogin";

export default function AdminProtectedRoute() {
  const { isAuthenticated, isLoadingAuth, authChecked, user } = useAuth();
  const location = useLocation();
  const isDemo = sessionStorage.getItem(DEMO_FLAG) === "true";

  if (isLoadingAuth || !authChecked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && !isDemo) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isDemo && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-4">
            <Logo size="lg" background />
          </div>
          <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "hsl(var(--brand-purple-light))", color: "hsl(var(--brand-purple))" }}>
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="mt-5 text-2xl font-heading font-bold text-foreground">Access Restricted</h1>
          <p className="mt-2 text-muted-foreground">
            This area is restricted to authorised AgileCred administrators. Your account does not have admin access.
          </p>
          <a href="/" className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
            Return to website
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
}