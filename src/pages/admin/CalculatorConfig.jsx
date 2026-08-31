import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator as CalcIcon, Settings2, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function CalculatorConfig() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.LoanProduct.list("-created_date", 200);
        setProducts(Array.isArray(res) ? res : res?.items || []);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Calculator Configuration</h1>
        <p className="text-sm text-slate-500 mt-0.5">Control the public loan calculator parameters (backend-driven)</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-2">
        <Settings2 className="w-4 h-4 mt-0.5 shrink-0" />
        <p>The public calculator reads its rates, periods and frequencies from <strong>Loan Products</strong>. No financial assumptions are hard-coded in the frontend. Changes are logged in the Activity Log.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-heading font-bold text-slate-900 text-sm">Calculator Parameters by Product</h3>
          <Link to="/admin/products" className="text-sm font-medium text-blue-700 hover:underline inline-flex items-center gap-1">Manage products <ArrowRight className="w-4 h-4" /></Link>
        </div>
        {loading ? <div className="p-8 text-center text-sm text-slate-400">Loading…</div> : products.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No products configured. Set up loan products to enable the calculator.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold">Default Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">Amount Range</th>
                  <th className="text-left px-4 py-3 font-semibold">Period Range</th>
                  <th className="text-left px-4 py-3 font-semibold">Frequencies</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">{p.name}</td>
                    <td className="px-4 py-3 text-slate-600">{p.default_interest_rate}% p.a.</td>
                    <td className="px-4 py-3 text-slate-600">${Number(p.min_amount).toLocaleString()} – ${Number(p.max_amount).toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{p.min_period_months}–{p.max_period_months} months</td>
                    <td className="px-4 py-3 text-slate-600">{(p.repayment_frequencies || []).join(", ")}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{p.is_active ? "Live" : "Disabled"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Link to="/calculator" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"><CalcIcon className="w-4 h-4" /> Preview the public calculator</Link>
    </div>
  );
}