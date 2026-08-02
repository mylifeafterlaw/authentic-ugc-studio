import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Single third-party testimonial, placed high on the page (above the portfolio)
// as the site's key social proof. No logo or photo — text attribution only.
const TestimonialSection = () => (
  <section id="testimonial" className="py-16 lg:py-20 gradient-soft">
    <div className="mx-auto w-full max-w-3xl px-6">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-body text-xs uppercase tracking-[0.2em] text-primary/60 mb-6"
      >
        What clients say
      </motion.p>

      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-card rounded-2xl border border-border/50 shadow-card px-7 py-9 sm:px-10 sm:py-11 text-center"
      >
        <Quote
          className="w-9 h-9 text-primary/70 mx-auto mb-5"
          fill="currentColor"
          aria-hidden="true"
        />

        <blockquote className="font-body text-foreground text-lg sm:text-xl leading-relaxed">
          “Jess was a pleasure to work with on our Band 2.0 campaign. She had a
          fast turnaround, delivered everything promptly, and was highly
          professional and detail-oriented throughout the process. She followed
          the creative brief closely, making the review process smooth and
          efficient. We'd be happy to work with her again.”
        </blockquote>

        <figcaption className="mt-6">
          <p className="font-heading text-lg text-foreground">Ef Barte</p>
          <p className="font-body text-sm text-muted-foreground mt-0.5">
            Marketing Coordinator · Hume Health
          </p>
        </figcaption>
      </motion.figure>
    </div>
  </section>
);

export default TestimonialSection;
