import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const values = [
  {
    number: '01',
    title: 'Innovation First',
    description:
      'We leverage cutting-edge AI and emerging technologies to solve complex creative challenges.',
    align: 'left',
  },
  {
    number: '02',
    title: 'Design Excellence',
    description:
      'Every pixel is intentional. We craft interfaces that are both beautiful and functionally superior.',
    align: 'right',
  },
  {
    number: '03',
    title: 'Strategic Impact',
    description:
      "Our work isn't just aesthetic — it drives measurable business outcomes and digital transformation.",
    align: 'left',
  },
];

export default function AboutUsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      });
      gsap.from(introRef.current, {
        y: 30, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out',
      });
      gsap.from('.value-card', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full flex flex-col items-center justify-start px-6 sm:px-12 pt-40 pb-32 overflow-hidden section-stars-bg"
    >
      {/* Background Mask */}
      <div className="absolute inset-0 z-0" />

      {/* ─── About Us ─── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <h1
          ref={titleRef}
          className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-8 sm:mb-12"
        >
          About Us
        </h1>

        <p
          ref={introRef}
          className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-12 sm:mb-20"
        >
          <span className="text-white font-semibold">LumerLabs</span> is a collective of designers,
          engineers, and strategists who bridge the gap between artificial intelligence and human
          creativity.
          <br /><br />
          Every project we undertake pushes the boundaries of what digital experiences can be.
        </p>

        {/* Value cards */}
        <div ref={cardsRef} className="w-full flex flex-col gap-8 sm:gap-10">
          {values.map((v) => (
            <div
              key={v.number}
              className={`value-card flex flex-col sm:flex-row items-start gap-4 sm:gap-6 ${v.align === 'right' ? 'sm:flex-row-reverse sm:ml-auto' : ''
                } max-w-lg ${v.align === 'right' ? 'self-end' : 'self-start'}`}
            >
              <span
                className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-bold leading-none tracking-tighter select-none"
                style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255, 255, 255, 1)' }}
              >
                {v.number}
              </span>
              <div className={`flex flex-col gap-1.5 sm:gap-2 ${v.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                <h3 className="text-white font-semibold text-lg sm:text-xl lg:text-2xl">{v.title}</h3>
                <p className="text-slate-400 text-sm sm:text-sm lg:text-base leading-relaxed max-w-sm">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
