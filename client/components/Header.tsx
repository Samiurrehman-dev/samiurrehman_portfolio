import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDark, onToggleDarkMode }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="w-full py-4 px-6 md:px-12 lg:px-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed top-0 z-50 border-b border-transparent dark:border-gray-800">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-serif font-bold text-2xl text-[#3BB1E5]">
            MR.
          </span>
          <span className="font-oswald text-lg text-[#545555] dark:text-gray-300 tracking-wide">
            SAMI UR REHMAN
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-normal transition-colors ${
                  location.pathname === item.path
                    ? "text-[#6CC0E8]"
                    : "text-[#79787E] dark:text-gray-400 hover:text-[#6CC0E8]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <DarkModeToggle isDark={isDark} onToggle={onToggleDarkMode} />

          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-[#545555] dark:bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-[#545555] dark:bg-gray-300"></span>
            <span className="w-6 h-0.5 bg-[#545555] dark:bg-gray-300"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
