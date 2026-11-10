import { useState } from "react";
import { FiImage } from "react-icons/fi";

const CardImage = ({
  src,
  alt = "",
  className = "",
  fallbackClassName = "",
  objectPosition = "center",
  loading = "lazy",
  compact = false,
  isDarkMode = false,
}) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const hasError = !src || failedSrc === src;

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt || "Image unavailable"}
        className={`flex h-full w-full flex-col items-center justify-center gap-2 text-center ${
          compact ? "p-2" : "px-4"
        } ${
          isDarkMode
            ? "bg-slate-800/90 text-slate-400"
            : "bg-sky-50/90 text-slate-500"
        } ${fallbackClassName}`}
      >
        <div
          className={`flex items-center justify-center rounded-2xl ${
            compact ? "h-9 w-9" : "h-11 w-11"
          } ${
            isDarkMode
              ? "bg-slate-700/80 text-sky-400"
              : "bg-white text-sky-500 shadow-xs"
          }`}
        >
          <FiImage size={compact ? 16 : 20} />
        </div>
        {!compact && alt && (
          <span className="max-w-[200px] truncate text-[11px] font-semibold opacity-80">
            {alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailedSrc(src)}
      style={{ objectPosition }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
};

export default CardImage;

