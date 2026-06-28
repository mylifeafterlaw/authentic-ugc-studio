import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  brand: z.string().trim().max(150, "Brand name is too long").optional(),
  message: z
    .string()
    .trim()
    .min(1, "Please tell me a little about your project")
    .max(2000, "Message is too long"),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", brand: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    try {
      const { error: insertError } = await supabase.from("enquiries").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        brand: parsed.data.brand || null,
        message: parsed.data.message,
      });

      if (insertError) throw insertError;

      // Fire off the notification email (don't block success on it)
      supabase.functions
        .invoke("notify-enquiry", { body: parsed.data })
        .catch((err) => console.error("Notification email failed:", err));

      toast.success("Thanks — I'll be in touch soon!");
      setForm({ name: "", email: "", brand: "", message: "" });
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      toast.error("Something went wrong. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-border bg-background/70 backdrop-blur px-5 py-3.5 font-body text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow";

  return (
    <section id="contact" className="py-20 lg:py-28 gradient-hero relative overflow-hidden">
      <div className="container max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Let's create content
            <br />
            <span className="text-primary italic">that actually works</span>
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-md mx-auto">
            Ready to get started? Tell me about your brand and I'll be in touch.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
              autoComplete="name"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className={inputClass}
              autoComplete="email"
            />
          </div>
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand / company (optional)"
            className={inputClass}
            autoComplete="organization"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            rows={5}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={submitting}
            className="gradient-cta text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-full shadow-soft hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send enquiry"
            )}
          </button>

          <p className="text-center font-body text-sm text-muted-foreground mt-2">
            Prefer email?{" "}
            <a
              href="mailto:my.lifeafterlaw@gmail.com"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              my.lifeafterlaw@gmail.com
            </a>
          </p>
        </motion.form>
      </div>

      <div className="absolute top-10 right-10 w-80 h-80 bg-blush/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-peach/40 rounded-full blur-3xl" />
    </section>
  );
};

export default ContactSection;
