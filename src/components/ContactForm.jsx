import React, { useState } from "react";
import { Mail, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ContactForm() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await base44.entities.ContactEnquiry.create(form);
      setDone(true);
      setForm({ full_name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 text-center">
        <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: "hsl(var(--brand-green-light))", color: "hsl(var(--brand-green))" }}>
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="mt-4 font-heading font-bold text-foreground text-lg">Thank you for reaching out</h3>
        <p className="text-sm text-muted-foreground mt-2">We have received your enquiry and our team will be in touch shortly.</p>
        <button onClick={() => setDone(false)} className="mt-5 text-sm font-semibold px-4 py-2 rounded-full text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-white p-6 md:p-8 space-y-4">
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground">Send Us a Message</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in the form below and our team will get back to you.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name *">
          <input required value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </Field>
        <Field label="Email *">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </Field>
        <Field label="Phone">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </Field>
        <Field label="Subject">
          <input value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </Field>
      </div>
      <Field label="Message *">
        <textarea required rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </Field>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}