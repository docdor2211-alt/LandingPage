import { FiArrowLeft, FiCompass } from "react-icons/fi";
import Link from "../router/Link";
import { COMPANY_LINKS, ROUTES, SUPPORT_LINKS } from "../router/routes";

const NotFound = ({ isDarkMode }) => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-500">
        <FiCompass size={32} />
      </div>
      <p className="mt-5 text-sm font-bold uppercase tracking-widest text-sky-500">
        404 • Page Not Found
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
        We couldn&apos;t find that page
      </h1>
      <p className={`mx-auto mt-3 max-w-lg text-sm sm:text-base ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
        The link may have moved or been mistyped. Jump back to the homepage or choose one of our Company and Support pages below.
      </p>

      <div className="mt-7">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25"
        >
          <FiArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-left">
        {[...COMPANY_LINKS, ...SUPPORT_LINKS].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`rounded-2xl border p-4 transition ${
              isDarkMode
                ? "border-slate-800 bg-slate-900 hover:border-sky-500/50"
                : "border-slate-200 bg-white hover:border-sky-300 shadow-xs"
            }`}
          >
            <p className="font-bold text-sm">{item.label}</p>
            <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NotFound;

