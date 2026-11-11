import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiFileText,
  FiHome,
  FiShare2,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";
import CardImage from "../components/common/CardImage";
import Link from "../router/Link";
import { getBlogPostRoute, ROUTES } from "../router/routes";
import { BLOG_POSTS } from "../data/siteData";

const readBookmarks = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem("docdor-blog-bookmarks");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const BlogDetail = ({ isDarkMode, slug }) => {
  const [bookmarks, setBookmarks] = useState(readBookmarks);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  const normalizedSlug = slug ? slug.toLowerCase() : "";
  const postIndex = BLOG_POSTS.findIndex(
    (item) => item.id.toLowerCase() === normalizedSlug
  );
  const post = postIndex >= 0 ? BLOG_POSTS[postIndex] : null;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Docdor Blog`;
    } else {
      document.title = "Article Not Found | Docdor";
    }
  }, [post]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const relatedPosts = useMemo(() => {
    if (!post) return BLOG_POSTS.slice(0, 3);
    const sameCategory = BLOG_POSTS.filter(
      (item) => item.id !== post.id && item.category === post.category
    );
    const others = BLOG_POSTS.filter(
      (item) => item.id !== post.id && item.category !== post.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [post]);

  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost =
    postIndex >= 0 && postIndex < BLOG_POSTS.length - 1
      ? BLOG_POSTS[postIndex + 1]
      : null;

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem("docdor-blog-bookmarks", JSON.stringify(next));
      } catch {
        // ignore storage error
      }
      return next;
    });
  };

  const handleCopyShare = () => {
    if (!post) return;
    const shareUrl = `${window.location.origin}${getBlogPostRoute(post.id)}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    setCopied(true);
    if (copyTimerRef.current) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  if (!post) {
    return (
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-medical-grid opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500">
            <FiFileText size={30} />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            Article Not Found
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            We couldn&apos;t find that health guide
          </h1>
          <p
            className={`mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            The article link may have moved or been mistyped. Return to the Docdor Health Journal or read one of our recent doctor-reviewed guides below.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.BLOG}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105"
            >
              <FiArrowLeft />
              <span>Back to All Articles</span>
            </Link>
            <Link
              to={ROUTES.HOME}
              className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-semibold transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-800/80 text-slate-100 hover:border-sky-500/50"
                  : "border-slate-200 bg-white text-slate-900 hover:border-sky-300 shadow-xs"
              }`}
            >
              <FiHome size={15} className="text-sky-500" />
              <span>Home</span>
            </Link>
          </div>

          <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.id}
                to={getBlogPostRoute(item.id)}
                className={`group flex flex-col justify-between overflow-hidden rounded-3xl border p-5 transition ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                    : "border-slate-200/80 bg-white shadow-sm hover:border-sky-300"
                }`}
              >
                <div>
                  <span className="inline-block rounded-full bg-sky-500/15 px-3 py-1 text-[11px] font-semibold text-sky-500">
                    {item.category}
                  </span>
                  <h2 className="mt-3 text-base font-bold leading-snug group-hover:text-sky-500 transition-colors">
                    {item.title}
                  </h2>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-500">
                  <span>Read More</span>
                  <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const isBookmarked = bookmarks.includes(post.id);

  return (
    <div>
      {/* Editorial Article Header */}
      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 ${
          isDarkMode
            ? "border-slate-800/80 bg-gradient-to-br from-[#060B17] via-slate-900 to-[#081326]"
            : "border-slate-200/70 bg-gradient-to-br from-sky-50/90 via-white to-cyan-50/60"
        }`}
      >
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
          {/* Top Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium ${
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
              <FiChevronRight size={14} className="opacity-50" />
              <Link
                to={ROUTES.BLOG}
                className={`rounded-lg px-2 py-1 transition-colors ${
                  isDarkMode
                    ? "hover:bg-slate-800/70 hover:text-sky-300"
                    : "hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                Blog
              </Link>
              <FiChevronRight size={14} className="opacity-50" />
              <span className={`font-semibold ${isDarkMode ? "text-sky-300" : "text-sky-700"}`}>
                {post.category}
              </span>
            </nav>

            <Link
              to={ROUTES.BLOG}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900/80 text-slate-200 hover:border-sky-500/50 hover:text-sky-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700 shadow-xs"
              }`}
            >
              <FiArrowLeft size={14} />
              <span>Back to Blog</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="mt-8 max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              {post.featured && (
                <span className="rounded-full bg-gradient-to-r from-sky-500 to-teal-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-sm">
                  Featured Guide
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                    : "border-sky-200 bg-sky-50 text-sky-700"
                }`}
              >
                {post.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 tabular-nums ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <FiCalendar size={13} className="text-sky-500" />
                {post.date}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 tabular-nums ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <FiClock size={13} className="text-sky-500" />
                {post.readTime}
              </span>
            </div>

            <h1
              className={`mt-5 text-3xl font-extrabold leading-[1.16] sm:text-4xl lg:text-5xl ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {post.title}
            </h1>

            <p
              className={`mt-5 text-base sm:text-lg leading-relaxed max-w-3xl ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {post.excerpt}
            </p>

            {/* Author & Action Controls */}
            <div
              className={`mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${
                isDarkMode ? "border-slate-800/80" : "border-slate-200/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/15 text-sky-500">
                  <FiUserCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">{post.author}</p>
                  <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Medically Reviewed &bull; {post.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleBookmark(post.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition cursor-pointer ${
                    isBookmarked
                      ? "border-sky-500 bg-sky-500/15 text-sky-500"
                      : isDarkMode
                        ? "border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-500"
                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 shadow-xs"
                  }`}
                >
                  <FiBookmark size={14} />
                  <span>{isBookmarked ? "Saved" : "Save Article"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyShare}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition cursor-pointer ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-500"
                      : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 shadow-xs"
                  }`}
                >
                  {copied ? <FiCheck className="text-emerald-500" size={14} /> : <FiShare2 size={14} />}
                  <span>{copied ? "Link Copied" : "Share Article"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Article Body */}
          <article className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div
              className={`aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-[2rem] border shadow-lg ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900"
                  : "border-slate-200/80 bg-sky-50 shadow-[0_20px_50px_rgba(14,165,233,0.1)]"
              }`}
            >
              <CardImage
                src={post.image}
                alt={post.title}
                objectPosition={post.imagePosition || "center"}
                loading="eager"
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Key Clinical Takeaways */}
            {post.takeaways?.length > 0 && (
              <div
                className={`rounded-3xl border p-6 sm:p-8 ${
                  isDarkMode
                    ? "border-sky-500/30 bg-sky-500/10"
                    : "border-sky-200 bg-sky-50/75"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-500">
                  Clinical Key Takeaways
                </p>
                <ul className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed">
                  {post.takeaways.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-500">
                        <FiCheck size={12} />
                      </span>
                      <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Article Paragraphs */}
            <div
              className={`rounded-3xl border p-6 sm:p-9 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-white shadow-sm"
              }`}
            >
              <div
                className={`space-y-6 text-base sm:text-[17px] leading-8 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Topic Tags */}
              {post.tags?.length > 0 && (
                <div
                  className={`mt-8 flex flex-wrap items-center gap-2 border-t pt-6 ${
                    isDarkMode ? "border-slate-800" : "border-slate-200/80"
                  }`}
                >
                  <span
                    className={`mr-1 text-xs font-bold uppercase tracking-wider ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Topics:
                  </span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`${ROUTES.BLOG}?q=${encodeURIComponent(tag)}`}
                      className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                        isDarkMode
                          ? "bg-slate-800 text-slate-300 hover:bg-sky-500/20 hover:text-sky-300"
                          : "bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                      }`}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Medical Guidance Disclaimer */}
            <div
              className={`flex flex-col gap-4 rounded-3xl border p-6 sm:flex-row sm:items-center sm:justify-between ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 shrink-0 text-sky-500" size={18} />
                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  <strong>Educational Note:</strong> This guide is medically reviewed for general awareness and does not replace an individualized doctor consultation.
                </p>
              </div>
              <Link
                to={`${ROUTES.CONTACT}?topic=package&package=${encodeURIComponent(post.category)}`}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-105"
              >
                <span>Ask a Care Coordinator</span>
                <FiArrowRight />
              </Link>
            </div>

            {/* Previous / Next / All Articles Navigation */}
            <div className="grid gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  to={getBlogPostRoute(prevPost.id)}
                  className={`group rounded-3xl border p-5 transition ${
                    isDarkMode
                      ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                      : "border-slate-200/80 bg-white shadow-xs hover:border-sky-300"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-500">
                    <FiArrowLeft />
                    Previous Article
                  </span>
                  <p className="mt-2 text-sm font-bold leading-snug group-hover:text-sky-500 transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextPost ? (
                <Link
                  to={getBlogPostRoute(nextPost.id)}
                  className={`group rounded-3xl border p-5 text-left sm:text-right transition ${
                    isDarkMode
                      ? "border-slate-800 bg-slate-900/90 hover:border-sky-500/40"
                      : "border-slate-200/80 bg-white shadow-xs hover:border-sky-300"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-500">
                    Next Article
                    <FiArrowRight />
                  </span>
                  <p className="mt-2 text-sm font-bold leading-snug group-hover:text-sky-500 transition-colors">
                    {nextPost.title}
                  </p>
                </Link>
              ) : null}
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Clinician Attribution Box */}
            <div
              className={`rounded-3xl border p-6 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-white shadow-sm"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Clinical Author
              </span>
              <h2 className="mt-2 text-lg font-extrabold">{post.author}</h2>
              <p className={`text-xs font-semibold ${isDarkMode ? "text-sky-300" : "text-sky-700"}`}>
                {post.authorRole}
              </p>
              <p className={`mt-3 text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Published on {post.date} &bull; Reviewed under Docdor clinical editorial safety guidelines.
              </p>

              <Link
                to={ROUTES.BLOG}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-sky-500/50"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-sky-300"
                }`}
              >
                <FiArrowLeft />
                <span>Browse All Journal Articles</span>
              </Link>
            </div>

            {/* Related Guides */}
            <div
              className={`rounded-3xl border p-6 ${
                isDarkMode
                  ? "border-slate-800 bg-slate-900/90"
                  : "border-slate-200/80 bg-white shadow-sm"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                Keep Reading
              </span>
              <h2 className="mt-1.5 text-xl font-extrabold">Related Health Guides</h2>

              <div className="mt-5 space-y-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={getBlogPostRoute(rel.id)}
                    className={`group flex gap-3.5 rounded-2xl border p-3 transition ${
                      isDarkMode
                        ? "border-slate-800 bg-slate-800/50 hover:border-sky-500/40"
                        : "border-slate-200/70 bg-slate-50/70 hover:border-sky-300 hover:bg-white"
                    }`}
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sky-50 dark:bg-slate-800">
                      <CardImage
                        src={rel.image}
                        alt={rel.title}
                        objectPosition={rel.imagePosition || "center"}
                        compact
                        isDarkMode={isDarkMode}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                        {rel.category}
                      </span>
                      <p className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug group-hover:text-sky-500 transition-colors">
                        {rel.title}
                      </p>
                      <p className={`mt-1 text-[11px] tabular-nums ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {rel.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
