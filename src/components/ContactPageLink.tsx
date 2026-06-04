import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ContactButton from './ContactButton';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPageLink() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background inside the card
      gsap.to('.about-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          refreshPriority: 1,
        },
      });

      // Reveal animation for text and button
      gsap.from('.reveal-elem', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
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
      id="contact" 
      ref={containerRef} 
      className="relative w-full px-4 sm:px-8 py-24 min-h-[90vh] flex items-center justify-center section-stars-bg"
    >
      <div 
        ref={cardRef}
        className="relative w-full max-w-[95vw] lg:max-w-8xl h-[70vh] lg:h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center group isolate bg-black"
      >
        {/* Background Image with parallax class */}
        <div 
          className="about-bg absolute -top-[10%] left-0 w-full h-[120%] z-[-1] pointer-events-none opacity-70"
          style={{
            backgroundImage: `url('/about_us_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none transition-colors duration-500" />

        {/* Content */}
        <div className="relative z-[2] flex flex-col items-center gap-6 pointer-events-auto">
          <h2 
            className="reveal-elem text-white font-semi-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-4xl"
          >
            Let's Build Something<br/>
            Extraordinary
          </h2>
          <div className="reveal-elem">
            <ContactButton href="/contact" label="Contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
