import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, FolderKanban, Calculator, Mail,
  Briefcase, MapPin, BarChart3, UserCog, Bell, History, Settings,
  FileStack, Menu, LogOut, ExternalLink, ChevronDown, LayoutTemplate,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";

const navSections = [
  {
    items: [
      { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true, badge: "AdminNotification" },
      { label: "Applications", path: "/admin/applications", icon: FileText },
      { label: "Applicants", path: "/admin/applicants", icon: Users },
      { label: "Documents", path: "/admin/documents", icon: FileStack },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Loan Products", path: "/admin/products", icon: FolderKanban },
      { label: "Calculator", path: "/admin/calculator", icon: Calculator },
      { label: "Edit Website Content", path: "/admin/website-content", icon: LayoutTemplate },
      { label: "Careers", path: "/admin/careers", icon: Briefcase },
      { label: "Locations", path: "/admin/locations", icon: MapPin },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Enquiries", path: "/admin/enquiries", icon: Mail },
      { label: "Reports", path: "/admin/reports", icon: BarChart3 },
      { label: "Staff", path: "/admin/staff", icon: UserCog },
      { label: "Notifications", path: "/admin/notifications", icon: Bell },
      { label: "Activity Log", path: "/admin/activity-log", icon: History },
      { label: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    setSidebarOpen(false);
    setUserMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    base44.entities.AdminNotification
      ? base44.entities.AdminNotification.filter({ is_read: false }).then((r) =>
          setUnread(Array.isArray(r) ? r.length : r?.items?.length || 0)
        ).catch(() => {})
      : setUnread(0);
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("agilecred_demo_mode");
    try { logout(false); } catch { /* demo mode may have no session */ }
    navigate("/admin/login");
    window.location.reload();
  };

  const NavLinkItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive ? "text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
      style={({ isActive }) => (isActive ? { backgroundColor: "hsl(var(--brand-blue))" } : {})}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.label === "Notifications" && unread > 0 && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">{unread}</span>
      )}
    </NavLink>
  );

  const SidebarContent = (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="opacity-90">
          <Logo size="sm" />
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Admin Dashboard</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">{section.title}</p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLinkItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-800 p-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> View Public Website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 z-40">{SidebarContent}</aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">{SidebarContent}</div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button className="lg:hidden p-2 -ml-2 text-slate-600" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">AgileCred Operations</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/notifications" className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600">
              <Bell className="w-5 h-5" />
              {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />}
            </Link>
            <div className="relative">
              <button onClick={() => setUserMenu((v) => !v)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                  {(user?.full_name || user?.email || "A").charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">{user?.full_name || "Admin"}</div>
                  <div className="text-[11px] text-slate-500 leading-tight">{user?.role || "admin"}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {userMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                  <Link to="/admin/staff" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Staff Management</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}