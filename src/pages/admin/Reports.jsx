import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { statusColor } from "@/lib/adminHelpers";

const CAT_COLORS = ["#002D72", "#2E7D32", "#7c3aed", "#0891b2", "#d97706"];

export default function Reports() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30");

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.LoanApplication.list("-created_date", 1000);
        setApps(Array.isArray(res) ? res : res?.items || []);
      } finally { setLoading(false); }
    })();
  }, []);

  const days = Number(range);
  const since = Date.now() - days * 86400000;
  const inRange = apps.filter((a) => new Date(a.created_date).getTime() >= since);

  const byCat = ["Community Loans", "MSME Loans", "Consumer Loans", "Social Financing", "Farming Loans"].map((c) => ({ name: c.replace(" Loans", ""), value: inRange.filter((a) => a.loan_category === c).length }));
  const statuses = ["Submitted", "Under Review", "Approved", "Declined", "Disbursed"].map((s) => ({ name: s, value: inRange.filter((a) => a.status === s).length, color: statusColor(s) }));

  const exportData = () => {
    const headers = ["Date", "Name", "Category", "Product", "Amount", "Status", "Assigned"];
    const rows = inRange.map((a) => [a.created_date, a.full_name, a.loan_category, a.loan_product, a.amount_requested, a.status, a.assigned_to || ""]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `report-${range}d.csv`; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Application analytics and exportable data</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={range} onChange={(e) => setRange(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
          <button onClick={exportData} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50"><Download className="w-4 h-4" /> Export CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Total (range)" value={inRange.length} />
        <Stat label="Approved" value={inRange.filter((a) => a.status === "Approved").length} color="#16a34a" />
        <Stat label="Declined" value={inRange.filter((a) => a.status === "Declined").length} color="#dc2626" />
        <Stat label="Approval Rate" value={inRange.length ? Math.round((inRange.filter((a) => a.status === "Approved").length / inRange.length) * 100) + "%" : "—"} color="#002D72" />
      </div>

      {loading ? <div className="p-8 text-center text-sm text-slate-400">Loading…</div> : (
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-heading font-bold text-slate-900 text-sm mb-4">Applications by Category</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byCat} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50}>
                  {byCat.map((_, i) => <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-heading font-bold text-slate-900 text-sm mb-4">Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={statuses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis allowDecimals tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>{statuses.map((s, i) => <Cell key={i} fill={s.color} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400">Reports reflect live system data only. No financial figures are fabricated.</p>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="text-2xl font-heading font-bold" style={{ color: color || "#0f172a" }}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}