import { useId } from "react";

const BrandLogo = ({ isDarkMode = false, size = "md", showTagline = false }) => {
  const uid = useId().replace(/:/g, "");
  const gradId = `docdor-grad-${uid}`;
  const iconGradId = `docdor-icon-grad-${uid}`;

  const dims =
    size === "lg"
      ? { icon: "h-10 w-10", text: "text-2xl", sub: "text-[10px]" }
      : size === "sm"
        ? { icon: "h-8 w-8", text: "text-lg", sub: "text-[9px]" }
        : { icon: "h-9 w-9", text: "text-xl", sub: "text-[9px]" };

  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* Crisp Medical Pulse Mark */}
      <span
        className={`relative flex ${dims.icon} shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ${
          isDarkMode
            ? "bg-gradient-to-br from-sky-500/20 via-cyan-500/15 to-teal-500/20 ring-sky-400/30"
            : "bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 ring-sky-400/30 shadow-sky-500/20"
        }`}
      >
        <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id={iconGradId} x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isDarkMode ? "#38BDF8" : "#FFFFFF"} />
              <stop offset="100%" stopColor={isDarkMode ? "#2DD4BF" : "#E0F2FE"} />
            </linearGradient>
          </defs>
          <circle
            cx="18"
            cy="18"
            r="13"
            stroke={`url(#${iconGradId})`}
            strokeWidth="2.4"
            strokeOpacity="0.95"
          />
          <path
            d="M8.5 18.5H13L15.4 12.5L18.6 24.5L21.3 16L23.2 18.5H27.5"
            stroke={isDarkMode ? "#38BDF8" : "#FFFFFF"}
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-tight ${dims.text}`}>
          <svg
            viewBox="0 0 124 26"
            className={size === "lg" ? "h-6 w-auto" : size === "sm" ? "h-4.5 w-auto" : "h-5 w-auto"}
            role="img"
            aria-label="DOCDOR"
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="124" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={isDarkMode ? "#7DD3FC" : "#0284C7"} />
                <stop offset="55%" stopColor={isDarkMode ? "#38BDF8" : "#0EA5E9"} />
                <stop offset="100%" stopColor={isDarkMode ? "#2DD4BF" : "#0D9488"} />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="21"
              fill={`url(#${gradId})`}
              fontFamily="Plus Jakarta Sans, Inter, sans-serif"
              fontWeight="800"
              fontSize="23"
              letterSpacing="1.2"
            >
              DOCDOR
            </text>
          </svg>
        </span>
        {showTagline && (
          <span
            className={`mt-1 font-semibold uppercase tracking-[0.18em] ${dims.sub} ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Connected Healthcare
          </span>
        )}
      </span>
    </span>
  );
};

export default BrandLogo;

