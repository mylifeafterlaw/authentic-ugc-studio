import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { Play, ChevronDown } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import BrandWatermark from "@/components/BrandWatermark";
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
      style={{ background: "radial-gradient(125% 95% at 76% -8%, #6f1727 0%, #5C1220 50%, #470c17 100%)" }}
    >
      <BrandWatermark />
      {/* Explicit grid placement (rather than source order) so mobile can slot
          the video between the headline and the rest of the copy, while desktop
          keeps all the text stacked in column 1 with the video beside it. */}
      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-y-6 gap-x-10 lg:gap-x-8 lg:gap-y-3 pt-20 pb-16 lg:py-24 min-h-screen">
        {/* Headline cluster — script name, small-caps credential kicker with
            lead-rule, then the single full-size serif headline. Above the video
            on mobile; top of column 1 on desktop. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:col-start-1 lg:row-start-1 lg:self-end text-center lg:text-left lg:pl-8 xl:pl-16"
        >
          <p className="font-script text-3xl sm:text-4xl leading-none mb-3" style={{ color: "#F2B8B5" }}>
            Jess Cousin
          </p>
          <p className="flex items-center gap-2.5 justify-center lg:justify-start mb-3">
            <span aria-hidden="true" className="inline-block w-6 h-[2px]" style={{ background: "#F4ECDC" }} />
            <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-[0.28em]" style={{ color: "#F4ECDC" }}>
              Eight years in law
            </span>
            {/* Trailing rule balances the centred kicker on mobile; desktop is
                left-aligned so it keeps the single leading rule only. */}
            <span aria-hidden="true" className="inline-block w-6 h-[2px] lg:hidden" style={{ background: "#F4ECDC" }} />
          </p>
          {/* Headline lifts off the field: a near-black soft drop shadow plus a
              nudge from the shared cream to near-white ivory. The two payoff
              phrases take a blush pink — the oxblood family lightened — so the
              promise a brand cares about carries the emphasis. */}
          <h1
            className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.09] mb-2 font-semibold"
            style={{
              color: "#FFFAF0",
              textShadow: "0 3px 14px rgba(20,4,8,0.75), 0 1px 3px rgba(20,4,8,0.6)",
            }}
          >
            Now I make UGC that lands{" "}
            <span style={{ color: "#F2B8B5" }}>on brief</span> and{" "}
            <span style={{ color: "#F2B8B5" }}>on time</span>.
          </h1>
        </motion.div>

        {/* Rest of the copy — below the video on mobile, continues column 1 on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start text-center lg:text-left flex flex-col lg:pl-8 xl:pl-16"
        >
          <div className="w-12 h-[3px] rounded-full mx-auto lg:mx-0" style={{ background: "#F4ECDC" }} />

          {/* Niches row — led by a small Union Jack (inline SVG, not the emoji:
              Windows renders the flag emoji as the letters "GB"). The flag
              replaces the word BRITISH as the nationality signal. */}
          <p className="mt-4 mb-2 font-body text-xs sm:text-sm tracking-[0.2em] uppercase" style={{ color: "rgba(240,205,190,0.7)" }}>
            <svg
              viewBox="0 0 60 30"
              className="inline-block w-5 sm:w-6 h-auto shrink-0 rounded-[2px] align-[-2px] mr-2"
              role="img"
              aria-label="British creator"
            >
              <rect width="60" height="30" fill="#012169" />
              <path d="M0,0 60,30 M60,0 0,30" stroke="#ffffff" strokeWidth="6" />
              <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="2.6" />
              <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
              <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
            </svg>
            Beauty · Wellness · Tech ·<br className="sm:hidden" /> Travel · Lifestyle
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-5 mb-5">

            <button
              onClick={() => {
                trackClick("View Work", "hero");
                scrollTo("#portfolio");
              }}
              className="bg-[#F4ECDC] text-[#5C1220] font-body font-semibold px-8 py-3 rounded-full shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white transition-colors text-base"
            >
              View Portfolio
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="border-2 border-[#F4ECDC] text-[#F4ECDC] font-body font-semibold px-8 py-3 rounded-full hover:bg-[#F4ECDC] hover:text-[#5C1220] transition-colors text-base"
            >
              Get in Touch
            </button>
          </div>

          {/* Third-party proof — editorial pull-quote, above the fold */}
          <figure className="relative max-w-md mx-auto lg:mx-0 mt-1 pl-6 text-left">
            <span
              aria-hidden="true"
              className="absolute left-0 -top-3 font-heading text-5xl leading-none select-none"
              style={{ color: "rgba(244,236,220,0.55)" }}
            >
              &ldquo;
            </span>
            <span
              aria-hidden="true"
              className="absolute left-1 top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(244,236,220,0.5), transparent)" }}
            />
            <blockquote className="font-body italic text-xs leading-relaxed" style={{ color: "rgba(244,236,220,0.85)" }}>
              Jess was a pleasure to work with on our Band 2.0 campaign. She had a
              fast turnaround, delivered everything promptly, and was highly
              professional and detail-oriented throughout the process. She followed
              the creative brief closely, making the review process smooth and
              efficient. We&rsquo;d be happy to work with her again.
            </blockquote>
            <figcaption className="mt-2 font-body text-xs not-italic" style={{ color: "rgba(244,236,220,0.6)" }}>
              <span className="font-semibold" style={{ color: "rgba(244,236,220,0.9)" }}>Ef Barte</span> · Marketing Coordinator, Hume Health
            </figcaption>
          </figure>
        </motion.div>

        {/* Visuals: dominant phone (video) in front, smaller still behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center relative flex items-center justify-center lg:justify-center"
        >
          <div className="relative">
          {/* Secondary still — deliberate second photo sitting BEHIND the phone, peeking out the right side */}
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-[58%] translate-x-[62%] sm:translate-x-[66%] lg:translate-x-[70%] w-[220px] sm:w-[280px] lg:w-[340px] z-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-card border-4 border-[#F4ECDC] rotate-6">
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
                className="font-body text-xs sm:text-sm text-[#F4ECDC]/55 tracking-wide hover:text-[#F4ECDC] transition-colors"
              >
                @MyLifeAfterLaw
              </a>
            </div>

          </div>

          {/* Frameless video — no heavy bezel; soft shadow grounds it */}
          <div className="relative w-[210px] sm:w-[250px] lg:w-[270px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-[0_42px_72px_-24px_rgba(0,0,0,0.62)] ring-1 ring-[#F4ECDC]/15 shrink-0 z-10 bg-muted">
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
                    aria-label="Watch showreel"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#F4ECDC] shadow-elevated flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-7 h-7 text-[#5C1220] ml-1" fill="currentColor" />
                    </span>
                    <span className="font-body text-sm font-semibold text-[#F4ECDC] bg-[#5C1220]/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      Watch
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          </div>

        </motion.div>

        {/* Mobile-only portrait, below the text — on mobile the video takes the
            top slot and the photo sits here, swapping their old positions. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="order-4 lg:hidden mx-auto w-[150px] sm:w-[180px]"
        >
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-card border-4 border-[#F4ECDC]">
            <img
              src={sideStill}
              alt="Jess Cousin – UGC creator portrait"
              className="w-full h-full object-cover object-top"
              width={800}
              height={1000}
              loading="lazy"
            />
          </div>
          <div className="flex justify-center mt-3">
            <a
              href="https://linktr.ee/MyLifeAfterLaw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-[#F4ECDC]/55 tracking-wide hover:text-[#F4ECDC] transition-colors"
            >
              @MyLifeAfterLaw
            </a>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-[#F4ECDC]/70 hover:text-[#F4ECDC] transition-colors"
      >
        <ChevronDown className="w-6 h-6" strokeWidth={2} />
      </motion.button>


      {/* Soft warm glow, upper right, keeps the dark field from going flat */}
      <div className="pointer-events-none absolute -top-10 right-[6%] w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(150,40,55,0.35)" }} />
      {/* Deeper grounding at the base anchors the composition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#3d0a14] to-transparent" />
    </section>
  );
};

export default HeroSection;
