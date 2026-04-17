import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We couldn't tell which influencer was actually driving real sales. ROASTrack tracked 60% extra sales that never came from link clicks. It completely changed how we allocate our influencer budget.",
    name: "Priya Mehta",
    role: "Head of Growth Marketing",
    company: "Mamaearth",
    initials: "PM",
    metric: "+60%",
    metricLabel: "more sales tracked",
    accentFrom: "from-pink-500",
    accentTo: "to-rose-600",
    glowColor: "hsl(340 82% 52% / 0.08)",
    borderColor: "hsl(340 82% 52% / 0.25)",
  },
  {
    quote: "The search attribution feature alone was worth it. We discovered 35% of our influencer-driven sales came from Google searches days after content went live. We had absolutely no idea.",
    name: "Vikram Sharma",
    role: "D2C Marketing Director",
    company: "boAt Lifestyle",
    initials: "VS",
    metric: "35%",
    metricLabel: "sales via search",
    accentFrom: "from-primary",
    accentTo: "to-cyan-400",
    glowColor: "hsl(199 89% 48% / 0.08)",
    borderColor: "hsl(199 89% 48% / 0.25)",
  },
  {
    quote: "Our ROAS calculations were completely off before ROASTrack. Now we know exactly which influencers deserve a bigger budget. Spend efficiency improved 2.4x in just 3 months.",
    name: "Sneha Gupta",
    role: "Brand Manager",
    company: "Plum Goodness",
    initials: "SG",
    metric: "2.4x",
    metricLabel: "spend efficiency",
    accentFrom: "from-violet-500",
    accentTo: "to-purple-600",
    glowColor: "hsl(270 76% 53% / 0.08)",
    borderColor: "hsl(270 76% 53% / 0.25)",
  },
];

export default function Testimonial() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            Real Results
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
            What D2C Brands{" "}
            <span className="text-primary">Actually Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Brands who switched from guessing to knowing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Card glow */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${t.glowColor}, transparent 70%)` }}
              />

              <div
                className="relative rounded-2xl p-8 flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  background: "hsl(222 47% 9%)",
                  border: `1px solid ${t.borderColor}`,
                  boxShadow: `0 0 0 1px hsl(222 47% 13%)`,
                }}
              >
                {/* Large decorative quote */}
                <div
                  className="absolute -top-2 -right-2 text-[120px] font-black leading-none select-none pointer-events-none opacity-5"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "
                </div>

                {/* Accent top bar */}
                <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${t.accentFrom} ${t.accentTo} opacity-60`} />

                {/* Stars */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + s * 0.05 + 0.3, type: "spring", stiffness: 400 }}
                      className="text-amber-400 text-sm"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[15px] text-white/70 leading-relaxed flex-1 mb-8 relative z-10">
                  "{t.quote}"
                </p>

                {/* Bottom: person + metric */}
                <div
                  className="flex items-center justify-between pt-6 mt-auto"
                  style={{ borderTop: "1px solid hsl(222 47% 16%)" }}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.accentFrom} ${t.accentTo} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/40">{t.role}</div>
                      <div className={`text-xs font-semibold mt-0.5 bg-gradient-to-r ${t.accentFrom} ${t.accentTo} bg-clip-text text-transparent`}>
                        {t.company}
                      </div>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="text-right shrink-0">
                    <div className={`text-2xl font-black bg-gradient-to-br ${t.accentFrom} ${t.accentTo} bg-clip-text text-transparent`}>
                      {t.metric}
                    </div>
                    <div className="text-[10px] text-white/35 leading-tight">{t.metricLabel}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="text-foreground font-semibold">50+ D2C brands</span>{" "}
            across India — from bootstrapped to Series B.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
