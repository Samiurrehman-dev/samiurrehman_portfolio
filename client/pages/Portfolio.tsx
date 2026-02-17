import Header from "../components/Header";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  image: string;
  title: string;
  tags: string[];
  imageClass?: string;
}

function ProjectCard({ image, title, tags, imageClass }: ProjectCardProps) {
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-800 rounded-lg border border-[#EFF2F4] dark:border-gray-700 overflow-hidden group hover:shadow-lg transition-shadow">
      <div className={`relative overflow-hidden ${imageClass || 'h-72'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm text-[#84838C] dark:text-gray-400 bg-white dark:bg-gray-700 border border-[#B0ADAC] dark:border-gray-600 rounded-xl"
            >
              {tag}
            </span>
          ))}
          <button className="ml-auto w-10 h-10 rounded-full bg-[#3BB1E5] hover:bg-[#2a8fbf] transition-colors flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <h3 className="text-2xl font-bold text-[#35323E] dark:text-white leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function Portfolio() {
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

  const projects = [
    {
      image: "RabtaUlIman.png",
      title: "Rabta-ul-Iman – Integrated Donation & Donor Management System",
      tags: ["FullStack", "SocialImpactTech"],
    },
    {
      image: "Truefeeback.png",
      title: "True Feedback – Secure Anonymous Messaging Platform",
      tags: ["RealTimeWeb", "SecureMessaging"],
    },
    {
      image: "BookPrintedmanagement.png",
      title: "Automated Book Printing & Binding Inventory System",
      tags: ["InventoryAutomation", "ModernUIUX"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#EBEFF2] dark:bg-gray-900 transition-colors duration-300">
      <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-block px-8 py-3 bg-[#EBF0F2] dark:bg-gray-800 border border-[#D9DBDC] dark:border-gray-700 rounded-2xl">
              <span className="text-[15px] font-bold text-[#3BB1E5]">PORTFOLIO</span>
            </div>
            
            <h1 className="text-5xl font-bold text-[#18151F] dark:text-white">
              My Recent Work
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                
                key={index}
                image={project.image}
                title={project.title}
                tags={project.tags}
              />
            ))}
          </div>

          <div className="text-center space-y-6 pt-8">
            <p className="text-sm font-bold text-[#959598] dark:text-gray-400">
              Are you interested to show more portfolios?
            </p>
            
            <button className="px-8 py-2.5 bg-[#F1F5F9] dark:bg-gray-800 border border-[#FECABF] dark:border-gray-700 rounded-2xl text-sm font-bold text-[#595761] dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F6F8FA] dark:bg-gray-800 py-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Sami Ur Rehman. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
