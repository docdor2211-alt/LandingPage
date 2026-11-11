import { FaApple, FaGooglePlay } from "react-icons/fa";
import { FiArrowRight, FiCheck, FiHeart } from "react-icons/fi";
import { CARE_PLAN_DETAILS } from "../data/siteData";

const CarePlanBanner = ({ isDarkMode, onOpenCarePlan, onOpenDownload }) => {
  return (
    <section
      className={`py-16 sm:py-20 transition-colors duration-300 ${
        isDarkMode ? "bg-[#060B17]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`relative overflow-hidden rounded-[2rem] border p-8 sm:p-12 ${
            isDarkMode
              ? "border-sky-500/25 bg-gradient-to-br from-slate-900 via-[#0B172C] to-slate-900"
              : "border-sky-200/80 bg-gradient-to-br from-slate-900 via-[#0F1E38] to-[#0B2938] text-white"
          } shadow-2xl`}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-300">
                <FiHeart size={12} className="text-teal-300" />
                <span>{CARE_PLAN_DETAILS.name} &bull; Family Coverage</span>
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Priority Consultations &amp; 20% Lab Savings for Your Whole Family
              </h2>

              <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                Cover up to 4 family members under one membership starting at{" "}
                <strong className="text-white">₹2,499/year</strong>—including unlimited AI report
                insights, free GP video consults, and zero pharmacy delivery fees.
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {CARE_PLAN_DETAILS.benefits.slice(0, 4).map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <FiCheck size={11} />
                    </span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                    Annual Family Plan
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-white tabular-nums">
                    ₹2,499{" "}
                    <span className="text-xs font-normal text-slate-300">/ year</span>
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                  Save 30%
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenCarePlan}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
              >
                <span>Compare Care Plan Options</span>
                <FiArrowRight />
              </button>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenDownload && onOpenDownload("ios")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  <FaApple size={15} />
                  <span>App Store</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDownload && onOpenDownload("android")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  <FaGooglePlay size={13} />
                  <span>Google Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarePlanBanner;

