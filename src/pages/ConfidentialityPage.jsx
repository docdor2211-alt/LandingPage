import { useState } from "react";
import { FiCheck, FiDatabase, FiLock, FiShield } from "react-icons/fi";
import LegalPageLayout from "../components/common/LegalPageLayout";

const DATA_PROTECTION_SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "Docdor collects only the information needed to deliver safe, accurate healthcare consultations, diagnostic bookings, medicine fulfillment, and personalized wellness tools.",
    ],
    bullets: [
      "Account & Identity Information: Name, phone number, email address, city/delivery address, date of birth, and emergency contact details.",
      "Health & Clinical Records: Symptoms shared during consultations, uploaded prescriptions, diagnostic lab PDFs, allergy notes, and doctor consultation summaries.",
      "Transaction & Billing Metadata: Payment confirmation IDs, Care Plan status, and order fulfillment history (card numbers and UPI PINs are never stored on Docdor servers).",
      "Device & Essential Telemetry: Browser/device type, crash logs, and city selection used to keep sessions secure and fast.",
    ],
  },
  {
    id: "how-we-use-data",
    title: "How We Use Your Information",
    paragraphs: [
      "We process personal and sensitive health data strictly for healthcare delivery, operational safety, and patient-requested features.",
    ],
    bullets: [
      "Scheduling and facilitating video or in-person appointments with NMC-registered physicians and veterinary specialists.",
      "Verifying prescriptions with licensed pharmacists and dispatching medicine orders or home phlebotomy visits.",
      "Generating plain-language report summaries and dosage reminders within the Docdor AI Health Assistant.",
      "Sending appointment alerts, lab report notifications, and refund updates.",
    ],
  },
  {
    id: "ai-assistant-privacy",
    title: "AI Health Assistant & Automated Processing",
    paragraphs: [
      "When you interact with Docdor's Symptom Assistant, E-Prescription Assistant, or Medical Report Analyzer, prompts and uploaded documents are processed solely to return real-time informational guidance to your account.",
      "We do not sell patient health conversations to advertisers or third-party data brokers, and clinical review audits strip direct personal identifiers wherever feasible.",
    ],
  },
  {
    id: "sharing-partners",
    title: "When We Share Data With Healthcare Partners",
    paragraphs: [
      "Your records are shared strictly on a need-to-know basis to complete the care service you initiate:",
    ],
    bullets: [
      "Consulting Doctors & Clinics: Receive your pre-visit symptoms and uploaded reports prior to your appointment.",
      "NABL Diagnostic Labs & Phlebotomists: Receive your name, collection address, and test panel details for home sample collection.",
      "Licensed Partner Pharmacies: Receive your verified prescription and delivery address for medicine fulfillment.",
      "Legal & Regulatory Compliance: Disclosed only when strictly required by applicable Indian law or public health authorities.",
    ],
  },
  {
    id: "security-retention",
    title: "Security Controls & Data Retention",
    paragraphs: [
      "All patient communications, prescriptions, and lab reports are encrypted in transit via TLS 1.3 and encrypted at rest using industry-standard AES-256 encryption with strict role-based access control.",
      "Medical consultation records are retained in accordance with clinical recordkeeping standards so you retain continuous access to your health history unless you request account deletion.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights & Controls",
    paragraphs: [
      "You stay in control of your personal and family health records at all times:",
    ],
    bullets: [
      "Access & Export: Download copies of your prescriptions, lab PDFs, and consultation invoices anytime.",
      "Correction: Update profile details, delivery addresses, or family member records directly or via support.",
      "Consent Withdrawal & Erasure: Request deletion of your non-mandatory data or full account closure subject to statutory clinical retention rules.",
    ],
  },
  {
    id: "cookies-preferences",
    title: "Cookies & Local Storage",
    paragraphs: [
      "Docdor uses lightweight local storage and essential cookies to remember your dark/light theme preference, selected city, bookmarked wellness articles, and active login state. You can adjust optional analytics preferences below.",
    ],
  },
  {
    id: "dpo-contact",
    title: "Data Protection & Grievance Contact",
    paragraphs: [
      "For privacy requests, record exports, or grievance redressal under applicable Indian digital personal data regulations, contact our Data Protection Officer at privacy@docdor.com or write to Docdor Health Technologies Pvt. Ltd., 4th Floor, Aurelia MedTech Plaza, Vijay Nagar, Indore, MP 452010.",
    ],
  },
];

const ConfidentialityPage = ({ isDarkMode }) => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [prefsSaved, setPrefsSaved] = useState(false);

  const handleSavePreferences = () => {
    try {
      window.localStorage.setItem(
        "docdor-data-prefs",
        JSON.stringify({ analyticsEnabled, personalizationEnabled })
      );
    } catch {
      // ignore storage failure
    }
    setPrefsSaved(true);
    window.setTimeout(() => setPrefsSaved(false), 2500);
  };

  return (
    <LegalPageLayout
      isDarkMode={isDarkMode}
      badge="PRIVACY & DATA PROTECTION"
      title="Your Health Data,"
      highlight="Protected & Under Your Control"
      subtitle="We treat every symptom note, prescription, and diagnostic report with medical-grade confidentiality. Here is exactly what we collect and how we safeguard it."
      currentPage="Privacy Policy"
      summaryCards={[
        {
          icon: <FiLock size={20} />,
          title: "Encrypted Health Vault",
          description: "TLS 1.3 in transit and AES-256 encryption at rest protect every report and prescription.",
        },
        {
          icon: <FiShield size={20} />,
          title: "Never Sold to Advertisers",
          description: "Docdor never sells, rents, or trades patient medical records with ad networks or data brokers.",
        },
        {
          icon: <FiDatabase size={20} />,
          title: "Download & Delete Control",
          description: "Export your medical records or request account erasure anytime via our privacy desk.",
        },
      ]}
      sections={DATA_PROTECTION_SECTIONS}
      topBanner={
        <div
          className={`rounded-3xl border p-6 sm:p-7 ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/90"
              : "border-sky-200 bg-white shadow-sm"
          }`}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Interactive Privacy Controls
              </span>
              <h2 className="mt-1 text-lg font-bold">Manage Cookie & Telemetry Preferences</h2>
              <p className={`mt-1 text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Essential session & theme storage remain active for core app stability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded text-sky-500 focus:ring-sky-500"
                />
                <span>Performance Analytics</span>
              </label>

              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={personalizationEnabled}
                  onChange={(e) => setPersonalizationEnabled(e.target.checked)}
                  className="h-4 w-4 rounded text-sky-500 focus:ring-sky-500"
                />
                <span>Health Content Suggestions</span>
              </label>

              <button
                type="button"
                onClick={handleSavePreferences}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm"
              >
                {prefsSaved ? <FiCheck /> : null}
                <span>{prefsSaved ? "Preferences Saved" : "Save Preferences"}</span>
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ConfidentialityPage;

