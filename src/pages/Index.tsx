import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import BrandStamp from "@/components/BrandStamp";


const Index = () => {
  // Links from other pages (e.g. /new-to-ugc → /#portfolio) land on a section.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
  <>
    <Navbar />
    <HeroSection />
    <PortfolioSection />
    <ServicesSection />
    <AboutSection />
    {/* Wax-seal stamp straddling the About (cream) / Contact (oxblood) seam.
        Lives outside ContactSection because that section clips its overflow. */}
    <div className="relative">
      <BrandStamp />
      <ContactSection />
    </div>
    <Footer />
    <FloatingCTA />

  </>
  );
};

export default Index;
