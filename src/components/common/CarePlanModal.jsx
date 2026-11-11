import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiHeart, FiShield, FiX } from "react-icons/fi";
import { CARE_PLAN_DETAILS } from "../../data/siteData";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const CarePlanModal = ({ isOpen, onClose, isDarkMode }) => {
  const [selectedPlanId, setSelectedPlanId] = useState("annual");
  const { navigate } = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const selectedPlan =
    CARE_PLAN_DETAILS.plans.find((p) => p.id === selectedPlanId) ||
    CARE_PLAN_DETAILS.plans[1];

  const handleEnroll = () => {
    onClose();
    navigate(`${ROUTES.CONTACT}?topic=care-plan&plan=${selectedPlan.id}`);
  };

  const handleViewTerms = () => {
    onClose();
    navigate(ROUTES.TERMS_CONDITIONS);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="care-plan-title"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl ${
              isDarkMode
                ? "border-slate-700/90 bg-slate-900 text-slate-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            {/* Accent top bar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Care Plan dialog"
              className={`absolute right-4 top-4 rounded-xl p-2 transition ${
                isDarkMode
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FiX size={20} />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-gradient-to-r from-slate-900 to-slate-800 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-white shadow-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950">
                <FiHeart size={10} />
              </span>
              <span>DOCDOR CARE PLAN</span>
            </div>

            <h2 id="care-plan-title" className="mt-4 text-2xl font-extrabold">
              {CARE_PLAN_DETAILS.name}
            </h2>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {CARE_PLAN_DETAILS.tagline}
            </p>

            {/* Billing toggle */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {CARE_PLAN_DETAILS.plans.map((plan) => {
                const active = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative rounded-2xl border p-4 text-left transition ${
                      active
                        ? isDarkMode
                          ? "border-sky-400 bg-sky-500/12 ring-2 ring-sky-400/25"
                          : "border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20"
                        : isDarkMode
                          ? "border-slate-800 bg-slate-800/50 hover:border-slate-700"
                          : "border-slate-200 bg-slate-50/70 hover:border-slate-300"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Best Value
                      </span>
                    )}
                    <p className="text-xs font-bold uppercase tracking-wide text-sky-500">
                      {plan.label}
                    </p>
                    <p className="mt-1 text-2xl font-extrabold tabular-nums">
                      {plan.price}
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {" "}
                        {plan.period}
                      </span>
                    </p>
                    <p
                      className={`mt-1.5 text-xs leading-snug ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {plan.savings}
                    </p>
                  </button>
                );
              })}
            </div>

            <ul className="mt-6 space-y-2.5">
              {CARE_PLAN_DETAILS.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <FiCheck size={12} />
                  </span>
                  <span className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleEnroll}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
              >
                <span>Request {selectedPlan.label} Plan</span>
                <FiArrowRight />
              </button>
              <button
                type="button"
                onClick={handleViewTerms}
                className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition ${
                  isDarkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <FiShield size={15} />
                <span>Plan Terms</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarePlanModal;
