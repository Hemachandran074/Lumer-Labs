'use client';

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu09Icon } from "@hugeicons/core-free-icons";
import { MenuSlide } from "./MenuSlide";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-8 md:px-16 mix-blend-difference ${
          scrolled ? "py-4" : ""
        }`}
        style={{ opacity: 0, transform: "translateY(-20px)", pointerEvents: "none" }}
      >
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="text-sm font-primary font-semibold text-[#F5F5F7] hover:text-white transition-colors duration-300 pointer-events-auto"
            id="header-logo"
          >
            LumerLabs
          </a>

          {/* Menu Icon Trigger Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[#F5F5F7] hover:text-white transition-colors cursor-pointer p-2 -m-2 pointer-events-auto focus:outline-none bg-transparent border-none"
            aria-label="Open menu"
          >
            <HugeiconsIcon icon={Menu09Icon} className="w-6 h-6 pointer-events-none" />
          </button>
        </div>
      </header>

      {/* Slide-out Menu Navigation Drawer */}
      <MenuSlide isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
