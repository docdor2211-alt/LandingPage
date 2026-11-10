import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiClock,
  FiSearch,
  FiShare2,
  FiX,
} from "react-icons/fi";
import PageHero from "../components/common/PageHero";
import Link from "../router/Link";
import { ROUTES } from "../router/routes";
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
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

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        window.localStorage.setItem("docdor-blog-bookmarks", JSON.stringify(next));
      } catch {
        // ignore storage quota error
      }
      return next;
    });
  };

  const handleCopyShare = (post) => {
    const shareUrl = `${window.location.origin}${ROUTES.BLOG}#${post.id}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopiedId(post.id);
    window.setTimeout(() => setCopiedId(null), 2200);
  };

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
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
  }, [selectedCategory, searchQuery]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  return (
    <div>
      <PageHero
        isDarkMode={isDarkMode}
        badge="DOCDOR HEALTH JOURNAL"
        title="Doctor-Reviewed Guides for"
        highlight="Everyday Preventive Care"
        subtitle="Practical, jargon-free articles on diagnostics, medication safety, digital health AI, nutrition, and family wellness written by Docdor clinicians."
        breadcrumbGroup="Company"
        currentPage="Blog"
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Featured Article Spotlight */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className={`overflow-hidden rounded-[2rem] border transition ${
            isDarkMode
              ? "border-slate-800 bg-slate-900/90"
              : "border-sky-100 bg-white shadow-[0_20px_50px_rgba(56,189,248,0.12)]"
          }`}
        >
          <div className="grid lg:grid-cols-12">
            <div className={`relative min-h-[260px] lg:col-span-5 ${isDarkMode ? "bg-slate-800" : "bg-sky-50"}`}>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover object-top"
              />
              <span className="absolute left-5 top-5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                Featured Guide
              </span>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-500">
                    {featuredPost.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <FiCalendar size={13} />
                    {featuredPost.date}
                  </span>
                  <span className={`inline-flex items-center gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <FiClock size={13} />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
                  {featuredPost.title}
                </h2>

                <p className={`mt-3 text-sm sm:text-base leading-7 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5 border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-bold">{featuredPost.author}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {featuredPost.authorRole}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveArticle(featuredPost)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:opacity-95"
                >
                  <span>Read Full Article</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Filter & Search Bar */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-sm"
                      : isDarkMode
                        ? "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-sky-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or topics..."
              className={`w-full rounded-2xl border py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-sky-400"
              }`}
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed p-12 text-center border-slate-300 dark:border-slate-700">
            <p className="text-lg font-bold">No articles match your search.</p>
            <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Try another health topic or view all published guides.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-semibold text-white"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const isBookmarked = bookmarks.includes(post.id);
              return (
                <motion.article
                  key={post.id}
                  id={post.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-col justify-between overflow-hidden rounded-3xl border transition ${
                    isDarkMode
                      ? "border-slate-800 bg-slate-900/90 hover:border-slate-700"
                      : "border-slate-200 bg-white hover:border-sky-200 shadow-sm"
                  }`}
                >
                  <div>
                    <div className={`relative h-48 overflow-hidden ${isDarkMode ? "bg-slate-800" : "bg-sky-50"}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover object-top"
                      />
                      <span className="absolute left-3.5 top-3.5 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        {post.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(post.id)}
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                        className={`absolute right-3.5 top-3.5 rounded-full p-2 backdrop-blur transition ${
                          isBookmarked
                            ? "bg-sky-500 text-white"
                            : "bg-slate-950/65 text-white hover:bg-slate-950/85"
                        }`}
                      >
                        <FiBookmark size={14} />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className={`flex items-center gap-3 text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="mt-2.5 text-lg font-bold leading-snug">
                        <button
                          type="button"
                          onClick={() => setActiveArticle(post)}
                          className="text-left hover:text-sky-500 transition-colors"
                        >
                          {post.title}
                        </button>
                      </h3>

                      <p className={`mt-2.5 text-sm leading-relaxed line-clamp-3 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t px-6 py-4 border-slate-200/80 dark:border-slate-800">
                    <div>
                      <p className="text-xs font-bold">{post.author}</p>
                      <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {post.authorRole}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveArticle(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:underline"
                    >
                      <span>Read</span>
                      <FiArrowRight />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Wellness Newsletter Banner */}
        <section
          className={`mt-16 rounded-[2rem] border p-8 sm:p-10 ${
            isDarkMode
              ? "border-sky-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60"
              : "border-sky-200 bg-gradient-to-r from-sky-50 via-white to-cyan-50"
          }`}
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Weekly Wellness Digest
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Doctor-Curated Health Tips in Your Inbox
              </h2>
              <p className={`mt-2 text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                One concise Sunday briefing on seasonal preventive checkups, nutrition, and digital health—zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterStatus === "success" ? (
                <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-500">
                  <FiCheck size={18} />
                  <span>You&apos;re subscribed to the Docdor Health Digest!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} noValidate className="space-y-2">
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus) setNewsletterStatus("");
                      }}
                      placeholder="Enter your email address"
                      className={`flex-1 rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-sky-500"
                          : "border-slate-200 bg-white text-slate-900 focus:ring-sky-400"
                      }`}
                    />
                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                    >
                      Subscribe
                    </button>
                  </div>
                  {newsletterStatus === "error" && (
                    <p className="text-xs font-medium text-rose-500">
                      Please enter a valid email address.
                    </p>
                  )}
                  <p className={`text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Protected under our{" "}
                    <Link to={ROUTES.PRIVACY_POLICY} className="underline hover:text-sky-500">
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

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-reader-title"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative my-8 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border p-6 sm:p-10 shadow-2xl ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900 text-slate-100"
                  : "border-sky-100 bg-white text-slate-900"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className={`sticky float-right top-0 rounded-xl p-2 transition ${
                  isDarkMode
                    ? "bg-slate-800 text-slate-300 hover:text-white"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                <FiX size={20} />
              </button>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sky-500">
                  {activeArticle.category}
                </span>
                <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                  {activeArticle.date} • {activeArticle.readTime}
                </span>
              </div>

              <h2 id="article-reader-title" className="mt-4 text-2xl sm:text-3xl font-extrabold leading-tight">
                {activeArticle.title}
              </h2>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b pb-5 border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-bold">{activeArticle.author}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Medically Reviewed • {activeArticle.authorRole}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyShare(activeArticle)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                      isDarkMode
                        ? "border-slate-700 bg-slate-800 hover:border-slate-500"
                        : "border-slate-200 bg-slate-50 hover:border-sky-300"
                    }`}
                  >
                    {copiedId === activeArticle.id ? <FiCheck className="text-emerald-500" /> : <FiShare2 />}
                    <span>{copiedId === activeArticle.id ? "Link Copied" : "Share"}</span>
                  </button>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div
                className={`mt-6 rounded-2xl border p-5 ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10"
                    : "border-sky-200 bg-sky-50/70"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-sky-500">
                  Clinical Key Takeaways
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {activeArticle.takeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Paragraphs */}
              <div className={`mt-6 space-y-4 text-base leading-8 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                {activeArticle.content.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              <div
                className={`mt-8 flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                  isDarkMode ? "border-slate-800 bg-slate-800/60" : "border-slate-200 bg-slate-50"
                }`}
              >
                <p className="text-xs sm:text-sm">
                  <strong>Educational Note:</strong> Always consult a licensed physician for personalized medical advice.
                </p>
                <Link
                  to={ROUTES.CONTACT}
                  onClick={() => setActiveArticle(null)}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white"
                >
                  Ask a Care Coordinator
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
