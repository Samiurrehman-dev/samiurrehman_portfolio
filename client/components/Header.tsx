import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDark, onToggleDarkMode }: HeaderProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/portfolio", label: "PORTFOLIO" },
    { path: "/contact", label: "CONTACT" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#545555] dark:bg-gray-300 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#545555] dark:bg-gray-300 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#545555] dark:bg-gray-300 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 top-[73px] bg-white dark:bg-gray-900 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center gap-8 pt-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`text-xl font-normal transition-colors ${
                location.pathname === item.path
                  ? "text-[#6CC0E8]"
                  : "text-[#79787E] dark:text-gray-400 hover:text-[#6CC0E8]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
