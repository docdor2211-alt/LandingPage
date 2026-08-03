import ServiceCard from "./ServiceCard";
import { services } from "./servicesData";

const Services = ({ isDarkMode }) => {
  return (
    <section className={`py-24 transition-colors duration-300 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className={`rounded-full px-5 py-2 text-sm font-semibold ${isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"}`}>
            OUR SERVICES
          </span>

          <h2 className={`mt-5 text-4xl font-bold ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
            Complete Healthcare Solutions
          </h2>

          <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            Everything you need for your healthcare journey in one place—
            consultations, medicines, lab tests, surgeries, and pet care.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isDarkMode={isDarkMode}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;