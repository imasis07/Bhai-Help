import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Target, Users, BarChart2, Code2, Settings,
  Search, Bell, ShoppingCart, Megaphone, CheckCircle2, TrendingUp,
  ArrowUpRight, ChevronRight, ChevronLeft, Star, Zap, Calendar, Menu, X,
  Eye, Link2, MessageCircle, Mail, Download, ChevronDown, FileText,
  EyeOff, Copy, Plus, Pencil, Trash2, FlaskConical,
  UserCircle2, Palette, Lock, ShieldCheck, Monitor, SunMoon,
  ExternalLink, Film, Globe, Hash,
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

/* ─── Per-influencer product data ─── */
const influencerProducts: Record<string, Array<{
  name: string; views: number; linkClick: number; google: number;
  whatsapp: number; dm: number; sales: number; roas: number;
  link: string; reelTitle: string; reelDate: string; reelSales: number;
}>> = {
  "@ayesha_lifestyle": [
    { name: "Mamaearth Shampoo",     views: 28000, linkClick: 800, google: 600, whatsapp: 30, dm: 45, sales: 1250000, roas: 8.3, link: "https://roastrack.in/link_abc123", reelTitle: "Summer Sale – Shampoo Reel",     reelDate: "Apr 1, 2025",  reelSales: 25 },
    { name: "Mamaearth Conditioner", views: 17000, linkClick: 400, google: 290, whatsapp: 15, dm: 44, sales: 680000,  roas: 6.8, link: "https://roastrack.in/link_def456", reelTitle: "Summer Sale – Conditioner Reel", reelDate: "Apr 5, 2025",  reelSales: 17 },
  ],
  "@techwithrahul": [
    { name: "boAt Earbuds Pro",   views: 20000, linkClick: 550, google: 410, whatsapp: 18, dm: 30, sales: 520000, roas: 5.8, link: "https://roastrack.in/link_gh7890", reelTitle: "Tech Review – boAt Earbuds",   reelDate: "Apr 3, 2025",  reelSales: 19 },
    { name: "boAt Smartwatch X2", views: 12000, linkClick: 250, google: 210, whatsapp: 5,  dm: 15, sales: 300000, roas: 4.1, link: "https://roastrack.in/link_ij1122", reelTitle: "Smartwatch Unboxing & Review", reelDate: "Apr 8, 2025",  reelSales: 11 },
  ],
  "@priya_beauty": [
    { name: "Dot & Key Serum",      views: 18000, linkClick: 380, google: 290, whatsapp: 10, dm: 20, sales: 390000, roas: 5.1, link: "https://roastrack.in/link_kl3344", reelTitle: "Skincare Routine ft. Dot & Key", reelDate: "Apr 6, 2025",  reelSales: 14 },
    { name: "Lakme CC Cream",       views: 10000, linkClick: 220, google: 160, whatsapp: 8,  dm: 12, sales: 260000, roas: 4.3, link: "https://roastrack.in/link_mn5566", reelTitle: "GRWM – Lakme CC Cream Look",     reelDate: "Apr 11, 2025", reelSales: 10 },
  ],
  "@delhifoodie": [
    { name: "Wow Life Protein Bar",  views: 11000, linkClick: 200, google: 160, whatsapp: 7,  dm: 10, sales: 250000, roas: 3.6, link: "https://roastrack.in/link_op7788", reelTitle: "Honest Review – Protein Bar",   reelDate: "Apr 9, 2025",  reelSales: 8 },
    { name: "Slurrp Farm Muesli",    views: 7000,  linkClick: 150, google: 120, whatsapp: 5,  dm: 8,  sales: 170000, roas: 2.8, link: "https://roastrack.in/link_qr9900", reelTitle: "Healthy Breakfast Haul",        reelDate: "Apr 14, 2025", reelSales: 6 },
  ],
};

/* ─── Influencer Detail View ─── */
function InfluencerDetailView({ inf, onBack }: { inf: typeof influencerExtData[0]; onBack: () => void }) {
  const products = influencerProducts[inf.handle] ?? [];

  function fmtK(n: number) {
    if (n >= 10000) return `${Math.round(n / 1000)}K`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return String(n);
  }

  const roasColor = (r: number) =>
    r >= 7 ? GREEN : r >= 5 ? PRIMARY : r >= 3.5 ? "hsl(45,100%,60%)" : DIM;

  const totalViews     = products.reduce((s, p) => s + p.views, 0);
  const totalSales     = products.reduce((s, p) => s + p.sales, 0);
  const avgRoas        = products.length ? products.reduce((s, p) => s + p.roas, 0) / products.length : 0;

  const channelCols = [
    { label: "Link Click", Icon: Link2,         key: "linkClick" as const, color: "#3B82F6" },
    { label: "Google",     Icon: Search,         key: "google"    as const, color: "#8B5CF6" },
    { label: "WhatsApp",   Icon: MessageCircle,  key: "whatsapp"  as const, color: GREEN     },
    { label: "DM",         Icon: Mail,           key: "dm"        as const, color: "#F97316" },
  ];

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-5"
    >
      {/* ── Back + breadcrumb ── */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium transition-all group"
        style={{ color: DIM }}
        onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
        onMouseLeave={e => { e.currentTarget.style.color = DIM; }}
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Influencers
        <span style={{ color: DIM2 }}>/</span>
        <span className="text-white">{inf.handle}</span>
      </button>

      {/* ── Hero card ── */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: CARD, border: `1px solid ${BORDER}` }}
      >
        {/* Glow blob */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: `${inf.c1}22` }} />

        <div className="flex flex-wrap items-start gap-5 relative">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{ background: `linear-gradient(135deg, ${inf.c1}, ${inf.c2})`, color: "white", boxShadow: `0 0 28px ${inf.c1}55` }}
          >
            {inf.avatar}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white">{inf.handle}</h1>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${inf.c1}22`, color: inf.c1 }}>
                {inf.niche}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: DIM }}>Fashion Creator · {inf.followers} followers</p>
            <p className="text-xs mt-1" style={{ color: DIM2 }}>Campaign: <span className="text-white font-medium">{inf.campaign}</span></p>
          </div>

          {/* Headline stats */}
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Avg ROAS",   value: `${avgRoas.toFixed(1)}×`, color: roasColor(avgRoas) },
              { label: "Total Sales", value: fmt(totalSales),         color: GREEN              },
              { label: "Total Views", value: fmtK(totalViews),        color: PRIMARY            },
            ].map(s => (
              <div key={s.label} className="text-center px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[11px] mt-0.5" style={{ color: DIM2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram live stats bar */}
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            { Icon: Globe,   label: "Platform",  value: "Instagram"            },
            { Icon: Users,   label: "Followers",  value: inf.followers          },
            { Icon: Hash,    label: "Posts",      value: "456"                  },
            { Icon: TrendingUp, label: "Following", value: "1.2K"              },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs" style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.15)" }}>
              <s.Icon className="w-3.5 h-3.5 shrink-0" style={{ color: PRIMARY }} />
              <span style={{ color: DIM2 }}>{s.label}:</span>
              <span className="font-semibold text-white">{s.value}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
            <span className="text-xs font-medium" style={{ color: GREEN }}>Live Data</span>
          </div>
        </div>
      </div>

      {/* ── Product-wise Performance Table ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: BORDER }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}>
            <BarChart2 className="w-3.5 h-3.5" style={{ color: PURPLE }} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Product-wise Performance</h2>
            <p className="text-[11px]" style={{ color: DIM2 }}>Attributed revenue per product</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                {["Product", "Views", "Link Click", "Google", "WhatsApp", "DM", "Sales", "ROAS"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap" style={{ color: DIM2 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.name}
                  style={{ borderBottom: i < products.length - 1 ? `1px solid rgba(255,255,255,0.04)` : "none", background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}
                >
                  <td className="px-4 py-3.5 font-medium text-white whitespace-nowrap">{p.name}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: PRIMARY }}>{fmtK(p.views)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: "#3B82F6" }}>{fmtK(p.linkClick)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: "#8B5CF6" }}>{fmtK(p.google)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: GREEN }}>{p.whatsapp}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: "#F97316" }}>{p.dm}</td>
                  <td className="px-4 py-3.5 font-bold whitespace-nowrap" style={{ color: GREEN }}>{fmt(p.sales)}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-bold" style={{ color: roasColor(p.roas) }}>{p.roas}×</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Link-wise Breakdown ── */}
      <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: BORDER }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}>
            <Link2 className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Link-wise Breakdown</h2>
            <p className="text-[11px]" style={{ color: DIM2 }}>Attribution channels per tracking link</p>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {products.map((p, i) => (
            <div key={p.name} className="px-5 py-5">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" style={{ color: DIM2 }} />
                <span className="text-sm font-semibold text-white">{p.name}</span>
              </div>

              <div
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl mb-4 cursor-pointer group"
                style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}
              >
                <Link2 className="w-3 h-3 shrink-0" style={{ color: PRIMARY }} />
                <span className="text-[11px] font-mono truncate flex-1" style={{ color: DIM }}>{p.link}</span>
                <Copy className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: PRIMARY }} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {channelCols.map(col => (
                  <div
                    key={col.key}
                    className="rounded-xl px-4 py-3 flex flex-col gap-2"
                    style={{ background: `${col.color}0d`, border: `1px solid ${col.color}25` }}
                  >
                    <div className="flex items-center gap-1.5">
                      <col.Icon className="w-3.5 h-3.5" style={{ color: col.color }} />
                      <span className="text-[11px] font-medium" style={{ color: col.color }}>{col.label}</span>
                    </div>
                    <span className="text-lg font-bold text-white">{fmtK(p[col.key])}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Reels ── */}
      <div className="rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: BORDER }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <Film className="w-3.5 h-3.5" style={{ color: "#F97316" }} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Recent Reels</h2>
            <p className="text-[11px]" style={{ color: DIM2 }}>Product-attributed content performance</p>
          </div>
        </div>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {products.map((p, i) => (
            <motion.div
              key={p.reelTitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="px-5 py-5 flex flex-wrap gap-5 items-center"
            >
              {/* Reel thumbnail placeholder */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${inf.c1}33, ${inf.c2}33)`, border: `1px solid ${inf.c1}40` }}
              >
                <Film className="w-5 h-5" style={{ color: inf.c1 }} />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] ml-0.5" style={{ borderLeftColor: "white" }} />
                </div>
              </div>

              {/* Reel info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white mb-1">{p.reelTitle}</div>
                <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: DIM2 }}>
                  <span>📅 {p.reelDate}</span>
                  <span>🔗 Product: <span className="text-white font-medium">{p.name}</span></span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  {[
                    { label: "Views",  value: fmtK(p.views),  color: PRIMARY  },
                    { label: "Clicks", value: fmtK(p.linkClick), color: "#3B82F6" },
                    { label: "DMs",    value: String(p.dm),   color: "#F97316" },
                    { label: "Sales",  value: String(p.reelSales), color: GREEN },
                  ].map(m => (
                    <span key={m.label} className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${m.color}15`, color: m.color }}>
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* View on Instagram */}
              <a
                href="#"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0"
                style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.22)" }}
                onMouseEnter={e => { e.currentTarget.style.background = PRIMARY; e.currentTarget.style.color = "hsl(222,47%,6%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.color = PRIMARY; }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Instagram
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── New Campaign Form ─── */
function NewCampaignForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "", price: "", originalLink: "", trackingLink: `https://roastrack.in/t/${Math.random().toString(36).slice(2, 9)}` },
  ]);
  const [influencerCosts, setInfluencerCosts] = useState<Record<string, { selected: boolean; cost: string }>>(
    Object.fromEntries(influencerExtData.map(inf => [inf.handle, { selected: false, cost: "" }]))
  );
  const [copied, setCopied] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function addProduct() {
    setProducts(ps => [...ps, {
      id: Date.now(), name: "", price: "", originalLink: "",
      trackingLink: `https://roastrack.in/t/${Math.random().toString(36).slice(2, 9)}`,
    }]);
  }
  function removeProduct(id: number) {
    setProducts(ps => ps.filter(p => p.id !== id));
  }
  function updateProduct(id: number, field: "name" | "price" | "originalLink", value: string) {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, [field]: value } : p));
  }
  function toggleInfluencer(handle: string) {
    setInfluencerCosts(prev => ({
      ...prev,
      [handle]: { ...prev[handle], selected: !prev[handle].selected },
    }));
  }
  function setInfluencerCost(handle: string, cost: string) {
    setInfluencerCosts(prev => ({ ...prev, [handle]: { ...prev[handle], cost } }));
  }
  function copyLink(id: number, link: string) {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  const canSubmit = name.trim().length > 0;

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-28 gap-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", boxShadow: "0 0 40px rgba(34,197,94,0.18)" }}
        >
          <CheckCircle2 className="w-10 h-10" style={{ color: GREEN }} />
        </motion.div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Campaign Created! 🎉</h2>
          <p style={{ color: DIM }}>
            <span className="text-white font-semibold">"{name}"</span> is ready to go.
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-7 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
        >
          Back to Campaigns →
        </button>
      </motion.div>
    );
  }

  const inp = {
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${BORDER}`,
    color: "white",
    caretColor: PRIMARY,
  } as React.CSSProperties;

  const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = PRIMARY;
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)";
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = BORDER;
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <motion.div
      key="new-campaign"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto space-y-6 pb-8"
    >
      {/* ── Page title ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm font-medium transition-all group"
            style={{ color: DIM }}
            onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.color = DIM; }}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Campaigns
          </button>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span className="text-sm font-semibold text-white">New Campaign</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}` }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = BORDER; }}
        >
          <X className="w-3.5 h-3.5" style={{ color: DIM }} />
        </button>
      </div>

      {/* ── Campaign Name ── */}
      <div className="rounded-2xl p-5 space-y-1.5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        <label className="text-xs font-semibold tracking-wide uppercase" style={{ color: DIM2 }}>
          Campaign Name <span style={{ color: "hsl(0,84%,70%)" }}>*</span>
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Summer Sale 2025"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all font-medium"
          style={inp}
          onFocus={focusIn}
          onBlur={focusOut}
        />
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: BORDER }} />
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: DIM2 }}>Products</span>
        <div className="flex-1 h-px" style={{ background: BORDER }} />
      </div>

      {/* ── Products ── */}
      <div className="space-y-3">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-2xl p-5 space-y-4"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            {/* Card top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold" style={{ background: `${PURPLE}20`, color: PURPLE }}>
                  {i + 1}
                </div>
                <span className="text-xs font-bold" style={{ color: PURPLE }}>Product #{i + 1}</span>
              </div>
              {products.length > 1 && (
                <button
                  onClick={() => removeProduct(p.id)}
                  className="text-[11px] font-semibold transition-all flex items-center gap-1"
                  style={{ color: "hsl(0,84%,65%)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "hsl(0,84%,75%)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "hsl(0,84%,65%)"; }}
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>

            {/* Name + Price */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold" style={{ color: DIM2 }}>
                  Product Name <span style={{ color: "hsl(0,84%,70%)" }}>*</span>
                </label>
                <input
                  value={p.name}
                  onChange={e => updateProduct(p.id, "name", e.target.value)}
                  placeholder="Mamaearth Shampoo"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={inp}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold" style={{ color: DIM2 }}>
                  Product Price <span style={{ color: "hsl(0,84%,70%)" }}>*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold select-none" style={{ color: DIM }}>₹</span>
                  <input
                    value={p.price}
                    onChange={e => updateProduct(p.id, "price", e.target.value.replace(/\D/g, ""))}
                    placeholder="500"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={inp}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
              </div>
            </div>

            {/* Original product link */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold" style={{ color: DIM2 }}>Original Product Link</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: DIM2 }} />
                <input
                  value={p.originalLink}
                  onChange={e => updateProduct(p.id, "originalLink", e.target.value)}
                  placeholder="https://mamaearth.in/shampoo"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={inp}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
            </div>

            {/* Tracking link */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold" style={{ color: DIM2 }}>Tracking Link (Auto-generated)</label>
                <button
                  onClick={() => copyLink(p.id, p.trackingLink)}
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    background: copied === p.id ? "rgba(34,197,94,0.12)" : `${PRIMARY}15`,
                    color: copied === p.id ? GREEN : PRIMARY,
                    border: `1px solid ${copied === p.id ? "rgba(34,197,94,0.25)" : `${PRIMARY}25`}`,
                  }}
                >
                  {copied === p.id ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === p.id ? "Copied!" : "Copy Link"}
                </button>
              </div>
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
                style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.18)" }}
              >
                <Link2 className="w-3.5 h-3.5 shrink-0" style={{ color: PRIMARY }} />
                <span className="text-[12px] font-mono truncate flex-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {p.trackingLink}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add product */}
        <button
          onClick={addProduct}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold border-dashed transition-all"
          style={{ border: `1.5px dashed rgba(139,92,246,0.35)`, color: PURPLE }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.05)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.55)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)"; }}
        >
          <Plus className="w-4 h-4" />
          Add Another Product
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: BORDER }} />
        <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: DIM2 }}>Influencers</span>
        <div className="flex-1 h-px" style={{ background: BORDER }} />
      </div>

      {/* ── Influencers table ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_160px] gap-0 px-4 py-2.5 border-b" style={{ borderColor: BORDER }}>
          <div className="w-8" />
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: DIM2 }}>Select Influencer</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-right" style={{ color: DIM2 }}>Cost Paid (₹)</span>
        </div>

        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {influencerExtData.map((inf, i) => {
            const state   = influencerCosts[inf.handle];
            const isSel   = state?.selected ?? false;
            return (
              <div
                key={inf.handle}
                className="grid grid-cols-[auto_1fr_160px] items-center gap-0 px-4 py-3.5 transition-all"
                style={{ background: isSel ? `${inf.c1}0a` : "transparent" }}
              >
                {/* Checkbox col */}
                <button
                  onClick={() => toggleInfluencer(inf.handle)}
                  className="w-8 flex items-center justify-center shrink-0"
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                    style={{
                      background: isSel ? inf.c1 : "transparent",
                      border: isSel ? `1.5px solid ${inf.c1}` : "1.5px solid rgba(255,255,255,0.18)",
                    }}
                  >
                    {isSel && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>

                {/* Info col */}
                <button onClick={() => toggleInfluencer(inf.handle)} className="flex items-center gap-3 text-left min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${inf.c1}, ${inf.c2})`, color: "white" }}
                  >
                    {inf.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{inf.handle}</div>
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: DIM2 }}>
                      <span style={{ color: inf.c1 }}>{inf.niche}</span>
                      <span>·</span>
                      <span>{inf.followers} followers</span>
                    </div>
                  </div>
                </button>

                {/* Cost input col */}
                <div className="flex justify-end">
                  <div className="relative w-36">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold select-none" style={{ color: isSel ? DIM : "rgba(255,255,255,0.15)" }}>₹</span>
                    <input
                      value={state?.cost ?? ""}
                      onChange={e => setInfluencerCost(inf.handle, e.target.value.replace(/\D/g, ""))}
                      placeholder={isSel ? "10,000" : "—"}
                      disabled={!isSel}
                      className="w-full pl-7 pr-3 py-2 rounded-xl text-sm outline-none transition-all text-right"
                      style={{
                        background: isSel ? "rgba(255,255,255,0.05)" : "transparent",
                        border: isSel ? `1px solid ${BORDER}` : "1px solid transparent",
                        color: isSel ? "white" : "rgba(255,255,255,0.15)",
                        cursor: isSel ? "text" : "default",
                        caretColor: PRIMARY,
                      }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new influencer */}
        <div className="px-4 py-3 border-t" style={{ borderColor: BORDER }}>
          <button
            className="flex items-center gap-2 text-xs font-semibold transition-all"
            style={{ color: PRIMARY }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Influencer
          </button>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px" style={{ background: BORDER }} />

      {/* ── ROAS tip ── */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
        <span className="text-base">💡</span>
        <p className="text-xs" style={{ color: DIM }}>
          <span className="font-bold text-white">ROAS</span> = Total Sales ÷ Total Cost Paid to Influencers
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "rgba(255,255,255,0.05)", color: DIM, border: `1px solid ${BORDER}` }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = DIM; }}
        >
          Cancel
        </button>
        <button
          onClick={() => { if (canSubmit) setSubmitted(true); }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: canSubmit ? PRIMARY : "rgba(14,165,233,0.2)",
            color: canSubmit ? "hsl(222,47%,6%)" : "rgba(255,255,255,0.3)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            boxShadow: canSubmit ? `0 4px 20px rgba(14,165,233,0.3)` : "none",
          }}
        >
          <Zap className="w-4 h-4" />
          Create Campaign
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Campaigns Section ─── */
function CampaignsSection() {
  const [campaignFilter, setCampaignFilter] = useState("All");
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  if (showNewCampaign) {
    return <NewCampaignForm onClose={() => setShowNewCampaign(false)} />;
  }

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
          onClick={() => setShowNewCampaign(true)}
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
  const [selectedInfluencer, setSelectedInfluencer] = useState<typeof influencerExtData[0] | null>(null);

  if (selectedInfluencer) {
    return <InfluencerDetailView inf={selectedInfluencer} onBack={() => setSelectedInfluencer(null)} />;
  }

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
              { label: "Views",      Icon: Eye,           value: fmtK(inf.views),     color: PRIMARY   },
              { label: "Link Click", Icon: Link2,         value: fmtK(inf.linkClick), color: "#3B82F6" },
              { label: "Google",     Icon: Search,        value: fmtK(inf.google),    color: "#8B5CF6" },
              { label: "WhatsApp",   Icon: MessageCircle, value: fmtK(inf.whatsapp),  color: GREEN     },
              { label: "DM",         Icon: Mail,          value: fmtK(inf.dm),        color: "#F97316" },
              { label: "Sales",      Icon: ShoppingCart,  value: fmt(inf.sales),      color: GREEN     },
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

                {/* Metrics box */}
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                  {metricRows.map(({ label, Icon, value, color }, mi) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-3.5 py-2.5"
                      style={{
                        background: mi % 2 === 0 ? "rgba(255,255,255,0.025)" : "transparent",
                        borderBottom: mi < metricRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                        <span className="text-xs" style={{ color: DIM2 }}>{label}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: mi === 5 ? GREEN : "rgba(255,255,255,0.85)" }}>
                        {value}
                      </span>
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
                    onClick={() => setSelectedInfluencer(inf)}
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

/* ─── Reports Section component ─── */
function ReportsSection() {
  const [exportOpen, setExportOpen] = useState(false);

  const reportCards = [
    {
      Icon: BarChart2,
      accentColor: PRIMARY,
      type: "Campaign",
      name: "Summer Sale",
      period: "Apr 1–30, 2025",
      highlight: { label: "Total Sales", value: "₹2.5L" },
      kind: "metrics",
      rows: [
        { label: "ROAS",        value: "5.2x" },
        { label: "Influencers", value: "5"    },
        { label: "Views",       value: "1.2L" },
        { label: "Clicks",      value: "2.8K" },
      ],
      ranked: null,
    },
    {
      Icon: BarChart2,
      accentColor: PURPLE,
      type: "Campaign",
      name: "Winter Collection",
      period: "Apr 1–30, 2025",
      highlight: { label: "Total Sales", value: "₹1.8L" },
      kind: "metrics",
      rows: [
        { label: "ROAS",        value: "6.0x" },
        { label: "Influencers", value: "3"    },
        { label: "Views",       value: "85K"  },
        { label: "Clicks",      value: "1.6K" },
      ],
      ranked: null,
    },
    {
      Icon: Users,
      accentColor: "hsl(45,100%,60%)",
      type: "Influencer",
      name: "Top Performers",
      period: "Apr 1–30, 2025",
      highlight: { label: "Top Earner", value: "₹12.4L" },
      kind: "ranked",
      rows: null,
      ranked: [
        { rank: 1, handle: "@ayesha_lifestyle", sales: "₹12.4L" },
        { rank: 2, handle: "@techwithrahul",    sales: "₹8.2L"  },
        { rank: 3, handle: "@priya_beauty",     sales: "₹6.5L"  },
        { rank: 4, handle: "@delhifoodie",      sales: "₹4.2L"  },
      ],
    },
    {
      Icon: TrendingUp,
      accentColor: GREEN,
      type: "Influencer",
      name: "All Influencers",
      period: "Apr 1–30, 2025",
      highlight: { label: "Total Sales", value: "₹31.3L" },
      kind: "metrics",
      rows: [
        { label: "Avg ROAS",     value: "5.4x" },
        { label: "Total Views",  value: "1.2L" },
        { label: "Total Clicks", value: "2.9K" },
      ],
      ranked: null,
    },
  ];

  const attrChannels = [
    { Icon: Link2,         label: "Link Click", value: "38%", pct: 38, color: "#3B82F6" },
    { Icon: Search,        label: "Search",     value: "29%", pct: 29, color: "#8B5CF6" },
    { Icon: MessageCircle, label: "WhatsApp",   value: "18%", pct: 18, color: "#F97316" },
    { Icon: Mail,          label: "DM",         value: "15%", pct: 15, color: GREEN     },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ background: `linear-gradient(135deg, #fff 40%, ${PRIMARY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Reports
          </h1>
          <p className="text-sm mt-1" style={{ color: DIM }}>Download your influencer performance data</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setExportOpen(o => !o)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, hsl(199,89%,36%))`, color: "hsl(222,47%,6%)", boxShadow: `0 4px 18px ${PRIMARY}45` }}
          >
            <Download className="w-4 h-4" />
            Export
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {exportOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-20 py-1"
              style={{ background: "hsl(222,47%,10%)", border: `1px solid ${BORDER}`, boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}
            >
              {["Export as CSV", "Export as PDF", "Export as XLSX"].map(opt => (
                <button
                  key={opt}
                  onClick={() => setExportOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors"
                  style={{ color: DIM }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = DIM; }}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Date Range filter ── */}
      <div
        className="flex items-center gap-3 flex-wrap px-5 py-3.5 rounded-2xl"
        style={{ background: "linear-gradient(135deg, hsl(222,47%,10%), hsl(222,47%,8%))", border: `1px solid ${BORDER}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <Calendar className="w-4 h-4" style={{ color: PRIMARY }} />
          <span className="text-sm font-medium" style={{ color: DIM }}>Date Range</span>
        </div>
        <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          <input type="date" defaultValue="2025-04-01" className="text-sm px-3 py-1.5 rounded-xl outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
          <span className="text-xs" style={{ color: DIM2 }}>to</span>
          <input type="date" defaultValue="2025-04-30" className="text-sm px-3 py-1.5 rounded-xl outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} />
        </div>
        <button className="px-5 py-1.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 shrink-0" style={{ background: PRIMARY, color: "hsl(222,47%,6%)", boxShadow: `0 2px 10px ${PRIMARY}40` }}>
          Apply
        </button>
      </div>

      {/* ── 2×2 Report Cards Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reportCards.map((card, i) => {
          const CardIcon = card.Icon;
          return (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, scale: 1.012 }}
              className="rounded-2xl flex flex-col overflow-hidden cursor-default"
              style={{ background: "linear-gradient(160deg, hsl(222,47%,11%) 0%, hsl(222,47%,8%) 100%)", border: `1px solid ${BORDER}`, boxShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
            >
              {/* Colored top accent strip */}
              <div className="h-0.5 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${card.accentColor}, transparent 70%)` }} />

              <div className="p-5 flex flex-col flex-1">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${card.accentColor}18`, border: `1px solid ${card.accentColor}28`, boxShadow: `0 0 16px ${card.accentColor}20` }}
                  >
                    <CardIcon className="w-5 h-5" style={{ color: card.accentColor }} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1"
                      style={{ background: `${card.accentColor}15`, color: card.accentColor }}
                    >
                      {card.type}
                    </div>
                    <div className="text-sm font-bold text-white leading-tight">{card.name}</div>
                  </div>
                </div>

                {/* Date badge */}
                <div className="flex items-center gap-1.5 text-[11px] mb-4" style={{ color: DIM2 }}>
                  <Calendar className="w-3 h-3" />
                  {card.period}
                </div>

                {/* Highlight metric box */}
                <div className="rounded-xl px-4 py-3 mb-4" style={{ background: `${card.accentColor}0d`, border: `1px solid ${card.accentColor}20` }}>
                  <div className="text-[11px] font-medium mb-0.5" style={{ color: card.accentColor }}>{card.highlight.label}</div>
                  <div className="text-2xl font-bold text-white tracking-tight">{card.highlight.value}</div>
                </div>

                {/* Rows — metrics */}
                {card.kind === "metrics" && card.rows && (
                  <div className="flex-1 space-y-0">
                    {card.rows.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-xs" style={{ color: DIM2 }}>{label}</span>
                        <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rows — ranked list */}
                {card.kind === "ranked" && card.ranked && (
                  <div className="flex-1 space-y-0">
                    {card.ranked.map(({ rank, handle, sales }) => (
                      <div key={handle} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{
                              background: rank === 1 ? "rgba(234,179,8,0.2)" : rank === 2 ? "rgba(192,192,192,0.12)" : rank === 3 ? "rgba(205,127,50,0.15)" : "rgba(255,255,255,0.05)",
                              color: rank === 1 ? "hsl(45,100%,60%)" : rank === 2 ? "#C0C0C0" : rank === 3 ? "#CD7F32" : DIM2,
                              border: rank <= 3 ? "1px solid currentColor" : "none",
                            }}
                          >
                            {rank}
                          </div>
                          <span className="text-xs" style={{ color: DIM }}>{handle}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: GREEN }}>{sales}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Download button */}
                <button
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${card.accentColor}18, ${card.accentColor}08)`, color: card.accentColor, border: `1px solid ${card.accentColor}28` }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CSV
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Attribution Summary ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, hsl(222,47%,11%) 0%, hsl(222,47%,8%) 100%)", border: `1px solid ${BORDER}`, boxShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
      >
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${PRIMARY}, ${PURPLE}, transparent 70%)` }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)", boxShadow: `0 0 16px ${PRIMARY}22` }}>
                <FileText className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <div>
                <div className="text-base font-bold text-white">Attribution Summary</div>
                <div className="text-xs" style={{ color: DIM2 }}>All Campaigns · Apr 1–30, 2025</div>
              </div>
            </div>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
              style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: `1px solid rgba(14,165,233,0.22)` }}
            >
              <Download className="w-3.5 h-3.5" />
              Download CSV
            </button>
          </div>

          {/* Animated horizontal bars */}
          <div className="space-y-4">
            {attrChannels.map(({ Icon, label, value, pct, color }, ai) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex items-center gap-2 shrink-0" style={{ width: 108 }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}22` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: DIM }}>{label}</span>
                </div>
                <div className="flex-1 h-7 rounded-xl overflow-hidden relative" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, delay: 0.5 + ai * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-xl flex items-center justify-end pr-3"
                    style={{ background: `linear-gradient(90deg, ${color}55, ${color}dd)`, minWidth: 52 }}
                  >
                    <span className="text-xs font-bold text-white">{value}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

/* ─── Modal helpers (top-level to prevent input blink) ─── */
function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}
function ModalCloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
      style={{ background: "rgba(255,255,255,0.06)", color: DIM }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = DIM; }}
    >
      <X className="w-4 h-4" />
    </button>
  );
}

/* ─── Pixel mock data ─── */
const pixelsData = [
  {
    id: "PX-001", name: "Main Store Pixel", url: "mamaearth.in",
    status: "Active", hits: "24.8K", sales: "₹12.4L",
    events: ["pageview", "purchase", "add_to_cart"],
    created: "Mar 15, 2025",
  },
  {
    id: "PX-002", name: "Campaign Pixel – Summer", url: "mamaearth.in/summer",
    status: "Active", hits: "9.2K", sales: "₹5.1L",
    events: ["pageview", "purchase"],
    created: "Apr 1, 2025",
  },
  {
    id: "PX-003", name: "Winter Collection Pixel", url: "mamaearth.in/winter",
    status: "Inactive", hits: "3.1K", sales: "₹1.8L",
    events: ["pageview"],
    created: "Apr 5, 2025",
  },
];

/* ─── Create Pixel Modal (top-level) ─── */
function CreatePixelModal({ step, setStep, onClose }: {
  step: 1 | 2; setStep: (s: 1 | 2) => void; onClose: () => void;
}) {
  const [pixelName, setPixelName] = useState("");
  const [pixelUrl, setPixelUrl]   = useState("");
  const [copied, setCopied]       = useState(false);
  const snippet = `<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://cdn.roastrack.com/pixel.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','rLayer','PX-${Date.now().toString(36).toUpperCase()}');
</script>`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <ModalOverlay onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-md rounded-2xl p-6"
        style={{ background: "hsl(222,47%,9%)", border: `1px solid ${BORDER}`, boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}
      >
        <ModalCloseBtn onClose={onClose} />

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                style={step >= s
                  ? { background: PRIMARY, color: "hsl(222,47%,6%)" }
                  : { background: "rgba(255,255,255,0.07)", color: DIM2 }}
              >{s}</div>
              {s < 2 && <div className="w-12 h-px" style={{ background: step === 2 ? PRIMARY : "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
          <span className="ml-2 text-xs font-semibold" style={{ color: DIM2 }}>
            {step === 1 ? "Setup" : "Install Code"}
          </span>
        </div>

        {step === 1 ? (
          <>
            <h2 className="text-base font-bold text-white mb-4">Create New Pixel</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: DIM2 }}>Pixel Name</label>
                <input
                  value={pixelName}
                  onChange={e => setPixelName(e.target.value)}
                  placeholder="e.g. Main Store Pixel"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
                  onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: DIM2 }}>Store URL</label>
                <input
                  value={pixelUrl}
                  onChange={e => setPixelUrl(e.target.value)}
                  placeholder="e.g. yourstore.in"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
                  onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
                  onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: DIM2 }}>Track Events</label>
                <div className="flex flex-wrap gap-2">
                  {["pageview", "purchase", "add_to_cart", "checkout"].map(ev => (
                    <span key={ev} className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.2)" }}>
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!pixelName || !pixelUrl}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: PRIMARY, color: "hsl(222,47%,6%)", opacity: (!pixelName || !pixelUrl) ? 0.45 : 1 }}
            >
              Continue →
            </button>
          </>
        ) : (
          <>
            <h2 className="text-base font-bold text-white mb-1">Install Pixel Code</h2>
            <p className="text-xs mb-4" style={{ color: DIM2 }}>Paste this snippet inside your store's &lt;head&gt; tag</p>
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ background: "hsl(222,47%,5%)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <pre className="p-4 text-[11px] leading-relaxed overflow-x-auto" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{snippet}</pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                style={{ background: copied ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.08)", color: copied ? GREEN : DIM, border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}` }}
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "rgba(255,255,255,0.05)", color: DIM, border: `1px solid ${BORDER}` }}>
                ← Back
              </button>
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all" style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>
                Done ✓
              </button>
            </div>
          </>
        )}
      </motion.div>
    </ModalOverlay>
  );
}

/* ─── Pixels Section ─── */
function PixelsSection() {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [pixels, setPixels]       = useState(pixelsData);
  const [filter, setFilter]       = useState("All");

  const filterTabs = [
    { label: "All",      key: "All"      },
    { label: "Active",   key: "Active"   },
    { label: "Inactive", key: "Inactive" },
  ];
  const filtered = filter === "All" ? pixels : pixels.filter(p => p.status === filter);

  return (
    <motion.div key="pixels" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-5">
      {showModal && (
        <CreatePixelModal
          step={modalStep}
          setStep={setModalStep}
          onClose={() => { setShowModal(false); setModalStep(1); }}
        />
      )}

      {/* Title row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Pixels</h1>
          <p className="text-sm mt-0.5" style={{ color: DIM }}>Track conversions from influencer traffic</p>
        </div>
        <button
          onClick={() => { setModalStep(1); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
        >
          <Plus className="w-4 h-4" /> Create Pixel
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Pixels", value: pixels.length, accent: PRIMARY },
          { label: "Active",       value: pixels.filter(p => p.status === "Active").length, accent: GREEN },
          { label: "Total Hits",   value: "37.1K", accent: PURPLE },
        ].map(s => (
          <div key={s.label} className="rounded-2xl px-4 py-3.5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DIM2 }}>{s.label}</div>
            <div className="text-xl font-bold" style={{ color: s.accent }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
        {filterTabs.map(tab => {
          const isA = filter === tab.key;
          return (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: isA ? PRIMARY : "transparent", color: isA ? "hsl(222,47%,6%)" : DIM }}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Pixel cards */}
      <div className="space-y-3">
        {filtered.map((px, i) => {
          const isActive = px.status === "Active";
          return (
            <motion.div key={px.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="rounded-2xl p-5"
              style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: isActive ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${isActive ? "rgba(14,165,233,0.22)" : "rgba(255,255,255,0.08)"}` }}>
                    <FlaskConical className="w-4 h-4" style={{ color: isActive ? PRIMARY : DIM2 }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{px.name}</div>
                    <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: DIM2 }}>
                      <Link2 className="w-3 h-3" />{px.url}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={isActive
                      ? { background: "rgba(34,197,94,0.12)", color: GREEN, border: "1px solid rgba(34,197,94,0.25)" }
                      : { background: "rgba(255,255,255,0.05)", color: DIM, border: "1px solid rgba(255,255,255,0.1)" }}>
                    {px.status}
                  </span>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", color: DIM2, border: "1px solid rgba(255,255,255,0.07)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = DIM2; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPixels(prev => prev.filter(p => p.id !== px.id))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: "rgba(239,68,68,0.07)", color: "hsl(0,84%,70%)", border: "1px solid rgba(239,68,68,0.15)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2.5 mt-4 mb-4">
                {[
                  { label: "Hits",   value: px.hits },
                  { label: "Sales",  value: px.sales },
                  { label: "Created", value: px.created },
                ].map(m => (
                  <div key={m.label} className="rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DIM2 }}>{m.label}</div>
                    <div className="text-sm font-bold text-white">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Events */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px]" style={{ color: DIM2 }}>Events:</span>
                {px.events.map(ev => (
                  <span key={ev} className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                    style={{ background: "rgba(14,165,233,0.09)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.18)" }}>
                    {ev}
                  </span>
                ))}
              </div>

              {/* Code button */}
              <button
                onClick={() => { setModalStep(2); setShowModal(true); }}
                className="mt-4 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                style={{ background: "rgba(14,165,233,0.08)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.2)" }}>
                <Code2 className="w-3.5 h-3.5" /> View Install Code
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Settings Section ─── */
const SETTINGS_TABS = [
  { key: "general",       label: "General",          icon: Settings },
  { key: "account",       label: "Account",           icon: UserCircle2 },
  { key: "appearance",    label: "Appearance",        icon: Palette },
  { key: "notifications", label: "Notifications",     icon: Bell },
  { key: "password",      label: "Password & Auth",   icon: Lock },
  { key: "team",          label: "Team Members",      icon: Users },
  { key: "billing",       label: "Billing & Plan",    icon: Star },
  { key: "store",         label: "Store",             icon: ShoppingCart },
  { key: "api",           label: "API Keys",          icon: ShieldCheck },
];

function SettingsSection() {
  const [activeTab, setActiveTab] = useState("general");
  const [showKey, setShowKey]     = useState(false);
  const [saved, setSaved]         = useState(false);
  const [theme, setTheme]         = useState("dark");
  const [notifs, setNotifs]       = useState({ sales: true, newInf: true, weeklyReport: false, lowBudget: true });
  const [twoFA, setTwoFA]         = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button onClick={onToggle}
        className="w-11 h-6 rounded-full relative transition-all shrink-0"
        style={{ background: on ? PRIMARY : "rgba(255,255,255,0.1)", border: `1px solid ${on ? PRIMARY : "rgba(255,255,255,0.15)"}` }}>
        <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all"
          style={{ left: on ? "calc(100% - 1.25rem)" : "0.125rem", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
      </button>
    );
  }

  const renderTab = () => {
    if (activeTab === "general") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">General Settings</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Manage your workspace preferences</p>
        </div>
        {[
          { label: "Store Name",    placeholder: "Mamaearth", sub: "This is your brand name shown across ROASTrack." },
          { label: "Store Website", placeholder: "https://mamaearth.in", sub: "Your primary store URL." },
          { label: "Industry",      placeholder: "Beauty & Personal Care", sub: "Used for analytics benchmarking." },
          { label: "Time Zone",     placeholder: "Asia/Kolkata (IST)", sub: "All reports will use this timezone." },
        ].map(f => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{f.label}</label>
            <input
              defaultValue={f.placeholder}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
              onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
              onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
            />
            <p className="text-xs" style={{ color: DIM2 }}>{f.sub}</p>
          </div>
        ))}
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    );

    if (activeTab === "account") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Account</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Manage your personal account details</p>
        </div>
        {[
          { label: "Store Name",  placeholder: "Mamaearth", sub: "This name appears on invoices and reports." },
          { label: "Email",       placeholder: "admin@mamaearth.in", sub: "Used for login and notifications." },
          { label: "Phone",       placeholder: "+91 98765 43210", sub: "Optional. Used for 2FA." },
          { label: "Role",        placeholder: "Admin", sub: "Your access level in this workspace." },
        ].map(f => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{f.label}</label>
            <input
              defaultValue={f.placeholder}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
              onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
              onBlur={e => { e.currentTarget.style.borderColor = BORDER; }}
            />
            <p className="text-xs" style={{ color: DIM2 }}>{f.sub}</p>
          </div>
        ))}
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    );

    if (activeTab === "appearance") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Appearance</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Customize how ROASTrack looks for you</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "dark",   label: "Dark",   icon: Monitor,  desc: "Easy on the eyes" },
              { key: "light",  label: "Light",  icon: SunMoon,  desc: "Classic look" },
              { key: "system", label: "System", icon: Monitor,  desc: "Follows OS" },
            ].map(t => (
              <button key={t.key} onClick={() => setTheme(t.key)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
                style={{
                  background: theme === t.key ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${theme === t.key ? PRIMARY : BORDER}`,
                }}>
                <t.icon className="w-5 h-5" style={{ color: theme === t.key ? PRIMARY : DIM2 }} />
                <span className="text-xs font-semibold" style={{ color: theme === t.key ? PRIMARY : DIM }}>{t.label}</span>
                <span className="text-[11px]" style={{ color: DIM2 }}>{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>Accent Color</label>
          <div className="flex items-center gap-3 flex-wrap">
            {[PRIMARY, PURPLE, GREEN, "hsl(22,100%,57%)", "hsl(338,82%,52%)"].map(c => (
              <button key={c}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{ background: c, borderColor: "transparent", boxShadow: `0 0 0 3px ${c}40` }} />
            ))}
          </div>
        </div>
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
          {saved ? "✓ Saved!" : "Save Preferences"}
        </button>
      </div>
    );

    if (activeTab === "notifications") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Notifications</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Choose what you want to be alerted about</p>
        </div>
        <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          {[
            { key: "sales",        label: "New Sale Detected",   sub: "Instant alert when an influencer drives a sale" },
            { key: "newInf",       label: "New Influencer Added", sub: "When a team member adds a new influencer" },
            { key: "weeklyReport", label: "Weekly Report Email",  sub: "Summary sent every Monday morning" },
            { key: "lowBudget",    label: "Low Budget Warning",   sub: "Alert when campaign budget drops below 10%" },
          ].map(({ key, label, sub }, i) => (
            <div key={key}
              className="flex items-center justify-between px-5 py-4"
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
              <div>
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs mt-0.5" style={{ color: DIM2 }}>{sub}</div>
              </div>
              <Toggle on={notifs[key as keyof typeof notifs]} onToggle={() => setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof notifs] }))} />
            </div>
          ))}
        </div>
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
          {saved ? "✓ Saved!" : "Save Preferences"}
        </button>
      </div>
    );

    if (activeTab === "password") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Password & Auth</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Manage your login security</p>
        </div>
        {[
          { label: "Current Password", placeholder: "••••••••" },
          { label: "New Password",     placeholder: "Min 8 characters" },
          { label: "Confirm Password", placeholder: "Repeat new password" },
        ].map(f => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{f.label}</label>
            <input type="password" placeholder={f.placeholder}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
              onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
              onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
          </div>
        ))}
        <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Two-Factor Authentication</div>
              <div className="text-xs mt-0.5" style={{ color: DIM2 }}>Add extra security with OTP on login</div>
            </div>
            <Toggle on={twoFA} onToggle={() => setTwoFA(p => !p)} />
          </div>
        </div>
        <button onClick={handleSave}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
          {saved ? "✓ Saved!" : "Update Password"}
        </button>
      </div>
    );

    if (activeTab === "team") return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white mb-0.5">Team Members</h2>
            <p className="text-xs" style={{ color: DIM2 }}>Manage who has access to your workspace</p>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-all"
            style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>
            <Plus className="w-3.5 h-3.5" /> Invite
          </button>
        </div>
        <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          {[
            { name: "John Doe",   email: "john@mamaearth.in",   role: "Admin",  avatar: "JD", c1: PRIMARY, c2: PURPLE },
            { name: "Priya Shah", email: "priya@mamaearth.in",  role: "Editor", avatar: "PS", c1: "hsl(338,82%,52%)", c2: "hsl(22,100%,57%)" },
            { name: "Rahul Dev",  email: "rahul@mamaearth.in",  role: "Viewer", avatar: "RD", c1: GREEN, c2: PRIMARY },
          ].map(({ name, email, role, avatar, c1, c2 }, i) => (
            <div key={email}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, color: "white" }}>{avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{name}</div>
                <div className="text-xs" style={{ color: DIM2 }}>{email}</div>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={role === "Admin"
                  ? { background: "rgba(14,165,233,0.12)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.22)" }
                  : role === "Editor"
                  ? { background: "rgba(270,60%,68%,0.12)", color: PURPLE, border: `1px solid ${PURPLE}44` }
                  : { background: "rgba(255,255,255,0.05)", color: DIM, border: "1px solid rgba(255,255,255,0.1)" }}>{role}</span>
              {role !== "Admin" && (
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all ml-1"
                  style={{ background: "rgba(239,68,68,0.07)", color: "hsl(0,84%,70%)", border: "1px solid rgba(239,68,68,0.15)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    if (activeTab === "billing") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Billing & Plan</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Manage your subscription and invoices</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, rgba(14,165,233,0.12), rgba(14,165,233,0.04))`, border: `1px solid rgba(14,165,233,0.25)` }}>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: DIM2 }}>Current Plan</div>
              <div className="text-lg font-bold text-white">Pro Plan</div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: GREEN + "22", color: GREEN, border: `1px solid ${GREEN}44` }}>Active</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: "Next Billing", value: "May 19, 2026" },
              { label: "Amount",       value: "₹2,999/mo" },
            ].map(m => (
              <div key={m.label} className="rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}` }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: DIM2 }}>{m.label}</div>
                <div className="text-sm font-bold text-white">{m.value}</div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>Upgrade to Enterprise →</button>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: DIM2 }}>Recent Invoices</div>
          <div className="space-y-0 rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
            {[
              { date: "Apr 19, 2026", amount: "₹2,999", status: "Paid" },
              { date: "Mar 19, 2026", amount: "₹2,999", status: "Paid" },
              { date: "Feb 19, 2026", amount: "₹2,999", status: "Paid" },
            ].map(({ date, amount, status }, i) => (
              <div key={date}
                className="flex items-center justify-between px-5 py-3.5"
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                <div className="text-sm text-white">{date}</div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold" style={{ color: DIM }}>{amount}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: GREEN + "18", color: GREEN }}>{status}</span>
                  <button className="text-xs" style={{ color: PRIMARY }}>PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    if (activeTab === "store") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">Store Settings</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Connect and configure your e-commerce store</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GREEN + "18", border: `1px solid ${GREEN}33` }}>
              <ShoppingCart className="w-5 h-5" style={{ color: GREEN }} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Shopify Integration</div>
              <div className="text-xs" style={{ color: GREEN }}>Connected · mamaearth.myshopify.com</div>
            </div>
            <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: GREEN + "18", color: GREEN, border: `1px solid ${GREEN}33` }}>Active</span>
          </div>
          {[
            { label: "Shop Domain",   placeholder: "mamaearth.myshopify.com" },
            { label: "Currency",      placeholder: "INR (₹)" },
            { label: "Order Prefix",  placeholder: "ROAS-" },
          ].map(f => (
            <div key={f.label} className="space-y-1.5 mb-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: DIM2 }}>{f.label}</label>
              <input defaultValue={f.placeholder}
                className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
                onFocus={e => { e.currentTarget.style.borderColor = PRIMARY; }}
                onBlur={e => { e.currentTarget.style.borderColor = BORDER; }} />
            </div>
          ))}
          <button onClick={handleSave}
            className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: saved ? GREEN : PRIMARY, color: "hsl(222,47%,6%)" }}>
            {saved ? "✓ Saved!" : "Save Store Settings"}
          </button>
        </div>
      </div>
    );

    if (activeTab === "api") return (
      <div className="space-y-5">
        <div>
          <h2 className="text-base font-bold text-white mb-0.5">API Keys</h2>
          <p className="text-xs" style={{ color: DIM2 }}>Use these keys to access the ROASTrack API</p>
        </div>
        {[
          { label: "Live API Key", key: "sk_live_" + "•".repeat(24), env: "Production" },
          { label: "Test API Key", key: "sk_test_" + "•".repeat(24), env: "Sandbox" },
        ].map(({ label, key, env }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="text-sm font-semibold text-white">{label}</div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={env === "Production"
                  ? { background: GREEN + "18", color: GREEN, border: `1px solid ${GREEN}33` }
                  : { background: "rgba(255,255,255,0.07)", color: DIM, border: "1px solid rgba(255,255,255,0.1)" }}>{env}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3.5 py-2.5" style={{ background: "hsl(222,47%,5%)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <code className="flex-1 text-xs truncate" style={{ color: DIM, fontFamily: "monospace" }}>
                {showKey ? key : key.slice(0, 12) + "••••••••••••••••••••••••"}
              </code>
              <button onClick={() => setShowKey(p => !p)} className="shrink-0" style={{ color: DIM2 }}>
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button onClick={() => navigator.clipboard.writeText(key)} className="shrink-0" style={{ color: DIM2 }}
                onMouseEnter={e => { e.currentTarget.style.color = PRIMARY; }}
                onMouseLeave={e => { e.currentTarget.style.color = DIM2; }}>
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "rgba(239,68,68,0.08)", color: "hsl(0,84%,70%)", border: "1px solid rgba(239,68,68,0.2)" }}>
          Regenerate Keys
        </button>
      </div>
    );

    return null;
  };

  return (
    <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-sm mt-0.5" style={{ color: DIM }}>Manage your account, workspace, and integrations</p>
      </div>

      <div className="flex gap-5 items-start">
        {/* Left vertical nav */}
        <aside className="w-52 shrink-0 sticky top-0">
          <nav className="flex flex-col gap-0.5">
            {SETTINGS_TABS.map(({ key, label, icon: Icon }) => {
              const isA = activeTab === key;
              return (
                <button key={key} onClick={() => setActiveTab(key)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
                  style={{
                    background: isA ? "rgba(14,165,233,0.12)" : "transparent",
                    color: isA ? PRIMARY : DIM,
                    border: isA ? "1px solid rgba(14,165,233,0.22)" : "1px solid transparent",
                  }}
                  onMouseEnter={e => { if (!isA) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
                  onMouseLeave={e => { if (!isA) { e.currentTarget.style.color = DIM; e.currentTarget.style.background = "transparent"; } }}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                  {isA && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right content */}
        <div className="flex-1 min-w-0 rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}>
              {renderTab()}
            </motion.div>
          </AnimatePresence>
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
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const SidebarContent = ({ expanded = true }: { expanded?: boolean }) => (
    <>
      {/* Logo */}
      <div
        className="flex items-center border-b overflow-hidden shrink-0"
        style={{ borderColor: BORDER, padding: expanded ? "20px 20px" : "20px 14px", minHeight: 64, transition: "padding 0.22s ease" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="7" width="3" height="6" rx="0.5" fill={PRIMARY} />
            <rect x="5.5" y="4" width="3" height="9" rx="0.5" fill={PRIMARY} />
            <rect x="10" y="1" width="3" height="12" rx="0.5" fill={PRIMARY} />
          </svg>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <span className="text-sm font-bold text-white tracking-tight whitespace-nowrap ml-2.5">ROASTrack</span>
              <span className="ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 whitespace-nowrap" style={{ background: "rgba(14,165,233,0.15)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.25)" }}>Pro</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = activeNav === label;
          return (
            <button
              key={label}
              onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
              title={!expanded ? label : undefined}
              className="flex items-center py-2.5 rounded-xl text-sm font-medium w-full transition-all overflow-hidden"
              style={{
                background: isActive ? "rgba(14,165,233,0.12)" : "transparent",
                color: isActive ? PRIMARY : DIM,
                border: isActive ? "1px solid rgba(14,165,233,0.22)" : "1px solid transparent",
                justifyContent: expanded ? "flex-start" : "center",
                padding: expanded ? "10px 12px" : "10px 0",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = DIM; e.currentTarget.style.background = "transparent"; } }}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="ml-3 whitespace-nowrap overflow-hidden flex-1 text-left"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && expanded && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 flex flex-col gap-1 border-t pt-3 overflow-hidden" style={{ borderColor: BORDER }}>
        <button
          className="flex items-center py-2.5 rounded-xl text-sm font-medium w-full transition-all overflow-hidden"
          onClick={() => { setActiveNav("Settings"); setSidebarOpen(false); }}
          title={!expanded ? "Settings" : undefined}
          style={{
            color: activeNav === "Settings" ? PRIMARY : DIM,
            background: activeNav === "Settings" ? "rgba(14,165,233,0.12)" : "transparent",
            border: activeNav === "Settings" ? "1px solid rgba(14,165,233,0.22)" : "1px solid transparent",
            justifyContent: expanded ? "flex-start" : "center",
            padding: expanded ? "10px 12px" : "10px 0",
          }}
          onMouseEnter={e => { if (activeNav !== "Settings") { e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
          onMouseLeave={e => { if (activeNav !== "Settings") { e.currentTarget.style.color = DIM; e.currentTarget.style.background = "transparent"; } }}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="ml-3 whitespace-nowrap overflow-hidden flex-1 text-left"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
          {activeNav === "Settings" && expanded && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50 shrink-0" />}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="mt-2 rounded-xl p-3 overflow-hidden"
              style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap className="w-3.5 h-3.5" style={{ color: "hsl(45,100%,60%)" }} />
                <span className="text-xs font-semibold text-white whitespace-nowrap">Upgrade Plan</span>
              </div>
              <p className="text-[11px] leading-relaxed mb-2 whitespace-nowrap overflow-hidden" style={{ color: DIM2 }}>Unlock unlimited influencers & exports.</p>
              <button className="w-full text-xs font-semibold py-1.5 rounded-lg transition-all hover:opacity-90 whitespace-nowrap" style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}>
                Upgrade →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: BG }}>

      {/* ══ SIDEBAR desktop ══ */}
      {/* Spacer to reserve collapsed width so content doesn't go under sidebar */}
      <div className="hidden md:block shrink-0" style={{ width: 56 }} />
      <motion.aside
        className="hidden md:flex flex-col h-full border-r overflow-hidden absolute top-0 left-0 z-20"
        style={{ background: SIDEBAR, borderColor: BORDER }}
        animate={{ width: sidebarHovered ? 224 : 56 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <SidebarContent expanded={sidebarHovered} />
      </motion.aside>

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
              <SidebarContent expanded={true} />
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

          {/* ══ REPORTS VIEW ══ */}
          {activeNav === "Reports" && <ReportsSection />}

          {/* ══ PIXELS VIEW ══ */}
          {activeNav === "Pixels" && <PixelsSection />}

          {/* ══ SETTINGS VIEW ══ */}
          {activeNav === "Settings" && <SettingsSection />}

          {/* ══ DASHBOARD VIEW ══ */}
          {activeNav !== "Campaigns" && activeNav !== "Influencers" && activeNav !== "Reports" && activeNav !== "Pixels" && activeNav !== "Settings" && <div className="space-y-4">

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
