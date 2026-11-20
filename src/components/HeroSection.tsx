import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Play, ChevronDown, ArrowRight } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import BrandWatermark from "@/components/BrandWatermark";
import heroImg from "@/assets/hero-portrait.jpg";
import humePoster from "@/assets/thumbs/08-dark.jpg";
import evolvePoster from "@/assets/thumbs/30-dark.jpg";
import { r2 } from "@/lib/media";

const sideStill = heroImg; // a different shot from the featured videos

// Featured videos. The first hook of the first video loops silently on load
// (preview = the hook only, under 1 MB); brands pick a video and a hook, and
// "Watch with sound" plays the full version of whatever is selected.
type Hook = { label: string; video: string; preview: string };
type Review = { quote: string; name: string; role: string };
const FEATURED: { name: string; poster: string; hooks: Hook[]; review: Review }[] = [
  {
    name: "Hume Health",
    poster: humePoster,
    review: {
      quote:
        "Jess was a pleasure to work with on our Band 2.0 campaign. She had a fast turnaround, delivered everything promptly, and was highly professional and detail-oriented throughout the process. She followed the creative brief closely, making the review process smooth and efficient. We’d be happy to work with her again.",
      name: "Ef Barte",
      role: "Marketing Coordinator, Hume Health",
    },
    hooks: [
      { label: "A", video: r2("hume-band2-hook3.mp4"), preview: r2("hume-band2-hook3-preview.mp4") },
      { label: "B", video: r2("hume-band2-hook1.mp4"), preview: r2("hume-band2-hook1-preview.mp4") },
      { label: "C", video: r2("hume-band2-hook2.mp4"), preview: r2("hume-band2-hook2-preview.mp4") },
      { label: "D", video: r2("hume-band2-hook4.mp4"), preview: r2("hume-band2-hook4-preview.mp4") },
    ],
  },
  {
    name: "Evolve",
    poster: evolvePoster,
    review: {
      quote:
        "I was impressed with how professional the experience was all the way through and really appreciate the edits. The delivery of the hooks and the CTA was done really well too and the whole thing was a great representation of what I was after so overall am very happy.",
      name: "Sam",
      role: "Evolve",
    },
    hooks: [
      { label: "A", video: r2("evolve-hook-a.mp4"), preview: r2("evolve-hook-a-preview.mp4") },
      { label: "B", video: r2("evolve-hook-b.mp4"), preview: r2("evolve-hook-b-preview.mp4") },
    ],
  },
];


const HeroSection = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [featIdx, setFeatIdx] = useState(0);
  const [hookIdx, setHookIdx] = useState(0);
  // Nothing plays on load: the poster shows until a hook is hovered or tapped,
  // then that hook loops silently.
  const [previewing, setPreviewing] = useState(false);
  // Respect reduced-motion: no silent preview loop, just the poster.
  const [loopOk, setLoopOk] = useState(true);
  useEffect(() => {
    setLoopOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const feat = FEATURED[featIdx];
  const hook = feat.hooks[hookIdx];

  // Until the visitor touches anything in the hero, the featured clients
  // (review + video cover) rotate on their own. Any click, hover preview or
  // play stops the rotation for good.
  const [touched, setTouched] = useState(false);
  // Hovering the review or the video pauses the rotation (without stopping it).
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (touched || hovering || playing || previewing || !loopOk) return;
    const t = setInterval(() => {
      setFeatIdx((i) => (i + 1) % FEATURED.length);
      setHookIdx(0);
    }, 6000);
    return () => clearInterval(t);
  }, [touched, hovering, playing, previewing, loopOk]);

  const playFull = () => requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  const pickFeat = (i: number) => {
    setTouched(true);
    if (i === featIdx) return;
    trackClick(`Featured: ${FEATURED[i].name}`, "hero");
    setFeatIdx(i);
    setHookIdx(0);
    setPreviewing(false);
    if (playing) playFull();
  };
  const pickHook = (i: number) => {
    setTouched(true);
    setHookIdx(i);
    if (playing) playFull();
    else setPreviewing(true);
  };

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const handlePlay = () => {
    trackClick(`Watch: ${feat.name} hook ${hook.label}`, "hero");
    setTouched(true);
    setPlaying(true);
    // allow the element to mount/controls to show, then play
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section
      id="hero"
      // Any click or tap anywhere in the hero (arrow, tabs, hooks, video,
      // buttons) stops the rotation for good.
      onPointerDownCapture={() => setTouched(true)}
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
            <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.28em]" style={{ color: "#F4ECDC" }}>
              Lawyer turned UGC Creator
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
            I turn <span style={{ color: "#F2B8B5" }}>your products</span> into ads that{" "}
            <span style={{ color: "#F2B8B5" }}>sell</span>.
          </h1>
          <p className="font-body text-base" style={{ color: "rgba(244,236,220,0.62)" }}>
            More hooks to test, less back-and-forth.
          </p>
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
          <figure
            className="relative max-w-md mx-auto lg:mx-0 mt-1 pl-6 text-left"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
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
            {/* The review follows the featured video that's selected */}
            <div className="flex items-center gap-4">
            <motion.div key={feat.name} className="flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <blockquote className="font-body italic text-xs leading-relaxed" style={{ color: "rgba(244,236,220,0.85)" }}>
                {feat.review.quote}
              </blockquote>
              <figcaption className="mt-2 font-body text-xs not-italic" style={{ color: "rgba(244,236,220,0.6)" }}>
                <span className="font-semibold" style={{ color: "rgba(244,236,220,0.9)" }}>{feat.review.name}</span> · {feat.review.role}
              </figcaption>
            </motion.div>
            {/* Next client: switches the review and the video beside it */}
            <button
              type="button"
              onClick={() => pickFeat((featIdx + 1) % FEATURED.length)}
              aria-label="Next client review and video"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#F4ECDC] hover:text-[#5C1220]"
              style={{ border: "1px solid rgba(244,236,220,0.55)", color: "#F4ECDC" }}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            </div>
          </figure>

        </motion.div>

        {/* Visuals: dominant phone (video) in front, smaller still behind */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center relative flex flex-col items-center justify-center"
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
          <div
            className="relative w-[210px] sm:w-[250px] lg:w-[270px] aspect-[9/19] rounded-[2rem] overflow-hidden shadow-[0_42px_72px_-24px_rgba(0,0,0,0.62)] ring-1 ring-[#F4ECDC]/15 shrink-0 z-10 bg-muted"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className="relative w-full h-full">
              {playing ? (
                <video
                  ref={videoRef}
                  src={hook.video}
                  poster={feat.poster}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={feat.poster}
                    alt={`${feat.name} video by Jess Cousin`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {loopOk && previewing && (
                    <video
                      key={hook.preview}
                      src={hook.preview}
                      muted
                      loop
                      autoPlay
                      playsInline
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  )}
                  {/* play affordance */}
                  <button
                    onClick={handlePlay}
                    aria-label={`Watch ${feat.name}, hook ${hook.label}, with sound`}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 group"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#F4ECDC] shadow-elevated flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-7 h-7 text-[#5C1220] ml-1" fill="currentColor" />
                    </span>
                    <span className="font-body text-sm font-semibold text-[#F4ECDC] bg-[#5C1220]/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      Watch with sound
                    </span>
                  </button>
                </>
              )}

              {/* Hook buttons: under the play button; move to the top edge while the video plays */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full pl-2.5 pr-1 py-1 ${playing ? "top-2.5" : "top-[calc(50%+4.25rem)]"}`}
                style={{ background: "rgba(46,20,25,0.55)", backdropFilter: "blur(6px)" }}
                role="group"
                aria-label="Choose a hook"
                onMouseLeave={() => !playing && setPreviewing(false)}
              >
                <span className="font-body text-[0.55rem] uppercase tracking-[0.16em] font-semibold mr-0.5" style={{ color: "rgba(244,236,220,0.8)" }}>
                  Hooks
                </span>
                {feat.hooks.map((h, i) => {
                  const on = i === hookIdx;
                  return (
                    <button
                      key={h.label}
                      type="button"
                      aria-pressed={on}
                      aria-label={`Hook ${h.label}`}
                      onPointerEnter={(e) => e.pointerType === "mouse" && !playing && pickHook(i)}
                      onClick={() => pickHook(i)}
                      className="font-body text-[0.65rem] font-semibold rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                      style={{
                        border: "1px solid rgba(244,236,220,0.85)",
                        background: on ? "#F4ECDC" : "transparent",
                        color: on ? "#5C1220" : "#F4ECDC",
                      }}
                    >
                      {h.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          </div>

          {/* Featured picker: choose the video, then the hook */}
          <div className="relative z-20 mt-5 flex flex-col items-center gap-2.5">
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: "rgba(244,236,220,0.1)" }}
              role="tablist"
              aria-label="Featured videos"
            >
              {FEATURED.map((f, i) => {
                const on = i === featIdx;
                return (
                  <button
                    key={f.name}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pickFeat(i)}
                    className="font-body text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                    style={on ? { background: "#F4ECDC", color: "#5C1220" } : { color: "rgba(244,236,220,0.8)" }}
                  >
                    {f.name}
                  </button>
                );
              })}
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
