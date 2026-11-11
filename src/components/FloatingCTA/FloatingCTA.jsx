import { FiVideo } from "react-icons/fi";
import Link from "../../router/Link";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const FloatingCTA = ({ isDarkMode }) => {
  const { pathname } = useRouter();

  if (pathname === ROUTES.CONTACT) {
    return null;
  }

  return (
    <Link
      to={`${ROUTES.CONTACT}?topic=package`}
      aria-label="Book Instant Video Consultation"
      className={`hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold shadow-2xl transition-all duration-300 hover:-translate-y-0.5 print:hidden ${
        isDarkMode
          ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sky-500/25 hover:brightness-110"
          : "bg-slate-900 text-white shadow-slate-900/25 hover:bg-slate-800"
      }`}
    >
      <FiVideo size={16} className="text-sky-300" />
      <span>Consult a Doctor</span>
    </Link>
  );
};

export default FloatingCTA;
