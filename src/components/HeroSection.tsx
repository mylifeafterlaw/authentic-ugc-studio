import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { Play, ChevronDown } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import heroImg from "@/assets/hero-portrait.jpg";
import heroVideo from "@/assets/hume-band2-hero.mp4";
import heroPoster from "@/assets/hero-thumbnail.jpg";

// Swap these with the real assets when ready.
// videoSrc: the 30s UGC showreel. videoPoster: the poster frame shown before play.
// sideStill: a DIFFERENT shot/crop from the video poster.
const videoSrc = heroVideo;
const videoPoster = heroPoster; // uploaded thumbnail image shown before play
const sideStill = heroImg; // replace with a distinct second photo


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
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(120% 90% at 78% -5%, #f9f3ec 0%, #f0e6d8 55%, #e6d9c7 100%)" }}
    >
      <div className="container relative z-10 grid lg:grid-cols-2 items-center gap-10 lg:gap-8 pt-20 pb-16 lg:py-24 min-h-screen">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left flex flex-col justify-center lg:pl-8 xl:pl-16"
        >
          {/* Mobile-only portrait above the name — straight, no tilt */}
          <div className="lg:hidden mx-auto mb-2 w-[140px] sm:w-[170px]">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-soft border border-background/40">
              <img
                src={sideStill}
                alt="Jess Cousin – UGC creator portrait"
                className="w-full h-full object-cover object-top"
                width={800}
                height={1000}
              />
            </div>
          </div>

          {/* Headline cluster — serif headline dominant, script name demoted to a signature kicker */}
          <div>
            <p className="font-script text-2xl sm:text-3xl text-[hsl(340_45%_34%)] leading-none mb-1">
              Jess Cousin
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.12] mb-2">
              Eight years in law.
              <br />
              <span className="text-primary font-semibold">
                Now I make UGC that lands on brief and on time.
              </span>
            </h1>
            <div className="w-12 h-[3px] rounded-full gradient-cta mt-3 mx-auto lg:mx-0" />
          </div>

          {/* Niches row */}
          <p className="mt-4 mb-2 font-body text-xs sm:text-sm text-primary/60 tracking-[0.2em] uppercase">
            Beauty · Wellness · Tech · Travel · Lifestyle
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-5 mb-5">

            <button
              onClick={() => {
                trackClick("View Work", "hero");
                scrollTo("#portfolio");
              }}
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

          {/* Third-party proof — editorial pull-quote, above the fold */}
          <figure className="relative max-w-md mx-auto lg:mx-0 mt-1 pl-6 text-left">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-3 font-heading text-5xl leading-none text-primary/60 select-none"
            >
              &ldquo;
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1 top-3 bottom-3 w-px bg-gradient-to-b from-primary/50 to-transparent"
            />
            <blockquote className="font-body italic text-xs text-foreground/85 leading-relaxed">
              Jess was a pleasure to work with on our Band 2.0 campaign. She had a
              fast turnaround, delivered everything promptly, and was highly
              professional and detail-oriented throughout the process. She followed
              the creative brief closely, making the review process smooth and
              efficient. We&rsquo;d be happy to work with her again.
            </blockquote>
            <figcaption className="mt-2 font-body text-xs not-italic text-muted-foreground">
              <span className="font-semibold text-foreground/80">Ef Barte</span> · Marketing Coordinator, Hume Health
            </figcaption>
          </figure>
        </motion.div>

        {/* Visuals: dominant phone (video) in front, smaller still behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-center"
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
            <div className="hidden lg:flex justify-center absolute top-full left-[55%] -translate-x-1/2 mt-8 z-20">
              <a
                href="https://linktr.ee/MyLifeAfterLaw"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs sm:text-sm text-primary/60 tracking-wide hover:text-primary transition-colors"
              >
                @MyLifeAfterLaw
              </a>
            </div>

          </div>

          {/* Frameless video — no heavy bezel; soft shadow grounds it */}
          <div className="relative w-[210px] sm:w-[250px] lg:w-[270px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-[0_34px_64px_-20px_rgba(120,55,80,0.55)] ring-1 ring-[#2e1f24]/[0.06] shrink-0 z-10 bg-muted">
            <div className="relative w-full h-full">
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


      {/* Minimal pink accent glow (pink is an accent here, not the field) */}
      <div className="pointer-events-none absolute top-1/4 right-[12%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      {/* Warm grounding at the base anchors the composition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#d9c3a8]/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
