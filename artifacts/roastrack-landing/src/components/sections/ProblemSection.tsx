import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

function CountUp({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const problems = [
  "Only link click tracking",
  "40-60% of sales go untracked",
  "No search attribution",
  "No dark social tracking",
  "Influencer decisions based on guesswork",
];

const solutions = [
  "Link + Search + DM + WhatsApp tracking",
  "90%+ of sales captured and attributed",
  "Full search attribution (Google, Bing)",
  "WhatsApp, Instagram DM, Email tracking",
  "Data-driven influencer investment decisions",
];

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="problem">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
            The Hidden Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            The{" "}
            <span className="text-red-400">
              <CountUp target={60} suffix="%" />
            </span>{" "}
            Attribution Gap
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Existing tools only see link clicks. That means 60% of influencer-driven sales
            are completely invisible — and you're making expensive decisions based on incomplete data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-950/30 border border-red-500/20 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <X className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <div className="font-bold text-foreground">Existing Tools</div>
                <div className="text-xs text-muted-foreground">Shopify Collabs, UTM-only tools</div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-background/40 rounded-xl border border-red-500/10">
              <div className="text-4xl font-black text-red-400 mb-1">
                <CountUp target={40} suffix="-60%" />
              </div>
              <div className="text-sm text-muted-foreground">of influencer sales missed</div>
            </div>

            <ul className="space-y-3">
              {problems.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  {p}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-foreground">ROASTrack Deep Tracking</div>
                <div className="text-xs text-muted-foreground">Full-funnel attribution</div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-background/40 rounded-xl border border-emerald-500/10">
              <div className="text-4xl font-black text-emerald-400 mb-1">
                <CountUp target={90} suffix="%+" />
              </div>
              <div className="text-sm text-muted-foreground">of influencer sales captured</div>
            </div>

            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
