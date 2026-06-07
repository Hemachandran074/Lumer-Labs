import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ContactButton from './ContactButton';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Parallax effect for the background inside the card
      gsap.to(parallaxRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          refreshPriority: 1,
        },
      });

      // Reveal animation for text and button
      gsap.from('.services-banner-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          refreshPriority: 1,
        },
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full px-4 sm:px-8 py-24 flex items-center justify-center section-stars-bg"
    >
      <div 
        className="relative w-full max-w-[95vw] lg:max-w-8xl h-[50vh] lg:h-[65vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center group isolate bg-black"
      >
        {/* Background Image with parallax */}
        <div 
          ref={parallaxRef}
          className="absolute -top-[10%] left-0 w-full h-[120%] z-[-1] pointer-events-none opacity-100"
          style={{
            backgroundImage: "url('/pricing-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center gap-6 pointer-events-auto max-w-3xl">
          <h2 className="services-banner-reveal text-white font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
            Our Services
          </h2>
          <p className="services-banner-reveal text-gray-200 text-base sm:text-lg md:text-xl font-light">
            Clear, transparent, and strategic services tailored to your brand's growth
          </p>
          <div className="services-banner-reveal">
            <ContactButton href="/services" label="View Services" />
          </div>
        </div>
      </div>
    </section>
  );
}
