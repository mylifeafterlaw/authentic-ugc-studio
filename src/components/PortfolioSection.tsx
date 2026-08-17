import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import BrandWatermark from "@/components/BrandWatermark";
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
  tags?: string[]; // FORMAT tags for cross-section filtering (see FORMAT_TAGS)
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
        subject: "Laser hair removal",
        format: "Hook-led · talking-to-camera and B-roll · clinic treatment",
        poster: laserHairRemovalPoster,
        videoUrl: laserHairRemoval,
        tags: ["Hook-led", "Talking-to-camera", "B-roll"],
      },
      {
        subject: "Haircare",
        format: "Before and after · B-roll and voiceover · hook-led",
        poster: hairProductPoster,
        videoUrl: hairProductVideo,
        tags: ["Before and after", "B-roll", "Voiceover", "Hook-led"],
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera with B-roll · natural product integration · hook-led",
        poster: livingBeautifulPoster,
        videoUrl: livingBeautifulVideo,
        tags: ["Talking-to-camera", "B-roll", "Hook-led"],
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera · before and after with overlays · series-style",
        poster: skinUsedPoster,
        videoUrl: skinUsedVideo,
        tags: ["Talking-to-camera", "Before and after"],
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera · authentic personal delivery · series-style",
        poster: skinComparisonPoster,
        videoUrl: skinComparisonVideo,
        tags: ["Talking-to-camera"],
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
        subject: "Collagen",
        format: "Talking-to-camera with B-roll · unflavoured powder, mixed on camera",
        poster: creatineTtcPoster,
        videoUrl: creatineTtc,
        tags: ["Talking-to-camera", "B-roll"],
      },
      {
        subject: "Hume Health",
        format: "Hook-led · talking-to-camera · ad-style CTA",
        poster: humeBand2Hook3Poster,
        videoUrl: humeBand2Hook3,
        tags: ["Talking-to-camera", "Hook-led"],
      },
      {
        subject: "Collagen",
        format: "ASMR · wide frame · sound on, no voiceover",
        poster: creatineAsmrPoster,
        videoUrl: creatineAsmr,
        tags: ["ASMR"],
      },
      {
        subject: "Water bottle",
        format: "Hook-led · talking-to-camera and B-roll",
        poster: productTripleHookPoster,
        videoUrl: productTripleHookVideo,
        tags: ["Hook-led", "Talking-to-camera", "B-roll"],
      },
      {
        subject: "Supplements",
        format: "Talking-to-camera · natural product explanation · longer-form",
        poster: lGlutaminePoster,
        videoUrl: lGlutamineVideo,
        tags: ["Talking-to-camera"],
      },
    ],
  },

  {
    id: "tech-apps",
    name: "Tech & Apps",
    tiles: [
      {
        subject: "Playful App",
        format: "Hook-led · screen recording · talking-to-camera greenscreen overlay",
        poster: playfulArrivalPoster,
        videoUrl: playfulArrivalVideo,
        tags: ["Hook-led", "Screen recording", "Talking-to-camera"],
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera throughout · app demo",
        poster: techAppsVideo1Poster,
        videoUrl: techAppsVideo1,
        tags: ["Hook-led", "Talking-to-camera"],
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera · screen recording overlay",
        poster: playfulArrivalVideo1Poster,
        videoUrl: playfulArrivalVideo1,
        tags: ["Hook-led", "Talking-to-camera", "Screen recording"],
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera with aesthetic B-roll · screen recording",
        poster: techAppsVideo2Poster,
        videoUrl: techAppsVideo2,
        tags: ["Hook-led", "Talking-to-camera", "Screen recording", "B-roll"],
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera · screen-recorded walkthrough",
        poster: playfulArrivalVideo3Poster,
        videoUrl: playfulArrivalVideo3,
        tags: ["Hook-led", "Talking-to-camera", "Screen recording"],
      },
      {
        subject: "Playful App",
        format: "Hook-led · talking-to-camera",
        poster: playfulVideo3Poster,
        videoUrl: playfulVideo3,
        tags: ["Hook-led", "Talking-to-camera"],
      },

    ],
  },
  {
    id: "accommodation",
    name: "Travel & Stays",
    tiles: [
      {
        subject: "Condo tour · Chiang Mai",
        format: "Hook-led · talking-to-camera · B-roll and voiceover",
        poster: condoPoster,
        videoUrl: condoVideo,
        tags: ["Hook-led", "Talking-to-camera", "B-roll", "Voiceover"],
      },
      {
        subject: "Apartment tour · Vietnam",
        format: "B-roll and voiceover · aesthetic edit",
        poster: vietnamApartmentPoster,
        videoUrl: vietnamApartmentVideo,
        tags: ["B-roll", "Voiceover"],
      },
      {
        subject: "Apartment tour · Vietnam",
        format: "Hook-led · B-roll and voiceover",
        poster: vietnamApartment2Poster,
        videoUrl: vietnamApartment2Video,
        tags: ["Hook-led", "B-roll", "Voiceover"],
      },
      {
        subject: "Travel · Singapore",
        format: "B-roll and voiceover · natural travel style",
        poster: singaporeZooPoster,
        videoUrl: singaporeZooVideo,
        tags: ["B-roll", "Voiceover"],
      },
    ],
  },
  {
    id: "lifestyle-experience",
    name: "Lifestyle & Experience",
    tiles: [
      { subject: "Tattoo experience · Chiang Mai", format: "Hook-led · B-roll and voiceover", poster: tattooPoster, videoUrl: tattooVideo, tags: ["Hook-led", "B-roll", "Voiceover"] },
      { subject: "Husky experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: huskiesPoster, videoUrl: huskiesVideo, tags: ["Hook-led", "B-roll", "Voiceover"] },
      { subject: "Muay Thai · Bangkok", format: "Hook-led · B-roll and voiceover", poster: rajaStadiumPoster, videoUrl: rajadamnernVideo, tags: ["Hook-led", "B-roll", "Voiceover"] },
      { subject: "Cinema experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cinemaPoster, videoUrl: cinemaVideo, tags: ["Hook-led", "B-roll", "Voiceover"] },
      { subject: "Café · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cafeWatPoster, videoUrl: cafeWatVideo, tags: ["Hook-led", "B-roll", "Voiceover"] },
      {
        subject: "Food and drink",
        format: "Talking-to-camera · natural and authentic",
        poster: productUGCPoster,
        videoUrl: productUGC,
        tags: ["Talking-to-camera"],
      },
    ],
  },
];

// Ordered FORMAT tag vocabulary for the cross-section filter bar. These cut
// across categories (not a duplicate of the section headings) on a single
// FORMAT axis. A tile can carry more than one.
const FORMAT_TAGS = [
  "Hook-led",
  "Talking-to-camera",
  "B-roll",
  "Voiceover",
  "Screen recording",
  "Before and after",
  "ASMR",
] as const;

// How many tiles carry each tag (shown on the chips).
const TAG_COUNTS: Record<string, number> = FORMAT_TAGS.reduce((acc, tag) => {
  acc[tag] = categories.reduce(
    (n, cat) => n + cat.tiles.filter((t) => t.tags?.includes(tag)).length,
    0
  );
  return acc;
}, {} as Record<string, number>);

const TOTAL_TILES = categories.reduce((n, cat) => n + cat.tiles.length, 0);

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



type Tone = "light" | "dark" | undefined;

const VideoTile = ({
  tile,
  tileId,
  activeId,
  onPlay,
  tone,
}: {
  tile: Tile;
  tileId: string;
  activeId: string | null;
  onPlay: (id: string) => void;
  tone?: Tone;
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

  // Caption colours adapt to the block behind the tile.
  const capMain =
    tone === "dark" ? "rgba(244,236,220,0.92)" : tone === "light" ? "rgba(46,20,25,0.78)" : undefined;
  const capSub =
    tone === "dark" ? "rgba(244,236,220,0.6)" : tone === "light" ? "rgba(46,20,25,0.5)" : undefined;

  const caption = tile.subject ? (
    <div className="mt-3 text-center">
      <p
        className={`font-body text-[0.65rem] uppercase tracking-[0.2em] font-light ${tone ? "" : "text-muted-foreground"}`}
        style={capMain ? { color: capMain } : undefined}
      >
        {tile.subject}
      </p>
      {tile.format && (
        <p
          className={`mt-1 font-body text-[0.55rem] tracking-[0.08em] font-light ${tone ? "" : "text-muted-foreground/60"}`}
          style={capSub ? { color: capSub } : undefined}
        >
          {tile.format}
        </p>
      )}
    </div>
  ) : (
    tile.label && (
      <p
        className={`mt-3 text-center font-body text-[0.65rem] uppercase tracking-[0.2em] font-light ${tone ? "" : "text-muted-foreground"}`}
        style={capMain ? { color: capMain } : undefined}
      >
        {tile.label}
      </p>
    )
  );

  // Framed = default phone mockup (dark bezel + notch). On the alternating
  // colour blocks the tiles go frameless so the video lifts off the field.
  const framed = !tone;
  const shellClass = framed
    ? "rounded-[2.4rem] bg-foreground p-2 shadow-elevated"
    : "rounded-[1.9rem] overflow-hidden";
  const shellStyle = framed
    ? undefined
    : tone === "dark"
      ? { boxShadow: "0 30px 55px -20px rgba(0,0,0,0.62), inset 0 0 0 1px rgba(244,236,220,0.16)" }
      : { boxShadow: "0 26px 48px -20px rgba(46,20,25,0.35), inset 0 0 0 1px rgba(46,20,25,0.08)" };

  return (
    <div
      ref={wrapperRef}
      className="group block w-[44vw] max-w-[178px] md:w-[220px] md:max-w-none shrink-0 text-left"
    >
      <div
        className={`relative w-full aspect-[9/19] transition-all duration-300 group-hover:-translate-y-1 ${shellClass}`}
        style={shellStyle}
      >
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

              {/* notch — only on the framed phone mockup */}
              {framed && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-foreground rounded-full z-10" />
              )}

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
  tone,
}: {
  tiles: Tile[];
  idPrefix: string;
  activeId: string | null;
  onPlay: (id: string) => void;
  tone?: Tone;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Measure actual overflow on mount and on resize. Without this, atEnd stays
  // false until the first scroll, so a row whose tiles already fit still shows
  // a right-arrow / edge-fade that scrolls nowhere. When there's no overflow,
  // this sets atEnd (and atStart) true, hiding both cues.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 8);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    };
    update();
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [tiles.length]);

  // 4 or fewer: horizontal swipe strip on mobile, centred wrapping row on desktop.
  if (tiles.length <= 4) {
    return (
      <div className="relative">
        <div className="flex gap-4 md:gap-6 overflow-x-auto px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-x-visible md:flex-wrap md:justify-center md:px-0">
          {tiles.map((tile, idx) => (
            <div key={idx} className="snap-start">
              <VideoTile tile={tile} tileId={`${idPrefix}-${idx}`} activeId={activeId} onPlay={onPlay} tone={tone} />
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

  // On the alternating colour blocks, the edge fade + arrows match the field.
  const fadeStyle =
    tone === "dark"
      ? { background: "linear-gradient(to left, #5C1220, transparent)" }
      : tone === "light"
        ? { background: "linear-gradient(to left, #F4ECDC, transparent)" }
        : undefined;
  const arrowStyle =
    tone === "dark"
      ? { background: "rgba(244,236,220,0.92)", color: "#5C1220", borderColor: "rgba(244,236,220,0.35)" }
      : tone === "light"
        ? { background: "rgba(255,255,255,0.9)", color: "#2e1419", borderColor: "rgba(46,20,25,0.12)" }
        : undefined;

  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-6 overflow-x-auto px-1 snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:px-0"
      >
        {tiles.map((tile, idx) => (
          <div key={idx} className="snap-start">
            <VideoTile tile={tile} tileId={`${idPrefix}-${idx}`} activeId={activeId} onPlay={onPlay} tone={tone} />
          </div>
        ))}
      </div>

      {/* Mobile-only swipe cue */}
      <SwipeCue />

      {/* Scroll cue: soft right-edge fade, hidden once fully scrolled (desktop only) */}
      <div
        aria-hidden
        style={fadeStyle}
        className={`pointer-events-none absolute inset-y-0 right-0 w-20 transition-opacity duration-300 hidden md:block ${
          tone ? "" : "bg-gradient-to-l from-background to-transparent"
        } ${atEnd ? "opacity-0" : "opacity-100"}`}
      />


      {/* Left scroll arrow (desktop only) */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Scroll left"
        style={arrowStyle}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-sm border shadow-soft hidden md:flex items-center justify-center transition-opacity duration-300 ${
          tone ? "" : "bg-background/80 border-border text-muted-foreground hover:text-foreground"
        } ${atStart ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right scroll arrow (desktop only) */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll right"
        style={arrowStyle}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-sm border shadow-soft hidden md:flex items-center justify-center transition-opacity duration-300 ${
          tone ? "" : "bg-background/80 border-border text-muted-foreground hover:text-foreground"
        } ${atEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const PortfolioSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  const clearTags = () => setSelectedTags([]);

  // A tile matches when nothing is selected, or it carries ANY selected tag (OR).
  const tileMatches = (tile: Tile) =>
    selectedTags.length === 0 || !!tile.tags?.some((t) => selectedTags.includes(t));

  // Categories with tiles filtered to the current selection; empty ones collapse.
  const visibleCategories = categories
    .map((cat) => ({ ...cat, tiles: cat.tiles.filter(tileMatches) }))
    .filter((cat) => cat.tiles.length > 0);

  const shownCount = visibleCategories.reduce((n, c) => n + c.tiles.length, 0);

  return (
    <section id="portfolio" className="py-20 lg:py-28 scroll-smooth overflow-x-clip bg-[#F4ECDC]">
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

      {/* PRIMARY: category navigation — serif, prominent, first */}
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-6">
        {visibleCategories.map((cat, i) => (
          <span key={cat.id} className="flex items-center gap-x-4">
            {i > 0 && <span className="text-foreground/25 text-lg" aria-hidden="true">·</span>}
            <a
              href={`#${cat.id}`}
              className="font-heading text-lg sm:text-xl text-foreground/85 hover:text-[#5C1220] underline-offset-8 hover:underline decoration-[#5C1220]/40 transition-colors"
            >
              {cat.name}
            </a>
          </span>
        ))}
      </nav>

      {/* SECONDARY: format tags — smaller refinement row beneath the nav.
          Multi-select; selecting shows tiles carrying any selected format
          and collapses emptied sections. */}
      <div className="mb-12">
        <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-foreground/45 text-center mb-2">
          Filter by format
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {FORMAT_TAGS.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                className="font-body text-[0.7rem] sm:text-xs rounded-full border px-2.5 py-1 transition-colors"
                style={
                  active
                    ? { background: "#5C1220", color: "#F4ECDC", borderColor: "#5C1220" }
                    : { background: "rgba(255,255,255,0.5)", color: "rgba(46,20,25,0.72)", borderColor: "rgba(46,20,25,0.18)" }
                }
              >
                {tag}
                <span className="ml-1 opacity-60 tabular-nums">{TAG_COUNTS[tag]}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-center gap-3 min-h-[1.25rem]">
          <span className="font-body text-xs text-foreground/60" aria-live="polite">
            {selectedTags.length === 0
              ? `Showing all ${TOTAL_TILES} videos`
              : `Showing ${shownCount} of ${TOTAL_TILES}`}
          </span>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearTags}
              className="font-body text-xs underline underline-offset-2 text-[#5C1220] hover:opacity-70 transition-opacity"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div>
        {visibleCategories.map((cat, catIdx) => {
          // Every section is a full-bleed band, alternating cream ↔ oxblood.
          // Tone follows the VISIBLE index so bands keep alternating even when
          // filtering collapses one out.
          const tone: Tone = catIdx % 2 === 0 ? "light" : "dark";
          const blockBg =
            tone === "dark"
              ? "linear-gradient(176deg, #5C1220 0%, #520f1b 100%)"
              : "#F4ECDC";
          const ruleStyle =
            tone === "dark"
              ? { background: "rgba(244,236,220,0.28)" }
              : { background: "rgba(46,20,25,0.14)" };
          return (
            <motion.div
              key={cat.id}
              id={cat.id}
              data-cat-idx={catIdx}
              className="scroll-mt-24 w-screen ml-[calc(50%-50vw)] relative overflow-hidden"
              style={{ background: blockBg }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.05 }}
            >
              {tone === "dark" && <BrandWatermark />}
              <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-16 lg:py-20">
                {/* Serif category header + thin rule */}
                <div className="flex items-center gap-4 mb-8">
                  <h3
                    className={`font-heading text-xl sm:text-2xl whitespace-nowrap ${tone === "dark" ? "" : "text-foreground"}`}
                    style={tone === "dark" ? { color: "#F4ECDC" } : undefined}
                  >
                    {cat.name}
                  </h3>
                  <span className="flex-1 h-px" style={ruleStyle} />
                </div>

                {/* Row: centred when ≤4 tiles, horizontally scrollable when >4 */}
                <CategoryRow tiles={cat.tiles} idPrefix={cat.id} activeId={activeId} onPlay={setActiveId} tone={tone} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default PortfolioSection;
