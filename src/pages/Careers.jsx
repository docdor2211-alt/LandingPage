import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiUpload,
  FiUsers,
  FiX,
} from "react-icons/fi";
import PageHero from "../components/common/PageHero";
import { JOB_OPENINGS } from "../data/siteData";

const PERKS = [
  {
    title: "Family Care Plan & Insurance",
    description: "Comprehensive medical coverage for you, your spouse, children, and parents plus free Docdor Care Plan access.",
    icon: FiHeart,
  },
  {
    title: "Hybrid & Remote Flexibility",
    description: "Work from our Indore or Bengaluru hubs or remotely across India with asynchronous-friendly engineering rituals.",
    icon: FiUsers,
  },
  {
    title: "CME & Learning Stipends",
    description: "Annual budget for medical conferences, clinical certifications, engineering courses, and books.",
    icon: FiTrendingUp,
  },
  {
    title: "Meaningful Health Impact",
    description: "Ship products used daily by tens of thousands of patients, doctors, and caregivers nationwide.",
    icon: FiShield,
  },
];

const DEPARTMENTS = ["All", "Clinical & Medical", "Engineering & AI", "Product & Design", "Operations & Growth"];
const MODES = ["All", "Remote", "Hybrid", "On-site"];

const Careers = ({ isDarkMode }) => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRoleId, setExpandedRoleId] = useState(JOB_OPENINGS[0].id);
  const [applyingRole, setApplyingRole] = useState(null);

  const [appForm, setAppForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "3–5 years",
    portfolio: "",
    resumeName: "",
    note: "",
  });
  const [appErrors, setAppErrors] = useState({});
  const [applicationDone, setApplicationDone] = useState(false);

  const filteredRoles = useMemo(() => {
    return JOB_OPENINGS.filter((role) => {
      const matchesDept = selectedDept === "All" || role.department === selectedDept;
      const matchesMode = selectedMode === "All" || role.mode === selectedMode;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        role.title.toLowerCase().includes(q) ||
        role.location.toLowerCase().includes(q) ||
        role.summary.toLowerCase().includes(q);
      return matchesDept && matchesMode && matchesQuery;
    });
  }, [selectedDept, selectedMode, searchQuery]);

  const openApplyModal = (role) => {
    setApplyingRole(role);
    setApplicationDone(false);
    setAppErrors({});
  };

  const closeApplyModal = () => {
    setApplyingRole(null);
    setApplicationDone(false);
    setAppErrors({});
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!appForm.fullName.trim()) errs.fullName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appForm.email.trim())) {
      errs.email = "Valid email address is required.";
    }
    if (!appForm.phone.trim() || appForm.phone.trim().replace(/[\s-]/g, "").length < 10) {
      errs.phone = "Valid phone number is required.";
    }
    if (!appForm.resumeName) {
      errs.resumeName = "Please attach your resume / CV file.";
    }

    if (Object.keys(errs).length > 0) {
      setAppErrors(errs);
      return;
    }

    setAppErrors({});
    setApplicationDone(true);
  };

  const scrollToRoles = () => {
    const el = document.getElementById("open-roles");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="CAREERS AT DOCDOR"
        title="Build Healthcare That"
        highlight="Patients Truly Trust"
        subtitle="We are physicians, engineers, designers, and operations builders working together to make preventive and acute healthcare accessible across India."
        breadcrumbGroup="Company"
        currentPage="Careers"
      >
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={scrollToRoles}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95"
          >
            <span>Explore {JOB_OPENINGS.length} Open Roles</span>
            <FiArrowRight />
          </button>
          <span className={`text-sm font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Indore • Bengaluru • Mumbai • Remote
          </span>
        </div>
      </PageHero>

      {/* Perks & Culture */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="max-w-2xl">
          <span
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"
            }`}
          >
            Why Docdor
          </span>
          <h2 className="mt-4 text-3xl font-bold">Crafted for Builders & Clinicians</h2>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className={`rounded-3xl border p-6 transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90"
                    : "border-sky-100 bg-white shadow-[0_14px_35px_rgba(56,189,248,0.08)]"
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-500">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{perk.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Roles Directory */}
      <section id="open-roles" className="mx-auto max-w-7xl px-6 pb-20 scroll-mt-24">
        <div
          className={`rounded-3xl border p-6 sm:p-8 ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/90"
              : "border-slate-200 bg-white shadow-sm"
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Open Positions</h2>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Showing {filteredRoles.length} of {JOB_OPENINGS.length} active roles
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role or city..."
                className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-400"
                }`}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-col gap-4 border-t pt-6 border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider opacity-60">
                Department:
              </span>
              {DEPARTMENTS.map((dept) => {
                const active = dept === selectedDept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-sm"
                        : isDarkMode
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider opacity-60">
                Work Mode:
              </span>
              {MODES.map((mode) => {
                const active = mode === selectedMode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSelectedMode(mode)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      active
                        ? isDarkMode
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/50"
                          : "bg-blue-900 text-white"
                        : isDarkMode
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roles List */}
          <div className="mt-8 space-y-4">
            {filteredRoles.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-10 text-center border-slate-300 dark:border-slate-700">
                <p className="font-semibold">No matching positions found.</p>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Try clearing filters or resetting your search query.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDept("All");
                    setSelectedMode("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 rounded-xl bg-sky-500 px-4 py-2 text-xs font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredRoles.map((role) => {
                const isExpanded = expandedRoleId === role.id;
                return (
                  <div
                    key={role.id}
                    className={`rounded-2xl border transition ${
                      isDarkMode
                        ? "border-slate-800 bg-slate-800/40 hover:border-slate-700"
                        : "border-slate-200 bg-slate-50/50 hover:border-sky-200"
                    }`}
                  >
                    <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-sky-500/15 px-3 py-0.5 text-xs font-semibold text-sky-500">
                            {role.department}
                          </span>
                          <span
                            className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                              isDarkMode ? "bg-slate-800 text-slate-300" : "bg-white text-slate-700 border border-slate-200"
                            }`}
                          >
                            {role.mode}
                          </span>
                          <span className="text-xs font-semibold text-emerald-500">
                            {role.compensation}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold">{role.title}</h3>

                        <div className={`flex flex-wrap items-center gap-4 text-xs sm:text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          <span className="inline-flex items-center gap-1.5">
                            <FiMapPin className="text-sky-500" />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FiBriefcase className="text-sky-500" />
                            {role.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FiClock className="text-sky-500" />
                            {role.experience}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                            isDarkMode
                              ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
                              : "border-slate-200 bg-white text-slate-800 hover:border-sky-300"
                          }`}
                        >
                          <span>{isExpanded ? "Hide Details" : "Role Details"}</span>
                          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        <button
                          type="button"
                          onClick={() => openApplyModal(role)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:opacity-95"
                        >
                          <span>Apply Now</span>
                          <FiArrowRight />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t px-5 py-5 sm:px-6 border-slate-200/80 dark:border-slate-700/80">
                            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                              {role.summary}
                            </p>
                            <div className="mt-5 grid gap-6 md:grid-cols-2">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-500">
                                  Key Responsibilities
                                </h4>
                                <ul className={`mt-2.5 space-y-2 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                  {role.responsibilities.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-500">
                                  What We Look For
                                </h4>
                                <ul className={`mt-2.5 space-y-2 text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                                  {role.requirements.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
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
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {applyingRole && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeApplyModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="apply-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative my-8 w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-slate-100"
                  : "border-sky-100 bg-white text-slate-900"
              }`}
            >
              <button
                type="button"
                onClick={closeApplyModal}
                aria-label="Close application modal"
                className={`absolute right-4 top-4 rounded-xl p-2 transition ${
                  isDarkMode
                    ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <FiX size={20} />
              </button>

              {applicationDone ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <FiCheckCircle size={34} />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold">Application Submitted!</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    Thank you, <strong>{appForm.fullName}</strong>. Our talent & clinical hiring team will review your application for{" "}
                    <strong>{applyingRole.title}</strong> and reach out within 3–5 business days.
                  </p>
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Back to Open Roles
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                    {applyingRole.department} • {applyingRole.mode}
                  </span>
                  <h2 id="apply-modal-title" className="mt-1 text-xl sm:text-2xl font-bold">
                    Apply: {applyingRole.title}
                  </h2>

                  <form onSubmit={handleApplicationSubmit} noValidate className="mt-5 space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={appForm.fullName}
                        onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                          isDarkMode
                            ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                            : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-sky-400"
                        }`}
                      />
                      {appErrors.fullName && (
                        <p className="mt-1 text-xs text-rose-500">{appErrors.fullName}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={appForm.email}
                          onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                          placeholder="you@domain.com"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                            isDarkMode
                              ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                              : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-sky-400"
                          }`}
                        />
                        {appErrors.email && (
                          <p className="mt-1 text-xs text-rose-500">{appErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={appForm.phone}
                          onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                            isDarkMode
                              ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                              : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-sky-400"
                          }`}
                        />
                        {appErrors.phone && (
                          <p className="mt-1 text-xs text-rose-500">{appErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                        Resume / CV (PDF or DOCX) *
                      </label>
                      <label
                        className={`flex cursor-pointer items-center justify-between rounded-xl border border-dashed px-4 py-3 text-sm transition ${
                          isDarkMode
                            ? "border-slate-700 bg-slate-800/70 hover:border-sky-400"
                            : "border-slate-300 bg-slate-50 hover:border-sky-400"
                        }`}
                      >
                        <span className="truncate">
                          {appForm.resumeName || "Choose resume file..."}
                        </span>
                        <FiUpload className="shrink-0 text-sky-500" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            setAppForm({
                              ...appForm,
                              resumeName: file ? file.name : "",
                            });
                          }}
                        />
                      </label>
                      {appErrors.resumeName && (
                        <p className="mt-1 text-xs text-rose-500">{appErrors.resumeName}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                        LinkedIn / NMC Registration / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={appForm.portfolio}
                        onChange={(e) => setAppForm({ ...appForm, portfolio: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                          isDarkMode
                            ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                            : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-sky-400"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider opacity-80">
                        Short Note
                      </label>
                      <textarea
                        rows={3}
                        value={appForm.note}
                        onChange={(e) => setAppForm({ ...appForm, note: e.target.value })}
                        placeholder="Tell us what excites you about healthcare at Docdor..."
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                          isDarkMode
                            ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                            : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-sky-400"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;

