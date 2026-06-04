import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "Web Design", "Branding", "Graphic Designing", "Logo Design",
  "Video Editing", "VideoGraphy", "Digital Marketing"
];

const ContactView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Reveal animations for text elements
      gsap.from('.reveal-up', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Parallax effect for the hero banner background
      gsap.to('.contact-parallax', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div ref={containerRef} className="section-stars-bg min-h-screen text-white pt-32 pb-24">
      
      {/* Banner Section Container - adjust max-w-[...] here to change width */}
      <div className="max-w-[95vw] lg:max-w-[1400px] mx-auto px-4 md:px-8 shrink-0">
        {/* Height classes (e.g., h-[45vh]) control banner height */}
        <div className="parallax-container relative w-full h-[45vh] md:h-[60vh] rounded-[2.5rem] overflow-hidden mb-24 reveal-up shadow-2xl isolate">
          <div 
            className="contact-parallax absolute -top-[10%] left-0 w-full h-[120%] z-[-1] pointer-events-none opacity-100"
            style={{
              backgroundImage: "url('/contact-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* subtle overlay to ensure text pops */}
          <div className="absolute inset-0 bg-black/20 z-[1]" />
          <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-[2]">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tight text-white drop-shadow-2xl">Contact</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 shrink-0">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="flex flex-col gap-16">
            <div className="reveal-up">
              <h2 className="text-4xl md:text-5xl font-semibold leading-[1.2] mb-6 tracking-tight">
                Have a project<br/>in Mind or<br/>Want to grow your<br/>Business ?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl">Let's Build Something Extraordinary !</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
              <div className="reveal-up relative">
                <h3 className="text-white font-semibold mb-4 text-xl tracking-wide">Call Us</h3>
                <p className="text-gray-400 text-sm mb-1">+91 90255 07436</p>
                <p className="text-gray-500 text-sm">Mon - Sat. 10AM - 7PM IST</p>
              </div>
              
              <div className="reveal-up relative">
                <h3 className="text-white font-semibold mb-4 text-xl tracking-wide">Our Location</h3>
                <p className="text-gray-400 text-sm mb-1 leading-relaxed">Coimbatore,<br/>Tamil Nadu. India</p>
                <p className="text-gray-500 text-sm mt-3">Available for remote collaboration</p>
              </div>

              <div className="reveal-up relative">
                <h3 className="text-white font-semibold mb-4 text-xl tracking-wide">Email</h3>
                <p className="text-gray-400 text-sm mb-1">lumerlabs@gmail.com</p>
                <p className="text-gray-500 text-sm mt-2">We respond within 24 hours</p>
              </div>

              <div className="reveal-up relative">
                <h3 className="text-white font-semibold mb-4 text-xl tracking-wide">Socials</h3>
                <div className="flex gap-5 items-center mt-2">
                  <a href="https://www.instagram.com/lumer_labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#!" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-gray-300 hover:text-white transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/lumerlabsglh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="reveal-up md:pl-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-16 tracking-tight">Get In Touch</h2>
            <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Name*" 
                  className="w-full bg-transparent text-white border-b border-gray-600 pb-3 placeholder:text-gray-300 text-lg focus:border-white focus:outline-none transition-colors" 
                  required 
                />
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email*" 
                  className="w-full bg-transparent text-white border-b border-gray-600 pb-3 placeholder:text-gray-300 text-lg focus:border-white focus:outline-none transition-colors" 
                  required 
                />
              </div>
              
              <div className="flex flex-col gap-5 mt-2">
                <label className="text-white text-lg font-medium tracking-wide">What's in Your Mind?*</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-5 py-2 rounded-[20px] text-xs transition-all duration-300 border cursor-pointer ${
                        selectedCategories.includes(cat) 
                          ? 'border-white text-black bg-white font-medium' 
                          : 'border-gray-600/80 text-gray-300 hover:border-white hover:text-white bg-transparent'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-6">
                <input 
                  type="text"
                  placeholder="Message*" 
                  className="w-full bg-transparent text-white border-b border-gray-600 pb-3 placeholder:text-gray-300 text-lg focus:border-white focus:outline-none transition-colors" 
                  required 
                />
              </div>

              <div className="flex justify-start mt-6">
                <button type="submit" className="px-8 py-3 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                  Submit
                </button>
              </div>

            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ContactView;