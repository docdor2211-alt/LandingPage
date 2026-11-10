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
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-sky-100 via-slate-50 to-white"
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? "bg-sky-500/20" : "bg-sky-400/30"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-cyan-500/15" : "bg-sky-300/30"
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
            className={`inline-flex items-center gap-1.5 transition-colors ${
              isDarkMode ? "hover:text-sky-300" : "hover:text-sky-600"
            }`}
          >
            <FiHome size={14} />
            <span>Home</span>
          </Link>
          {breadcrumbGroup && (
            <>
              <FiChevronRight size={14} className="opacity-60" />
              <span>{breadcrumbGroup}</span>
            </>
          )}
          <FiChevronRight size={14} className="opacity-60" />
          <span className={isDarkMode ? "text-sky-300 font-semibold" : "text-sky-700 font-semibold"}>
            {currentPage}
          </span>
        </nav>

        <div
          className={`grid gap-10 items-center ${
            rightContent ? "lg:grid-cols-12" : "grid-cols-1"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={rightContent ? "lg:col-span-7" : "max-w-3xl"}
          >
            {badge && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm ${
                  isDarkMode
                    ? "border-sky-500/40 bg-blue-900/60 text-sky-200"
                    : "border-sky-200 bg-blue-100/90 text-blue-900"
                }`}
              >
                {badge}
              </span>
            )}

            <h1
              className={`mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${
                isDarkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              {title}{" "}
              {highlight && (
                <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
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

