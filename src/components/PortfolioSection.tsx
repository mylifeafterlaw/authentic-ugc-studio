import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
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
import rajaStadiumPoster from "@/assets/raja-stadium-poster.png.asset.json";
import productTripleHookVideo from "@/assets/Product_UGC_Triple_hook.mp4.asset.json";
import hairProductVideo from "@/assets/My_hair_wasnt_just_dry_Final.mp4.asset.json";
import livingBeautifulVideo from "@/assets/Living_somewhere_beautiful_Final.mp4.asset.json";

type Tile = {
  label?: string; // small caption under the tile (optional)
  thumbnail?: string; // poster image URL (optional)
  videoUrl?: string; // CDN video URL — plays inline in a modal
};

type Category = {
  id: string;
  name: string;
  tiles: Tile[];
};

// Edit this array to add/remove tiles or categories.
// Fill `thumbnail` and `videoUrl` per tile to go live with real videos.
const categories: Category[] = [
  {
    id: "product",
    name: "Product",
    tiles: [
      { label: "Triple Hook UGC", videoUrl: productTripleHookVideo.url },
      { label: "Hair Product", videoUrl: hairProductVideo.url },
      { label: "Living Somewhere Beautiful", videoUrl: livingBeautifulVideo.url },
      { label: "Product UGC", videoUrl: productUGC.url },
    ],
  },
  {
    id: "accommodation-travel",
    name: "Accommodation & Travel",
    tiles: [
      {
        label: "Apartment UGC",
        thumbnail: apartmentPoster.url,
        videoUrl: apartmentVideo.url,
      },
      {
        label: "Condo UGC",
        videoUrl: condoVideo.url,
      },
      {
        label: "Vietnam Apartment",
        videoUrl: vietnamApartmentVideo.url,
      },
      {
        label: "Singapore Zoo",
        videoUrl: singaporeZooVideo.url,
      },
    ],
  },
  {
    id: "talking-head",
    name: "Talking to Camera",
    tiles: [
      { label: "Skin Comparison", videoUrl: skinComparisonVideo.url },
      { label: "Piece to camera" },
      { label: "Voiceover" },
    ],
  },
  {
    id: "lifestyle-experience",
    name: "Lifestyle & Experience",
    tiles: [
      { label: "Tattoo Chiang Mai", videoUrl: tattooVideo.url },
      { label: "Huskies", videoUrl: huskiesVideo.url },
      { label: "Rajadamnern", thumbnail: rajaStadiumPoster.url, videoUrl: rajadamnernVideo.url },
      { label: "Cinema", videoUrl: cinemaVideo.url },
      { label: "Café Wat Bang Nam Phueng Nok", videoUrl: cafeWatVideo.url },
    ],
  },
];

const VideoTile = ({
  tile,
  onPlay,
}: {
  tile: Tile;
  onPlay: (url: string) => void;
}) => {
  const inner = (
    <>
      <div className="relative w-full aspect-[9/19] rounded-[2.4rem] bg-foreground p-2 shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
        <div className="group relative w-full h-full rounded-[1.9rem] bg-black overflow-hidden">
          {tile.thumbnail ? (
            <img
              src={tile.thumbnail}
              alt={tile.label ?? "Portfolio video"}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
            />
          ) : tile.videoUrl ? (
            <video
              src={tile.videoUrl}
              muted
              playsInline
              preload="metadata"
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
      {tile.label && (
        <p className="mt-3 text-center font-body text-[0.65rem] uppercase tracking-[0.2em] font-light text-muted-foreground">
          {tile.label}
        </p>
      )}
    </>
  );

  if (tile.videoUrl) {
    return (
      <button
        type="button"
        onClick={() => onPlay(tile.videoUrl!)}
        className="group block w-[260px] shrink-0 text-left"
      >
        {inner}
      </button>
    );
  }

  return <div className="group block w-[260px] shrink-0">{inner}</div>;
};

const CategoryRow = ({
  tiles,
  onPlay,
}: {
  tiles: Tile[];
  onPlay: (url: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  // 4 or fewer: keep the original centred, wrapping row.
  if (tiles.length <= 4) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {tiles.map((tile, idx) => (
          <VideoTile key={idx} tile={tile} onPlay={onPlay} />
        ))}
      </div>
    );
  }

  // More than 4: single horizontal scrollable strip with a right-edge fade cue.
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiles.map((tile, idx) => (
          <div key={idx} className="snap-start">
            <VideoTile tile={tile} onPlay={onPlay} />
          </div>
        ))}
      </div>

      {/* Scroll cue: soft right-edge fade, hidden once fully scrolled */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />
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
