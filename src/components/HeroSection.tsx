import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

// Swap these with the real assets when ready.
// videoSrc: the 30s UGC showreel. videoPoster: the poster frame shown before play.
// sideStill: a DIFFERENT shot/crop from the video poster.
const videoSrc = ""; // e.g. import showreel from "@/assets/showreel.mp4"
const videoPoster = heroImg; // replace with a dedicated poster frame
const sideStill = heroImg; // replace with a distinct second photo


const stats = [
  { emoji: "✦", text: "Hook-led short-form designed to hold attention early" },
  { emoji: "✦", text: "Natural delivery, talking-to-camera and voiceover" },
  { emoji: "✦", text: "Shot in real environments" },
];

const HeroSection = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const handlePlay = () => {
    if (!videoSrc) {
      // No video supplied yet — fall back to the portfolio section.
      scrollTo("#portfolio");
      return;
    }
    setPlaying(true);
    // allow the element to mount/controls to show, then play
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section id="hero" className="relative min-h-screen gradient-hero overflow-hidden">
      <div className="container relative z-10 grid lg:grid-cols-[1.25fr_0.85fr] items-center gap-10 lg:gap-8 pt-24 pb-16 lg:py-24 min-h-screen">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left flex flex-col justify-center lg:pl-8 xl:pl-16"
        >
          {/* Headline cluster: name + headline + credibility line as one tight top group */}
          <div>
            <p className="font-script text-6xl sm:text-7xl lg:text-8xl text-[hsl(340_50%_28%)] leading-none mb-2 lg:-ml-8 xl:-ml-12">
              Jess Cousin
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight mb-2">
              UGC that feels like a{" "}
              <span className="text-primary font-semibold">recommendation, not an ad</span>
            </h1>
            <p className="font-body text-sm sm:text-base text-foreground/70">
              Former lawyer bringing a structured approach to content that feels natural, not forced
            </p>
          </div>

          {/* Niches row */}
          <p className="mt-4 mb-2 font-body text-xs sm:text-sm text-primary/60 tracking-[0.2em] uppercase">
            Wellness · Lifestyle · Travel · Tech
          </p>

          {/* Larger gap before lower group (bullets) — anchored with an accent rail */}
          <ul className="space-y-2.5 mt-5 max-w-xl mx-auto lg:mx-0 text-left border-l-2 border-primary/40 pl-4">
            {stats.map((s) => (
              <li key={s.text} className="flex items-start gap-3 font-body text-sm sm:text-base text-foreground/80">
                <span className="text-lg leading-none mt-0.5 text-primary">{s.emoji}</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>

          {/* CTAs — part of the lower group, kept close to the bullets */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6 mb-7">

            <button
              onClick={() => scrollTo("#portfolio")}
              className="gradient-cta text-primary-foreground font-body font-semibold px-8 py-3 rounded-full shadow-soft hover:opacity-90 transition-opacity text-base"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="border-2 border-primary text-primary font-body font-semibold px-8 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-base"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

        {/* Visuals: dominant phone (video) in front, smaller still behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-center lg:-translate-x-24 xl:-translate-x-32"
        >
          <div className="relative">
          {/* Secondary still — deliberate second photo sitting BEHIND the phone, peeking out the right side */}
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-[58%] translate-x-[62%] sm:translate-x-[66%] lg:translate-x-[70%] w-[220px] sm:w-[280px] lg:w-[340px] z-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-card border-4 border-background rotate-6">
              <img
                src={sideStill}
                alt="Jess Cousin – UGC creator portrait"
                className="w-full h-full object-cover object-top"
                width={800}
                height={1000}
                loading="lazy"
              />
            </div>

            {/* Quiet handle link — centred under the visible photo slice */}
            <div className="hidden lg:flex justify-center absolute top-full left-1/2 -translate-x-1/2 mt-12 z-20">
              <Link
                to="/links"
                className="font-body text-xs sm:text-sm text-primary/60 tracking-wide hover:text-primary transition-colors"
              >
                @MyLifeAfterLaw
              </Link>
            </div>

          </div>

          {/* Soft, playful cue: handwritten caption + curved arrow toward the play button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            }}
            className="hidden lg:flex absolute right-full bottom-[28%] mr-3 flex-col items-start z-20 pointer-events-none select-none"
          >
            <svg
              width="84"
              height="52"
              viewBox="0 0 84 52"
              fill="none"
              className="text-primary mb-1 ml-2 overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M6 46 C40 14, 90 -12, 132 -20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M132 -20 L121 -12 M132 -20 L119 -23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="font-script text-2xl text-primary leading-none whitespace-nowrap -translate-x-12">
              Watch a sample
            </span>
          </motion.div>


          {/* Phone mockup — dominant, in front */}
          <div className="relative w-[210px] sm:w-[250px] lg:w-[270px] aspect-[9/19] rounded-[2.4rem] bg-foreground p-2 shadow-elevated shrink-0 z-10">


            <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-muted">
              {playing && videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={videoPoster}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={videoPoster}
                    alt="Jess Cousin – UGC video preview"
                    className="w-full h-full object-cover"
                  />
                  {/* notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground rounded-full" />
                  {/* play affordance */}
                  <button
                    onClick={handlePlay}
                    aria-label="Watch 30 second showreel"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
                  >
                    <span className="w-16 h-16 rounded-full gradient-cta shadow-elevated flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                    </span>
                    <span className="font-body text-sm font-semibold text-primary-foreground bg-foreground/60 backdrop-blur-sm px-3 py-1 rounded-full">
                      Watch (30s)
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          </div>

        </motion.div>
      </div>

      {/* Subtle scroll cue */}
      <motion.button
        onClick={() => scrollTo("#portfolio")}
        aria-label="Scroll to portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.9 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary/70 hover:text-primary transition-colors"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={2} />
      </motion.button>


      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blush/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-peach/50 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
