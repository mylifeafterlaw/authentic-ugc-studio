import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy } from "lucide-react";
import { trackClick } from "@/lib/analytics";
import BrandWatermark from "@/components/BrandWatermark";

// Email-only contact: the enquiry form was removed (its backend was being
// retired) in favour of a straight mailto CTA plus a copyable address.
const EMAIL = "my.lifeafterlaw@gmail.com";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mylifeafterlaw/",
    // lucide-style outline
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@mylifeafterlaw",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.9 2.9 0 0 1 .88.13V9.4a6.33 6.33 0 0 0-.88-.05A6.34 6.34 0 0 0 5 22a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04 0z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/MyLifeAfterLaw",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MyLifeAfterLaw",
    icon: (
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

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
      className="py-16 lg:py-20 relative overflow-hidden"
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
            <span className="font-body text-base sm:text-lg select-all" style={{ color: "rgba(244,236,220,0.9)" }}>
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

          <p className="font-body text-xs -mt-2" style={{ color: "rgba(244,236,220,0.5)" }}>
            Replies within a day
          </p>

          {/* Socials — pulled up from the footer so the ending reads as one block */}
          <div className="mt-6 flex flex-col items-center gap-3.5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="inline-block w-12 h-px" style={{ background: "rgba(244,236,220,0.18)" }} />
              <span className="font-body text-[0.6rem] uppercase tracking-[0.22em]" style={{ color: "rgba(244,236,220,0.45)" }}>
                Or find me here
              </span>
              <span aria-hidden="true" className="inline-block w-12 h-px" style={{ background: "rgba(244,236,220,0.18)" }} />
            </div>
            <div className="flex items-center gap-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onClick={() => trackClick(s.label, "contact-socials")}
                  className="transition-colors"
                  style={{ color: "rgba(244,236,220,0.78)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F4ECDC")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,236,220,0.78)")}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="font-body text-xs" style={{ color: "rgba(244,236,220,0.45)" }}>
              @MyLifeAfterLaw, everywhere
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-10 right-10 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(150,40,55,0.35)" }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(244,236,220,0.08)" }} />
    </section>
  );
};

export default ContactSection;
