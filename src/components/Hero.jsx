import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import img from "../assets/images/Untitled-1.jpg";

const Hero = ({ isDarkMode }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-blob", {
        scale: 0.75,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.85)",
        stagger: 0.18,
      });

      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={heroRef}
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-50"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative Background */}
      <div className={`absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl hero-blob ${isDarkMode ? "bg-slate-700/40" : "bg-slate-200/40"}`}></div>
      <div className={`absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl hero-blob ${isDarkMode ? "bg-slate-700/40" : "bg-slate-200/40"}`}></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:py-24">
        {/* Left Content */}
        <motion.div
          className="max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className={`hero-animate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-800/80 text-slate-200" : "border-slate-200 bg-white/80 text-slate-700"}`}>
            <FaStar className="text-yellow-500" />
            Trusted by Thousands of Patients
          </span>

          <h1 className={`hero-animate mt-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
            Your Complete
            <span className={`block ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>Healthcare Ecosystem</span>
            In One App.
          </h1>

          <p className={`hero-animate mt-6 text-base leading-8 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
            Book doctor consultations, order medicines, schedule lab tests,
            connect with AI health assistants, and manage your health anytime,
            anywhere.
          </p>

          <div className="hero-animate mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-center gap-2 rounded-3xl border px-5 py-3 text-sm shadow-xl transition ${isDarkMode ? "border-slate-700 bg-slate-900 text-white shadow-slate-950/50" : "border-slate-200 bg-slate-900 text-white shadow-slate-300"}`}
            >
              <FaApple size={26} />
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Download</p>
                <p className="font-semibold">App Store</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 px-5 py-3 text-white shadow-xl shadow-emerald-300/40 transition text-sm"
            >
              <FaGooglePlay size={22} />
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-100">Get it on</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            className={`hero-animate mt-8 inline-flex items-center gap-2 font-semibold ${isDarkMode ? "text-slate-200 hover:text-white" : "text-slate-900 hover:text-slate-700"}`}
          >
            Explore Services
            <FiArrowRight />
          </motion.button>

          <div className="hero-animate mt-8 grid gap-4 sm:grid-cols-3">
            <div className={`rounded-3xl border p-4 shadow-sm ${isDarkMode ? "border-slate-700 bg-slate-800/80" : "border-slate-200 bg-white/80"}`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>50K+</h3>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Patients</p>
            </div>
            <div className={`rounded-3xl p-5 shadow-sm shadow-slate-900/5 ${isDarkMode ? "bg-slate-800/80" : "bg-white/80"}`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>500+</h3>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Doctors</p>
            </div>
            <div className={`rounded-3xl p-5 shadow-sm shadow-slate-900/5 ${isDarkMode ? "bg-slate-800/80" : "bg-white/80"}`}>
              <h3 className={`text-2xl font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>24/7</h3>
              <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>Support</p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative flex justify-center lg:self-start md:-mt-8 lg:-mt-0"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.img
            src={img}
            alt="Professional doctor illustration"
            className="block h-auto w-64 rounded-[2rem] border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:w-[24rem]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;