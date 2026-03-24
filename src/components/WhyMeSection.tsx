import { motion } from "framer-motion";
import { Target, Film, Brain, CheckCircle } from "lucide-react";

const reasons = [
  { icon: Target, title: "Doesn't feel like ads", desc: "Content that blends into feeds and drives action" },
  { icon: Film, title: "Retention-focused editing", desc: "Strong hooks and pacing that keep viewers watching" },
  { icon: Brain, title: "Understands brand psychology", desc: "Speaks to both the brand and the audience" },
  { icon: CheckCircle, title: "Reliable & professional", desc: "Clear communication, on-time delivery, every time" },
];

const WhyMeSection = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Why Work With Me
        </h2>
        <p className="font-body text-muted-foreground text-base max-w-md mx-auto">
          What sets my content apart from the rest.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-blush transition-colors">
              <r.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-foreground mb-1">{r.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyMeSection;
