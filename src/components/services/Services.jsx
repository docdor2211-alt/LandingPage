import { useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";
import { SERVICE_CATEGORIES, services } from "./servicesData";

const Services = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const visibleServices = useMemo(() => {
    if (selectedCategory === "All Services") return services;
    return services.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="services"
      className={`scroll-mt-20 py-20 sm:py-24 transition-colors duration-300 ${
        isDarkMode ? "bg-[#060B17]" : "bg-slate-50/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
              isDarkMode
                ? "border-sky-500/30 bg-sky-500/10 text-sky-300"
                : "border-sky-200 bg-sky-50 text-sky-700"
            }`}
          >
            Our Care Services
          </span>

          <h2
            className={`mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Complete Healthcare Solutions
          </h2>

          <p
            className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Everything your family needs in one connected experience—consultations,
            medicines, home lab tests, surgical care, and veterinary support.
          </p>

          {/* Interactive Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SERVICE_CATEGORIES.map((category) => {
              const active = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
                    active
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md shadow-sky-500/20"
                      : isDarkMode
                        ? "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <ServiceCard key={service.id} {...service} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
