'use client';

import React, { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, InstagramIcon, NewTwitterIcon, Linkedin02Icon } from "@hugeicons/core-free-icons";
import { HoverRevealText } from "./HoverRevealText";

interface ContactSlideProps {
  isOpen: boolean;
  onClose: () => void;
}

const mindCategories = [
  "Web Design",
  "Branding",
  "Graphic Designing",
  "Logo Design",
  "Video Editing",
  "VideoGraphy",
  "Digital Marketing",
  "Custom",
];

export function ContactSlide({ isOpen, onClose }: ContactSlideProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle ESC key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", { ...formData, categories: selectedCategories });
    alert("Thank you! Let's talk soon.");
    onClose();
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSelectedCategories([]);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-end transition-visibility duration-500 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Semi-transparent backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Content Panel */}
      <div
        className={`relative w-full sm:w-[480px] h-screen bg-[#000000] border-l border-[#1c1c1e] text-[#F5F5F7] px-8 md:px-10 py-10 flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Row */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-3xl font-semibold font-primary text-white tracking-tight">
            Let's Talk !
          </h3>
          {/* Borderless and fully clickable close button containing X */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -m-2 rounded-full text-[#8E8E93] hover:text-white transition-colors duration-300 cursor-pointer focus:outline-none bg-transparent border-none"
          >
            <X className="w-6 h-6 pointer-events-none" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 flex-grow">
          {/* Name Input */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="slide-name" className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
              Name*
            </label>
            <input
              type="text"
              id="slide-name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#1c1c1e] py-2 text-white font-sans text-sm focus:border-white outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="slide-email" className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
              Email*
            </label>
            <input
              type="email"
              id="slide-email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#1c1c1e] py-2 text-white font-sans text-sm focus:border-white outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Phone input */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="slide-phone" className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
              Phone No*
            </label>
            <input
              type="tel"
              id="slide-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#1c1c1e] py-2 text-white font-sans text-sm focus:border-white outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Tags: What's in Your Mind */}
          <div className="flex flex-col gap-3 text-left">
            <span className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
              What's in Your Mind?*
            </span>
            <div className="flex flex-wrap gap-2">
              {mindCategories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full border text-xs font-sans tracking-wide transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-white text-black border-white font-semibold"
                        : "border-[#1c1c1e] text-[#8E8E93] hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message input */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="slide-message" className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
              Message*
            </label>
            <input
              type="text"
              id="slide-message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-transparent border-b border-[#1c1c1e] py-2 text-white font-sans text-sm focus:border-white outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-sans font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
            <HoverRevealText
                text="Send Message"
                className="tracking-wide"
              />
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Socials & Contact Meta */}
        <div className="w-full border-t border-[#1c1c1e] pt-6 mt-8 flex flex-col gap-4 text-left">
          <h4 className="text-xs uppercase tracking-widest text-[#8E8E93] font-mono">
            Socials
          </h4>
          <div className="flex gap-6 text-sm font-sans tracking-wide">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#8E8E93] hover:text-white transition-colors duration-300"
            >
              <HugeiconsIcon icon={InstagramIcon} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#8E8E93] hover:text-white transition-colors duration-300"
            >
              <HugeiconsIcon icon={NewTwitterIcon} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#8E8E93] hover:text-white transition-colors duration-300"
            >
              <HugeiconsIcon icon={Linkedin02Icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
