import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Link from "../../router/Link";
import { ROUTES } from "../../router/routes";

const ServiceCard = ({
  isDarkMode,
  title,
  description,
  image,
  badge,
  perk,
  free,
}) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 ${
        isDarkMode
          ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40 shadow-lg shadow-black/30"
          : "border-slate-200/90 bg-white hover:border-sky-300 shadow-[0_12px_36px_-15px_rgba(14,165,233,0.16)]"
      }`}
    >
      {/* Visual Header */}
      <div className="relative h-52 overflow-hidden bg-sky-50 dark:bg-slate-800">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

        {/* Badge / Free Tag */}
        {badge && (
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm ${
              free
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                : "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3
            className={`text-xl font-bold tracking-tight transition-colors group-hover:text-sky-500 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-2.5 text-sm leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div
          className={`mt-5 flex items-center justify-between border-t pt-4 ${
            isDarkMode ? "border-slate-800" : "border-slate-100"
          }`}
        >
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <FiCheckCircle className="text-emerald-500 shrink-0" size={14} />
            <span>{perk}</span>
          </span>

          <Link
            to={`${ROUTES.CONTACT}?topic=package&package=${encodeURIComponent(title)}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-400 transition-colors"
          >
            <span>Book</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default ServiceCard;
