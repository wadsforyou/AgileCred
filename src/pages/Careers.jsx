import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Check, Send, Heart, Briefcase, Sprout, GraduationCap, Users, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { loanCategories, CAREERS_BANNER } from "@/data/loanCategories";

const areas = [
  { label: "Microfinance", icon: Briefcase },
  { label: "Financial Inclusion", icon: Heart },
  { label: "Entrepreneurship", icon: Users },
  { label: "MSME Development", icon: GraduationCap },
  { label: "Agriculture", icon: Sprout },
  { label: "Customer Service", icon: Heart },
];

export default function Careers() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", position_of_interest: "", area_of_interest: "", cover_letter: "", resume_url: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (f, v) => setForm((d) => ({ ...d, [f]: v }));

  const handleResume = async (file) => {
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((d) => ({ ...d, resume_url: file_url }));
      setResumeFile(file);
    } catch (e) {
      setError("Failed to upload resume. Please try again.");
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.phone || !form.area_of_interest) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await base44.entities.JobApplication.create(form);
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please try again or contact us directly.");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <PageBanner
        pageKey="careers"
        title="Careers at AgileCred"
        subtitle="Join a team passionate about microfinance, financial inclusion, entrepreneurship and MSME development in Zimbabwe."
        image={CAREERS_BANNER}
        eyebrow="Careers"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-24">
        {/* Introduction */}
        <section>
          <ScrollReveal>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
              AgileCred is building a team of people who are passionate about making a real difference in the lives of Zimbabweans. We are interested in people who care about:
            </p>
          </ScrollReveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {areas.map((a, i) => {
              const Icon = a.icon;
              return (
                <ScrollReveal key={a.label} delay={i * 0.05}>
                  <div className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-border bg-white shadow-sm">
                    <Icon className="w-5 h-5" style={{ color: "hsl(var(--brand-blue))" }} />
                    <span className="text-sm font-semibold text-foreground">{a.label}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Application form */}
        <section>
          <SectionHeading eyebrow="Apply" title="Express Your Interest" description="Submit your details below. We'll keep your information on file and reach out when suitable opportunities arise." accent="green" />

          {submitted ? (
            <div className="max-w-2xl mx-auto text-center mt-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(var(--brand-green-light))" }}>
                <Check className="w-10 h-10" style={{ color: "hsl(var(--brand-green))" }} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">Thank You for Your Interest</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We've received your application. AgileCred will keep your information on file and reach out when a suitable opportunity aligns with your skills and interests.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-2.5 rounded-full font-medium border border-border hover:bg-secondary transition-colors"
              >
                Return Home
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto mt-12">
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
                    <input className="frinput" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
                    <input className="frinput" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+263 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
                    <input className="frinput" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Area of Interest <span style={{ color: "hsl(var(--destructive))" }}>*</span></label>
                    <select className="frinput" value={form.area_of_interest} onChange={(e) => update("area_of_interest", e.target.value)}>
                      <option value="">Select area</option>
                      {areas.map((a) => (
                        <option key={a.label}>{a.label}</option>
                      ))}
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Position of Interest</label>
                  <input className="frinput" value={form.position_of_interest} onChange={(e) => update("position_of_interest", e.target.value)} placeholder="Optional — tell us the role you're interested in" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Cover Letter / Message</label>
                  <textarea className="frinput min-h-[120px]" value={form.cover_letter} onChange={(e) => update("cover_letter", e.target.value)} placeholder="Tell us about yourself and why you'd like to join AgileCred" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Resume / CV</label>
                  <div className="rounded-xl border-2 border-dashed border-border p-5 text-center" style={{ backgroundColor: "hsl(var(--muted))" }}>
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <FileText className="w-4 h-4" style={{ color: "hsl(var(--brand-blue))" }} />
                        {resumeFile.name}
                        <Check className="w-4 h-4" style={{ color: "hsl(var(--brand-green))" }} />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-foreground">Upload your resume (PDF)</p>
                      </>
                    )}
                    <input type="file" className="hidden" id="resume-upload" onChange={(e) => e.target.files[0] && handleResume(e.target.files[0])} accept=".pdf,.doc,.docx" />
                    <label htmlFor="resume-upload" className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-sm font-medium border border-border bg-white cursor-pointer hover:bg-secondary transition-colors">
                      {uploading ? "Uploading..." : "Choose File"}
                    </label>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: "hsl(var(--brand-green))" }}
                >
                  {submitting ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center mt-4 text-xs text-muted-foreground">
                Your information will be kept on file. AgileCred is an equal opportunity institution.
              </p>
            </div>
          )}
        </section>

        <style>{`
          .frinput {
            width: 100%;
            border-radius: 0.5rem;
            border: 1px solid hsl(var(--input));
            background: white;
            padding: 0.625rem 0.875rem;
            font-size: 0.875rem;
            color: hsl(var(--foreground));
            outline: none;
            transition: box-shadow 0.15s;
          }
          .frinput:focus { box-shadow: 0 0 0 2px hsl(var(--brand-blue)); }
        `}</style>
      </div>
    </div>
  );
}