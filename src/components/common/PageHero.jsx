import { motion } from "framer-motion";
import { FiCheckCircle, FiChevronRight, FiHome, FiShield } from "react-icons/fi";
import heroDocImg from "../../assets/images/hero-doctor.jpg";
import Link from "../../router/Link";
import { ROUTES } from "../../router/routes";
import CardImage from "./CardImage";

const DEFAULT_VISUAL = {
  image: heroDocImg,
  alt: "Docdor verified medical specialist",
  objectPosition: "50% 16%",
  badge: "NMC Verified Panel",
  eyebrow: "Docdor Care Network",
  title: "Trusted Clinical Guidance",
  statValue: "24/7",
  statLabel: "Care Access",
};

const HeroVisualShowcase = ({ visual, isDarkMode }) => {
  const data = { ...DEFAULT_VISUAL, ...visual };

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Soft ambient radial glow behind showcase card */}
      <div
        className={`pointer-events-none absolute -inset-3 rounded-[2.25rem] blur-2xl ${
          isDarkMode
            ? "bg-gradient-to-tr from-sky-500/20 via-cyan-500/10 to-teal-500/15"
            : "bg-gradient-to-tr from-sky-200/65 via-cyan-100/45 to-teal-100/50"
        }`}
      />

      <div
        className={`group relative overflow-hidden rounded-[1.75rem] border p-2.5 sm:p-3 shadow-xl transition-all duration-300 ${
          isDarkMode
            ? "border-slate-700/80 bg-slate-900/95 shadow-black/50 hover:border-sky-500/40"
            : "border-sky-200/80 bg-white/95 shadow-[0_20px_50px_-14px_rgba(14,165,233,0.18)] hover:border-sky-300"
        }`}
      >
        <div
          className={`relative h-44 sm:h-52 lg:h-[212px] w-full overflow-hidden rounded-[1.25rem] ${
            isDarkMode ? "bg-slate-800" : "bg-sky-50"
          }`}
        >
          <CardImage
            src={data.image}
            alt={data.alt}
            objectPosition={data.objectPosition || "center"}
            loading="eager"
            isDarkMode={isDarkMode}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

          {data.badge && (
            <span
              className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md ${
                isDarkMode
                  ? "border-sky-400/30 bg-slate-950/80 text-sky-300"
                  : "border-white/80 bg-white/90 text-sky-700 shadow-xs"
              }`}
            >
              <FiShield size={11} className="shrink-0 text-sky-500" />
              <span>{data.badge}</span>
            </span>
          )}
        </div>

        <div
          className={`mt-2.5 flex items-center justify-between gap-3 rounded-2xl border px-3.5 py-2.5 ${
            isDarkMode
              ? "border-slate-800 bg-slate-800/75"
              : "border-sky-100/90 bg-sky-50/75"
          }`}
        >
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-500">
              {data.eyebrow}
            </p>
            <p
              className={`truncate text-sm sm:text-[15px] font-extrabold ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {data.title}
            </p>
          </div>

          {data.statValue && (
            <div className="shrink-0 text-right">
              <p
                className={`text-xs sm:text-sm font-extrabold tabular-nums ${
                  isDarkMode ? "text-emerald-400" : "text-teal-700"
                }`}
              >
                {data.statValue}
              </p>
              {data.statLabel && (
                <p
                  className={`text-[11px] ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {data.statLabel}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PageHero = ({
  isDarkMode,
  badge,
  badgeIcon: BadgeIcon = FiShield,
  title,
  highlight,
  subtitle,
  breadcrumbGroup,
  currentPage,
  children,
  trustItems,
  visual,
  rightContent,
}) => {
  return (
    <section
      className={`relative overflow-hidden border-b transition-colors duration-300 ${
        isDarkMode
          ? "border-slate-800/80 bg-gradient-to-br from-[#060B17] via-[#0B1426] to-[#081523]"
          : "border-sky-100/90 bg-gradient-to-br from-[#EDF6FF] via-white to-[#ECFEFF]"
      }`}
    >
      {/* Subtle architectural grid & ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-medical-grid opacity-55" />
      <div
        className={`pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? "bg-sky-500/15" : "bg-sky-300/30"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-24 right-8 h-72 w-72 rounded-full blur-3xl ${
          isDarkMode ? "bg-teal-500/12" : "bg-cyan-200/35"
        }`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Navigation, Heading Hierarchy, Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            {/* Compact Framed Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-3.5">
              <div
                className={`inline-flex flex-wrap items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/75 text-slate-400"
                    : "border-sky-100 bg-white/85 text-slate-600 shadow-2xs"
                }`}
              >
                <Link
                  to={ROUTES.HOME}
                  className={`inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors ${
                    isDarkMode ? "hover:text-sky-300" : "hover:text-sky-700"
                  }`}
                >
                  <FiHome size={13} />
                  <span>Home</span>
                </Link>
                {breadcrumbGroup && (
                  <>
                    <FiChevronRight size={13} className="opacity-45" />
                    <span>{breadcrumbGroup}</span>
                  </>
                )}
                <FiChevronRight size={13} className="opacity-45" />
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-sky-300" : "text-sky-700"
                  }`}
                >
                  {currentPage}
                </span>
              </div>
            </nav>

            {badge && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] uppercase ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                    : "border-sky-200 bg-sky-50/90 text-sky-700"
                }`}
              >
                {BadgeIcon && <BadgeIcon size={12} className="shrink-0 text-sky-500" />}
                <span>{badge}</span>
              </span>
            )}

            <h1
              className={`mt-3.5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.7rem] ${
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
                className={`mt-3 max-w-xl text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {subtitle}
              </p>
            )}

            {children && <div className="mt-5">{children}</div>}

            {trustItems?.length > 0 && (
              <div
                className={`mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 ${
                  isDarkMode ? "border-slate-800/80" : "border-sky-100/90"
                }`}
              >
                {trustItems.map((item) => (
                  <span
                    key={item}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    <FiCheckCircle size={13} className="shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Custom Slot or Built-in Clinical Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            {rightContent || <HeroVisualShowcase visual={visual} isDarkMode={isDarkMode} />}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
