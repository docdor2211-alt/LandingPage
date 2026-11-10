import { useEffect, useState } from "react";
import { FiArrowRight, FiCalendar, FiFileText, FiPrinter } from "react-icons/fi";
import PageHero from "./PageHero";
import Link from "../../router/Link";
import { ROUTES } from "../../router/routes";

const LegalPageLayout = ({
  isDarkMode,
  badge,
  title,
  highlight,
  subtitle,
  currentPage,
  effectiveDate = "November 10, 2026",
  version = "Version 2.4",
  summaryCards = [],
  sections = [],
  topBanner,
  children,
}) => {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || "");

  useEffect(() => {
    if (!sections.length) return;

    const handleScroll = () => {
      const offset = 150;
      let current = sections[0].id;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = sec.id;
          }
        }
      }
      setActiveSectionId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    setActiveSectionId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const relatedPolicies = [
    { label: "Privacy Policy", to: ROUTES.PRIVACY_POLICY },
    { label: "Terms & Conditions", to: ROUTES.TERMS_CONDITIONS },
    { label: "Refund Policy", to: ROUTES.REFUND_POLICY },
    { label: "Help Center", to: ROUTES.HELP_CENTER },
  ].filter((item) => item.label !== currentPage);

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge={badge}
        title={title}
        highlight={highlight}
        subtitle={subtitle}
        breadcrumbGroup="Support"
        currentPage={currentPage}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-medium ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-300"
                : "border-sky-200 bg-white/90 text-slate-700"
            }`}
          >
            <FiCalendar className="text-sky-500" />
            Effective: {effectiveDate}
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-medium ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-300"
                : "border-sky-200 bg-white/90 text-slate-700"
            }`}
          >
            <FiFileText className="text-sky-500" />
            {version}
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-semibold transition ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-200 hover:border-sky-500/60 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-sky-50"
            }`}
          >
            <FiPrinter className="text-sky-500" />
            Print / Save PDF
          </button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {summaryCards.length > 0 && (
          <div className="mb-10 grid gap-5 md:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border p-5 transition-colors ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90"
                    : "border-sky-100 bg-white shadow-[0_12px_30px_rgba(56,189,248,0.08)]"
                }`}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-500">
                  {card.icon}
                </div>
                <h2 className="text-base font-bold">{card.title}</h2>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {topBanner && <div className="mb-10">{topBanner}</div>}

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
            <div
              className={`rounded-3xl border p-5 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
                On This Page
              </p>
              <ul className="mt-4 space-y-1.5">
                {sections.map((section, idx) => {
                  const active = activeSectionId === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition ${
                          active
                            ? isDarkMode
                              ? "bg-sky-500/15 text-sky-300 font-semibold"
                              : "bg-sky-50 text-sky-700 font-semibold"
                            : isDarkMode
                              ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="text-xs opacity-60">{String(idx + 1).padStart(2, "0")}</span>
                        <span className="truncate">{section.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className={`rounded-3xl border p-5 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-sky-100 bg-gradient-to-br from-sky-50 to-white"
              }`}
            >
              <p className="font-bold text-sm">Have questions about this policy?</p>
              <p
                className={`mt-1.5 text-xs leading-relaxed ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Our compliance and patient support specialists respond within 24 hours.
              </p>
              <Link
                to={`${ROUTES.CONTACT}?topic=policy`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-sky-500/20 transition hover:opacity-95"
              >
                <span>Contact Support</span>
                <FiArrowRight />
              </Link>
            </div>
          </aside>

          {/* Main Document Body */}
          <div className="lg:col-span-8 space-y-6">
            {children}

            {sections.map((section, idx) => (
              <article
                key={section.id}
                id={section.id}
                className={`scroll-mt-28 rounded-3xl border p-6 sm:p-8 transition-colors ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/80"
                    : "border-slate-200/80 bg-white shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-xs font-bold text-sky-500">
                    {idx + 1}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold">{section.title}</h2>
                </div>

                <div
                  className={`mt-4 space-y-3 text-sm sm:text-base leading-7 ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {section.paragraphs?.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-3 space-y-2 pl-1">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}

            {/* Cross-links to related policies */}
            <div
              className={`rounded-3xl border p-6 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Related Support & Policies
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {relatedPolicies.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                      isDarkMode
                        ? "border-slate-800 bg-slate-800/60 text-slate-200 hover:border-sky-500/50"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300 hover:bg-sky-50/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1 text-sky-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;

