import { motion } from "framer-motion";

const brands = [
  "Mamaearth", "boAt", "Plum Goodness", "Wow Skin Science",
  "Nykaa", "Mamamia", "Sugar Cosmetics", "Beardo",
  "mCaffeine", "Minimalist", "The Moms Co.", "Pilgrim",
];

export default function SocialProof() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-14 border-y border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground tracking-widest uppercase"
        >
          Trusted by India's fastest-growing D2C brands
        </motion.p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {doubled.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="mx-8 flex items-center gap-2 shrink-0"
            >
              <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary/60 rounded-sm" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
