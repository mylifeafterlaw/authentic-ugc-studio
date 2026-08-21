import { ChevronUp } from "lucide-react";

// Slim footer: name + legal only. The social links moved up into the Contact
// section so the page ending reads as one composed block.
const Footer = () => (
  <footer className="py-8 pb-24 md:pb-8 relative" style={{ background: "#470c17", borderTop: "1px solid rgba(244,236,220,0.08)" }}>
    <div className="container text-center">
      <p className="font-heading text-xl mb-2" style={{ color: "#F4ECDC" }}>Jess Cousin</p>
      <p className="font-body text-xs" style={{ color: "rgba(244,236,220,0.4)" }}>© {new Date().getFullYear()} Jess Cousin. All rights reserved.</p>
      <p className="font-body text-xs mt-1" style={{ color: "rgba(244,236,220,0.4)" }}>Portfolio includes personal and non-commissioned content created independently.</p>
    </div>

    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[#F4ECDC]/10"
      style={{ border: "1px solid rgba(244,236,220,0.25)", color: "rgba(244,236,220,0.6)" }}
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  </footer>
);

export default Footer;
