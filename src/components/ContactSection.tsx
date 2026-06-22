import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
    <div className="container max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
          Let's create content
          <br />
          <span className="text-primary italic">that actually works</span>
        </h2>
        <p className="font-body text-muted-foreground text-base mb-10 max-w-md mx-auto">
          Ready to get started? Reach out and let's chat about your brand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:my.lifeafterlaw@gmail.com"
            className="gradient-cta text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-full shadow-soft hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-base"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
        </div>
      </motion.div>
    </div>

    <div className="absolute top-10 right-10 w-80 h-80 bg-blush/30 rounded-full blur-3xl" />
    <div className="absolute bottom-10 left-10 w-64 h-64 bg-peach/40 rounded-full blur-3xl" />
  </section>
);

export default ContactSection;
