import { aiFeatures } from "./aiFeatures";
import FeatureCard from "./FeatureCard";
import robot from "../../assets/images/robot.png";

const AIAssistant = ({ isDarkMode }) => {
  return (
    <section className={`py-24 overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" : "bg-gradient-to-br from-slate-100 via-white to-slate-50"}`}>
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">

          <span className={`rounded-full px-5 py-2 text-sm font-semibold ${isDarkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"}`}>
            AI HEALTH ASSISTANT
          </span>

          <h2 className={`mt-5 text-4xl font-bold md:text-5xl ${isDarkMode ? "text-slate-100" : "text-gray-900"}`}>
            Your Smart Healthcare Companion
          </h2>

          <p className={`mx-auto mt-5 max-w-3xl text-lg leading-8 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            Powered by Artificial Intelligence to help you understand
            symptoms, prescriptions, medical reports, and improve your
            overall healthcare experience.
          </p>

        </div>

        <div className="grid items-center gap-5 lg:grid-cols-2">

          {/* Robot */}
          <div className="relative flex justify-center">

            <div className={`absolute h-64 w-64 rounded-full blur-3xl ${isDarkMode ? "bg-slate-700/40" : "bg-slate-200/40"}`}></div>

            <img
              src={robot}
              alt="AI Robot"
              className="relative w-56 animate-bounce md:w-72"
            />

            <div className={`absolute top-12 left-0 rounded-2xl p-4 shadow-xl ${isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}`}>
              🤖 AI Available 24×7
            </div>

            <div className={`absolute bottom-12 right-0 rounded-2xl p-4 shadow-xl ${isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white text-slate-900"}`}>
              ⚡ Instant Response
            </div>

          </div>

          {/* Cards */}
          <div className="grid gap-14 sm:grid-cols-2">

            {aiFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                isDarkMode={isDarkMode}
              />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAssistant;