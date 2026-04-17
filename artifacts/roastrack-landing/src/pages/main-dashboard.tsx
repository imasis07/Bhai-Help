import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Target, Users, BarChart2, Code2, Settings,
  Search, Bell, ShoppingCart, Megaphone, CheckCircle2, TrendingUp,
  ArrowUpRight, ChevronRight, Star, Zap, Calendar, Menu, X,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

/* ─── Design tokens ─── */
const BG      = "hsl(222,47%,6%)";
const SIDEBAR = "hsl(222,47%,7.5%)";
const CARD    = "hsl(222,47%,9%)";
const BORDER  = "rgba(14,165,233,0.13)";
const PRIMARY = "hsl(199,89%,48%)";
const DIM     = "rgba(255,255,255,0.45)";
const DIM2    = "rgba(255,255,255,0.25)";
const GREEN   = "hsl(142,71%,55%)";
const PURPLE  = "hsl(270,60%,68%)";

/* ─── Mock data ─── */
const salesData = [
  { week: "Wk 1", sales: 820000 },
  { week: "Wk 2", sales: 1450000 },
  { week: "Wk 3", sales: 1100000 },
  { week: "Wk 4", sales: 2300000 },
  { week: "Wk 5", sales: 1900000 },
  { week: "Wk 6", sales: 3200000 },
  { week: "Wk 7", sales: 2700000 },
  { week: "Wk 8", sales: 4800000 },
];

/* Improvement 2: Added roas field */
const influencers = [
  { name: "@ayesha_lifestyle", sales: 12400000, roas: 8.4, pct: 85, avatar: "AL", c1: "hsl(338,82%,52%)", c2: "hsl(22,100%,57%)" },
  { name: "@techwithrahul",    sales: 8200000,  roas: 5.2, pct: 65, avatar: "TR", c1: "hsl(199,89%,48%)", c2: "hsl(270,60%,68%)" },
  { name: "@priya_beauty",     sales: 6500000,  roas: 4.8, pct: 50, avatar: "PB", c1: "hsl(270,60%,68%)", c2: "hsl(338,82%,52%)" },
  { name: "@delhifoodie",      sales: 4200000,  roas: 3.2, pct: 32, avatar: "DF", c1: "hsl(142,71%,45%)", c2: "hsl(199,89%,48%)" },
];

/* Improvement 3: Consistent colors */
const attributionData = [
  { name: "Link Click", value: 38, color: "#3B82F6" },
  { name: "Search",     value: 29, color: "#8B5CF6" },
  { name: "WhatsApp",   value: 18, color: "#F97316" },
  { name: "DM",         value: 15, color: "#10B981" },
];

/* Improvement 4: "—" separator */
const activity = [
  { icon: ShoppingCart, label: "@ayesha_lifestyle ki reel se 12 sales", sub: "₹12,400 — 2 min ago",  color: GREEN  },
  { icon: ShoppingCart, label: "@techwithrahul ki reel se 8 sales",     sub: "₹8,200 — 1 hour ago", color: GREEN  },
  { icon: Megaphone,    label: "New campaign created: \"Summer Sale\"",  sub: "5 hours ago",          color: PRIMARY },
  { icon: CheckCircle2, label: "Pixel installed on mamaearth.in",       sub: "1 day ago",            color: PURPLE },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard"   },
  { icon: Target,          label: "Campaigns"   },
  { icon: Users,           label: "Influencers" },
  { icon: BarChart2,       label: "Reports"     },
  { icon: Code2,           label: "Pixels"      },
];

const timePeriods = ["4W", "8W", "3M", "1Y"];

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ─── Custom tooltip ─── */
function SalesTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs" style={{ background: "hsl(222,47%,13%)", border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
      <div style={{ color: DIM }} className="mb-1">{label}</div>
      <div className="font-bold text-sm" style={{ color: PRIMARY }}>{fmt(payload[0].value)}</div>
    </div>
  );
}

/* ─── Stat card — Improvement 6: hover scale ─── */
function StatCard({ label, value, sub, subColor, icon: Icon, accent }: {
  label: string; value: string; sub: string; subColor?: string; icon: any; accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.025, y: -3, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden cursor-default"
      style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(14,165,233,0.22)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)"; }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: accent + "1a", transform: "translate(30%, -30%)" }} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{label}</span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent + "1a" }}>
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs mt-1 flex items-center gap-1" style={{ color: subColor || DIM }}>
          {subColor && <ArrowUpRight className="w-3 h-3" />}
          {sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function MainDashboard() {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("Dashboard");
  /* Improvement 9: active time period state */
  const [activePeriod, setActivePeriod] = useState("8W");
  /* Improvement 10: mobile sidebar toggle */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: BORDER }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="7" width="3" height="6" rx="0.5" fill={PRIMARY} />
            <rect x="5.5" y="4" width="3" height="9" rx="0.5" fill={PRIMARY} />
            <rect x="10" y="1" width="3" height="12" rx="0.5" fill={PRIMARY} />
          </svg>
        </div>
        <span className="text-sm font-bold text-white tracking-tight">ROASTrack</span>
        <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: "rgba(14,165,233,0.15)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.25)" }}>Pro</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
              style={{
                background: isActive ? "rgba(14,165,233,0.12)" : "transparent",
                color: isActive ? PRIMARY : DIM,
                border: isActive ? "1px solid rgba(14,165,233,0.22)" : "1px solid transparent",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = DIM; e.currentTarget.style.background = "transparent"; } }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 flex flex-col gap-1 border-t pt-3" style={{ borderColor: BORDER }}>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
          style={{ color: DIM }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = DIM; e.currentTarget.style.background = "transparent"; }}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <div className="mt-2 rounded-xl p-3" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3.5 h-3.5" style={{ color: "hsl(45,100%,60%)" }} />
            <span className="text-xs font-semibold text-white">Upgrade Plan</span>
          </div>
          <p className="text-[11px] leading-relaxed mb-2" style={{ color: DIM2 }}>Unlock unlimited influencers & exports.</p>
          <button className="w-full text-xs font-semibold py-1.5 rounded-lg transition-all hover:opacity-90" style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>
            Upgrade →
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: BG }}>

      {/* ══ SIDEBAR desktop ══ */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 h-full border-r" style={{ background: SIDEBAR, borderColor: BORDER }}>
        <SidebarContent />
      </aside>

      {/* ══ SIDEBAR mobile overlay (Improvement 10) ══ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 h-full w-56 z-40 flex flex-col border-r md:hidden"
              style={{ background: SIDEBAR, borderColor: BORDER }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ══ RIGHT SIDE ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── HEADER ── */}
        <header className="flex items-center gap-3 px-4 md:px-6 py-3.5 border-b shrink-0 z-10" style={{ background: SIDEBAR, borderColor: BORDER }}>

          {/* Hamburger (mobile only — Improvement 10) */}
          <button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
            onClick={() => setSidebarOpen(o => !o)}
          >
            {sidebarOpen ? <X className="w-4 h-4" style={{ color: DIM }} /> : <Menu className="w-4 h-4" style={{ color: DIM }} />}
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 flex-1 max-w-xs px-3.5 py-2 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <Search className="w-4 h-4 shrink-0" style={{ color: DIM2 }} />
            <input
              placeholder="Search campaigns, influencers..."
              className="bg-transparent text-sm outline-none flex-1 min-w-0"
              style={{ color: "white" }}
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded hidden sm:block" style={{ background: "rgba(255,255,255,0.05)", color: DIM2 }}>⌘K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <Bell className="w-4 h-4" style={{ color: DIM }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: PRIMARY, boxShadow: `0 0 6px ${PRIMARY}` }} />
            </button>
            <div className="w-px h-6 mx-1 hidden sm:block" style={{ background: BORDER }} />
            <button className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PURPLE})`, color: "white" }}>JD</div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-white leading-none">John Doe</div>
                <div className="text-[11px] mt-0.5" style={{ color: DIM2 }}>Admin</div>
              </div>
            </button>
          </div>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4">

          {/* Page title — Improvement 7: calendar icon */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">Overview</h1>
              <button className="flex items-center gap-1.5 mt-1 group" style={{ color: DIM }}>
                <Calendar className="w-3.5 h-3.5" style={{ color: DIM2 }} />
                <span className="text-sm group-hover:text-white transition-colors">Apr 1 – Apr 17, 2025 · All campaigns</span>
              </button>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
              onClick={() => setLocation("/add-influencer")}
            >
              <Users className="w-4 h-4" />
              Add Influencer
            </button>
          </div>

          {/* ── Row 1: Stat cards — 2×2 on mobile, 4 on desktop (Improvement 10) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Total Sales"        value="₹64.8L" sub="↑ 23% this month"  subColor={GREEN}   icon={TrendingUp} accent={PRIMARY} />
            <StatCard label="ROAS"               value="6.1×"   sub="vs 3.2× avg"        subColor={GREEN}   icon={BarChart2}  accent={PURPLE} />
            <StatCard label="Conv. Rate"         value="3.8%"   sub="↑ 0.4% vs last wk" subColor={GREEN}   icon={Target}     accent={GREEN} />
            <StatCard label="Active Influencers" value="47"     sub="4 added this month" subColor={PRIMARY} icon={Star}       accent="hsl(45,100%,60%)" />
          </div>

          {/* ── Row 2: Sales chart ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl p-4 md:p-5"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-sm font-semibold text-white">Sales Over Time</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>Influencer-attributed revenue, weekly</p>
              </div>
              {/* Improvement 9: stateful active period */}
              <div className="flex items-center gap-1.5">
                {timePeriods.map(t => {
                  const isActive = activePeriod === t;
                  return (
                    <button key={t}
                      onClick={() => setActivePeriod(t)}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all"
                      style={{
                        background: isActive ? PRIMARY : "rgba(255,255,255,0.04)",
                        color: isActive ? "hsl(222,47%,6%)" : DIM2,
                        border: `1px solid ${isActive ? PRIMARY : "rgba(255,255,255,0.08)"}`,
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >{t}</button>
                  );
                })}
              </div>
            </div>

            {/* Improvement 10: horizontal scroll on mobile */}
            <div className="overflow-x-auto">
              <div style={{ minWidth: 340 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={salesData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={PURPLE} />
                        <stop offset="100%" stopColor={PRIMARY} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(14,165,233,0.07)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: DIM2, fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                    {/* Improvement 1: fixed Y-axis domain & ticks */}
                    <YAxis
                      tick={{ fill: DIM2, fontSize: 11 }}
                      axisLine={false} tickLine={false}
                      domain={[0, 6000000]}
                      ticks={[0, 1500000, 3000000, 4500000, 6000000]}
                      tickFormatter={v => v === 0 ? "₹0" : `₹${v / 100000}L`}
                      width={46}
                    />
                    <Tooltip content={<SalesTooltip />} cursor={{ stroke: "rgba(14,165,233,0.15)", strokeWidth: 1 }} />
                    <Line
                      type="monotone" dataKey="sales"
                      stroke="url(#lineGrad)" strokeWidth={2.5}
                      dot={{ fill: PRIMARY, strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, fill: PRIMARY, strokeWidth: 0, style: { filter: `drop-shadow(0 0 6px ${PRIMARY})` } }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* ── Row 3: Influencers + Attribution — stacks on mobile (Improvement 10) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Top influencers */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="rounded-2xl p-4 md:p-5"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-semibold text-white">Top Influencers</h2>
                  <p className="text-xs mt-0.5" style={{ color: DIM2 }}>By attributed sales</p>
                </div>
                <button className="text-xs font-medium transition-opacity hover:opacity-70" style={{ color: PRIMARY }}>View all →</button>
              </div>

              <div className="space-y-4">
                {influencers.map((inf, i) => (
                  <div key={inf.name} className="flex items-center gap-3">
                    {/* Rank */}
                    <span className="text-xs font-bold w-4 shrink-0 text-center" style={{ color: i === 0 ? "hsl(45,100%,60%)" : DIM2 }}>
                      {i + 1}
                    </span>
                    {/* Improvement 8: avatar initials */}
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold ring-2 ring-offset-1"
                      style={{ background: `linear-gradient(135deg, ${inf.c1}, ${inf.c2})`, color: "white", ringColor: inf.c1, ringOffsetColor: CARD }}>
                      {inf.avatar}
                    </div>
                    {/* Bar + name + ROAS (Improvement 2) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5 gap-1">
                        <span className="text-xs font-semibold text-white truncate">{inf.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-xs font-bold" style={{ color: GREEN }}>{fmt(inf.sales)}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(14,165,233,0.12)", color: PRIMARY }}>
                            {inf.roas}×
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${inf.pct}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${inf.c1}, ${inf.c2})` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Attribution chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl p-4 md:p-5 flex flex-col"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-white">Traffic Attribution</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>How customers arrive from influencer content</p>
              </div>

              <div className="flex items-center gap-4 flex-1">
                <div className="shrink-0">
                  <PieChart width={130} height={130}>
                    <Pie
                      data={attributionData} cx="50%" cy="50%"
                      innerRadius={38} outerRadius={58}
                      paddingAngle={3} dataKey="value" stroke="none"
                    >
                      {attributionData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 5px ${entry.color}66)` }} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                {/* Improvement 3: consistent legend colors */}
                <div className="flex-1 space-y-2.5">
                  {attributionData.map(d => (
                    <div key={d.name} className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}99` }} />
                      <span className="text-xs flex-1 text-white">{d.name}</span>
                      <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.15)" }}>
                  <Star className="w-3.5 h-3.5" style={{ color: "hsl(45,100%,60%)" }} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold" style={{ color: DIM2 }}>Top Channel</div>
                  <div className="text-xs font-bold text-white">Link Click — 38%</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Row 4: Recent activity ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="rounded-2xl p-4 md:p-5"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>Live events from your store & influencers</p>
              </div>
              <button className="text-xs font-medium transition-opacity hover:opacity-70" style={{ color: PRIMARY }}>View all →</button>
            </div>

            <div className="divide-y" style={{ borderColor: "rgba(14,165,233,0.08)" }}>
              {activity.map(({ icon: Icon, label, sub, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-4 py-3.5"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{label}</div>
                    {/* Improvement 4: "—" separator */}
                    <div className="text-xs mt-0.5" style={{ color: DIM2 }}>{sub}</div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="h-4" />
        </main>
      </div>
    </div>
  );
}
