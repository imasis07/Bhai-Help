import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-violet-900/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            Start for Free Today
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to Stop{" "}
            <span className="text-primary text-glow">Guessing?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 50+ D2C brands who have discovered the influencer sales they were missing.
            Set up in under 2 minutes. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl text-base hover:bg-primary/90 transition-all duration-200 glow-cyan"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 border border-border bg-card/50 text-foreground font-medium px-8 py-4 rounded-xl text-base hover:bg-card transition-all duration-200"
            >
              Talk to Sales
            </motion.a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {["No credit card required", "2-minute setup", "Cancel anytime", "Free forever plan"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
