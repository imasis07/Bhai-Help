import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, BarChart3, Sparkles } from "lucide-react";

const BG      = "hsl(222,47%,6%)";
const CARD    = "hsl(222,47%,9%)";
const INPUT   = "hsl(222,47%,12%)";
const BORDER  = "rgba(14,165,233,0.18)";
const BF      = "rgba(14,165,233,0.5)";
const PRIMARY = "hsl(199,89%,48%)";
const DIM     = "rgba(255,255,255,0.45)";
const DIM2    = "rgba(255,255,255,0.28)";

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const colors = ["", "hsl(0,80%,60%)", "hsl(35,90%,55%)", "hsl(45,100%,55%)", "hsl(142,71%,55%)"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= strength ? colors[strength] : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <span className="text-[11px] font-medium w-12 text-right" style={{ color: colors[strength] }}>{labels[strength]}</span>
    </div>
  );
}

export default function SignUpPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setLocation("/verify-email"); }, 900);
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden py-10" style={{ background: BG }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(14,165,233,0.06)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[400px]"
      >
        {/* Card */}
        <div className="relative rounded-3xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)" }}>
          {/* Top shimmer */}
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <div className="px-8 pt-8 pb-9">
            {/* Logo + badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                  <BarChart3 className="w-5 h-5" style={{ color: PRIMARY }} />
                </div>
                <span className="font-bold text-base text-white">ROAS<span style={{ color: PRIMARY }}>Track</span></span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(14,165,233,0.1)", color: PRIMARY, border: "1px solid rgba(14,165,233,0.2)" }}>
                <Sparkles className="w-3 h-3" />
                Free forever
              </div>
            </div>

            <h1 className="text-[22px] font-bold text-white leading-tight mb-1">Create your account</h1>
            <p className="text-sm mb-7" style={{ color: DIM }}>Start tracking influencer ROI in minutes.</p>

            {/* Google — TOP */}
            <button
              type="button"
              onClick={() => setLocation("/verify-email")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all mb-4 group relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span className="text-xs font-medium" style={{ color: DIM2 }}>or sign up with email</span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: DIM2 }}>Email address</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all placeholder:opacity-30"
                  style={{ background: INPUT, border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
                  onFocus={e => (e.currentTarget.style.borderColor = BF)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wide uppercase" style={{ color: DIM2 }}>Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"} required minLength={8}
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm text-white outline-none transition-all placeholder:opacity-30"
                    style={{ background: INPUT, border: `1px solid ${BORDER}`, caretColor: PRIMARY }}
                    onFocus={e => (e.currentTarget.style.borderColor = BF)}
                    onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                  />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: DIM2 }}
                    onMouseEnter={e => (e.currentTarget.style.color = DIM)}
                    onMouseLeave={e => (e.currentTarget.style.color = DIM2)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              {/* Terms */}
              <p className="text-[11px] leading-relaxed" style={{ color: DIM2 }}>
                By creating an account you agree to our{" "}
                <span className="cursor-pointer underline underline-offset-2" style={{ color: PRIMARY }}>Terms</span> &{" "}
                <span className="cursor-pointer underline underline-offset-2" style={{ color: PRIMARY }}>Privacy Policy</span>.
              </p>

              {/* CTA */}
              <motion.button
                type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: `linear-gradient(135deg, hsl(199,89%,52%), hsl(199,89%,40%))`, color: "hsl(222,47%,6%)", boxShadow: loading ? "none" : `0 4px 20px rgba(14,165,233,0.35)`, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Creating account...</>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            {/* Sign in link */}
            <p className="text-center text-sm mt-6" style={{ color: DIM2 }}>
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold" style={{ color: PRIMARY }}>Sign In</Link>
            </p>
          </div>
        </div>

        {/* Subtle glow under card */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 blur-xl rounded-full pointer-events-none" style={{ background: "rgba(14,165,233,0.2)" }} />
      </motion.div>
    </div>
  );
}
