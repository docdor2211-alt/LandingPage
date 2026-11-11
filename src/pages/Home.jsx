import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Services from "../components/services/Services";
import AIAssistant from "../components/AIAssitant/AIAssistant";
import HealthHighlights from "../components/highlights/HealthHighlights";
import CarePlanBanner from "../components/CarePlanBanner";

export default function Home({ isDarkMode, onOpenDownload, onOpenCarePlan }) {
  return (
    <div>
      <Hero isDarkMode={isDarkMode} onOpenDownload={onOpenDownload} />
      <HowItWorks isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <AIAssistant isDarkMode={isDarkMode} />
      <HealthHighlights isDarkMode={isDarkMode} onOpenCarePlan={onOpenCarePlan} />
      <CarePlanBanner
        isDarkMode={isDarkMode}
        onOpenCarePlan={onOpenCarePlan}
        onOpenDownload={onOpenDownload}
      />
    </div>
  );
}
