import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiHeart,
  FiRefreshCw,
} from "react-icons/fi";
import { FaFlask, FaPills, FaStethoscope } from "react-icons/fa";
import LegalPageLayout from "../components/common/LegalPageLayout";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";

const REFUND_SCENARIOS = {
  consultation: {
    label: "Doctor Consultation (Online / In-Person)",
    icon: FaStethoscope,
    options: [
      {
        id: "early-cancel",
        label: "Cancelled 2+ hours before scheduled slot",
        refundPercent: "100% Full Refund",
        timeline: "1–3 business days (UPI) / 5–7 days (Card)",
        eligible: true,
        note: "Automatic refund with zero cancellation fee. Rescheduling is also free up to 1 hour before.",
      },
      {
        id: "doctor-noshow",
        label: "Doctor unavailable or session technical failure",
        refundPercent: "100% Full Refund + Priority Rebook",
        timeline: "Initiated within 2 hours of slot window",
        eligible: true,
        note: "You can choose either an immediate full refund or a complimentary priority reschedule.",
      },
      {
        id: "late-cancel",
        label: "Cancelled within 2 hours or missed appointment",
        refundPercent: "50% Credit / Free 1-Time Reschedule",
        timeline: "Instant wallet credit or 5–7 business days",
        eligible: true,
        note: "Because clinician time was reserved exclusively for you, a 50% fee applies or you may reschedule once.",
      },
    ],
  },
  lab: {
    label: "Diagnostic Lab Test & Home Collection",
    icon: FaFlask,
    options: [
      {
        id: "before-dispatch",
        label: "Cancelled before phlebotomist dispatch",
        refundPercent: "100% Full Refund",
        timeline: "1–3 business days (UPI) / 5–7 days (Card)",
        eligible: true,
        note: "Cancel anytime up to 60 minutes prior to your collection slot for a full refund.",
      },
      {
        id: "at-doorstep",
        label: "Cancelled after phlebotomist arrived at doorstep",
        refundPercent: "100% Minus ₹150 Home Visit Fee",
        timeline: "5–7 business days",
        eligible: true,
        note: "Only the sterile kit & phlebotomist travel charge is deducted.",
      },
      {
        id: "sample-collected",
        label: "Sample already collected & sent to NABL lab",
        refundPercent: "Not Eligible (Lab Processing Active)",
        timeline: "N/A — Digital report delivered on schedule",
        eligible: false,
        note: "Once laboratory testing has begun, cancellations cannot be processed.",
      },
    ],
  },
  medicine: {
    label: "Medicine & Pharmacy Delivery",
    icon: FaPills,
    options: [
      {
        id: "pre-dispatch",
        label: "Cancelled before pharmacy dispatch",
        refundPercent: "100% Full Refund",
        timeline: "1–3 business days (UPI) / 5–7 days (Card)",
        eligible: true,
        note: "Instant cancellation available while order status is 'Prescription Verifying' or 'Packing'.",
      },
      {
        id: "damaged-wrong",
        label: "Received damaged, expired, or wrong item (within 48 hrs)",
        refundPercent: "100% Full Refund or Free Replacement",
        timeline: "Approved within 12 hours of photo verification",
        eligible: true,
        note: "No return pickup needed for damaged/expired strips—share a clear photo via Contact Support.",
      },
      {
        id: "opened-coldchain",
        label: "Opened strips or temperature-sensitive cold-chain items",
        refundPercent: "Not Returnable (Safety Regulations)",
        timeline: "N/A",
        eligible: false,
        note: "To protect patient safety, opened medicine strips and cold-chain biologics cannot be restocked unless damaged in transit.",
      },
    ],
  },
  careplan: {
    label: "Docdor Care Plan Membership",
    icon: FiHeart,
    options: [
      {
        id: "within-7-days",
        label: "Cancelled within 7 days of purchase (no benefits used)",
        refundPercent: "100% Full Refund",
        timeline: "3–5 business days",
        eligible: true,
        note: "Risk-free 7-day cooling-off window if no free consultation or Care Plan discount was redeemed.",
      },
      {
        id: "after-usage",
        label: "Cancelled after redeeming Care Plan benefits",
        refundPercent: "Auto-Renewal Stopped (Current Period Active)",
        timeline: "Effective at end of billing cycle",
        eligible: false,
        note: "You retain full membership perks until the end of your paid month or year with zero future charges.",
      },
    ],
  },
};

const REFUND_SECTIONS = [
  {
    id: "refund-overview",
    title: "Our Fair & Transparent Refund Commitment",
    paragraphs: [
      "At Docdor, healthcare bookings should never come with confusing fine print. Whenever a consultation, lab visit, or medicine order is cancelled within the eligible window—or if a service cannot be fulfilled as promised—we initiate refunds promptly to your original payment method.",
    ],
  },
  {
    id: "consultation-refunds",
    title: "Doctor Consultations (Online & Clinic Visits)",
    bullets: [
      "100% Refund: Cancellations made at least 2 hours before the scheduled appointment start time.",
      "Clinician Unavailability: If a doctor cancels, is delayed beyond 15 minutes without consent, or technical issues prevent the consultation, you receive a 100% refund or free priority reschedule.",
      "Free Rescheduling: Change your slot once at zero cost up to 1 hour prior to the appointment.",
    ],
  },
  {
    id: "lab-refunds",
    title: "Diagnostic Lab Tests & Home Sample Collection",
    bullets: [
      "100% Refund: Cancel at least 60 minutes before your scheduled home collection slot.",
      "Doorstep Cancellation: If cancelled after the phlebotomist arrives at your address, a nominal ₹150 visit & sterile kit fee is deducted from the refund.",
      "Sample Quality Re-Collection: If a sample requires re-collection for any laboratory reason, Docdor arranges a complimentary repeat visit at no extra cost.",
    ],
  },
  {
    id: "medicine-refunds",
    title: "Medicine Orders & Pharmacy Replacements",
    bullets: [
      "Pre-Dispatch Cancellation: 100% refund if cancelled before the order leaves our partner pharmacy.",
      "Damaged, Expired, or Incorrect Items: Report within 48 hours of delivery with photos for a 100% refund or free express replacement.",
      "Safety Exceptions: Opened medicine strips, insulin, vaccines, and cold-chain items cannot be returned once delivered unless damaged or defective upon arrival.",
    ],
  },
  {
    id: "care-plan-refunds",
    title: "Care Plan Membership Cancellations",
    paragraphs: [
      "New Docdor Care Plan subscribers may cancel within 7 calendar days of purchase for a 100% refund provided no Care Plan consultation or lab discount has been redeemed. After 7 days, cancelling stops future auto-renewals while keeping your benefits active through the current billing period.",
    ],
  },
  {
    id: "refund-timelines",
    title: "Refund Processing Timelines by Payment Method",
    bullets: [
      "UPI & Digital Wallets: 1 to 3 business days after approval.",
      "Debit & Credit Cards: 5 to 7 business days depending on your issuing bank.",
      "Net Banking: 3 to 5 business days.",
    ],
  },
  {
    id: "how-to-request",
    title: "How to Request a Refund",
    paragraphs: [
      "Most eligible pre-visit cancellations trigger an automatic refund immediately. For damaged medicine claims, clinician delays, or billing assistance, submit your Booking/Order ID via our Contact Support page or email support@docdor.com—our billing desk resolves requests within 24 hours.",
    ],
  },
];

const RefundGuidelinesPage = ({ isDarkMode }) => {
  const [serviceKey, setServiceKey] = useState("consultation");
  const currentService = REFUND_SCENARIOS[serviceKey];
  const [scenarioId, setScenarioId] = useState(currentService.options[0].id);

  const handleServiceChange = (nextKey) => {
    setServiceKey(nextKey);
    setScenarioId(REFUND_SCENARIOS[nextKey].options[0].id);
  };

  const activeScenario =
    currentService.options.find((opt) => opt.id === scenarioId) ||
    currentService.options[0];

  return (
    <LegalPageLayout
      isDarkMode={isDarkMode}
      badge="CANCELLATIONS & REFUNDS"
      title="Clear, Hassle-Free"
      highlight="Refund Policy"
      subtitle="Know your exact cancellation window, refund percentage, and bank credit timeline across consultations, lab tests, medicine orders, and Care Plans."
      currentPage="Refund Policy"
      summaryCards={[
        {
          icon: <FiRefreshCw size={20} />,
          title: "100% Pre-Service Refunds",
          description: "Cancel consultations 2+ hrs early or labs before dispatch for a full refund.",
        },
        {
          icon: <FiClock size={20} />,
          title: "1–3 Day UPI Credits",
          description: "Approved UPI refunds settle in 1–3 business days; cards in 5–7 days.",
        },
        {
          icon: <FiCreditCard size={20} />,
          title: "Original Payment Mode",
          description: "Refunds return directly to your original UPI, card, or bank account.",
        },
      ]}
      sections={REFUND_SECTIONS}
      topBanner={
        <div
          className={`print:hidden rounded-[2rem] border p-6 sm:p-8 ${
            isDarkMode
              ? "border-sky-500/30 bg-slate-900/95"
              : "border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(14,165,233,0.1)]"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Interactive Eligibility Checker
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold">
                Check Your Instant Refund Eligibility
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider opacity-75">
                  1. Select Service Type
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {Object.entries(REFUND_SCENARIOS).map(([key, item]) => {
                    const active = key === serviceKey;
                    const Icon = item.icon;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleServiceChange(key)}
                        className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-xs font-semibold transition cursor-pointer ${
                          active
                            ? "border-sky-500 bg-sky-500/15 text-sky-500 shadow-xs"
                            : isDarkMode
                              ? "border-slate-800 bg-slate-800/70 text-slate-300 hover:border-slate-700"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300"
                        }`}
                      >
                        <Icon className="shrink-0 text-sky-500" size={14} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="refund-scenario-select"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-75"
                >
                  2. Select Cancellation / Order Situation
                </label>
                <select
                  id="refund-scenario-select"
                  value={scenarioId}
                  onChange={(e) => setScenarioId(e.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 transition ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-800 text-slate-100 focus:border-sky-500 focus:ring-sky-500/30"
                      : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-sky-400 focus:ring-sky-400/25"
                  }`}
                >
                  {currentService.options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${serviceKey}-${activeScenario.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    activeScenario.eligible
                      ? isDarkMode
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-emerald-200 bg-emerald-50/70"
                      : isDarkMode
                        ? "border-amber-500/30 bg-amber-500/10"
                        : "border-amber-200 bg-amber-50/70"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {activeScenario.eligible ? (
                      <FiCheckCircle className="text-emerald-500" size={18} />
                    ) : (
                      <FiAlertCircle className="text-amber-500" size={18} />
                    )}
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        activeScenario.eligible ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {activeScenario.eligible ? "Eligible for Refund / Credit" : "Policy Restriction"}
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-extrabold">{activeScenario.refundPercent}</p>
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Timeline: {activeScenario.timeline}
                  </p>
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {activeScenario.note}
                  </p>

                  <Link
                    to={`${ROUTES.CONTACT}?topic=refund`}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-105"
                  >
                    <span>Submit Refund Request</span>
                    <FiArrowRight />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default RefundGuidelinesPage;
