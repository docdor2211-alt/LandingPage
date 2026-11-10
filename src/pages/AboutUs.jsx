import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";
import { COMPANY_MILESTONES, LEADERSHIP_TEAM } from "../data/siteData";
import heroDoc from "../assets/images/hero-doctor.jpg";

const IMPACT_STATS = [
  {
    label: "Patients Served",
    sub: "Verified video & clinic visits",
    value: "50K+",
    icon: FiUsers,
  },
  {
    label: "Verified Doctors",
    sub: "NMC-registered specialists",
    value: "500+",
    icon: FiAward,
  },
  {
    label: "Partner NABL Labs",
    sub: "ISO & cold-chain compliant",
    value: "120+",
    icon: FiActivity,
  },
  {
    label: "Clinical & AI Support",
    sub: "24/7 triage & care coordination",
    value: "24/7",
    icon: FiClock,
  },
];

const CORE_VALUES = [
  {
    title: "Clinical Trust First",
    description:
      "Every physician on Docdor undergoes strict credential verification, and every AI insight is reviewed against physician-authored safety guardrails.",
    icon: FiShield,
  },
  {
    title: "Connected Continuity",
    description:
      "Your consultations, e-prescriptions, lab results, and pharmacy orders live seamlessly in one place—no fragmented records or repeated forms.",
    icon: FiActivity,
  },
  {
    title: "Compassionate Access",
    description:
      "Whether it is a 2 AM pediatric question or a scheduled specialist follow-up, care should feel calm, clear, and transparent in pricing.",
    icon: FiHeart,
  },
  {
    title: "Privacy by Architecture",
    description:
      "Medical records belong solely to you. We protect health data with TLS 1.3 + AES-256 encryption and never monetize patient records for ads.",
    icon: FiCheckCircle,
  },
];

const AboutUs = ({ isDarkMode }) => {
  const pillBadgeClass = isDarkMode
    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
    : "border-sky-200 bg-sky-50 text-sky-700";

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="ABOUT DOCDOR"
        title="Reimagining Everyday"
        highlight="Healthcare Around Patients"
        subtitle="Docdor brings verified doctors, NABL diagnostic labs, doorstep pharmacies, and physician-reviewed AI assistance into one calm, trusted digital health ecosystem."
        breadcrumbGroup="Company"
        currentPage="About Us"
        rightContent={
          <div className="relative">
            <div
              className={`pointer-events-none absolute -inset-4 rounded-[2.5rem] blur-2xl ${
                isDarkMode
                  ? "bg-gradient-to-tr from-sky-500/20 via-cyan-500/10 to-teal-500/15"
                  : "bg-gradient-to-tr from-sky-200/60 via-cyan-100/50 to-teal-100/50"
              }`}
            />
            <div
              className={`relative overflow-hidden rounded-[2rem] border p-3.5 sm:p-4 shadow-2xl ${
                isDarkMode
                  ? "border-slate-700/80 bg-slate-900/95 shadow-black/50"
                  : "border-sky-200/80 bg-white/95 shadow-[0_24px_60px_rgba(14,165,233,0.16)]"
              }`}
            >
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={heroDoc}
                  alt="Docdor senior physician consulting"
                  className="h-72 sm:h-80 w-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/55 via-slate-950/15 to-transparent" />
                <span
                  className={`absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md ${
                    isDarkMode
                      ? "border-emerald-400/30 bg-slate-950/80 text-emerald-300"
                      : "border-white/70 bg-white/90 text-emerald-700 shadow-sm"
                  }`}
                >
                  NMC Verified Panel
                </span>
              </div>

              <div
                className={`mt-3.5 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-800/75"
                    : "border-sky-100 bg-sky-50/75"
                }`}
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sky-500">
                    Patient Satisfaction
                  </p>
                  <p className="text-base sm:text-lg font-extrabold tabular-nums">
                    4.9 / 5.0 Verified Rating
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold tabular-nums">500+</p>
                  <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Clinicians
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={ROUTES.CAREERS}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
          >
            <span>Join Our Team</span>
            <FiArrowRight />
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                : "border-slate-200 bg-white text-slate-900 hover:border-sky-300 shadow-xs"
            }`}
          >
            <span>Partner or Contact Us</span>
          </Link>
        </div>
      </PageHero>

      {/* Impact Metrics */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`group rounded-3xl border p-6 transition-all duration-300 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-[0_14px_35px_rgba(14,165,233,0.08)] hover:border-sky-300"
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500 transition-transform group-hover:scale-105">
                  <Icon size={20} />
                </div>
                <p className="mt-4 text-3xl font-extrabold tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-bold">{stat.label}</p>
                <p className={`mt-0.5 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className={`border-y py-14 md:py-18 transition-colors ${
          isDarkMode
            ? "border-slate-800/80 bg-slate-900/40"
            : "border-slate-200/70 bg-white/80"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-7 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-[2rem] border p-7 sm:p-9 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/95"
                  : "border-sky-100 bg-gradient-to-br from-sky-50/90 via-white to-white shadow-sm"
              }`}
            >
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 mb-5" />
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${pillBadgeClass}`}
              >
                Our Mission
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
                Make timely, trustworthy medical care effortless for every household.
              </h2>
              <p
                className={`mt-4 text-sm sm:text-base leading-7 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Too often, families juggle disconnected apps for finding a specialist, booking a morning blood draw, verifying prescriptions, and deciphering complicated lab reports. Docdor unifies the entire care journey—so preventive checkups and urgent guidance happen without confusion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className={`relative overflow-hidden rounded-[2rem] border p-7 sm:p-9 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/95"
                  : "border-teal-100 bg-gradient-to-br from-teal-50/60 via-white to-white shadow-sm"
              }`}
            >
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 mb-5" />
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                  isDarkMode
                    ? "border-teal-500/30 bg-teal-500/10 text-teal-300"
                    : "border-teal-200 bg-teal-50 text-teal-700"
                }`}
              >
                Our Vision
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
                Proactive, AI-supported wellness guided by real clinicians.
              </h2>
              <p
                className={`mt-4 text-sm sm:text-base leading-7 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Technology works best in healthcare when it strengthens the doctor-patient relationship rather than replacing it. Our physician-reviewed AI tools empower patients with clear daily answers while routing clinical decisions straight to licensed specialists.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${pillBadgeClass}`}
          >
            Our Standards
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold">
            Built Around Patient{" "}
            <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
              Safety & Clarity
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`group rounded-3xl border p-7 transition-all duration-300 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500 transition-transform group-hover:scale-105">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{val.title}</h3>
                <p
                  className={`mt-2.5 text-sm sm:text-base leading-7 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Medical Board & Leadership */}
      <section
        id="leadership"
        className={`border-y py-16 md:py-20 transition-colors scroll-mt-24 ${
          isDarkMode
            ? "border-slate-800/80 bg-slate-900/40"
            : "border-slate-200/70 bg-gradient-to-b from-sky-50/60 to-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${pillBadgeClass}`}
              >
                Medical Advisory & Leadership
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold">
                Guided by Experienced Physicians
              </h2>
            </div>
            <Link
              to={ROUTES.BLOG}
              className="inline-flex items-center gap-2 text-sm font-bold text-sky-500 hover:text-sky-400 transition-colors"
            >
              <span>Read articles by our doctors</span>
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP_TEAM.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                className={`group overflow-hidden rounded-3xl border transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div
                  className={`relative h-56 overflow-hidden ${
                    isDarkMode ? "bg-slate-800" : "bg-sky-50"
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/45 to-transparent" />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {member.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-xs font-bold text-sky-500">{member.role}</p>
                  <p
                    className={`mt-1 text-xs font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {member.specialty}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${pillBadgeClass}`}
          >
            Our Journey
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold">
            From Indore Clinic Roots to Multi-City Care
          </h2>
        </div>

        <div className="relative mt-12">
          {/* Desktop timeline connector */}
          <div
            className={`pointer-events-none absolute left-8 right-8 top-9 hidden h-px lg:block ${
              isDarkMode
                ? "bg-gradient-to-r from-sky-500/20 via-cyan-500/40 to-teal-500/20"
                : "bg-gradient-to-r from-sky-200 via-cyan-300 to-teal-200"
            }`}
          />
          <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COMPANY_MILESTONES.map((step, idx) => (
              <div
                key={step.year}
                className={`rounded-3xl border p-6 transition-colors ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/95 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-3.5 py-1 text-sm font-extrabold tabular-nums text-white shadow-sm">
                    {step.year}
                  </span>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isDarkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          className={`relative mt-16 overflow-hidden rounded-[2rem] border p-8 sm:p-10 md:flex md:items-center md:justify-between gap-8 ${
            isDarkMode
              ? "border-sky-500/30 bg-gradient-to-r from-slate-900 via-[#0C162C] to-slate-900"
              : "border-slate-900/5 bg-slate-900 text-white shadow-2xl shadow-slate-900/15"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-400">
              Connected Care Starts Here
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Ready to experience connected care?
            </h3>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-300">
              Explore open clinical and engineering roles, browse our Help Center, or speak directly with our Indore care team.
            </p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0 flex flex-wrap gap-3 shrink-0">
            <Link
              to={ROUTES.HELP_CENTER}
              className="rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
            >
              Help Center
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
            >
              <span>Contact Us</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
