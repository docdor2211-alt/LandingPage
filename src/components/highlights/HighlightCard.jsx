import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const CardArtwork = ({ illustrationKey }) => {
  switch (illustrationKey) {
    case "lab":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full object-cover" aria-hidden="true">
          <rect width="600" height="400" rx="48" fill="#22d3ee" />
          <circle cx="110" cy="118" r="80" fill="#ffffff" fillOpacity="0.25" />
          <path d="M106 72H126V92H146V112H126V132H106V112H86V92H106V72Z" fill="#ffffff" />
          <path d="M378 180H462V220H378V180Z" fill="#ffffff" opacity="0.8" />
          <path d="M378 244H496V284H378V244Z" fill="#ffffff" opacity="0.6" />
          <circle cx="238" cy="80" r="22" fill="#ffffff" opacity="0.75" />
          <circle cx="271" cy="110" r="49" fill="#ffffff" opacity="0.55" />
          <path d="M146 264H364V344H146V264Z" fill="#ffffff" opacity="0.5" />
        </svg>
      );
    case "consult":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full object-cover" aria-hidden="true">
          <rect width="600" height="400" rx="48" fill="#a7f3d0" />
          <circle cx="120" cy="130" r="80" fill="#ffffff" fillOpacity="0.35" />
          <rect x="92" y="88" width="56" height="56" rx="16" fill="#059669" />
          <rect x="132" y="118" width="56" height="24" rx="12" fill="#ffffff" />
          <rect x="222" y="208" width="280" height="120" rx="40" fill="#ffffff" opacity="0.65" />
          <path d="M256 246H364" stroke="#059669" strokeWidth="18" strokeLinecap="round" />
          <path d="M256 286H424" stroke="#059669" strokeWidth="18" strokeLinecap="round" />
          <path d="M256 326H340" stroke="#059669" strokeWidth="18" strokeLinecap="round" />
          <circle cx="362" cy="92" r="88" fill="#ffffff" opacity="0.9" />
          <path d="M378 80H404V104H378V80Z" fill="#059669" />
        </svg>
      );
    case "medicine":
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full object-cover" aria-hidden="true">
          <rect width="600" height="400" rx="48" fill="#fbcfe8" />
          <rect x="92" y="108" width="160" height="220" rx="36" fill="#ffffff" fillOpacity="0.4" />
          <rect x="110" y="132" width="124" height="44" rx="22" fill="#db2777" />
          <circle cx="180" cy="232" r="36" fill="#ffffff" />
          <circle cx="160" cy="232" r="14" fill="#f472b6" />
          <path d="M262 140L430 104V336L262 300V140Z" fill="#ffffff" opacity="0.8" />
          <rect x="282" y="198" width="132" height="24" rx="12" fill="#ec4899" />
          <rect x="282" y="246" width="92" height="24" rx="12" fill="#ec4899" />
          <rect x="282" y="294" width="52" height="24" rx="12" fill="#ec4899" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 600 400" fill="none" className="h-full w-full object-cover" aria-hidden="true">
          <rect width="600" height="400" rx="48" fill="#c7d2fe" />
          <circle cx="140" cy="128" r="80" fill="#ffffff" fillOpacity="0.4" />
          <path d="M180 88H220V128H260V168H220V208H180V168H140V128H180V88Z" fill="#4338ca" />
          <path d="M298 240H472V312H298V240Z" fill="#ffffff" opacity="0.75" />
          <rect x="196" y="124" width="120" height="80" rx="24" fill="#ffffff" opacity="0.55" />
          <circle cx="224" cy="128" r="32" fill="#4338ca" opacity="0.9" />
          <circle cx="285" cy="128" r="59" fill="#ffffff" opacity="0.75" />
          <rect x="282" y="264" width="140" height="72" rx="36" fill="#ffffff" opacity="0.65" />
          <path d="M280 294H380" stroke="#4338ca" strokeWidth="18" strokeLinecap="round" />
          <path d="M280 328H360" stroke="#4338ca" strokeWidth="18" strokeLinecap="round" />
        </svg>
      );
  }
};

const HighlightCard = ({
  title,
  subtitle,
  illustrationKey,
  button,
}) => {
  const { navigate } = useRouter();

  const handleActionClick = () => {
    navigate(`${ROUTES.CONTACT}?topic=package&package=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-white h-75 shadow-xl"
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-15">
        <CardArtwork illustrationKey={illustrationKey} />
      </div>

      <div className="relative flex h-full flex-col justify-center p-8 text-black">
        <span className="rounded-full bg-white/60 px-4 py-1 text-sm font-semibold w-fit backdrop-blur">
          LIMITED OFFER
        </span>

        <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold">
          {title}
        </h2>

        <p className="mt-3 text-lg">
          {subtitle}
        </p>

        <button
          type="button"
          onClick={handleActionClick}
          className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:scale-105"
        >
          {button}
          <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default HighlightCard;
