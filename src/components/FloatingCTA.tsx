import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { trackClick } from "@/lib/analytics";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={(e) => {
            e.preventDefault();
            trackClick("Work With Me", "floating-cta");
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="fixed bottom-4 right-4 z-50 gradient-cta text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-full shadow-elevated hover:opacity-90 transition-opacity flex items-center gap-1.5 text-xs md:hidden"
        >
          <MessageCircle className="w-4 h-4" />
          Work With Me
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
