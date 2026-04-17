import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShoppingBag, Globe, CheckCircle2 } from "lucide-react";

const PLATFORMS = [
  {
    id: "shopify",
    name: "Shopify",
    placeholder: "https://yourstore.myshopify.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M15.5 3.5c0 0-.4 0-.7.1-.3-1-1-1.6-1.8-1.6-.8 0-1.5.6-1.8 1.6-.3-.1-.5-.1-.7-.1C9.3 3.5 8 4.8 8 6.5v.5L6 8l1 14h10l1-14-2-1v-.5c0-1.7-1.3-3-2.5-3zm-1 1.5v.5H10v-.5c0-.6.4-1 1-1h.5c.3-.7.7-1 .5-1 .3 0 .7.3.5 1H13c.6 0 1 .4 1.5 1z" fill="currentColor" opacity=".4"/>
        <path d="M15.5 3.5c-.3-1-1-1.6-1.8-1.6-.8 0-1.5.6-1.8 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "wix",
    name: "Wix",
    placeholder: "https://yoursite.wixsite.com/yourstore",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l3-5 2.5 4 2.5-4 3 5M14 7l3 5 3-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    placeholder: "https://yourstore.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="15" r="1" fill="currentColor"/>
        <circle cx="12" cy="15" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "custom",
    name: "Custom Website",
    placeholder: "https://yourwebsite.com",
    icon: <Globe width="18" height="18" />,
  },
];

const BG = "hsl(222, 47%, 6%)";
const CARD_BG = "hsl(222, 47%, 9%)";
const INPUT_BG = "hsl(222, 47%, 12%)";
const BORDER = "rgba(14, 165, 233, 0.18)";
const BORDER_FOCUS = "rgba(14, 165, 233, 0.5)";
const PRIMARY = "hsl(199, 89%, 48%)";
const TEXT_DIM = "rgba(255,255,255,0.45)";
const TEXT_DIM2 = "rgba(255,255,255,0.28)";

export default function ConnectStorePage() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<string>("shopify");
  const [storeUrl, setStoreUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const platform = PLATFORMS.find((p) => p.id === selected) ?? PLATFORMS[0];

  const handleConnect = () => {
    setLocation("/dashboard");
  };

  return (
    <div
      className="flex min-h-[100dvh] flex-col relative overflow-hidden"
      style={{ background: BG }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: BORDER }}
      >
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: TEXT_DIM }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DIM)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="7" width="3" height="6" rx="0.5" fill={PRIMARY} />
              <rect x="5.5" y="4" width="3" height="9" rx="0.5" fill={PRIMARY} />
              <rect x="10" y="1" width="3" height="12" rx="0.5" fill={PRIMARY} />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">ROASTrack</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex items-center gap-1.5"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: step === 1 ? PRIMARY : "rgba(255,255,255,0.06)",
                  color: step === 1 ? "hsl(222, 47%, 6%)" : TEXT_DIM2,
                  border: step === 1 ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className="w-6 h-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg"
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: PRIMARY }}
              >
                Step 1 of 3
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Connect Your Store</h1>
            <p className="text-sm mt-1" style={{ color: TEXT_DIM }}>
              Select your e-commerce platform to start tracking influencer ROI.
            </p>
          </div>

          {/* Platform selector */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: TEXT_DIM2 }}>
              Select your platform
            </p>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map((p) => {
                const isSelected = selected === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all"
                    style={{
                      background: isSelected ? "rgba(14, 165, 233, 0.12)" : "rgba(255,255,255,0.03)",
                      border: isSelected
                        ? `1px solid rgba(14, 165, 233, 0.4)`
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="shrink-0"
                      style={{ color: isSelected ? PRIMARY : TEXT_DIM }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: isSelected ? "white" : TEXT_DIM }}
                    >
                      {p.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2
                        className="ml-auto shrink-0 w-4 h-4"
                        style={{ color: PRIMARY }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Store details */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: TEXT_DIM2 }}>
              Store details
            </p>

            {/* Store URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                Store URL
              </label>
              <div className="relative">
                <ShoppingBag
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: TEXT_DIM2 }}
                />
                <input
                  type="url"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder={platform.placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: INPUT_BG,
                    border: `1px solid rgba(14, 165, 233, 0.2)`,
                    caretColor: PRIMARY,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.2)")}
                />
              </div>
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your API key here"
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                style={{
                  background: INPUT_BG,
                  border: "1px solid rgba(14, 165, 233, 0.2)",
                  caretColor: PRIMARY,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.2)")}
              />
              <p className="text-xs mt-2" style={{ color: TEXT_DIM2 }}>
                Find your API key in your {platform.name} admin panel under Settings → Apps.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setLocation("/dashboard")}
              className="px-5 py-2.5 rounded-xl text-sm transition-colors"
              style={{ color: TEXT_DIM }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DIM)}
            >
              Skip
            </button>
            <motion.button
              onClick={handleConnect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: PRIMARY, color: "hsl(222, 47%, 6%)" }}
            >
              Connect
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
