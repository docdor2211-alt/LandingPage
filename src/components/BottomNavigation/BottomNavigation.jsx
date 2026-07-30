import {
  FaHome,
  FaFlask,
  FaPills,
  FaUser,
  FaPlus,
} from "react-icons/fa";

const BottomNavigation = ({ isDarkMode }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <div className="mx-auto max-w-md relative">
        <div className={`flex items-center justify-between rounded-2xl border shadow-lg px-4 py-2 ${isDarkMode ? "border-slate-700 bg-slate-900/90" : "border-slate-200 bg-white"}`}>

          <button aria-label="Home" aria-current="page" className="flex flex-col items-center text-sky-600">
            <FaHome size={20} />
            <span className="mt-1 text-xs">Home</span>
          </button>

          <button aria-label="Lab" className="flex flex-col items-center text-gray-500 hover:text-sky-600 transition-colors">
            <FaFlask size={20} />
            <span className="mt-1 text-xs">Lab</span>
          </button>

          <div className="w-8"></div>

          <button aria-label="Medicine" className="flex flex-col items-center text-gray-500 hover:text-sky-600 transition-colors">
            <FaPills size={20} />
            <span className="mt-1 text-xs">Medicine</span>
          </button>

          <button aria-label="Profile" className="flex flex-col items-center text-gray-500 hover:text-sky-600 transition-colors">
            <FaUser size={20} />
            <span className="mt-1 text-xs">Profile</span>
          </button>

        </div>

        <button aria-label="Quick Action" className={`absolute left-1/2 -top-6 -translate-x-1/2 bg-sky-600 text-white p-3 rounded-full shadow-lg border-4 ${isDarkMode ? "border-slate-900" : "border-white"}`}>
          <FaPlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;