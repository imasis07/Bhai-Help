import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Target, Users, BarChart2, Code2, Settings,
  Search, Bell, ShoppingCart, Megaphone, CheckCircle2, TrendingUp,
  ArrowUpRight, ChevronRight, Star, Zap, Calendar, Menu, X,
  Eye, Link2, MessageCircle, Mail,
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

/* ─── Campaign mock data ─── */
const campaigns = [
  {
    name: "Summer Sale",
    emoji: "📢",
    status: "Active",
    budget: 50000,
    spent: 48000,
    sales: 250000,
    roas: 5.2,
    influencers: 5,
    created: "Apr 1, 2025",
  },
  {
    name: "Winter Collection",
    emoji: "❄️",
    status: "Active",
    budget: 30000,
    spent: 28000,
    sales: 180000,
    roas: 6.0,
    influencers: 3,
    created: "Apr 5, 2025",
  },
  {
    name: "Festival Offer",
    emoji: "🎉",
    status: "Draft",
    budget: 40000,
    spent: 0,
    sales: 0,
    roas: 0.0,
    influencers: 0,
    created: "Apr 10, 2025",
  },
];

const timePeriods = ["4W", "8W", "3M", "1Y"];

/* ─── Influencer extended mock data ─── */
const influencerExtData = [
  { handle: "@ayesha_lifestyle", niche: "Fashion", followers: "250K", campaign: "Summer Sale",      views: 45000, linkClick: 1200, google: 890, whatsapp: 45, dm: 89, sales: 1240000, roas: 8.4, avatar: "AL", c1: "hsl(338,82%,52%)", c2: "hsl(22,100%,57%)"   },
  { handle: "@techwithrahul",    niche: "Tech",    followers: "180K", campaign: "Summer Sale",      views: 32000, linkClick: 800,  google: 620, whatsapp: 23, dm: 45, sales: 820000,  roas: 5.2, avatar: "TR", c1: "hsl(199,89%,48%)", c2: "hsl(270,60%,68%)"  },
  { handle: "@priya_beauty",     niche: "Beauty",  followers: "120K", campaign: "Winter Collection", views: 28000, linkClick: 600,  google: 450, whatsapp: 18, dm: 32, sales: 650000,  roas: 4.8, avatar: "PB", c1: "hsl(270,60%,68%)", c2: "hsl(338,82%,52%)"  },
  { handle: "@delhifoodie",      niche: "Food",    followers: "95K",  campaign: "Festival Offer",   views: 18000, linkClick: 350,  google: 280, whatsapp: 12, dm: 18, sales: 420000,  roas: 3.2, avatar: "DF", c1: "hsl(142,71%,45%)", c2: "hsl(199,89%,48%)"  },
];

const metricMaxValues = {
  views:     Math.max(...influencerExtData.map(d => d.views)),
  linkClick: Math.max(...influencerExtData.map(d => d.linkClick)),
  google:    Math.max(...influencerExtData.map(d => d.google)),
  whatsapp:  Math.max(...influencerExtData.map(d => d.whatsapp)),
  dm:        Math.max(...influencerExtData.map(d => d.dm)),
  sales:     Math.max(...influencerExtData.map(d => d.sales)),
};

/* ─── Campaigns Section component ─── */
function CampaignsSection() {
  const [campaignFilter, setCampaignFilter] = useState("All");

  const filterTabs = [
    { label: "All Campaigns", key: "All",    count: campaigns.length },
    { label: "Active",        key: "Active", count: campaigns.filter(c => c.status === "Active").length },
    { label: "Draft",         key: "Draft",  count: campaigns.filter(c => c.status === "Draft").length },
  ];

  const filtered = campaignFilter === "All"
    ? campaigns
    : campaigns.filter(c => c.status === campaignFilter);

  return (
    <motion.div
      key="campaigns"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {/* Title row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Campaigns</h1>
          <p className="text-sm mt-0.5" style={{ color: DIM }}>Manage your influencer campaigns</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
        >
          + New Campaign
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        {filterTabs.map(tab => {
          const isActive = campaignFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setCampaignFilter(tab.key)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: isActive ? PRIMARY : "transparent",
                color: isActive ? "hsl(222,47%,6%)" : DIM,
              }}
            >
              {tab.label}
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.07)",
                  color: isActive ? "hsl(222,47%,6%)" : DIM2,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Campaign cards */}
      <div className="space-y-3">
        {filtered.map((c, i) => {
          const budgetPct = c.budget > 0 ? Math.round((c.spent / c.budget) * 100) : 0;
          const isActive = c.status === "Active";
          const barColor = budgetPct >= 90 ? "hsl(22,100%,57%)" : PRIMARY;

          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="rounded-2xl p-5"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{
                      background: isActive ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isActive ? "rgba(14,165,233,0.22)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {c.emoji}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{c.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: DIM2 }}>Created: {c.created}</div>
                  </div>
                </div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                  style={
                    isActive
                      ? { background: "rgba(34,197,94,0.12)", color: GREEN, border: "1px solid rgba(34,197,94,0.25)" }
                      : { background: "rgba(255,255,255,0.06)", color: DIM, border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {c.status}
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Budget", value: `₹${c.budget.toLocaleString("en-IN")}` },
                  { label: "Spent",  value: `₹${c.spent.toLocaleString("en-IN")}` },
                  { label: "Sales",  value: `₹${c.sales.toLocaleString("en-IN")}` },
                  { label: "ROAS",   value: `${c.roas.toFixed(1)}×` },
                ].map(m => (
                  <div key={m.label} className="rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DIM2 }}>{m.label}</div>
                    <div className="text-sm font-bold text-white">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Influencers count */}
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-3.5 h-3.5 shrink-0" style={{ color: DIM2 }} />
                <span className="text-xs" style={{ color: DIM }}>
                  <span className="font-semibold text-white">{c.influencers}</span> Influencer{c.influencers !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: DIM2 }}>Budget Used</span>
                  <span className="text-[11px] font-bold" style={{ color: budgetPct >= 90 ? barColor : DIM }}>{budgetPct}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${budgetPct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: budgetPct > 0 ? `linear-gradient(90deg, ${PRIMARY}, ${barColor})` : "transparent" }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.22)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = PRIMARY; e.currentTarget.style.color = "hsl(222,47%,6%)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.color = PRIMARY; }}
                >
                  {isActive ? "View Details" : "Edit Draft"}
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: "rgba(239,68,68,0.08)", color: "hsl(0,84%,70%)", border: "1px solid rgba(239,68,68,0.2)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

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

/* ─── Influencers Section component ─── */
function InfluencersSection() {
  const [search, setSearch]             = useState("");
  const [campaignFilter, setCampaignFilter] = useState("All Campaigns");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage]                 = useState(1);

  const TOTAL    = 12;
  const PER_PAGE = 4;
  const totalPages = Math.ceil(TOTAL / PER_PAGE);

  function fmtK(n: number) {
    if (n >= 10000) return `${Math.round(n / 1000)}K`;
    if (n >= 1000)  return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  }

  const campaignOptions = ["All Campaigns", "Summer Sale", "Winter Collection", "Festival Offer"];

  const filtered = influencerExtData.filter(inf => {
    const q = search.toLowerCase();
    const matchSearch   = !search || inf.handle.toLowerCase().includes(q);
    const matchCampaign = campaignFilter === "All Campaigns" || inf.campaign === campaignFilter;
    return matchSearch && matchCampaign;
  });

  const roasColor = (r: number) =>
    r >= 7 ? GREEN : r >= 5 ? PRIMARY : r >= 3.5 ? "hsl(45,100%,60%)" : DIM;

  return (
    <motion.div
      key="influencers"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {/* ─ Title row ─ */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Influencers</h1>
          <p className="text-sm mt-0.5" style={{ color: DIM }}>Manage your influencer partnerships</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
        >
          <Users className="w-4 h-4" />
          + Add Influencer
        </button>
      </div>

      {/* ─ Search + Filter row ─ */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <Search className="w-4 h-4 shrink-0" style={{ color: DIM2 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or handle..."
            className="bg-transparent text-sm outline-none flex-1 text-white"
            style={{ caretColor: PRIMARY }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: DIM2 }}>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Campaign dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
            style={{ background: CARD, border: `1px solid ${dropdownOpen ? PRIMARY : BORDER}`, color: dropdownOpen ? PRIMARY : DIM }}
          >
            {campaignFilter}
            <ChevronRight
              className="w-3.5 h-3.5 transition-transform duration-200"
              style={{ transform: dropdownOpen ? "rotate(270deg)" : "rotate(90deg)" }}
            />
          </button>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-1.5 z-20 min-w-[190px] rounded-xl overflow-hidden py-1"
              style={{ background: "hsl(222,47%,10%)", border: `1px solid ${BORDER}`, boxShadow: "0 16px 40px rgba(0,0,0,0.55)" }}
            >
              {campaignOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setCampaignFilter(opt); setDropdownOpen(false); }}
                  className="w-full px-4 py-2.5 text-sm text-left flex items-center gap-2 transition-all"
                  style={{ color: campaignFilter === opt ? PRIMARY : DIM, background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,0.07)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {campaignFilter === opt && <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: PRIMARY }} />}
                  {campaignFilter !== opt && <div className="w-1.5 h-1.5" />}
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ─ Cards grid ─ */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <Users className="w-10 h-10 mx-auto mb-3" style={{ color: DIM2 }} />
          <p className="text-sm font-medium text-white">No influencers found</p>
          <p className="text-xs mt-1" style={{ color: DIM2 }}>Try changing your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((inf, i) => {
            const metricRows = [
              { label: "Views",      Icon: Eye,           value: fmtK(inf.views),     color: PRIMARY,   pct: (inf.views     / metricMaxValues.views)     * 100 },
              { label: "Link Click", Icon: Link2,         value: fmtK(inf.linkClick), color: "#3B82F6", pct: (inf.linkClick / metricMaxValues.linkClick) * 100 },
              { label: "Google",     Icon: Search,        value: fmtK(inf.google),    color: "#8B5CF6", pct: (inf.google    / metricMaxValues.google)    * 100 },
              { label: "WhatsApp",   Icon: MessageCircle, value: fmtK(inf.whatsapp),  color: GREEN,     pct: (inf.whatsapp  / metricMaxValues.whatsapp)  * 100 },
              { label: "DM",         Icon: Mail,          value: fmtK(inf.dm),        color: "#F97316", pct: (inf.dm        / metricMaxValues.dm)        * 100 },
              { label: "Sales",      Icon: ShoppingCart,  value: fmt(inf.sales),      color: GREEN,     pct: (inf.sales     / metricMaxValues.sales)     * 100 },
            ];
            const rc = roasColor(inf.roas);

            return (
              <motion.div
                key={inf.handle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(14,165,233,0.18)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* Header: avatar + info + ROAS */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ring-2 ring-offset-2"
                    style={{ background: `linear-gradient(135deg, ${inf.c1}, ${inf.c2})`, color: "white", ringColor: inf.c1, ringOffsetColor: CARD }}
                  >
                    {inf.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{inf.handle}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{ background: `${inf.c1}20`, color: inf.c1 }}>
                        {inf.niche}
                      </span>
                      <span className="text-[11px]" style={{ color: DIM2 }}>{inf.followers} followers</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: DIM2 }}>ROAS</div>
                    <div className="text-xl font-bold" style={{ color: rc, textShadow: `0 0 12px ${rc}66` }}>{inf.roas}×</div>
                  </div>
                </div>

                {/* Campaign tag */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Target className="w-3.5 h-3.5 shrink-0" style={{ color: DIM2 }} />
                  <span className="text-xs flex-1 truncate" style={{ color: DIM }}>{inf.campaign}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: "rgba(34,197,94,0.12)", color: GREEN, border: "1px solid rgba(34,197,94,0.2)" }}>
                    Active
                  </span>
                </div>

                {/* Metrics — animated bars */}
                <div className="space-y-1.5">
                  {metricRows.map(({ label, Icon, value, color, pct }, mi) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5 shrink-0" style={{ width: 88 }}>
                        <Icon className="w-3 h-3 shrink-0" style={{ color }} />
                        <span className="text-[11px] truncate" style={{ color: DIM2 }}>{label}</span>
                      </div>
                      <div className="flex-1 h-6 rounded-md relative overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(pct, 15)}%` }}
                          transition={{ duration: 0.75, delay: 0.1 + i * 0.06 + mi * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-y-0 left-0 rounded-md flex items-center justify-end pr-2"
                          style={{ background: `linear-gradient(90deg, ${color}55, ${color}dd)` }}
                        >
                          <span className="text-[10px] font-bold text-white whitespace-nowrap leading-none">{value}</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.22)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = PRIMARY; e.currentTarget.style.color = "hsl(222,47%,6%)"; e.currentTarget.style.border = `1px solid ${PRIMARY}`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.color = PRIMARY; e.currentTarget.style.border = "1px solid rgba(14,165,233,0.22)"; }}
                  >
                    View Details
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "rgba(239,68,68,0.08)", color: "hsl(0,84%,70%)", border: "1px solid rgba(239,68,68,0.2)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ─ Pagination ─ */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-1">
        <span className="text-xs" style={{ color: DIM2 }}>
          Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, TOTAL)} of {TOTAL} influencers
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: DIM, opacity: page === 1 ? 0.35 : 1 }}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
              style={{
                background: page === p ? PRIMARY : CARD,
                border: `1px solid ${page === p ? PRIMARY : BORDER}`,
                color: page === p ? "hsl(222,47%,6%)" : DIM,
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: DIM, opacity: page === totalPages ? 0.35 : 1 }}
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function MainDashboard() {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activePeriod, setActivePeriod] = useState("8W");
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

          {/* ══ CAMPAIGNS VIEW ══ */}
          {activeNav === "Campaigns" && <CampaignsSection />}

          {/* ══ INFLUENCERS VIEW ══ */}
          {activeNav === "Influencers" && <InfluencersSection />}

          {/* ══ DASHBOARD VIEW ══ */}
          {activeNav !== "Campaigns" && activeNav !== "Influencers" && <div className="space-y-4">

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
          </div>}
        </main>
      </div>
    </div>
  );
}
