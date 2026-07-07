'use client';

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { LenisProvider } from "../../components/LenisProvider";
import { ContactSlide } from "../../components/ContactSlide";
import { CustomizeService } from "../../components/CustomizeService";
import { HoverRevealText } from "../../components/HoverRevealText";

// Image Imports
import plan1Img from "../../images/graphic_designing.png";
import plan2Img from "../../images/web_development.jpg";
import plan3Img from "../../images/branding.jpg";
import plan4Img from "../../images/seo.jpg"
import plan5Img from "../../images/social_media.jpeg"
import plan6Img from "../../images/ai_automation.png"

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    title: "AI Business Automation",
    image: plan6Img,
    description: "Reduce manual work and improve efficiency with intelligent automation solutions.We connect your tools,automate repetitive tasks,and create workflows that help your business operate more efficiently.",
    services: [
      "Workflow Automation Systems",
      "CRM Automation",
      "Customer Onboarding Automation",
      "API Integrations",
      "Data Processing Automation",
      "WhatsApp & CRM Automation",
      "Business Process Automation",
      "Automated Reporting & Notification Systems",
    ],
    price: "₹70,000"
  },
  {
    title: "App Development",
    image: plan2Img,
    description: "Develop powerful mobile applications that deliver a smooth user experience across devices.We create scalable apps designed to improve customer engagement, streamline operations, and support business growth.",
    services: [
      "Android App Development",
      "Cross-Platform Mobile Apps",
      "Custom Mobile UI Design",
      "Secure User Authentication",
      "Real-Time Data Synchronization",
      "Push Notifications",
      "Offline Functionality",
      "App Store & Play Store Deployment",
    ],
    price: "₹30,000"
  },
  {
    title: "Brand Identity Design",
    image: plan3Img,
    description: "Build a brand that looks professional,memorable,and consistent across every customer touchpoint.From logo creation to complete brand guidelines,we design visual identities that help your business stand out and build trust.",
    services: [
      "Brand Identity Design",
      "Custom Logo Design",
      "Brand Guidelines",
      "Marketing Materials",
      "Business Stationery",
      "Presentation Design",
      "Custom Illustrations",
      "Print & Digital Assets",
    ],
    price: "₹24,999"
  },
  {
    title: "Graphic Designing",
    image: plan1Img,
    description: "Create stunning visual assets that command attention and communicate your brand's message effectively. From brand guidelines to modern marketing collateral, we shape cohesive visual experiences across all touchpoints.",
    services: [
      "Brand Identity Design",
      "Custom Logo Systems",
      "Social Media Graphics",
      "Marketing Collateral",
      "Packaging Design",
      "Presentation Layouts",
      "Vector Illustrations",
      "Print Media Assets"
    ],
    price: "₹1,800/design"
  },
  {
    title: "SEO and Growth",
    image: plan4Img,
    description: "Help more customers discover your business online through proven search optimization strategies.We improve your visibility, attract qualified traffic,and support sustainable growth.",
    services: [
      "Search Engine Optimization (SEO),",
      "Local SEO",
      "Google Business Profile Optimization",
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Performance Monitoring",
      "Review Generation Strategies",
    ],
    price: "₹9,999/month"
  },
  {
    title: "Video and Media",
    image: plan5Img,
    description: "Through still images or moving media, you can tell your story visually about your business. From the first frame through the edited video, we create an illustrative picture of your company's vision and highlight the best possible image of you and/or your business on film.",
    services: [
      "Brand Core Strategy",
      "Visual Brand Audit",
      "Custom Typography Suite",
      "Harmonious HSL Palettes",
      "Brand Style Guidelines",
      "Copywriting & Voice Setup",
      "Collateral Design Patterns",
      "Brand Consulting Services"
    ],
    price: "₹6000/hr"
  },
  {
    title: "Web Development",
    image: plan2Img,
    description: "Build fast,secure,and scalable websites tailored to your business needs.Whether you're launching a company website, customer portal,or e-commerce platform,we develop solutions that perform reliably and support long-term growth.",
    services: [
      "Custom Website Development",
      "Full-Stack Web Applications",
      "B2B & B2C E-Commerce Platforms",
      "Next.js Development",
      "Database Integration",
      "API Development & Integration",
      "Payment Gateway Integration",
      "Website Performance Optimization",
    ],
    price: "₹15,000"
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

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

    // 3. Staggered reveal for services/pricing plans on scroll
    const planRows = containerRef.current?.querySelectorAll(".pricing-plan-row");
    if (planRows) {
      planRows.forEach((row) => {
        const details = row.querySelector(".plan-details");
        const imgBlock = row.querySelector(".plan-image-container");

        gsap.fromTo(
          [details, imgBlock],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-black text-[#F5F5F7] antialiased">
        {/* Navigation Header */}
        <Header />

        <main ref={containerRef} className="w-full relative z-10">
          <div className="max-w-6xl mx-auto w-full px-8 md:px-16 pt-32 pb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

            {/* Left Column: Sticky section title */}
            <div className="md:col-span-3">
              <div
                ref={titleRef}
                className="sticky top-28 text-left select-none"
              >
                <h1 className="text-2xl md:text-3xl font-primary font-bold text-white leading-tight uppercase tracking-tight">
                  Our Services
                </h1>
              </div>
            </div>

            {/* Right Column: List of Pricing Plans */}
            <div className="md:col-span-9 flex flex-col gap-24 md:gap-32">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="pricing-plan-row grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative pb-16 border-b border-[#1c1c1e]/40 last:border-none"
                >
                  {/* Left part: Plan details */}
                  <div className="plan-details lg:col-span-8 flex flex-col gap-6 text-left opacity-0">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-primary font-semibold text-white tracking-tight leading-none">
                      {plan.title}
                    </h2>

                    <p className="text-white/70 font-sans font-light leading-relaxed text-xs md:text-sm max-w-xl">
                      {plan.description}
                    </p>

                    {/* Bullet lists in 2-column format */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-mono text-[10px] md:text-[11px] tracking-widest text-[#8E8E93] uppercase font-light mt-2">
                      {plan.services.map((service, sIndex) => (
                        <div key={sIndex} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing footer row */}
                    <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#1c1c1e]/30">
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] uppercase tracking-widest text-[#8E8E93] font-mono mb-1 font-medium">
                          Starts From
                        </span>
                        <span className="text-xl md:text-2xl font-primary font-semi-bold text-white tracking-tight">
                          {plan.price}
                        </span>
                      </div>

                      <button
                        onClick={() => setIsContactOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#1c1c1e] hover:border-white/50 hover:bg-[#121214]/50 text-xs font-sans uppercase tracking-widest text-[#8E8E93] hover:text-white transition-all duration-300 transform active:scale-95 cursor-pointer"
                      >
                        <HoverRevealText
                            text="Start the Project"
                            className="tracking-wide"
                          />
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right part: Sticky image block */}
                  <div className="plan-image-container lg:col-span-4 sticky top-28 self-start aspect-[4/5] rounded-[16px] overflow-hidden bg-[#070708] opacity-0 select-none pointer-events-none">
                    <img
                      src={plan.image.src}
                      alt={plan.title}
                      className="w-full h-full object-cover origin-center transition-transform duration-500 hover:scale-105"
                    />
                    {/* Shadow overlay vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Customize Service CTA Section */}
        <CustomizeService onContactClick={() => setIsContactOpen(true)} />

        {/* Global Page Footer */}
        <Footer />

        {/* Side Contact Slide Drawer overlay */}
        <ContactSlide isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

        {/* Transition Curtain */}
        <div
          ref={curtainRef}
          id="page-transition-curtain"
          className="fixed inset-0 w-full h-full bg-[#070708] z-[99999] pointer-events-none transform translate-y-0"
        />
      </div>
    </LenisProvider>
  );
}
