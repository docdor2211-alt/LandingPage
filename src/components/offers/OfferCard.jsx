import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const OfferCard = ({
  title,
  subtitle,
  image,
  button,
  color,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-white h-75 shadow-xl"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />

      <div className="relative flex h-full flex-col justify-center p-8 text-black">
        <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold w-fit backdrop-blur">
          LIMITED OFFER
        </span>

        <h2 className="mt-5 text-4xl font-extrabold">
          {title}
        </h2>

        <p className="mt-3 text-lg">
          {subtitle}
        </p>

        <button className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105">
          {button}
          <FiArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default OfferCard;