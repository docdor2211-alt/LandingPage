import { motion } from "framer-motion";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const CardArtwork = ({ illustrationKey, isDarkMode }) => {
  const strokeAlpha = isDarkMode ? "0.22" : "0.4";
  switch (illustrationKey) {
    case "lab":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full" aria-hidden="true">
          <circle cx="480" cy="110" r="130" fill="#0ea5e9" fillOpacity={isDarkMode ? "0.14" : "0.12"} />
          <circle cx="520" cy="280" r="95" fill="#06b6d4" fillOpacity={isDarkMode ? "0.14" : "0.14"} />
          <path d="M475 75H495V95H515V115H495V135H475V115H455V95H475V75Z" fill="#0ea5e9" fillOpacity={strokeAlpha} />
        </svg>
      );
    case "consult":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full" aria-hidden="true">
          <circle cx="490" cy="120" r="135" fill="#10b981" fillOpacity={isDarkMode ? "0.14" : "0.12"} />
          <circle cx="440" cy="290" r="85" fill="#14b8a6" fillOpacity={isDarkMode ? "0.14" : "0.14"} />
          <rect x="455" y="90" width="70" height="70" rx="20" stroke="#10b981" strokeOpacity={strokeAlpha} strokeWidth="10" />
        </svg>
      );
    case "medicine":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full" aria-hidden="true">
          <circle cx="490" cy="120" r="130" fill="#f43f5e" fillOpacity={isDarkMode ? "0.14" : "0.1"} />
          <rect x="440" y="210" width="120" height="56" rx="28" stroke="#f43f5e" strokeOpacity={strokeAlpha} strokeWidth="10" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full" aria-hidden="true">
          <circle cx="485" cy="120" r="135" fill="#6366f1" fillOpacity={isDarkMode ? "0.16" : "0.12"} />
          <path d="M480 80H504V104H528V128H504V152H480V128H456V104H480V80Z" fill="#6366f1" fillOpacity={strokeAlpha} />
        </svg>
      );
  }
};

const HighlightCard = ({
  isDarkMode,
  badge,
  code,
  title,
  subtitle,
  detail,
  illustrationKey,
  button,
  accentLight,
  accentDark,
  pillColor,
  onOpenCarePlan,
}) => {
  const { navigate } = useRouter();

  const handleActionClick = () => {
    if (illustrationKey === "careplan" && onOpenCarePlan) {
      onOpenCarePlan();
      return;
    }
    navigate(`${ROUTES.CONTACT}?topic=package&package=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br p-7 sm:p-8 shadow-lg transition ${
        isDarkMode
          ? `${accentDark} text-slate-100 shadow-black/40`
          : `${accentLight} text-slate-900 shadow-[0_18px_45px_-16px_rgba(14,165,233,0.18)]`
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <CardArtwork illustrationKey={illustrationKey} isDarkMode={isDarkMode} />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${pillColor}`}
          >
            {badge || "LIMITED OFFER"}
          </span>

          {code && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-[11px] font-bold tracking-wider ${
                isDarkMode
                  ? "border-slate-600 bg-slate-800/80 text-slate-200"
                  : "border-slate-300 bg-white/85 text-slate-700"
              }`}
            >
              <FiTag size={11} className="text-sky-500" />
              <span>CODE: {code}</span>
            </span>
          )}
        </div>

        <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight">
          {title}
        </h3>

        <p
          className={`mt-1 text-base font-semibold ${
            isDarkMode ? "text-sky-300" : "text-sky-700"
          }`}
        >
          {subtitle}
        </p>

        {detail && (
          <p
            className={`mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {detail}
          </p>
        )}
      </div>

      <div className="relative z-10 mt-6">
        <button
          type="button"
          onClick={handleActionClick}
          className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm transition hover:scale-[1.02] ${
            isDarkMode
              ? "bg-white text-slate-900 hover:bg-sky-50"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          <span>{button}</span>
          <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default HighlightCard;
