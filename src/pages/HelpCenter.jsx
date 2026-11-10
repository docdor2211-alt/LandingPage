import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiCreditCard,
  FiMessageSquare,
  FiSearch,
  FiShield,
  FiThumbsDown,
  FiThumbsUp,
  FiX,
} from "react-icons/fi";
import { FaFlask, FaPills, FaRobot, FaStethoscope } from "react-icons/fa";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";
import { HELP_CATEGORIES, HELP_FAQS } from "../data/siteData";

const CATEGORY_ICONS = {
  Stethoscope: FaStethoscope,
  Pill: FaPills,
  FlaskConical: FaFlask,
  Bot: FaRobot,
  CreditCard: FiCreditCard,
  ShieldCheck: FiShield,
};

const QUICK_CHIPS = [
  "Cancel appointment",
  "Prescription",
  "Lab report",
  "Refund",
  "Care Plan",
  "AI Assistant",
];

const HelpCenter = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState(HELP_FAQS[0].id);
  const [feedbackMap, setFeedbackMap] = useState({});

  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const faq of HELP_FAQS) {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    }
    return counts;
  }, []);

  const categoryTitles = useMemo(() => {
    const map = {};
    for (const cat of HELP_CATEGORIES) {
      map[cat.id] = cat.title;
    }
    return map;
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HELP_FAQS.filter((faq) => {
      const matchesCat =
        selectedCategory === "all" || faq.category === selectedCategory;
      const matchesQuery =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (categoryId) => {
    const next = selectedCategory === categoryId ? "all" : categoryId;
    setSelectedCategory(next);
    const faqSection = document.getElementById("faq-section");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFeedback = (faqId, vote) => {
    setFeedbackMap((prev) => ({ ...prev, [faqId]: vote }));
  };

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="DOCDOR HELP CENTER"
        title="How Can We"
        highlight="Help You Today?"
        subtitle="Find clear answers on booking doctors, preparing for home lab tests, tracking pharmacy orders, managing Care Plan, and requesting refunds."
        breadcrumbGroup="Support"
        currentPage="Help Center"
      >
        {/* Prominent Search Box */}
        <div className="max-w-2xl">
          <div className="relative">
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., refund, fasting, prescription, Care Plan)..."
              aria-label="Search help articles and FAQs"
              className={`w-full rounded-2xl border py-4 pl-12 pr-11 text-sm sm:text-base shadow-lg focus:outline-none focus:ring-2 transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900/90 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/30"
                  : "border-sky-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/25 shadow-sky-200/40"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Popular:
            </span>
            {QUICK_CHIPS.map((chip) => {
              const activeChip = searchQuery.trim().toLowerCase() === chip.toLowerCase();
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery(activeChip ? "" : chip);
                    const el = document.getElementById("faq-section");
                    if (el && !activeChip) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                    activeChip
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-xs"
                      : isDarkMode
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "border border-sky-200 bg-white/95 text-slate-700 hover:border-sky-400"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Topic Categories */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Browse by Topic</h2>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Select any category below to filter instant troubleshooting guides.
              </p>
            </div>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-sky-500 hover:underline cursor-pointer"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.iconName] || FiShield;
              const active = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`text-left rounded-3xl border p-6 transition cursor-pointer ${
                    active
                      ? isDarkMode
                        ? "border-sky-400 bg-sky-500/10 ring-2 ring-sky-400/25"
                        : "border-sky-500 bg-sky-50/80 ring-2 ring-sky-400/25"
                      : isDarkMode
                        ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                        : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500">
                      <Icon size={20} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums ${
                        active
                          ? "bg-sky-500 text-white"
                          : isDarkMode
                            ? "bg-slate-800 text-slate-300"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {active && <FiCheck size={11} />}
                      <span>
                        {count} {count === 1 ? "guide" : "guides"}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{cat.title}</h3>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {cat.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <section id="faq-section" className="mt-16 scroll-mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Frequently Asked Questions
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold">
                {selectedCategory === "all"
                  ? "All Support Answers"
                  : categoryTitles[selectedCategory]}
              </h2>
            </div>
            <p className={`text-sm tabular-nums ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {filteredFaqs.length} {filteredFaqs.length === 1 ? "article" : "articles"} found
            </p>
          </div>

          <div className="mt-6 space-y-3.5">
            {filteredFaqs.length === 0 ? (
              <div
                className={`rounded-3xl border border-dashed p-10 text-center ${
                  isDarkMode ? "border-slate-700" : "border-slate-300"
                }`}
              >
                <p className="font-bold">No matching help articles found.</p>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Try broader keywords or reach our support team directly.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
                  >
                    Reset Search
                  </button>
                  <Link
                    to={ROUTES.CONTACT}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                      isDarkMode ? "border-slate-700 text-slate-200" : "border-slate-300 text-slate-700"
                    }`}
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                const vote = feedbackMap[faq.id];
                const catLabel = categoryTitles[faq.category];
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition ${
                      isOpen
                        ? isDarkMode
                          ? "border-sky-500/40 bg-slate-900"
                          : "border-sky-300 bg-white shadow-sm"
                        : isDarkMode
                          ? "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                          : "border-slate-200/80 bg-white shadow-xs hover:border-sky-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left cursor-pointer"
                    >
                      <div className="space-y-1">
                        {selectedCategory === "all" && catLabel && (
                          <span className="inline-block rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                            {catLabel}
                          </span>
                        )}
                        <p className="text-sm sm:text-base font-bold leading-snug">
                          {faq.question}
                        </p>
                      </div>
                      <FiChevronDown
                        size={18}
                        className={`shrink-0 text-sky-500 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`border-t px-5 py-4 sm:px-6 ${
                              isDarkMode ? "border-slate-800" : "border-slate-200/80"
                            }`}
                          >
                            <p
                              className={`text-sm sm:text-base leading-7 ${
                                isDarkMode ? "text-slate-300" : "text-slate-600"
                              }`}
                            >
                              {faq.answer}
                            </p>

                            <div
                              className={`mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t ${
                                isDarkMode ? "border-slate-800/80" : "border-slate-100"
                              }`}
                            >
                              <span
                                className={`text-xs ${
                                  isDarkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                {vote ? "Thanks for your feedback!" : "Was this helpful?"}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleFeedback(faq.id, "yes")}
                                  aria-label="Yes, helpful"
                                  className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                                    vote === "yes"
                                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-500"
                                      : isDarkMode
                                        ? "border-slate-700 text-slate-300 hover:border-slate-500"
                                        : "border-slate-200 text-slate-600 hover:border-sky-300"
                                  }`}
                                >
                                  <FiThumbsUp size={12} />
                                  <span>Yes</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleFeedback(faq.id, "no")}
                                  aria-label="No, not helpful"
                                  className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                                    vote === "no"
                                      ? "border-rose-500 bg-rose-500/15 text-rose-500"
                                      : isDarkMode
                                        ? "border-slate-700 text-slate-300 hover:border-slate-500"
                                        : "border-slate-200 text-slate-600 hover:border-sky-300"
                                  }`}
                                >
                                  <FiThumbsDown size={12} />
                                  <span>No</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Policy Shortcuts & Support Escalation */}
        <section className="mt-16 grid gap-6 lg:grid-cols-12">
          <div
            className={`relative overflow-hidden lg:col-span-7 rounded-[2rem] border p-7 sm:p-8 ${
              isDarkMode
                ? "border-sky-500/30 bg-gradient-to-br from-slate-900 via-[#0C162C] to-slate-900"
                : "border-slate-900/5 bg-slate-900 text-white shadow-xl shadow-slate-900/15"
            }`}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md">
                <FiMessageSquare size={20} />
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-white">
                Still need personalized assistance?
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                Our Indore-based patient care team is available 24/7 to help reschedule appointments, trace medicine deliveries, or resolve billing questions.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.CONTACT}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:brightness-105"
                >
                  <span>Contact Support Desk</span>
                  <FiArrowRight />
                </Link>
                <a
                  href="tel:+919876543210"
                  className="rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800 tabular-nums"
                >
                  Call +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-5 rounded-[2rem] border p-7 ${
              isDarkMode
                ? "border-slate-800 bg-slate-900/90"
                : "border-slate-200/80 bg-white shadow-sm"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
              Policies &amp; Guides
            </p>
            <h3 className="mt-2 text-xl font-extrabold">Important Patient Policies</h3>
            <div className="mt-5 space-y-3">
              {[
                {
                  label: "Refund & Cancellation Policy",
                  desc: "Instant eligibility checker & timelines",
                  to: ROUTES.REFUND_POLICY,
                },
                {
                  label: "Privacy Policy",
                  desc: "How medical records & AI chats are secured",
                  to: ROUTES.PRIVACY_POLICY,
                },
                {
                  label: "Terms & Conditions",
                  desc: "Consultations, prescriptions & Care Plan rules",
                  to: ROUTES.TERMS_CONDITIONS,
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group flex items-center justify-between rounded-2xl border p-3.5 transition ${
                    isDarkMode
                      ? "border-slate-800 bg-slate-800/50 hover:border-sky-500/50"
                      : "border-slate-200/80 bg-slate-50 hover:border-sky-300"
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold group-hover:text-sky-500 transition-colors">
                      {item.label}
                    </p>
                    <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                  <FiArrowRight className="text-sky-500 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;
