import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { useRouter } from "../router/routerContext";
import { ROUTES } from "../router/routes";
import { CITY_HUBS } from "../data/siteData";
import contactHeroImg from "../assets/images/1.png";

const TOPIC_MAP = {
  "care-plan": "Care Plan Membership",
  package: "Consultation & Package Booking",
  offer: "Consultation & Package Booking",
  refund: "Billing & Refund Inquiry",
  policy: "Privacy & Policy Question",
  partners: "Doctor / Lab / Pharmacy Partnership",
  general: "General Patient Support",
};

const TOPIC_OPTIONS = [...new Set(Object.values(TOPIC_MAP))];

const Contact = ({ isDarkMode }) => {
  const { search } = useRouter();
  const [selectedHubId, setSelectedHubId] = useState("indore");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "General Patient Support",
    referenceId: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const topicParam = params.get("topic");
    const planParam = params.get("plan");
    const pkgParam = params.get("package") || params.get("offer");

    if (topicParam && TOPIC_MAP[topicParam]) {
      setFormData((prev) => ({
        ...prev,
        topic: TOPIC_MAP[topicParam],
        message:
          planParam && !prev.message
            ? `I would like to enroll in the Docdor Care Plan (${planParam} billing). Please share next steps.`
            : pkgParam && !prev.message
              ? `I would like to book / learn more about "${pkgParam}".`
              : prev.message,
      }));
    }
  }, [search]);

  const activeHub = CITY_HUBS.find((h) => h.id === selectedHubId) || CITY_HUBS[0];

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (
      formData.phone.trim() &&
      !/^(\+?\d{10,14})$/.test(formData.phone.trim().replace(/[\s-]/g, ""))
    ) {
      nextErrors.phone = "Enter a valid 10–14 digit phone number.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 12) {
      nextErrors.message = "Please provide at least a brief description (12+ characters).";
    }
    if (!formData.consent) {
      nextErrors.consent = "Please accept the Privacy Policy to submit your inquiry.";
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const ticketCode = `DOC-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket({
      ticketCode,
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      topic: formData.topic,
    });
    setCopiedTicket(false);
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(submittedTicket.ticketCode).catch(() => {});
    }
    setCopiedTicket(true);
    window.setTimeout(() => setCopiedTicket(false), 2200);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setCopiedTicket(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      topic: "General Patient Support",
      referenceId: "",
      message: "",
      consent: false,
    });
  };

  const inputBase = `w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
    isDarkMode
      ? "border-slate-700 bg-slate-800/80 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/30"
      : "border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-sky-400/25"
  }`;

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="24/7 PATIENT & PARTNER DESK"
        badgeIcon={FiPhone}
        title="We're Here for Your"
        highlight="Care & Support Needs"
        subtitle="Reach our care coordinators for appointment assistance, pharmacy tracking, billing questions, or hospital and diagnostic partnerships."
        breadcrumbGroup="Company"
        currentPage="Contact"
        visual={{
          image: contactHeroImg,
          alt: "Doctor greeting patient at Docdor partner consultation hub",
          objectPosition: "50% 72%",
          badge: "4 City Care Hubs",
          eyebrow: "Patient & Partner Desk",
          title: "Indore • Bhopal • Mumbai • BLR",
          statValue: "< 2 min",
          statLabel: "Helpline Wait",
        }}
        trustItems={[
          "24/7 Patient Helpline",
          "Replies Under 2 Hours",
          "Clinic & Lab Partnerships",
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
          >
            <FiPhone />
            <span className="tabular-nums">+91 98765 43210</span>
          </a>
          <a
            href="mailto:support@docdor.com"
            className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 shadow-xs"
            }`}
          >
            <FiMail className="text-sky-500" />
            <span>support@docdor.com</span>
          </a>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Emergency Disclaimer */}
        <div
          className={`mb-10 flex flex-col gap-3 rounded-3xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
            isDarkMode
              ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
              : "border-amber-200 bg-amber-50/90 text-amber-950"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
              <FiAlertTriangle size={18} />
            </div>
            <p className="text-sm leading-relaxed">
              <strong className="font-bold">Medical Emergency Notice:</strong> For chest pain, severe breathing difficulty, heavy bleeding, or sudden trauma, please call{" "}
              <strong className="font-extrabold">108 / 112</strong> or visit your nearest emergency room immediately rather than using a support form.
            </p>
          </div>
          <Link
            to={ROUTES.HELP_CENTER}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
              isDarkMode
                ? "border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                : "border-amber-300 bg-white text-amber-900 hover:bg-amber-100/60"
            }`}
          >
            <span>Browse Instant FAQs</span>
            <FiArrowUpRight size={14} />
          </Link>
        </div>

        {/* Contact Channels */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: FiPhone,
              title: "Patient Helpline",
              detail: "+91 98765 43210",
              sub: "24/7 consultation & urgent order desk",
              sla: "Avg wait < 2 mins",
              href: "tel:+919876543210",
            },
            {
              icon: FiMail,
              title: "Email & Billing Desk",
              detail: "support@docdor.com",
              sub: "Orders, prescriptions & refund updates",
              sla: "Replies under 2 hrs",
              href: "mailto:support@docdor.com",
            },
            {
              icon: FiClock,
              title: "Partner Onboarding",
              detail: "partners@docdor.com",
              sub: "For doctors, NABL labs & pharmacies",
              sla: "Dedicated coordinator",
              href: "mailto:partners@docdor.com",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                className={`group rounded-3xl border p-6 transition-all duration-300 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/50"
                    : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500 transition group-hover:scale-105">
                    <Icon size={20} />
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isDarkMode
                        ? "bg-slate-800 text-slate-300"
                        : "bg-sky-50 text-sky-700"
                    }`}
                  >
                    {card.sla}
                  </span>
                </div>
                <p
                  className={`mt-4 text-xs font-bold uppercase tracking-wider ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {card.title}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold tabular-nums group-hover:text-sky-500 transition-colors">
                  <span>{card.detail}</span>
                  <FiArrowUpRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {card.sub}
                </p>
              </a>
            );
          })}
        </div>

        {/* Form + City Hubs */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-7 rounded-[2rem] border p-6 sm:p-8 ${
              isDarkMode
                ? "border-slate-800 bg-slate-900/90"
                : "border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(14,165,233,0.08)]"
            }`}
          >
            {submittedTicket ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  <FiCheckCircle size={34} />
                </div>
                <h2 className="mt-5 text-2xl font-extrabold">Inquiry Received</h2>
                <p
                  className={`mt-2 text-sm max-w-md mx-auto leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Thank you, <strong>{submittedTicket.name}</strong>. Your request regarding{" "}
                  <strong>{submittedTicket.topic}</strong> has been logged. A confirmation has been queued for{" "}
                  <span className="underline">{submittedTicket.email}</span>.
                </p>
                <div
                  className={`mx-auto mt-6 max-w-xs rounded-2xl border p-4 ${
                    isDarkMode ? "border-slate-800 bg-slate-800/80" : "border-sky-100 bg-sky-50/80"
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider text-sky-500 font-bold">
                    Reference Ticket ID
                  </p>
                  <div className="mt-1.5 flex items-center justify-center gap-2">
                    <p className="text-xl font-extrabold tracking-wide tabular-nums">
                      {submittedTicket.ticketCode}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyTicket}
                      aria-label="Copy ticket ID"
                      className={`rounded-lg p-1.5 text-xs transition ${
                        isDarkMode
                          ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                          : "bg-white text-slate-600 hover:text-sky-600 shadow-xs"
                      }`}
                    >
                      {copiedTicket ? <FiCheck className="text-emerald-500" size={14} /> : <FiCopy size={14} />}
                    </button>
                  </div>
                  <p className={`mt-1.5 text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Estimated coordinator reply: &lt; 2 hours
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
                  >
                    Send Another Message
                  </button>
                  <Link
                    to={ROUTES.HELP_CENTER}
                    className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${
                      isDarkMode
                        ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Visit Help Center
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                      Direct Care Request
                    </span>
                    <h2 className="mt-1 text-2xl font-extrabold">Send Us a Message</h2>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      isDarkMode
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    Desk Online Now
                  </span>
                </div>
                <p className={`mt-1.5 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  Fill out the form below and our specialized care desk will reply promptly.
                </p>

                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        aria-invalid={Boolean(errors.fullName)}
                        className={inputBase}
                      />
                      {errors.fullName && (
                        <p role="alert" className="mt-1 text-xs font-medium text-rose-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={inputBase}
                      />
                      {errors.email && (
                        <p role="alert" className="mt-1 text-xs font-medium text-rose-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        aria-invalid={Boolean(errors.phone)}
                        className={inputBase}
                      />
                      {errors.phone && (
                        <p role="alert" className="mt-1 text-xs font-medium text-rose-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                      >
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-topic"
                        value={formData.topic}
                        onChange={(e) => updateField("topic", e.target.value)}
                        className={inputBase}
                      >
                        {TOPIC_OPTIONS.map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-ref"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                    >
                      Booking / Order ID (If Applicable)
                    </label>
                    <input
                      id="contact-ref"
                      type="text"
                      value={formData.referenceId}
                      onChange={(e) => updateField("referenceId", e.target.value)}
                      placeholder="e.g. ORD-90214 or APT-4410"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider opacity-80"
                    >
                      How Can We Help? *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Share details of your consultation, medicine delivery, lab test, or partnership inquiry..."
                      aria-invalid={Boolean(errors.message)}
                      className={inputBase}
                    />
                    {errors.message && (
                      <p role="alert" className="mt-1 text-xs font-medium text-rose-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                      />
                      <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>
                        I agree to Docdor processing my inquiry in accordance with the{" "}
                        <Link
                          to={ROUTES.PRIVACY_POLICY}
                          className="font-semibold text-sky-500 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p role="alert" className="mt-1 text-xs font-medium text-rose-500">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105 cursor-pointer"
                  >
                    <FiSend />
                    <span>Submit Support Request</span>
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Regional Care Hubs */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`rounded-[2rem] border p-6 sm:p-8 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-white shadow-sm"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                City Care Hubs
              </span>
              <h2 className="mt-1.5 text-2xl font-extrabold">Regional Offices & Operations</h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {CITY_HUBS.map((hub) => {
                  const active = hub.id === selectedHubId;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/20"
                          : isDarkMode
                            ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {hub.city}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`mt-6 rounded-2xl border p-5 space-y-4 ${
                    isDarkMode ? "border-slate-800 bg-slate-800/55" : "border-sky-100 bg-sky-50/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FiMapPin className="mt-1 shrink-0 text-sky-500" size={18} />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                        Address
                      </p>
                      <p className="mt-0.5 text-sm font-medium leading-relaxed">{activeHub.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FiClock className="mt-1 shrink-0 text-sky-500" size={18} />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">
                        Operating Hours
                      </p>
                      <p className="mt-0.5 text-sm font-medium">{activeHub.hours}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1 text-xs sm:text-sm">
                    <a
                      href={`tel:${activeHub.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 font-bold text-sky-500 hover:underline tabular-nums"
                    >
                      <FiPhone size={14} />
                      <span>{activeHub.phone}</span>
                    </a>
                    <a
                      href={`mailto:${activeHub.email}`}
                      className="inline-flex items-center gap-1.5 font-bold text-sky-500 hover:underline"
                    >
                      <FiMail size={14} />
                      <span>{activeHub.email}</span>
                    </a>
                  </div>

                  <div
                    className={`flex flex-wrap gap-2 pt-3 border-t ${
                      isDarkMode ? "border-slate-700/80" : "border-sky-200/60"
                    }`}
                  >
                    {activeHub.highlights.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isDarkMode
                            ? "bg-slate-900 text-slate-300"
                            : "bg-white text-slate-700 shadow-xs"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className={`rounded-[2rem] border p-6 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-white shadow-sm"
              }`}
            >
              <h3 className="text-lg font-bold">Looking for Refund or Policy Help?</h3>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Check instant cancellation windows or calculate your refund eligibility before submitting a ticket.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.REFUND_POLICY}
                  className="rounded-xl bg-sky-500/15 px-4 py-2 text-xs font-bold text-sky-500 hover:bg-sky-500/25 transition"
                >
                  Refund Calculator
                </Link>
                <Link
                  to={ROUTES.HELP_CENTER}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    isDarkMode
                      ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Self-Service FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
