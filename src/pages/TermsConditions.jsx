import { FiAlertCircle, FiCheckCircle, FiFileText, FiShield } from "react-icons/fi";
import LegalPageLayout from "../components/common/LegalPageLayout";

const TERMS_SECTIONS = [
  {
    id: "acceptance-eligibility",
    title: "Acceptance of Terms & User Eligibility",
    paragraphs: [
      "By accessing or using the Docdor website, mobile applications, AI Health Assistant, or related healthcare booking services, you agree to comply with these Terms & Conditions and our Privacy Policy.",
      "You must be at least 18 years of age to create an account and book services. Parents or legal guardians may book pediatric or dependent appointments under a verified adult account.",
    ],
  },
  {
    id: "platform-role",
    title: "Scope of Docdor Healthcare Platform",
    paragraphs: [
      "Docdor operates as a digital health technology platform connecting patients with independent NMC-registered medical practitioners, veterinary doctors, NABL-accredited diagnostic laboratories, and licensed retail pharmacies.",
      "Clinical opinions and prescriptions issued during consultations reflect the independent professional judgment of the treating practitioner.",
    ],
  },
  {
    id: "consultations",
    title: "Online & In-Person Doctor Consultations",
    bullets: [
      "Accurate Health Disclosure: You agree to share truthful medical history, current medications, and allergies during consultations.",
      "Telemedicine Boundaries: Certain conditions require physical examination, imaging, or in-person hospital care. Consulting doctors may advise an in-clinic visit or emergency referral where clinically appropriate.",
      "Appointment Punctuality: Please join video sessions at least 5 minutes prior to your scheduled slot. Late joins beyond 10 minutes may require rescheduling.",
    ],
  },
  {
    id: "epharmacy-prescriptions",
    title: "E-Pharmacy Orders & Prescription Verification",
    paragraphs: [
      "Orders containing Schedule H, Schedule H1, or other prescription-only medications require uploading a valid, legible prescription issued by a registered medical practitioner.",
      "Partner pharmacists verify dosage, expiry, and prescription validity prior to dispatch and reserve the right to decline fulfillment if a prescription is expired, altered, or clinically unsafe.",
    ],
  },
  {
    id: "lab-diagnostics",
    title: "Lab Tests & Home Sample Collection",
    paragraphs: [
      "Home sample collection slots are fulfilled by trained phlebotomists following single-use sterile protocols. Report turnaround times displayed at booking are estimates and may occasionally extend if confirmatory re-testing is required for diagnostic accuracy.",
    ],
  },
  {
    id: "ai-assistant-terms",
    title: "AI Health Assistant Usage & Disclaimers",
    paragraphs: [
      "Docdor's AI Health Assistant (Symptom Assistant, E-Prescription Assistant, Medical Report Analyzer, and Health Risk Assessment) provides educational health information only.",
      "AI-generated summaries do not constitute a medical diagnosis, prescription, or emergency triage service. Always consult a qualified physician before starting, stopping, or changing any medication.",
    ],
  },
  {
    id: "care-plan-subscriptions",
    title: "Docdor Care Plan Memberships",
    bullets: [
      "Care Plan benefits (priority GP video consults, lab discounts, and free delivery thresholds) apply strictly to eligible services booked through the enrolled Docdor account.",
      "Annual family plans cover up to 4 designated household members added under the primary account.",
      "Subscription renewals can be cancelled anytime prior to the next billing date from your account settings or via support.",
    ],
  },
  {
    id: "user-conduct",
    title: "Acceptable Use & Prohibited Conduct",
    bullets: [
      "Uploading forged, expired, or altered medical prescriptions.",
      "Abusive, harassing, or inappropriate conduct toward physicians, phlebotomists, delivery partners, or support staff.",
      "Automated scraping, reverse-engineering, or unauthorized commercial resale of Docdor content or services.",
    ],
  },
  {
    id: "liability-ip",
    title: "Intellectual Property & Limitation of Liability",
    paragraphs: [
      "All Docdor trademarks, logos, software interfaces, clinical content, and designs are protected intellectual property of Docdor Health Technologies Pvt. Ltd.",
      "To the maximum extent permitted by applicable law, Docdor's aggregate liability arising from any platform transaction shall not exceed the service fee paid by you for that specific booking.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    paragraphs: [
      "These Terms & Conditions are governed by the laws of India. Any disputes that cannot be resolved amicably through our patient grievance desk shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.",
    ],
  },
];

const TermsConditions = ({ isDarkMode }) => {
  return (
    <LegalPageLayout
      isDarkMode={isDarkMode}
      badge="TERMS OF SERVICE"
      title="Terms &"
      highlight="Conditions"
      subtitle="Clear, transparent rules governing consultations, e-pharmacy orders, diagnostic tests, AI wellness tools, and Care Plan memberships on Docdor."
      currentPage="Terms & Conditions"
      summaryCards={[
        {
          icon: <FiCheckCircle size={20} />,
          title: "Verified Practitioners",
          description: "Consultations are delivered by licensed, credential-verified clinicians.",
        },
        {
          icon: <FiFileText size={20} />,
          title: "Prescription Compliance",
          description:
            "Schedule H/H1 medicines require a valid doctor prescription verified by pharmacists.",
        },
        {
          icon: <FiShield size={20} />,
          title: "Transparent Care Plans",
          description: "Clear monthly or annual billing with zero hidden renewal traps.",
        },
      ]}
      sections={TERMS_SECTIONS}
      topBanner={
        <div
          className={`flex items-start gap-3.5 rounded-3xl border p-5 sm:p-6 ${
            isDarkMode
              ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
              : "border-amber-200 bg-amber-50/90 text-amber-950"
          }`}
        >
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
            <FiAlertCircle size={20} />
          </div>
          <div className="text-sm leading-relaxed">
            <p className="font-bold">Important Clinical &amp; Emergency Disclaimer</p>
            <p className="mt-1">
              Docdor&apos;s AI Health Assistant and digital articles are designed for informational support and care navigation—not emergency medicine. In a medical emergency, call{" "}
              <strong className="font-extrabold">108 / 112</strong> or visit the nearest hospital emergency department immediately.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default TermsConditions;
