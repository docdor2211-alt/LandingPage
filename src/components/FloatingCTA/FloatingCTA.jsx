import { FaVideo } from "react-icons/fa";

const FloatingCTA = () => {
  return (
    <button
      className="
      fixed
      bottom-24
      right-6
      z-50
      flex
      h-16
      w-16
      items-center
      justify-center
      rounded-full
      bg-slate-900
      text-white
      shadow-2xl
      transition
      duration-300
      hover:scale-110
      hover:bg-slate-700
      animate-pulse
      "
    >
      <FaVideo size={28} />
    </button>
  );
};

export default FloatingCTA;