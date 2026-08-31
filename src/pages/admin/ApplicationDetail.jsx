import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Plus, Clock, UserCircle, FileText, ExternalLink, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { APP_STATUSES, statusColor, formatDate, formatDateTime, formatMoney, appCode, logActivity } from "@/lib/adminHelpers";

export default function ApplicationDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [saving, setSaving] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const a = await base44.entities.LoanApplication.get(id);
        setApp(a);
        setStatus(a.status);
        setAssigned(a.assigned_to || "");
        const n = await base44.entities.ApplicationNote.filter({ application_id: id });
        setNotes(Array.isArray(n) ? n : n?.items || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const saveStatus = async () => {
    setSaving(true);
    const prev = app.status;
    try {
      await base44.entities.LoanApplication.update(id, { status, assigned_to: assigned || "" });
      setApp({ ...app, status, assigned_to: assigned || "" });
      if (prev !== status) {
        await logActivity("Application status updated", `${appCode(app)} (${app.full_name}) changed from "${prev}" to "${status}"`, { entity_type: "LoanApplication", record_id: id, previous_value: prev, new_value: status });
      }
      if ((app.assigned_to || "") !== assigned) {
        await logActivity("Application assigned", `${appCode(app)} assigned to "${assigned || "Unassigned"}"`, { entity_type: "LoanApplication", record_id: id, previous_value: app.assigned_to || "", new_value: assigned });
      }
    } finally {
      setSaving(false);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    setAddingNote(true);
    try {
      const me = await base44.auth.me().catch(() => null);
      const created = await base44.entities.ApplicationNote.create({
        application_id: id,
        note: newNote.trim(),
        author: me?.full_name || me?.email || "Admin",
      });
      setNotes([created, ...notes]);
      setNewNote("");
      await logActivity("Note added", `Internal note added to ${appCode(app)}`, { entity_type: "LoanApplication", record_id: id });
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) return <div className="p-8 text-sm text-slate-400">Loading application…</div>;
  if (!app) return <div className="p-8 text-center text-slate-500">Application not found. <Link to="/admin/applications" className="text-blue-600">Back to applications</Link></div>;

  const Field = ({ label, value }) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className="text-sm text-slate-800 break-words">{value || "—"}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <Link to="/admin/applications" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
        <ArrowLeft className="w-4 h-4" /> Back to applications
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-slate-900">{app.full_name}</h1>
            <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 text-slate-500">{appCode(app)}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">Submitted {formatDate(app.created_date)} · {app.loan_category}</p>
        </div>
        <span className="text-sm px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: statusColor(app.status) + "1a", color: statusColor(app.status) }}>{app.status}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-5">
          <Card title="Applicant">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" value={app.full_name} />
              <Field label="ID / Passport" value={app.national_id} />
              <Field label="Phone" value={app.phone} />
              <Field label="Email" value={app.email} />
              <Field label="Residential Address" value={app.residential_address} />
              <Field label="City" value={app.city} />
              <Field label="Country" value={app.country} />
            </div>
          </Card>

          <Card title="Employment / Business">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Employment Status" value={app.employment_status} />
              <Field label="Employer / Business" value={app.employer_or_business_name} />
              <Field label="Monthly Income (USD)" value={formatMoney(app.monthly_income)} />
              <Field label="Business Type" value={app.business_type} />
            </div>
          </Card>

          <Card title="Loan Request">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Loan Category" value={app.loan_category} />
              <Field label="Loan Product" value={app.loan_product} />
              <Field label="Amount Requested" value={formatMoney(app.amount_requested)} />
              <Field label="Preferred Contact" value={app.preferred_contact_method} />
              <div className="sm:col-span-2">
                <Field label="Purpose" value={app.purpose} />
              </div>
            </div>
          </Card>

          <Card title={`Documents (${(app.documents || []).length})`} icon={FileText}>
            {(app.documents || []).length === 0 ? (
              <p className="text-sm text-slate-400">No documents uploaded.</p>
            ) : (
              <div className="space-y-2">
                {(app.documents || []).map((d, i) => (
                  <a key={i} href={d} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-700 truncate">{d.split("/").pop() || "Document"}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            )}
          </Card>

          <Card title="Application History / Notes">
            <div className="flex gap-2 mb-3">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an internal note (not visible to applicant)…"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={addNote} disabled={addingNote || !newNote.trim()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-sm text-slate-400">No notes yet.</p>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm text-slate-700">{n.note}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <UserCircle className="w-3.5 h-3.5" /> {n.author || "Admin"} · <Clock className="w-3.5 h-3.5" /> {formatDateTime(n.created_date)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right: actions */}
        <div className="space-y-5">
          <Card title="Update Status & Assignment">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  {APP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Assigned To</label>
                <input value={assigned} onChange={(e) => setAssigned(e.target.value)} placeholder="Loan officer name…" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              </div>
              <button onClick={saveStatus} disabled={saving} className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: "hsl(var(--brand-green))" }}>
                {saving ? "Saving…" : <><Save className="w-4 h-4" /> Save Changes</>}
              </button>
            </div>
          </Card>

          <Card title="Quick Actions">
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-600" /> Mark documents verified</p>
              <p className="flex items-center gap-2 text-slate-600"><Clock className="w-4 h-4 text-blue-600" /> All actions are recorded in the audit log.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="font-heading font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">{Icon && <Icon className="w-4 h-4 text-slate-400" />} {title}</h3>
      {children}
    </div>
  );
}