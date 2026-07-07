'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LenisProvider } from "../../components/LenisProvider";
import bannerImg from "../../images/privacy_banner.jpg";

gsap.registerPlugin(ScrollTrigger);

const termsSections = [
  {
    id: "introduction",
    title: "Introduction",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    content: [
      "Effective Date: May 21, 2026",
      "Welcome to Lumer Labs. These Terms & Conditions govern your relationship with us, including your access to our website (www.lumerlabs.in) and the acquisition or use of any digital solutions, student project development, internship programs, and technical consulting services we provide.",
      "By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services."
    ]
  },
  {
    id: "definitions",
    title: "1. Definitions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    content: [
      "“Company,” “We,” “Us,” or “Our” refers to Lumer Labs.",
      "“User,” “Client,” “You,” or “Your” refers to any individual or entity accessing our platform or engaging our services.",
      "“Services” encompasses all digital solutions, project development, internships, branding, content creation, design work, and technical consultation provided by Lumer Labs."
    ]
  },
  {
    id: "services-offered",
    title: "2. Services Offered",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    content: [
      "Lumer Labs specializes in an array of technical and creative solutions, including but not limited to:",
      "Student Project Development & Technical Consultation: Supporting academic projects and delivering expert development guidance.",
      "Web Development & UI/UX Design: Designing and deploying premium websites, web apps, and modern interfaces.",
      "Digital Marketing, Branding, & Graphic Designing: Helping establish solid brand presence with creative assets.",
      "Content Creation, Video/Photography Shoots, & Editing: Crafting highly visual media materials.",
      "Internship Programs: Providing hands-on practical learning experiences for aspiring students and creators.",
      "Note: We reserve the right to modify, update, or discontinue any aspect of our services without prior notice."
    ]
  },
  {
    id: "user-responsibilities",
    title: "3. User Responsibilities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    content: [
      "By accessing our website or purchasing services, you agree:",
      "Accuracy Hold: To provide accurate, complete, and truthful information during inquiries.",
      "Content Protection: Not to exploit, copy, reproduce, or redistribute any website content without our express permission.",
      "Acceptable Use: Not to use our platform or deliverables for illegal, unauthorized, or harmful activities."
    ]
  },
  {
    id: "payments-pricing",
    title: "4. Payments & Pricing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    ),
    content: [
      "Custom Scoping: Service costs vary based on individual project scope, complexity, and resource requirements.",
      "Payment Terms: Payments must be fulfilled partially or fully as dictated by individual client milestones or service contracts.",
      "Suspension of Work: We reserve the right to halt project execution or delivery if agreed milestones and payments are delayed."
    ]
  },
  {
    id: "refund-policy",
    title: "5. Refund Policy",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    ),
    content: [
      "Advance Payments: Upfront deposits or advance payments made to initiate a project or reserve engineering bandwidth are generally non-refundable.",
      "Milestone Assessment: Eligibility for partial refunds depends strictly on the volume and stage of work completed.",
      "Completed Deliverables: Custom digital products, final source codes, completed video edits, and custom creative design assets are non-refundable once handed over.",
      "Management Discretion: All final refund decisions rest solely at the discretion of Lumer Labs management."
    ]
  },
  {
    id: "project-delivery-timelines",
    title: "6. Project Delivery & Timelines",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    content: [
      "Estimated Targets: Estimated delivery schedules are communicated to clients prior to project kickoff.",
      "Client Dependencies: Delays resulting from sluggish client feedback, missing content, or sudden scope revisions will extend delivery timelines accordingly.",
      "External Limitations: Lumer Labs is not liable for operational delays caused by third-party platforms, hosting outages, or technical network infrastructure failures beyond our direct control."
    ]
  },
  {
    id: "intellectual-property-rights",
    title: "7. Intellectual Property Rights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    content: [
      "Unless otherwise contractually outlined in a separate Statement of Work (SOW):",
      "Ownership Hold: All source code, original designs, media elements, graphics, and materials developed by Lumer Labs remain the intellectual property of Lumer Labs until full payment has been cleared by the client.",
      "Transfer of Rights: Full usage rights and approved ownership transfer to the client only after successful project completion and total payment settlement. Unauthorized reproduction or use of assets prior to final payment is prohibited."
    ]
  },
  {
    id: "limitation-of-liability",
    title: "8. Limitation of Liability",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    content: [
      "Liability Caps: To the maximum extent permitted by applicable law, Lumer Labs shall not be liable for any indirect, incidental, consequential, special, or punitive damages.",
      "Damage Types: This includes, without limitation, loss of data, business disruption, loss of profits, third-party network failures, or client misuse of the finalized assets.",
      "Service Basis: All services are rendered on a reasonable-effort, as-is basis."
    ]
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    content: [
      "Legal Framework: These Terms & Conditions are governed by, construed, and enforced in accordance with the laws of India.",
      "Jurisdiction: Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the competent courts of India."
    ]
  }
];

export default function TermsOfPolicyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeSection, setActiveSection] = useState(termsSections[0].id);

  useEffect(() => {
    // 1. Page transition curtain animation (slides up/out of the top)
    if (curtainRef.current) {
      gsap.fromTo(
        curtainRef.current,
        { yPercent: 0 },
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
        }
      );
    }

    // 2. Animate global Header into view since it starts hidden for Hero entrance
    gsap.to("header", {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
    });

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal transitions
      gsap.from('.reveal-up', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Parallax scroll effect for banner image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -30 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.parallax-container',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // Active section tracking via window scroll
      termsSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActiveSection(section.id);
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Scrolls via window with offset for sticky navbar
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <LenisProvider>
      <div ref={containerRef} className="relative min-h-screen bg-[#070708] text-[#F5F5F7] antialiased">
        {/* Navigation Header */}
        <Header />

        <main className="w-full pt-32 pb-24 relative z-10">
          
          {/* Banner Section */}
          <div className="max-w-[95vw] lg:max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="parallax-container relative w-full h-[35vh] md:h-[45vh] rounded-[2.5rem] overflow-hidden mb-16 reveal-up shadow-2xl flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#111117] to-[#070708] border border-[#1c1c1e]/40">
              <img
                ref={imageRef}
                src={bannerImg.src}
                alt="Terms & Conditions Banner"
                className="absolute top-0 left-0 w-full h-[130%] object-cover object-[50%_30%] origin-center pointer-events-none z-0"
              />
              <div className="absolute inset-0 bg-black/50 z-[1]" />
              <div className="relative z-[2] px-4">
                <h1 className="font-primary text-4xl md:text-6xl font-bold tracking-normal text-white drop-shadow-2xl mb-4 uppercase">
                  Terms & Conditions
                </h1>
                <p className="text-gray-300 text-sm md:text-base font-light max-w-2xl mx-auto">
                  Rules, Guidelines, and Agreements for Using Our Services
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">

            {/* Mobile Floating Progress/Nav Indicator */}
            <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
              {termsSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleScrollTo(e, section.id)}
                  className="group flex items-center justify-end py-1"
                  aria-label={section.title}
                >
                  <span 
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'w-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
                        : 'w-6 bg-white/20 group-hover:bg-white/50 group-hover:w-8'
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Left Sidebar — sticky via CSS, hidden on mobile */}
            <div className="hidden lg:block lg:w-1/4 shrink-0 self-start sticky top-[120px] reveal-up">
              <div className="bg-[#0b0b0d]/50 backdrop-blur-md rounded-2xl p-6 border border-[#1c1c1e]/50">
                <h3 className="font-primary text-sm font-bold uppercase tracking-widest mb-6 text-white">Table of Contents</h3>
                <ul className="flex flex-col gap-4">
                  {termsSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleScrollTo(e, section.id)}
                        className={`flex items-center gap-3 text-xs uppercase tracking-wider transition-all duration-300 ${
                          activeSection === section.id
                            ? 'text-white font-semibold translate-x-1'
                            : 'text-[#8E8E93] hover:text-white'
                        }`}
                      >
                        <span className={activeSection === section.id ? 'text-white' : 'text-[#8E8E93]'}>
                          {section.icon}
                        </span>
                        {section.title.replace(/^\d+\.\s*/, '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-3/4 pr-4 lg:pr-0 flex flex-col gap-20 pb-32">
              {termsSections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-36">
                  <h2 className="font-primary text-2xl md:text-3xl font-semibold mb-8 text-white tracking-tight border-b border-[#1c1c1e]/40 pb-4">
                    {section.title}
                  </h2>
                  <div className="flex flex-col gap-6 text-[#8E8E93] leading-relaxed text-xs md:text-sm font-light font-sans">
                    {section.content.map((paragraph, idx) => {
                      const isSubheading = /^(?:\d+\.\d+)/.test(paragraph);
                      if (isSubheading) {
                        return (
                          <h3 key={idx} className="text-sm md:text-base font-semibold text-white mt-4 mb-2 tracking-tight">
                            {paragraph}
                          </h3>
                        );
                      }

                      const colonIndex = paragraph.indexOf(':');
                      if (colonIndex > 0 && colonIndex < 70 && !paragraph.startsWith('http')) {
                        const prefix = paragraph.substring(0, colonIndex + 1);
                        const rest = paragraph.substring(colonIndex + 1);
                        return (
                          <p key={idx} className="pl-4 border-l border-white/20 hover:border-white/50 transition-colors">
                            <strong className="text-white font-medium font-sans">{prefix}</strong>{rest}
                          </p>
                        );
                      }

                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Global Page Footer */}
        <Footer />

        {/* Local Transition Curtain */}
        <div
          ref={curtainRef}
          id="page-transition-curtain"
          className="fixed inset-0 w-full h-full bg-[#070708] z-[99999] pointer-events-none transform translate-y-0"
        />
      </div>
    </LenisProvider>
  );
}
