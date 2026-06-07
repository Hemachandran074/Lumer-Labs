import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ActiveTab = 'web' | 'social' | 'design' | 'video' | 'seo';

const ServicesView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('web');

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Reveal animations for header text
      gsap.from('.reveal-up', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Parallax effect for the hero banner background
      gsap.to('.services-parallax', {
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

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeTab]);

  return (
    <div ref={containerRef} className="section-stars-bg min-h-screen text-white pt-32 pb-24">
      {/* Banner Section Container */}
      {/* <div className="max-w-[95vw] lg:max-w-[1400px] mx-auto px-4 md:px-8 shrink-0">
        <div className="parallax-container relative w-full h-[35vh] md:h-[45vh] rounded-[2.5rem] overflow-hidden mb-16 reveal-up shadow-2xl isolate flex flex-col justify-center items-center text-center">
          <div 
            className="services-parallax absolute -top-[10%] left-0 w-full h-[120%] z-[-1] pointer-events-none opacity-100"
            style={{
              backgroundImage: "url('/pricing-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          /> */}
          {/* subtle overlay to ensure text pops */}
          {/* <div className="absolute inset-0 bg-black/40 z-[1]" />
          <div className="relative z-[2] px-4">
            <h1 className="text-4xl md:text-6xl font-medium tracking-normal text-white drop-shadow-2xl mb-4">
              Our Services
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto">
              Clear, transparent, and strategic services tailored to your brand's growth
            </p>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 shrink-0">
        {/* Sector Tabs Switcher */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center bg-white/5 border border-white/10 rounded-2xl sm:rounded-full p-1.5 backdrop-blur-md shadow-lg gap-1.5 sm:gap-0">
            {(
              [
                { id: 'web', label: 'Web Development' },
                { id: 'social', label: 'Social Media' },
                { id: 'design', label: 'Graphic Design' },
                { id: 'video', label: 'Videography' },
                { id: 'seo', label: 'SEO & Growth' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-gray-300 hover:text-white bg-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Content Containers with Glassmorphism */}
        <div className="w-full transition-all duration-500 ease-in-out">
          
          {/* 1. Web Development */}
          {activeTab === 'web' && (
            <div className="animate-slide-up flex flex-col gap-6">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">Web Development Services</h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl">
                  Our web solutions are engineered for performance, scalability, and seamless user experiences across all devices.
                </p>
              </div>

              <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/10 border-b border-white/10">
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Feature</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Launch Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Grow Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Scale Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Page Limit</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Up to 5 Pages</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Up to 10 Pages</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Up to 20 Pages</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Design</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Mobile Responsive</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Custom UI Design</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Custom Design System</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Functionality</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">WhatsApp & Maps</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Blog Setup</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Admin Dashboard</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Integration</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Contact Form</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Lead Capture</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">CRM & AI Chatbot</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">SEO & Performance</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Basic Setup</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Speed & SEO Opt.</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Advanced Performance</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Advanced Features</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">SSL Configuration</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Google Analytics</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Payment & Booking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. Social Media Management */}
          {activeTab === 'social' && (
            <div className="animate-slide-up flex flex-col gap-6">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">Social Media Management</h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl">
                  Strategic content creation and community engagement to elevate your brand's digital presence.
                </p>
              </div>

              <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/10 border-b border-white/10">
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Feature</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Launch Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Grow Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Scale Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Post Frequency</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">8 Posts / Month</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">16 Posts / Month</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">30 Posts / Month</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Stories & Reels</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">4 Story Designs</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">8 Stories, 4 Reels</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">15 Stories, 8 Reels</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Creative Services</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Caption & Graphics</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Content Calendar</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Content Strategy</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Analysis</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Monthly Report</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Competitor Analysis</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Advanced Analytics</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Support</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Hashtag Research</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Community Mgmt.</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Influencer Collab.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Graphic Design Solutions */}
          {activeTab === 'design' && (
            <div className="animate-slide-up flex flex-col gap-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">Graphic Design Solutions</h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl">
                  Premium visual identities and marketing collateral tailored to your brand's unique voice.
                </p>
              </div>

              {/* Stacked Sub-sectors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3.1 Brand Identity & Print */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white border-l-2 border-blue-500 pl-3">Brand Identity & Print</h3>
                  <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/10">
                          <th className="p-4 text-sm font-semibold text-white">Service</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Logo Design',
                          'Logo Redesign / Rebranding',
                          'Brand Identity Kit',
                          'Business Card Design',
                          'Company Profile Design',
                        ].map((name, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                            <td className="p-4 text-sm text-slate-300">{name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3.2 Digital & Social Assets */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white border-l-2 border-blue-500 pl-3">Digital & Social Assets</h3>
                  <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/10">
                          <th className="p-4 text-sm font-semibold text-white">Service</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Instagram Post Design',
                          'Carousel Post Design',
                          'Story Design',
                          'Ad Creative Design',
                          'Festival Creative Design',
                        ].map((name, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                            <td className="p-4 text-sm text-slate-300">{name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3.3 Marketing Collateral */}
                <div className="flex flex-col gap-4 lg:col-span-2">
                  <h3 className="text-xl font-semibold text-white border-l-2 border-blue-500 pl-3">Marketing Collateral</h3>
                  <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/10">
                          <th className="p-4 text-sm font-semibold text-white">Service</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Poster & Flyer Design',
                          'Brochure (Bi-Fold)',
                          'Brochure (Tri-Fold)',
                          'Banner & Standee Design',
                          'Presentation / Pitch Deck',
                        ].map((name, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                            <td className="p-4 text-sm text-slate-300">{name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Videography */}
          {activeTab === 'video' && (
            <div className="animate-slide-up flex flex-col gap-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">Videography</h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl">
                  Capturing the essence of your business through high-definition visual storytelling.
                </p>
              </div>

              {/* Stacked Sub-sectors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 4.1 Photography Services */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white border-l-2 border-blue-500 pl-3">Photography Services</h3>
                  <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/10">
                          <th className="p-4 text-sm font-semibold text-white">Photography Services</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Product Photography',
                        ].map((name, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                            <td className="p-4 text-sm text-slate-300">{name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4.2 Video Production */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white border-l-2 border-blue-500 pl-3">Video Production</h3>
                  <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/10">
                          <th className="p-4 text-sm font-semibold text-white">Video Production</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Promotional Video (30–60s)',
                          'Brand Story Video',
                          'YouTube Shorts (4 Video Pkg)',
                          'Professional Ad Shoot',
                        ].map((name, i) => (
                          <tr key={i} className="hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors">
                            <td className="p-4 text-sm text-slate-300">{name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. SEO & Digital Growth */}
          {activeTab === 'seo' && (
            <div className="animate-slide-up flex flex-col gap-6">
              <div className="mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">SEO & Digital Growth</h2>
                <p className="text-gray-300 text-sm sm:text-base max-w-3xl">
                  Driving organic traffic and improving search visibility through data-backed strategies.
                </p>
              </div>

              <div className="overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-white/10 border-b border-white/10">
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Service Scope</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Launch Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Grow Plan</th>
                      <th className="p-4 sm:p-5 text-sm sm:text-base font-semibold text-white">Scale Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Core Technicals</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Website Audit</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Technical SEO</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Advanced Strategy</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Optimization</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">On-Page SEO</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Content Opt.</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Conversion Opt.</td>
                    </tr>
                    <tr className="hover:bg-white/5 border-b border-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Growth</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Keyword Research</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Local SEO</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Authority Building</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 sm:p-5 text-sm font-semibold text-white">Reporting</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Monthly Report</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">4 Blog Optimizations</td>
                      <td className="p-4 sm:p-5 text-sm text-slate-300">Weekly Reporting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ServicesView;
