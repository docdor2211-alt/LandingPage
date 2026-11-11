import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiCpu, FiShield, FiZap } from "react-icons/fi";
import { aiFeatures } from "./aiFeatures";
import FeatureCard from "./FeatureCard";
import robot from "../../assets/images/robot.png";
import Link from "../../router/Link";
import { ROUTES } from "../../router/routes";

const AIAssistant = ({ isDarkMode }) => {
  const [selectedId, setSelectedId] = useState(aiFeatures[0].id);

  const activeFeature =
    aiFeatures.find((item) => item.id === selectedId) || aiFeatures[0];

  return (
    <section
      id="ai-assistant"
      className={`scroll-mt-20 py-20 sm:py-24 overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#081022] via-[#060B17] to-[#081022]"
          : "bg-gradient-to-b from-sky-50/50 via-white to-slate-50/60"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
              isDarkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700"
            }`}
          >
            <FiCpu size={13} className="text-sky-500" />
            <span>AI Health Assistant</span>
          </span>

          <h2
            className={`mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Your Smart Healthcare Companion
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Physician-reviewed AI tools that organize your symptoms, decode dense prescriptions,
            and explain lab results in plain language—tap any tool to preview.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Left: Interactive Companion & Live Output Preview */}
          <div className="lg:col-span-5">
            <div
              className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/50"
                  : "border-sky-100 bg-white shadow-[0_24px_60px_-15px_rgba(14,165,233,0.18)]"
              }`}
            >
              <div
                className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl ${
                  isDarkMode ? "bg-sky-500/15" : "bg-sky-200/50"
                }`}
              />

              {/* Companion Header */}
              <div className="relative flex items-center gap-4">
                <div
                  className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border p-1.5 ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-800/80"
                      : "border-sky-100 bg-sky-50"
                  }`}
                >
                  <img
                    src={robot}
                    alt="Docdor AI Health Companion"
                    className="h-full w-full object-contain animate-gentle-float"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500">
                    <span>24/7 Active Guardrails</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-extrabold">Docdor Clinical AI</h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Instant response • Encrypted health context
                  </p>
                </div>
              </div>

              {/* Interactive Conversation Preview */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative mt-6 space-y-3"
                >
                  <div
                    className={`rounded-2xl border p-3.5 text-xs sm:text-sm ${
                      isDarkMode
                        ? "border-slate-700/80 bg-slate-800/70 text-slate-200"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      Patient Prompt • {activeFeature.title}
                    </p>
                    <p className="mt-1 font-medium leading-relaxed">
                      &ldquo;{activeFeature.samplePrompt}&rdquo;
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 text-xs sm:text-sm ${
                      isDarkMode
                        ? "border-sky-500/30 bg-sky-500/10 text-slate-200"
                        : "border-sky-200 bg-sky-50/75 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      <FiZap size={12} />
                      <span>Structured Clinical Summary</span>
                    </div>
                    <p className="mt-1.5 leading-relaxed">
                      {activeFeature.sampleResponse}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t pt-2.5 border-sky-500/20 text-[11px] font-semibold">
                      <span className="inline-flex items-center gap-1.5 text-emerald-500">
                        <FiCheckCircle size={13} />
                        {activeFeature.nextAction}
                      </span>
                      <Link
                        to={`${ROUTES.CONTACT}?topic=package&package=${encodeURIComponent(activeFeature.title)}`}
                        className="text-sky-500 hover:underline"
                      >
                        Try with Care Team &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Safety Footer */}
              <div
                className={`mt-5 flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] ${
                  isDarkMode
                    ? "bg-slate-800/60 text-slate-400"
                    : "bg-slate-100/80 text-slate-600"
                }`}
              >
                <FiShield className="shrink-0 text-sky-500" size={14} />
                <span>
                  Reviewed by MD Triage Board. Informational support only—not an emergency diagnosis.
                </span>
              </div>
            </div>
          </div>

          {/* Right: 4 Feature Cards Grid */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {aiFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                isDarkMode={isDarkMode}
                isSelected={feature.id === selectedId}
                onSelect={() => setSelectedId(feature.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
