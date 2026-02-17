import Header from "../components/Header";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProjectCardProps {
  image: string;
  title: string;
  tags: string[];
}

function ProjectCard({ image, title, tags }: ProjectCardProps) {
  return (
    <div className="bg-[#F4F6F8] dark:bg-gray-800 rounded-lg border border-[#EFF2F4] dark:border-gray-700 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-in-up">
      <div className="relative overflow-hidden h-72">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm text-[#84838C] dark:text-gray-400 bg-white dark:bg-gray-700 border border-[#B0ADAC] dark:border-gray-600 rounded-xl hover:border-[#3BB1E5] hover:text-[#3BB1E5] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
          <button className="ml-auto w-10 h-10 rounded-full bg-[#3BB1E5] hover:bg-[#2a8fbf] hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        
        <h3 className="text-2xl font-bold text-[#35323E] dark:text-white leading-tight group-hover:text-[#3BB1E5] transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  );
}

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ContactInfoCard({ icon, title, description }: ContactInfoCardProps) {
  return (
    <div className="group relative overflow-hidden p-6 rounded-xl text-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3BB1E5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-[#3BB1E5]/10 dark:bg-[#3BB1E5]/20 group-hover:bg-[#3BB1E5]/20 dark:group-hover:bg-[#3BB1E5]/30 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#3BB1E5] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    services: false,
    portfolio: false,
    contact: false,
  });

  const [displayedName, setDisplayedName] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const fullName = "Sami Ur Rehman";
  const fullTitle = "Software Engineer";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return stored === "true";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode to document
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

  useEffect(() => {
    // Animate hero on mount
    setIsVisible(prev => ({ ...prev, hero: true }));

    // Looping Typewriter effect for name and title
    const typeWriter = () => {
      let nameIndex = 0;
      let titleIndex = 0;
      let isDeletingName = false;
      let isDeletingTitle = false;
      let isTypingTitle = false;

      const typingInterval = setInterval(() => {
        // Type name first
        if (!isTypingTitle && !isDeletingName && nameIndex <= fullName.length) {
          setDisplayedName(fullName.slice(0, nameIndex));
          nameIndex++;
          
          if (nameIndex > fullName.length) {
            setIsTypingComplete(true);
            // Start typing title after name is complete
            setTimeout(() => {
              isTypingTitle = true;
              setShowTitle(true);
            }, 300);
          }
        }
        // Type title
        else if (isTypingTitle && !isDeletingTitle && titleIndex <= fullTitle.length) {
          setDisplayedTitle(fullTitle.slice(0, titleIndex));
          titleIndex++;
          
          if (titleIndex > fullTitle.length) {
            // Wait 2 seconds before starting to delete
            setTimeout(() => {
              isDeletingTitle = true;
            }, 2000);
          }
        }
        // Delete title
        else if (isDeletingTitle && titleIndex > 0) {
          titleIndex--;
          setDisplayedTitle(fullTitle.slice(0, titleIndex));
          
          if (titleIndex === 0) {
            // Start deleting name after title is deleted
            setTimeout(() => {
              isDeletingName = true;
              setShowTitle(false);
              setIsTypingComplete(false);
            }, 200);
          }
        }
        // Delete name
        else if (isDeletingName && nameIndex > 0) {
          nameIndex--;
          setDisplayedName(fullName.slice(0, nameIndex));
          
          if (nameIndex === 0) {
            // Wait 500ms before starting to type again
            setTimeout(() => {
              isDeletingName = false;
              isDeletingTitle = false;
              isTypingTitle = false;
            }, 500);
          }
        }
      }, isDeletingName || isDeletingTitle ? 50 : 100);

      return typingInterval;
    };

    const interval = typeWriter();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as keyof typeof isVisible;
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        
        // Show success toast
        toast.success("Message Sent!", {
          description: "Thank you for contacting us. We'll get back to you soon!",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          fname: "",
          email: "",
          number: "",
          subject: "",
          message: "",
        });
      } else {
        const errorMessage = data.error || "Failed to send message. Please try again.";
        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
        
        // Show error toast
        toast.error("Failed to Send", {
          description: errorMessage,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = "Network error. Please check your connection and try again.";
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      
      // Show error toast
      toast.error("Network Error", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />

      {/* Section 1: Hero */}
      <section id="hero" className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-900">
        {/* Animated background gradient */}
        <div className="absolute inset-0 z-0 animate-gradient-shift">
          <div
            className="absolute inset-0 dark:opacity-30"
            style={{
              background: isDark 
                ? `
                  radial-gradient(ellipse 800px 800px at 75% 50%, rgba(59, 177, 229, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse 600px 600px at 25% 80%, rgba(108, 192, 232, 0.1) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.8) 100%)
                `
                : `
                  radial-gradient(ellipse 800px 800px at 75% 50%, rgba(200, 230, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse 600px 600px at 25% 80%, rgba(230, 240, 250, 0.4) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(245, 250, 255, 0.8) 100%)
                `,
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#3BB1E5]/30 dark:bg-[#3BB1E5]/50 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-[#6CC0E8]/20 dark:bg-[#6CC0E8]/40 rounded-full animate-float-delayed" />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#3BB1E5]/25 dark:bg-[#3BB1E5]/45 rounded-full animate-float-slow" />
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#6CC0E8]/15 dark:bg-[#6CC0E8]/35 rounded-full animate-float" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            <div className={`flex flex-col justify-center space-y-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-4">
                <p className="text-[#A2ABBB] dark:text-gray-400 text-xs tracking-wide uppercase animate-fade-in">
                  Hello, my name is
                </p>
                <div className="w-48 h-2.5 bg-[#F5F7F9] dark:bg-gray-800 rounded-full relative overflow-hidden">
                  <div className="absolute top-1/2 left-1 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-[#3BB1E5] to-[#6CC0E8] animate-slide-right" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#151515] dark:text-white leading-none min-h-[1.2em]">
                  {displayedName.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  <span className={`inline-block w-0.5 h-[1em] bg-[#3BB1E5] ml-1 ${isTypingComplete ? 'animate-cursor-blink' : ''}`} />
                </h1>
                {showTitle && (
                  <p className="font-serif font-bold text-3xl sm:text-4xl text-[#8490A3] dark:text-gray-400 min-h-[1.2em]">
                    {displayedTitle.split('').map((char, index) => (
                      <span key={index} className="inline-block">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                    <span className="inline-block w-0.5 h-[1em] bg-[#8490A3] dark:bg-gray-400 ml-1" />
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-6 animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3BB1E5] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <a
                    href="mailto:samiurrehman.dev@gmail.com"
                    className="text-sm text-[#69686D] dark:text-gray-400 hover:text-[#3BB1E5] transition-colors tracking-wide"
                  >
                    samiurrehman.dev@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#3BB1E5] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <a
                    href="tel:+923288028776"
                    className="text-sm text-[#6F6F74] dark:text-gray-400 hover:text-[#3BB1E5] transition-colors"
                  >
                    +92 328 8028776
                  </a>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative w-full max-w-[350px] lg:max-w-[490px] aspect-square">
                {/* Animated ring effect */}
                <div className="absolute inset-0 rounded-full border-4 border-[#3BB1E5]/20 animate-ping-slow" />
                <div className="absolute inset-4 rounded-full border-2 border-[#6CC0E8]/30 animate-pulse-slow" />
                
                <div
                  className="absolute inset-0 rounded-full overflow-hidden animate-float-gentle"
                  style={{
                    boxShadow: "0 20px 60px rgba(59, 177, 229, 0.15), 0 0 100px rgba(59, 177, 229, 0.1)",
                  }}
                >
                  <img
                    src="sami.jpeg"
                    alt="Sami Ur Rehman - Web Developer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#3BB1E5]/10 to-[#6CC0E8]/10 rounded-full blur-2xl -z-10 animate-pulse-slow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About */}
      <section id="about" className="bg-[#F6F8FA] dark:bg-gray-800 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="space-y-24">
            <div className="space-y-16">
              <div className={`space-y-8 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[#58B9E6] dark:text-[#6CC0E8] text-[13px] font-normal animate-fade-in">
                  About me
                </p>
                
                <h2 className="font-semibold text-[44px] leading-[57.5px] text-[#1F2020] dark:text-white max-w-[1059px] animate-fade-in-up animation-delay-200">
                  I am an enthusiastic web developer, with a rich experience of over 1 year of experience in website & product design.
                </h2>
              </div>

              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-1000 delay-300 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div>
                  <h3 className="font-semibold text-[33px] leading-[38px] text-[#2AA9E3] dark:text-[#6CC0E8] max-w-[360px] hover:scale-105 transition-transform duration-500">
                    I design professional & beautiful websites
                  </h3>
                </div>

                <div className="space-y-8">
                  <p className="text-[13px] leading-[24.8px] text-[#7B7B7F] dark:text-gray-400 animate-fade-in animation-delay-400">
                    With 1 year of experience in graphic and web design I have mastered the skills of understanding client requirements according to the latest trends. I have worked with businesses from different niches so you can rely on me for yours.
                  </p>

                  <p className="text-[13px] leading-[25.3px] text-[#ADB4C1] dark:text-gray-500 animate-fade-in animation-delay-600">
                    I've spent most of these years working across different areas of design like front-end development, landing pages, email design, app UI/UX, to my current role designing products for mobile platforms. Having worked on various projects that are already live, I can help you with the best possible suggestions and ideas that we can proceed with. With me, you aren't forced to accept anything, I give you a variety of options we can work on together.
                  </p>

                  <button className="text-[14px] text-[#7BC6E8] hover:text-[#2AA9E3] hover:translate-x-2 transition-all duration-300 font-normal group">
                    READ MORE
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 pt-12">
              <div className="space-y-12">
                <h3 className="font-serif font-bold text-5xl text-[#1D1D1E] dark:text-white">
                  Skills
                </h3>
                
                <div className="space-y-8">
                  <div className="space-y-3 group">
                    <p className="text-[13px] text-[#ADB6C3] dark:text-gray-400">JavaScript</p>
                    <div className="relative overflow-hidden">
                      <div className="h-5 rounded-md border border-[#33AEE5] bg-gray-200 dark:bg-gray-700">
                        <div 
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] ease-out ${isVisible.about ? 'w-[85%]' : 'w-0'}`}
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
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-200 ease-out ${isVisible.about ? 'w-[95%]' : 'w-0'}`}
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
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-200 ease-out ${isVisible.about ? 'w-[95%]' : 'w-0'}`}
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
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[400ms] ease-out ${isVisible.about ? 'w-[75%]' : 'w-0'}`}
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
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[400ms] ease-out ${isVisible.about ? 'w-[75%]' : 'w-0'}`}
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
                          className={`h-full rounded-md bg-gradient-to-r from-[#009BE0] to-[#3BB1E5] transition-all duration-[2000ms] delay-[600ms] ease-out ${isVisible.about ? 'w-[80%]' : 'w-0'}`}
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
                <h3 className="font-serif font-bold text-5xl text-[#171717] dark:text-white">
                  My Experience
                </h3>
                
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

                    <p className="text-[13px] text-[#ACB4C2] dark:text-gray-400">MalDev.net</p>
                    
                    <div className="space-y-3">
                      <h4 className="text-[17px] text-[#4FB6E5]">LEAD UI/UX DESIGNER</h4>
                      <p className="text-[13px] leading-[23.5px] text-[#79797E] dark:text-gray-400">
                        I have responsibly led a team of 12 designers to help supervise and approve their designs to make sure it matches client expectations and latest design standards
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-[#636368] dark:text-gray-400">2025-present</p>
                    
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

                    <p className="text-[13px] text-[#AEB6C4] dark:text-gray-400">Maldev.net</p>
                    
                    <div className="space-y-3">
                      <h4 className="text-[17px] text-[#4FB6E5]">WEB DEVELOPER</h4>
                      <p className="text-[13px] leading-[25.4px] text-[#7C7C81]">
                        I was responsible for all the in-house and client-based web development assignments. I take pride in having helped the best of clients and getting maximum ratings for the company.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Services */}
      <section id="services" className="bg-[#F6F8FA] dark:bg-gray-800 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="space-y-16">
            <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-6 lg:max-w-[550px]">
                <h2 className="font-serif font-bold text-5xl text-[#181818] dark:text-white animate-fade-in-up">
                  What I do
                </h2>
                <p className="text-[13px] leading-[22.7px] text-[#AEB6C3] dark:text-gray-400 animate-fade-in animation-delay-200">
                  From understanding your requirements, designing a blueprint and delivering the final product, I do everything that falls in between these lines.
                </p>
              </div>
              
              <div className="lg:pt-8">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/71bd45219455ff837af749683953da7a50324527?width=182"
                  alt=""
                  className="w-20 lg:w-24 h-auto animate-bounce-slow"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-8">
              <div className="bg-white dark:bg-gray-900 p-8 lg:p-10 space-y-6 rounded-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up border border-transparent dark:border-gray-700 hover:border-[#3BB1E5]">
                <div className="flex items-center gap-4">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/11770461224aed6afd3d8ea287e06d4a103afe6a?width=50"
                    alt=""
                    className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  />
                  <h3 className="text-[17px] font-normal text-[#59585C] dark:text-gray-300 group-hover:text-[#3BB1E5] transition-colors duration-300">
                    UI/UX DESIGN
                  </h3>
                </div>
                <p className="text-[13px] leading-[24.9px] text-[#A9B0BF] dark:text-gray-400">
                  An effective UI/UX is what captures attention and spreads a clear message. I make sure the design is innovative and neat with all of this.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#F5F7F9] to-white dark:from-gray-800 dark:to-gray-900 p-8 lg:p-10 space-y-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up animation-delay-200 border-2 border-[#3BB1E5]">
                <div className="flex items-center gap-4">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/fb5bf57fe3a0a447778d1207f0f352c60da6df33?width=58"
                    alt=""
                    className="w-7 h-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  />
                  <h3 className="text-base font-bold text-[#504E50] dark:text-gray-200 group-hover:text-[#3BB1E5] transition-colors duration-300">
                    WEB DEVELOPMENT
                  </h3>
                </div>
                <p className="text-[13px] leading-[24.9px] text-[#ADB3C1] dark:text-gray-400">
                  If you are looking for a developer who'll take over the research and development of your website, I am a well-established professional to help you with this.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 lg:p-10 space-y-6 rounded-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group md:col-span-2 lg:col-span-1 animate-fade-in-up animation-delay-400 border border-transparent dark:border-gray-700 hover:border-[#3BB1E5]">
                <div className="flex items-center gap-4">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/18f37a65b59ba8ef3bc3e4f6cf50bd6e6da21f13?width=30"
                    alt=""
                    className="w-4 h-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  />
                  <h3 className="text-base font-bold text-[#515154] dark:text-gray-300 group-hover:text-[#3BB1E5] transition-colors duration-300">
                    FULLSTACK APP DEVELOPMENT
                  </h3>
                </div>
                <p className="text-[13px] leading-[25.4px] text-[#A9B2C1] dark:text-gray-400">
                  If you are looking for a user-friendly app that will attract more mobile users, I can help you design and build a platform with the latest and trendiest look and feel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Portfolio */}
      <section id="portfolio" className="bg-[#EBEFF2] dark:bg-gray-900 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#3BB1E5]/5 dark:bg-[#3BB1E5]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#6CC0E8]/5 dark:bg-[#6CC0E8]/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="space-y-16">
            <div className={`text-center space-y-6 transition-all duration-1000 ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-block px-8 py-3 bg-[#EBF0F2] dark:bg-gray-800 border border-[#D9DBDC] dark:border-gray-700 rounded-2xl hover:border-[#3BB1E5] hover:shadow-lg transition-all duration-500 animate-fade-in">
                <span className="text-[15px] font-bold text-[#3BB1E5]">PORTFOLIO</span>
              </div>
              
              <h2 className="text-5xl font-bold text-[#18151F] dark:text-white animate-fade-in-up animation-delay-200">
                My Recent Work
              </h2>
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

            <div className="text-center space-y-6 pt-8 animate-fade-in">
              <p className="text-sm font-bold text-[#959598]">
                Are you interested to show more portfolios?
              </p>
              
              <button className="px-8 py-2.5 bg-[#F1F5F9] border border-[#FECABF] rounded-2xl text-sm font-bold text-[#595761] hover:bg-white hover:border-[#3BB1E5] hover:text-[#3BB1E5] hover:scale-105 hover:shadow-xl transition-all duration-500">
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section id="contact" className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className={`space-y-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center space-y-4">
              <p className="text-[#3BB1E5] text-sm tracking-wide animate-fade-in">
                CONTACT
              </p>
              <h2 className="font-serif font-bold text-5xl text-[#1F2020] dark:text-white animate-fade-in-up animation-delay-200">
                Get In Touch
              </h2>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <ContactInfoCard
                icon={<Mail className="w-6 h-6 text-[#3BB1E5]" />}
                title="Email"
                description="samiurrehman.dev@gmail.com"
              />
              <ContactInfoCard
                icon={<Phone className="w-6 h-6 text-[#3BB1E5]" />}
                title="Phone"
                description="+92 328 8028776"
              />
              <ContactInfoCard
                icon={<MapPin className="w-6 h-6 text-[#3BB1E5]" />}
                title="Location"
                description="Johr Town, Lahore, Pakistan"
              />
              <ContactInfoCard
                icon={<Clock className="w-6 h-6 text-[#3BB1E5]" />}
                title="Working Hours"
                description="Mon - Fri: 9AM - 6PM"
              />
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 animate-fade-in-up animation-delay-400">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="px-6 py-4 bg-[#F8F9FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#3BB1E5] transition-colors duration-300 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="px-6 py-4 bg-[#F8F9FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#3BB1E5] transition-colors duration-300 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="px-6 py-4 bg-[#F8F9FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#3BB1E5] transition-colors duration-300 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="px-6 py-4 bg-[#F8F9FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#3BB1E5] transition-colors duration-300 text-gray-900 dark:text-white"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={6}
                className="w-full px-6 py-4 bg-[#F8F9FA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-[#3BB1E5] transition-colors duration-300 resize-none text-gray-900 dark:text-white"
              />

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg border ${
                    submitStatus.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submitStatus.type === "success" ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 bg-[#3BB1E5] hover:bg-[#2a8fbf] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

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
