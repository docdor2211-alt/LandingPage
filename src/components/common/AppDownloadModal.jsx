import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { FiCheckCircle, FiSmartphone, FiX } from "react-icons/fi";
import { useRouter } from "../../router/routerContext";
import { ROUTES } from "../../router/routes";

const AppDownloadModal = ({ isOpen, platform, onClose, isDarkMode }) => {
  const [contactInput, setContactInput] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const { navigate } = useRouter();

  const handleClose = () => {
    setSent(false);
    setError("");
    setContactInput("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = contactInput.trim();
    const isPhone = /^(\+?\d{10,14})$/.test(val.replace(/[\s-]/g, ""));
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    if (!isPhone && !isEmail) {
      setError("Please enter a valid 10-digit mobile number or email address.");
      return;
    }

    setError("");
    setSent(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-2xl ${
              isDarkMode
                ? "border-slate-700 bg-slate-900 text-slate-100"
                : "border-sky-100 bg-white text-slate-900"
            }`}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close download modal"
              className={`absolute right-4 top-4 rounded-xl p-2 transition ${
                isDarkMode
                  ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <FiX size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md">
                {platform === "ios" ? <FaApple size={24} /> : <FaGooglePlay size={20} />}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
                  {platform === "ios" ? "iOS App Store" : "Android Google Play"}
                </span>
                <h2 id="download-modal-title" className="text-xl font-bold">
                  Get the Docdor App
                </h2>
              </div>
            </div>

            <p className={`mt-4 text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Book consultations in seconds, track doorstep medicine & lab orders live, and chat with our 24/7 AI Health Assistant on your phone.
            </p>

            {sent ? (
              <div
                className={`mt-6 rounded-2xl border p-5 text-center ${
                  isDarkMode
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-emerald-200 bg-emerald-50"
                }`}
              >
                <FiCheckCircle className="mx-auto text-emerald-500" size={32} />
                <p className="mt-2 font-semibold">Download Link Sent!</p>
                <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  We sent the direct {platform === "ios" ? "App Store" : "Google Play"} link to{" "}
                  <span className="font-medium">{contactInput}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider opacity-75">
                  Send instant install link via SMS or Email
                </label>
                <div className="relative">
                  <FiSmartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="+91 98765 43210 or you@example.com"
                    className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:ring-sky-500"
                        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:ring-sky-400"
                    }`}
                  />
                </div>
                {error && <p className="text-xs font-medium text-rose-500">{error}</p>}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:opacity-95"
                >
                  Send App Link
                </button>
              </form>
            )}

            <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs border-slate-200 dark:border-slate-800">
              <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>
                Need help installing?
              </span>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigate(ROUTES.HELP_CENTER);
                }}
                className="font-semibold text-sky-500 hover:underline"
              >
                Visit Help Center
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDownloadModal;

