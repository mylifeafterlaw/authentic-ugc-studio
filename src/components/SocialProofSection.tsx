import { motion } from "framer-motion";
import { TrendingUp, Eye, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Eye, label: "Watch Time", value: "Optimised", note: "Hooks that stop the scroll" },
  { icon: TrendingUp, label: "Engagement", value: "Driven", note: "Content designed for action" },
  { icon: ThumbsUp, label: "Conversions", value: "Focused", note: "Every video has a purpose" },
];

const SocialProofSection = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Built for Results
        </h2>
        <p className="font-body text-muted-foreground text-base max-w-md mx-auto">
          Content designed for engagement, watch time, and conversions.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center bg-card rounded-xl p-8 shadow-card"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-blush/50 flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="font-heading text-2xl text-foreground mb-1">{s.value}</p>
            <p className="font-body text-sm font-semibold text-foreground mb-1">{s.label}</p>
            <p className="font-body text-xs text-muted-foreground">{s.note}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 bg-secondary rounded-xl p-8 text-center shadow-soft"
      >
        <p className="font-body text-muted-foreground italic text-sm mb-2">
          "Testimonials coming soon – space ready for brand feedback and results."
        </p>
        <p className="font-body text-xs text-muted-foreground">— Future happy client</p>
      </motion.div>
    </div>
  </section>
);

export default SocialProofSection;
