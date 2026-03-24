import { motion } from "framer-motion";
import { Scale, Globe, Sparkles, Zap, Heart } from "lucide-react";

const traits = [
  { icon: Scale, text: "Former lawyer at a top 10 global law firm" },
  { icon: Globe, text: "Now full-time UGC creator based in Thailand" },
  { icon: Sparkles, text: "Comfortable across niches: tech, lifestyle, travel, wellness" },
  { icon: Zap, text: "Known for natural delivery and strong hooks" },
  { icon: Heart, text: "Fast turnaround, easy to work with" },
];

const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28 gradient-soft">
    <div className="container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-10">
          About Jess
        </h2>

        <div className="space-y-4">
          {traits.map((trait, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-card rounded-lg p-4 shadow-soft"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <trait.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-body text-foreground text-base leading-relaxed pt-1.5">
                {trait.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 font-body text-muted-foreground text-sm italic"
        >
          "I create authentic UGC for brands that want to connect with real audiences."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
