import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Upload, FileText, User, Briefcase, CreditCard, ClipboardCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { loanCategories } from "@/data/loanCategories";

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Employment / Business", icon: Briefcase },
  { id: 3, title: "Loan Details", icon: CreditCard },
  { id: 4, title: "Documents", icon: FileText },
  { id: 5, title: "Review & Submit", icon: ClipboardCheck },
];

const initialState = {
  full_name: "",
  phone: "",
  email: "",
  national_id: "",
  residential_address: "",
  city: "",
  country: "Zimbabwe",
  employment_status: "",
  employer_or_business_name: "",
  monthly_income: "",
  business_type: "",
  loan_category: "",
  loan_product: "",
  amount_requested: "",
  purpose: "",
  preferred_contact_method: "Phone Call",
  documents: [],
};

export default function ApplyForm({ prefillCategory }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ ...initialState, loan_category: prefillCategory || "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!data.full_name) e.full_name = "Full name is required";
      if (!data.phone) e.phone = "Phone number is required";
      if (!data.email) e.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Enter a valid email";
      if (!data.national_id) e.national_id = "National ID or Passport is required";
    }
    if (s === 3) {
      if (!data.loan_category) e.loan_category = "Please select a loan category";
      if (!data.amount_requested) e.amount_requested = "Amount is required";
      if (!data.purpose) e.purpose = "Purpose is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => Math.min(5, s + 1)); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleFiles = async (selectedFiles) => {
    setUploading(true);
    const urls = [];
    const arr = Array.from(selectedFiles);
    for (const file of arr) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        urls.push(file_url);
      } catch (err) { /* continue */ }
    }
    setFiles((f) => [...f, ...arr.map((file, i) => ({ name: file.name, url: urls[i] }))]);
    setData((d) => ({ ...d, documents: [...d.documents, ...urls].filter(Boolean) }));
    setUploading(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await base44.entities.LoanApplication.create({
        ...data,
        monthly_income: data.monthly_income ? Number(data.monthly_income) : undefined,
        amount_requested: Number(data.amount_requested),
      });
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again or contact us directly." });
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "hsl(var(--brand-green-light))" }}>
          <Check className="w-10 h-10" style={{ color: "hsl(var(--brand-green))" }} />
        </div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Application Received</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Thank you{data.full_name ? `, ${data.full_name.split(" ")[0]}` : ""}. Your application has been submitted successfully.
          A member of the AgileCred team will review your information and be in touch using your preferred contact method.
        </p>
        <div className="mt-6 rounded-xl p-5 text-left text-sm border" style={{ backgroundColor: "hsl(var(--brand-blue-light))", borderColor: "hsl(var(--brand-blue))" }}>
          <p className="font-medium" style={{ color: "hsl(var(--brand-blue))" }}>
            Please note: Submission of an application does not guarantee approval. Applications are subject to assessment and applicable AgileCred terms.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button onClick={() => navigate("/")} className="px-6 py-2.5 rounded-full font-medium border border-border hover:bg-secondary transition-colors">
            Return Home
          </button>
          <button onClick={() => navigate("/contact")} className="px-6 py-2.5 rounded-full font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
            Contact AgileCred
          </button>
        </div>
      </div>
    );
  }

  const currentCategory = loanCategories.find((c) => c.title === data.loan_category);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
                    style={{ backgroundColor: done || active ? "hsl(var(--brand-purple))" : "hsl(var(--muted))", color: done || active ? "white" : "hsl(var(--muted-foreground))" }}
                  >
                    {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] md:text-xs font-medium hidden sm:block text-center" style={{ color: active ? "hsl(var(--brand-blue))" : "hsl(var(--muted-foreground))" }}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-1 rounded-full transition-colors" style={{ backgroundColor: step > s.id ? "hsl(var(--brand-purple))" : "hsl(var(--muted))" }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold mb-1">Personal Details</h3>
            <p className="text-sm text-muted-foreground mb-4">Tell us about yourself so we can identify your application.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name" required error={errors.full_name}>
                <input className="frinput" value={data.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Your full name" />
              </Field>
              <Field label="Phone" required error={errors.phone}>
                <input className="frinput" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+263 ..." />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input className="frinput" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
              </Field>
              <Field label="National ID / Passport" required error={errors.national_id}>
                <input className="frinput" value={data.national_id} onChange={(e) => update("national_id", e.target.value)} placeholder="National ID or passport number" />
              </Field>
              <Field label="Residential Address">
                <input className="frinput" value={data.residential_address} onChange={(e) => update("residential_address", e.target.value)} placeholder="Your residential address" />
              </Field>
              <Field label="City">
                <input className="frinput" value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="Your city" />
              </Field>
              <Field label="Country">
                <input className="frinput" value={data.country} onChange={(e) => update("country", e.target.value)} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold mb-1">Employment / Business</h3>
            <p className="text-sm text-muted-foreground mb-4">Tell us about your employment or business situation.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Employment Status">
                <select className="frinput" value={data.employment_status} onChange={(e) => update("employment_status", e.target.value)}>
                  <option value="">Select status</option>
                  {["Employed", "Self-Employed", "Business Owner", "Pensioner", "Civil Servant", "Unemployed", "Other"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </Field>
              <Field label="Employer / Business Name">
                <input className="frinput" value={data.employer_or_business_name} onChange={(e) => update("employer_or_business_name", e.target.value)} placeholder="Employer or business name" />
              </Field>
              <Field label="Monthly Income (USD)">
                <input className="frinput" type="number" value={data.monthly_income} onChange={(e) => update("monthly_income", e.target.value)} placeholder="Approximate monthly income" />
              </Field>
              <Field label="Business Type">
                <input className="frinput" value={data.business_type} onChange={(e) => update("business_type", e.target.value)} placeholder="Type of business (if applicable)" />
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold mb-1">Loan Details</h3>
            <p className="text-sm text-muted-foreground mb-4">Tell us about the financing you are looking for.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Loan Category" required error={errors.loan_category}>
                <select className="frinput" value={data.loan_category} onChange={(e) => update("loan_category", e.target.value)}>
                  <option value="">Select category</option>
                  {loanCategories.map((c) => (
                    <option key={c.slug} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </Field>
              <Field label="Loan Product">
                <select className="frinput" value={data.loan_product} onChange={(e) => update("loan_product", e.target.value)} disabled={!currentCategory}>
                  <option value="">{currentCategory ? "Select product" : "Select category first"}</option>
                  {currentCategory?.products.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Amount Requested (USD)" required error={errors.amount_requested}>
                <input className="frinput" type="number" min="0" value={data.amount_requested} onChange={(e) => update("amount_requested", e.target.value)} placeholder="Amount in USD" />
              </Field>
              <Field label="Preferred Contact Method">
                <select className="frinput" value={data.preferred_contact_method} onChange={(e) => update("preferred_contact_method", e.target.value)}>
                  {["Phone Call", "WhatsApp", "Email", "SMS"].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Purpose of Loan" required error={errors.purpose}>
                  <textarea className="frinput min-h-[100px]" value={data.purpose} onChange={(e) => update("purpose", e.target.value)} placeholder="Briefly describe how you plan to use the loan" />
                </Field>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold mb-1">Supporting Documents</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload any supporting documents you have available. This step is optional but helps speed up assessment.
            </p>
            <div className="rounded-xl border-2 border-dashed border-border p-8 text-center" style={{ backgroundColor: "hsl(var(--muted))" }}>
              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-foreground font-medium">Click to upload or drag files here</p>
              <p className="text-xs text-muted-foreground mt-1">ID, proof of residence, payslip, business documentation (PDF, images)</p>
              <input type="file" multiple className="hidden" id="file-upload" onChange={(e) => handleFiles(e.target.files)} />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full text-sm font-medium border border-border bg-white cursor-pointer hover:bg-secondary transition-colors"
              >
                {uploading ? "Uploading..." : "Choose Files"}
              </label>
            </div>
            {files.length > 0 && (
              <div className="space-y-2 mt-4">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-white border border-border rounded-lg px-3 py-2">
                    <FileText className="w-4 h-4 shrink-0" style={{ color: "hsl(var(--brand-blue))" }} />
                    <span className="truncate">{f.name}</span>
                    {f.url && <Check className="w-4 h-4 ml-auto" style={{ color: "hsl(var(--brand-green))" }} />}
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground italic">
              You can also submit documents later if needed. Your application will still be processed.
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold mb-1">Review & Submit</h3>
            <p className="text-sm text-muted-foreground mb-4">Review your information before submitting.</p>
            <div className="space-y-3">
              <ReviewSection title="Personal Details">
                <ReviewItem label="Name" value={data.full_name} />
                <ReviewItem label="Phone" value={data.phone} />
                <ReviewItem label="Email" value={data.email} />
                <ReviewItem label="National ID" value={data.national_id} />
                <ReviewItem label="Address" value={`${data.residential_address || "—"}, ${data.city || "—"}, ${data.country}`} />
              </ReviewSection>
              <ReviewSection title="Employment / Business">
                <ReviewItem label="Status" value={data.employment_status || "—"} />
                <ReviewItem label="Employer / Business" value={data.employer_or_business_name || "—"} />
                <ReviewItem label="Monthly Income" value={data.monthly_income ? `USD ${data.monthly_income}` : "—"} />
              </ReviewSection>
              <ReviewSection title="Loan Details">
                <ReviewItem label="Category" value={data.loan_category || "—"} />
                <ReviewItem label="Product" value={data.loan_product || "—"} />
                <ReviewItem label="Amount" value={data.amount_requested ? `USD ${data.amount_requested}` : "—"} />
                <ReviewItem label="Purpose" value={data.purpose || "—"} />
                <ReviewItem label="Contact Method" value={data.preferred_contact_method} />
              </ReviewSection>
            </div>
            <div className="rounded-xl border p-4" style={{ backgroundColor: "hsl(var(--brand-blue-light))", borderColor: "hsl(var(--brand-blue))" }}>
              <p className="text-sm font-medium" style={{ color: "hsl(var(--brand-blue))" }}>
                By submitting, you confirm the information provided is accurate. Submission of an application does not guarantee approval. Applications are subject to assessment and applicable AgileCred terms.
              </p>
            </div>
            {errors.submit && <p className="text-sm text-destructive">{errors.submit}</p>}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <button onClick={back} disabled={step === 1} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border border-border disabled:opacity-40 hover:bg-secondary transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {step < 5 ? (
            <button onClick={next} className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "hsl(var(--brand-blue))" }}>
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="flex items-center gap-1.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "hsl(var(--brand-green))" }}>
              {submitting ? "Submitting..." : "Submit Application"} <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

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
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span style={{ color: "hsl(var(--destructive))" }}>*</span>}
      </label>
      {children}
      {error && <p className="text-xs mt-1" style={{ color: "hsl(var(--destructive))" }}>{error}</p>}
    </div>
  );
}

function ReviewSection({ title, children }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{title}</h4>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}