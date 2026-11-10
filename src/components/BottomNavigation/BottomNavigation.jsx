import {
  FaHome,
  FaFlask,
  FaPills,
  FaQuestionCircle,
  FaPlus,
} from "react-icons/fa";
import Link from "../../router/Link";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const BottomNavigation = ({ isDarkMode }) => {
  const { isActive } = useRouter();

  const itemClass = (active) =>
    `flex flex-col items-center transition-colors ${
      active
        ? "text-sky-500 font-semibold"
        : isDarkMode
          ? "text-slate-400 hover:text-sky-400"
          : "text-gray-500 hover:text-sky-600"
    }`;

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <div className="mx-auto max-w-md relative">
        <div
          className={`flex items-center justify-between rounded-2xl border shadow-lg px-4 py-2 backdrop-blur-md ${
            isDarkMode
              ? "border-slate-700 bg-slate-900/95"
              : "border-slate-200 bg-white/95"
          }`}
        >
          <Link
            to={ROUTES.HOME}
            aria-label="Home"
            className={itemClass(isActive(ROUTES.HOME))}
          >
            <FaHome size={19} />
            <span className="mt-1 text-xs">Home</span>
          </Link>

          <Link
            to={`${ROUTES.HOME}#services`}
            aria-label="Lab Tests"
            className={itemClass(false)}
          >
            <FaFlask size={19} />
            <span className="mt-1 text-xs">Lab</span>
          </Link>

          <div className="w-8" />

          <Link
            to={`${ROUTES.HOME}#services`}
            aria-label="Medicines"
            className={itemClass(false)}
          >
            <FaPills size={19} />
            <span className="mt-1 text-xs">Medicine</span>
          </Link>

          <Link
            to={ROUTES.HELP_CENTER}
            aria-label="Help Center"
            className={itemClass(isActive(ROUTES.HELP_CENTER))}
          >
            <FaQuestionCircle size={19} />
            <span className="mt-1 text-xs">Help</span>
          </Link>
        </div>

        <Link
          to={ROUTES.CONTACT}
          aria-label="Contact Support"
          title="Contact Support"
          className={`absolute left-1/2 -top-6 -translate-x-1/2 flex items-center justify-center bg-sky-600 text-white p-3 rounded-full shadow-lg border-4 transition hover:scale-105 ${
            isDarkMode ? "border-slate-900" : "border-white"
          }`}
        >
          <FaPlus size={16} />
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
