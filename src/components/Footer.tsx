import { useRef } from 'react';

export default function Footer() {
  return (
    <footer className="relative w-full py-20 px-6 sm:px-12 overflow-hidden border-t border-white/5">


      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-sm">
          {/* <div className="flex items-center gap-3">
            <img src="/lumer_labs_logo_svg.svg" alt="LumerLabs Logo" className="w-10 h-10" />
            <span className="text-white font-semibold text-2xl tracking-tight">LumerLabs</span>
          </div> */}
          <p className="text-slate-400 text-sm leading-relaxed">
            Pioneering the intersection of artificial intelligence and strategic creativity to build the future of digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium text-sm">Navigation</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="/" className="text-slate-500 hover:text-white text-sm transition-colors">Home</a></li>
              <li><a href="/#services" className="text-slate-500 hover:text-white text-sm transition-colors">Services</a></li>
              <li><a href="/#methods" className="text-slate-500 hover:text-white text-sm transition-colors">Methods</a></li>
              <li><a href="/about" className="text-slate-500 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-slate-500 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-medium text-sm">Social</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lumerlabsglh/' },
                { label: 'X (Twitter)', url: '#' },
                { label: 'Instagram', url: 'https://www.instagram.com/lumer_labs/' }
              ].map(item => (
                <li key={item.label}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
            <h4 className="text-white font-medium text-sm">Legal</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Privacy Policy', url: '/privacy-policy' },
                { label: 'Terms of Service', url: '/terms' }
              ].map(item => (
                <li key={item.label}>
                  <a href={item.url} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Large Display Text */}
      <div className="relative z-10 w-full mt-16 overflow-hidden">
        <p
          className="text-white font-semi-bold leading-none tracking-[-0.03em] whitespace-nowrap text-center"
          style={{ fontSize: '16.5vw' }}
        >
          LumerLabs
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 text-[10px]">
        <p>© 2026 LUMER LABS. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}