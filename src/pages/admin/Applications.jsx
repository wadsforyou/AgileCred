import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { APP_STATUSES, statusColor, formatDate, formatMoney, appCode } from "@/lib/adminHelpers";

const CATEGORIES = ["Community Loans", "MSME Loans", "Consumer Loans", "Social Financing", "Farming Loans"];

export default function Applications() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [fCategory, setFCategory] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.LoanApplication.list("-created_date", 1000);
        setApps(Array.isArray(res) ? res : res?.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = apps.filter((a) => {
    if (fCategory && a.loan_category !== fCategory) return false;
    if (fStatus && a.status !== fStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !(a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) ||
          a.phone?.includes(q) || a.loan_product?.toLowerCase().includes(q) || appCode(a).toLowerCase().includes(q))
      ) return false;
    }
    return true;
  });

  const exportCsv = () => {
    const headers = ["Code", "Name", "Email", "Phone", "Category", "Product", "Amount", "Status", "Assigned", "Date"];
    const rows = filtered.map((a) => [appCode(a), a.full_name, a.email, a.phone, a.loan_category, a.loan_product, a.amount_requested, a.status, a.assigned_to || "", formatDate(a.created_date)]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = `applications-${Date.now()}.csv`;
    link.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Loan Applications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} of {apps.length} applications</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone, code…"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button onClick={() => setShowFilters((v) => !v)} className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium ${showFilters ? "bg-blue-50 border-blue-300 text-blue-700" : "border-slate-200 hover:bg-slate-50"}`}>
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
        {showFilters && (
          <div className="mt-3 grid sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <select value={fCategory} onChange={(e) => setFCategory(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
              <option value="">All Statuses</option>
              {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading applications…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No applications match your filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Code</th>
                  <th className="text-left px-4 py-3 font-semibold">Applicant</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Assigned</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`/admin/applications/${a.id}`)}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{appCode(a)}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{a.full_name}</div>
                      <div className="text-xs text-slate-500">{a.email}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-600">{a.loan_category}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{formatMoney(a.amount_requested)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: statusColor(a.status) + "1a", color: statusColor(a.status) }}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{a.assigned_to || "—"}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">{formatDate(a.created_date)}</td>
                    <td className="px-4 py-3 text-right">
                      <ArrowRight className="w-4 h-4 text-slate-400 inline" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}