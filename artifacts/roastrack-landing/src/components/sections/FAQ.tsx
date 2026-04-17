import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How is this different from Shopify Collabs or UTM tracking?",
    a: "Shopify Collabs and UTM-only tools only track link clicks — if someone doesn't click your influencer's link, that sale is invisible. ROASTrack tracks the complete journey: link clicks, Google searches made after watching the content, Instagram DMs, WhatsApp shares, and email forwards. Most brands discover 40-60% more influencer-attributed sales within their first week.",
  },
  {
    q: "Do I need to install anything?",
    a: "Just one line of JavaScript added to your website's header. It works with Shopify (via a theme snippet), Wix, WooCommerce, or any custom website. The entire setup takes under 2 minutes with no developer required.",
  },
  {
    q: "Which platforms do you support?",
    a: "We track influencer content from Instagram (posts, stories, reels), YouTube, and emerging platforms. For your website, we support Shopify, WooCommerce, Wix, Squarespace, and any custom website. Our tracking pixel is platform-agnostic.",
  },
  {
    q: "How does search attribution work without compromising user privacy?",
    a: "We use cookieless, privacy-compliant fingerprinting techniques combined with probabilistic matching. We never store personal data — only anonymized behavioral patterns. We're fully GDPR and PDPA compliant.",
  },
  {
    q: "What attribution window do you use?",
    a: "The default is a 30-day attribution window (customizable). This means if someone sees influencer content and buys within 30 days — even after searching, browsing, and comparing — that sale is attributed to the influencer.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-card/80 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 scroll-mt-20" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
