import { FiArrowLeft, FiArrowRight, FiCompass, FiMessageCircle } from "react-icons/fi";
import Link from "../router/Link";
import { COMPANY_LINKS, ROUTES, SUPPORT_LINKS } from "../router/routes";

const NotFound = ({ isDarkMode }) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-medical-grid opacity-50" />
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${
          isDarkMode ? "bg-sky-500/15" : "bg-sky-200/50"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500 shadow-sm">
          <FiCompass size={32} />
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
          404 • Page Not Found
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
          We couldn&apos;t find{" "}
          <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
            that page
          </span>
        </h1>
        <p
          className={`mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          The link may have moved or been mistyped. Jump back to the homepage or choose one of our Company and Support pages below.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
          >
            <FiArrowLeft />
            <span>Back to Home</span>
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-semibold transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                : "border-slate-200 bg-white text-slate-900 hover:border-sky-300 shadow-xs"
            }`}
          >
            <FiMessageCircle className="text-sky-500" />
            <span>Contact Support</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-left">
          {[...COMPANY_LINKS, ...SUPPORT_LINKS].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`group rounded-2xl border p-4 transition ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/50"
                  : "border-slate-200/80 bg-white shadow-xs hover:border-sky-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-sm group-hover:text-sky-500 transition-colors">
                  {item.label}
                </p>
                <FiArrowRight
                  size={14}
                  className="shrink-0 text-sky-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                />
              </div>
              <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
