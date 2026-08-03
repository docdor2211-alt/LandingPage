import { motion } from "framer-motion";
import bgImage from "../../assets/images/e-pres1.png";

const FeatureCard = ({ isDarkMode, title }) => {
  return (
    <div
      className="relative w-full md:w-80 bg-cover bg-center rounded-3xl min-h-[220px] overflow-hidden p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-y-0 right-0 w-2/3 flex items-center pr-4 md:pr-6">
        <h3 className="w-full text-right text-base md:text-lg font-bold text-black leading-tight drop-shadow-md break-words">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default FeatureCard;