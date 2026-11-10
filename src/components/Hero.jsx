import { motion } from "framer-motion";
import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";
import {
  FiArrowRight,
  FiClock,
  FiShield,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import heroDocImg from "../assets/images/hero-doctor.jpg";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";

const HERO_METRICS = [
  { value: "50K+", label: "Patients Served", icon: FiUsers },
  { value: "500+", label: "NMC Doctors", icon: FiShield },
  { value: "10 min", label: "Avg. Video Connect", icon: FiClock },
];

const Hero = ({ isDarkMode, onOpenDownload }) => {
  const handleExploreServices = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className={`relative overflow-hidden border-b transition-colors duration-300 ${
        isDarkMode
          ? "border-slate-800/70 bg-gradient-to-br from-[#060B17] via-[#0B1324] to-[#071522]"
          : "border-slate-200/70 bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/50"
      }`}
    >
      {/* Background texture & ambient radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-medical-grid opacity-55" />
      <div
        className={`pointer-events-none absolute -top-32 -left-28 h-96 w-96 rounded-full blur-3xl ${
          isDarkMode ? "bg-sky-500/15" : "bg-sky-300/35"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full blur-3xl ${
          isDarkMode ? "bg-teal-500/12" : "bg-teal-200/35"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Copy, CTAs & Trust Stats */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-center lg:justify-start">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-xs ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                    : "border-sky-200 bg-white/90 text-sky-800"
                }`}
              >
                <span>NMC-Verified Doctors &bull; 24/7 Care</span>
              </span>
            </div>

            <h1
              className={`mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.35rem] ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Your Complete{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Healthcare Ecosystem
              </span>{" "}
              In One App.
            </h1>

            <p
              className={`mx-auto lg:mx-0 mt-5 max-w-2xl text-base sm:text-lg leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Book instant video or clinic consultations, order verified medicines in 60 minutes,
              schedule NABL home lab tests, and get physician-reviewed AI health guidance—all in one
              calm, private place.
            </p>

            {/* Primary App & Booking Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                type="button"
                onClick={() => onOpenDownload && onOpenDownload("ios")}
                className={`w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl border px-5 py-3.5 text-sm shadow-lg transition hover:-translate-y-0.5 ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-900 text-white hover:border-slate-500 shadow-black/40"
                    : "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/15"
                }`}
              >
                <FaApple size={24} />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300">
                    Download on
                  </p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onOpenDownload && onOpenDownload("android")}
                className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-5 py-3.5 text-sm text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5 hover:brightness-105"
              >
                <FaGooglePlay size={20} />
                <div className="text-left leading-tight">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-sky-50">
                    Get it on
                  </p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>

              <Link
                to={`${ROUTES.CONTACT}?topic=package`}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-semibold transition ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800/70 text-slate-100 hover:border-sky-500/60 hover:bg-slate-800"
                    : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50/50 shadow-xs"
                }`}
              >
                <FiVideo size={16} className="text-sky-500" />
                <span>Book Consult</span>
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <button
                type="button"
                onClick={handleExploreServices}
                className={`group inline-flex items-center gap-2 text-sm font-semibold transition ${
                  isDarkMode
                    ? "text-sky-300 hover:text-sky-200"
                    : "text-sky-700 hover:text-sky-900"
                }`}
              >
                <span>Explore all 6 care services</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0">
              {HERO_METRICS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`rounded-2xl border p-3.5 sm:p-4 text-left transition ${
                      isDarkMode
                        ? "border-slate-800 bg-slate-900/80"
                        : "border-slate-200/80 bg-white/90 shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xl sm:text-2xl font-extrabold tabular-nums ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {item.value}
                      </span>
                      <Icon className="hidden sm:block text-sky-500" size={16} />
                    </div>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Editorial Doctor Showcase */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft glow ring */}
              <div
                className={`pointer-events-none absolute -inset-4 rounded-[2.5rem] blur-2xl ${
                  isDarkMode
                    ? "bg-gradient-to-tr from-sky-500/20 to-teal-500/15"
                    : "bg-gradient-to-tr from-sky-300/35 to-cyan-200/35"
                }`}
              />

              {/* Main Showcase Card */}
              <div
                className={`relative overflow-hidden rounded-[2rem] border p-3 shadow-2xl ${
                  isDarkMode
                    ? "border-slate-700/80 bg-slate-900/90 shadow-black/50"
                    : "border-white/90 bg-white/95 shadow-[0_24px_70px_-15px_rgba(14,165,233,0.28)]"
                }`}
              >
                <div className="relative overflow-hidden rounded-[1.5rem] bg-sky-100 dark:bg-slate-800">
                  <img
                    src={heroDocImg}
                    alt="Docdor verified medical specialist"
                    className="h-[340px] sm:h-[410px] w-full object-cover object-top"
                  />

                  {/* Subtle bottom vignette */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                  {/* Top-left Live Availability Badge */}
                  <div
                    className={`absolute left-3.5 top-3.5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-sm ${
                      isDarkMode
                        ? "border-slate-700/80 bg-slate-900/85 text-slate-100"
                        : "border-white/80 bg-white/90 text-slate-800"
                    }`}
                  >
                    <FiVideo size={13} className="text-sky-500" />
                    <span>Next Video Slot: 8 mins</span>
                  </div>

                  {/* Bottom Embedded Info Strip */}
                  <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between gap-2 rounded-2xl border border-white/20 bg-slate-950/70 px-4 py-3 text-white backdrop-blur-md">
                    <div>
                      <p className="text-xs font-medium text-sky-300">
                        Verified Patient Rating
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                          <FaStar size={12} />
                        </div>
                        <span className="text-sm font-bold tabular-nums">4.9</span>
                        <span className="text-xs text-slate-300">(12.4K+)</span>
                      </div>
                    </div>
                    <span className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                      NMC Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
