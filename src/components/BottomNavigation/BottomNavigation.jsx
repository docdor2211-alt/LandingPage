import {
  FiBookOpen,
  FiGrid,
  FiHelpCircle,
  FiHome,
  FiVideo,
} from "react-icons/fi";
import Link from "../../router/Link";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const BottomNavigation = ({ isDarkMode }) => {
  const { isActive } = useRouter();

  const itemClass = (active) =>
    `flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors ${
      active
        ? "text-sky-500 font-semibold"
        : isDarkMode
          ? "text-slate-400 hover:text-sky-300"
          : "text-slate-500 hover:text-sky-600"
    }`;

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-3 left-3 right-3 z-40 md:hidden print:hidden"
    >
      <div className="mx-auto max-w-md relative">
        <div
          className={`flex items-center justify-between rounded-2xl border px-3 py-1.5 shadow-xl backdrop-blur-xl ${
            isDarkMode
              ? "border-slate-700/80 bg-slate-900/92 shadow-black/50"
              : "border-slate-200/90 bg-white/92 shadow-sky-900/10"
          }`}
        >
          <Link
            to={ROUTES.HOME}
            aria-label="Home"
            className={itemClass(isActive(ROUTES.HOME))}
          >
            <FiHome size={18} />
            <span>Home</span>
          </Link>

          <Link
            to={`${ROUTES.HOME}#services`}
            aria-label="Care Services"
            className={itemClass(false)}
          >
            <FiGrid size={18} />
            <span>Services</span>
          </Link>

          <div className="w-12" aria-hidden="true" />

          <Link
            to={ROUTES.BLOG}
            aria-label="Health Blog"
            className={itemClass(isActive(ROUTES.BLOG))}
          >
            <FiBookOpen size={18} />
            <span>Journal</span>
          </Link>

          <Link
            to={ROUTES.HELP_CENTER}
            aria-label="Help Center"
            className={itemClass(isActive(ROUTES.HELP_CENTER))}
          >
            <FiHelpCircle size={18} />
            <span>Help</span>
          </Link>
        </div>

        <Link
          to={`${ROUTES.CONTACT}?topic=package`}
          aria-label="Book Consultation"
          title="Book Consultation"
          className={`absolute left-1/2 -top-5 -translate-x-1/2 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 text-white shadow-lg shadow-sky-500/35 ring-4 transition-transform active:scale-95 hover:scale-105 ${
            isDarkMode ? "ring-[#060B17]" : "ring-slate-50"
          }`}
        >
          <FiVideo size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
