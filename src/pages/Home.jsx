import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hero from "../components/Hero";
import Services from "../components/services/Services";
import AIAssistant from "../components/AIAssitant/AIAssistant";
import HealthHighlights from "../components/highlights/HealthHighlights";

export default function Home({ isDarkMode, onOpenDownload }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-reveal", {
        opacity: 0,
        y: 32,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="section-reveal">
        <Hero isDarkMode={isDarkMode} onOpenDownload={onOpenDownload} />
      </div>
      <div className="section-reveal">
        <Services isDarkMode={isDarkMode} />
      </div>
      <div className="section-reveal">
        <AIAssistant isDarkMode={isDarkMode} />
      </div>
      <div className="section-reveal">
        <HealthHighlights isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
