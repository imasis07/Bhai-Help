import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";

const BG = "hsl(222, 47%, 6%)";
const CARD_BG = "hsl(222, 47%, 9%)";
const CODE_BG = "hsl(222, 47%, 7%)";
const BORDER = "rgba(14, 165, 233, 0.18)";
const BORDER_FOCUS = "rgba(14, 165, 233, 0.5)";
const PRIMARY = "hsl(199, 89%, 48%)";
const TEXT_DIM = "rgba(255,255,255,0.45)";
const TEXT_DIM2 = "rgba(255,255,255,0.28)";

const PIXEL_CODE = `<script src="https://track.roastrack.com/pixel.js"
  data-key="YOUR_PIXEL_KEY"
  async>
</script>`;

export default function InstallPixelPage() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [pixelStatus, setPixelStatus] = useState<"not_detected" | "checking" | "detected">("not_detected");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIXEL_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    setPixelStatus("checking");
    setTimeout(() => {
      setPixelStatus("not_detected");
    }, 1800);
  };

  const handleVerify = () => {
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
            <div key={step} className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: step === 2 ? PRIMARY : step === 1 ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.06)",
                  color: step === 2 ? "hsl(222, 47%, 6%)" : step === 1 ? PRIMARY : TEXT_DIM2,
                  border: step === 2 ? "none" : step === 1 ? `1px solid rgba(14,165,233,0.4)` : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {step === 1 ? (
                  <Check className="w-3 h-3" />
                ) : (
                  step
                )}
              </div>
              {step < 3 && (
                <div className="w-6 h-px" style={{ background: step === 1 ? "rgba(14,165,233,0.3)" : "rgba(255,255,255,0.1)" }} />
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
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: PRIMARY }}>
              Step 2 of 3
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">Install Tracking Pixel</h1>
            <p className="text-sm mt-1" style={{ color: TEXT_DIM }}>
              Copy this code and paste it into the{" "}
              <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(14,165,233,0.12)", color: PRIMARY }}>
                &lt;head&gt;
              </code>{" "}
              section of your website.
            </p>
          </div>

          {/* Code block */}
          <div
            className="rounded-2xl overflow-hidden mb-4"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "rgba(14,165,233,0.1)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,59,48,0.5)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,204,0,0.5)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "rgba(52,199,89,0.5)" }} />
                <span className="ml-2 text-xs" style={{ color: TEXT_DIM2 }}>HTML · &lt;head&gt; tag</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: copied ? "rgba(52,199,89,0.15)" : "rgba(14,165,233,0.1)",
                  color: copied ? "hsl(142,71%,55%)" : PRIMARY,
                  border: copied ? "1px solid rgba(52,199,89,0.3)" : `1px solid rgba(14,165,233,0.25)`,
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="px-5 py-4 overflow-x-auto" style={{ background: CODE_BG }}>
              <pre className="text-sm leading-relaxed font-mono whitespace-pre" style={{ color: "rgba(255,255,255,0.75)" }}>
                <span style={{ color: "rgba(14,165,233,0.7)" }}>&lt;</span>
                <span style={{ color: "hsl(199,89%,65%)" }}>script</span>
                {"\n  "}
                <span style={{ color: "hsl(270,60%,75%)" }}>src</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
                <span style={{ color: "hsl(142,60%,65%)" }}>"https://track.roastrack.com/pixel.js"</span>
                {"\n  "}
                <span style={{ color: "hsl(270,60%,75%)" }}>data-key</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>=</span>
                <span style={{ color: "hsl(142,60%,65%)" }}>"YOUR_PIXEL_KEY"</span>
                {"\n  "}
                <span style={{ color: "hsl(270,60%,75%)" }}>async</span>
                <span style={{ color: "rgba(14,165,233,0.7)" }}>&gt;</span>
                {"\n"}
                <span style={{ color: "rgba(14,165,233,0.7)" }}>&lt;/</span>
                <span style={{ color: "hsl(199,89%,65%)" }}>script</span>
                <span style={{ color: "rgba(14,165,233,0.7)" }}>&gt;</span>
              </pre>
            </div>
          </div>

          {/* Pixel status */}
          <div
            className="rounded-2xl px-5 py-4 mb-6"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {pixelStatus === "checking" ? (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,204,0,0.1)" }}
                  >
                    <RefreshCw className="w-4 h-4 animate-spin" style={{ color: "hsl(45,100%,60%)" }} />
                  </div>
                ) : pixelStatus === "detected" ? (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(52,199,89,0.12)" }}
                  >
                    <Check className="w-4 h-4" style={{ color: "hsl(142,71%,55%)" }} />
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,69,58,0.1)" }}
                  >
                    <AlertCircle className="w-4 h-4" style={{ color: "hsl(0,80%,65%)" }} />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          pixelStatus === "checking"
                            ? "hsl(45,100%,60%)"
                            : pixelStatus === "detected"
                            ? "hsl(142,71%,55%)"
                            : "hsl(0,80%,65%)",
                        boxShadow:
                          pixelStatus === "detected"
                            ? "0 0 6px hsl(142,71%,55%)"
                            : "none",
                      }}
                    />
                    <span className="text-sm font-semibold text-white">
                      Pixel Status:{" "}
                      <span
                        style={{
                          color:
                            pixelStatus === "checking"
                              ? "hsl(45,100%,60%)"
                              : pixelStatus === "detected"
                              ? "hsl(142,71%,55%)"
                              : "hsl(0,80%,65%)",
                        }}
                      >
                        {pixelStatus === "checking"
                          ? "Checking..."
                          : pixelStatus === "detected"
                          ? "Detected!"
                          : "Not yet detected"}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: TEXT_DIM2 }}>
                    {pixelStatus === "checking"
                      ? "Scanning your website..."
                      : pixelStatus === "detected"
                      ? "Pixel is firing correctly on your site."
                      : "Refresh after installing the pixel on your site."}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRefresh}
                disabled={pixelStatus === "checking"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: TEXT_DIM,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  if (pixelStatus !== "checking") e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
                onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_DIM)}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${pixelStatus === "checking" ? "animate-spin" : ""}`} />
                Refresh
              </button>
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
              onClick={handleVerify}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: PRIMARY, color: "hsl(222, 47%, 6%)" }}
            >
              Verify & Continue
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
