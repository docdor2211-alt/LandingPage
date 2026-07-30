import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const ServiceCard = ({
  isDarkMode,
  title,
  description,
  icon: Icon,
  color,
  iconColor,
  free,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isDarkMode ? "border-slate-700 bg-slate-900/90 hover:border-slate-600" : "border-gray-200 bg-white hover:border-slate-300"}`}
    >
      {free && (
        <span className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
          FREE
        </span>
      )}

      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon className={`text-3xl ${iconColor}`} />
      </div>

      <h3 className={`mt-6 text-xl font-bold ${isDarkMode ? "text-slate-100" : "text-gray-800"}`}>
        {title}
      </h3>

      <p className={`mt-3 leading-7 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
        {description}
      </p>

      <button className={`mt-6 flex items-center gap-2 font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
        Learn More
        <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>

      <div className={`absolute inset-x-0 bottom-0 h-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isDarkMode ? "bg-slate-100" : "bg-slate-900"}`}></div>
    </motion.div>
  );
};

export default ServiceCard;