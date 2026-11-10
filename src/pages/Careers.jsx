import { useEffect, useMemo, useState } from "react";
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
import careersHeroImg from "../assets/images/on1.png";

const PERKS = [
  {
    title: "Family Care Plan & Insurance",
    description:
      "Comprehensive medical coverage for you, your spouse, children, and parents plus free Docdor Care Plan access.",
    icon: FiHeart,
  },
  {
    title: "Hybrid & Remote Flexibility",
    description:
      "Work from our Indore or Bengaluru hubs or remotely across India with asynchronous-friendly engineering rituals.",
    icon: FiUsers,
  },
  {
    title: "CME & Learning Stipends",
    description:
      "Annual budget for medical conferences, clinical certifications, engineering courses, and books.",
    icon: FiTrendingUp,
  },
  {
    title: "Meaningful Health Impact",
    description:
      "Ship products used daily by tens of thousands of patients, doctors, and caregivers nationwide.",
    icon: FiShield,
  },
];

const DEPARTMENTS = [
  "All",
  "Clinical & Medical",
  "Engineering & AI",
  "Product & Design",
  "Operations & Growth",
];
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

  const departmentCounts = useMemo(() => {
    const counts = { All: JOB_OPENINGS.length };
    for (const job of JOB_OPENINGS) {
      counts[job.department] = (counts[job.department] || 0) + 1;
    }
    return counts;
  }, []);

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

  useEffect(() => {
    if (!applyingRole) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeApplyModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [applyingRole]);

  const updateAppField = (field, value) => {
    setAppForm((prev) => ({ ...prev, [field]: value }));
    if (appErrors[field]) {
      setAppErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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

  const scrollToPerks = () => {
    const el = document.getElementById("careers-perks");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const pillBadgeClass = isDarkMode
    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
    : "border-sky-200 bg-sky-50 text-sky-700";

  const modalInputClass = `w-full rounded-xl border px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 ${
    isDarkMode
      ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/30"
      : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-sky-400/25"
  }`;

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="CAREERS AT DOCDOR"
        badgeIcon={FiBriefcase}
        title="Build Healthcare That"
        highlight="Patients Truly Trust"
        subtitle="We are physicians, engineers, designers, and operations builders working together to make preventive and acute healthcare accessible across India."
        breadcrumbGroup="Company"
        currentPage="Careers"
        visual={{
          image: careersHeroImg,
          alt: "Docdor clinical leader collaborating on digital patient care",
          objectPosition: "50% 16%",
          badge: "Hybrid & Remote",
          eyebrow: "Clinical & Product Team",
          title: "Indore • Bengaluru • Mumbai",
          statValue: `${JOB_OPENINGS.length} Roles`,
          statLabel: "Open Now",
        }}
        trustItems={[
          "Family Care Coverage",
          "Remote Clinical Roles",
          "Learning Stipends",
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={scrollToRoles}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105 cursor-pointer"
          >
            <span>Explore {JOB_OPENINGS.length} Open Roles</span>
            <FiArrowRight />
          </button>
          <button
            type="button"
            onClick={scrollToPerks}
            className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition cursor-pointer ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 shadow-xs"
            }`}
          >
            <span>Benefits &amp; Culture</span>
          </button>
        </div>
      </PageHero>

      {/* Perks & Culture */}
      <section id="careers-perks" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-14 md:py-16">
        <div className="max-w-2xl">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${pillBadgeClass}`}
          >
            Why Docdor
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold">
            Crafted for Builders & Clinicians
          </h2>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className={`group rounded-3xl border p-6 transition-all duration-300 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-[0_14px_35px_rgba(14,165,233,0.07)] hover:border-sky-300"
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500 transition-transform group-hover:scale-105">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{perk.title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
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
          className={`rounded-[2rem] border p-6 sm:p-8 ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/90"
              : "border-slate-200/80 bg-white shadow-sm"
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Current Openings
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold">Open Positions</h2>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Showing <span className="font-semibold tabular-nums">{filteredRoles.length}</span> of{" "}
                <span className="tabular-nums">{JOB_OPENINGS.length}</span> active roles
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role or city..."
                aria-label="Search open positions"
                className={`w-full rounded-2xl border py-2.5 pl-11 pr-9 text-sm focus:outline-none focus:ring-2 transition ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/30"
                    : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-sky-400/25"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear role search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <FiX size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div
            className={`mt-6 flex flex-col gap-4 border-t pt-6 ${
              isDarkMode ? "border-slate-800" : "border-slate-200/80"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider opacity-60">
                Department:
              </span>
              {DEPARTMENTS.map((dept) => {
                const active = dept === selectedDept;
                const count = departmentCounts[dept] || 0;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                        : isDarkMode
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {dept}{" "}
                    <span className={active ? "opacity-90" : "opacity-60 tabular-nums"}>
                      ({count})
                    </span>
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
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? isDarkMode
                          ? "border border-sky-400/50 bg-sky-500/20 text-sky-300"
                          : "bg-slate-900 text-white"
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
              <div
                className={`rounded-2xl border border-dashed p-10 text-center ${
                  isDarkMode ? "border-slate-700" : "border-slate-300"
                }`}
              >
                <p className="font-bold">No matching positions found.</p>
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
                  className="mt-4 rounded-xl bg-sky-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-400 transition"
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
                      isExpanded
                        ? isDarkMode
                          ? "border-sky-500/40 bg-slate-800/60"
                          : "border-sky-300 bg-sky-50/35"
                        : isDarkMode
                          ? "border-slate-800 bg-slate-800/35 hover:border-slate-700"
                          : "border-slate-200/80 bg-slate-50/50 hover:border-sky-200"
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
                              isDarkMode
                                ? "bg-slate-800 text-slate-300"
                                : "border border-slate-200 bg-white text-slate-700"
                            }`}
                          >
                            {role.mode}
                          </span>
                          <span className="text-xs font-bold text-emerald-500 tabular-nums">
                            {role.compensation}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold">{role.title}</h3>

                        <div
                          className={`flex flex-wrap items-center gap-4 text-xs sm:text-sm ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <FiMapPin className="text-sky-500" />
                            {role.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <FiBriefcase className="text-sky-500" />
                            {role.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <FiClock className="text-sky-500" />
                            {role.experience}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                          aria-expanded={isExpanded}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
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
                          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:brightness-105 cursor-pointer"
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
                          <div
                            className={`border-t px-5 py-5 sm:px-6 ${
                              isDarkMode ? "border-slate-700/80" : "border-slate-200/80"
                            }`}
                          >
                            <p
                              className={`text-sm leading-relaxed ${
                                isDarkMode ? "text-slate-300" : "text-slate-700"
                              }`}
                            >
                              {role.summary}
                            </p>
                            <div className="mt-5 grid gap-6 md:grid-cols-2">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-500">
                                  Key Responsibilities
                                </h4>
                                <ul
                                  className={`mt-2.5 space-y-2 text-sm ${
                                    isDarkMode ? "text-slate-300" : "text-slate-600"
                                  }`}
                                >
                                  {role.responsibilities.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-500">
                                  What We Look For
                                </h4>
                                <ul
                                  className={`mt-2.5 space-y-2 text-sm ${
                                    isDarkMode ? "text-slate-300" : "text-slate-600"
                                  }`}
                                >
                                  {role.requirements.map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
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
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm overflow-y-auto"
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
              className={`relative my-8 w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-slate-100"
                  : "border-sky-100 bg-white text-slate-900"
              }`}
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />

              <div className="relative p-6 sm:p-8">
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
                    <h2 className="mt-4 text-2xl font-extrabold">Application Submitted!</h2>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Thank you, <strong>{appForm.fullName}</strong>. Our talent &amp; clinical hiring team will review your application for{" "}
                      <strong>{applyingRole.title}</strong> and reach out within 3–5 business days.
                    </p>
                    <button
                      type="button"
                      onClick={closeApplyModal}
                      className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white"
                    >
                      Back to Open Roles
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                      {applyingRole.department} • {applyingRole.mode}
                    </span>
                    <h2 id="apply-modal-title" className="mt-1 pr-8 text-xl sm:text-2xl font-extrabold">
                      Apply: {applyingRole.title}
                    </h2>

                    <form onSubmit={handleApplicationSubmit} noValidate className="mt-5 space-y-4">
                      <div>
                        <label
                          htmlFor="app-name"
                          className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                        >
                          Full Name *
                        </label>
                        <input
                          id="app-name"
                          type="text"
                          value={appForm.fullName}
                          onChange={(e) => updateAppField("fullName", e.target.value)}
                          placeholder="Dr. / Mr. / Ms. Full Name"
                          aria-invalid={Boolean(appErrors.fullName)}
                          className={modalInputClass}
                        />
                        {appErrors.fullName && (
                          <p role="alert" className="mt-1 text-xs text-rose-500">
                            {appErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="app-email"
                            className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                          >
                            Email *
                          </label>
                          <input
                            id="app-email"
                            type="email"
                            value={appForm.email}
                            onChange={(e) => updateAppField("email", e.target.value)}
                            placeholder="you@domain.com"
                            aria-invalid={Boolean(appErrors.email)}
                            className={modalInputClass}
                          />
                          {appErrors.email && (
                            <p role="alert" className="mt-1 text-xs text-rose-500">
                              {appErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="app-phone"
                            className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                          >
                            Phone *
                          </label>
                          <input
                            id="app-phone"
                            type="tel"
                            value={appForm.phone}
                            onChange={(e) => updateAppField("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            aria-invalid={Boolean(appErrors.phone)}
                            className={modalInputClass}
                          />
                          {appErrors.phone && (
                            <p role="alert" className="mt-1 text-xs text-rose-500">
                              {appErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="app-resume"
                          className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                        >
                          Resume / CV (PDF or DOCX) *
                        </label>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="app-resume"
                            className={`flex flex-1 min-w-0 cursor-pointer items-center justify-between rounded-xl border border-dashed px-4 py-3 text-sm transition ${
                              isDarkMode
                                ? "border-slate-700 bg-slate-800/70 hover:border-sky-400"
                                : "border-slate-300 bg-slate-50 hover:border-sky-400"
                            }`}
                          >
                            <span className="truncate">
                              {appForm.resumeName || "Choose resume file..."}
                            </span>
                            <FiUpload className="ml-2 shrink-0 text-sky-500" />
                            <input
                              id="app-resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                updateAppField("resumeName", file ? file.name : "");
                              }}
                            />
                          </label>
                          {appForm.resumeName && (
                            <button
                              type="button"
                              onClick={() => updateAppField("resumeName", "")}
                              aria-label="Remove uploaded resume"
                              className={`rounded-xl border p-3 text-slate-400 transition hover:text-rose-500 ${
                                isDarkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
                              }`}
                            >
                              <FiX size={16} />
                            </button>
                          )}
                        </div>
                        {appErrors.resumeName && (
                          <p role="alert" className="mt-1 text-xs text-rose-500">
                            {appErrors.resumeName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="app-portfolio"
                          className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                        >
                          LinkedIn / NMC Registration / Portfolio URL
                        </label>
                        <input
                          id="app-portfolio"
                          type="url"
                          value={appForm.portfolio}
                          onChange={(e) => updateAppField("portfolio", e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className={modalInputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="app-note"
                          className="mb-1 block text-xs font-bold uppercase tracking-wider opacity-80"
                        >
                          Short Note
                        </label>
                        <textarea
                          id="app-note"
                          rows={3}
                          value={appForm.note}
                          onChange={(e) => updateAppField("note", e.target.value)}
                          placeholder="Tell us what excites you about healthcare at Docdor..."
                          className={modalInputClass}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105 cursor-pointer"
                      >
                        Submit Application
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
