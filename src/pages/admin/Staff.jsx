import React, { useEffect, useState } from "react";
import { Mail, Shield } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { formatDate, logActivity } from "@/lib/adminHelpers";

export default function Staff() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.User.list("-created_date", 200);
      setUsers(Array.isArray(res) ? res : res?.items || []);
    } catch (e) {
      setUsers([]);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const setRole = async (u, role) => {
    try {
      await base44.entities.User.update(u.id, { role });
      await logActivity("Staff role changed", `${u.full_name || u.email} role set to "${role}"`, { entity_type: "User", record_id: u.id, previous_value: u.role, new_value: role });
      load();
    } catch (e) {
      alert("Only admins can change staff roles.");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Staff Management</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage staff access and roles (advanced access)</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 flex items-start gap-2">
        <Shield className="w-4 h-4 mt-0.5 shrink-0" />
        <p>Add new staff via <strong>Settings → Invite Staff</strong> (email invite). Only Super Admins can change roles. Backend authorization enforces all access.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading…</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">No staff records available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Joined</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: u.role === "admin" ? "hsl(var(--brand-purple))" : "hsl(var(--brand-blue))" }}>
                          {(u.full_name || u.email || "U").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800">{u.full_name || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" />{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role || "user"}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-500 text-xs">{formatDate(u.created_date)}</td>
                    <td className="px-4 py-3 text-right">
                      <select value={u.role || "user"} onChange={(e) => setRole(u, e.target.value)} className="px-2 py-1 rounded border border-slate-200 text-xs">
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}