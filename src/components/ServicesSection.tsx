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
  <section id="services" className="py-20 lg:py-28 gradient-soft scroll-mt-24">
    <div className="container max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
          Services
        </h2>
        <p className="font-body text-muted-foreground text-base">What I can create for your brand.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-card transition-shadow"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-foreground mb-1">{s.label}</h3>
            <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
