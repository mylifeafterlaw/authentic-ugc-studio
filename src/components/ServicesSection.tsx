import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import BrandWatermark from "@/components/BrandWatermark";
import ttcStill from "@/assets/services/ttc.jpg";
import brollStill from "@/assets/services/broll.jpg";
import demoStill from "@/assets/services/demo.jpg";
import hookStill from "@/assets/services/hook.jpg";
import hookA from "@/assets/services/hume-hook3.jpg";
import hookB from "@/assets/services/hume-hook1.jpg";
import hookC from "@/assets/services/hume-hook2.jpg";
import hookD from "@/assets/services/hume-hook4.jpg";

const CREAM = "#F4ECDC";
const SOFT = "rgba(244,236,220,0.62)";
const LINE = "rgba(244,236,220,0.14)";

// Each service shows a real still from one of the portfolio videos.
const services = [
  { img: ttcStill, label: "Talking-to-camera", desc: "Natural delivery, scripted or unscripted" },
  { img: brollStill, label: "B-roll and voiceover", desc: "Lifestyle footage with narration" },
  { img: demoStill, label: "Product demos and unboxings", desc: "Showing the thing in real use" },
  { img: hookStill, label: "Hook-led short-form", desc: "Built for TikTok and Reels" },
];

// The creative process, step by step.
const process = [
  { title: "Brief", desc: "I get to know your product, audience and goal. No script needed." },
  { title: "Hooks and outline", desc: "A few opening hooks and a simple plan, agreed before I film." },
  { title: "Filming", desc: "Real settings, with extra takes and angles so the edit has options." },
  { title: "Editing", desc: "Pacing, captions, product shots and a clear call to action." },
  { title: "Review and delivery", desc: "Two rounds of tweaks, then files ready to post or run as ads." },
];

const ServicesSection = () => (
  <section
    id="services"
    className="py-20 lg:py-28 scroll-mt-24 relative overflow-hidden"
    style={{ background: "linear-gradient(180deg, #5C1220 0%, #520f1b 100%)" }}
  >
    <BrandWatermark />
    <div className="container max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ color: CREAM }}>
          Services
        </h2>
        <p className="font-body text-base" style={{ color: SOFT }}>
          Ad creative built for testing. Mix and match to fit your brief.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
        {/* Featured offer: the ad-testing bundle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[1.6rem] p-6 md:p-7"
          style={{ background: "rgba(244,236,220,0.07)", border: `1px solid rgba(244,236,220,0.22)` }}
        >
          <p className="font-body text-[0.65rem] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: "#F2B8B5" }}>
            Built for testing
          </p>
          <h3 className="font-heading text-2xl md:text-3xl mb-2" style={{ color: CREAM }}>
            Ad-testing bundle
          </h3>
          <p className="font-body text-base leading-relaxed" style={{ color: CREAM }}>
            2 videos, 3 hooks, 2 CTAs
            <br />
            <span style={{ color: SOFT }}>One shoot, 12 versions</span>
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {[hookA, hookB, hookC, hookD].map((src, i) => (
              <div key={i} className="relative aspect-[9/16] rounded-lg overflow-hidden ring-1 ring-[#F4ECDC]/15">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                <span
                  className="absolute top-1.5 left-1.5 font-body text-[0.6rem] font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ background: CREAM, color: "#5C1220" }}
                >
                  {"ABCD"[i]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-body text-xs" style={{ color: "rgba(244,236,220,0.5)" }}>
            Same video, four different openings.
          </p>
        </motion.div>

        {/* The individual formats, as a clean list */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {services.map((s) => (
            <li key={s.label} className="flex items-center gap-4 py-4 border-t first:border-t-0 first:pt-0" style={{ borderColor: LINE }}>
              <img
                src={s.img}
                alt=""
                loading="lazy"
                className="w-14 h-[4.5rem] rounded-lg object-cover shrink-0 ring-1 ring-[#F4ECDC]/15"
              />
              <div>
                <h3 className="font-heading text-lg leading-snug" style={{ color: CREAM }}>{s.label}</h3>
                <p className="font-body text-sm mt-0.5" style={{ color: SOFT }}>{s.desc}</p>
              </div>
            </li>
          ))}
          <li className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: LINE }}>
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{ border: `1px dashed rgba(244,236,220,0.4)` }}
            >
              <Plus className="w-5 h-5" style={{ color: CREAM }} />
            </span>
            <div>
              <h3 className="font-heading text-lg leading-snug" style={{ color: CREAM }}>Add-ons</h3>
              <p className="font-body text-sm mt-0.5" style={{ color: SOFT }}>Extra hooks, raw footage, captions, rush turnaround</p>
            </div>
          </li>
        </motion.ul>
      </div>

      {/* How a video comes together */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 pt-12 border-t"
        style={{ borderColor: LINE }}
      >
        <h3 className="font-heading text-2xl md:text-3xl text-center mb-8" style={{ color: CREAM }}>
          How a video comes together
        </h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
          {process.map((p, i) => (
            <li key={p.title} className="text-left">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center font-heading text-sm mb-3"
                style={{ border: `1px solid rgba(244,236,220,0.55)`, color: CREAM }}
              >
                {i + 1}
              </span>
              <p className="font-body text-sm font-semibold" style={{ color: CREAM }}>{p.title}</p>
              <p className="font-body text-sm leading-relaxed mt-1" style={{ color: SOFT }}>{p.desc}</p>
            </li>
          ))}
        </ol>
      </motion.div>

      <p className="font-body text-xs text-center mt-12" style={{ color: "rgba(244,236,220,0.55)" }}>
        Ex-lawyer, so briefs are followed closely and deadlines are&nbsp;met.
      </p>
    </div>
  </section>
);

export default ServicesSection;
