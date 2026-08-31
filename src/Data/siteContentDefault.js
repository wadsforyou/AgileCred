import {
  HERO_IMAGE,
  ABOUT_BANNER,
  BUSINESS_SUPPORT_IMAGE,
  CONTACT_BANNER,
  APPLY_BANNER,
  CAREERS_BANNER,
  loanCategories,
} from "./loanCategories";

// Default banner content for every editable page on the public site.
// The admin "Edit Website Content" tool edits these; the public site falls
// back to these defaults when no saved override exists.
export const SITE_CONTENT_DEFAULTS = [
  {
    page_key: "home",
    label: "Home — Hero Banner",
    heading: "Agile Finance for People, Businesses and Communities",
    subheading:
      "AgileCred provides flexible and innovative financial solutions to individuals, groups, farmers and Micro, Small and Medium Enterprises across Zimbabwe.",
    image_url: HERO_IMAGE,
  },
  {
    page_key: "about",
    label: "About Page",
    heading: "About AgileCred",
    subheading:
      "A licensed credit-only Microfinance Institution fostering financial, social and economic inclusion in Zimbabwe.",
    image_url: ABOUT_BANNER,
  },
  {
    page_key: "loans",
    label: "Loans Overview Page",
    heading: "Our Financial Solutions",
    subheading:
      "Flexible and innovative financing for individuals, groups, farmers, businesses and communities across Zimbabwe.",
    image_url: loanCategories[1].heroImage,
  },
  {
    page_key: "business-support",
    label: "Business Support Page",
    heading: "Business Development Support Services",
    subheading:
      "AgileCred supports MSMEs beyond financing — with training, planning, management guidance and registration support to help businesses grow.",
    image_url: BUSINESS_SUPPORT_IMAGE,
  },
  {
    page_key: "calculator",
    label: "Calculator Page",
    heading: "Loan Calculator",
    subheading:
      "Estimate your repayments before you apply. Explore different loan amounts, periods and interest rates to find what works for you.",
    image_url: loanCategories[3].heroImage,
  },
  {
    page_key: "apply",
    label: "Apply Page",
    heading: "What Would You Like a Loan For?",
    subheading:
      "Choose the loan category that best matches your needs to begin a secure and professional application.",
    image_url: APPLY_BANNER,
  },
  {
    page_key: "contact",
    label: "Contact Page",
    heading: "Contact & Locations",
    subheading:
      "Visit us at our offices in Harare and Bulawayo, or reach out by phone or email. We're here to help with your financing needs.",
    image_url: CONTACT_BANNER,
  },
  {
    page_key: "careers",
    label: "Careers Page",
    heading: "Careers at AgileCred",
    subheading:
      "Join a team passionate about microfinance, financial inclusion, entrepreneurship and MSME development in Zimbabwe.",
    image_url: CAREERS_BANNER,
  },
  ...loanCategories.map((c) => ({
    page_key: `loan:${c.slug}`,
    label: `Loan Category — ${c.title}`,
    heading: c.title,
    subheading: c.shortDescription,
    image_url: c.heroImage,
  })),
];

export const getSiteContentDefault = (pageKey) =>
  SITE_CONTENT_DEFAULTS.find((d) => d.page_key === pageKey) || null;