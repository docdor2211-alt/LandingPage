import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiFileText,
  FiLock,
  FiShield,
  FiTruck,
  FiVideo,
} from "react-icons/fi";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";

const ASSURANCES = [
  {
    title: "NMC-Verified Doctors",
    desc: "Strict credential & license checks",
    icon: FiShield,
  },
  {
    title: "NABL Partner Labs",
    desc: "Sterile home sample collection",
    icon: FiActivity,
  },
  {
    title: "60-Min Pharmacy",
    desc: "Pharmacist-checked dispatch",
    icon: FiTruck,
  },
  {
    title: "Encrypted Health Vault",
    desc: "AES-256 private records",
    icon: FiLock,
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Describe Symptoms or Pick Care",
    description:
      "Select a specialty consultation, diagnostic panel, or chat with our AI Health Assistant to organize symptoms first.",
    icon: FiCalendar,
  },
  {
    step: "02",
    title: "Consult a Specialist in Minutes",
    description:
      "Join an HD video visit in under 10 minutes or confirm a priority in-clinic slot near your neighborhood.",
    icon: FiVideo,
  },
  {
    step: "03",
    title: "Instant Rx, Labs & Delivery",
    description:
      "Receive a signed digital prescription with one-tap medicine delivery and home phlebotomy follow-ups.",
    icon: FiFileText,
  },
];

const HowItWorks = ({ isDarkMode }) => {
  return (
    <section
      className={`border-y py-16 sm:py-20 transition-colors duration-300 ${
        isDarkMode
          ? "border-slate-800/80 bg-slate-950"
          : "border-slate-200/70 bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Clinical Assurance Bar */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 rounded-2xl border p-4 transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/70"
                    : "border-slate-200/80 bg-slate-50/70"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-500">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-Step Patient Flow */}
        <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-500">
              How Docdor Works
            </span>
            <h2
              className={`mt-2 text-2xl sm:text-3xl font-extrabold ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              From Symptom to Relief in 3 Calm Steps
            </h2>
          </div>
          <Link
            to={`${ROUTES.CONTACT}?topic=package`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-500 hover:text-sky-400 transition-colors"
          >
            <span>Start a consultation</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative rounded-3xl border p-7 transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-slate-50/50 hover:border-sky-300 hover:bg-white shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 to-teal-500/15 text-sky-500">
                    <Icon size={22} />
                  </div>
                  <span
                    className={`text-3xl font-extrabold tabular-nums ${
                      isDarkMode ? "text-slate-800" : "text-slate-200"
                    }`}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

