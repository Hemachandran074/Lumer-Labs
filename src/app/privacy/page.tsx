'use client';

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LenisProvider } from "../../components/LenisProvider";
import { YelpFreeIcons } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

const privacySections = [
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
      "Lumer Labs (“we,” “us,” or “our”) provides digital solutions, student project development, internship programs, and technical consulting. Central to our mission is a commitment to transparency regarding the information we collect, how it is used, and with whom it is shared.",
      "This Privacy Policy applies when you visit our website (www.lumerlabs.in), communicate with us via WhatsApp or email, or utilize any of our related services. By accessing or using our services, you agree to the terms outlined in this policy."
    ]
  },
  {
    id: "data-we-collect",
    title: "1. Data We Collect",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    content: [
      "1.1 Data You Provide To Us",
      "We collect information that you explicitly provide when interacting with our platform, submitting inquiries, or initiating a project.",
      "Contact & Project Details: When you fill out contact or inquiry forms, we collect your full name, email address, phone number, college/organization name, and your specific project requirements.",
      "Communications: We collect and store information when you reach out via WhatsApp, email, social media, or submit customer support requests.",
      "Payment Information: Currently not required/applicable. If billing or payment features are integrated in the future, payment data will be handled securely via trusted payment gateways.",
      "1.2 Technical & Usage Data",
      "When you visit or navigate our website, we log technical data to analyze trends and manage the site.",
      "Log Data: This includes your Internet Protocol (IP) address, browser type, device type, operating system, and the dates/times of your visits.",
      "Website Behavior: We track pages visited, features utilized, and overall website usage statistics."
    ]
  },
  {
    id: "how-we-collect-data",
    title: "2. How We Collect Data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
    content: [
      "We collect information through the following avenues:",
      "Direct Input: Information voluntarily submitted by you via our website forms.",
      "Direct Communication: Conversations and requirements shared over WhatsApp, email, or official social media channels.",
      "Automated Technologies: Technical data gathered via built-in cookies and analytics tracking tools when you interact with our platform."
    ]
  },
  {
    id: "how-we-use-your-data",
    title: "3. How We Use Your Data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.5 1z"></path>
      </svg>
    ),
    content: [
      "We utilize the collected information to support, personalize, and improve our services. Specifically, your data is used to:",
      "Deliver Services: Fulfill project requirements, coordinate student projects, and administer training or internship programs.",
      "Communicate: Respond to inquiries, address support requests, and send updates, offers, or essential notifications.",
      "Improve Platform Performance: Analyze user behavior to optimize website layout, speed, and user experience.",
      "Maintain Security: Monitor and prevent fraudulent activity, website misuse, or unauthorized access."
    ]
  },
  {
    id: "cookies-and-tracking",
    title: "4. Cookies and Tracking Technologies",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"></path>
        <path d="M8.5 8.5v.01"></path>
        <path d="M16 15.5v.01"></path>
        <path d="M12 12v.01"></path>
        <path d="M11 16v.01"></path>
        <path d="M6 13v.01"></path>
      </svg>
    ),
    content: [
      "We use cookies and similar tracking technologies (such as Google Analytics) to recognize you, improve website functionality, and remember your preferences.",
      "Your Choice: You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can typically modify your browser settings to decline them if you prefer. Disabling cookies may prevent you from taking full advantage of the website."
    ]
  },
  {
    id: "how-we-share-information",
    title: "5. How We Share Information",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
    ),
    content: [
      "Lumer Labs does not sell, rent, or lease your personal information to third-party advertisers.",
      "We only share limited data under the following circumstances:",
      "With Trusted Service Providers: We partner with trusted third-party services—such as Google Analytics, cloud storage services, and email marketing platforms—to help facilitate our business operations. These providers process data according to their own privacy frameworks.",
      "Future Financial Processors: If integrated in the future, data may be shared with secure payment gateways strictly for transaction processing.",
      "Legal Requirements: We may disclose your information if required to do so by Indian law or in response to valid legal requests by public authorities."
    ]
  },
  {
    id: "data-protection-security",
    title: "6. Data Protection & Security",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    content: [
      "We implement reasonable administrative, technical, and physical security standards designed to safeguard your data against loss, theft, unauthorized disclosure, or misuse. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
    ]
  },
  {
    id: "your-rights-and-choices",
    title: "7. Your Rights and Choices",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
      </svg>
    ),
    content: [
      "We believe you should have control over your data. Depending on your engagement, you hold the following rights:",
      "Access & Correction: You can request access to the personal data we hold about you or request corrections to inaccurate information.",
      "Deletion: You can request that we delete your personal records from our active databases.",
      "Communication Preferences: You can opt-out of receiving promotional emails or marketing messages at any time.",
      "To exercise any of these choices, please submit a request to our official contact email listed below."
    ]
  },
  {
    id: "other-important-information",
    title: "8. Other Important Information",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    content: [
      "Children's Privacy",
      "Our services are directed toward students, professionals, and organizations. They are not intended for children under the age of 13 without verifiable parental or guardian consent.",
      "Changes to this Policy",
      "We reserve the right to modify this Privacy Policy at any time. Any changes will become effective immediately upon posting the revised policy. The \"Effective Date\" at the top will reflect the date of the most recent adjustment."
    ]
  }
];

import bannerImg from "../../images/privacy_banner.jpg"

export default function PrivacyPolicyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeSection, setActiveSection] = useState(privacySections[0].id);

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
        )
      }
      // Active section tracking via window scroll
      privacySections.forEach((section) => {
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
          
          {/* Banner Section - No Background Image */}
          <div className="max-w-[95vw] lg:max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="parallax-container relative w-full h-[35vh] md:h-[45vh] rounded-[2.5rem] overflow-hidden mb-16 reveal-up shadow-2xl flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#111117] to-[#070708] border border-[#1c1c1e]/40">
              <img
                ref={imageRef}
                src={bannerImg.src}
                alt="Privacy Banner"
                className="absolute top-0 left-0 w-full h-[130%] object-cover object-[50%_30%] origin-center pointer-events-none z-0"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="relative z-[2] px-4">
                <h1 className="font-primary text-4xl md:text-6xl font-bold tracking-normal text-white drop-shadow-2xl mb-4 uppercase">
                  Privacy Policy
                </h1>
                <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto">
                  How We Collect, Use, and Protect Your Information
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10">

            {/* Mobile Floating Progress/Nav Indicator */}
            <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
              {privacySections.map((section) => (
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
                  {privacySections.map((section) => (
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
              {privacySections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-36">
                  <h2 className="font-primary text-2xl md:text-3xl font-semibold mb-8 text-white tracking-tight border-b border-[#1c1c1e]/40 pb-4">
                    {section.title}
                  </h2>
                  <div className="flex flex-col gap-6 text-[#8E8E93] leading-relaxed text-xs md:text-sm font-light font-sans">
                    {section.content.map((paragraph, idx) => {
                      const isSubheading = /^(?:\d+\.\d+|Children's Privacy|Changes to this Policy)/.test(paragraph);
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
