import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/services/Services";
import AIAssistant from "../components/AIAssitant/AIAssistant";
import OfferCarousel from "../components/offers/OfferCarousel";
import FloatingCTA from "../components/FloatingCTA/FloatingCTA";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";
import Footer from "../components/Footer/Footer";

export default function Home({ isDarkMode, toggleTheme }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="section-reveal">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
      <div className="section-reveal">
        <Hero isDarkMode={isDarkMode} />
      </div>
      <div className="section-reveal">
        <Services isDarkMode={isDarkMode} />
      </div>
      <div className="section-reveal">
        <AIAssistant isDarkMode={isDarkMode} />
      </div>
      <div className="section-reveal">
        <OfferCarousel isDarkMode={isDarkMode} />
      </div>
      {/* <FloatingCTA /> */}
      <BottomNavigation isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}