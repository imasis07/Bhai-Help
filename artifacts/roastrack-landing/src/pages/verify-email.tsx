import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, ArrowRight, RefreshCw } from "lucide-react";

const BG     = "hsl(222,47%,6%)";
const CARD   = "hsl(222,47%,9%)";
const INPUT  = "hsl(222,47%,12%)";
const BORDER = "rgba(14,165,233,0.18)";
const BORDER_FOCUS = "rgba(14,165,233,0.5)";
const PRIMARY = "hsl(199,89%,48%)";
const DIM2   = "rgba(255,255,255,0.28)";

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    const next = [...otp];
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    const lastFilled = Math.min(digits.length, 5);
    inputs.current[lastFilled]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation("/onboarding");
    }, 900);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const filled = otp.every(d => d !== "");

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden" style={{ background: BG }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(14,165,233,0.05)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="px-8 pt-8 pb-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-7">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                <BarChart3 className="w-4 h-4" style={{ color: PRIMARY }} />
              </div>
              <span className="font-bold text-white">ROAS<span style={{ color: PRIMARY }}>Track</span></span>
            </div>

            {/* Email icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(14,165,233,0.1)", border: `1px solid rgba(14,165,233,0.2)` }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">Check your email</h1>
            <p className="text-sm text-center mb-7" style={{ color: DIM2 }}>
              We sent a 6-digit verification code to your email address.
            </p>

            <form onSubmit={handleSubmit}>
              {/* OTP boxes */}
              <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    className="w-11 h-12 rounded-xl text-center text-lg font-bold text-white outline-none transition-all"
                    style={{
                      background: INPUT,
                      border: digit ? `1px solid ${BORDER_FOCUS}` : `1px solid ${BORDER}`,
                      caretColor: PRIMARY,
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = BORDER_FOCUS)}
                    onBlur={e => (e.currentTarget.style.borderColor = digit ? BORDER_FOCUS : BORDER)}
                  />
                ))}
              </div>

              <motion.button
                type="submit"
                disabled={!filled || loading}
                whileHover={{ scale: (!filled || loading) ? 1 : 1.01 }}
                whileTap={{ scale: (!filled || loading) ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: PRIMARY,
                  color: "hsl(222,47%,6%)",
                  opacity: (!filled || loading) ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <>Verify Email <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            {/* Resend */}
            <div className="flex items-center justify-center gap-2 mt-5">
              <span className="text-xs" style={{ color: DIM2 }}>Didn't receive it?</span>
              <button
                type="button"
                onClick={handleResend}
                className="flex items-center gap-1 text-xs font-semibold transition-opacity"
                style={{ color: resent ? "hsl(142,71%,55%)" : PRIMARY }}
                disabled={resent}
              >
                {resent ? (
                  <>Code sent!</>
                ) : (
                  <><RefreshCw className="w-3 h-3" /> Resend code</>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
