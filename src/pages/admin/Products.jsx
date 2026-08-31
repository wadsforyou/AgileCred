import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Power, Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { logActivity, formatMoney } from "@/lib/adminHelpers";

const CATEGORIES = ["Community Loans", "MSME Loans", "Consumer Loans", "Social Financing", "Farming Loans"];
const FREQUENCIES = ["Monthly", "Bi-Weekly", "Weekly"];

const empty = { name: "", category: "Community Loans", description: "", min_amount: 100, max_amount: 10000, min_period_months: 3, max_period_months: 24, default_interest_rate: 12, repayment_frequencies: ["Monthly"], is_active: true };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.LoanProduct.list("-created_date", 200);
      setProducts(Array.isArray(res) ? res : res?.items || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const filtered = products.filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase()));

  const toggleActive = async (p) => {
    await base44.entities.LoanProduct.update(p.id, { is_active: !p.is_active });
    await logActivity("Product updated", `Product "${p.name}" ${!p.is_active ? "activated" : "deactivated"}`, { entity_type: "LoanProduct", record_id: p.id, previous_value: String(p.is_active), new_value: String(!p.is_active) });
    load();
  };

  const remove = async (p) => {
    if (!confirm(`Delete product "${p.name}"?`)) return;
    await base44.entities.LoanProduct.delete(p.id);
    await logActivity("Product deleted", `Product "${p.name}" deleted`, { entity_type: "LoanProduct", record_id: p.id });
    load();
  };

  const save = async () => {
    if (!editing.name) return;
    if (editing.id) {
      await base44.entities.LoanProduct.update(editing.id, editing);
      await logActivity("Product updated", `Product "${editing.name}" updated`, { entity_type: "LoanProduct", record_id: editing.id });
    } else {
      const created = await base44.entities.LoanProduct.create(editing);
      await logActivity("Product created", `Product "${editing.name}" created`, { entity_type: "LoanProduct", record_id: created.id });
    }
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Loan Products</h1>
          <p className="text-sm text-slate-500 mt-0.5">{products.length} products configured</p>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No products yet. Click "Add Product" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Amount Range</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Period</th>
                  <th className="text-left px-4 py-3 font-semibold">Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{p.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">{p.description}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-600">{p.category}</td>
                    <td className="px-4 py-3 text-slate-600">{formatMoney(p.min_amount)} – {formatMoney(p.max_amount)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{p.min_period_months}–{p.max_period_months} mo</td>
                    <td className="px-4 py-3 text-slate-600">{p.default_interest_rate}%</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{p.is_active ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => toggleActive(p)} className="p-1.5 rounded hover:bg-slate-100" title="Toggle active"><Power className="w-4 h-4 text-slate-500" /></button>
                        <button onClick={() => setEditing(p)} className="p-1.5 rounded hover:bg-slate-100" title="Edit"><Pencil className="w-4 h-4 text-blue-600" /></button>
                        <button onClick={() => remove(p)} className="p-1.5 rounded hover:bg-slate-100" title="Delete"><Trash2 className="w-4 h-4 text-rose-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900">{editing.id ? "Edit Product" : "New Product"}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-5 space-y-3">
              <Inp label="Name" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Category</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Inp label="Min Amount (USD)" type="number" value={editing.min_amount} onChange={(v) => setEditing({ ...editing, min_amount: Number(v) })} />
                <Inp label="Max Amount (USD)" type="number" value={editing.max_amount} onChange={(v) => setEditing({ ...editing, max_amount: Number(v) })} />
                <Inp label="Min Period (months)" type="number" value={editing.min_period_months} onChange={(v) => setEditing({ ...editing, min_period_months: Number(v) })} />
                <Inp label="Max Period (months)" type="number" value={editing.max_period_months} onChange={(v) => setEditing({ ...editing, max_period_months: Number(v) })} />
                <Inp label="Default Rate (% p.a.)" type="number" value={editing.default_interest_rate} onChange={(v) => setEditing({ ...editing, default_interest_rate: Number(v) })} />
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Frequencies</label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {FREQUENCIES.map((f) => {
                      const sel = (editing.repayment_frequencies || []).includes(f);
                      return (
                        <button key={f} type="button" onClick={() => setEditing({ ...editing, repayment_frequencies: sel ? editing.repayment_frequencies.filter((x) => x !== f) : [...(editing.repayment_frequencies || []), f] })} className={`text-xs px-2.5 py-1 rounded-full border ${sel ? "bg-blue-600 text-white border-blue-600" : "border-slate-200 text-slate-600"}`}>{f}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700 pt-1">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded" /> Active (visible to public)
              </label>
            </div>
            <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-green))" }}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Inp({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-500 mb-1 block">{label}</label>
      <input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}