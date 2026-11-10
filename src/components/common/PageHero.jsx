import { motion } from "framer-motion";
import { FiChevronRight, FiHome } from "react-icons/fi";
import Link from "../../router/Link";
import { ROUTES } from "../../router/routes";

const PageHero = ({
  isDarkMode,
  badge,
  title,
  highlight,
  subtitle,
  breadcrumbGroup,
  currentPage,
  children,
  rightContent,
}) => {
  return (
    <section
      className={`relative overflow-hidden border-b transition-colors duration-300 ${
        isDarkMode
          ? "border-slate-800/80 bg-gradient-to-br from-[#060B17] via-slate-900 to-[#081326]"
          : "border-slate-200/70 bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/60"
      }`}
    >
      {/* Subtle architectural grid & ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-medical-grid opacity-50" />
      <div
        className={`pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-sky-500/15" : "bg-sky-300/30"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-teal-500/12" : "bg-cyan-200/35"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className={`mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          <Link
            to={ROUTES.HOME}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 -ml-2 transition-colors ${
              isDarkMode
                ? "hover:bg-slate-800/70 hover:text-sky-300"
                : "hover:bg-sky-50 hover:text-sky-700"
            }`}
          >
            <FiHome size={14} />
            <span>Home</span>
          </Link>
          {breadcrumbGroup && (
            <>
              <FiChevronRight size={14} className="opacity-50" />
              <span>{breadcrumbGroup}</span>
            </>
          )}
          <FiChevronRight size={14} className="opacity-50" />
          <span
            className={`font-semibold ${
              isDarkMode ? "text-sky-300" : "text-sky-700"
            }`}
          >
            {currentPage}
          </span>
        </nav>

        <div
          className={`grid gap-10 items-center ${
            rightContent ? "lg:grid-cols-12" : "grid-cols-1"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={rightContent ? "lg:col-span-7" : "max-w-3xl"}
          >
            {badge && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                    : "border-sky-200 bg-sky-50 text-sky-700"
                }`}
              >
                {badge}
              </span>
            )}

            <h1
              className={`mt-5 text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-5xl ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {title}{" "}
              {highlight && (
                <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                  {highlight}
                </span>
              )}
            </h1>

            {subtitle && (
              <p
                className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {subtitle}
              </p>
            )}

            {children && <div className="mt-7">{children}</div>}
          </motion.div>

          {rightContent && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
              className="lg:col-span-5"
            >
              {rightContent}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
