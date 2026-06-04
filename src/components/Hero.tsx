import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the text in
      gsap.from([subtitleRef.current, titleRef.current], {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Subtle parallax on the stars
      gsap.to(starsRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home"
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-stars-bg"
    >

      
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05)_0%,rgba(2,6,23,0)_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <p 
          ref={subtitleRef}
          className="text-[#6366f1] font-medium tracking-wide mb-6 text-sm sm:text-base md:text-lg"
        >
          An AI-Powered Creative Studio
        </p>
        
        <h1 
          ref={titleRef}
          className="text-white font-medium text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight"
        >
          Building the Future with<br/>
          <span className="font-semibold">AI and Strategy</span>
        </h1>
      </div>
    </section>
  );
}
