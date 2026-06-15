import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Globe, Leaf, Activity, Clapperboard } from "lucide-react";

const traits = [
  { icon: Scale, text: "Ex-lawyer, now making content full-time. Briefed, deadline-led, clear communication and fast responses." },
  { icon: Globe, text: "Working across the UK and South East Asia. Multi-location filming, indoor and outdoor." },
  { icon: Leaf, text: "Real, lived experience in the wellness and supplement space, for example IBS and ADHD, not borrowed talking points." },
  { icon: Activity, text: "Data-led where it helps. Sleep and recovery content backed by real tracking, not guesswork." },
  { icon: Clapperboard, text: "Natural delivery, hook-led short-form. Talking-to-camera and B-roll with voiceover." },
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
