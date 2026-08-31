import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import LoanCalculator from "@/components/LoanCalculator";
import { loanCategories, BUSINESS_SUPPORT_IMAGE } from "@/data/loanCategories";

export default function Calculator() {
  const [searchParams] = useSearchParams();
  const prefillSlug = searchParams.get("category");
  const prefill = prefillSlug ? loanCategories.find((c) => c.slug === prefillSlug)?.title : null;

  return (
    <div>
      <PageBanner
        pageKey="calculator"
        title="Loan Calculator"
        subtitle="Estimate your repayments before you apply. Explore different loan amounts, periods and interest rates to find what works for you."
        image={loanCategories[3].heroImage}
        eyebrow="Planning Tools"
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <LoanCalculator defaultCategory={prefill || loanCategories[0].title} />

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <Link to="/apply" className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-5 hover:shadow-md transition-shadow">
            <div>
              <p className="font-heading font-bold text-foreground">Ready to Apply?</p>
              <p className="text-sm text-muted-foreground">Start your loan application online today.</p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--brand-green))" }} />
          </Link>
          <Link to="/contact" className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-5 hover:shadow-md transition-shadow">
            <div>
              <p className="font-heading font-bold text-foreground">Need Help?</p>
              <p className="text-sm text-muted-foreground">Speak to our team about your financing needs.</p>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--brand-blue))" }} />
          </Link>
        </div>
      </div>
    </div>
  );
}