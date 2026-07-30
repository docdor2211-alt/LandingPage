import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const FeatureCard = ({
  isDarkMode,
  title,
  description,
  icon: Icon,
  color,
  iconColor,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group rounded-3xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${isDarkMode ? "border-slate-700 bg-slate-900/90 hover:border-slate-600" : "border-gray-200 bg-white hover:border-slate-300"}`}
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
      >
        <Icon className={`text-3xl ${iconColor}`} />
      </div>

      <h3 className={`mt-6 text-xl font-bold ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
        {title}
      </h3>

      <p className={`mt-3 leading-7 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
        {description}
      </p>

      <button className={`mt-6 flex items-center gap-2 font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
        Try Now
        <FiArrowRight className="transition group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default FeatureCard;