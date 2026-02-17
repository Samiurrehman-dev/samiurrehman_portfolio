import Header from "../components/Header";
import { useState, useEffect } from "react";

export default function Services() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return stored === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] dark:bg-gray-900 transition-colors duration-300">
      <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="space-y-6 lg:max-w-[550px]">
              <h1 className="font-serif font-bold text-5xl text-[#181818] dark:text-white">
                What I do
              </h1>
              <p className="text-[13px] leading-[22.7px] text-[#AEB6C3] dark:text-gray-400">
                From understanding your requirements, designing a blueprint and delivering the final product, I do everything that falls in between these lines.
              </p>
            </div>
            
            <div className="lg:pt-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/71bd45219455ff837af749683953da7a50324527?width=182"
                alt=""
                className="w-20 lg:w-24 h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-8">
            <div className="bg-white dark:bg-gray-800 p-8 lg:p-10 space-y-6 rounded-sm border border-transparent dark:border-gray-700 hover:border-[#3BB1E5] transition-all duration-300">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/11770461224aed6afd3d8ea287e06d4a103afe6a?width=50"
                  alt=""
                  className="w-6 h-6"
                />
                <h3 className="text-[17px] font-normal text-[#59585C] dark:text-gray-300">
                  UI/UX DESIGN
                </h3>
              </div>
              <p className="text-[13px] leading-[24.9px] text-[#A9B0BF] dark:text-gray-400">
                An effective UI/UX is what captures attention and spreads a clear message. I make sure the design is innovative and neat with all of this.
              </p>
            </div>

            <div className="bg-[#F5F7F9] dark:bg-gray-700 p-8 lg:p-10 space-y-6 rounded-sm border-r-4 border-r-[#F4F6F9] dark:border-r-[#3BB1E5]">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/fb5bf57fe3a0a447778d1207f0f352c60da6df33?width=58"
                  alt=""
                  className="w-7 h-6"
                />
                <h3 className="text-base font-bold text-[#504E50] dark:text-gray-200">
                  WEB DEVELOPMENT
                </h3>
              </div>
              <p className="text-[13px] leading-[24.9px] text-[#ADB3C1] dark:text-gray-300">
                If you are looking for a developer who'll take over the research and development of your website, I am a well-established professional to help you with this.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 lg:p-10 space-y-6 rounded-sm md:col-span-2 lg:col-span-1 border border-transparent dark:border-gray-700 hover:border-[#3BB1E5] transition-all duration-300">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/18f37a65b59ba8ef3bc3e4f6cf50bd6e6da21f13?width=30"
                  alt=""
                  className="w-4 h-6"
                />
                <h3 className="text-base font-bold text-[#515154] dark:text-gray-300">
                  APP DEVELOPMENT
                </h3>
              </div>
              <p className="text-[13px] leading-[25.4px] text-[#A9B2C1] dark:text-gray-400">
                If you are looking for a user-friendly app that will attract more mobile users, I can help you design and build a platform with the latest and trendiest look and feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
