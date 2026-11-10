import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiUsers,
  FiActivity,
  FiClock,
} from "react-icons/fi";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";
import { COMPANY_MILESTONES, LEADERSHIP_TEAM } from "../data/siteData";
import heroDoc from "../assets/images/Untitled-1.jpg";

const IMPACT_STATS = [
  { label: "Patients Served", value: "50K+", icon: FiUsers },
  { label: "Verified Doctors", value: "500+", icon: FiAward },
  { label: "Partner NABL Labs", value: "120+", icon: FiActivity },
  { label: "Clinical & AI Support", value: "24/7", icon: FiClock },
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
      "Medical records belong solely to you. We protect health data with strong encryption and never monetize patient records for advertising.",
    icon: FiCheckCircle,
  },
];

const AboutUs = ({ isDarkMode }) => {
  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="ABOUT DOCDOR"
        title="Reimagining Everyday"
        highlight="Healthcare Around Patients"
        subtitle="Docdor brings verified doctors, diagnostic labs, doorstep pharmacies, and responsible AI assistance into one calm, trusted digital health ecosystem."
        breadcrumbGroup="Company"
        currentPage="About Us"
        rightContent={
          <div
            className={`relative overflow-hidden rounded-[2rem] border p-4 shadow-xl ${
              isDarkMode
                ? "border-slate-700 bg-slate-900/90 shadow-slate-950/60"
                : "border-sky-200 bg-white/90 shadow-[0_24px_60px_rgba(56,189,248,0.18)]"
            }`}
          >
            <img
              src={heroDoc}
              alt="Docdor senior physician"
              className="h-72 w-full rounded-[1.5rem] object-cover object-top"
            />
            <div
              className={`mt-4 flex items-center justify-between rounded-2xl px-4 py-3 ${
                isDarkMode ? "bg-slate-800/90" : "bg-sky-50"
              }`}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-500">
                  Patient Satisfaction
                </p>
                <p className="text-lg font-extrabold">4.9 / 5.0 Verified Rating</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-500">
                NMC Verified
              </span>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={ROUTES.CAREERS}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95"
          >
            <span>Join Our Team</span>
            <FiArrowRight />
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-slate-500"
                : "border-slate-200 bg-white text-slate-900 hover:border-sky-300"
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
                className={`rounded-3xl border p-6 transition-colors ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90"
                    : "border-sky-100 bg-white shadow-[0_14px_35px_rgba(56,189,248,0.1)]"
                }`}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-500">
                  <Icon size={20} />
                </div>
                <p className="mt-4 text-3xl font-extrabold">{stat.value}</p>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className={`py-14 transition-colors ${
          isDarkMode ? "bg-slate-900/40" : "bg-white/70"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-8 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-sky-100 bg-gradient-to-br from-sky-50/90 to-white shadow-sm"
              }`}
            >
              <span className="rounded-full bg-sky-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-500">
                Our Mission
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                Make timely, trustworthy medical care effortless for every household.
              </h2>
              <p className={`mt-4 leading-7 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                Too often, families juggle disconnected apps for finding a specialist, booking a morning blood draw, verifying prescriptions, and deciphering complicated lab reports. Docdor unifies the entire care journey—so preventive checkups and urgent guidance happen without confusion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className={`rounded-3xl border p-8 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <span className="rounded-full bg-cyan-500/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-500">
                Our Vision
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                Proactive, AI-supported wellness guided by real clinicians.
              </h2>
              <p className={`mt-4 leading-7 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                Technology works best in healthcare when it strengthens the doctor-patient relationship rather than replacing it. Our physician-reviewed AI tools empower patients with clear daily answers while routing clinical decisions straight to licensed specialists.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"
            }`}
          >
            Our Standards
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Built Around Patient Safety & Clarity
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
                className={`rounded-3xl border p-7 transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-slate-700"
                    : "border-slate-200 bg-white hover:border-sky-200 shadow-sm"
                }`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-cyan-500/10 text-sky-500">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{val.title}</h3>
                <p className={`mt-2.5 text-sm sm:text-base leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
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
        className={`py-16 transition-colors ${
          isDarkMode ? "bg-slate-900/40" : "bg-sky-50/50"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                  isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"
                }`}
              >
                Medical Advisory & Leadership
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
                Guided by Experienced Physicians
              </h2>
            </div>
            <Link
              to={ROUTES.BLOG}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:underline"
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
                transition={{ duration: 0.2 }}
                className={`overflow-hidden rounded-3xl border transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div className={`relative h-56 overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-sky-50"}`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {member.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-xs font-semibold text-sky-500">{member.role}</p>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {member.specialty}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"
            }`}
          >
            Our Journey
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            From Indore Clinic Roots to Multi-City Care
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COMPANY_MILESTONES.map((step) => (
            <div
              key={step.year}
              className={`rounded-3xl border p-6 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-sky-100 bg-white shadow-sm"
              }`}
            >
              <span className="inline-block rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-3.5 py-1 text-sm font-extrabold text-white">
                {step.year}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div
          className={`mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] border p-8 sm:p-10 md:flex-row md:items-center ${
            isDarkMode
              ? "border-sky-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60"
              : "border-sky-200 bg-gradient-to-r from-sky-50 via-white to-cyan-50"
          }`}
        >
          <div>
            <h3 className="text-2xl font-bold">Ready to experience connected care?</h3>
            <p className={`mt-2 text-sm sm:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
              Explore open roles, browse our Help Center, or speak directly with our Indore care team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.HELP_CENTER}
              className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500"
                  : "border-slate-200 bg-white text-slate-900 hover:border-sky-300"
              }`}
            >
              Help Center
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95"
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

