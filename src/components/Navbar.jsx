import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiFileText,
  FiHeart,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiMoon,
  FiSearch,
  FiSun,
  FiX,
} from "react-icons/fi";
import BrandLogo from "./common/BrandLogo";
import Link from "../router/Link";
import { useRouter } from "../router/routerContext";
import { COMPANY_LINKS, getBlogPostRoute, ROUTES, SUPPORT_LINKS } from "../router/routes";
import {
  BLOG_POSTS,
  CITIES,
  HELP_FAQS,
  JOB_OPENINGS,
  SEARCHABLE_INDEX,
} from "../data/siteData";

const Navbar = ({
  isDarkMode,
  toggleTheme,
  selectedCity,
  onSelectCity,
  onOpenCarePlan,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "company" | "support" | "city" | null
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const navContainerRef = useRef(null);
  const { pathname, navigate, isActive } = useRouter();

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setSearchFocused(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setSearchFocused(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setSearchFocused(false);
  }, [pathname]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const pageMatches = SEARCHABLE_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );

    const blogMatches = BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q))
    ).map((post) => ({
      title: post.title,
      subtitle: `${post.category} • ${post.readTime}`,
      to: getBlogPostRoute(post.id),
      type: "Blog",
    }));

    const faqMatches = HELP_FAQS.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    ).map((faq) => ({
      title: faq.question,
      subtitle: "Help Center FAQ",
      to: `${ROUTES.HELP_CENTER}#faq-section`,
      type: "FAQ",
    }));

    const roleMatches = JOB_OPENINGS.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q)
    ).map((job) => ({
      title: job.title,
      subtitle: `${job.department} • ${job.mode}`,
      to: `${ROUTES.CAREERS}#open-roles`,
      type: "Career",
    }));

    return [...pageMatches, ...blogMatches, ...faqMatches, ...roleMatches].slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].to);
      setSearchQuery("");
      setSearchFocused(false);
      setMenuOpen(false);
    } else if (searchQuery.trim()) {
      navigate(ROUTES.HELP_CENTER);
      setSearchFocused(false);
      setMenuOpen(false);
    }
  };

  const handleSelectSearchResult = (to) => {
    navigate(to);
    setSearchQuery("");
    setSearchFocused(false);
    setMenuOpen(false);
  };

  const isCompanyActive = COMPANY_LINKS.some((link) => isActive(link.to));
  const isSupportActive = SUPPORT_LINKS.some((link) => isActive(link.to));

  const navLinkBtn = (active) =>
    `inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
      active
        ? isDarkMode
          ? "bg-sky-500/15 text-sky-300"
          : "bg-sky-50 text-sky-700"
        : isDarkMode
          ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
    }`;

  const chipClasses = isDarkMode
    ? "border-slate-700/80 bg-slate-800/70 text-slate-200 hover:border-sky-500/50"
    : "border-slate-200/90 bg-slate-50/80 text-slate-700 hover:border-sky-300 hover:bg-white";

  const iconButtonClasses = isDarkMode
    ? "border-slate-700/80 bg-slate-800/70 hover:bg-slate-700/80 text-slate-200"
    : "border-slate-200/90 bg-white hover:bg-sky-50 text-slate-700 hover:border-sky-300";

  const inputClasses = isDarkMode
    ? "border-slate-700/80 bg-slate-800/80 text-slate-100 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/30"
    : "border-slate-200/90 bg-slate-50/90 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-400 focus:ring-sky-400/25";

  const dropdownMenuClasses = isDarkMode
    ? "border-slate-700/90 bg-slate-900/98 text-slate-100 shadow-2xl shadow-black/60 backdrop-blur-xl"
    : "border-slate-200/80 bg-white/98 text-slate-900 shadow-2xl shadow-sky-900/10 backdrop-blur-xl";

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-xl ${
        isDarkMode
          ? "border-slate-800/80 bg-[#060B17]/80"
          : "border-slate-200/70 bg-white/80"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-17 sm:h-18 items-center justify-between gap-3">
          {/* Brand */}
          <Link to={ROUTES.HOME} aria-label="Docdor Home" className="shrink-0">
            <BrandLogo isDarkMode={isDarkMode} size="md" />
          </Link>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <nav aria-label="Primary navigation" className="flex items-center gap-0.5 xl:gap-1">
              <Link
                to={`${ROUTES.HOME}#services`}
                className={navLinkBtn(false)}
              >
                Services
              </Link>

              <Link
                to={`${ROUTES.HOME}#ai-assistant`}
                className={`hidden xl:inline-flex ${navLinkBtn(false)}`}
              >
                AI Assistant
              </Link>

              {/* Company Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={openDropdown === "company"}
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === "company" ? null : "company"))
                  }
                  className={navLinkBtn(isCompanyActive || openDropdown === "company")}
                >
                  <span>Company</span>
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "company" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "company" && (
                  <div
                    className={`absolute left-0 top-full mt-2.5 w-76 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
                  >
                    <p className="px-3 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      About &amp; Insights
                    </p>
                    {COMPANY_LINKS.map((item) => {
                      const active = isActive(item.to);
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition ${
                            active
                              ? isDarkMode
                                ? "bg-sky-500/15 text-sky-300"
                                : "bg-sky-50 text-sky-700"
                              : isDarkMode
                                ? "hover:bg-slate-800/80"
                                : "hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                          <FiArrowRight
                            size={14}
                            className="shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-sky-500"
                          />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Support Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={openDropdown === "support"}
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === "support" ? null : "support"))
                  }
                  className={navLinkBtn(isSupportActive || openDropdown === "support")}
                >
                  <span>Support</span>
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === "support" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "support" && (
                  <div
                    className={`absolute left-0 top-full mt-2.5 w-76 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
                  >
                    <p className="px-3 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      Help &amp; Policies
                    </p>
                    {SUPPORT_LINKS.map((item) => {
                      const active = isActive(item.to);
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`group flex items-center justify-between rounded-xl px-3 py-2.5 transition ${
                            active
                              ? isDarkMode
                                ? "bg-sky-500/15 text-sky-300"
                                : "bg-sky-50 text-sky-700"
                              : isDarkMode
                                ? "hover:bg-slate-800/80"
                                : "hover:bg-slate-50"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>
                          <FiArrowRight
                            size={14}
                            className="shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-sky-500"
                          />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            <div className={`mx-1 h-6 w-px ${isDarkMode ? "bg-slate-800" : "bg-slate-200"}`} />

            {/* Location Selector */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={openDropdown === "city"}
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "city" ? null : "city"))
                }
                className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-semibold transition ${chipClasses}`}
                aria-label="Select city"
              >
                <FiMapPin className="text-sky-500 shrink-0" size={14} />
                <span className="whitespace-nowrap">
                  {selectedCity.split(",")[0]}
                </span>
                <FiChevronDown
                  size={12}
                  className={`opacity-60 transition-transform ${
                    openDropdown === "city" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "city" && (
                <div
                  className={`absolute left-0 top-full mt-2.5 w-52 rounded-2xl border p-1.5 z-50 ${dropdownMenuClasses}`}
                >
                  <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                    Service City
                  </p>
                  {CITIES.map((city) => {
                    const chosen = city === selectedCity;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          onSelectCity(city);
                          setOpenDropdown(null);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                          chosen
                            ? isDarkMode
                              ? "bg-sky-500/20 text-sky-300 font-semibold"
                              : "bg-sky-50 text-sky-700 font-semibold"
                            : isDarkMode
                              ? "hover:bg-slate-800"
                              : "hover:bg-slate-50"
                        }`}
                      >
                        <span>{city}</span>
                        {chosen && <FiCheck size={13} className="text-sky-500" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Live Search */}
            <div className="relative w-40 xl:w-52">
              <form onSubmit={handleSearchSubmit}>
                <FiSearch
                  size={14}
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? "text-slate-400" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder="Search care, FAQs..."
                  aria-label="Search site"
                  className={`w-full rounded-xl border py-2 pl-8.5 pr-7 text-xs font-medium focus:outline-none focus:ring-2 transition ${inputClasses}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <FiX size={13} />
                  </button>
                )}
              </form>

              {searchFocused && searchQuery.trim() && (
                <div
                  className={`absolute right-0 top-full mt-2.5 w-80 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
                >
                  {searchResults.length === 0 ? (
                    <div className="px-3 py-4 text-center text-xs opacity-75">
                      No results for &ldquo;{searchQuery}&rdquo;. Press Enter to browse Help Center.
                    </div>
                  ) : (
                    searchResults.map((res, idx) => (
                      <button
                        key={`${res.to}-${idx}`}
                        type="button"
                        onClick={() => handleSelectSearchResult(res.to)}
                        className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2 text-left transition ${
                          isDarkMode ? "hover:bg-slate-800" : "hover:bg-sky-50/70"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold">{res.title}</p>
                          <p
                            className={`truncate text-[11px] ${
                              isDarkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                          >
                            {res.subtitle}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-500">
                          {res.type}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Care Plan Pill */}
            <button
              type="button"
              onClick={onOpenCarePlan}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition shadow-sm whitespace-nowrap ${
                isDarkMode
                  ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white hover:brightness-110 shadow-sky-500/20"
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/15"
              }`}
            >
              <FiHeart size={13} className="text-teal-300" />
              <span>Care Plan</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Light mode" : "Dark mode"}
              className={`h-9 w-9 rounded-xl border transition flex items-center justify-center shrink-0 ${iconButtonClasses}`}
            >
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Help Center Shortcut */}
            <Link
              to={ROUTES.HELP_CENTER}
              aria-label="Help Center"
              title="Help Center"
              className={`hidden xl:flex h-9 w-9 rounded-xl border transition items-center justify-center shrink-0 ${
                isActive(ROUTES.HELP_CENTER)
                  ? "border-sky-500 bg-sky-500 text-white"
                  : iconButtonClasses
              }`}
            >
              <FiFileText size={16} />
            </Link>

            {/* Contact Support Shortcut */}
            <Link
              to={ROUTES.CONTACT}
              aria-label="Contact Support"
              title="Contact Support"
              className={`h-9 w-9 rounded-xl border transition flex items-center justify-center shrink-0 ${
                isActive(ROUTES.CONTACT)
                  ? "border-sky-500 bg-sky-500 text-white"
                  : iconButtonClasses
              }`}
            >
              <FiMessageCircle size={16} />
            </Link>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenCarePlan}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold ${
                isDarkMode
                  ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white"
                  : "bg-slate-900 text-white"
              }`}
            >
              <FiHeart size={12} className="text-teal-300" />
              <span>Care Plan</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`rounded-xl border p-2.5 transition ${iconButtonClasses}`}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`rounded-xl border p-2.5 transition ${iconButtonClasses}`}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {menuOpen && (
        <div
          className={`lg:hidden border-t px-4 sm:px-6 py-5 max-h-[82vh] overflow-y-auto ${
            isDarkMode
              ? "border-slate-800 bg-[#060B17]/98 text-slate-100"
              : "border-slate-200 bg-white/98 text-slate-900"
          }`}
        >
          <div className="mx-auto max-w-2xl space-y-5">
            {/* Search with Live Results */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <FiSearch
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, help, blog, roles..."
                  className={`w-full border rounded-xl py-3 pl-10 pr-9 text-sm focus:outline-none focus:ring-2 ${inputClasses}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </form>

              {searchQuery.trim() && (
                <div
                  className={`mt-2 rounded-2xl border p-2 ${
                    isDarkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  {searchResults.length === 0 ? (
                    <p className="px-3 py-2 text-xs opacity-75">
                      No instant matches. Tap Enter to browse Help Center.
                    </p>
                  ) : (
                    searchResults.map((res, idx) => (
                      <button
                        key={`${res.to}-${idx}`}
                        type="button"
                        onClick={() => handleSelectSearchResult(res.to)}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs ${
                          isDarkMode ? "hover:bg-slate-800" : "hover:bg-white"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{res.title}</p>
                          <p className="truncate text-[11px] opacity-70">{res.subtitle}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold text-sky-500">
                          {res.type}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* City & Care Plan */}
            <div className="grid grid-cols-2 gap-3">
              <select
                aria-label="Select city"
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value)}
                className={`border rounded-xl px-3 py-2.5 text-xs font-semibold ${chipClasses}`}
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenCarePlan();
                }}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-sm ${
                  isDarkMode
                    ? "bg-gradient-to-r from-sky-500 to-teal-500"
                    : "bg-slate-900"
                }`}
              >
                <FiHeart size={13} className="text-teal-300" />
                <span>Care Plan</span>
              </button>
            </div>

            {/* Quick Home Sections */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Services", to: `${ROUTES.HOME}#services` },
                { label: "AI Assistant", to: `${ROUTES.HOME}#ai-assistant` },
                { label: "Offers", to: `${ROUTES.HOME}#health-packages` },
              ].map((quick) => (
                <Link
                  key={quick.to}
                  to={quick.to}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold ${chipClasses}`}
                >
                  {quick.label}
                </Link>
              ))}
            </div>

            {/* Nav Links */}
            <div className="grid grid-cols-2 gap-6 border-t pt-4 border-slate-200 dark:border-slate-800">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-sky-500">
                  Company
                </p>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <Link
                      to={ROUTES.HOME}
                      className={`block py-1 font-medium ${
                        isActive(ROUTES.HOME) ? "text-sky-500 font-bold" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  {COMPANY_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`block py-1 font-medium ${
                          isActive(item.to) ? "text-sky-500 font-bold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-sky-500">
                  Support
                </p>
                <ul className="space-y-1.5 text-sm">
                  {SUPPORT_LINKS.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`block py-1 font-medium ${
                          isActive(item.to) ? "text-sky-500 font-bold" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
