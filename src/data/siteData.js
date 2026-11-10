import maleDocImg from "../assets/images/male_doc.png";
import femaleDocImg from "../assets/images/female_doc.png";
import heroDocImg from "../assets/images/Untitled-1.jpg";
import robotImg from "../assets/images/robot.png";
import { ROUTES } from "../router/routes";

export const CITIES = [
  "Indore, India",
  "Bhopal, India",
  "Mumbai, India",
  "Delhi NCR, India",
  "Bengaluru, India",
  "Pune, India",
];

export const CARE_PLAN_DETAILS = {
  name: "Docdor Care Plan",
  tagline: "Unlimited preventive care, priority consultations & instant pharmacy savings.",
  plans: [
    {
      id: "monthly",
      label: "Monthly",
      price: "₹299",
      period: "/ month",
      savings: "Ideal for short-term family checkups",
    },
    {
      id: "annual",
      label: "Annual",
      price: "₹2,499",
      period: "/ year",
      savings: "Save 30% + Free Annual Full-Body Panel",
      popular: true,
    },
  ],
  benefits: [
    "Unlimited 24/7 AI Health Assistant & Report Summaries",
    "Free Priority Video Consultations with General Physicians",
    "Flat 20% Off Lab Tests & Diagnostic Packages",
    "Zero Delivery Fee on Medicine Orders Above ₹199",
    "Coverage for up to 4 Family Members on Annual Plan",
  ],
};

export const LEADERSHIP_TEAM = [
  {
    id: 1,
    name: "Dr. Aarav Deshmukh",
    role: "Chief Medical Officer",
    specialty: "MD, Internal Medicine • 14+ yrs experience",
    bio: "Oversees clinical quality standards, doctor credentialing, and evidence-based teleconsultation protocols across Docdor.",
    image: maleDocImg,
    badge: "Clinical Governance",
  },
  {
    id: 2,
    name: "Dr. Ananya Kulkarni",
    role: "Head of Diagnostics & Preventive Care",
    specialty: "MD, Pathology • 11+ yrs experience",
    bio: "Leads partnerships with NABL-certified laboratories to deliver reliable home sample collection and rapid digital reports.",
    image: femaleDocImg,
    badge: "Diagnostics Lead",
  },
  {
    id: 3,
    name: "Dr. Rohan Mehta",
    role: "Director of Telehealth & Surgery Care",
    specialty: "MS, General Surgery • 12+ yrs experience",
    bio: "Coordinates surgical second opinions, hospital partnerships, and seamless post-operative follow-up journeys.",
    image: heroDocImg,
    badge: "Surgical Care",
  },
  {
    id: 4,
    name: "Docdor Clinical AI Team",
    role: "AI Health Safety & Triage Division",
    specialty: "Physician-Reviewed Triage Models",
    bio: "Builds clear, responsible symptom guidance, e-prescription explainers, and lab report insights validated by clinicians.",
    image: robotImg,
    badge: "AI Safety",
  },
];

export const COMPANY_MILESTONES = [
  {
    year: "2022",
    title: "Founded in Indore",
    description:
      "Started with a mission to cut clinic waiting times by connecting local patients with verified physicians digitally.",
  },
  {
    year: "2023",
    title: "Diagnostics & E-Pharmacy Network",
    description:
      "Expanded into doorstep lab sample collection and verified pharmacy delivery across central and western India.",
  },
  {
    year: "2024",
    title: "AI Health Assistant Launch",
    description:
      "Introduced 24/7 symptom guidance, prescription readability tools, and plain-language blood report summaries.",
  },
  {
    year: "2026",
    title: "50,000+ Patients & Care Plan",
    description:
      "Serving 6+ major cities with 500+ doctors, unified Care Plans, surgical guidance, and dedicated pet care consultations.",
  },
];

export const CITY_HUBS = [
  {
    id: "indore",
    city: "Indore HQ",
    address: "4th Floor, Aurelia MedTech Plaza, Vijay Nagar, Indore, MP 452010",
    hours: "Mon–Sun: 7:00 AM – 11:00 PM (24/7 Telehealth)",
    phone: "+91 98765 43210",
    email: "indore@docdor.com",
    highlights: ["Headquarters & Care Hub", "60-Min Express Pharmacy", "Morning Home Lab Slots from 6:30 AM"],
  },
  {
    id: "bhopal",
    city: "Bhopal",
    address: "Suite 208, Arera Care Enclave, MP Nagar Zone II, Bhopal, MP 462011",
    hours: "Mon–Sun: 7:30 AM – 10:00 PM",
    phone: "+91 98765 43211",
    email: "bhopal@docdor.com",
    highlights: ["18 Partner Clinics", "NABL Lab Collection Network", "Same-Day Prescription Delivery"],
  },
  {
    id: "mumbai",
    city: "Mumbai",
    address: "Level 6, Horizon Health Tower, Andheri West, Mumbai, MH 400053",
    hours: "Mon–Sun: 24/7 Urgent Telehealth & Dispatch",
    phone: "+91 98765 43212",
    email: "mumbai@docdor.com",
    highlights: ["Multi-Specialty Surgery Desk", "24/7 Medicine Fulfillment", "90+ Senior Specialists"],
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    address: "2nd Floor, MedSphere Tech Park, Indiranagar, Bengaluru, KA 560038",
    hours: "Mon–Sun: 7:00 AM – 11:30 PM",
    phone: "+91 98765 43213",
    email: "bengaluru@docdor.com",
    highlights: ["AI & Engineering Center", "Preventive Wellness Labs", "Corporate Care Plan Support"],
  },
];

export const JOB_OPENINGS = [
  {
    id: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer (React & Node.js)",
    department: "Engineering & AI",
    location: "Indore / Bengaluru",
    mode: "Hybrid",
    type: "Full-Time",
    experience: "4–7 years",
    compensation: "₹22L – ₹34L + ESOPs",
    summary:
      "Architect patient-facing consultation flows, real-time video scheduling, and ultra-responsive digital health dashboards.",
    responsibilities: [
      "Build scalable, accessible React and Node.js services powering 50K+ active patients.",
      "Collaborate closely with clinical product teams to streamline teleconsultation and lab workflows.",
      "Maintain strict HIPAA/DISHA-aligned data encryption and auditability standards.",
    ],
    requirements: [
      "4+ years with React, modern JavaScript/TypeScript, and REST/GraphQL APIs.",
      "Strong grasp of web performance, state management, and secure authentication.",
      "Passion for building high-trust consumer healthcare experiences.",
    ],
  },
  {
    id: "clinical-ai-safety-specialist",
    title: "Clinical AI Safety & Triage Specialist (MD/MBBS)",
    department: "Clinical & Medical",
    location: "Remote (India)",
    mode: "Remote",
    type: "Full-Time",
    experience: "3–6 years",
    compensation: "₹18L – ₹28L + Benefits",
    summary:
      "Review AI symptom assistant outputs, calibrate medical escalation guardrails, and author clear patient guidance protocols.",
    responsibilities: [
      "Audit AI-generated symptom summaries and report interpretations for clinical accuracy.",
      "Design red-flag escalation triggers that connect high-risk users immediately to doctors.",
      "Partner with ML engineers to refine medical terminology translation for patients.",
    ],
    requirements: [
      "MBBS or MD with active medical registration in India.",
      "Experience in clinical triage, digital health, or medical editorial review.",
      "Strong analytical writing skills and patient-first empathy.",
    ],
  },
  {
    id: "telehealth-general-physician",
    title: "Consultant General Physician — Telehealth",
    department: "Clinical & Medical",
    location: "Indore / Remote",
    mode: "Remote",
    type: "Full-Time / Flexible",
    experience: "3+ years",
    compensation: "₹16L – ₹24L + Consultation Incentives",
    summary:
      "Deliver empathetic online video consultations, issue compliant digital e-prescriptions, and guide preventive care plans.",
    responsibilities: [
      "Conduct structured 15-minute video and follow-up consultations for acute and chronic care.",
      "Review uploaded lab reports and provide clear next-step diagnostics recommendations.",
      "Maintain thorough digital SOAP notes within Docdor's EHR system.",
    ],
    requirements: [
      "MBBS/MD (General Medicine or Family Medicine) with valid NMC state registration.",
      "Excellent bedside manner on video consultations in English and Hindi.",
      "Comfort with digital clinical workflows and electronic prescribing.",
    ],
  },
  {
    id: "product-designer-healthcare",
    title: "Senior Product Designer — Patient Experience",
    department: "Product & Design",
    location: "Indore / Pune",
    mode: "Hybrid",
    type: "Full-Time",
    experience: "3–5 years",
    compensation: "₹15L – ₹24L + ESOPs",
    summary:
      "Design calming, intuitive interfaces across doctor booking, medicine refills, and AI health reports for patients of all ages.",
    responsibilities: [
      "Own end-to-end UX journeys from user research and wireframes to Tailwind/Figma design systems.",
      "Champion WCAG accessibility so older adults and caregivers navigate effortlessly.",
      "Run usability testing sessions with real patients and partner physicians.",
    ],
    requirements: [
      "3+ years designing consumer mobile/web products (healthtech or fintech a plus).",
      "Strong portfolio showcasing clarity under complex workflows.",
      "Fluency in Figma, interaction micro-animations, and design tokens.",
    ],
  },
  {
    id: "pharmacy-operations-lead",
    title: "Pharmacy & Cold-Chain Operations Lead",
    department: "Operations & Growth",
    location: "Indore, India",
    mode: "On-site",
    type: "Full-Time",
    experience: "4+ years",
    compensation: "₹12L – ₹18L",
    summary:
      "Lead partner pharmacy verification, prescription compliance checks, and 60-minute temperature-controlled medicine dispatch.",
    responsibilities: [
      "Ensure 100% pharmacist verification for Schedule H/H1 prescriptions prior to dispatch.",
      "Optimize city-wide dark-store inventory and cold-chain courier SLAs.",
      "Manage vendor quality audits and customer replacement turnaround.",
    ],
    requirements: [
      "B.Pharm / M.Pharm or Operations Management degree with e-pharmacy logistics background.",
      "Deep knowledge of Indian pharmaceutical retail compliance.",
      "Data-driven approach to SLA tracking and inventory accuracy.",
    ],
  },
  {
    id: "diagnostics-network-manager",
    title: "Diagnostics & NABL Lab Partnerships Manager",
    department: "Operations & Growth",
    location: "Mumbai / Indore",
    mode: "Hybrid",
    type: "Full-Time",
    experience: "3–6 years",
    compensation: "₹14L – ₹20L",
    summary:
      "Onboard top-tier diagnostic laboratories, standardize home phlebotomy protocols, and drive sub-12-hour report turnaround.",
    responsibilities: [
      "Build and manage commercial SLAs with NABL-accredited diagnostic partners.",
      "Train and monitor home sample collection phlebotomists on hygiene and patient care.",
      "Expand preventive health packages across newly launched Docdor cities.",
    ],
    requirements: [
      "3+ years in diagnostics operations, hospital partnerships, or healthcare B2B growth.",
      "Proven track record scaling multi-city clinical service partners.",
      "Strong negotiation, quality auditing, and stakeholder skills.",
    ],
  },
];

export const BLOG_POSTS = [
  {
    id: "understanding-cbc-blood-report",
    title: "How to Read Your Annual CBC & Metabolic Blood Report Without Panic",
    category: "Diagnostics",
    readTime: "6 min read",
    date: "Nov 04, 2026",
    author: "Dr. Ananya Kulkarni",
    authorRole: "MD, Pathology",
    image: femaleDocImg,
    featured: true,
    tags: ["Blood Tests", "Preventive Care", "Lab Reports"],
    excerpt:
      "Borderline flags on a blood report rarely mean an emergency. Learn what hemoglobin, WBCs, HbA1c, and liver markers actually tell your physician.",
    takeaways: [
      "Reference ranges reflect 95% of healthy adults—slight variations can be completely normal for your baseline.",
      "Look at trends over time rather than one isolated test value.",
      "Hydration, fasting duration, and recent viral infections can temporarily shift blood counts.",
    ],
    content: [
      "Receiving a multi-page PDF blood report before your doctor's appointment often triggers unnecessary stress—especially when bold red arrows highlight numbers just outside a lab's standard reference interval.",
      "A Complete Blood Count (CBC) evaluates three major cell groups: red blood cells (hemoglobin, hematocrit, MCV) that carry oxygen; white blood cells (neutrophils, lymphocytes) that respond to infection and inflammation; and platelets that support healthy clotting.",
      "For example, mildly elevated lymphocytes frequently linger for two to three weeks after a routine seasonal cold. Similarly, fasting glucose or triglyceride readings can skew upward if dinner ran late the night before sample collection.",
      "Instead of self-diagnosing individual markers, share your full report trends with a primary physician—or upload it to Docdor's Medical Report Analyzer to prepare clear questions ahead of your consultation.",
    ],
  },
  {
    id: "telehealth-vs-in-person-visit",
    title: "Video Consultation vs. In-Person Clinic Visit: Choosing the Right Care",
    category: "Preventive Care",
    readTime: "5 min read",
    date: "Oct 28, 2026",
    author: "Dr. Aarav Deshmukh",
    authorRole: "MD, Internal Medicine",
    image: maleDocImg,
    featured: false,
    tags: ["Teleconsultation", "Primary Care", "Doctor Visit"],
    excerpt:
      "Know when a 15-minute online consultation solves your concern quickly and when a physical examination is essential.",
    takeaways: [
      "Online consults shine for prescription renewals, lab reviews, mild infections, skin rashes, and mental wellness.",
      "Physical clinics are vital for chest pain, acute abdominal tenderness, fractures, or ear/lung auscultation.",
      "Hybrid care saves travel time while keeping hands-on diagnostics one tap away.",
    ],
    content: [
      "Modern healthcare isn't an either-or choice between digital convenience and physical clinics. Over 65% of everyday primary-care questions—such as seasonal fevers, migraine check-ins, allergy flare-ups, thyroid dosage reviews, and lab follow-ups—can be evaluated effectively over high-definition video.",
      "However, physical examination remains irreplaceable when a physician needs to listen directly to breath sounds, palpate abdominal organs, check joint stability, or measure acute neurological reflexes.",
      "On Docdor, physicians seamlessly transition you between online triage and nearby in-person clinic slots whenever hands-on evaluation or urgent imaging is warranted.",
    ],
  },
  {
    id: "responsible-ai-in-healthcare",
    title: "Inside Docdor's Physician-Reviewed AI Health Assistant",
    category: "AI & Digital Health",
    readTime: "7 min read",
    date: "Oct 19, 2026",
    author: "Docdor Clinical AI Team",
    authorRole: "Clinical Safety & ML",
    image: robotImg,
    featured: false,
    tags: ["AI Assistant", "Patient Safety", "Digital Health"],
    excerpt:
      "How clinical guardrails, plain-language prescription explanations, and red-flag detection make AI a safer companion—not a replacement for doctors.",
    takeaways: [
      "AI helps patients organize symptoms, decode prescription schedules, and understand medical jargon.",
      "Built-in red-flag detection escalates urgent symptoms immediately toward licensed doctors or emergency services.",
      "Patient health prompts are encrypted and never sold for ad targeting.",
    ],
    content: [
      "Patients regularly leave busy clinics unsure whether a medication should be taken before breakfast or bedtime, or which side effects require a follow-up call.",
      "Docdor's AI Health Assistant focuses on closing that comprehension gap. By pairing structured clinical guidelines with clear explanations, it translates dense prescriptions into daily schedules and explains blood panels in plain English.",
      "Crucially, our safety layer enforces strict boundaries: the assistant never claims a definitive diagnosis for emergency symptoms and always prioritizes licensed physician review when risk indicators appear.",
    ],
  },
  {
    id: "hydration-sleep-metabolic-health",
    title: "Five Evidence-Backed Micro-Habits That Improve Metabolic Health in 30 Days",
    category: "Nutrition & Lifestyle",
    readTime: "5 min read",
    date: "Oct 11, 2026",
    author: "Dr. Rohan Mehta",
    authorRole: "MS, Preventive & Surgical Care",
    image: heroDocImg,
    featured: false,
    tags: ["Nutrition", "Sleep", "Metabolic Health"],
    excerpt:
      "Small, sustainable shifts—like 10-minute post-meal walks and consistent sleep windows—outperform extreme crash diets.",
    takeaways: [
      "A 10-minute walk after dinner noticeably flattens post-meal blood sugar spikes.",
      "Protein-rich breakfasts reduce mid-afternoon energy crashes and cravings.",
      "Keeping wake times within 45 minutes daily stabilizes cortisol and insulin sensitivity.",
    ],
    content: [
      "Sustainable metabolic wellness rarely begins with drastic restrictions. Clinical studies consistently show that gentle, repeatable routines reshape fasting insulin, blood pressure, and resting heart rate faster than all-or-nothing plans.",
      "Start with three high-leverage anchors: eat fiber and protein before refined carbohydrates, take a brisk 10-minute walk after your heaviest meal, and protect a consistent 7-to-8-hour sleep schedule.",
      "Pairing these habits with a quarterly preventive checkup lets you track measurable improvements in HbA1c, lipid balance, and daily energy.",
    ],
  },
  {
    id: "safe-medicine-storage-prescription",
    title: "Why Completing Antibiotics & Proper Medicine Storage Matter More Than You Think",
    category: "Preventive Care",
    readTime: "4 min read",
    date: "Sep 29, 2026",
    author: "Dr. Aarav Deshmukh",
    authorRole: "MD, Internal Medicine",
    image: maleDocImg,
    featured: false,
    tags: ["Pharmacy", "E-Prescription", "Medication Safety"],
    excerpt:
      "Stopping prescriptions early or storing insulin and syrups in humid bathrooms can reduce potency and trigger resistance.",
    takeaways: [
      "Never store everyday tablets in warm, steamy bathroom cabinets—cool, dry drawers preserve potency.",
      "Finish prescribed antibiotic courses unless your physician advises stopping due to side effects.",
      "Check cold-chain delivery seals when ordering biologics, eye drops, or insulin.",
    ],
    content: [
      "Medication effectiveness depends not only on choosing the right molecule, but also on dosage timing and proper storage from pharmacy shelf to bedside table.",
      "High humidity and afternoon sunlight degrade active ingredients rapidly. Keep tablets in their original blister strips so expiry dates and batch codes stay intact, and verify refrigerated temperature pouches upon doorstep delivery.",
      "With Docdor's E-Prescription Assistant, you can scan any prescription to receive automated reminder schedules and food-interaction tips.",
    ],
  },
  {
    id: "seasonal-pet-wellness-guide",
    title: "Monsoon & Winter Pet Care Checklist: Skin, Hydration & Vet Red Flags",
    category: "Pet Wellness",
    readTime: "5 min read",
    date: "Sep 15, 2026",
    author: "Dr. Meera Nair",
    authorRole: "BVSc, Veterinary Consultant",
    image: femaleDocImg,
    featured: false,
    tags: ["Pet Care", "Veterinary", "Wellness"],
    excerpt:
      "From paw hygiene after rainy walks to tick prevention and digestive shifts, keep dogs and cats comfortable all year round.",
    takeaways: [
      "Dry paws thoroughly between toes after damp walks to prevent fungal dermatitis.",
      "Sudden lethargy, repeated vomiting, or loss of appetite for >24 hours warrants a vet video check.",
      "Keep annual vaccinations and deworming reminders logged digitally.",
    ],
    content: [
      "Pets experience seasonal shifts just as acutely as humans—especially during humid monsoon months and chilly winter mornings.",
      "Moisture trapped in dense coats or between paw pads frequently causes itchy hot spots, while stagnant puddles elevate gastrointestinal risk. Simple preventive habits—wiping paws, refreshing clean water bowls twice daily, and keeping tick collars updated—prevent most seasonal clinic visits.",
      "Through Docdor Pet Care, pet parents can hop on quick veterinary consultations without stressing anxious animals with unnecessary car rides.",
    ],
  },
];

export const HELP_CATEGORIES = [
  {
    id: "consultations",
    title: "Doctor Consultations",
    description: "Booking, rescheduling, video setup & digital prescriptions.",
    iconName: "Stethoscope",
  },
  {
    id: "medicines",
    title: "Medicines & Delivery",
    description: "Prescription uploads, tracking, cold-chain & replacements.",
    iconName: "Pill",
  },
  {
    id: "labs",
    title: "Lab Tests & Reports",
    description: "Fasting prep, home sample collection & digital PDF reports.",
    iconName: "FlaskConical",
  },
  {
    id: "ai",
    title: "AI Health Assistant",
    description: "Symptom helper, report analyzer & clinical safety rules.",
    iconName: "Bot",
  },
  {
    id: "billing",
    title: "Payments & Refunds",
    description: "UPI/card billing, Care Plan discounts & refund timelines.",
    iconName: "CreditCard",
  },
  {
    id: "account",
    title: "Account & Care Plan",
    description: "Family profiles, health vault & membership management.",
    iconName: "ShieldCheck",
  },
];

export const HELP_FAQS = [
  {
    id: "faq-1",
    category: "consultations",
    question: "How quickly can I connect with a doctor for an online consultation?",
    answer:
      "General physicians are typically available within 10–15 minutes for instant video consultations, 24/7. Specialist appointments (dermatology, pediatrics, orthopedics, gynecology) can be booked for same-day or preferred time slots.",
  },
  {
    id: "faq-2",
    category: "consultations",
    question: "Can I reschedule or cancel an upcoming clinic or video appointment?",
    answer:
      "Yes. You can reschedule free of charge up to 1 hour before your slot, or cancel at least 2 hours before the appointment start time for a 100% automatic refund to your original payment method.",
  },
  {
    id: "faq-3",
    category: "consultations",
    question: "Do I receive a valid digital prescription after a video consultation?",
    answer:
      "Yes. Every completed Docdor consultation includes a signed, NMC-compliant digital e-prescription stored directly in your health vault, ready for one-tap medicine ordering or pharmacy pickup.",
  },
  {
    id: "faq-4",
    category: "medicines",
    question: "Do I need a prescription to order medicines on Docdor?",
    answer:
      "Over-the-counter wellness items do not require a prescription. However, all Schedule H and H1 prescription medicines require a valid doctor's prescription, which is verified by a licensed pharmacist prior to dispatch.",
  },
  {
    id: "faq-5",
    category: "medicines",
    question: "What if I receive a damaged, expired, or incorrect medicine item?",
    answer:
      "Please report the issue within 48 hours of delivery via our Contact page or Help Desk with a clear photo of the packaging. We arrange an instant replacement or full refund without return pickup hassle.",
  },
  {
    id: "faq-6",
    category: "labs",
    question: "How long does it take to receive digital lab test reports?",
    answer:
      "Routine panels such as CBC, lipid profile, thyroid, and HbA1c are typically delivered within 8–14 hours of sample collection. Specialized cultures or hormone panels take 24–48 hours, with instant push and email alerts.",
  },
  {
    id: "faq-7",
    category: "labs",
    question: "How should I prepare for a fasting blood test at home?",
    answer:
      "For fasting glucose or lipid profiles, avoid food and caloric drinks (tea, coffee, juice) for 8–10 hours before your morning phlebotomist visit. Plain water is encouraged so you stay comfortably hydrated.",
  },
  {
    id: "faq-8",
    category: "ai",
    question: "Is the AI Health Assistant a replacement for a doctor?",
    answer:
      "No. Docdor's AI Health Assistant provides educational guidance, symptom organization, prescription summaries, and lab report explanations. It does not issue medical diagnoses and always recommends licensed doctor review or emergency care when red-flag symptoms appear.",
  },
  {
    id: "faq-9",
    category: "ai",
    question: "Are my uploaded reports and AI chat questions kept private?",
    answer:
      "Yes. All medical files and assistant conversations are encrypted in transit and at rest, never sold to advertisers, and remain under your account control. You can export or delete records anytime.",
  },
  {
    id: "faq-10",
    category: "billing",
    question: "How long do approved refunds take to reach my bank account?",
    answer:
      "Once approved, refunds are initiated immediately and reflect within 1–3 business days for UPI/wallets and 5–7 business days for credit/debit cards or net banking, depending on your bank.",
  },
  {
    id: "faq-11",
    category: "billing",
    question: "What payment methods does Docdor accept?",
    answer:
      "We accept UPI (GPay, PhonePe, Paytm), major Visa/Mastercard/RuPay debit and credit cards, net banking, and leading digital wallets over PCI-DSS compliant gateways.",
  },
  {
    id: "faq-12",
    category: "account",
    question: "What is included in the Docdor Care Plan?",
    answer:
      "Care Plan unlocks unlimited AI health insights, free priority GP video consultations, 20% savings on diagnostic lab tests, and zero delivery charges on eligible medicine orders. Annual plans cover up to 4 family members.",
  },
  {
    id: "faq-13",
    category: "account",
    question: "Can I add my parents or children under one Docdor account?",
    answer:
      "Yes. You can create separate member profiles under your account so prescriptions, lab reports, and appointments stay neatly organized per family member.",
  },
];

export const SEARCHABLE_INDEX = [
  { title: "About Us", subtitle: "Mission, clinical board & story", to: ROUTES.ABOUT_US, type: "Page" },
  { title: "Contact Support", subtitle: "24/7 patient desk & clinic inquiries", to: ROUTES.CONTACT, type: "Page" },
  { title: "Careers at Docdor", subtitle: "Open medical, AI & engineering roles", to: ROUTES.CAREERS, type: "Page" },
  { title: "Health & Wellness Blog", subtitle: "Doctor-reviewed guides & insights", to: ROUTES.BLOG, type: "Page" },
  { title: "Help Center & FAQs", subtitle: "Booking, lab prep & delivery answers", to: ROUTES.HELP_CENTER, type: "Page" },
  { title: "Privacy Policy", subtitle: "Health data encryption & user controls", to: ROUTES.PRIVACY_POLICY, type: "Legal" },
  { title: "Terms & Conditions", subtitle: "Platform rules & clinical disclaimers", to: ROUTES.TERMS_CONDITIONS, type: "Legal" },
  { title: "Refund Policy", subtitle: "Cancellation windows & refund calculator", to: ROUTES.REFUND_POLICY, type: "Legal" },
  { title: "In-Person & Online Consultations", subtitle: "Book verified specialists near you", to: `${ROUTES.HOME}#services`, type: "Service" },
  { title: "Lab Tests & Home Collection", subtitle: "NABL diagnostics with fast PDF reports", to: `${ROUTES.HOME}#services`, type: "Service" },
  { title: "Order Medicines", subtitle: "Doorstep pharmacy with prescription check", to: `${ROUTES.HOME}#services`, type: "Service" },
  { title: "AI Health Assistant", subtitle: "Symptom check, e-prescription & report analyzer", to: `${ROUTES.HOME}#ai-assistant`, type: "Feature" },
  { title: "Docdor Care Plan", subtitle: "Unlimited GP consults & 20% lab savings", to: `${ROUTES.CONTACT}?topic=care-plan`, type: "Plan" },
];

