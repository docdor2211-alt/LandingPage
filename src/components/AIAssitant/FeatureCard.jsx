import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const FeatureCard = ({
  isDarkMode,
  title,
  badge,
  description,
  icon: Icon,
  iconBg,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group w-full rounded-3xl border p-6 text-left transition-all duration-250 ${
        isSelected
          ? isDarkMode
            ? "border-sky-400 bg-slate-900 ring-2 ring-sky-400/25 shadow-xl shadow-sky-950/50"
            : "border-sky-500 bg-white ring-2 ring-sky-400/25 shadow-[0_18px_45px_-12px_rgba(14,165,233,0.24)]"
          : isDarkMode
            ? "border-slate-800 bg-slate-900/75 hover:border-slate-700 hover:bg-slate-900"
            : "border-slate-200/90 bg-white/90 hover:border-sky-300 shadow-xs"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
        >
          {Icon && <Icon size={21} />}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[11px] font-bold ${
            isSelected
              ? "bg-sky-500 text-white"
              : isDarkMode
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {badge}
        </span>
      </div>

      <h3
        className={`mt-4 text-lg font-bold tracking-tight ${
          isDarkMode ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-sm leading-relaxed ${
          isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {description}
      </p>

      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-500">
        <span>{isSelected ? "Previewing live example" : "Preview example"}</span>
        <FiArrowRight
          className={`transition-transform ${
            isSelected ? "translate-x-1" : "group-hover:translate-x-1"
          }`}
        />
      </div>
    </motion.button>
  );
};

export default FeatureCard;
