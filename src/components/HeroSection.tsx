import { motion } from "framer-motion";
import heroImg from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen gradient-hero overflow-hidden">
      <div className="container relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 pt-28 pb-16 lg:pt-32 lg:pb-20 min-h-screen">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
            UGC that feels real
            <br />
            <span className="text-primary italic">– and actually converts</span>
          </h1>
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            British creator based in Thailand, making authentic content for travel, lifestyle, tech &amp; wellness brands that want to connect with real audiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => scrollTo("#portfolio")}
              className="gradient-cta text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-full shadow-soft hover:opacity-90 transition-opacity text-base"
            >
              View Work
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="border-2 border-primary text-primary font-body font-semibold px-8 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-base"
            >
              Work With Me
            </button>
          </div>
          <p className="mt-6 font-body text-sm text-muted-foreground">
            ✦ Open to global collaborations · Trusted by brands worldwide
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden shadow-elevated border-4 border-background">
            <img
              src={heroImg}
              alt="Jess Cousin – UGC Creator"
              className="w-full h-full object-cover"
              width={800}
              height={1000}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blush/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-peach/50 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
