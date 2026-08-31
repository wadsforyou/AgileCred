import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatDate } from "@/lib/adminHelpers";

export default function Applicants() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.LoanApplication.list("-created_date", 1000);
        setApps(Array.isArray(res) ? res : res?.items || []);
      } finally { setLoading(false); }
    })();
  }, []);

  // group by email
  const map = {};
  apps.forEach((a) => {
    const key = (a.email || a.phone || a.id).toLowerCase();
    if (!map[key]) map[key] = { applicant: a, applications: [], count: 0, lastDate: a.created_date };
    map[key].applications.push(a);
    map[key].count += 1;
    if (new Date(a.created_date) > new Date(map[key].lastDate)) map[key].lastDate = a.created_date;
  });
  let list = Object.values(map);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((x) => x.applicant.full_name?.toLowerCase().includes(q) || x.applicant.email?.toLowerCase().includes(q) || x.applicant.phone?.includes(q));
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Applicants</h1>
        <p className="text-sm text-slate-500 mt-0.5">Internal CRM-style applicant records · {list.length} applicants</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applicants…" className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {loading ? <div className="p-8 text-center text-sm text-slate-400">Loading…</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.length === 0 ? (
            <div className="col-span-full p-10 text-center text-sm text-slate-400 bg-white rounded-xl border border-slate-200">No applicants yet.</div>
          ) : list.map(({ applicant: a, count, lastDate, applications }) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                  {(a.full_name || a.email || "A").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-slate-900 truncate">{a.full_name}</h3>
                  <p className="text-xs text-slate-500 truncate">{a.email}</p>
                  <p className="text-xs text-slate-500">{a.phone}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span className="px-2 py-0.5 rounded-full bg-slate-100">{count} application{count > 1 ? "s" : ""}</span>
                <span>Last: {formatDate(lastDate)}</span>
              </div>
              <Link to={`/admin/applications/${applications[0].id}`} className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50">
                View latest application <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}