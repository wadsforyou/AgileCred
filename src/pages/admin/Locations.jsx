import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Power, MapPin } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { logActivity } from "@/lib/adminHelpers";

const empty = { name: "", type: "Office", address: "", phone: "", email: "", city: "", lat: "", lng: "", is_active: true, map_visible: true };

export default function Locations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.BranchLocation.list("-created_date", 200).catch(() => []);
      setItems(Array.isArray(res) ? res : res?.items || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.name) return;
    const payload = { ...editing, lat: editing.lat ? Number(editing.lat) : undefined, lng: editing.lng ? Number(editing.lng) : undefined };
    if (editing.id) {
      await base44.entities.BranchLocation.update(editing.id, payload);
      logActivity("Location updated", `Location "${editing.name}" updated`, { entity_type: "BranchLocation", record_id: editing.id });
    } else {
      const c = await base44.entities.BranchLocation.create(payload);
      logActivity("Location created", `Location "${editing.name}" created`, { entity_type: "BranchLocation", record_id: c.id });
    }
    setEditing(null);
    load();
  };

  const toggle = async (l) => {
    await base44.entities.BranchLocation.update(l.id, { is_active: !l.is_active });
    logActivity("Location updated", `Location "${l.name}" ${!l.is_active ? "activated" : "deactivated"}`, { entity_type: "BranchLocation", record_id: l.id });
    load();
  };

  const remove = async (l) => {
    if (!confirm(`Delete location "${l.name}"?`)) return;
    await base44.entities.BranchLocation.delete(l.id);
    logActivity("Location deleted", `Location "${l.name}" deleted`, { entity_type: "BranchLocation", record_id: l.id });
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Branch & Locations</h1>
          <p className="text-sm text-slate-500 mt-0.5">Active, map-visible locations appear on the public interactive map.</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        Offices appear as official branch markers. Service Area entries appear as coverage circles. Mark a location <strong>map_visible</strong> to display it publicly.
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-400 bg-white rounded-xl border border-slate-200">No locations yet. Add your offices and service areas here.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${l.type === "Office" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 leading-tight">{l.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{l.type}{l.city ? ` · ${l.city}` : ""}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${l.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{l.is_active ? "Active" : "Inactive"}</span>
              </div>
              {l.address && <p className="text-xs text-slate-600 mt-2">{l.address}</p>}
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                {l.phone && <p>{l.phone}</p>}
                {l.email && <p className="truncate">{l.email}</p>}
                <p className="text-slate-400">{l.map_visible ? "Visible on public map" : "Hidden from public map"}</p>
              </div>
              <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
                <button onClick={() => toggle(l)} className="p-1.5 rounded hover:bg-slate-100"><Power className="w-4 h-4 text-slate-500" /></button>
                <button onClick={() => setEditing(l)} className="p-1.5 rounded hover:bg-slate-100"><Pencil className="w-4 h-4 text-blue-600" /></button>
                <button onClick={() => remove(l)} className="p-1.5 rounded hover:bg-slate-100"><Trash2 className="w-4 h-4 text-rose-600" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900">{editing.id ? "Edit Location" : "New Location"}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-5 space-y-3">
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Location name" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Type</label>
                <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  <option>Office</option><option>Service Area</option>
                </select>
              </div>
              <textarea value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} placeholder="Address" rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} placeholder="City" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                <input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} placeholder="Phone" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                <input value={editing.lat} onChange={(e) => setEditing({ ...editing, lat: e.target.value })} placeholder="Latitude" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                <input value={editing.lng} onChange={(e) => setEditing({ ...editing, lng: e.target.value })} placeholder="Longitude" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={editing.map_visible} onChange={(e) => setEditing({ ...editing, map_visible: e.target.checked })} /> Visible on public map</label>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-green))" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}