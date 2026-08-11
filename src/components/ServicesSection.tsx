import { motion } from "framer-motion";
import { Camera, Film, Package, Sparkles, MapPin, Plus } from "lucide-react";

const services = [
  { icon: Camera, label: "Talking-to-camera", desc: "Natural delivery, scripted or unscripted" },
  { icon: Film, label: "B-roll and voiceover", desc: "Lifestyle footage with narration" },
  { icon: Package, label: "Product demos and unboxings", desc: "Showing the thing in real use" },
  { icon: Sparkles, label: "Hook-led short-form", desc: "Built for TikTok and Reels" },
  { icon: MapPin, label: "Based in Thailand", desc: "Filming across South East Asia" },
  { icon: Plus, label: "Add-ons", desc: "Extra hooks, raw footage, captions, rush turnaround" },
];

const ServicesSection = () => (
  <section
    id="services"
    className="py-20 lg:py-28 scroll-mt-24"
    style={{ background: "linear-gradient(180deg, #5C1220 0%, #520f1b 100%)" }}
  >
    <div className="container max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: "#F4ECDC" }}>
          Services
        </h2>
        <p className="font-body text-base" style={{ color: "rgba(244,236,220,0.62)" }}>The formats I work in. Mix and match to fit your brief.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl py-4 px-5 md:p-6 text-center transition-colors"
            style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(244,236,220,0.14)" }}
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-full flex items-center justify-center mb-2 md:mb-4"
              style={{ background: "rgba(244,236,220,0.12)" }}
            >
              <s.icon className="w-6 h-6" style={{ color: "#F4ECDC" }} />
            </div>
            <h3 className="font-heading text-lg mb-1" style={{ color: "#F4ECDC" }}>{s.label}</h3>
            <p className="font-body text-sm" style={{ color: "rgba(244,236,220,0.6)" }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <p className="font-body text-xs text-center mt-10" style={{ color: "rgba(244,236,220,0.55)" }}>
        Ex-lawyer, so briefs, deadlines and clear comms come as standard.
      </p>
    </div>
  </section>
);

export default ServicesSection;
