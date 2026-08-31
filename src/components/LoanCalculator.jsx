import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";
import { loanCategories } from "@/data/loanCategories";

export default function LoanCalculator({ defaultCategory }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(defaultCategory || loanCategories[0].title);
  const [amount, setAmount] = useState(1000);
  const [period, setPeriod] = useState(12);
  const [rate, setRate] = useState(15);
  const [frequency, setFrequency] = useState("Monthly");

  const periodsPerYear = frequency === "Monthly" ? 12 : frequency === "Bi-Weekly" ? 26 : 52;
  const totalPayments = useMemo(
    () => Math.round((period * periodsPerYear) / 12),
    [period, periodsPerYear]
  );

  const results = useMemo(() => {
    const r = rate / 100 / periodsPerYear;
    const p = Number(amount);
    const n = totalPayments;

    let installment;
    if (r === 0) {
      installment = p / n;
    } else {
      installment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalRepayment = installment * n;
    const totalInterest = totalRepayment - p;
    return {
      installment: isFinite(installment) ? installment : 0,
      totalRepayment: isFinite(totalRepayment) ? totalRepayment : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
    };
  }, [amount, rate, totalPayments, periodsPerYear]);

  const fmt = (v) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(v || 0);

  return (
    <div className="rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
      <div className="p-6 md:p-8" style={{ backgroundColor: "hsl(var(--brand-blue-light))" }}>
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5" style={{ color: "hsl(var(--brand-blue))" }} />
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--brand-blue))" }}>
            Loan Calculator
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground">Estimate Your Repayments</h3>
      </div>

      <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="calc-category">
              Loan Type
            </label>
            <select
              id="calc-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "hsl(var(--brand-blue))" }}
            >
              {loanCategories.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5" htmlFor="calc-amount">
              <span>Loan Amount (USD)</span>
              <span className="font-semibold" style={{ color: "hsl(var(--brand-blue))" }}>{fmt(amount)}</span>
            </label>
            <input
              id="calc-amount"
              type="number"
              min="50"
              step="50"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg border border-input px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "hsl(var(--brand-blue))" }}
            />
            <input
              type="range"
              min="100"
              max="25000"
              step="100"
              value={Math.min(amount, 25000)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-2 accent-[hsl(var(--brand-blue))]"
              aria-label="Loan amount slider"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5" htmlFor="calc-period">
              <span>Repayment Period (Months)</span>
              <span className="font-semibold" style={{ color: "hsl(var(--brand-blue))" }}>{period} months</span>
            </label>
            <input
              id="calc-period"
              type="number"
              min="1"
              max="60"
              value={period}
              onChange={(e) => setPeriod(Math.max(1, Math.min(60, Number(e.target.value))))}
              className="w-full rounded-lg border border-input px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "hsl(var(--brand-blue))" }}
            />
            <input
              type="range"
              min="1"
              max="36"
              value={Math.min(period, 36)}
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="w-full mt-2 accent-[hsl(var(--brand-blue))]"
              aria-label="Repayment period slider"
            />
          </div>

          <div>
            <label className="flex items-center justify-between text-sm font-medium text-foreground mb-1.5" htmlFor="calc-rate">
              <span>Interest Rate (% per annum)</span>
              <span className="font-semibold" style={{ color: "hsl(var(--brand-blue))" }}>{rate}%</span>
            </label>
            <input
              id="calc-rate"
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg border border-input px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "hsl(var(--brand-blue))" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="calc-freq">
              Repayment Frequency
            </label>
            <select
              id="calc-freq"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "hsl(var(--brand-blue))" }}
            >
              <option>Monthly</option>
              <option>Bi-Weekly</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div
          className="rounded-xl p-6 flex flex-col justify-between"
          style={{ backgroundColor: "hsl(var(--brand-blue))" }}
        >
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wider font-medium">Estimated {frequency} Installment</p>
            <p className="text-4xl md:text-5xl font-heading font-bold text-white mt-2 tabular-nums">
              {fmt(results.installment)}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-sm text-white/70">Total Repayment</span>
              <span className="text-lg font-semibold text-white tabular-nums">{fmt(results.totalRepayment)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-white/20">
              <span className="text-sm text-white/70">Total Interest</span>
              <span className="text-lg font-semibold text-white tabular-nums">{fmt(results.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Number of Payments</span>
              <span className="text-lg font-semibold text-white tabular-nums">{totalPayments}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/apply")}
            className="mt-6 flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: "hsl(var(--brand-green))" }}
          >
            Apply for This Loan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-6">
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          Calculator results are estimates for illustrative purposes only. Actual loan amounts, interest, fees and repayment terms are subject to AgileCred's assessment and applicable terms.
        </p>
      </div>
    </div>
  );
}