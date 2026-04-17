import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Target, Users, BarChart2, Code2, Settings,
  Search, Bell, ShoppingCart, Megaphone, CheckCircle2, TrendingUp,
  ArrowUpRight, ChevronRight, Star, Zap,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

/* ─── Design tokens ─── */
const BG        = "hsl(222,47%,6%)";
const SIDEBAR   = "hsl(222,47%,7.5%)";
const CARD      = "hsl(222,47%,9%)";
const CARD2     = "hsl(222,47%,10.5%)";
const BORDER    = "rgba(14,165,233,0.13)";
const PRIMARY   = "hsl(199,89%,48%)";
const DIM       = "rgba(255,255,255,0.45)";
const DIM2      = "rgba(255,255,255,0.25)";
const GREEN     = "hsl(142,71%,55%)";
const PURPLE    = "hsl(270,60%,68%)";

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

const influencers = [
  { name: "@ayesha_lifestyle", sales: 12400000, pct: 85, avatar: "AL", c1: "hsl(338,82%,52%)", c2: "hsl(22,100%,57%)" },
  { name: "@techwithrahul",    sales: 8200000,  pct: 65, avatar: "TR", c1: "hsl(199,89%,48%)", c2: "hsl(270,60%,68%)" },
  { name: "@priya_beauty",     sales: 6500000,  pct: 50, avatar: "PB", c1: "hsl(270,60%,68%)", c2: "hsl(338,82%,52%)" },
  { name: "@delhifoodie",      sales: 4200000,  pct: 32, avatar: "DF", c1: "hsl(142,71%,45%)", c2: "hsl(199,89%,48%)" },
];

const attributionData = [
  { name: "Link Click", value: 38, color: PRIMARY },
  { name: "Search",     value: 29, color: PURPLE },
  { name: "WhatsApp",   value: 18, color: GREEN },
  { name: "DM",         value: 15, color: "hsl(22,100%,60%)" },
];

const activity = [
  { icon: ShoppingCart, label: "@ayesha_lifestyle ki reel se 12 sales", sub: "₹12,400 • 2 min ago",  color: GREEN  },
  { icon: ShoppingCart, label: "@techwithrahul ki reel se 8 sales",     sub: "₹8,200 • 1 hour ago", color: GREEN  },
  { icon: Megaphone,    label: "New campaign created: \"Summer Sale\"",  sub: "5 hours ago",          color: PRIMARY },
  { icon: CheckCircle2, label: "Pixel installed on mamaearth.in",       sub: "1 day ago",            color: PURPLE },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",   active: true },
  { icon: Target,          label: "Campaigns",   active: false },
  { icon: Users,           label: "Influencers", active: false },
  { icon: BarChart2,       label: "Reports",     active: false },
  { icon: Code2,           label: "Pixels",      active: false },
];

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ─── Custom chart tooltip ─── */
function SalesTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 text-xs" style={{ background: "hsl(222,47%,13%)", border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
      <div style={{ color: DIM }} className="mb-1">{label}</div>
      <div className="font-bold text-sm" style={{ color: PRIMARY }}>{fmt(payload[0].value)}</div>
    </div>
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value, sub, subColor, icon: Icon, accent }: {
  label: string; value: string; sub: string; subColor?: string; icon: any; accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{ background: CARD, border: `1px solid ${BORDER}` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: accent + "18", transform: "translate(30%, -30%)" }} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{label}</span>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent + "18" }}>
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

/* ─── Main component ─── */
export default function MainDashboard() {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: BG }}>

      {/* ══ SIDEBAR (fixed) ══ */}
      <aside
        className="flex flex-col w-56 shrink-0 h-full border-r"
        style={{ background: SIDEBAR, borderColor: BORDER }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: BORDER }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="7" width="3" height="6" rx="0.5" fill={PRIMARY} />
              <rect x="5.5" y="4" width="3" height="9" rx="0.5" fill={PRIMARY} />
              <rect x="10" y="1" width="3" height="12" rx="0.5" fill={PRIMARY} />
            </svg>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">ROASTrack</span>
          <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(14,165,233,0.15)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.25)" }}>Pro</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
                style={{
                  background: isActive ? "rgba(14,165,233,0.12)" : "transparent",
                  color: isActive ? PRIMARY : DIM,
                  border: isActive ? "1px solid rgba(14,165,233,0.2)" : "1px solid transparent",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = DIM; }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom: settings + upgrade */}
        <div className="px-3 pb-4 flex flex-col gap-1 border-t pt-3" style={{ borderColor: BORDER }}>
          <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
            style={{ color: DIM }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.color = DIM)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          {/* Upgrade nudge */}
          <div className="mt-2 rounded-xl p-3" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap className="w-3.5 h-3.5" style={{ color: "hsl(45,100%,60%)" }} />
              <span className="text-xs font-semibold text-white">Upgrade Plan</span>
            </div>
            <p className="text-[11px] leading-relaxed mb-2" style={{ color: DIM2 }}>Unlock unlimited influencers & exports.</p>
            <button className="w-full text-xs font-semibold py-1.5 rounded-lg transition-all" style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>
              Upgrade →
            </button>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT SIDE ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── HEADER (fixed) ── */}
        <header
          className="flex items-center gap-4 px-6 py-3.5 border-b shrink-0 z-10"
          style={{ background: SIDEBAR, borderColor: BORDER }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 max-w-xs px-3.5 py-2 rounded-xl"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: DIM2 }} />
            <input
              placeholder="Search campaigns, influencers..."
              className="bg-transparent text-sm outline-none flex-1 text-white placeholder:text-opacity-30"
              style={{ color: "white" }}
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: DIM2 }}>⌘K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Bell */}
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <Bell className="w-4 h-4" style={{ color: DIM }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: PRIMARY, boxShadow: `0 0 6px ${PRIMARY}` }} />
            </button>

            {/* Divider */}
            <div className="w-px h-6 mx-1" style={{ background: BORDER }} />

            {/* User */}
            <button className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PURPLE})`, color: "white" }}>
                JD
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-white leading-none">John Doe</div>
                <div className="text-[11px] mt-0.5" style={{ color: DIM2 }}>Admin</div>
              </div>
            </button>
          </div>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {/* Page title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Overview</h1>
              <p className="text-sm mt-0.5" style={{ color: DIM }}>Apr 1 – Apr 17, 2025 &nbsp;·&nbsp; All campaigns</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
              onClick={() => setLocation("/add-influencer")}
            >
              <Users className="w-4 h-4" />
              Add Influencer
            </button>
          </div>

          {/* ── Row 1: Stat cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Sales"        value="₹64.8L"   sub="↑ 23% this month"   subColor={GREEN}   icon={TrendingUp}   accent={PRIMARY} />
            <StatCard label="ROAS"               value="6.1×"     sub="vs 3.2× avg"         subColor={GREEN}   icon={BarChart2}    accent={PURPLE} />
            <StatCard label="Conv. Rate"         value="3.8%"     sub="↑ 0.4% vs last wk"  subColor={GREEN}   icon={Target}       accent="hsl(142,71%,55%)" />
            <StatCard label="Active Influencers" value="47"       sub="4 added this month"  subColor={PRIMARY} icon={Star}         accent="hsl(45,100%,60%)" />
          </div>

          {/* ── Row 2: Sales chart ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl p-5"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Sales Over Time</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>Influencer-attributed revenue, weekly</p>
              </div>
              <div className="flex items-center gap-2">
                {["4W", "8W", "3M", "1Y"].map(t => (
                  <button key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
                    style={{ background: t === "8W" ? "rgba(14,165,233,0.15)" : "transparent", color: t === "8W" ? PRIMARY : DIM2, border: `1px solid ${t === "8W" ? "rgba(14,165,233,0.3)" : "transparent"}` }}
                  >{t}</button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={salesData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={PURPLE} />
                    <stop offset="100%" stopColor={PRIMARY} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(14,165,233,0.07)" vertical={false} />
                <XAxis dataKey="week" tick={{ fill: DIM2, fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: DIM2, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 100000}L`} width={44} />
                <Tooltip content={<SalesTooltip />} cursor={{ stroke: "rgba(14,165,233,0.15)", strokeWidth: 1 }} />
                <Line
                  type="monotone" dataKey="sales"
                  stroke="url(#lineGrad)" strokeWidth={2.5}
                  dot={{ fill: PRIMARY, strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: PRIMARY, strokeWidth: 0, style: { filter: `drop-shadow(0 0 6px ${PRIMARY})` } }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* ── Row 3: Influencers + Attribution ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Top influencers */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="rounded-2xl p-5"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-semibold text-white">Top Influencers</h2>
                  <p className="text-xs mt-0.5" style={{ color: DIM2 }}>By attributed sales</p>
                </div>
                <button className="text-xs font-medium transition-colors" style={{ color: PRIMARY }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  View all →
                </button>
              </div>

              <div className="space-y-4">
                {influencers.map((inf, i) => (
                  <div key={inf.name} className="flex items-center gap-3">
                    {/* Rank */}
                    <span className="text-xs font-bold w-4 shrink-0 text-center" style={{ color: i === 0 ? "hsl(45,100%,60%)" : DIM2 }}>
                      {i + 1}
                    </span>
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${inf.c1}, ${inf.c2})`, color: "white" }}>
                      {inf.avatar}
                    </div>
                    {/* Bar + name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-white truncate">{inf.name}</span>
                        <span className="text-xs font-bold ml-2 shrink-0" style={{ color: GREEN }}>{fmt(inf.sales)}</span>
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl p-5 flex flex-col"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-white">Traffic Attribution</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>How customers arrive from influencer content</p>
              </div>

              <div className="flex items-center gap-4 flex-1">
                {/* Pie */}
                <div className="shrink-0">
                  <ResponsiveContainer width={130} height={130}>
                    <PieChart>
                      <Pie
                        data={attributionData} cx="50%" cy="50%"
                        innerRadius={38} outerRadius={58}
                        paddingAngle={3} dataKey="value"
                        stroke="none"
                      >
                        {attributionData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} style={{ filter: `drop-shadow(0 0 4px ${entry.color}55)` }} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2.5">
                  {attributionData.map(d => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}80` }} />
                      <span className="text-xs flex-1 text-white">{d.name}</span>
                      <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top channel badge */}
              <div className="mt-4 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)" }}>
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="rounded-2xl p-5"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
                <p className="text-xs mt-0.5" style={{ color: DIM2 }}>Live events from your store & influencers</p>
              </div>
              <button className="text-xs font-medium" style={{ color: PRIMARY }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                View all →
              </button>
            </div>

            <div className="divide-y" style={{ borderColor: "rgba(14,165,233,0.08)" }}>
              {activity.map(({ icon: Icon, label, sub, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-4 py-3.5"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + "18" }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{label}</div>
                    <div className="text-xs mt-0.5" style={{ color: DIM2 }}>{sub}</div>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* bottom padding */}
          <div className="h-4" />
        </main>
      </div>
    </div>
  );
}
