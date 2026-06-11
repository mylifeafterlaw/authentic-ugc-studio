import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Play, Music2 } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

const socials = [
  { icon: Mail, label: "Email", href: "#contact" },
  { icon: Music2, label: "TikTok", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const stats = [
  { emoji: "🎬", text: "Short-form video for wellness, tech, lifestyle & travel brands" },
  { emoji: "✦", text: "Fast turnaround" },
  { emoji: "🌏", text: "UK/Thailand based — open to global collaborations" },
];

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen gradient-hero overflow-hidden">
      <div className="container relative z-10 grid lg:grid-cols-2 items-center gap-8 lg:gap-8 pt-24 pb-10 lg:pt-28 lg:pb-12 min-h-screen">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <p className="font-script text-6xl sm:text-7xl lg:text-8xl text-primary leading-none mb-4">
            Jess Cousin
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-3">
            UGC that feels like a recommendation, not an ad
          </h1>
          <p className="font-body text-base sm:text-lg text-foreground/80 mb-2">
            Short-form video for wellness, lifestyle and tech brands that want content people actually trust
          </p>
          <p className="font-body text-sm sm:text-base text-foreground/60 mb-3">
            Former lawyer bringing a structured approach to content that feels natural, not forced
          </p>

          {/* Stat lines */}
          <ul className="space-y-2 mt-5 mb-6 max-w-md mx-auto lg:mx-0 text-left">
            {stats.map((s) => (
              <li key={s.text} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground/80">
                <span className="text-lg leading-none mt-0.5">{s.emoji}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>


          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
            <button
              onClick={() => scrollTo("#portfolio")}
              className="gradient-cta text-primary-foreground font-body font-semibold px-8 py-3 rounded-full shadow-soft hover:opacity-90 transition-opacity text-base"
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

          {/* Social icons */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                onClick={(e) => {
                  if (href.startsWith("#")) {
                    e.preventDefault();
                    scrollTo(href);
                  }
                }}
                className="w-11 h-11 rounded-full bg-blush/50 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>

        </motion.div>

        {/* Visuals: phone mockup + tilted photo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end gap-4 sm:gap-6"
        >
          {/* Phone mockup */}
          <div className="relative w-[180px] sm:w-[220px] lg:w-[240px] aspect-[9/19] rounded-[2.2rem] bg-foreground p-2 shadow-elevated shrink-0 z-10">
            <div className="relative w-full h-full rounded-[1.7rem] overflow-hidden bg-muted">
              <img
                src={heroImg}
                alt="Jess Cousin – UGC video preview"
                className="w-full h-full object-cover"
              />
              {/* notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground rounded-full" />
              {/* play button */}
              <button
                onClick={() => scrollTo("#portfolio")}
                aria-label="Play showreel"
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-foreground/55 backdrop-blur-sm flex items-center justify-center hover:bg-foreground/70 transition-colors"
              >
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Tilted photo card */}
          <div className="relative w-[150px] sm:w-[200px] lg:w-[240px] aspect-[4/5] rounded-2xl overflow-hidden shadow-card border-4 border-background rotate-3 -ml-8 sm:-ml-10 mt-16">
            <img
              src={heroImg}
              alt="Jess Cousin – UGC Creator portrait"
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
