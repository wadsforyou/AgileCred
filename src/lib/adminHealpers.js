import { base44 } from "@/api/base44Client";

export const APP_STATUSES = [
  "Submitted",
  "Under Review",
  "Documents Required",
  "Assessment",
  "Approved",
  "Declined",
  "Disbursed",
  "Closed",
];

export const ENQUIRY_STATUSES = ["New", "In Progress", "Resolved"];

export const statusColor = (status) => {
  const map = {
    Submitted: "#2563eb",
    "Under Review": "#d97706",
    "Documents Required": "#7c3aed",
    Assessment: "#0891b2",
    Approved: "#16a34a",
    Declined: "#dc2626",
    Disbursed: "#0d9488",
    Closed: "#475569",
    New: "#2563eb",
    "In Progress": "#d97706",
    Resolved: "#16a34a",
    Open: "#16a34a",
    Closed: "#dc2626",
  };
  return map[status] || "#64748b";
};

export const textColor = (status) => {
  const c = statusColor(status).replace("#", "");
  return `#${c}`;
};

export const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date)) return "—";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatDateTime = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date)) return "—";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatMoney = (n) => {
  if (n === undefined || n === null || n === "") return "—";
  const num = Number(n);
  if (isNaN(num)) return String(n);
  return "$" + num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

export const logActivity = async (action, description, extras = {}) => {
  try {
    const me = await base44.auth.me().catch(() => null);
    await base44.entities.ActivityLog.create({
      action,
      description,
      ...extras,
      user_id: me?.id,
      user_name: me?.full_name || me?.email,
    });
  } catch (e) {
    // best-effort, never block on audit log
  }
};

export const appCode = (app) =>  "AC-" + String(app?.id?.slice(-6) || "000000").toUpperCase();
