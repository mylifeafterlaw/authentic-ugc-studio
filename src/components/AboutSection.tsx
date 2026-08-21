import { motion } from "framer-motion";

import { Bike, Brain, Heart, Dumbbell, Mic, Twitch } from "lucide-react";

const traits = [
  { icon: Bike, headline: "Happiest on two wheels", sub: "Motorbike rider, usually somewhere warm" },
  { icon: Brain, headline: "ADHD, and open about it", sub: "It shapes how I work and what I make" },
  { icon: Heart, headline: "Genuine wellness obsessive", sub: "Real lived experience, not borrowed talking points" },
  { icon: Mic, headline: "Performer before I was a creator", sub: "Trained singer with stage experience" },
  { icon: Twitch, headline: "Former Twitch streamer", sub: "Twitch Affiliate, comfortable live and unscripted" },
  { icon: Dumbbell, headline: "Always training something", sub: "Gym regular, currently learning Muay Thai" },
];

const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28" style={{ background: "#F4ECDC" }}>
    <div className="mx-auto w-full max-w-5xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground text-center mb-10">
          About Jess
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {traits.map((trait, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-xl py-3 px-3.5 border shadow-[0_2px_10px_-4px_rgba(46,20,25,0.18)]"
              style={{ background: "#FFFDF9", borderColor: "rgba(46,20,25,0.10)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(92,18,32,0.07)" }}
              >
                <trait.icon className="w-6 h-6" style={{ color: "#5C1220" }} />
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
          className="text-center mt-7 font-body text-muted-foreground text-sm italic"
        >
          "Same person on camera as off it."
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
