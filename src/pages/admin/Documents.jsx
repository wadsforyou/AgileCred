import React, { useEffect, useState } from "react";
import { ExternalLink, FileText, FileStack } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { appCode, formatDate } from "@/lib/adminHelpers";

export default function Documents() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.entities.LoanApplication.list("-created_date", 1000);
        setApps(Array.isArray(res) ? res : res?.items || []);
      } finally { setLoading(false); }
    })();
  }, []);

  const withDocs = apps.filter((a) => (a.documents || []).length > 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Documents</h1>
        <p className="text-sm text-slate-500 mt-0.5">Submitted supporting documents across all applications</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        Document access is restricted to authorised administrators. Sensitive documents are not publicly accessible.
      </div>

      {loading ? <div className="p-8 text-center text-sm text-slate-400">Loading…</div> : withDocs.length === 0 ? (
        <div className="p-10 text-center bg-white rounded-xl border border-slate-200">
          <FileStack className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm text-slate-400 mt-2">No documents submitted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {withDocs.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <Link to={`/admin/applications/${a.id}`} className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{appCode(a)}</span>
                    <span className="font-semibold text-slate-800 truncate">{a.full_name}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.loan_category} · {formatDate(a.created_date)}</div>
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {(a.documents || []).map((d, i) => (
                  <a key={i} href={d} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-700 truncate">{d.split("/").pop() || "Document"}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}