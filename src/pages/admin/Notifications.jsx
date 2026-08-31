import React, { useEffect, useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatDateTime } from "@/lib/adminHelpers";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.AdminNotification.list("-created_date", 200);
      setItems(Array.isArray(res) ? res : res?.items || []);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const markRead = async (n) => {
    await base44.entities.AdminNotification.update(n.id, { is_read: true });
    setItems((arr) => arr.map((x) => (x.id === n.id ? { ...x, is_read: true } : x)));
  };
  const markAll = async () => {
    await Promise.all(items.filter((x) => !x.is_read).map((x) => base44.entities.AdminNotification.update(x.id, { is_read: true })));
    setItems((arr) => arr.map((x) => ({ ...x, is_read: true })));
  };

  const unread = items.filter((x) => !x.is_read).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{unread} unread of {items.length}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50"><CheckCheck className="w-4 h-4" /> Mark all read</button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? <div className="p-8 text-center text-sm text-slate-400">Loading…</div> : items.length === 0 ? (
          <div className="p-10 text-center">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm text-slate-400 mt-2">No notifications. New applications, enquiries and status changes will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-4 ${n.is_read ? "" : "bg-blue-50/50"}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${n.is_read ? "bg-slate-100 text-slate-400" : "bg-blue-100 text-blue-700"}`}><Bell className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{n.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">{n.type}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDateTime(n.created_date)}</p>
                </div>
                {!n.is_read && <button onClick={() => markRead(n)} className="p-1.5 rounded hover:bg-slate-100"><Check className="w-4 h-4 text-slate-500" /></button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}