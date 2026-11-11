import { useEffect, useState } from "react";
import RouterProvider from "./router/RouterProvider";
import { useRouter } from "./router/routerContext";
import { matchBlogSlug, ROUTES } from "./router/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import FloatingCTA from "./components/FloatingCTA/FloatingCTA";
import CarePlanModal from "./components/common/CarePlanModal";
import AppDownloadModal from "./components/common/AppDownloadModal";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/ConfidentialityPage";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundGuidelinesPage";
import NotFound from "./pages/NotFound";

const AppShell = () => {
  const { pathname } = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("docdor-theme");
    return savedTheme === "dark";
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    if (typeof window === "undefined") return "Indore, India";
    return window.localStorage.getItem("docdor-city") || "Indore, India";
  });

  const [carePlanOpen, setCarePlanOpen] = useState(false);
  const [downloadPlatform, setDownloadPlatform] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    root.style.colorScheme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem("docdor-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    try {
      window.localStorage.setItem("docdor-city", city);
    } catch {
      // ignore storage error
    }
  };

  const renderPage = () => {
    const blogSlug = matchBlogSlug(pathname);
    if (blogSlug) {
      return <BlogDetail key={blogSlug} isDarkMode={isDarkMode} slug={blogSlug} />;
    }

    switch (pathname) {
      case ROUTES.HOME:
        return (
          <Home
            isDarkMode={isDarkMode}
            onOpenDownload={(platform) => setDownloadPlatform(platform)}
            onOpenCarePlan={() => setCarePlanOpen(true)}
          />
        );
      case ROUTES.ABOUT_US:
        return <AboutUs isDarkMode={isDarkMode} />;
      case ROUTES.CONTACT:
        return <Contact isDarkMode={isDarkMode} />;
      case ROUTES.CAREERS:
        return <Careers isDarkMode={isDarkMode} />;
      case ROUTES.BLOG:
        return <Blog isDarkMode={isDarkMode} />;
      case ROUTES.HELP_CENTER:
        return <HelpCenter isDarkMode={isDarkMode} />;
      case ROUTES.PRIVACY_POLICY:
        return <PrivacyPolicy isDarkMode={isDarkMode} />;
      case ROUTES.TERMS_CONDITIONS:
        return <TermsConditions isDarkMode={isDarkMode} />;
      case ROUTES.REFUND_POLICY:
        return <RefundPolicy isDarkMode={isDarkMode} />;
      default:
        return <NotFound isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-[#060B17] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode((prev) => !prev)}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onOpenCarePlan={() => setCarePlanOpen(true)}
      />

      <main className="flex-1">{renderPage()}</main>

      <Footer isDarkMode={isDarkMode} />
      <BottomNavigation isDarkMode={isDarkMode} />
      <FloatingCTA isDarkMode={isDarkMode} />

      <CarePlanModal
        isOpen={carePlanOpen}
        onClose={() => setCarePlanOpen(false)}
        isDarkMode={isDarkMode}
      />

      <AppDownloadModal
        isOpen={Boolean(downloadPlatform)}
        platform={downloadPlatform}
        onClose={() => setDownloadPlatform(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

const App = () => {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
};

export default App;
