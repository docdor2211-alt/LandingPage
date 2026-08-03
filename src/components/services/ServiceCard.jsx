import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const ServiceCard = ({
  isDarkMode,
  title,
  description,
  image,
  color,
  free,
  fullBackground,
}) => {
  const bgStyle = fullBackground && image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {};

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={bgStyle}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${isDarkMode ? "border-slate-700 bg-slate-900/95 hover:border-slate-600" : "border-slate-200 bg-white/95 hover:border-slate-300"} ${fullBackground ? "p-0 shadow-lg bg-cover bg-center" : "p-4 shadow-lg"}`}
    >
      {free && (
        <span className={fullBackground ? "absolute left-1/2 -translate-x-1/2 bottom-2 rounded-full bg-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md z-20" : "absolute right-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-sm z-20"}>
          FREE
        </span>
      )}

      {fullBackground && image ? (
        <>
          <div className="absolute left-0 right-0 top-4 z-30 flex justify-center">
            <div className={`rounded-full px-4 py-1 ${isDarkMode ? 'bg-black/55 text-slate-100' : 'bg-white/90 text-slate-900'} shadow-sm`}>{title}</div>
          </div>
          <div className="relative z-10 flex h-78 w-full items-end justify-center">
            {/* <div className={`w-full rounded-b-2xl p-4 ${isDarkMode ? "bg-black/28" : "bg-white/65"}`}>
              <p className={`mt-2 text-xs text-center ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
            </div> */}
          </div>
        </>
      ) : (
        <>
          {image && (
            <div className={`mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-[1rem] bg-gradient-to-br ${color} p-4 shadow-inner`}>
              <img src={image} alt={title} className="h-full w-full object-contain" />
            </div>
          )}

          <h3 className={`text-xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
            {title}
          </h3>

          {/* <p className={`mt-3 text-sm leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            {description}
          </p> */}
{/* 
          <div className="mt-6 flex justify-center">
            <button className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${isDarkMode ? "border-slate-700 text-slate-100 hover:border-slate-500" : "border-slate-200 text-slate-900 hover:border-slate-300"}`}>
              Learn More
              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div> */}
        </>
      )}
    </motion.div>
  );
};

export default ServiceCard;