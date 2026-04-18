import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Store, ArrowRight, BarChart3 } from "lucide-react";

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!storeName.trim()) {
      setError("Please enter your store name.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setLocation("/dashboard");
    }, 800);
  };

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "hsl(222, 47%, 6%)" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "hsl(222, 47%, 9%)",
            border: "1px solid rgba(14, 165, 233, 0.18)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="px-8 py-10">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-xl font-bold text-white mb-2">
                What's your store called?
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                We'll use this to personalise your dashboard.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                Store Name
              </label>
              <div className="relative">
                <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.28)" }} />
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => { setStoreName(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
                  placeholder="e.g. Mamaearth, boAt, Plum..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    background: "hsl(222, 47%, 12%)",
                    border: "1px solid rgba(14, 165, 233, 0.2)",
                    caretColor: "hsl(199, 89%, 48%)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(14, 165, 233, 0.2)")}
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
              )}
            </div>

            <motion.button
              onClick={handleConfirm}
              disabled={loading || !storeName.trim()}
              whileHover={!loading && storeName.trim() ? { scale: 1.02 } : {}}
              whileTap={!loading && storeName.trim() ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "hsl(199, 89%, 48%)", color: "hsl(222, 47%, 6%)" }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "rgba(255,255,255,0.22)" }}>
          You can change this anytime from settings.
        </p>
      </motion.div>
    </div>
  );
}
