import { motion } from "framer-motion";
import { Play } from "lucide-react";

const categories = [
  {
    name: "Tech & Apps",
    videos: [
      { title: "App Walkthrough", context: "Problem-solution hook for productivity app", placeholder: true },
      { title: "Tech Review", context: "Authentic first-impression style unboxing", placeholder: true },
    ],
  },
  {
    name: "Lifestyle & Travel",
    videos: [
      { title: "Chiang Mai Day", context: "Day-in-the-life vlog for travel brand", placeholder: true },
      { title: "Hotel Experience", context: "Immersive stay content with storytelling", placeholder: true },
    ],
  },
  {
    name: "Hospitality & Cafés",
    videos: [
      { title: "Café Review", context: "Aesthetic B-roll with voiceover", placeholder: true },
      { title: "Restaurant Feature", context: "Quick-hook food content", placeholder: true },
    ],
  },
  {
    name: "Voiceover & Hooks",
    videos: [
      { title: "Problem-Solution", context: "Strong hook + CTA format", placeholder: true },
      { title: "Storytelling Ad", context: "Narrative-driven product placement", placeholder: true },
    ],
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-20 lg:py-28 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Portfolio
        </h2>
        <p className="font-body text-muted-foreground text-base max-w-md mx-auto">
          Scroll-stopping content designed for engagement, watch time, and conversions.
        </p>
      </motion.div>

      <div className="space-y-16">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              {cat.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cat.videos.map((vid, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[9/16] bg-secondary rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
                >
                  {/* Placeholder state */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Play className="w-6 h-6 text-primary ml-0.5" />
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground text-center">
                      {vid.title}
                    </span>
                    <span className="font-body text-xs text-muted-foreground text-center leading-tight">
                      {vid.context}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12 font-body text-sm text-muted-foreground"
      >
        Replace placeholders with your actual video embeds or upload links.
      </motion.p>
    </div>
  </section>
);

export default PortfolioSection;
