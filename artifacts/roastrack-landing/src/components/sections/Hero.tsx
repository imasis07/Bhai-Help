import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Play, TrendingUp, Users, DollarSign, Target, Instagram, Youtube } from "lucide-react";

const influencers = [
  { name: "@ayesha_lifestyle", platform: "Instagram", icon: Instagram, roas: 8.4, sales: "₹2.4L", change: "+34%", up: true, avatar: "AY", color: "from-pink-500 to-rose-500" },
  { name: "@techwithrahul", platform: "YouTube", icon: Youtube, roas: 5.1, sales: "₹1.8L", change: "+19%", up: true, avatar: "TR", color: "from-red-500 to-orange-500" },
  { name: "@priyafitness", platform: "Instagram", icon: Instagram, roas: 3.9, sales: "₹96K", change: "-4%", up: false, avatar: "PF", color: "from-violet-500 to-purple-500" },
  { name: "@delhi_foodie_mk", platform: "Reels", icon: Instagram, roas: 6.7, sales: "₹1.2L", change: "+27%", up: true, avatar: "DF", color: "from-amber-500 to-yellow-500" },
];

const bars = [
  { pct: 38, label: "Link", color: "bg-primary", light: "bg-primary/20" },
  { pct: 29, label: "Search", color: "bg-violet-500", light: "bg-violet-500/20" },
  { pct: 18, label: "WhatsApp", color: "bg-emerald-500", light: "bg-emerald-500/20" },
  { pct: 15, label: "DM", color: "bg-amber-500", light: "bg-amber-500/20" },
];

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 60, h = 24;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

function DashboardMock() {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({ opacity: 1, y: 0, scale: 1 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[500px]"
    >
      {/* Glow halos */}
      <div className="absolute -inset-4 bg-primary/15 rounded-3xl blur-3xl" />
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-transparent to-violet-500/15 rounded-3xl blur-xl" />

      {/* Browser chrome */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: "linear-gradient(145deg, hsl(222 47% 11%), hsl(222 47% 8%))" }}>

        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8"
          style={{ background: "hsl(222 47% 9%)" }}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ROASTrack · Live Dashboard
          </div>
          <div className="text-xs text-white/25">⌘K</div>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "ROAS", value: "6.1×", sub: "↑ vs 3.2× avg", vals: [3, 4, 3.5, 5, 4.8, 6.1], color: "#06b6d4", textColor: "text-primary" },
              { label: "Revenue", value: "₹64.8L", sub: "↑ this month", vals: [30, 38, 42, 50, 58, 64.8], color: "#8b5cf6", textColor: "text-violet-400" },
              { label: "Influencers", value: "47", sub: "active", vals: [20, 28, 33, 38, 43, 47], color: "#10b981", textColor: "text-emerald-400" },
              { label: "Attribution", value: "94%", sub: "↑ vs 38% avg", vals: [50, 62, 70, 80, 88, 94], color: "#f59e0b", textColor: "text-amber-400" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="rounded-xl p-2.5"
                style={{ background: "hsl(222 47% 12%)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="text-[10px] text-white/40 mb-1">{kpi.label}</div>
                <div className={`text-sm font-bold ${kpi.textColor} leading-none`}>{kpi.value}</div>
                <div className="mt-1.5">
                  <Sparkline values={kpi.vals} color={kpi.color} />
                </div>
                <div className="text-[9px] text-white/30 mt-1">{kpi.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Influencer table */}
          <div className="rounded-xl overflow-hidden" style={{ background: "hsl(222 47% 12%)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/6">
              <span className="text-xs font-semibold text-white/70">Influencer Performance</span>
              <span className="text-[10px] text-primary/80 font-medium">View All →</span>
            </div>
            {influencers.map((inf, i) => (
              <motion.div
                key={inf.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-2.5 px-3 py-2 border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors"
              >
                {/* Avatar */}
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${inf.color} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
                  {inf.avatar}
                </div>
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white/85 truncate">{inf.name}</div>
                  <div className="text-[9px] text-white/35">{inf.platform}</div>
                </div>
                {/* ROAS bar */}
                <div className="w-16">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[9px] text-white/40">ROAS</span>
                    <span className="text-[9px] font-bold text-primary">{inf.roas}×</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(inf.roas / 10) * 100}%` }}
                      transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
                {/* Revenue */}
                <div className="text-right w-12">
                  <div className="text-xs font-semibold text-white/85">{inf.sales}</div>
                  <div className={`text-[9px] font-medium ${inf.up ? "text-emerald-400" : "text-red-400"}`}>{inf.change}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Attribution breakdown — horizontal visual bars */}
          <div className="rounded-xl p-3" style={{ background: "hsl(222 47% 12%)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-xs font-semibold text-white/70 mb-2.5">Attribution Channels</div>
            <div className="space-y-1.5">
              {bars.map((bar, i) => (
                <div key={bar.label} className="flex items-center gap-2">
                  <div className="text-[10px] text-white/40 w-14 text-right">{bar.label}</div>
                  <div className="flex-1 h-4 rounded-md bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.pct}%` }}
                      transition={{ delay: 1.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                      className={`h-full ${bar.color} rounded-md flex items-center justify-end pr-1.5`}
                    >
                      <span className="text-[9px] font-bold text-white">{bar.pct}%</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-900/10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Deep Influencer Attribution
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            >
              Know Which Influencer{" "}
              <span className="text-primary text-glow">Actually Drives</span>{" "}
              Your Sales
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Stop guessing. Track influencer ROI beyond link clicks — including search,
              DM, and WhatsApp sales that existing tools completely miss.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="#pricing"
                className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 border border-violet-500/60 bg-violet-500/10 text-violet-300 font-medium px-6 py-3 rounded-xl hover:bg-violet-500/20 hover:border-violet-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-violet-400 fill-violet-400" />
                Watch Demo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[
                  { init: "MH", color: "from-pink-500 to-rose-600" },
                  { init: "VK", color: "from-violet-500 to-purple-600" },
                  { init: "SR", color: "from-primary to-cyan-600" },
                  { init: "PG", color: "from-amber-500 to-orange-600" },
                ].map(({ init, color }, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${color} border-2 border-background flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 text-xs gap-0.5">{"★★★★★"}</div>
                <p className="text-xs text-muted-foreground">Trusted by 50+ D2C brands</p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}
