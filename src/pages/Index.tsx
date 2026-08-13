import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import BrandStamp from "@/components/BrandStamp";


const Index = () => (
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

export default Index;
