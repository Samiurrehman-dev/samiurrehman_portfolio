import Header from "../components/Header";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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

export default function Contact() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />

      <section className="py-24 pt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-[#3BB1E5] dark:text-[#6CC0E8] text-sm font-semibold tracking-wide uppercase">
              Get In Touch
            </p>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Let's Work Together
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind? Let's discuss how we can help bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards - Horizontal Layout */}
            <div className="lg:col-span-3 grid md:grid-cols-4 grid-cols-1 gap-6">
              <ContactInfoCard
                icon={<MapPin className="w-8 h-8 text-[#3BB1E5]" />}
                title="Location"
                description="Johr Town, Lahore, Pakistan"
              />

              <ContactInfoCard
                icon={<Phone className="w-8 h-8 text-[#3BB1E5]" />}
                title="Phone"
                description="+923288028776"
              />

              <ContactInfoCard
                icon={<Clock className="w-8 h-8 text-[#3BB1E5]" />}
                title="Working Hours"
                description="Mon - Fri, 9AM - 6PM"
              />

              <ContactInfoCard
                icon={<Mail className="w-8 h-8 text-[#3BB1E5]" />}
                title="Email"
                description="Quick response guaranteed"
              />
            </div>
          </div>

          {/* Contact Form - Full Width */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="fname"
                      >
                        Full Name
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#3BB1E5] dark:focus:border-[#3BB1E5] focus:ring-2 focus:ring-[#3BB1E5]/20 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Full Name"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#3BB1E5] dark:focus:border-[#3BB1E5] focus:ring-2 focus:ring-[#3BB1E5]/20 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="number"
                      >
                        Phone Number
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#3BB1E5] dark:focus:border-[#3BB1E5] focus:ring-2 focus:ring-[#3BB1E5]/20 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        type="tel"
                        id="number"
                        name="number"
                        placeholder="Phone Number"
                        value={formData.number}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#3BB1E5] dark:focus:border-[#3BB1E5] focus:ring-2 focus:ring-[#3BB1E5]/20 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#3BB1E5] dark:focus:border-[#3BB1E5] focus:ring-2 focus:ring-[#3BB1E5]/20 outline-none transition-all duration-300 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      name="message"
                      rows={6}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-4 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-[#3BB1E5] to-[#2a8fbf] hover:from-[#2a8fbf] hover:to-[#3BB1E5] hover:scale-105 hover:shadow-xl transition-all duration-500 flex items-center justify-center gap-2 group ${
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
                        <>
                          Send Message
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
