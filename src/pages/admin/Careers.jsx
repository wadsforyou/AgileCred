import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Eye, Power } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { logActivity, formatDate } from "@/lib/adminHelpers";

const empty = { title: "", department: "", location: "Harare", job_type: "Full-time", description: "", requirements: "", status: "Open", is_published: true };

export default function Careers() {
  const [tab, setTab] = useState("vacancies");
  const [vacancies, setVacancies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [viewJob, setViewJob] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [v, j] = await Promise.all([
        base44.entities.Vacancy.list("-created_date", 200).catch(() => []),
        base44.entities.JobApplication.list("-created_date", 200).catch(() => []),
      ]);
      setVacancies(Array.isArray(v) ? v : v?.items || []);
      setJobs(Array.isArray(j) ? j : j?.items || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.title) return;
    if (editing.id) {
      await base44.entities.Vacancy.update(editing.id, editing);
      logActivity("Vacancy updated", `Vacancy "${editing.title}" updated`, { entity_type: "Vacancy", record_id: editing.id });
    } else {
      const c = await base44.entities.Vacancy.create(editing);
      logActivity("Vacancy created", `Vacancy "${editing.title}" created`, { entity_type: "Vacancy", record_id: c.id });
    }
    setEditing(null);
    load();
  };

  const togglePublish = async (v) => {
    await base44.entities.Vacancy.update(v.id, { is_published: !v.is_published });
    logActivity("Vacancy updated", `Vacancy "${v.title}" ${!v.is_published ? "published" : "unpublished"}`, { entity_type: "Vacancy", record_id: v.id });
    load();
  };

  const remove = async (v) => {
    if (!confirm(`Delete vacancy "${v.title}"?`)) return;
    await base44.entities.Vacancy.delete(v.id);
    logActivity("Vacancy deleted", `Vacancy "${v.title}" deleted`, { entity_type: "Vacancy", record_id: v.id });
    load();
  };

  const setJobStatus = async (j, status) => {
    await base44.entities.JobApplication.update(j.id, { status });
    setJobs((arr) => arr.map((x) => (x.id === j.id ? { ...x, status } : x)));
    setViewJob((s) => (s && s.id === j.id ? { ...s, status } : s));
    logActivity("Job application updated", `Application status set to "${status}"`, { entity_type: "JobApplication", record_id: j.id, new_value: status });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Careers</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage vacancies and job applications</p>
        </div>
        {tab === "vacancies" && (
          <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
            <Plus className="w-4 h-4" /> Add Vacancy
          </button>
        )}
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button onClick={() => setTab("vacancies")} className={`px-4 py-1.5 rounded-md text-sm font-medium ${tab === "vacancies" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}>Vacancies ({vacancies.length})</button>
        <button onClick={() => setTab("applications")} className={`px-4 py-1.5 rounded-md text-sm font-medium ${tab === "applications" ? "bg-white shadow text-slate-900" : "text-slate-500"}`}>Applications ({jobs.length})</button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
      ) : tab === "vacancies" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vacancies.length === 0 ? (
            <div className="col-span-full p-10 text-center text-sm text-slate-400 bg-white rounded-xl border border-slate-200">No vacancies yet.</div>
          ) : vacancies.map((v) => (
            <div key={v.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-bold text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{v.department} · {v.location}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.is_published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{v.is_published ? "Published" : "Hidden"}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">{v.job_type} · {v.status}</p>
              {v.closing_date && <p className="text-xs text-slate-400 mt-1">Closes {formatDate(v.closing_date)}</p>}
              <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
                <button onClick={() => togglePublish(v)} className="p-1.5 rounded hover:bg-slate-100" title="Toggle publish"><Power className="w-4 h-4 text-slate-500" /></button>
                <button onClick={() => setEditing(v)} className="p-1.5 rounded hover:bg-slate-100" title="Edit"><Pencil className="w-4 h-4 text-blue-600" /></button>
                <button onClick={() => remove(v)} className="p-1.5 rounded hover:bg-slate-100" title="Delete"><Trash2 className="w-4 h-4 text-rose-600" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-400">No job applications yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Applicant</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Area</th>
                    <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Position</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800">{j.full_name}</div>
                        <div className="text-xs text-slate-500">{j.email}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-slate-600">{j.area_of_interest}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{j.position_of_interest}</td>
                      <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{j.status}</span></td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => setViewJob(j)} className="p-1.5 rounded hover:bg-slate-100"><Eye className="w-4 h-4 text-slate-500" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900">{editing.id ? "Edit Vacancy" : "New Vacancy"}</h3>
              <button onClick={() => setEditing(null)} className="p-1.5 rounded hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="p-5 space-y-3">
              <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Job title" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })} placeholder="Department" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                <input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} placeholder="Location" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                <select value={editing.job_type} onChange={(e) => setEditing({ ...editing, job_type: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                </select>
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  <option>Open</option><option>Closed</option>
                </select>
              </div>
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={4} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <textarea value={editing.requirements} onChange={(e) => setEditing({ ...editing, requirements: e.target.value })} placeholder="Requirements (comma separated or list)" rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <input type="date" value={editing.closing_date ? editing.closing_date.split("T")[0] : ""} onChange={(e) => setEditing({ ...editing, closing_date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} /> Published
              </label>
            </div>
            <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:bg-slate-50">Cancel</button>
              <button onClick={save} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-green))" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {viewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setViewJob(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">{viewJob.full_name}</h3>
                <p className="text-xs text-slate-500">{viewJob.email} · {viewJob.phone}</p>
              </div>
              <button onClick={() => setViewJob(null)} className="p-1.5 rounded hover:bg-slate-100 text-slate-500">✕</button>
            </div>
            <div className="text-sm text-slate-700 space-y-1 border-y border-slate-100 py-3">
              <p><span className="text-slate-400">Area:</span> {viewJob.area_of_interest}</p>
              <p><span className="text-slate-400">Position:</span> {viewJob.position_of_interest || "—"}</p>
              {viewJob.resume_url && <p><a href={viewJob.resume_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Resume / CV</a></p>}
            </div>
            {viewJob.cover_letter && <p className="text-sm text-slate-700 mt-3 whitespace-pre-wrap">{viewJob.cover_letter}</p>}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-500 mb-1 block">Status</label>
              <select value={viewJob.status} onChange={(e) => setJobStatus(viewJob, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                {["Received", "Reviewing", "Shortlisted", "Rejected", "Hired"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}