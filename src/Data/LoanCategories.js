export const EMBLEM_URL = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/60be0cbd7_generated_image.png";
export const LOGO_URL = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/60be0cbd7_generated_image.png";

export const HERO_IMAGE = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/62534610a_generated_844acdb3.png";
export const ABOUT_BANNER = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/8ef098bba_generated_b6d26a51.png";
export const BUSINESS_SUPPORT_IMAGE = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/fe69d61bd_generated_2f3e3611.png";
export const CONTACT_BANNER = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/b0512a0a2_generated_image.png";
export const APPLY_BANNER = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/b614f186c_generated_image.png";
export const CAREERS_BANNER = "https://media.base44.com/images/public/6a94150333ebc35440171b1a/038055869_generated_image.png";

export const CONTACT_INFO = {
  email: "agilecredit@agilecred.co.zw",
  emailBulawayo: "agilecredbyo@agilecred.co.zw",
  generalPhones: ["+263 775 504 733", "+263 775 504 687", "+263 242 300 694"],
  offices: [
    {
      name: "AgileCred Harare Head Office",
      address: "309 Adylinn Road, Westgate, Harare, Zimbabwe",
      phones: ["+263 242 300 694", "+263 775 504 687"],
      position: [-17.8067, 31.0807],
    },
    {
      name: "AgileCred Bulawayo Office",
      address: "Office 210, 2nd Floor Central Africa House, Corner Jason Moyo Street & L. Takawira Avenue, Bulawayo",
      phones: ["+263 772 453 216"],
      position: [-20.1555, 28.6317],
    },
  ],
  serviceAreas: [
    { name: "Harare", position: [-17.8312, 31.0457] },
    { name: "Chitungwiza", position: [-18.0127, 31.0755] },
    { name: "Highfield", position: [-17.9603, 30.9989] },
    { name: "Glen Norah", position: [-17.9776, 30.9886] },
    { name: "Mufakose", position: [-17.9306, 30.9506] },
    { name: "Glen View", position: [-17.9956, 30.9756] },
    { name: "Budiriro", position: [-17.9656, 30.9556] },
    { name: "Hatcliffe", position: [-17.7436, 31.1289] },
    { name: "Domboshava", position: [-17.6111, 31.1439] },
    { name: "Gweru", position: [-19.4500, 29.8000] },
    { name: "Masvingo", position: [-20.0833, 30.0833] },
  ],
};

export const loanCategories = [
  {
    slug: "community",
    title: "Community Loans",
    shortDescription: "Financing for groups, vendors, sole traders and women entrepreneurs building local businesses.",
    heroImage: "https://media.base44.com/images/public/6a94150333ebc35440171b1a/8e9f33125_generated_eeeef140.png",
    icon: "Users",
    accent: "blue",
    introduction:
      "AgileCred's Community Loans are designed to strengthen the economic fabric of local communities. We provide accessible financing to groups, vendors, sole traders and women-led enterprises that form the backbone of Zimbabwe's informal and semi-formal economies. Our community-focused approach ensures that financing reaches those who need it most, fostering collective growth and financial inclusion.",
    targetAudience: [
      "Groups and cooperative associations",
      "Vendors and market traders",
      "Sole traders running small businesses",
      "Women-run businesses",
      "Graduate women entrepreneurs starting out",
    ],
    products: [
      { name: "Group Loan", description: "Financing for registered groups and cooperative associations with shared responsibility and collective repayment structures." },
      { name: "Vendor Loan", description: "Working capital for market vendors and street traders to grow their trading activities and inventory." },
      { name: "Sole Trader Loan", description: "Support for individual sole traders to expand their small business operations and working capital." },
      { name: "Graduate Women Start-Up Loan", description: "Seed financing designed for women graduates launching their entrepreneurial ventures." },
    ],
    benefits: [
      "Accessible financing for informal and semi-formal businesses",
      "Group-based structures that leverage collective responsibility",
      "Support for women entrepreneurs and financial inclusion",
      "Flexible repayment aligned with business cash flows",
      "Dedicated relationship support from our community team",
    ],
    typicalUses: [
      "Purchasing trading stock and inventory",
      "Expanding a market stall or trading space",
      "Acquiring equipment and tools for production",
      "Working capital for seasonal demand",
      "Starting a new entrepreneurial venture",
    ],
    requirements: [
      "National ID or Passport for each group member or applicant",
      "Proof of residence",
      "Group registration documentation where applicable",
      "Business location details and trading history where available",
    ],
    howItWorks: [
      { step: "01", title: "Choose Your Solution", description: "Identify the community loan product that matches your group or business needs." },
      { step: "02", title: "Apply", description: "Complete the application and provide the required information and documentation." },
      { step: "03", title: "Assessment", description: "AgileCred reviews your application and supporting documentation." },
      { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
    ],
    faqs: [
      { q: "Can a group apply together?", a: "Yes. Our Group Loan is specifically designed for registered groups and cooperative associations with shared responsibility structures." },
      { q: "Do I need to be a registered business?", a: "Not always. Many of our community loan products are designed for informal-sector participants. Requirements vary by product — our team will guide you." },
      { q: "I am a recent graduate woman. Can I get a start-up loan?", a: "Yes. Our Graduate Women Start-Up Loan is designed specifically for women graduates launching entrepreneurial ventures." },
      { q: "How are repayment terms determined?", a: "Repayment terms are subject to AgileCred's assessment of your application and applicable terms. We aim to align repayment with your business cash flows." },
    ],
  },
  {
    slug: "msme",
    title: "MSME Loans",
    shortDescription: "Flexible business financing for Micro, Small and Medium Enterprises across Zimbabwe.",
    heroImage: "https://media.base44.com/images/public/6a94150333ebc35440171b1a/e31c57ebf_generated_019654c2.png",
    icon: "Briefcase",
    accent: "blue",
    introduction:
      "AgileCred's MSME Loans provide flexible financing solutions for Micro, Small and Medium Enterprises that drive Zimbabwe's economic growth. Whether you need working capital, asset finance, or support to fulfil an order, our products are structured to meet the diverse needs of growing businesses. We understand the challenges MSMEs face and work to provide financing that supports sustainable business development.",
    targetAudience: [
      "Individuals running registered or operating businesses",
      "Micro enterprises seeking growth capital",
      "Small businesses needing working capital",
      "Medium enterprises requiring asset or order finance",
    ],
    products: [
      { name: "Business Loan", description: "General working capital and growth financing for operating businesses." },
      { name: "Asset Finance Loan", description: "Financing to acquire productive business assets such as equipment, machinery and vehicles." },
      { name: "Order Finance Loan", description: "Short-term financing to fulfil confirmed business orders and contracts." },
      { name: "Invoice Discounting Loan", description: "Access working capital by discounting outstanding invoices from verified debtors." },
    ],
    benefits: [
      "Financing structured around your business cycle",
      "Support for asset acquisition and business expansion",
      "Order and invoice-based financing for working capital",
      "Dedicated business relationship management",
      "Opportunity to build a financing track record with AgileCred",
    ],
    typicalUses: [
      "Working capital for operations and payroll",
      "Purchasing machinery, equipment or vehicles",
      "Fulfilling confirmed orders and contracts",
      "Discounting invoices to free up cash flow",
      "Expanding business premises or product lines",
    ],
    requirements: [
      "National ID or Passport",
      "Certificate of Incorporation where applicable",
      "CR6 and CR14 documents where applicable",
      "Business financial records and bank statements where available",
      "Proof of business address",
    ],
    howItWorks: [
      { step: "01", title: "Choose Your Solution", description: "Identify the MSME loan product that matches your business financing need." },
      { step: "02", title: "Apply", description: "Complete the application and provide the required information and business documentation." },
      { step: "03", title: "Assessment", description: "AgileCred reviews your application, business profile and supporting documentation." },
      { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
    ],
    faqs: [
      { q: "What is the difference between a Business Loan and Asset Finance?", a: "A Business Loan provides general working capital, while Asset Finance is specifically for acquiring productive assets such as equipment, machinery or vehicles." },
      { q: "Can I get financing to fulfil a confirmed order?", a: "Yes. Our Order Finance Loan is designed to provide short-term financing to help you fulfil confirmed business orders and contracts." },
      { q: "Do I need to be a registered company?", a: "Requirements vary by product. Some products require registration documents such as Certificate of Incorporation, CR6 and CR14. Our team will advise based on your needs." },
      { q: "What is invoice discounting?", a: "Invoice discounting allows you to access working capital by using your outstanding invoices from verified debtors as the basis for financing." },
    ],
  },
  {
    slug: "consumer",
    title: "Consumer Loans",
    shortDescription: "Personal financing for civil servants, pensioners, families and individuals with everyday needs.",
    heroImage: "https://media.base44.com/images/public/6a94150333ebc35440171b1a/ee62c6bef_generated_e1aa0481.png",
    icon: "Heart",
    accent: "green",
    introduction:
      "AgileCred's Consumer Loans provide personal financing solutions designed to help individuals and families manage everyday financial needs. From civil servants and pensioners to families managing education costs or unexpected emergencies, our consumer products offer accessible and responsible financing. We are committed to fair value and transparent terms for every individual we serve.",
    targetAudience: [
      "Civil servants and government employees",
      "Government pensioners",
      "Parents and families with education needs",
      "Individuals facing unexpected emergencies",
      "Salaried employees seeking payroll-based financing",
    ],
    products: [
      { name: "Civil Servants Loan", description: "Financing tailored for government employees with structured repayment options." },
      { name: "Government Pensioners Loan", description: "Accessible financing for government pensioners with pension-aligned repayment." },
      { name: "Education Loan", description: "Financing to help families manage school fees and education-related expenses." },
      { name: "Emergency Loan", description: "Short-term financing to address unexpected and urgent financial needs." },
      { name: "Payroll Loan", description: "Loan repayment structured through your employer's payroll system." },
      { name: "Scheme Loan", description: "Financing under employer or institutional schemes with agreed repayment structures." },
    ],
    benefits: [
      "Structured repayment aligned with your income",
      "Accessible financing for civil servants and pensioners",
      "Support for education and family needs",
      "Responsible lending with transparent terms",
      "Dedicated support throughout the application process",
    ],
    typicalUses: [
      "School fees and education expenses",
      "Unexpected medical or emergency costs",
      "Home improvements and essential purchases",
      "Bridging finance between income cycles",
      "Family and household needs",
    ],
    requirements: [
      "National ID or Passport",
      "Proof of residence",
      "Current payslip or pension statement where applicable",
      "Confirmation of employment or pension where applicable",
    ],
    howItWorks: [
      { step: "01", title: "Choose Your Solution", description: "Identify the consumer loan product that matches your personal need." },
      { step: "02", title: "Apply", description: "Complete the application and provide the required information and documentation." },
      { step: "03", title: "Assessment", description: "AgileCred reviews your application and supporting documentation." },
      { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
    ],
    faqs: [
      { q: "I am a civil servant. What documents do I need?", a: "Typically you will need your National ID, proof of residence, a current payslip and confirmation of employment. Requirements may vary — our team will confirm what is needed." },
      { q: "Can pensioners apply?", a: "Yes. Our Government Pensioners Loan is designed specifically for government pensioners with pension-aligned repayment." },
      { q: "Can I get a loan for school fees?", a: "Yes. Our Education Loan is designed to help families manage school fees and education-related expenses." },
      { q: "How quickly can I access an emergency loan?", a: "Processing times depend on the completeness of your application and supporting documentation. Our team works to process applications as efficiently as possible." },
    ],
  },
  {
    slug: "social-financing",
    title: "Social Financing",
    shortDescription: "Financing for social inclusion, accessibility and sustainable community initiatives.",
    heroImage: "https://media.base44.com/images/public/6a94150333ebc35440171b1a/ad6efa4bb_generated_7d93ecee.png",
    icon: "Sparkles",
    accent: "purple",
    introduction:
      "AgileCred's Social Financing products are designed to address social inclusion and support sustainable community initiatives. We believe that financial services should reach everyone, including persons with disabilities and communities pursuing sustainable development. Our social financing products promote accessibility, inclusion and environmentally responsible initiatives that create lasting positive impact.",
    targetAudience: [
      "Persons with disabilities and their benefactors",
      "Entrepreneurs with disabilities",
      "Communities pursuing sustainable energy solutions",
      "Households and groups investing in water and sanitation",
      "Organisations supporting social inclusion",
    ],
    products: [
      { name: "Disabled Benefactor Loan", description: "Financing for benefactors supporting persons with disabilities in their care and development." },
      { name: "Disabled Entrepreneur Loan", description: "Business financing designed for entrepreneurs with disabilities to start or grow their enterprises." },
      { name: "Solar Capacitation Loan", description: "Financing for individuals and groups to acquire solar energy systems for homes and businesses." },
      { name: "WASH Capacitation Loan", description: "Financing for Water, Sanitation and Hygiene infrastructure and systems for households and communities." },
    ],
    benefits: [
      "Promotes social and economic inclusion",
      "Supports accessibility and dignity for persons with disabilities",
      "Enables sustainable energy access through solar financing",
      "Improves community health through WASH infrastructure",
      "Aligns financing with sustainable development goals",
    ],
    typicalUses: [
      "Starting or expanding a business as an entrepreneur with disabilities",
      "Acquiring solar panels and energy systems",
      "Installing water and sanitation infrastructure",
      "Supporting the care and development of persons with disabilities",
      "Community-level sustainable development projects",
    ],
    requirements: [
      "National ID or Passport",
      "Proof of residence",
      "Documentation relating to the specific social financing product",
      "Group or community documentation where applicable",
    ],
    howItWorks: [
      { step: "01", title: "Choose Your Solution", description: "Identify the social financing product that matches your needs or initiative." },
      { step: "02", title: "Apply", description: "Complete the application and provide the required information and documentation." },
      { step: "03", title: "Assessment", description: "AgileCred reviews your application and supporting documentation." },
      { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
    ],
    faqs: [
      { q: "Who qualifies for the Disabled Entrepreneur Loan?", a: "Entrepreneurs with disabilities who wish to start or grow a business. Our team will guide you through the specific requirements." },
      { q: "What can the Solar Capacitation Loan be used for?", a: "It can be used to acquire solar energy systems for homes or businesses, enabling access to sustainable energy." },
      { q: "What does WASH financing cover?", a: "WASH (Water, Sanitation and Hygiene) financing supports the installation of water, sanitation and hygiene infrastructure for households and communities." },
      { q: "Can community groups apply?", a: "Yes. Many of our social financing products are available to groups and communities pursuing sustainable initiatives." },
    ],
  },
  {
    slug: "farming",
    title: "Farming Loans",
    shortDescription: "Agricultural financing for Zimbabwean farmers, from inputs to green finance.",
    heroImage: "https://media.base44.com/images/public/6a94150333ebc35440171b1a/5bee74096_generated_655f208b.png",
    icon: "Sprout",
    accent: "green",
    introduction:
      "AgileCred's Farming Loans provide agricultural financing to support Zimbabwean farmers at every stage of the production cycle. From input financing to green agriculture initiatives, we understand the unique needs of the agricultural sector and work to provide financing that supports productive and sustainable farming. Our farming products are designed to help farmers invest in their operations and build resilient agricultural livelihoods.",
    targetAudience: [
      "Smallholder and communal farmers",
      "Commercial and emerging commercial farmers",
      "Farmers needing seasonal input financing",
      "Farmers pursuing sustainable and green agriculture",
      "Agricultural cooperatives and groups",
    ],
    products: [
      { name: "Input Credit Loan", description: "Financing for agricultural inputs such as seed, fertiliser and chemicals, structured around the farming season." },
      { name: "Green Finance Loan", description: "Financing for sustainable and climate-smart agricultural practices and green farming initiatives." },
    ],
    benefits: [
      "Financing aligned with the agricultural production cycle",
      "Input credit structured around seasonal needs",
      "Support for sustainable and climate-smart agriculture",
      "Dedicated agricultural relationship support",
      "Promotes productive and resilient farming",
    ],
    typicalUses: [
      "Purchasing seed, fertiliser and agricultural chemicals",
      "Investing in climate-smart farming practices",
      "Financing seasonal agricultural inputs",
      "Supporting sustainable agriculture initiatives",
      "Strengthening farm productivity and resilience",
    ],
    requirements: [
      "National ID or Passport",
      "Proof of residence",
      "Farming details including land or plot information where applicable",
      "Agricultural documentation or group registration where applicable",
    ],
    howItWorks: [
      { step: "01", title: "Choose Your Solution", description: "Identify the farming loan product that matches your agricultural needs." },
      { step: "02", title: "Apply", description: "Complete the application and provide the required information and documentation." },
      { step: "03", title: "Assessment", description: "AgileCred reviews your application and supporting documentation." },
      { step: "04", title: "Financing", description: "Successful applicants proceed through the relevant financing process." },
    ],
    faqs: [
      { q: "What is the Input Credit Loan?", a: "It provides financing for agricultural inputs such as seed, fertiliser and chemicals, structured around the farming season and production cycle." },
      { q: "What is Green Finance?", a: "Green Finance supports sustainable and climate-smart agricultural practices, helping farmers adopt environmentally responsible farming methods." },
      { q: "Can smallholder farmers apply?", a: "Yes. Our farming loans are available to smallholder, communal, emerging commercial and commercial farmers." },
      { q: "How is repayment structured?", a: "Repayment terms are subject to AgileCred's assessment and are typically aligned with the agricultural production and harvest cycle." },
    ],
  },
];

export const getCategor