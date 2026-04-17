import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Check, AtSign, Link2, ChevronDown, Plus, Sparkles } from "lucide-react";

const BG = "hsl(222, 47%, 6%)";
const CARD_BG = "hsl(222, 47%, 9%)";
const INPUT_BG = "hsl(222, 47%, 12%)";
const BORDER = "rgba(14, 165, 233, 0.18)";
const BORDER_FOCUS = "rgba(14, 165, 233, 0.5)";
const PRIMARY = "hsl(199, 89%, 48%)";
const TEXT_DIM = "rgba(255,255,255,0.45)";
const TEXT_DIM2 = "rgba(255,255,255,0.28)";

const CAMPAIGNS = ["Summer Sale 2025", "Diwali Campaign", "Product Launch Q2", "Brand Awareness"];

function generateSlug(handle: string) {
  const cleaned = handle.replace(/[^a-z0-9]/gi, "").toLowerCase().slice(0, 6);
  return cleaned || "abc123";
}

function getInitials(handle: string) {
  const clean = handle.replace(/[^a-zA-Z]/g, "");
  return clean.slice(0, 2).toUpperCase() || "?";
}

function getAvatarColor(handle: string) {
  const colors = [
    ["hsl(262,83%,58%)", "hsl(199,89%,48%)"],
    ["hsl(338,82%,52%)", "hsl(22,100%,57%)"],
    ["hsl(142,71%,45%)", "hsl(199,89%,48%)"],
    ["hsl(199,89%,48%)", "hsl(262,83%,58%)"],
  ];
  const idx = (handle.charCodeAt(1) || 0) % colors.length;
  return colors[idx];
}

export default function AddInfluencerPage() {
  const [, setLocation] = useLocation();
  const [handle, setHandle] = useState("");
  const [campaign, setCampaign] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCampaign, setNewCampaign] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);

  const slug = useMemo(() => generateSlug(handle), [handle]);
  const trackingLink = `https://roastrack.com/t/${slug}`;
  const hasHandle = handle.trim().length > 1;
  const [c1, c2] = getAvatarColor(handle);

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(trackingLink); } catch {}
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddCampaign = () => {
    if (newCampaign.trim()) {
      setCampaign(newCampaign.trim());
      setShowNewInput(false);
      setNewCampaign("");
      setDropdownOpen(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col relative overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(14,165,233,0.05)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(139,92,246,0.04)" }} />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: BORDER }}>
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: TEXT_DIM }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = TEXT_DIM)}
        >
          <ArrowLeft className="w-4 h-4" /> Back
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
          {[1, 2, 3].map(step => (
            <div key={step} className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: step === 3 ? PRIMARY : "rgba(14,165,233,0.15)",
                  color: step === 3 ? "hsl(222,47%,6%)" : PRIMARY,
                  border: step === 3 ? "none" : "1px solid rgba(14,165,233,0.4)",
                }}
              >
                {step < 3 ? <Check className="w-3 h-3" /> : step}
              </div>
              {step < 3 && <div className="w-6 h-px" style={{ background: "rgba(14,165,233,0.3)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg"
        >
          {/* Header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: PRIMARY }}>Step 3 of 3</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(139,92,246,0.12)", color: "hsl(270,60%,75%)", border: "1px solid rgba(139,92,246,0.2)" }}>
                Final Step
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Add Your First Influencer</h1>
            <p className="text-sm mt-1" style={{ color: TEXT_DIM }}>
              Connect an influencer to a campaign and generate a unique tracking link.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl overflow-hidden mb-5" style={{ background: CARD_BG, border: `1px solid ${BORDER}`, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="p-6 space-y-5">
              {/* Instagram handle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: TEXT_DIM2 }}>
                  Instagram Handle
                </label>
                <div className="relative flex items-center">
                  <div
                    className="absolute left-3.5 flex items-center justify-center w-7 h-7 rounded-lg"
                    style={{ background: "rgba(14,165,233,0.1)" }}
                  >
                    <AtSign className="w-3.5 h-3.5" style={{ color: PRIMARY }} />
                  </div>
                  <input
                    type="text"
                    value={handle}
                    onChange={e => setHandle(e.target.value.replace(/^@/, ""))}
                    placeholder="influencer_handle"
                    autoFocus
                    className="w-full pl-14 pr-4 py-3.5 rounded-xl text-sm text-white outline-none transition-all"
                    style={{
                      background: INPUT_BG,
                      border: "1px solid rgba(14,165,233,0.2)",
                      caretColor: PRIMARY,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(14,165,233,0.2)")}
                  />
                  {/* Live avatar preview */}
                  <AnimatePresence>
                    {hasHandle && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, color: "white" }}
                      >
                        {getInitials(handle)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: "rgba(14,165,233,0.08)" }} />

              {/* Campaign */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: TEXT_DIM2 }}>
                  Campaign
                </label>
                <button
                  onClick={() => { setDropdownOpen(o => !o); setShowNewInput(false); }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm transition-all text-left"
                  style={{
                    background: INPUT_BG,
                    border: dropdownOpen ? `1px solid ${BORDER_FOCUS}` : "1px solid rgba(14,165,233,0.2)",
                    color: campaign ? "white" : TEXT_DIM,
                  }}
                >
                  <span>{campaign || "Select or create a campaign"}</span>
                  <ChevronDown
                    className="w-4 h-4 transition-transform shrink-0 ml-2"
                    style={{ color: TEXT_DIM2, transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-20 w-full mt-2 rounded-xl overflow-hidden"
                      style={{ background: "hsl(222,47%,11%)", border: `1px solid ${BORDER_FOCUS}`, boxShadow: "0 16px 32px rgba(0,0,0,0.5)", transformOrigin: "top" }}
                    >
                      {CAMPAIGNS.map(c => (
                        <button
                          key={c}
                          onClick={() => { setCampaign(c); setDropdownOpen(false); }}
                          className="w-full px-4 py-3 text-sm text-left flex items-center gap-2 transition-colors"
                          style={{ color: campaign === c ? PRIMARY : "rgba(255,255,255,0.75)" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(14,165,233,0.07)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          {campaign === c && <Check className="w-3.5 h-3.5 shrink-0" />}
                          <span className={campaign === c ? "ml-0" : "ml-5"}>{c}</span>
                        </button>
                      ))}
                      <div className="h-px mx-3" style={{ background: "rgba(14,165,233,0.1)" }} />
                      {showNewInput ? (
                        <div className="px-3 py-2.5 flex gap-2">
                          <input
                            autoFocus
                            value={newCampaign}
                            onChange={e => setNewCampaign(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAddCampaign()}
                            placeholder="Campaign name..."
                            className="flex-1 px-3 py-2 rounded-lg text-sm text-white outline-none"
                            style={{ background: INPUT_BG, border: "1px solid rgba(14,165,233,0.25)", caretColor: PRIMARY }}
                          />
                          <button
                            onClick={handleAddCampaign}
                            className="px-3 py-2 rounded-lg text-xs font-semibold"
                            style={{ background: PRIMARY, color: "hsl(222,47%,6%)" }}
                          >
                            Add
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowNewInput(true)}
                          className="w-full px-4 py-3 text-sm text-left flex items-center gap-2 transition-colors"
                          style={{ color: PRIMARY }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(14,165,233,0.07)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Create new campaign
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="h-px" style={{ background: "rgba(14,165,233,0.08)" }} />

              {/* Tracking link */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: TEXT_DIM2 }}>
                  Tracking Link
                </label>
                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all"
                  style={{ background: INPUT_BG, border: "1px solid rgba(14,165,233,0.2)" }}
                >
                  <Link2 className="w-4 h-4 shrink-0" style={{ color: TEXT_DIM2 }} />
                  <span className="flex-1 text-sm font-mono truncate" style={{ color: hasHandle ? "rgba(255,255,255,0.8)" : TEXT_DIM2 }}>
                    {trackingLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: copiedLink ? "rgba(52,199,89,0.15)" : "rgba(14,165,233,0.12)",
                      color: copiedLink ? "hsl(142,71%,55%)" : PRIMARY,
                      border: copiedLink ? "1px solid rgba(52,199,89,0.3)" : "1px solid rgba(14,165,233,0.25)",
                    }}
                  >
                    {copiedLink ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
                  </button>
                </div>
                <p className="text-xs mt-2" style={{ color: TEXT_DIM2 }}>
                  Share this link with the influencer to track all conversions from their content.
                </p>
              </div>
            </div>
          </div>

          {/* Preview card — shows when handle entered */}
          <AnimatePresence>
            {hasHandle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl px-4 py-3.5 mb-5 flex items-center gap-3"
                style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.18)" }}
              >
                <div
                  className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{ background: `linear-gradient(135deg, ${c1}, ${c2})`, color: "white" }}
                >
                  {getInitials(handle)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">@{handle}</div>
                  <div className="text-xs mt-0.5" style={{ color: TEXT_DIM2 }}>
                    {campaign ? `Campaign: ${campaign}` : "No campaign selected"}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(142,71%,55%)" }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Ready to track
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setLocation("/dashboard")}
              className="px-5 py-2.5 rounded-xl text-sm transition-colors"
              style={{ color: TEXT_DIM }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = TEXT_DIM)}
            >
              Skip
            </button>
            <motion.button
              onClick={() => setLocation("/dashboard")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: PRIMARY, color: "hsl(222, 47%, 6%)", opacity: hasHandle ? 1 : 0.5 }}
            >
              Add Influencer
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
