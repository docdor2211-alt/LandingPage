import { useState } from "react";
import {
  FiMapPin,
  FiSearch,
  FiFileText,
  FiMessageCircle,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
  FiHeart,
} from "react-icons/fi";
import Logo from "../assets/images/doc_1.png";


const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const shellClasses = isDarkMode
    ? "bg-slate-950/70 text-slate-100"
    : "bg-sky-100/90 text-slate-900";

  const panelClasses = isDarkMode
    ? "bg-slate-900/95 text-slate-100 shadow-[0_0_30px_rgba(59,130,246,0.35)]"
    : "bg-sky-50/90 text-gray-900 shadow-[0_24px_70px_rgba(56,189,248,0.18)]";

  const chipClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/70 text-slate-100 hover:border-slate-500"
    : "border-slate-200 bg-sky-50/80 text-slate-900 hover:border-slate-300";

  const iconButtonClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-100"
    : "border-slate-200 bg-sky-50/80 hover:bg-slate-100 text-slate-900";

  const inputClasses = isDarkMode
    ? "border-slate-700 bg-slate-800/80 text-slate-100 placeholder:text-slate-400 focus:ring-slate-500"
    : "border-slate-200 bg-sky-50/80 text-slate-900 placeholder:text-slate-400 focus:ring-sky-400";

  const mobileMenuClasses = isDarkMode
    ? "border-slate-700 bg-slate-900/95 text-slate-100"
    : "border-slate-200/70 bg-sky-50/90 text-slate-900";

  return (
    <header className={`sticky top-0 z-50 ${shellClasses} backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-5 py-3">
        <div className="relative ">
          <div className={`absolute inset-1 rounded-4xl ${isDarkMode ? "bg-slate-800/60" : "bg-sky-200/50"} blur-3xl opacity-90`}></div>
          <div className={`relative overflow-hidden rounded-4xl ${panelClasses} transition-all duration-300`}>
            <div className="relative h-20 flex items-center justify-between px-5">
              {/* Logo */}
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={Logo} alt="Docdor logo" className="h-35 w-35 rounded-2xl object-contain" />
              </div>

              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <button className={`flex items-center gap-2 border rounded-xl px-4 py-2 hover:border-slate-300 transition ${chipClasses}`}>
                  <FiMapPin className={isDarkMode ? "text-slate-300" : "text-slate-700"} />
                  <span className="text-sm font-medium">
                    Indore, India
                  </span>
                </button>

                <button className="flex items-center gap-2 rounded-full border-2 border-amber-300 bg-blue-900 px-3 py-1 font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:scale-[1.02]">
                  <span className="rounded-full bg-amber-300/90 p-2 text-slate-950">
                    <FiHeart size={14} />
                  </span>
                  <span>Care Plan</span>
                </button>

                <div className="relative w-90">
                  <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`} />
                  <input
                    type="text"
                    placeholder="Search doctors, services..."
                    className={`w-full border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 ${inputClasses}`}
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`w-11 h-11 rounded-xl border transition flex items-center justify-center ${iconButtonClasses}`}
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>

                <button className={`w-11 h-11 rounded-xl border transition flex items-center justify-center ${iconButtonClasses}`}>
                  <FiFileText size={20} />
                </button>

                <button className={`w-11 h-11 rounded-xl border transition flex items-center justify-center ${iconButtonClasses}`}>
                  <FiMessageCircle size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`rounded-xl border p-2.5 transition ${iconButtonClasses}`}
                >
                  {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`lg:hidden rounded-xl border p-2.5 transition ${iconButtonClasses}`}
                >
                  {menuOpen ? (
                    <FiX size={24} />
                  ) : (
                    <FiMenu size={24} />
                  )}
                </button>
              </div>
            </div>

            {menuOpen && (
              <div className={`lg:hidden border-t px-5 py-6 ${mobileMenuClasses}`}>
                <div className="space-y-4">
                  <button className={`flex items-center gap-2 border rounded-xl w-full px-4 py-3 ${chipClasses}`}>
                    <FiMapPin />
                    Indore, India
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-300 bg-slate-950/95 py-3 font-semibold text-white shadow-sm">
                    <span className="rounded-full bg-amber-300/90 p-2 text-slate-950">
                      <FiHeart size={16} />
                    </span>
                    Care Plan
                  </button>

                  <div className="relative">
                    <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`} />
                    <input
                      placeholder="Search doctors..."
                      className={`w-full border rounded-xl py-3 pl-11 ${inputClasses}`}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button className={`flex-1 border rounded-xl py-3 flex justify-center ${iconButtonClasses}`}>
                      <FiFileText size={20} />
                    </button>
                    <button className={`flex-1 border rounded-xl py-3 flex justify-center ${iconButtonClasses}`}>
                      <FiMessageCircle size={20} />
                    </button>
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