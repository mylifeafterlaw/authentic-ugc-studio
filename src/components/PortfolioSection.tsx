import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
      { label: "Unboxing" },
      { label: "Demo" },
      { label: "First impressions" },
    ],
  },
  {
    id: "accommodation-travel",
    name: "Accommodation & Travel",
    tiles: [
      { label: "Hotel stay" },
      { label: "Destination" },
      { label: "Day in the life" },
    ],
  },
  {
    id: "lifestyle-experience",
    name: "Lifestyle & Experience",
    tiles: [
      { label: "Café visit" },
      { label: "Wellness" },
      { label: "Storytelling" },
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
      <div className="group relative aspect-[9/16] rounded-[1.5rem] bg-secondary overflow-hidden shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-elevated ring-1 ring-border/60">
        {tile.thumbnail ? (
          <img
            src={tile.thumbnail}
            alt={tile.label ?? "Portfolio video"}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : tile.videoUrl ? (
          <video
            src={tile.videoUrl}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 gradient-soft" />
        )}

        {/* Play affordance */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 text-primary ml-0.5" />
          </span>
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
        className="group block w-full text-left"
      >
        {inner}
      </button>
    );
  }

  return <div className="group block">{inner}</div>;
};

const PortfolioSection = () => (
  <section id="portfolio" className="py-20 lg:py-28 bg-background scroll-smooth">
    <div className="container">
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
            <div className="max-w-3xl mx-auto">
              {/* Serif category header + thin rule */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-heading text-xl sm:text-2xl text-foreground whitespace-nowrap">
                  {cat.name}
                </h3>
                <span className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-3 gap-5 sm:gap-6">
                {cat.tiles.map((tile, idx) => (
                  <VideoTile key={idx} tile={tile} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
