import { motion } from "framer-motion";
import portrait from "@/assets/about-headshot.jpg";

import { Bike, Brain, Heart, Dumbbell, Mic, Twitch } from "lucide-react";

const traits = [
  { icon: Twitch, headline: "Former Twitch streamer", sub: "Twitch Affiliate in under a month, live and unscripted" },
  { icon: Mic, headline: "Performer before I was a creator", sub: "Trained singer with stage experience" },
  { icon: Bike, headline: "Happiest on two wheels", sub: "Scooter rider, usually somewhere warm" },
  { icon: Brain, headline: "ADHD, and open about it", sub: "Hyperfixation and obsession, aimed at your product" },
  { icon: Heart, headline: "Genuine wellness obsessive", sub: "Real lived experience, not borrowed talking points" },
  { icon: Dumbbell, headline: "Gym, running, Pilates, Muay Thai", sub: "Whatever your sport, there's a phase coming" },
];

const OX = "#5C1220";

// Editorial two-column profile: headshot left, intro + traits right,
// signed off with the script line. Stacks on phones.
const AboutSection = () => (
  <section id="about" className="py-20 lg:py-28" style={{ background: "#F4ECDC" }}>
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto w-[240px] sm:w-[280px] lg:w-full"
        >
          <div className="aspect-[4/5] rounded-[1.9rem] overflow-hidden shadow-[0_26px_48px_-20px_rgba(46,20,25,0.35)] ring-1 ring-[#2E1419]/10">
            <img
              src={portrait}
              alt="Jess Cousin, UGC creator"
              className="w-full h-full object-cover object-[45%_center]"
              width={507}
              height={508}
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center lg:text-left"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">About Jess</h2>
          <p className="font-body text-base text-muted-foreground mb-5">The real life your product gets filmed in.</p>
          <p className="font-body text-base leading-relaxed text-foreground/85 max-w-xl mx-auto lg:mx-0">
            I make UGC from real, everyday life: the gym, the scooter, a café, my kitchen. Natural, relatable videos
            that feel like a friend&rsquo;s recommendation, not an&nbsp;ad.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 text-left">
            {traits.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-4 border-t"
                style={{ borderColor: "rgba(92,18,32,0.14)" }}
              >
                <t.icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: OX }} strokeWidth={1.8} />
                <div>
                  <p className="font-body text-[0.95rem] font-semibold text-foreground leading-snug">{t.headline}</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mt-0.5">{t.sub}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-script text-3xl sm:text-4xl leading-none" style={{ color: OX }}>
            Same person on camera as off it.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
