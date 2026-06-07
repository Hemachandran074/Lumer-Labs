import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Simple entrance animation for the navbar and logo
    gsap.from([logoRef.current, navRef.current], {
      y: -20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
      stagger: 0.1,
    });

    // Close dropdown on click outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] pointer-events-none">
      {/* Logo at Top Left */}
      <div 
        ref={logoRef} 
        className="absolute lg:fixed left-6 sm:left-12 lg:left-12 top-10 flex items-center gap-3 pointer-events-auto z-[995]"
      >
        <img src="/lumer_labs_logo_svg.svg" alt="LumerLabs Logo" className="w-10 h-10 lg:w-12 lg:h-12" />
        <span className="text-white font-semibold text-xl lg:text-2xl tracking-tight">LumerLabs</span>
      </div>

      {/* Mobile Menu Button - aligned to the right, matching logo height */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-lg text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer pointer-events-auto z-[1000] lg:hidden absolute right-6 top-10"
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        )}
      </button>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[997] transition-opacity duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-[280px] bg-[#0c101d]/95 backdrop-blur-2xl border-l border-white/10 z-[998] p-8 pt-32 flex flex-col gap-6 transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
      >
        {/* Navigation Links */}
        {[
          { label: 'Home', href: '/#home' },
          { label: 'Services', href: '/#services' },
          { label: 'Methods', href: '/#methods' },
          // { label: 'About Us', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-lg font-medium text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {label}
          </a>
        ))}

        <div className="w-full h-px bg-white/10 my-4" />

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Connect</span>
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lumerlabsglh/' },
            { label: 'X (Twitter)', href: 'https://x.com/lumerlabs' },
            { label: 'Instagram', href: 'https://www.instagram.com/lumer_labs/' }
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-white transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto relative h-32 px-6 sm:px-12 pointer-events-none">
        {/* Centered Navigation Links in Glass Pill (Hidden on Mobile) */}
        <div className="hidden lg:flex justify-center pt-10 pointer-events-none">
          <nav 
            ref={navRef}
            className="flex items-center justify-center px-8 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl pointer-events-auto z-[1000]"
          >
            <div className="flex items-center gap-8">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'Services', href: '/#services' },
                { label: 'Methods', href: '/#methods' },
                // { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}

              {/* More Links Click Dropdown */}
              <div ref={dropdownRef} className="relative py-2">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>More Links</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="12" height="12" 
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Glassmorphic Dropdown Menu */}
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#090b11]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 transition-all duration-300 origin-top z-[9999] ${
                    isOpen 
                      ? 'opacity-100 scale-100 pointer-events-auto' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {[
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lumerlabsglh/' },
                    { label: 'X (Twitter)', href: 'https://x.com/lumerlabs' },
                    { label: 'Instagram', href: 'https://www.instagram.com/lumer_labs/' }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
