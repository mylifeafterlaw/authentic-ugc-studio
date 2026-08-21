import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import BrandWatermark from "@/components/BrandWatermark";

// Email-only contact: the enquiry form was removed (its backend was being
// retired) in favour of a straight mailto CTA plus a copyable address.
const EMAIL = "my.lifeafterlaw@gmail.com";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — the address is
      // visible and selectable, so there is still a path.
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #5C1220 0%, #470c17 100%)" }}
    >
      <BrandWatermark />
      <div className="container max-w-2xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: "#F4ECDC" }}>
            Let&rsquo;s create content
            <br />
            <span className="italic" style={{ color: "#f8ddc7" }}>that actually works</span>
          </h2>
          <p className="font-body text-base max-w-md mx-auto" style={{ color: "rgba(244,236,220,0.62)" }}>
            Ready to get started?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent("UGC enquiry")}`}
            onClick={() => trackClick("Email Me", "contact")}
            className="inline-flex items-center gap-2.5 bg-[#F4ECDC] text-[#5C1220] font-body font-semibold px-9 py-3.5 rounded-full shadow-[0_16px_34px_-14px_rgba(0,0,0,0.55)] hover:bg-white transition-colors text-base"
          >
            <Mail className="w-5 h-5" />
            Email me
          </a>

          <div className="flex items-center gap-2.5">
            <span className="font-body text-sm sm:text-base select-all" style={{ color: "rgba(244,236,220,0.85)" }}>
              {EMAIL}
            </span>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="p-1.5 rounded-md transition-colors hover:bg-[#F4ECDC]/10"
              style={{ color: "rgba(244,236,220,0.6)" }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            {copied && (
              <span className="font-body text-xs" style={{ color: "rgba(244,236,220,0.6)" }}>
                Copied
              </span>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute top-10 right-10 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(150,40,55,0.35)" }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(244,236,220,0.08)" }} />
    </section>
  );
};

export default ContactSection;
