import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Search Engine\nOptimization',
    icon: '/abstract_shapes/star.png'
  },
  {
    title: 'Graphic\nDesign',
    icon: '/abstract_shapes/plus.png'
  },
  {
    title: 'Web\nDevelopment',
    icon: '/abstract_shapes/spiral-ball.png'
  },
  {
    title: 'Social Media\nMarketing',
    icon: '/abstract_shapes/flower.png'
  },
  {
    title: 'Videography',
    icon: '/abstract_shapes/ball.png'
  },
  {
    title: 'Google\nAds',
    icon: '/abstract_shapes/3d-ball.png'
  },


];

const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      let track = trackRef.current;

      // Calculate how much we need to scroll horizontally
      // Add a little padding to the calculation so it doesn't abruptly end
      const getScrollAmount = () => {
        let trackWidth = track?.scrollWidth || 0;
        return -(trackWidth - window.innerWidth + 40);
      };

      const tween = gsap.fromTo(track,
        { x: 0 },
        {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1, // Smooth scrolling
            end: () => `+=${Math.abs(getScrollAmount())}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 3,
          }
        }
      );

      // Delay refresh slightly to ensure DOM is fully rendered
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="bg-transparent text-white pt-20 sm:pt-24 lg:pt-32 pb-10 lg:py-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 px-4 md:px-8 shrink-0">
        <div className="inline-block border border-blue-600 rounded-full px-4 py-1.5 sm:px-6 sm:py-2 mb-3 sm:mb-4">
          <span className="text-blue-500 font-medium text-xs sm:text-sm">Struggling to Build Your Brand ?</span>
        </div>

        <div className="w-px h-4 sm:h-6 bg-white/30 mb-3 sm:mb-4"></div>

        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">We Handle It</h2>

        <div className="w-px h-4 sm:h-6 bg-white/30 mb-3 sm:mb-4"></div>

        <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed px-2">
          We provide end-to-end digital solutions to elevate your online presence. From driving targeted traffic to building robust web platforms, our expert team manages the complexities of the digital landscape so you can focus on scaling your business.
        </p>
      </div>

      <div className="mt-4 sm:mt-6 lg:mt-16 w-full flex-grow-0 lg:flex-grow flex items-start lg:items-center mb-6 lg:mb-16 overflow-hidden">
        <div ref={trackRef} className="flex gap-4 sm:gap-6 px-6 sm:px-10 md:px-20 w-max items-center">
          {services.map((service, idx) => (
            <div key={idx} className="w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] lg:w-[300px] lg:h-[200px] shrink-0 group">
              <BorderGlow
                className="w-full h-full"
                edgeSensitivity={30}
                glowColor="240 60 70"
                backgroundColor="#0a0a0f"
                borderRadius={20}
                glowRadius={60}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#3b82f6', '#6366f1', '#60a5fa']}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[20px]">
                  <h3 className="absolute top-4 left-4 sm:top-6 sm:left-6 text-sm sm:text-base lg:text-xl font-semibold text-white/90 whitespace-pre-line leading-tight z-10">
                    {service.title}
                  </h3>
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="absolute -bottom-6 -right-6 w-28 h-28 sm:-bottom-8 sm:-right-8 sm:w-36 sm:h-36 lg:w-42 lg:h-42 object-contain opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  />
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
