import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Play } from "lucide-react";
import condoVideo from "@/assets/condo-ugc.mp4";
import vietnamApartmentVideo from "@/assets/Vietnam_Apartment_3_Final.mp4";
import productUGC from "@/assets/Product_UGC_Natural_talking.mp4";
import skinComparisonVideo from "@/assets/Skin_Comparison_Version_B_Final.mp4";
import singaporeZooVideo from "@/assets/singapore-zoo.mp4";
import tattooVideo from "@/assets/tattoo-chiang-mai.mp4";
import huskiesVideo from "@/assets/huskies.mp4";
import rajadamnernVideo from "@/assets/rajadamnern.mp4";
import cinemaVideo from "@/assets/cinema.mp4";
import cafeWatVideo from "@/assets/cafe-wat-bang-nam-phueng.mp4";
import rajaStadiumPoster from "@/assets/raja-stadium-poster.jpg";
import productTripleHookVideo from "@/assets/Product_UGC_Triple_hook_voiceover_b-roll-2.mp4";
import productVideo5 from "@/assets/product-video-5.mp4.asset.json";
import productVideo5Poster from "@/assets/product-video-5-poster.jpg.asset.json";
import hairProductVideo from "@/assets/My_hair_wasnt_just_dry_Final.mp4";
import livingBeautifulVideo from "@/assets/Living_somewhere_beautiful_Final.mp4";
// Poster stills (real video frames) for fast, lazy loading
import hairProductPoster from "@/assets/hair-product-poster.jpg";
import livingBeautifulPoster from "@/assets/living-beautiful-poster.jpg";
import productTripleHookPoster from "@/assets/product-triple-hook-poster.jpg";
import condoPoster from "@/assets/condo-poster.jpg";
import vietnamApartmentPoster from "@/assets/vietnam-apartment-poster.jpg";
import vietnamApartment2Video from "@/assets/vietnam-apartment-2.mp4";
import vietnamApartment2Poster from "@/assets/vietnam-apartment-2-poster.jpg";
import singaporeZooPoster from "@/assets/singapore-zoo-poster.jpg";
import skinComparisonPoster from "@/assets/skin-comparison-poster.jpg";
import productUGCPoster from "@/assets/product-ugc-poster.jpg";
import tattooPoster from "@/assets/tattoo-poster.jpg";
import huskiesPoster from "@/assets/huskies-poster.jpg";
import cinemaPoster from "@/assets/cinema-face-poster.jpg";
import cafeWatPoster from "@/assets/cafe-wat-poster.jpg";
import techAppsVideo1 from "@/assets/tech-apps-video-1.mp4";
import techAppsVideo1Poster from "@/assets/tech-apps-video-1-poster.jpg";
import techAppsVideo2 from "@/assets/Playful_Video_2_-_FINAL-2.mp4";
import techAppsVideo2Poster from "@/assets/tech-apps-video-2-poster.jpg";
import skinUsedVideo from "@/assets/skin-used-to-look-like-this.mp4";
import skinUsedPoster from "@/assets/skin-used-to-look-like-this-poster.jpg";
import lGlutamineVideo from "@/assets/70-second-example-l-glutamine.mp4";
import lGlutaminePoster from "@/assets/70-second-example-l-glutamine-poster.jpg";
import humeBand2Hook3 from "@/assets/hume-band2-hook3.mp4";
import humeBand2Hook3Poster from "@/assets/hume-band2-hook3-poster.jpg";
import creatineAsmr from "@/assets/creatine-asmr.mp4";
import creatineAsmrPoster from "@/assets/creatine-asmr-poster.jpg";
import creatineTtc from "@/assets/creatine-ttc.mp4";
import creatineTtcPoster from "@/assets/creatine-ttc-poster.jpg";
import laserHairRemoval from "@/assets/laser-hair-removal.mp4";
import laserHairRemovalPoster from "@/assets/laser-hair-removal-poster.jpg";
import playfulArrivalVideo from "@/assets/playful-arrival-app.mp4";
import playfulArrivalPoster from "@/assets/playful-arrival-app-poster.jpg";
import playfulArrivalVideo1 from "@/assets/playful-arrival-video-1.mp4";
import playfulArrivalVideo1Poster from "@/assets/playful-arrival-video-1-poster.jpg";
import playfulArrivalVideo3 from "@/assets/playful-arrival-video-3.mp4";
import playfulArrivalVideo3Poster from "@/assets/playful-arrival-video-3-poster.jpg";
import playfulVideo3 from "@/assets/playful-video-3.mp4";
import playfulVideo3Poster from "@/assets/playful-video-3-poster.jpg";


type Tile = {
  label?: string; // small caption under the tile (optional)
  subject?: string; // primary caption line (uppercase, letter-spaced)
  format?: string; // secondary caption line (smaller, more muted)
  poster?: string; // real video-frame still shown before/while the video loads
  videoUrl?: string; // CDN video URL — plays inline in a modal
};

type Category = {
  id: string;
  name: string;
  tiles: Tile[];
};

// Edit this array to add/remove tiles or categories.
// Each tile has a real poster still + lazy-loaded video for fast mobile loading.
const categories: Category[] = [
  {
    id: "beauty-skincare",
    name: "Beauty & Skincare",
    tiles: [
      {
        subject: "Haircare",
        format: "Before and after · B-roll and voiceover · hook-led",
        poster: hairProductPoster,
        videoUrl: hairProductVideo,
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera with B-roll · natural product integration · hook-led",
        poster: livingBeautifulPoster,
        videoUrl: livingBeautifulVideo,
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera · before and after with overlays · series-style",
        poster: skinUsedPoster,
        videoUrl: skinUsedVideo,
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera · authentic personal delivery · series-style",
        poster: skinComparisonPoster,
        videoUrl: skinComparisonVideo,
      },
      {
        subject: "Laser hair removal · Chiang Mai",
        format: "Hook-led · talking-to-camera and B-roll · clinic treatment",
        poster: laserHairRemovalPoster,
        videoUrl: laserHairRemoval,
      },
      // HIDDEN until the "Aesthetic pour" source clip is supplied (productVideo5
      // import above). Final section TBC with Jess. To restore: uncomment.
      // {
      //   subject: "Aesthetic pour · full process",
      //   format: "Quick-cut B-roll · text overlays · no voiceover",
      //   poster: productVideo5Poster,
      //   videoUrl: productVideo5,
      // },
    ],
  },
  {
    id: "health-supplements",
    name: "Health & Supplements",
    tiles: [
      {
        subject: "Supplements",
        format: "Talking-to-camera · natural product explanation · longer-form",
        poster: lGlutaminePoster,
        videoUrl: lGlutamineVideo,
      },
      {
        subject: "Water bottle",
        format: "Hook-led · talking-to-camera and B-roll",
        poster: productTripleHookPoster,
        videoUrl: productTripleHookVideo,
      },
      {
        subject: "Hume Health",
        format: "Talking-to-camera · hook and CTA · ad-style",
        poster: humeBand2Hook3Poster,
        videoUrl: humeBand2Hook3,
      },
      {
        subject: "Collagen",
        format: "ASMR · wide frame · sound on, no voiceover",
        poster: creatineAsmrPoster,
        videoUrl: creatineAsmr,
      },
      {
        subject: "Collagen",
        format: "Talking-to-camera with B-roll · unflavoured powder, mixed on camera",
        poster: creatineTtcPoster,
        videoUrl: creatineTtc,
      },
    ],
  },

  {
    id: "tech-apps",
    name: "Tech & Apps",
    tiles: [
      {
        subject: "Playful App",
        format: "Hook-led · full-screen screen recording · greenscreen talking-head overlay",
        poster: playfulArrivalPoster,
        videoUrl: playfulArrivalVideo,
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera throughout · app demo",
        poster: techAppsVideo1Poster,
        videoUrl: techAppsVideo1,
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera · screen recording overlay",
        poster: playfulArrivalVideo1Poster,
        videoUrl: playfulArrivalVideo1,
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera with aesthetic B-roll · screen recording",
        poster: techAppsVideo2Poster,
        videoUrl: techAppsVideo2,
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera · in-app walkthrough",
        poster: playfulArrivalVideo3Poster,
        videoUrl: playfulArrivalVideo3,
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera",
        poster: playfulVideo3Poster,
        videoUrl: playfulVideo3,
      },

    ],
  },
  {
    id: "accommodation",
    name: "Accommodation",
    tiles: [
      {
        subject: "Condo tour · Chiang Mai",
        format: "Hook-led · talking-to-camera and B-roll with voiceover",
        poster: condoPoster,
        videoUrl: condoVideo,
      },
      {
        subject: "Apartment tour · Vietnam",
        format: "Aesthetic B-roll and voiceover",
        poster: vietnamApartmentPoster,
        videoUrl: vietnamApartmentVideo,
      },
      {
        subject: "Apartment tour · Vietnam",
        format: "Hook-led · B-roll and voiceover",
        poster: vietnamApartment2Poster,
        videoUrl: vietnamApartment2Video,
      },
      {
        subject: "Travel · Singapore",
        format: "B-roll and voiceover · natural travel style",
        poster: singaporeZooPoster,
        videoUrl: singaporeZooVideo,
      },
    ],
  },
  {
    id: "lifestyle-experience",
    name: "Lifestyle & Experience",
    tiles: [
      { subject: "Tattoo experience · Chiang Mai", format: "Hook-led · B-roll and voiceover", poster: tattooPoster, videoUrl: tattooVideo },
      { subject: "Husky experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: huskiesPoster, videoUrl: huskiesVideo },
      { subject: "Muay Thai · Bangkok", format: "Hook-led · B-roll and voiceover", poster: rajaStadiumPoster, videoUrl: rajadamnernVideo },
      { subject: "Cinema experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cinemaPoster, videoUrl: cinemaVideo },
      { subject: "Café · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cafeWatPoster, videoUrl: cafeWatVideo },
      {
        subject: "Food and drink",
        format: "Talking-to-camera · natural and authentic",
        poster: productUGCPoster,
        videoUrl: productUGC,
      },
    ],
  },
];

// Mobile-only swipe cue: minimal white chevron + "swipe" label, no circle/border.
const SwipeCue = () => (
  <div
    aria-hidden
    className="md:hidden pointer-events-none absolute right-2 top-[36%] -translate-y-1/2 z-10 flex flex-col items-center gap-1 text-white animate-pulse drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
  >
    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
    <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] font-light">
      swipe
    </span>
  </div>
);



const VideoTile = ({
  tile,
  tileId,
  activeId,
  onPlay,
}: {
  tile: Tile;
  tileId: string;
  activeId: string | null;
  onPlay: (id: string) => void;
}) => {
  const wrapperRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Lazy-load the poster image once the tile nears the viewport. The video
  // itself uses preload="none" and only mounts on click, so no video bytes
  // download on page load.
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  // Only one tile plays at a time: pause this one when another becomes active.
  useEffect(() => {
    if (playing && activeId !== tileId) {
      videoRef.current?.pause();
    }
  }, [activeId, tileId, playing]);

  const start = () => {
    setPlaying(true);
    // Let the <video> mount, then start playback. Its onPlay fires → this tile
    // becomes the active one and every other playing tile pauses.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  const caption = tile.subject ? (
    <div className="mt-3 text-center">
      <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] font-light text-muted-foreground">
        {tile.subject}
      </p>
      {tile.format && (
        <p className="mt-1 font-body text-[0.55rem] tracking-[0.08em] font-light text-muted-foreground/60">
          {tile.format}
        </p>
      )}
    </div>
  ) : (
    tile.label && (
      <p className="mt-3 text-center font-body text-[0.65rem] uppercase tracking-[0.2em] font-light text-muted-foreground">
        {tile.label}
      </p>
    )
  );

  return (
    <div
      ref={wrapperRef}
      className="group block w-[44vw] max-w-[178px] md:w-[220px] md:max-w-none shrink-0 text-left"
    >
      <div className="relative w-full aspect-[9/19] rounded-[2.4rem] bg-foreground p-2 shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative w-full h-full rounded-[1.9rem] bg-black overflow-hidden">
          {tile.videoUrl && playing ? (
            // Plays inline inside the phone mockup — same as the hero.
            <video
              ref={videoRef}
              src={tile.videoUrl}
              poster={tile.poster}
              controls
              playsInline
              preload="none"
              onPlay={() => onPlay(tileId)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Real poster still, lazy-loaded via IntersectionObserver. */}
              {tile.poster ? (
                <img
                  src={inView ? tile.poster : undefined}
                  alt={tile.subject ?? tile.label ?? "Portfolio video"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 gradient-soft scale-[1.03]" />
              )}

              {/* notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-foreground rounded-full z-10" />

              {/* Play affordance */}
              {tile.videoUrl && (
                <button
                  type="button"
                  onClick={start}
                  aria-label={`Play ${tile.subject ?? tile.label ?? "video"}`}
                  className="group/play absolute inset-0 flex items-center justify-center"
                >
                  <span className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-soft transition-transform duration-300 group-hover/play:scale-110">
                    <Play className="w-4 h-4 text-primary ml-0.5" />
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {caption}
    </div>
  );
};

const CategoryRow = ({
  tiles,
  idPrefix,
  activeId,
  onPlay,
}: {
  tiles: Tile[];
  idPrefix: string;
  activeId: string | null;
  onPlay: (id: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // 4 or fewer: horizontal swipe strip on mobile, centred wrapping row on desktop.
  if (tiles.length <= 4) {
    return (
      <div className="relative">
        <div className="flex gap-4 md:gap-6 overflow-x-auto px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-x-visible md:flex-wrap md:justify-center md:px-0">
          {tiles.map((tile, idx) => (
            <div key={idx} className="snap-start">
              <VideoTile tile={tile} tileId={`${idPrefix}-${idx}`} activeId={activeId} onPlay={onPlay} />
            </div>
          ))}
        </div>
        <SwipeCue />
      </div>
    );
  }

  // More than 4: single horizontal scrollable strip with a right-edge fade cue.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -284, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: 284, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto px-1 snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:px-0"
      >
        {tiles.map((tile, idx) => (
          <div key={idx} className="snap-start">
            <VideoTile tile={tile} tileId={`${idPrefix}-${idx}`} activeId={activeId} onPlay={onPlay} />
          </div>
        ))}
      </div>

      {/* Mobile-only swipe cue */}
      <SwipeCue />

      {/* Scroll cue: soft right-edge fade, hidden once fully scrolled (desktop only) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 hidden md:block ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />


      {/* Left scroll arrow (desktop only) */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Scroll left"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-soft hidden md:flex items-center justify-center text-muted-foreground hover:text-foreground transition-opacity duration-300 ${
          atStart ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right scroll arrow (desktop only) */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll right"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-soft hidden md:flex items-center justify-center text-muted-foreground hover:text-foreground transition-opacity duration-300 ${
          atEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const PortfolioSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<number>(0);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const catRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const visibility = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.catIdx);
          visibility.set(idx, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let bestIdx = 0;
        let bestRatio = 0;
        visibility.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        setIndicatorVisible(bestRatio > 0);
        if (bestRatio > 0) setActiveCat(bestIdx);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85, 1] }
    );
    catRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (idx: number) => {
    const el = catRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevCat = activeCat > 0 ? categories[activeCat - 1] : null;
  const nextCat = activeCat < categories.length - 1 ? categories[activeCat + 1] : null;

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-background scroll-smooth">
    <div className="mx-auto w-full max-w-[1500px] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Portfolio
        </h2>
      </motion.div>

      {/* Subtle category jump-nav (generated from categories) */}
      <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-16">
        {categories.map((cat, i) => (
          <span key={cat.id} className="flex items-center gap-x-3">
            {i > 0 && <span className="text-border">·</span>}
            <a
              href={`#${cat.id}`}
              className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {cat.name}
            </a>
          </span>
        ))}
      </nav>

      <div className="space-y-20">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.id}
            id={cat.id}
            data-cat-idx={catIdx}
            ref={(el) => (catRefs.current[catIdx] = el)}
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.05 }}
          >
            <div>
              {/* Serif category header + thin rule */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-heading text-xl sm:text-2xl text-foreground whitespace-nowrap">
                  {cat.name}
                </h3>
                <span className="flex-1 h-px bg-border" />
              </div>

              {/* Row: centred when ≤4 tiles, horizontally scrollable when >4 */}
              <CategoryRow tiles={cat.tiles} idPrefix={cat.id} activeId={activeId} onPlay={setActiveId} />

            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Side category indicator — desktop only, visible while a category is in view */}
    <div
      aria-hidden={!indicatorVisible}
      className={`hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 transition-opacity duration-300 ${
        indicatorVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {prevCat ? (
        <button
          type="button"
          onClick={() => jumpTo(activeCat - 1)}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] font-light">
            {prevCat.name}
          </span>
          <ChevronUp className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      ) : (
        <span className="h-4" />
      )}

      <div className="flex flex-col items-end gap-1.5 border-r border-foreground/30 pr-3 py-1">
        <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] font-medium text-foreground">
          {categories[activeCat]?.name}
        </span>
        <div className="flex flex-col gap-1">
          {categories.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full transition-colors ${
                i === activeCat ? "bg-primary" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>

      {nextCat ? (
        <button
          type="button"
          onClick={() => jumpTo(activeCat + 1)}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] font-light">
            {nextCat.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      ) : (
        <span className="h-4" />
      )}
    </div>

  </section>
  );
};

export default PortfolioSection;
