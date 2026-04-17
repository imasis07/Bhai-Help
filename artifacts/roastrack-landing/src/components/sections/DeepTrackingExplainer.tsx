import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Search, ShoppingCart, CheckCircle, Bookmark, MoreHorizontal, ArrowRight } from "lucide-react";

const SCENE_DURATION = 3200; // ms per scene

/* ─── Scene 1: Instagram Reel ─── */
function SceneReel({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-black overflow-hidden">
      {/* Fake reel background — gradient video */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/40 via-purple-900/60 to-black" />
      {/* Animated shimmer lines to simulate video */}
      <motion.div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 31px)" }}
        animate={active ? { backgroundPositionY: ["0px", "-120px"] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />

      {/* Product visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-28 rounded-2xl bg-gradient-to-br from-amber-200 to-amber-400 border-2 border-amber-300/50 shadow-2xl flex flex-col items-center justify-center gap-1">
            <div className="text-2xl">🧴</div>
            <div className="text-xs font-bold text-amber-900 text-center leading-tight px-1">Mamaearth<br/>Shampoo</div>
          </div>
          {/* Sparkle effects */}
          {[[-20, -15], [22, -8], [-18, 20], [24, 18]].map(([x, y], i) => (
            <motion.div key={i}
              className="absolute text-amber-300 text-xs font-bold"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              animate={active ? { scale: [0, 1.2, 0], opacity: [0, 1, 0] } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }}>
              ✦
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right-side actions */}
      <div className="absolute right-2 bottom-24 flex flex-col items-center gap-4">
        {[
          { icon: Heart, label: "142K", color: "text-red-400" },
          { icon: MessageCircle, label: "2.1K", color: "text-white" },
          { icon: Send, label: "Share", color: "text-white" },
          { icon: Bookmark, label: "Save", color: "text-white" },
        ].map(({ icon: Icon, label, color }, i) => (
          <motion.div key={label} className="flex flex-col items-center gap-0.5"
            initial={{ opacity: 0, x: 10 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1 }}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <span className="text-white/70 text-[8px]">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom creator info */}
      <div className="absolute bottom-4 left-3 right-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">AY</div>
            <span className="text-white text-xs font-bold">@ayesha_lifestyle</span>
            <div className="text-blue-300 text-[9px] border border-blue-300/50 rounded px-1 py-0.5">Follow</div>
          </div>
          <p className="text-white/80 text-[9px] leading-tight">🔥 Game-changing haircare! This Mamaearth shampoo literally transformed my hair 😍 Link in bio!</p>
        </motion.div>
      </div>

      {/* Top label */}
      <div className="absolute top-3 left-0 right-0 flex justify-center">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-[9px] font-medium">Instagram Reel · Playing</div>
      </div>
    </div>
  );
}

/* ─── Scene 2: No Click (scrolling past) ─── */
function SceneNoClick({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 via-purple-900/40 to-black opacity-60" />

      {/* Still showing reel, dimmed */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <div className="w-20 h-28 rounded-2xl bg-gradient-to-br from-amber-200/70 to-amber-400/70 border border-amber-300/30 flex flex-col items-center justify-center gap-1">
          <div className="text-2xl opacity-60">🧴</div>
        </div>
      </div>

      {/* Swipe up gesture animation */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-16 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}>
        <div className="text-white/60 text-[9px]">User swipes past...</div>
        <motion.div
          className="w-8 h-12 border-2 border-white/30 rounded-full flex items-end justify-center pb-1.5"
          animate={active ? {} : {}}>
          <motion.div
            className="w-3 h-3 rounded-full bg-white/60"
            animate={active ? { y: [-12, 0, -12] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>

      {/* Big X — no link click */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}>
        <div className="bg-red-500/20 border-2 border-red-400/50 rounded-full w-16 h-16 flex items-center justify-center">
          <div className="text-red-400 text-3xl font-black">✕</div>
        </div>
      </motion.div>

      {/* Label */}
      <div className="absolute top-3 left-0 right-0 flex justify-center">
        <div className="bg-red-900/60 backdrop-blur-sm rounded-full px-3 py-1 text-red-300 text-[9px] font-medium">No link click · Traditional tools stop here</div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white/50 text-[9px]">Didn't tap "Link in bio"</p>
      </div>
    </div>
  );
}

/* ─── Scene 3: Google Search (2 days later) ─── */
function SceneSearch({ active }: { active: boolean }) {
  const query = "mamaearth shampoo";
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!active) { setTyped(0); return; }
    const t = setTimeout(() => {
      setTyped(0);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(i);
        if (i >= query.length) clearInterval(iv);
      }, 80);
      return () => clearInterval(iv);
    }, 400);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-[9px] text-gray-600 flex items-center gap-1">
          <Search className="w-2.5 h-2.5 text-gray-400" />
          <span>{query.slice(0, typed)}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>|</motion.span></span>
        </div>
      </div>

      {/* "2 days later" badge */}
      <motion.div className="flex justify-center py-2"
        initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
        <div className="bg-violet-100 text-violet-700 text-[8px] font-bold px-2 py-0.5 rounded-full">⏱ 2 days later</div>
      </motion.div>

      {/* Google results */}
      <div className="flex-1 px-3 overflow-hidden">
        {[
          { title: "Mamaearth Onion Shampoo for Hair Growth...", url: "mamaearth.in › shampoo", snippet: "Clinically tested. Reduces hair fall by 96%..." },
          { title: "Buy Mamaearth Shampoo - Best Price Online", url: "amazon.in › beauty", snippet: "₹299 · ⭐ 4.5 · Free delivery" },
          { title: "Mamaearth Hair Care - Official Store", url: "mamaearth.in › hair-care", snippet: "Explore the full range of Mamaearth..." },
        ].map((r, i) => (
          <motion.div key={i} className={`py-2 border-b border-gray-100 ${i === 0 ? "border-t border-gray-100" : ""}`}
            initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.15 }}>
            <div className="text-[8px] text-green-700 mb-0.5">{r.url}</div>
            <div className={`text-[9px] font-medium leading-tight mb-0.5 ${i === 0 ? "text-blue-600 underline" : "text-blue-500"}`}>{r.title}</div>
            <div className="text-[8px] text-gray-500">{r.snippet}</div>
          </motion.div>
        ))}

        {/* Animated click on first result */}
        <motion.div
          className="absolute left-4 top-[calc(30%+2px)]"
          initial={{ opacity: 0, scale: 0 }}
          animate={active ? { opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0] } : {}}
          transition={{ delay: 1.8, duration: 0.5 }}>
          <div className="w-5 h-5 rounded-full bg-violet-400/40 border-2 border-violet-500 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-3 right-3">
        <div className="bg-violet-100 text-violet-700 text-[8px] px-2 py-0.5 rounded-full font-medium">Search happening</div>
      </div>
    </div>
  );
}

/* ─── Scene 4: Product Page + Purchase ─── */
function ScenePurchase({ active }: { active: boolean }) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!active) { setClicked(false); return; }
    const t = setTimeout(() => setClicked(true), 2200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-amber-400" /><div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-[9px] text-gray-500">mamaearth.in/shampoo</div>
        <div className="text-[8px] text-green-600 font-bold">🔒</div>
      </div>

      <div className="flex-1 px-3 py-2 overflow-hidden">
        {/* Product */}
        <motion.div className="flex gap-3 mb-3"
          initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-200 flex items-center justify-center text-2xl shrink-0">🧴</div>
          <div>
            <div className="text-[9px] font-bold text-gray-800 leading-tight mb-1">Mamaearth Onion Shampoo<br/>for Hair Growth, 250ml</div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-amber-400 text-[8px]">★★★★★</span>
              <span className="text-gray-400 text-[8px]">(12,847)</span>
            </div>
            <div className="text-sm font-black text-gray-900">₹299</div>
            <div className="text-[8px] text-emerald-600 font-medium">Free Delivery · In Stock</div>
          </div>
        </motion.div>

        {/* Buy button */}
        <motion.button
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
            clicked
              ? "bg-emerald-500 text-white"
              : "bg-amber-400 text-amber-900 hover:bg-amber-500"
          }`}
          animate={active && !clicked ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          whileTap={{ scale: 0.96 }}>
          {clicked ? "✓ Order Placed!" : "Buy Now"}
        </motion.button>

        {/* Confetti on click */}
        <AnimatePresence>
          {clicked && (
            <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center"
              initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {["🎉", "✨", "🛍️", "💚", "⭐"].map((e, i) => (
                <motion.span key={i} className="absolute text-lg"
                  initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
                  animate={{ y: -60 - i * 15, x: (i - 2) * 25, opacity: 0, scale: 1.5 }}
                  transition={{ delay: i * 0.08, duration: 0.7 }}>
                  {e}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Scene 5: ROASTrack Attribution ─── */
function SceneAttribution({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(145deg, hsl(222 47% 8%), hsl(222 47% 11%))" }}>

      {/* Dashboard header */}
      <div className="px-3 py-2 border-b border-white/8 flex items-center justify-between"
        style={{ background: "hsl(222 47% 9%)" }}>
        <div className="text-[9px] font-bold text-primary">ROASTrack</div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] text-emerald-400">Attribution Match</span>
        </div>
      </div>

      <div className="flex-1 p-3 flex flex-col gap-2.5">
        {/* Attribution notification */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
          className="rounded-xl p-2.5"
          style={{ background: "hsl(142 71% 45% / 0.12)", border: "1px solid hsl(142 71% 45% / 0.4)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[9px] font-bold text-emerald-300">Sale Successfully Attributed!</span>
          </div>
          <div className="text-[8px] text-white/60 leading-relaxed">
            This ₹299 purchase was triggered by<br/>
            <span className="text-white font-semibold">@ayesha_lifestyle</span>'s Instagram reel
            <span className="text-white/40"> → Google Search → Website Purchase</span>
          </div>
        </motion.div>

        {/* Journey visualization */}
        <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <div className="text-[8px] text-white/40 mb-1.5 font-medium uppercase tracking-wider">Attribution Journey</div>
          <div className="flex items-center gap-1">
            {[
              { label: "Reel", icon: "📱", color: "bg-pink-500/20 border-pink-500/40" },
              { label: "Search", icon: "🔍", color: "bg-violet-500/20 border-violet-500/40" },
              { label: "Buy", icon: "🛒", color: "bg-emerald-500/20 border-emerald-500/40" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-1 flex-1">
                <motion.div
                  initial={{ scale: 0 }} animate={active ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.2, type: "spring", stiffness: 300 }}
                  className={`flex-1 rounded-lg p-1.5 border ${s.color} flex flex-col items-center`}>
                  <span className="text-sm">{s.icon}</span>
                  <span className="text-[7px] text-white/60 font-medium">{s.label}</span>
                </motion.div>
                {i < 2 && (
                  <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={active ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.2 }}>
                    <ArrowRight className="w-2.5 h-2.5 text-white/30" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue credited */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="rounded-xl p-2.5"
          style={{ background: "hsl(199 89% 48% / 0.1)", border: "1px solid hsl(199 89% 48% / 0.3)" }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-[8px] font-bold text-white">AY</div>
              <span className="text-[9px] font-semibold text-white/80">@ayesha_lifestyle</span>
            </div>
            <div className="text-[8px] text-emerald-400 font-bold">+1 Sale</div>
          </div>
          <div className="flex justify-between text-[8px] text-white/50">
            <span>ROAS this month</span>
            <span className="text-primary font-bold">8.4×</span>
          </div>
          <div className="mt-1 h-1 rounded-full bg-white/8 overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full"
              initial={{ width: 0 }} animate={active ? { width: "84%" } : {}}
              transition={{ delay: 1.2, duration: 0.6 }} />
          </div>
        </motion.div>

        {/* Bottom insight */}
        <motion.div initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          className="text-center text-[8px] text-white/40">
          Tracked via <span className="text-primary/80">search attribution</span> · 2-day window
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Scene definitions ─── */
const scenes = [
  {
    id: "reel",
    label: "Influencer Posts Reel",
    sublabel: "@ayesha_lifestyle shares Mamaearth shampoo",
    color: "text-pink-400",
    dot: "bg-pink-400",
    Scene: SceneReel,
  },
  {
    id: "noclick",
    label: "User Watches — No Click",
    sublabel: "Doesn't tap the link. Traditional tools see nothing.",
    color: "text-red-400",
    dot: "bg-red-400",
    Scene: SceneNoClick,
  },
  {
    id: "search",
    label: "Googles Brand 2 Days Later",
    sublabel: 'Types "Mamaearth shampoo" — intent re-surfaces',
    color: "text-violet-400",
    dot: "bg-violet-400",
    Scene: SceneSearch,
  },
  {
    id: "buy",
    label: "Lands on Site & Buys",
    sublabel: "Completes ₹299 purchase on mamaearth.in",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    Scene: ScenePurchase,
  },
  {
    id: "attributed",
    label: "ROASTrack Attributes It",
    sublabel: "@ayesha_lifestyle credited. ROAS: 8.4×",
    color: "text-primary",
    dot: "bg-primary",
    Scene: SceneAttribution,
  },
];

export default function DeepTrackingExplainer() {
  const [currentScene, setCurrentScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });

  useEffect(() => {
    if (inView) setPlaying(true);
  }, [inView]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setCurrentScene((s) => (s + 1) % scenes.length);
    }, SCENE_DURATION);
    return () => clearTimeout(t);
  }, [currentScene, playing]);

  const { Scene } = scenes[currentScene];

  return (
    <section className="py-24 bg-card/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            How Deep Tracking Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            We Connect Dots{" "}
            <span className="text-primary">Other Tools Can't See</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how ROASTrack follows a real customer journey — from reel to purchase — across channels no other tool tracks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Phone mockup with animated scene */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone glow */}
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl" />

              {/* Phone frame */}
              <div className="relative w-[220px] h-[420px] rounded-[2.8rem] border-[6px] border-zinc-700 bg-zinc-800 shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.05), 0 32px 64px rgba(0,0,0,0.7)" }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1.5 bg-zinc-900 rounded-full" />
                </div>

                {/* Scene container */}
                <div className="absolute inset-0 overflow-hidden rounded-[2.4rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScene}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <Scene active={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress bar at bottom of phone */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 z-20">
                  <motion.div
                    className="h-full bg-primary"
                    key={currentScene}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Scene dots below phone */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {scenes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentScene(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentScene ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Step list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            {scenes.map((scene, i) => {
              const isActive = i === currentScene;
              const isPast = i < currentScene;
              return (
                <button
                  key={scene.id}
                  onClick={() => setCurrentScene(i)}
                  className={`w-full text-left rounded-2xl px-5 py-4 border transition-all duration-300 group ${
                    isActive
                      ? "bg-card border-primary/40 shadow-lg shadow-primary/5"
                      : "border-transparent hover:border-border hover:bg-card/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Step indicator */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isPast ? "bg-emerald-500/20 border border-emerald-500/40" :
                      isActive ? `${scene.dot} shadow-lg` :
                      "bg-white/5 border border-white/10"
                    }`}>
                      {isPast ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className={`text-xs font-bold ${isActive ? "text-primary-foreground" : "text-white/30"}`}>{i + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold transition-colors duration-200 ${
                        isActive ? scene.color : isPast ? "text-white/50" : "text-white/60"
                      }`}>{scene.label}</div>
                      <div className={`text-xs transition-colors duration-200 ${
                        isActive ? "text-muted-foreground" : "text-white/25"
                      }`}>{scene.sublabel}</div>
                    </div>

                    {/* Progress bar for active step */}
                    {isActive && (
                      <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden shrink-0">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          key={currentScene}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Attribution stat */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex items-center gap-6 bg-card border border-border rounded-2xl px-5 py-4"
            >
              <div className="text-center">
                <div className="text-2xl font-black text-red-400">40%</div>
                <div className="text-xs text-muted-foreground">tools see</div>
              </div>
              <div className="text-muted-foreground font-light text-lg">vs</div>
              <div className="text-center">
                <div className="text-2xl font-black text-primary">94%</div>
                <div className="text-xs text-muted-foreground">we capture</div>
              </div>
              <div className="flex-1 text-xs text-muted-foreground leading-relaxed">
                The <span className="text-foreground font-medium">54% gap</span> is sales that link-only tools never see.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
