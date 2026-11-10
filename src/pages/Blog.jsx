import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMail,
  FiSearch,
  FiX,
} from "react-icons/fi";
import labReportImg from "../assets/images/Labtest.png";
import CardImage from "../components/common/CardImage";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { useRouter } from "../router/routerContext";
import { getBlogPostRoute, ROUTES } from "../router/routes";
import { BLOG_POSTS } from "../data/siteData";

const CATEGORIES = [
  "All",
  "Diagnostics",
  "Preventive Care",
  "AI & Digital Health",
  "Nutrition & Lifestyle",
  "Pet Wellness",
];

const Blog = ({ isDarkMode }) => {
  const { search, navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [bookmarks, setBookmarks] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem("docdor-blog-bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  useEffect(() => {
    const qParam = new URLSearchParams(search).get("q") || "";
    setSearchQuery(qParam);
    if (qParam) {
      setSelectedCategory("All");
      setShowSavedOnly(false);
    }
  }, [search]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (next.length === 0) {
        setShowSavedOnly(false);
      }
      try {
        window.localStorage.setItem("docdor-blog-bookmarks", JSON.stringify(next));
      } catch {
        // ignore storage quota error
      }
      return next;
    });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (search) {
      navigate(ROUTES.BLOG, { replace: true });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setShowSavedOnly(false);
    setSearchQuery("");
    if (search) {
      navigate(ROUTES.BLOG, { replace: true });
    }
  };

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      if (showSavedOnly && !bookmarks.includes(post.id)) return false;
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [bookmarks, searchQuery, selectedCategory, showSavedOnly]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  const scrollToNewsletter = () => {
    const el = document.getElementById("newsletter-digest");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="DOCDOR HEALTH JOURNAL"
        badgeIcon={FiBookOpen}
        title="Doctor-Reviewed Guides for"
        highlight="Everyday Preventive Care"
        subtitle="Practical, jargon-free articles on diagnostics, medication safety, digital health AI, nutrition, and family wellness written by Docdor clinicians."
        breadcrumbGroup="Company"
        currentPage="Blog"
        visual={{
          image: labReportImg,
          alt: "Clinician reviewing diagnostic test reports for patient education",
          objectPosition: "50% 40%",
          badge: "Physician Reviewed",
          eyebrow: "Clinical Editorial",
          title: "Diagnostics, AI & Preventive Care",
          statValue: `${BLOG_POSTS.length} Guides`,
          statLabel: "Clinician Written",
        }}
        trustItems={[
          "Doctor Fact-Checked",
          "Jargon-Free Explanations",
          "Weekly Digest",
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to={getBlogPostRoute(featuredPost.id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
          >
            <span>Read Featured Guide</span>
            <FiArrowRight />
          </Link>
          <button
            type="button"
            onClick={scrollToNewsletter}
            className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition cursor-pointer ${
              isDarkMode
                ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 shadow-xs"
            }`}
          >
            <FiMail size={15} className="text-sky-500" />
            <span>Weekly Wellness Digest</span>
          </button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Featured Article Spotlight */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className={`overflow-hidden rounded-[2rem] border transition ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/95"
              : "border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(14,165,233,0.1)]"
          }`}
        >
          <div className="grid lg:grid-cols-12">
            <div
              className={`relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[340px] lg:col-span-5 ${
                isDarkMode ? "bg-slate-800" : "bg-sky-50"
              }`}
            >
              <Link
                to={getBlogPostRoute(featuredPost.id)}
                tabIndex={-1}
                aria-hidden="true"
                className="group block h-full w-full"
              >
                <CardImage
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  objectPosition={featuredPost.imagePosition || "center"}
                  loading="eager"
                  isDarkMode={isDarkMode}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
              </Link>
              <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                Featured Guide
              </span>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-500">
                    {featuredPost.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 tabular-nums ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    <FiCalendar size={13} />
                    {featuredPost.date}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 tabular-nums ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    <FiClock size={13} />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
                  <Link
                    to={getBlogPostRoute(featuredPost.id)}
                    className="hover:text-sky-500 transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p
                  className={`mt-3 text-sm sm:text-base leading-7 ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {featuredPost.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        isDarkMode
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5 ${
                  isDarkMode ? "border-slate-800" : "border-slate-200/80"
                }`}
              >
                <div>
                  <p className="text-sm font-bold">{featuredPost.author}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Medically Reviewed • {featuredPost.authorRole}
                  </p>
                </div>

                <Link
                  to={getBlogPostRoute(featuredPost.id)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:brightness-105"
                >
                  <span>Read More</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Filter & Search Bar */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const active = category === selectedCategory && !showSavedOnly;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowSavedOnly(false);
                  }}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                      : isDarkMode
                        ? "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-sky-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}

            {bookmarks.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSavedOnly((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  showSavedOnly
                    ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm"
                    : isDarkMode
                      ? "border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20"
                      : "border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                }`}
              >
                <FiBookmark size={13} />
                <span className="tabular-nums">Saved ({bookmarks.length})</span>
              </button>
            )}
          </div>

          <div className="relative w-full lg:w-80">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or topics..."
              aria-label="Search blog articles"
              className={`w-full rounded-2xl border py-2.5 pl-11 pr-9 text-sm focus:outline-none focus:ring-2 transition ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/30"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/25"
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear article search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <FiX size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div
            className={`mt-10 rounded-3xl border border-dashed p-12 text-center ${
              isDarkMode ? "border-slate-700" : "border-slate-300"
            }`}
          >
            <p className="text-lg font-bold">No articles match your filters.</p>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Try another health topic or view all published guides.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-sky-400 transition"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const isBookmarked = bookmarks.includes(post.id);
              const postRoute = getBlogPostRoute(post.id);
              return (
                <motion.article
                  key={post.id}
                  id={post.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  className={`group flex flex-col overflow-hidden rounded-3xl border transition ${
                    isDarkMode
                      ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                      : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden ${
                      isDarkMode ? "bg-slate-800" : "bg-sky-50"
                    }`}
                  >
                    <Link
                      to={postRoute}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="block h-full w-full"
                    >
                      <CardImage
                        src={post.image}
                        alt={post.title}
                        objectPosition={post.imagePosition || "center"}
                        isDarkMode={isDarkMode}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                    </Link>
                    <span className="pointer-events-none absolute left-3.5 top-3.5 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      {post.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(post.id)}
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                      className={`absolute right-3.5 top-3.5 rounded-full p-2 backdrop-blur-md transition cursor-pointer ${
                        isBookmarked
                          ? "bg-sky-500 text-white shadow-md"
                          : "bg-slate-950/65 text-white hover:bg-slate-950/85"
                      }`}
                    >
                      <FiBookmark size={14} />
                    </button>
                  </div>

                  <Link
                    to={postRoute}
                    className="flex flex-1 flex-col justify-between"
                  >
                    <div className="p-6">
                      <div
                        className={`flex items-center gap-3 text-xs tabular-nums ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="mt-2.5 text-lg font-bold leading-snug group-hover:text-sky-500 transition-colors">
                        {post.title}
                      </h3>

                      <p
                        className={`mt-2.5 text-sm leading-relaxed line-clamp-3 ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between border-t px-6 py-4 ${
                        isDarkMode ? "border-slate-800" : "border-slate-200/80"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold">{post.author}</p>
                        <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                          {post.authorRole}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 group-hover:text-sky-400 transition-colors">
                        <span>Read More</span>
                        <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Wellness Newsletter Banner */}
        <section
          id="newsletter-digest"
          className={`relative mt-16 scroll-mt-24 overflow-hidden rounded-[2rem] border p-8 sm:p-10 ${
            isDarkMode
              ? "border-sky-500/30 bg-gradient-to-r from-slate-900 via-[#0C162C] to-slate-900"
              : "border-slate-900/5 bg-slate-900 text-white shadow-2xl shadow-slate-900/15"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-500/20 blur-3xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-400">
                Weekly Wellness Digest
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                Doctor-Curated Health Tips in Your Inbox
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                One concise Sunday briefing on seasonal preventive checkups, nutrition, and digital health—zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterStatus === "success" ? (
                <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-sm font-semibold text-emerald-300">
                  <FiCheck size={18} />
                  <span>You&apos;re subscribed to the Docdor Health Digest!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} noValidate className="space-y-2.5">
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus) setNewsletterStatus("");
                      }}
                      placeholder="Enter your email address"
                      aria-label="Email address for weekly wellness digest"
                      className="flex-1 rounded-2xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                    />
                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:brightness-105 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterStatus === "error" && (
                    <p role="alert" className="text-xs font-medium text-rose-400">
                      Please enter a valid email address.
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Protected under our{" "}
                    <Link to={ROUTES.PRIVACY_POLICY} className="underline hover:text-sky-300">
                      Privacy Policy
                    </Link>
                    . Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
