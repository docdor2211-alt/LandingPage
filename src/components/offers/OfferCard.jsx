import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const OfferCard = ({
  isDarkMode,
  title,
  subtitle,
  image,
  button,
}) => {
  const { navigate } = useRouter();

  const handleOfferClick = () => {
    navigate(`${ROUTES.CONTACT}?topic=offer&offer=${encodeURIComponent(title)}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl border min-h-[260px] shadow-lg ${
        isDarkMode
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-15"
      />

      <div className="relative flex h-full flex-col justify-center p-8">
        <span className="rounded-full bg-sky-500/15 px-3.5 py-1 text-xs font-bold text-sky-500 w-fit">
          LIMITED OFFER
        </span>

        <h3 className="mt-4 text-3xl font-extrabold">{title}</h3>

        <p className={`mt-2 text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
          {subtitle}
        </p>

        <button
          type="button"
          onClick={handleOfferClick}
          className={`mt-6 flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:scale-105 ${
            isDarkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
          }`}
        >
          {button}
          <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default OfferCard;
