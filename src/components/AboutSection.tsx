import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Bike, Brain, Heart, Dumbbell } from "lucide-react";

const traits = [
  { icon: Scale, headline: "Left law to build something slower", sub: "Corporate lawyer turned content creator" },
  { icon: Bike, headline: "Happiest on two wheels", sub: "Motorbike rider, usually somewhere warm" },
  { icon: Brain, headline: "ADHD, and open about it", sub: "It shapes how I work and what I make" },
  { icon: Heart, headline: "Genuine wellness obsessive", sub: "Real lived experience, not borrowed talking points" },
  { icon: Dumbbell, headline: "Always training something", sub: "Gym regular, currently learning Muay Thai" },
];

const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28 gradient-soft">
    <div className="container max-w-5xl">
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
              <div className="pt-0.5">
                <p className="font-body text-foreground text-base font-semibold leading-snug">
                  {trait.headline}
                </p>
                <p className="font-body text-muted-foreground text-sm leading-relaxed mt-0.5">
                  {trait.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 font-body text-muted-foreground text-sm italic"
        >
          "I hit briefs, hit deadlines, and handle revisions without drama."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-3"
        >
          <Link
            to="/about-me"
            className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            More about me &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
