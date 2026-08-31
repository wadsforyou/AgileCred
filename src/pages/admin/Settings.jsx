import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Save, Building2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("user");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const sendInvite = async () => {
    if (!inviteEmail) return;
    setSending(true); setMsg("");
    try {
      await base44.users.inviteUser(inviteEmail, inviteRole);
      setMsg(`Invitation sent to ${inviteEmail}.`);
      setInviteEmail("");
    } catch (e) {
      setMsg(e.message || "Could not send invitation. You must be an admin.");
    } finally { setSending(false); }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Organization settings and staff invitations</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2 mb-3"><Mail className="w-4 h-4 text-slate-400" /> Invite Staff Member</h3>
        <p className="text-sm text-slate-500 mb-4">Send an invite to a new staff member. They will join with the selected role.</p>
        <div className="flex gap-2 flex-wrap">
          <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="staff@agilecred.co.zw" className="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-slate-200 text-sm" />
          <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm">
            <option value="user">Staff (user)</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={sendInvite} disabled={sending} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ backgroundColor: "hsl(var(--brand-blue))" }}><Save className="w-4 h-4" /> Send Invite</button>
        </div>
        {msg && <p className="text-sm text-green-700 mt-3 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{msg}</p>}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-heading font-bold text-slate-900 text-sm flex items-center gap-2 mb-3"><Building2 className="w-4 h-4 text-slate-400" /> Account</h3>
        <div className="text-sm space-y-1 text-slate-600">
          <p><span className="text-slate-400">Signed in as:</span> {user?.full_name || user?.email}</p>
          <p><span className="text-slate-400">Role:</span> {user?.role || "admin"}</p>
        </div>
      </div>
    </div>
  );
}