import Header from "../components/Header";
import { useState, useEffect } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color?: string;
}

function SkillBar({ name, percentage, color = "#009BE0" }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <p className="text-[13px] text-[#ADB6C3]">{name}</p>
      <div className="relative h-6">
        <img
          src={`https://api.builder.io/api/v1/image/assets/TEMP/${
            percentage === 85
              ? "7e4d3cbcd50809e990850a4eab9cacf997c98332"
              : percentage === 95
              ? "7e4d3cbcd50809e990850a4eab9cacf997c98332"
              : percentage === 75
              ? "dfcb72446fef9727fdb27208755e943a175aa7d6"
              : "dd24f4358e5fa94c93bb86739a7576fbac4761a4"
          }?width=880`}
          alt=""
          className="w-full h-6 object-cover"
        />
        <span className="absolute text-[10px] font-light text-[#86CAEA] text-center" style={{ left: `${percentage - 5}%`, top: "50%", transform: "translateY(-50%)" }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  isFirst?: boolean;
}

function ExperienceItem({ year, title, company, description, isFirst }: ExperienceItemProps) {
  return (
    <div className="relative">
      <div className="space-y-4">
        <p className="text-xs text-[#676769]">{year}</p>
        
        <div className="relative">
          <div className="h-6 bg-[#F5F7F9] relative">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a4de6cdda77b3897e7dbf7ec5c45821528bc751d?width=30"
              alt=""
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
            />
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/3e27faa2e11400fc49477404369b3e584e7fe1b3?width=222"
            alt=""
            className="w-28 h-px mt-1"
          />
        </div>

        <p className="text-[13px] text-[#ACB4C2]">{company}</p>
        
        <div className="space-y-2">
          <h4 className="text-[17px] text-[#4FB6E5]">{title}</h4>
          <p className="text-[13px] leading-[25.4px] text-[#79797E]">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return stored === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isSkillsVisible, setIsSkillsVisible] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDark.toString());
  }, [isDark]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSkillsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] dark:bg-gray-900 transition-colors duration-300">
      <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
        <div className="space-y-24">
          <div className="space-y-16">
            <div className="space-y-8">
              <p className="text-[#58B9E6] dark:text-[#6CC0E8] text-[13px] font-normal">
                About me
              </p>
              
              <h1 className="font-semibold text-[44px] leading-[57.5px] text-[#1F2020] dark:text-white max-w-[1059px]">
                I am an enthusiastic web developer, with a rich experience of over 1 year of experience in website & product design.
              </h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="font-semibold text-[33px] leading-[38px] text-[#2AA9E3] dark:text-[#6CC0E8] max-w-[360px]">
                  I design professional & beautiful websites
                </h2>
              </div>

              <div className="space-y-8">
                <p className="text-[13px] leading-[24.8px] text-[#7B7B7F] dark:text-gray-400">
                  With 1 year of experience in graphic and web design I have mastered the skills of understanding client requirements according to the latest trends. I have worked with businesses from different niches so you can rely on me for yours.
                </p>

                <p className="text-[13px] leading-[25.3px] text-[#ADB4C1] dark:text-gray-500">
                  I've spent most of these years working across different areas of design like front-end development, landing pages, email design, app UI/UX, to my current role designing products for mobile platforms. Having worked on various projects that are already live, I can help you with the best possible suggestions and ideas that we can proceed with. With me, you aren't forced to accept anything, I give you a variety of options we can work on together.
                </p>

                <button className="text-[14px] text-[#7BC6E8] hover:text-[#2AA9E3] hover:translate-x-2 transition-all duration-300 font-normal group">
                  READ MORE
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 pt-12" id="skills-section">
            <div className="space-y-12">
              <h2 className="font-serif font-bold text-5xl text-[#1D1D1E] dark:text-white">
                Skills
              </h2>
              
              <div className="space-y-8">
                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#ADB6C3] dark:text-gray-400">JavaScript</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] ease-out ${isSkillsVisible ? 'w-[85%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          85%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#B0B6C4] dark:text-gray-400">TypeScript</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-200 ease-out ${isSkillsVisible ? 'w-[95%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          95%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#B0B6C4] dark:text-gray-400">Nodejs</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-200 ease-out ${isSkillsVisible ? 'w-[95%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          95%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#B1B7C3] dark:text-gray-400">NextJS</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[400ms] ease-out ${isSkillsVisible ? 'w-[75%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          75%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#B1B7C3] dark:text-gray-400">ReactJs</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[400ms] ease-out ${isSkillsVisible ? 'w-[75%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          75%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 group">
                  <p className="text-[13px] text-[#A9B2C1] dark:text-gray-400">MongoDB</p>
                  <div className="relative overflow-hidden">
                    <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                      <div 
                        className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[600ms] ease-out ${isSkillsVisible ? 'w-[80%]' : 'w-0'}`}
                      >
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white font-bold">
                          80%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="font-serif font-bold text-5xl text-[#171717] dark:text-white">
                My Experience
              </h2>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-xs text-[#676769] dark:text-gray-400">2026-2025</p>
                  
                  <div className="relative">
                    <div className="h-6 bg-[#F5F7F9] dark:bg-gray-700 relative">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/a4de6cdda77b3897e7dbf7ec5c45821528bc751d?width=30"
                        alt=""
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/3e27faa2e11400fc49477404369b3e584e7fe1b3?width=222"
                      alt=""
                      className="w-28 h-px mt-1"
                    />
                  </div>

                  <p className="text-[13px] text-[#ACB4C2] dark:text-gray-400">GIAIC</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-[17px] text-[#4FB6E5]">Full Stack Developer</h4>
                    <p className="text-[13px] leading-[23.5px] text-[#79797E] dark:text-gray-400">
                      Currently learning and mastering full-stack development at Governor House IT Initiative, focusing on modern web technologies including Next.js, TypeScript, and AI integration.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-[#636368] dark:text-gray-400">2011-2015</p>
                  
                  <div className="relative">
                    <div className="h-6 bg-[#F5F7F9] dark:bg-gray-700 relative">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/4879f89d2ed454077e91a9b42be9abb3e2a1b53c?width=30"
                        alt=""
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f0a7da817d85648daa30db83c233f6d9f4f5910f?width=222"
                      alt=""
                      className="w-28 h-px mt-1"
                    />
                  </div>

                  <p className="text-[13px] text-[#AEB6C4] dark:text-gray-400">Dynamic Capital INC</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-[17px] text-[#4FB6E5]">WEB DEVELOPER</h4>
                    <p className="text-[13px] leading-[25.4px] text-[#7C7C81] dark:text-gray-400">
                      I was responsible for all the in-house and client-based web development assignments. I take pride in having helped the best of clients and getting maximum ratings for the company.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-[#5E5D60] dark:text-gray-400">2003-2011</p>
                  
                  <div className="relative">
                    <div className="h-6 bg-[#F6F8FA] dark:bg-gray-700 relative">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/9effc47d98bbc92dda0bb9bf6a12c74af36b94f8?width=30"
                        alt=""
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
                      />
                    </div>
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/4498535bfefa6a9918e5832057c88e92cd5372c9?width=220"
                      alt=""
                      className="w-28 h-px mt-1"
                    />
                  </div>

                  <p className="text-[13px] text-[#ADB5C4] dark:text-gray-400">Dynamic Capital INC</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-[17px] text-[#51B7E6]">UI/UX DESIGNER</h4>
                    <p className="text-[13px] leading-[25.2px] text-[#7B7C7F] dark:text-gray-400">
                      I was a part of an amazing design team and worked together with them to help design and develop apps and websites for different clients of the company.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
