import React, { useEffect, useState } from "react";
import { Search, Mail, Phone, UserCircle, Clock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { ENQUIRY_STATUSES, statusColor, formatDate, logActivity } from "@/lib/adminHelpers";

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.ContactEnquiry.list("-created_date", 500);
      setItems(Array.isArray(res) ? res : res?.items || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const filtered = items.filter((e) => {
    if (fStatus && e.status !== fStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!(e.full_name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q) || e.subject?.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const updateStatus = async (id, status) => {
    await base44.entities.ContactEnquiry.update(id, { status });
    logActivity("Enquiry updated", `Enquiry status set to "${status}"`, { entity_type: "ContactEnquiry", record_id: id, new_value: status });
    setItems((arr) => arr.map((e) => (e.id === id ? { ...e, status } : e)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Contact Enquiries</h1>
        <p className="text-sm text-slate-500 mt-0.5">{filtered.length} of {items.length} enquiries</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search enquiries…" className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
          <option value="">All Statuses</option>
          {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No enquiries yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((e) => (
              <div key={e.id} className="p-4 hover:bg-slate-50 cursor-pointer" onClick={() => setSelected(e)}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{e.full_name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: statusColor(e.status) + "1a", color: statusColor(e.status) }}>{e.status}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</span>
                      {e.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {e.phone}</span>}
                    </div>
                    {e.subject && <div className="text-sm text-slate-700 mt-1 font-medium">{e.subject}</div>}
                    <div className="text-sm text-slate-500 mt-1 line-clamp-2">{e.message}</div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{formatDate(e.created_date)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">{selected.subject || "Enquiry"}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatDate(selected.created_date)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="space-y-2 text-sm border-y border-slate-100 py-3">
              <div className="flex items-center gap-2 text-slate-700"><UserCircle className="w-4 h-4 text-slate-400" /> {selected.full_name}</div>
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-blue-700"><Mail className="w-4 h-4" /> {selected.email}</a>
              {selected.phone && <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-blue-700"><Phone className="w-4 h-4" /> {selected.phone}</a>}
            </div>
            <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{selected.message}</p>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Update Status</label>
              <div className="flex gap-2">
                <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}