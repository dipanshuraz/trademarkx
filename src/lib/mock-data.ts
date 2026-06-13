// Mock data generators for the trademark platform.

export const TM_CLASSES = [
  { id: 1, name: "Chemicals", type: "Goods", desc: "Chemicals used in industry, science and photography" },
  { id: 2, name: "Paints", type: "Goods", desc: "Paints, varnishes, lacquers; preservatives against rust" },
  { id: 3, name: "Cosmetics & Cleaning", type: "Goods", desc: "Bleaching preparations, soaps, perfumery, cosmetics" },
  { id: 4, name: "Lubricants & Fuels", type: "Goods", desc: "Industrial oils and greases; fuels and illuminants" },
  { id: 5, name: "Pharmaceuticals", type: "Goods", desc: "Pharmaceutical preparations; sanitary preparations" },
  { id: 6, name: "Metal Goods", type: "Goods", desc: "Common metals and their alloys; metal building materials" },
  { id: 7, name: "Machinery", type: "Goods", desc: "Machines and machine tools; motors and engines" },
  { id: 8, name: "Hand Tools", type: "Goods", desc: "Hand tools and implements (hand-operated)" },
  { id: 9, name: "Electronics & Software", type: "Goods", desc: "Computers, software, scientific apparatus, mobile apps" },
  { id: 10, name: "Medical Apparatus", type: "Goods", desc: "Surgical, medical, dental and veterinary apparatus" },
  { id: 11, name: "Appliances", type: "Goods", desc: "Lighting, heating, cooking, refrigerating apparatus" },
  { id: 12, name: "Vehicles", type: "Goods", desc: "Vehicles; apparatus for locomotion by land, air or water" },
  { id: 13, name: "Firearms", type: "Goods", desc: "Firearms; ammunition and projectiles; explosives" },
  { id: 14, name: "Jewellery", type: "Goods", desc: "Precious metals and their alloys; jewellery, watches" },
  { id: 15, name: "Musical Instruments", type: "Goods", desc: "Musical instruments" },
  { id: 16, name: "Paper & Stationery", type: "Goods", desc: "Paper, cardboard, printed matter, stationery" },
  { id: 17, name: "Rubber Goods", type: "Goods", desc: "Rubber, gutta-percha, gum, asbestos, mica" },
  { id: 18, name: "Leather Goods", type: "Goods", desc: "Leather and imitations of leather; trunks, bags" },
  { id: 19, name: "Building Materials", type: "Goods", desc: "Non-metallic building materials" },
  { id: 20, name: "Furniture", type: "Goods", desc: "Furniture, mirrors, picture frames" },
  { id: 21, name: "Household Utensils", type: "Goods", desc: "Household or kitchen utensils and containers" },
  { id: 22, name: "Ropes & Textiles", type: "Goods", desc: "Ropes, string, nets, tents, awnings" },
  { id: 23, name: "Yarns", type: "Goods", desc: "Yarns and threads, for textile use" },
  { id: 24, name: "Textiles", type: "Goods", desc: "Textiles and textile goods" },
  { id: 25, name: "Clothing & Apparel", type: "Goods", desc: "Clothing, footwear, headgear" },
  { id: 26, name: "Lace & Embroidery", type: "Goods", desc: "Lace, embroidery, ribbons, buttons" },
  { id: 27, name: "Floor Coverings", type: "Goods", desc: "Carpets, rugs, mats, linoleum" },
  { id: 28, name: "Toys & Sports", type: "Goods", desc: "Games, toys, sporting articles" },
  { id: 29, name: "Meat & Dairy", type: "Goods", desc: "Meat, fish, poultry, preserved fruits, dairy" },
  { id: 30, name: "Food & Beverages", type: "Goods", desc: "Coffee, tea, sugar, rice, flour, bread, spices" },
  { id: 31, name: "Agricultural Products", type: "Goods", desc: "Agricultural, horticultural and forestry products" },
  { id: 32, name: "Beverages", type: "Goods", desc: "Beers; mineral waters; non-alcoholic drinks" },
  { id: 33, name: "Alcoholic Beverages", type: "Goods", desc: "Alcoholic beverages (except beers)" },
  { id: 34, name: "Tobacco", type: "Goods", desc: "Tobacco; smokers' articles; matches" },
  { id: 35, name: "Advertising & Business", type: "Services", desc: "Advertising, business management, retail services" },
  { id: 36, name: "Insurance & Finance", type: "Services", desc: "Insurance; financial affairs; real estate" },
  { id: 37, name: "Construction & Repair", type: "Services", desc: "Building construction; repair; installation services" },
  { id: 38, name: "Telecommunications", type: "Services", desc: "Telecommunications services" },
  { id: 39, name: "Transport & Travel", type: "Services", desc: "Transport; packaging and storage; travel arrangement" },
  { id: 40, name: "Material Treatment", type: "Services", desc: "Treatment of materials" },
  { id: 41, name: "Education & Entertainment", type: "Services", desc: "Education; training; entertainment; sporting activities" },
  { id: 42, name: "Scientific & IT Services", type: "Services", desc: "Scientific and technological services; software design" },
  { id: 43, name: "Food & Hospitality", type: "Services", desc: "Services for providing food and drink; temporary accommodation" },
  { id: 44, name: "Medical & Beauty", type: "Services", desc: "Medical services; veterinary; beauty care" },
  { id: 45, name: "Legal & Security", type: "Services", desc: "Legal services; security services; personal services" },
] as const;

export const INDIAN_FIRST_NAMES = ["Aarav","Vivaan","Aditya","Vihaan","Arjun","Sai","Reyansh","Ayaan","Krishna","Ishaan","Rohan","Karthik","Aanya","Aadhya","Diya","Saanvi","Anika","Ira","Myra","Priya","Ananya","Pari","Riya","Kavya","Aisha","Neha","Pooja","Rahul","Vikram","Sandeep","Rajesh","Manish","Suresh","Kiran","Anjali","Meera","Deepa","Sneha"];
export const INDIAN_LAST_NAMES = ["Sharma","Verma","Gupta","Singh","Kumar","Patel","Reddy","Iyer","Nair","Mehta","Shah","Joshi","Agarwal","Chopra","Kapoor","Malhotra","Bose","Das","Chatterjee","Banerjee","Rao","Pillai","Menon","Krishnan","Naidu"];
export const INDIAN_CITIES = ["Mumbai","Delhi","Bengaluru","Hyderabad","Chennai","Kolkata","Pune","Ahmedabad","Jaipur","Surat","Lucknow","Kanpur","Nagpur","Indore","Bhopal","Coimbatore","Kochi","Chandigarh","Gurgaon","Noida"];
export const INDIAN_STATES = ["Maharashtra","Delhi","Karnataka","Telangana","Tamil Nadu","West Bengal","Gujarat","Rajasthan","Uttar Pradesh","Madhya Pradesh","Kerala","Punjab","Haryana"];
export const COMPANIES = ["Wipro Solutions","Infosys Tech","TCS Global","Reliance Ventures","Tata Innovate","Mahindra Labs","Adani Group","Bajaj Holdings","Godrej Industries","HCL Systems","ZeeStar Media","Flipkart Retail","Paytm Wallet","BYJU's Learn","Swiggy Foods","Zomato Eats","Ola Mobility","OYO Rooms","Nykaa Beauty","CRED Club","Razorpay Finance","Freshworks CRM","Zerodha Broking","Meesho Mart","Lenskart Vision"];
export const TRADEMARK_WORDS = ["Brio","Zenith","Lumina","Vertex","Orbit","Nova","Pulse","Aura","Crest","Quanta","Vital","Bloom","Spark","Apex","Vista","Forge","Helix","Atlas","Echo","Prism","Saffron","Lotus","Ganga","Surya","Chandra","Tara","Kavi","Ravi","Veda","Karma","Yoga","Spice","Mantra","Dosa","Chai","Mithai","Bandhan"];
export const TRADEMARK_SUFFIX = ["Labs","Tech","India","Innovations","Solutions","Foods","Hub","Studio","Works","Co","Care","Mart","Ventures","Digital","Bio","AI","Pro","Edge"];

const seedRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const pick = <T>(arr: readonly T[], rnd: () => number) => arr[Math.floor(rnd() * arr.length)];

export const generatePAN = (rnd: () => number) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let pan = "";
  for (let i = 0; i < 5; i++) pan += letters[Math.floor(rnd() * 26)];
  for (let i = 0; i < 4; i++) pan += digits[Math.floor(rnd() * 10)];
  pan += letters[Math.floor(rnd() * 26)];
  return pan;
};

export const generateGSTIN = (rnd: () => number) => {
  const digits = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let g = "";
  for (let i = 0; i < 2; i++) g += digits[Math.floor(rnd() * 10)];
  g += generatePAN(rnd);
  g += digits[Math.floor(rnd() * 10)];
  g += "Z";
  g += letters[Math.floor(rnd() * 26)];
  return g;
};

export const generateMobile = (rnd: () => number) => {
  const prefix = ["7","8","9"][Math.floor(rnd() * 3)];
  let n = prefix;
  for (let i = 0; i < 9; i++) n += Math.floor(rnd() * 10);
  return n;
};

export const generateApplicationNumber = (rnd: () => number) => {
  const num = Math.floor(rnd() * 900000 + 100000);
  return `TM-2026-${num}`;
};

export type TrademarkStatus = "Available" | "Similar Found" | "High Risk";
export type SearchResult = {
  id: string;
  name: string;
  classId: number;
  status: TrademarkStatus;
  similarity: number;
  owner: string;
  filedOn: string;
};

export const MOCK_SEARCH_RESULTS: SearchResult[] = (() => {
  const rnd = seedRandom(1234);
  const results: SearchResult[] = [];
  for (let i = 0; i < 100; i++) {
    const word = pick(TRADEMARK_WORDS, rnd);
    const suffix = pick(TRADEMARK_SUFFIX, rnd);
    const sim = Math.floor(rnd() * 100);
    const status: TrademarkStatus = sim < 30 ? "Available" : sim < 70 ? "Similar Found" : "High Risk";
    const dt = new Date(2023 + Math.floor(rnd() * 3), Math.floor(rnd() * 12), Math.floor(rnd() * 28) + 1);
    results.push({
      id: `SR-${1000 + i}`,
      name: `${word} ${suffix}`,
      classId: Math.floor(rnd() * 45) + 1,
      status,
      similarity: sim,
      owner: pick(COMPANIES, rnd),
      filedOn: dt.toISOString().slice(0, 10),
    });
  }
  return results;
})();

export type ApplicationStatus = "Draft" | "Submitted" | "Under Examination" | "Published" | "Registered" | "Objected";
export type Application = {
  id: string;
  applicationNumber: string;
  trademarkName: string;
  applicantName: string;
  applicantType: string;
  classes: number[];
  status: ApplicationStatus;
  paymentStatus: "Pending" | "Success" | "Failed";
  filedOn: string;
  plan: string;
  amount: number;
  timeline: { stage: string; date: string; note: string; done: boolean }[];
};

const STATUS_FLOW: ApplicationStatus[] = ["Draft","Submitted","Under Examination","Published","Registered"];

export const MOCK_APPLICATIONS: Application[] = (() => {
  const rnd = seedRandom(42);
  const apps: Application[] = [];
  for (let i = 0; i < 150; i++) {
    const word = pick(TRADEMARK_WORDS, rnd);
    const suffix = pick(TRADEMARK_SUFFIX, rnd);
    const statusIdx = Math.floor(rnd() * STATUS_FLOW.length);
    const isObj = rnd() < 0.08;
    const status: ApplicationStatus = isObj ? "Objected" : STATUS_FLOW[statusIdx];
    const filedDate = new Date(2025, Math.floor(rnd() * 12), Math.floor(rnd() * 28) + 1);
    const fname = pick(INDIAN_FIRST_NAMES, rnd);
    const lname = pick(INDIAN_LAST_NAMES, rnd);
    const numClasses = Math.floor(rnd() * 3) + 1;
    const classes: number[] = [];
    for (let c = 0; c < numClasses; c++) {
      const cls = Math.floor(rnd() * 45) + 1;
      if (!classes.includes(cls)) classes.push(cls);
    }
    const planRnd = rnd();
    const plan = planRnd < 0.4 ? "Starter" : planRnd < 0.8 ? "Professional" : "Premium";
    const amount = plan === "Starter" ? 2499 : plan === "Professional" ? 4499 : 6999;
    const stages = ["Application Submitted","Examination","Accepted","Published","Registered"];
    const completedUpTo = Math.min(statusIdx, stages.length - 1);
    const timeline = stages.map((stage, idx) => ({
      stage,
      date: new Date(filedDate.getTime() + idx * 30 * 86400000).toISOString().slice(0, 10),
      note: idx === 0 ? "Application filed online" : idx === 1 ? "Under examiner review" : idx === 2 ? "No objections raised" : idx === 3 ? "Published in TM Journal" : "Registration certificate issued",
      done: idx <= completedUpTo && !isObj,
    }));
    apps.push({
      id: `app-${i}`,
      applicationNumber: generateApplicationNumber(rnd),
      trademarkName: `${word} ${suffix}`,
      applicantName: `${fname} ${lname}`,
      applicantType: pick(["Individual","Proprietorship","Private Limited","LLP","Startup","MSME"], rnd),
      classes,
      status,
      paymentStatus: rnd() < 0.85 ? "Success" : rnd() < 0.5 ? "Pending" : "Failed",
      filedOn: filedDate.toISOString().slice(0, 10),
      plan,
      amount,
      timeline,
    });
  }
  return apps;
})();

export type ServiceType =
  | "Trademark"
  | "Patent"
  | "Copyright"
  | "Industrial Design"
  | "IPR Consultation"
  | "Licensing & Technology Transfer"
  | "IP Enforcement & Litigation Support";

export const SERVICE_TYPE_OPTIONS: ServiceType[] = [
  "Trademark",
  "Patent",
  "Copyright",
  "Industrial Design",
  "IPR Consultation",
  "Licensing & Technology Transfer",
  "IP Enforcement & Litigation Support",
];

export type Lead = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  trademarkName: string;
  serviceType?: ServiceType;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
  source: string;
  createdAt: string;
};

export const MOCK_LEADS: Lead[] = (() => {
  const rnd = seedRandom(99);
  const arr: Lead[] = [];
  const sources = ["Google Ads","Organic","Referral","Facebook","LinkedIn","Direct","IPR Services Page"];
  for (let i = 0; i < 250; i++) {
    const fname = pick(INDIAN_FIRST_NAMES, rnd);
    const lname = pick(INDIAN_LAST_NAMES, rnd);
    const created = new Date(2025, Math.floor(rnd() * 12), Math.floor(rnd() * 28) + 1);
    arr.push({
      id: `LD-${10000 + i}`,
      name: `${fname} ${lname}`,
      mobile: generateMobile(rnd),
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@${pick(["gmail.com","yahoo.in","outlook.com","rediffmail.com"], rnd)}`,
      trademarkName: `${pick(TRADEMARK_WORDS, rnd)} ${pick(TRADEMARK_SUFFIX, rnd)}`,
      serviceType: pick(SERVICE_TYPE_OPTIONS, rnd),
      status: pick(["New","Contacted","Qualified","Converted","Lost"] as const, rnd),
      source: pick(sources, rnd),
      createdAt: created.toISOString().slice(0, 10),
    });
  }
  return arr;
})();

export const MOCK_USERS = (() => {
  const rnd = seedRandom(7);
  return Array.from({ length: 100 }, (_, i) => {
    const fname = pick(INDIAN_FIRST_NAMES, rnd);
    const lname = pick(INDIAN_LAST_NAMES, rnd);
    return {
      id: `U-${1000 + i}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}${i}@${pick(["gmail.com","outlook.com"], rnd)}`,
      mobile: generateMobile(rnd),
      city: pick(INDIAN_CITIES, rnd),
      joinedAt: new Date(2024 + Math.floor(rnd() * 2), Math.floor(rnd() * 12), Math.floor(rnd() * 28) + 1).toISOString().slice(0, 10),
      applications: Math.floor(rnd() * 5),
    };
  });
})();

export const MOCK_PAYMENTS = (() => {
  const rnd = seedRandom(311);
  return Array.from({ length: 50 }, (_, i) => {
    const app = MOCK_APPLICATIONS[i % MOCK_APPLICATIONS.length];
    return {
      id: `PAY-${100000 + i}`,
      txnId: `pay_${Math.random().toString(36).slice(2, 12)}`,
      applicantName: app.applicantName,
      applicationNumber: app.applicationNumber,
      amount: app.amount,
      plan: app.plan,
      status: pick(["Success","Pending","Failed"] as const, rnd),
      date: app.filedOn,
    };
  });
})();

export const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Founder, BloomBeauty", text: "TrademarkX made it ridiculously easy to file my brand. Got my registration in months without a single rejection.", rating: 5 },
  { name: "Vikram Mehta", role: "CEO, Mehta Foods", text: "Their team handled the entire examination response. I just signed digitally and was done.", rating: 5 },
  { name: "Anjali Kapoor", role: "Co-founder, Lumina Labs", text: "Worth every rupee. The class consultation alone saved us from filing in the wrong category.", rating: 5 },
  { name: "Rohan Iyer", role: "Director, Vertex Tech", text: "Filed three trademarks for our SaaS products. Smooth, transparent, and genuinely affordable.", rating: 5 },
  { name: "Sneha Reddy", role: "Owner, Saffron Cafe", text: "I'm not a legal person at all. Their step-by-step form held my hand through the whole thing.", rating: 4 },
  { name: "Karthik Pillai", role: "Founder, OrbitAI", text: "Premium plan was a steal. Got hearing support included, and we walked out with our mark approved.", rating: 5 },
  { name: "Aisha Khan", role: "MD, NovaCare Pharma", text: "Filed our flagship brand in 3 classes. The dashboard kept us updated at every stage.", rating: 5 },
  { name: "Sandeep Joshi", role: "Partner, Bandhan Legal", text: "Even as a lawyer, I use TrademarkX for clients. Their tech stack beats anything else in India.", rating: 5 },
];

export const FAQS = [
  { q: "How long is a trademark valid in India?", a: "A registered trademark in India is valid for 10 years from the date of filing and can be renewed indefinitely in further 10-year blocks." },
  { q: "How long does trademark registration take?", a: "If there are no objections or oppositions, registration typically completes in 12-18 months. The TM mark (™) can be used immediately after filing." },
  { q: "What are the government fees for trademark filing?", a: "Government fee is ₹4,500 per class for individuals/startups/MSMEs and ₹9,000 per class for other applicants. Our service fees are separate and shown upfront." },
  { q: "What happens if my trademark gets an objection?", a: "An examination report is issued and you have 30 days to file a written response. Our Professional and Premium plans include objection response support." },
  { q: "How do I choose the right trademark class?", a: "Classes are based on the goods or services you offer. We provide free class consultation, and our search tool suggests the most relevant class automatically." },
  { q: "Can I register a logo and a wordmark together?", a: "Yes. A 'device mark' or 'combined mark' covers both the logo design and the wordmark in a single application. We support this in Step 3 of the application." },
  { q: "Do startups get any discount on government fees?", a: "Yes. DPIIT-recognized startups, individuals, and MSMEs pay only ₹4,500 per class instead of ₹9,000. You'll need a valid DPIIT or MSME certificate." },
  { q: "Can I file a trademark in multiple classes at once?", a: "Yes. You can file a multi-class application covering several classes, though government fees are charged per class." },
  { q: "What if someone else already has a similar trademark?", a: "Our search tool flags similar marks before you file. If you proceed, your application may face opposition. We recommend a thorough phonetic search beforehand." },
  { q: "Is trademark registration mandatory in India?", a: "No, it's not mandatory, but it gives you exclusive nationwide rights, legal recourse against infringement, and protects your brand value." },
  { q: "Can I sell or license my trademark?", a: "Yes. A registered trademark is a transferable asset. You can assign or license it through proper agreements." },
  { q: "What documents do I need for individual filing?", a: "PAN card and a government-issued ID (Aadhaar/Passport/Driving License) along with a clear copy of the logo if applicable." },
  { q: "What documents do I need for company filing?", a: "Company PAN, GST certificate, Certificate of Incorporation, and authorisation letter signed by an authorised signatory." },
  { q: "When can I use the ® symbol?", a: "Only after the trademark is officially registered. Until then, use ™ to denote that it's been filed." },
  { q: "What if my trademark gets opposed by a third party?", a: "After publication in the journal, third parties have 4 months to oppose. Our Premium plan includes opposition defence and hearing representation." },
];

// ===== IP service categories (Trademark / Patent / Copyright / Design / International) =====

export type ServiceCategoryKey = "Trademark" | "Patent" | "Copyright" | "Design Registration" | "International Trademark";

export const SERVICE_CATEGORIES: { key: ServiceCategoryKey; title: string; tagline: string; items: { name: string; desc: string }[] }[] = [
  {
    key: "Trademark",
    title: "Trademark Services",
    tagline: "Protect your brand name, logo and tagline across India.",
    items: [
      { name: "Trademark Search", desc: "Comprehensive availability check across all 45 NICE classes." },
      { name: "Trademark Filing", desc: "End-to-end filing with the Indian Trade Marks Registry." },
      { name: "Objection Response", desc: "Drafting and filing replies to examination reports." },
      { name: "Opposition Defence", desc: "Defend your mark against third-party oppositions." },
      { name: "Renewal & Assignment", desc: "Renew or transfer ownership of existing trademarks." },
    ],
  },
  {
    key: "Patent",
    title: "Patent Services",
    tagline: "End-to-end protection for your inventions and innovations.",
    items: [
      { name: "Patent Search", desc: "Worldwide prior-art and novelty search by domain experts." },
      { name: "Patent Drafting", desc: "Specifications, claims and figures drafted by registered agents." },
      { name: "Provisional Patent Filing", desc: "Lock your priority date while you continue R&D." },
      { name: "Complete Patent Filing", desc: "Full specification filing with the Indian Patent Office." },
      { name: "Patent Prosecution", desc: "Examination responses, hearings and grant assistance." },
      { name: "International Patent Filing (PCT)", desc: "PCT filing for protection in 150+ jurisdictions." },
    ],
  },
  {
    key: "Copyright",
    title: "Copyright Services",
    tagline: "Secure original work — code, content, music and design.",
    items: [
      { name: "Copyright Registration", desc: "Register any original creative work with the Copyright Office." },
      { name: "Software Copyright", desc: "Source-code protection for SaaS, apps and platforms." },
      { name: "Website Copyright", desc: "Protect website design, copy and structure." },
      { name: "Literary Work Copyright", desc: "Books, articles, scripts and other literary works." },
      { name: "Artistic Work Copyright", desc: "Paintings, illustrations, photographs and logos." },
      { name: "Music Copyright", desc: "Compositions, lyrics and sound recordings." },
    ],
  },
  {
    key: "Design Registration",
    title: "Design Registration Services",
    tagline: "Register the unique look and feel of your products.",
    items: [
      { name: "Industrial Design Registration", desc: "Protect novel industrial designs under the Designs Act, 2000." },
      { name: "Product Design Protection", desc: "Shape, configuration and ornamentation of products." },
      { name: "Packaging Design Registration", desc: "Distinctive packaging that sets your product apart." },
      { name: "Design Renewal", desc: "Renew existing design registrations and manage portfolios." },
    ],
  },
];

export const GLOBAL_JURISDICTIONS: { code: string; name: string; office: string; price: string; turnaround: string }[] = [
  { code: "IN", name: "India", office: "IP India", price: "₹3,499 + Govt. Fees", turnaround: "10-18 months" },
  { code: "US", name: "USA", office: "USPTO", price: "$650 + Government Fees", turnaround: "8-12 months" },
  { code: "UK", name: "United Kingdom", office: "UKIPO", price: "Request Custom Quote", turnaround: "4-6 months" },
  { code: "EU", name: "Europe (EUIPO)", office: "EUIPO", price: "Request Custom Quote", turnaround: "4-6 months" },
  { code: "AU", name: "Australia", office: "IP Australia", price: "Request Custom Quote", turnaround: "7-10 months" },
  { code: "CA", name: "Canada", office: "CIPO", price: "Request Custom Quote", turnaround: "18-24 months" },
];

export const COUNTRY_OPTIONS = ["India","USA","UK","Europe (EUIPO)","Australia","Canada","Other"] as const;

export type ServiceInquiry = {
  id: string;
  category: ServiceCategoryKey;
  serviceName: string;
  country: string;
  businessName: string;
  brandName: string;
  goodsDescription: string;
  contactName: string;
  email: string;
  mobile: string;
  status: "New" | "Contacted" | "Quoted" | "Converted" | "Lost";
  assignedTo: string;
  createdAt: string;
};

const EXECUTIVES = ["Riya Sharma","Karan Mehta","Aditya Verma","Pooja Iyer","Neha Joshi","Vikram Singh"];

export const MOCK_SERVICE_INQUIRIES: ServiceInquiry[] = (() => {
  const rnd = seedRandom(555);
  const cats: ServiceCategoryKey[] = ["Trademark","Patent","Copyright","Design Registration","International Trademark"];
  const countries = ["India","USA","UK","Europe (EUIPO)","Australia","Canada"];
  const arr: ServiceInquiry[] = [];
  for (let i = 0; i < 80; i++) {
    const cat = pick(cats, rnd);
    const country = cat === "International Trademark" ? pick(countries, rnd) : "India";
    const fname = pick(INDIAN_FIRST_NAMES, rnd);
    const lname = pick(INDIAN_LAST_NAMES, rnd);
    const brand = `${pick(TRADEMARK_WORDS, rnd)} ${pick(TRADEMARK_SUFFIX, rnd)}`;
    const svc = cat === "Patent" ? "Provisional Patent Filing" : cat === "Copyright" ? "Copyright Registration" : cat === "Design Registration" ? "Industrial Design Registration" : cat === "International Trademark" ? `${country} Trademark Filing` : "Trademark Filing";
    arr.push({
      id: `INQ-${20000 + i}`,
      category: cat,
      serviceName: svc,
      country,
      businessName: pick(COMPANIES, rnd),
      brandName: brand,
      goodsDescription: pick(["Software & SaaS","Food & Beverage","Apparel","Pharmaceuticals","Cosmetics","Hardware","Education","Fintech"], rnd),
      contactName: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}@${pick(["gmail.com","outlook.com","company.in"], rnd)}`,
      mobile: generateMobile(rnd),
      status: pick(["New","Contacted","Quoted","Converted","Lost"] as const, rnd),
      assignedTo: pick(EXECUTIVES, rnd),
      createdAt: new Date(2025, Math.floor(rnd() * 12), Math.floor(rnd() * 28) + 1).toISOString().slice(0, 10),
    });
  }
  return arr;
})();

// ===== IPR Services page content =====

export type IprServiceSection = {
  id: string;
  title: string;
  description: string;
  extraDescription?: string;
  services: string[];
};

export const IPR_SERVICE_SECTIONS: IprServiceSection[] = [
  {
    id: "trademark-services",
    title: "Trademark Services",
    description: "Protect your brand identity and market reputation through comprehensive trademark solutions.",
    services: [
      "Trademark Availability Searches",
      "Trademark Registration in India",
      "International Trademark Filing (Madrid Protocol)",
      "Examination Report Responses",
      "Opposition and Rectification Proceedings",
      "Trademark Renewal and Portfolio Management",
      "Trademark Assignment and Licensing",
      "Brand Protection and Enforcement",
    ],
  },
  {
    id: "patent-services",
    title: "Patent Services",
    description: "Safeguard your inventions and technological innovations with strategic patent protection.",
    services: [
      "Patentability Searches",
      "Prior Art Searches",
      "Patent Drafting and Filing",
      "Provisional and Complete Specifications",
      "Patent Prosecution and Examination Responses",
      "Patent Opposition Matters",
      "Patent Portfolio Management",
      "Patent Licensing and Commercialization",
      "Freedom-to-Operate (FTO) Analysis",
    ],
  },
  {
    id: "copyright-services",
    title: "Copyright Services",
    description: "Protect original literary, artistic, musical, software, and digital works.",
    extraDescription:
      "Copyright protection commonly covers creative content, software code, website content, artwork, photographs, and related original works.",
    services: [
      "Copyright Registration",
      "Software Copyright Protection",
      "Content and Creative Works Protection",
      "Copyright Assignment and Licensing",
      "Copyright Infringement Advisory",
      "Enforcement and Dispute Resolution",
    ],
  },
  {
    id: "industrial-design-services",
    title: "Industrial Design Services",
    description: "Secure exclusive rights over the aesthetic appearance of your products.",
    services: [
      "Design Searches",
      "Industrial Design Registration",
      "Design Prosecution",
      "Design Renewal and Maintenance",
      "Design Infringement Advisory",
      "Design Portfolio Management",
    ],
  },
  {
    id: "ip-due-diligence",
    title: "IP Due Diligence & Portfolio Management",
    description:
      "Strategic management of intellectual property assets to maximize protection, valuation, and commercial opportunities.",
    services: [
      "IP Audits",
      "Portfolio Review and Strategy",
      "IP Asset Valuation Support",
      "Due Diligence for Investments and Acquisitions",
      "IP Risk Assessment",
      "IP Commercialization Strategies",
    ],
  },
  {
    id: "licensing-technology-transfer",
    title: "Licensing & Technology Transfer",
    description:
      "Helping businesses monetize and transfer intellectual property assets through legally compliant agreements.",
    services: [
      "Drafting and Negotiation of Licensing Agreements",
      "Technology Transfer Agreements",
      "Franchise and Brand Licensing",
      "Research and Development Agreements",
      "Assignment and Commercial Exploitation of IP Assets",
    ],
  },
  {
    id: "ip-enforcement",
    title: "IP Enforcement & Litigation Support",
    description:
      "Protect your intellectual property rights against unauthorized use, infringement, and counterfeiting.",
    services: [
      "Cease and Desist Notices",
      "Anti-Counterfeiting Strategies",
      "Domain Name Disputes",
      "IP Infringement Actions",
      "Settlement Negotiations",
      "Litigation and Dispute Resolution Support",
    ],
  },
];

export const IPR_QUICK_LINKS = [
  { label: "Trademark Services", href: "/#trademark-services" },
  { label: "Patent Services", href: "/#patent-services" },
  { label: "Copyright Services", href: "/#copyright-services" },
  { label: "Design Registration", href: "/#industrial-design-services" },
  { label: "Licensing & Technology Transfer", href: "/#licensing-technology-transfer" },
  { label: "IP Enforcement & Litigation Support", href: "/#ip-enforcement" },
] as const;

export { EXECUTIVES };
