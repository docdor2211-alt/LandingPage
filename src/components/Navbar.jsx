import { useEffect, useMemo, useRef, useState } from "react";
import {
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
import Logo from "../assets/images/doc_1.png";
import Link from "../router/Link";
import { useRouter } from "../router/routerContext";
import { COMPANY_LINKS, ROUTES, SUPPORT_LINKS } from "../router/routes";
import { BLOG_POSTS, CITIES, HELP_FAQS, JOB_OPENINGS, SEARCHABLE_INDEX } from "../data/siteData";

const Navbar = ({ isDarkMode, toggleTheme, selectedCity, onSelectCity, onOpenCarePlan }) => {
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
        post.category.toLowerCase().includes(q)
    ).map((post) => ({
      title: post.title,
      subtitle: `${post.category} • ${post.readTime}`,
      to: `${ROUTES.BLOG}#${post.id}`,
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
    } else if (searchQuery.trim()) {
      navigate(ROUTES.HELP_CENTER);
      setSearchFocused(false);
    }
  };

  const shellClasses = isDarkMode
    ? "bg-slate-950/75 text-slate-100"
    : "bg-sky-100/90 text-slate-900";

  const panelClasses = isDarkMode
    ? "bg-slate-900/95 text-slate-100 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    : "bg-sky-50/95 text-gray-900 shadow-[0_24px_70px_rgba(56,189,248,0.18)]";

  const chipClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/70 text-slate-100 hover:border-slate-500"
    : "border-slate-200 bg-white/80 text-slate-900 hover:border-sky-300";

  const iconButtonClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-100"
    : "border-slate-200 bg-white/80 hover:bg-sky-100/80 text-slate-900";

  const inputClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/80 text-slate-100 placeholder:text-slate-400 focus:ring-sky-500"
    : "border-slate-200 bg-white/85 text-slate-900 placeholder:text-slate-400 focus:ring-sky-400";

  const dropdownMenuClasses = isDarkMode
    ? "border-slate-700 bg-slate-900 text-slate-100 shadow-2xl shadow-slate-950/80"
    : "border-sky-100 bg-white text-slate-900 shadow-2xl shadow-sky-200/50";

  const mobileMenuClasses = isDarkMode
    ? "border-slate-800 bg-slate-900/95 text-slate-100"
    : "border-slate-200/70 bg-sky-50/95 text-slate-900";

  const isCompanyActive = COMPANY_LINKS.some((link) => isActive(link.to));
  const isSupportActive = SUPPORT_LINKS.some((link) => isActive(link.to));

  return (
    <header ref={navContainerRef} className={`sticky top-0 z-50 ${shellClasses} backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3">
        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-1 rounded-4xl ${
              isDarkMode ? "bg-slate-800/60" : "bg-sky-200/50"
            } blur-3xl opacity-90`}
          />

          <div className={`relative rounded-4xl ${panelClasses} transition-all duration-300`}>
            <div className="relative h-20 flex items-center justify-between gap-2 px-4 sm:px-5">
              {/* Logo */}
              <Link
                to={ROUTES.HOME}
                aria-label="Docdor Home"
                className="flex items-center gap-2 shrink-0 overflow-hidden h-16"
              >
                <img
                  src={Logo}
                  alt="Docdor logo"
                  className="h-32 w-32 sm:h-35 sm:w-35 rounded-2xl object-contain"
                />
              </Link>

              {/* Desktop Controls & Navigation */}
              <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
                {/* Company Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === "company" ? null : "company"))
                    }
                    className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isCompanyActive
                        ? isDarkMode
                          ? "bg-sky-500/15 text-sky-300"
                          : "bg-sky-100 text-sky-700"
                        : isDarkMode
                          ? "text-slate-200 hover:bg-slate-800"
                          : "text-slate-700 hover:bg-white/80"
                    }`}
                  >
                    <span>Company</span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform ${openDropdown === "company" ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === "company" && (
                    <div
                      className={`absolute left-0 top-full mt-3 w-72 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
                    >
                      {COMPANY_LINKS.map((item) => {
                        const active = isActive(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`block rounded-xl px-3.5 py-2.5 transition ${
                              active
                                ? isDarkMode
                                  ? "bg-sky-500/15 text-sky-300"
                                  : "bg-sky-50 text-sky-700"
                                : isDarkMode
                                  ? "hover:bg-slate-800"
                                  : "hover:bg-sky-50/70"
                            }`}
                          >
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {item.description}
                            </p>
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
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === "support" ? null : "support"))
                    }
                    className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      isSupportActive
                        ? isDarkMode
                          ? "bg-sky-500/15 text-sky-300"
                          : "bg-sky-100 text-sky-700"
                        : isDarkMode
                          ? "text-slate-200 hover:bg-slate-800"
                          : "text-slate-700 hover:bg-white/80"
                    }`}
                  >
                    <span>Support</span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform ${openDropdown === "support" ? "rotate-180" : ""}`}
                    />
                  </button>

                  {openDropdown === "support" && (
                    <div
                      className={`absolute left-0 top-full mt-3 w-72 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
                    >
                      {SUPPORT_LINKS.map((item) => {
                        const active = isActive(item.to);
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`block rounded-xl px-3.5 py-2.5 transition ${
                              active
                                ? isDarkMode
                                  ? "bg-sky-500/15 text-sky-300"
                                  : "bg-sky-50 text-sky-700"
                                : isDarkMode
                                  ? "hover:bg-slate-800"
                                  : "hover:bg-sky-50/70"
                            }`}
                          >
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {item.description}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Location Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === "city" ? null : "city"))
                    }
                    className={`flex items-center gap-1.5 border rounded-xl px-3 py-2 transition ${chipClasses}`}
                    aria-label="Select city"
                  >
                    <FiMapPin className="text-sky-500 shrink-0" size={15} />
                    <span className="text-xs xl:text-sm font-medium whitespace-nowrap">
                      {selectedCity.split(",")[0]}
                      {selectedCity.includes(",") && (
                        <span className="hidden xl:inline">
                          , {selectedCity.split(",")[1]?.trim()}
                        </span>
                      )}
                    </span>
                  </button>

                  {openDropdown === "city" && (
                    <div
                      className={`absolute left-0 top-full mt-3 w-52 rounded-2xl border p-1.5 z-50 ${dropdownMenuClasses}`}
                    >
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
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm transition ${
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
                            {chosen && <span className="h-2 w-2 rounded-full bg-sky-500" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Care Plan Pill */}
                <button
                  type="button"
                  onClick={onOpenCarePlan}
                  className="flex items-center gap-2 rounded-full border-2 border-amber-300 bg-blue-900 px-3 py-1 text-xs xl:text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:scale-[1.02] whitespace-nowrap"
                >
                  <span className="rounded-full bg-amber-300/90 p-1.5 text-slate-950">
                    <FiHeart size={13} />
                  </span>
                  <span>Care Plan</span>
                </button>

                {/* Live Search */}
                <div className="relative w-48 xl:w-64">
                  <form onSubmit={handleSearchSubmit}>
                    <FiSearch
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? "text-slate-400" : "text-gray-400"
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
                      placeholder="Search help, blog, roles..."
                      aria-label="Search site"
                      className={`w-full border rounded-xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 ${inputClasses}`}
                    />
                  </form>

                  {searchFocused && searchQuery.trim() && (
                    <div
                      className={`absolute right-0 top-full mt-3 w-80 rounded-2xl border p-2 z-50 ${dropdownMenuClasses}`}
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
                            onClick={() => {
                              navigate(res.to);
                              setSearchQuery("");
                              setSearchFocused(false);
                            }}
                            className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2 text-left transition ${
                              isDarkMode ? "hover:bg-slate-800" : "hover:bg-sky-50"
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold">{res.title}</p>
                              <p className={`truncate text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
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

                {/* Theme Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDarkMode ? "Light mode" : "Dark mode"}
                  className={`w-10 h-10 rounded-xl border transition flex items-center justify-center shrink-0 ${iconButtonClasses}`}
                >
                  {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>

                {/* Help Center / Policies Shortcut */}
                <Link
                  to={ROUTES.HELP_CENTER}
                  aria-label="Help Center"
                  title="Help Center"
                  className={`w-10 h-10 rounded-xl border transition flex items-center justify-center shrink-0 ${
                    isActive(ROUTES.HELP_CENTER)
                      ? "border-sky-500 bg-sky-500 text-white"
                      : iconButtonClasses
                  }`}
                >
                  <FiFileText size={18} />
                </Link>

                {/* Contact Support Shortcut */}
                <Link
                  to={ROUTES.CONTACT}
                  aria-label="Contact Support"
                  title="Contact Us"
                  className={`w-10 h-10 rounded-xl border transition flex items-center justify-center shrink-0 ${
                    isActive(ROUTES.CONTACT)
                      ? "border-sky-500 bg-sky-500 text-white"
                      : iconButtonClasses
                  }`}
                >
                  <FiMessageCircle size={18} />
                </Link>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center gap-2.5 lg:hidden">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`rounded-xl border p-2.5 transition ${iconButtonClasses}`}
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  className={`lg:hidden rounded-xl border p-2.5 transition ${iconButtonClasses}`}
                >
                  {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
              </div>
            </div>

            {/* Mobile Drawer */}
            {menuOpen && (
              <div className={`lg:hidden rounded-b-4xl border-t px-5 py-6 ${mobileMenuClasses}`}>
                <div className="space-y-5">
                  {/* Search */}
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <FiSearch
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctors, help, blog..."
                      className={`w-full border rounded-xl py-3 pl-11 pr-4 text-sm ${inputClasses}`}
                    />
                  </form>

                  {/* Location + Care Plan */}
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
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-300 bg-blue-900 py-2.5 text-xs font-semibold text-white shadow-sm"
                    >
                      <span className="rounded-full bg-amber-300/90 p-1 text-slate-950">
                        <FiHeart size={12} />
                      </span>
                      <span>Care Plan</span>
                    </button>
                  </div>

                  {/* Mobile Nav Links */}
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    <div>
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-sky-500">
                        Company
                      </p>
                      <ul className="space-y-2 text-sm">
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
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-sky-500">
                        Support
                      </p>
                      <ul className="space-y-2 text-sm">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
