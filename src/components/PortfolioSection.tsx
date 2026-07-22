import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import apartmentVideo from "@/assets/apartment-ugc.mp4.asset.json";
import condoVideo from "@/assets/condo-ugc.mp4.asset.json";
import apartmentPoster from "@/assets/apartment-ugc-poster.png.asset.json";
import vietnamApartmentVideo from "@/assets/Vietnam_Apartment_3_Final.mp4.asset.json";
import productUGC from "@/assets/Product_UGC_Natural_talking.MP4.asset.json";
import skinComparisonVideo from "@/assets/Skin_Comparison_Version_B_Final.mp4.asset.json";
import singaporeZooVideo from "@/assets/singapore-zoo.mp4.asset.json";
import tattooVideo from "@/assets/tattoo-chiang-mai.mp4.asset.json";
import huskiesVideo from "@/assets/huskies.mp4.asset.json";
import rajadamnernVideo from "@/assets/rajadamnern.mp4.asset.json";
import cinemaVideo from "@/assets/cinema.mp4.asset.json";
import cafeWatVideo from "@/assets/cafe-wat-bang-nam-phueng.mp4.asset.json";
import humeHealthVideo from "@/assets/hume-health-no-edits.mp4.asset.json";
import rajaStadiumPoster from "@/assets/raja-stadium-poster.png.asset.json";
import humeHealthThumbnail from "@/assets/hume-health-thumbnail.jpg.asset.json";
import productTripleHookVideo from "@/assets/Product_UGC_Triple_hook.mp4.asset.json";
import productVideo5 from "@/assets/product-video-5.mp4.asset.json";
import productVideo5Poster from "@/assets/product-video-5-poster.jpg.asset.json";
import hairProductVideo from "@/assets/My_hair_wasnt_just_dry_Final.mp4.asset.json";
import livingBeautifulVideo from "@/assets/Living_somewhere_beautiful_Final.mp4.asset.json";
// Poster stills (real video frames) for fast, lazy loading
import hairProductPoster from "@/assets/hair-product-poster.jpg.asset.json";
import livingBeautifulPoster from "@/assets/living-beautiful-poster.jpg.asset.json";
import productTripleHookPoster from "@/assets/product-triple-hook-poster.jpg.asset.json";
import condoPoster from "@/assets/condo-poster.jpg.asset.json";
import vietnamApartmentPoster from "@/assets/vietnam-apartment-poster.jpg.asset.json";
import singaporeZooPoster from "@/assets/singapore-zoo-poster.jpg.asset.json";
import skinComparisonPoster from "@/assets/skin-comparison-poster.jpg.asset.json";
import productUGCPoster from "@/assets/product-ugc-poster.jpg.asset.json";
import tattooPoster from "@/assets/tattoo-poster.jpg.asset.json";
import huskiesPoster from "@/assets/huskies-poster.jpg.asset.json";
import cinemaPoster from "@/assets/cinema-face-poster.jpg.asset.json";
import cafeWatPoster from "@/assets/cafe-wat-poster.jpg.asset.json";
import neverlandPoster from "@/assets/neverland.png.asset.json";
import techAppsVideo1 from "@/assets/tech-apps-video-1.mp4.asset.json";
import techAppsVideo1Poster from "@/assets/tech-apps-video-1-poster.jpg.asset.json";
import techAppsVideo2 from "@/assets/Playful_Video_2_-_FINAL-2.mp4.asset.json";
import techAppsVideo2Poster from "@/assets/tech-apps-video-2-poster.jpg.asset.json";


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
    id: "product",
    name: "Product",
    tiles: [
      {
        subject: "Haircare",
        format: "Before and after · B-roll and voiceover · hook-led",
        poster: hairProductPoster.url,
        videoUrl: hairProductVideo.url,
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera with B-roll · natural product integration · hook-led",
        poster: livingBeautifulPoster.url,
        videoUrl: livingBeautifulVideo.url,
      },
      {
        subject: "Water bottle",
        format: "Hook-led · talking-to-camera and B-roll",
        poster: productTripleHookPoster.url,
        videoUrl: productTripleHookVideo.url,
      },
      {
        subject: "Aesthetic pour · trend-led",
        format: "Single-cut B-roll · text overlays · no voiceover",
      },
      {
        subject: "Aesthetic pour · full process",
        format: "Quick-cut B-roll · text overlays · no voiceover",
      },
    ],
  },
  {
    id: "talking-head",
    name: "Talking to Camera",
    tiles: [
      {
        subject: "Hume Health",
        format: "Talking-to-camera · hook and CTA · ad-style",
        poster: humeHealthThumbnail.url,
        videoUrl: humeHealthVideo.url,
      },
      {
        subject: "Skincare",
        format:
          "Talking-to-camera · before and after with overlays · series-style",
        poster: skinComparisonPoster.url,
        videoUrl: skinComparisonVideo.url,
      },
      {
        subject: "Food and drink",
        format: "Talking-to-camera · natural and authentic",
        poster: productUGCPoster.url,
        videoUrl: productUGC.url,
      },
    ],
  },

  {
    id: "tech-apps",
    name: "Tech and Apps",
    tiles: [
      {
        subject: "Playful · Hatch app",
        format: "Hook-led · talking-to-camera throughout · app demo",
        poster: techAppsVideo1Poster.url,
        videoUrl: techAppsVideo1.url,
      },
      {
        subject: "Playful · Hatch app",
        format: "Hook-led · talking-to-camera with aesthetic B-roll · screen recording",
        poster: techAppsVideo2Poster.url,
        videoUrl: techAppsVideo2.url,
      },

    ],
  },
  {
    id: "accommodation-travel",
    name: "Accommodation & Travel",
    tiles: [
      {
        subject: "Apartment tour · Vietnam",
        format: "B-roll and voiceover",
        poster: apartmentPoster.url,
        videoUrl: apartmentVideo.url,
      },
      {
        subject: "Condo tour · Chiang Mai",
        format: "Hook-led · talking-to-camera and B-roll with voiceover",
        poster: condoPoster.url,
        videoUrl: condoVideo.url,
      },
      {
        subject: "Apartment tour · Vietnam",
        format: "Aesthetic B-roll and voiceover",
        poster: vietnamApartmentPoster.url,
        videoUrl: vietnamApartmentVideo.url,
      },
      {
        subject: "Travel · Singapore",
        format: "B-roll and voiceover · natural travel style",
        poster: singaporeZooPoster.url,
        videoUrl: singaporeZooVideo.url,
      },
    ],
  },
  {
    id: "lifestyle-experience",
    name: "Lifestyle & Experience",
    tiles: [
      { subject: "Tattoo experience · Chiang Mai", format: "Hook-led · B-roll and voiceover", poster: tattooPoster.url, videoUrl: tattooVideo.url },
      { subject: "Husky experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: neverlandPoster.url, videoUrl: huskiesVideo.url },
      { subject: "Muay Thai · Bangkok", format: "Hook-led · B-roll and voiceover", poster: rajaStadiumPoster.url, videoUrl: rajadamnernVideo.url },
      { subject: "Cinema experience · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cinemaPoster.url, videoUrl: cinemaVideo.url },
      { subject: "Café · Bangkok", format: "Hook-led · B-roll and voiceover", poster: cafeWatPoster.url, videoUrl: cafeWatVideo.url },
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
  onPlay,
}: {
  tile: Tile;
  onPlay: (url: string) => void;
}) => {
  const wrapperRef = useRef<any>(null);
  // Lazy-load: only attach the video src once the tile nears the viewport.
  const [inView, setInView] = useState(false);

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

  const inner = (
    <>
      <div className="relative w-full aspect-[9/19] rounded-[2.4rem] bg-foreground p-2 shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
        <div className="group relative w-full h-full rounded-[1.9rem] bg-black overflow-hidden">
          {/* Real poster still, lazy-loaded via IntersectionObserver (in view → load).
              No video bytes download until the user opens the modal to play. */}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110">
              <Play className="w-4 h-4 text-primary ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Small caption space below the tile */}
      {tile.subject ? (
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
      )}
    </>
  );

  if (tile.videoUrl) {
    return (
      <button
        ref={wrapperRef}
        type="button"
        onClick={() => onPlay(tile.videoUrl!)}
        className="group block w-[52vw] max-w-[210px] md:w-[260px] md:max-w-none shrink-0 text-left"
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="group block w-[52vw] max-w-[210px] md:w-[260px] md:max-w-none shrink-0"
    >
      {inner}
    </div>
  );
};

const CategoryRow = ({
  tiles,
  onPlay,
}: {
  tiles: Tile[];
  onPlay: (url: string) => void;
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
              <VideoTile tile={tile} onPlay={onPlay} />
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
            <VideoTile tile={tile} onPlay={onPlay} />
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
              <CategoryRow tiles={cat.tiles} onPlay={setActiveVideo} />

            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
      <DialogContent className="max-w-[min(92vw,420px)] border-none bg-transparent p-0 shadow-none">
        {activeVideo && (
          <video
            src={activeVideo}
            controls
            autoPlay
            playsInline
            className="w-full aspect-[9/16] rounded-[1.5rem] bg-black object-contain"
          />
        )}
      </DialogContent>
    </Dialog>
  </section>
  );
};

export default PortfolioSection;
