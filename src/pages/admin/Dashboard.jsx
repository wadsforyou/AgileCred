import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { FileText, ClipboardCheck, Eye, CheckCircle2, XCircle, Mail, FolderKanban, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { statusColor, formatDate, appCode } from "@/lib/adminHelpers";

const CAT_COLORS = ["#002D72", "#2E7D32", "#7c3aed", "#0891b2", "#d97706"];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [a, e, p] = await Promise.all([
          base44.entities.LoanApplication.list("-created_date", 1000).catch(() => []),
          base44.entities.ContactEnquiry.filter({ status: "New" }).catch(() => []),
          base44.entities.LoanProduct.filter({ is_active: true }).catch(() => []),
        ]);
        setApps(Array.isArray(a) ? a : a?.items || []);
        setEnquiries(Array.isArray(e) ? e : e?.items || []);
        setProducts(Array.isArray(p) ? p : p?.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const count = (arr, fn) => arr.filter(fn).length;
  const kpis = [
    { label: "New Applications", value: count(apps, (x) => x.status === "Submitted"), icon: FileText, color: "#2563eb" },
    { label: "Under Review", value: count(apps, (x) => x.status === "Under Review"), icon: Eye, color: "#d97706" },
    { label: "Approved", value: count(apps, (x) => x.status === "Approved"), icon: CheckCircle2, color: "#16a34a" },
    { label: "Declined", value: count(apps, (x) => x.status === "Declined"), icon: XCircle, color: "#dc2626" },
    { label: "Disbursed", value: count(apps, (x) => x.status === "Disbursed"), icon: ClipboardCheck, color: "#0d9488" },
    { label: "New Enquiries", value: enquiries.length, icon: Mail, color: "#7c3aed" },
    { label: "Active Products", value: products.length, icon: FolderKanban, color: "#002D72" },
    { label: "Total Applications", value: apps.length, icon: Clock, color: "#475569" },
  ];

  // Applications over time (last 8 weeks)
  const now = new Date();
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = new Date(now); end.setDate(now.getDate() - i * 7);
    const start = new Date(end); start.setDate(end.getDate() - 7);
    const startMs = start.getTime();
    const endMs = end.getTime();
    return {
      label: end.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
      count: apps.filter((a) => {
        const t = new Date(a.created_date).getTime();
        return t >= startMs && t < endMs;
      }).length,
    };
  }).reverse();

  // by category
  const byCat = ["Community Loans", "MSME Loans", "Consumer Loans", "Social Financing", "Farming Loans"].map((c) => ({
    name: c.replace(" Loans", "").replace(" Financing", ""),
    value: apps.filter((a) => a.loan_category === c).length,
  }));

  // by status
  const byStatus = ["Submitted", "Under Review", "Documents Required", "Assessment", "Approved", "Declined", "Disbursed"].map((s) => ({
    name: s,
    value: apps.filter((a) => a.status === s).length,
    color: statusColor(s),
  }));

  // by location (city)
  const cityMap = {};
  apps.forEach((a) => { if (a.city) cityMap[a.city] = (cityMap[a.city] || 0) + 1; });
  const byCity = Object.entries(cityMap).map(([name, value]) => ({ name, value })).sort((a,b)=>b.value-a.value).slice(0, 8);

  const recent = [...apps].slice(0, 6);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">{formatDate(new Date())} · Operational snapshot</p>
        </div>
        <Link to="/admin/applications" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
          View Applications <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color + "1a", color: k.color }}>
                <k.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-heading font-bold text-slate-900">{k.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Applications Over Time (8 weeks)" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis allowDecimals tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="count" fill="#002D72" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Applications by Loan Category">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byCat} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                {byCat.map((_, i) => <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Application Status Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" allowDecimals tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {byStatus.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Applications by Location (City)">
          {byCity.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-sm text-slate-400">No city data recorded yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byCity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis allowDecimals tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Bar dataKey="value" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Recent applications */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-heading font-bold text-slate-900">Recent Applications</h3>
          <Link to="/admin/applications" className="text-sm font-medium text-blue-700 hover:underline">View all</Link>
        </div>
        {recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">No applications yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map((a) => (
              <Link key={a.id} to={`/admin/applications/${a.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{appCode(a)}</span>
                    <span className="text-sm font-semibold text-slate-800 truncate">{a.full_name}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.loan_category} · ${Number(a.amount_requested || 0).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: statusColor(a.status) + "1a", color: statusColor(a.status) }}>{a.status}</span>
                  <span className="text-xs text-slate-400 hidden sm:inline">{formatDate(a.created_date)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChartCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        <h3 className="font-heading font-bold text-slate-900 text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-72 bg-slate-100 rounded-xl animate-pulse" />)}
      </div>
    </div>
  );
}