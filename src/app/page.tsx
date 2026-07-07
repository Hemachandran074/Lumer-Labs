import { LenisProvider } from "@/components/LenisProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#070708] text-[#F5F5F7] antialiased">
        <Preloader />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Contact />
          <Showcase />
          <Footer />
        </main>
        
        {/* Full-screen transition curtain */}
        <div
          id="page-transition-curtain"
          className="fixed inset-0 w-full h-full bg-[#070708] z-[99999] pointer-events-none transform translate-y-full"
        />
      </div>
    </LenisProvider>
  );
}
