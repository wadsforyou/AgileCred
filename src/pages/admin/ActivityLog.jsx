import React, { useEffect, useState } from "react";
import { History, User } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatDateTime } from "@/lib/adminHelpers";

export default function ActivityLog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.ActivityLog.list("-created_date", 500);
        setItems(Array.isArray(res) ? res : res?.items || []);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Activity / Audit Log</h1>
        <p className="text-sm text-slate-500 mt-0.5">Recorded administrative actions across the system</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No activity recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((l) => (
              <div key={l.id} className="flex items-start gap-3 p-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 text-slate-500">
                  <History className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{l.action}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{l.entity_type || "—"}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{l.description}</p>
                  {(l.previous_value || l.new_value) && (
                    <p className="text-xs text-slate-400 mt-1">
                      {l.previous_value ? `"${l.previous_value}"` : ""} {l.previous_value && l.new_value ? "→" : ""} {l.new_value ? `"${l.new_value}"` : ""}
                    </p>
                  )}
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <User className="w-3 h-3" /> {l.user_name || "System"} · {formatDateTime(l.created_date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}