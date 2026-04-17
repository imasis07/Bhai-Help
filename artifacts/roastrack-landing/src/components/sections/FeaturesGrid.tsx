import { motion } from "framer-motion";
import { Link2, Search, MessageSquare, GitBranch, Trophy, Activity } from "lucide-react";

/* ── Animated illustration components ── */

function LinkTrackingAnim() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Link chain */}
        <motion.rect x="10" y="32" width="36" height="16" rx="8"
          stroke="hsl(199 89% 48%)" strokeWidth="2" fill="hsl(199 89% 48% / 0.12)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
        <motion.rect x="74" y="32" width="36" height="16" rx="8"
          stroke="hsl(199 89% 48%)" strokeWidth="2" fill="hsl(199 89% 48% / 0.12)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
        {/* Connection line */}
        <motion.line x1="46" y1="40" x2="74" y2="40"
          stroke="hsl(199 89% 48%)" strokeWidth="2" strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }} />
        {/* Animated dot traveling */}
        <motion.circle r="3.5" fill="hsl(199 89% 48%)"
          initial={{ cx: 46, cy: 40 }}
          animate={{ cx: [46, 74], cy: [40, 40] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }} />
        {/* Link text */}
        <text x="28" y="44" textAnchor="middle" fontSize="5" fill="hsl(199 89% 48% / 0.9)" fontWeight="600">Click</text>
        <text x="92" y="44" textAnchor="middle" fontSize="5" fill="hsl(199 89% 48% / 0.9)" fontWeight="600">Buy</text>
        {/* Tick */}
        <motion.path d="M82 56 l4 4 l8-8" stroke="hsl(142 71% 45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.4 }} />
      </svg>
    </div>
  );
}

function SearchAnim() {
  const terms = ["Mamaearth", "boAt", "Plum"];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {/* Search bar */}
        <rect x="10" y="18" width="80" height="16" rx="8"
          fill="hsl(280 65% 60% / 0.12)" stroke="hsl(280 65% 60% / 0.5)" strokeWidth="1.5" />
        <circle cx="80" cy="26" r="5" fill="none" stroke="hsl(280 65% 60%)" strokeWidth="1.8" />
        <line x1="84" y1="30" x2="88" y2="34" stroke="hsl(280 65% 60%)" strokeWidth="1.8" strokeLinecap="round" />
        {/* Animated typing text */}
        {terms.map((term, i) => (
          <motion.text key={term} x="18" y="29" fontSize="6" fill="hsl(280 65% 60% / 0.9)" fontWeight="500"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: i * 1.5, duration: 1.4, repeat: Infinity, repeatDelay: terms.length * 1.5 - 1.4 }}>
            {term} shampoo
          </motion.text>
        ))}
        {/* Results */}
        {[0, 1, 2].map((j) => (
          <motion.rect key={j} x="10" y={40 + j * 11} width={60 + j * 5} height="7" rx="3.5"
            fill="hsl(280 65% 60% / 0.15)" stroke="hsl(280 65% 60% / 0.2)" strokeWidth="1"
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4 + j * 0.15, duration: 0.4 }} style={{ originX: "left" }} />
        ))}
        {/* Attribution arrow */}
        <motion.path d="M100 26 Q110 26 110 56 L100 56" stroke="hsl(142 71% 45%)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          strokeDasharray="3 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 0.8 }} />
        <motion.text x="101" y="68" fontSize="5.5" fill="hsl(142 71% 45%)" fontWeight="700"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>✓ Tracked</motion.text>
      </svg>
    </div>
  );
}

function DarkSocialAnim() {
  const bubbles = [
    { x: 18, y: 18, w: 60, text: "Check this product!", color: "hsl(142 71% 45%)", delay: 0 },
    { x: 42, y: 34, w: 48, text: "Shared link →", color: "hsl(199 89% 48%)", delay: 0.4 },
    { x: 18, y: 50, w: 55, text: "Just bought it!", color: "hsl(38 92% 50%)", delay: 0.8 },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 120 80" className="w-full h-full">
        {bubbles.map((b, i) => (
          <motion.g key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: b.delay, duration: 0.4, repeat: Infinity, repeatDelay: bubbles.length * 0.8 + 1 }}>
            <rect x={b.x} y={b.y} width={b.w} height="11" rx="5.5"
              fill={`${b.color}22`} stroke={`${b.color}88`} strokeWidth="1.2" />
            <text x={b.x + 6} y={b.y + 7.5} fontSize="5" fill={b.color} fontWeight="500">{b.text}</text>
          </motion.g>
        ))}
        {/* WhatsApp icon */}
        <motion.circle cx="105" cy="40" r="10" fill="hsl(142 71% 45% / 0.15)"
          stroke="hsl(142 71% 45% / 0.5)" strokeWidth="1.5"
          animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x="105" y="43.5" textAnchor="middle" fontSize="9" fill="hsl(142 71% 45%)">💬</text>
      </svg>
    </div>
  );
}

function MultiTouchAnim() {
  const nodes = [
    { cx: 20, cy: 40, label: "Click", color: "hsl(199 89% 48%)" },
    { cx: 50, cy: 20, label: "Search", color: "hsl(280 65% 60%)" },
    { cx: 50, cy: 60, label: "DM", color: "hsl(38 92% 50%)" },
    { cx: 80, cy: 40, label: "Buy", color: "hsl(142 71% 45%)" },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3]];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {edges.map(([a, b], i) => (
          <motion.line key={i}
            x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="hsl(199 89% 48% / 0.3)" strokeWidth="1.5" strokeDasharray="3 2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }} />
        ))}
        {/* Traveling dots */}
        {edges.map(([a, b], i) => (
          <motion.circle key={`dot-${i}`} r="2.5" fill="hsl(199 89% 48%)"
            initial={{ cx: nodes[a].cx, cy: nodes[a].cy }}
            animate={{ cx: [nodes[a].cx, nodes[b].cx], cy: [nodes[a].cy, nodes[b].cy] }}
            transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }} />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}>
            <circle cx={n.cx} cy={n.cy} r="9" fill={`${n.color}20`} stroke={`${n.color}80`} strokeWidth="1.5" />
            <text x={n.cx} y={n.cy + 3} textAnchor="middle" fontSize="4.5" fill={n.color} fontWeight="600">{n.label}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function RankingAnim() {
  const bars = [
    { label: "@ayesha", value: 84, color: "hsl(199 89% 48%)" },
    { label: "@rahul", value: 67, color: "hsl(280 65% 60%)" },
    { label: "@priya", value: 51, color: "hsl(38 92% 50%)" },
    { label: "@foodie", value: 39, color: "hsl(340 75% 55%)" },
  ];
  return (
    <div className="w-full h-full flex items-center justify-end gap-2 px-3 pb-2 pt-3">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center justify-end gap-1" style={{ height: "70px", flex: 1 }}>
          <div className="text-[8px] font-bold" style={{ color: bar.color }}>{bar.value}%</div>
          <div className="w-full rounded-t-md overflow-hidden relative" style={{ height: `${bar.value * 0.55}px`, background: `${bar.color}22`, border: `1px solid ${bar.color}40` }}>
            <motion.div className="absolute bottom-0 left-0 right-0 rounded-t-md"
              style={{ background: `linear-gradient(to top, ${bar.color}, ${bar.color}88)` }}
              initial={{ height: 0 }} whileInView={{ height: "100%" }}
              viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }} />
          </div>
          <div className="text-[7px] text-muted-foreground text-center leading-tight truncate w-full px-0.5">{bar.label}</div>
        </div>
      ))}
    </div>
  );
}

function RealtimeAnim() {
  const pts = [10, 18, 15, 25, 22, 35, 30, 42, 38, 50, 45, 58];
  const w = 100, h = 60;
  const max = Math.max(...pts);
  const svgPts = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 8)}`).join(" ");
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(199 89% 48%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(199 89% 48%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill */}
        <motion.polygon
          points={`0,${h} ${svgPts} ${w},${h}`}
          fill="url(#rtGrad)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} />
        {/* Line */}
        <motion.polyline points={svgPts} fill="none" stroke="hsl(199 89% 48%)"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }} />
        {/* Live dot */}
        <motion.circle
          cx={w} cy={h - (pts[pts.length - 1] / max) * (h - 8)} r="4"
          fill="hsl(199 89% 48%)"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.circle
          cx={w} cy={h - (pts[pts.length - 1] / max) * (h - 8)} r="8"
          fill="none" stroke="hsl(199 89% 48%)" strokeWidth="1"
          animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }} />
        {/* LIVE label */}
        <motion.g animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          <rect x="72" y="2" width="24" height="10" rx="5" fill="hsl(142 71% 45% / 0.2)" stroke="hsl(142 71% 45% / 0.5)" strokeWidth="1" />
          <text x="84" y="9" textAnchor="middle" fontSize="5" fill="hsl(142 71% 45%)" fontWeight="700">LIVE</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ── Feature data ── */
const features = [
  {
    icon: Link2,
    title: "Deep Link Tracking",
    description: "Every click tracked across the full conversion window — first visit to final purchase.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    AnimComp: LinkTrackingAnim,
    animBg: "bg-primary/5",
  },
  {
    icon: Search,
    title: "Search Attribution",
    description: "See how many buyers Googled your brand after watching influencer content.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    AnimComp: SearchAnim,
    animBg: "bg-violet-500/5",
  },
  {
    icon: MessageSquare,
    title: "Dark Social Tracking",
    description: "WhatsApp, Instagram DMs, email shares — tracked and attributed. Nothing disappears.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    AnimComp: DarkSocialAnim,
    animBg: "bg-emerald-500/5",
  },
  {
    icon: GitBranch,
    title: "Multi-Touch Attribution",
    description: "First-click, last-click, linear, time-decay — switch models without losing history.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    AnimComp: MultiTouchAnim,
    animBg: "bg-amber-500/5",
  },
  {
    icon: Trophy,
    title: "Influencer Ranking",
    description: "Ranked by real ROAS, not follower count. Invest where it actually converts.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    AnimComp: RankingAnim,
    animBg: "bg-rose-500/5",
  },
  {
    icon: Activity,
    title: "Real-Time Dashboard",
    description: "Live views, clicks, sales, and ROAS — all updating in real time, one screen.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    AnimComp: RealtimeAnim,
    animBg: "bg-cyan-500/5",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 scroll-mt-20" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            Full Feature Set
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need to{" "}
            <span className="text-primary">Stop Guessing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built specifically for D2C brands running influencer campaigns in India's complex, multi-channel customer journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-card border ${feature.border} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-default`}
            >
              {/* Animation panel */}
              <div className={`h-28 ${feature.animBg} border-b ${feature.border}`}>
                <feature.AnimComp />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`w-7 h-7 rounded-lg ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shrink-0`}>
                    <feature.icon className={`w-3.5 h-3.5 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
